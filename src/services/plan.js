/* ==========================================================================
   Local-first study planning, progress tracking, and review scheduling.
   ========================================================================== */
import { get, update, subscribe } from "./store.js";
import { ACTIVITY_BY_ID } from "../data/activities.js";

const TASKS = [
  { id: "pretest", title: "Take the Pre-Test", type: "test", minutes: 25, href: "/exam/pretest", why: "Find the topics that need the most practice.", auto: { activityId: "pretest" } },
  { id: "types-parts", title: "Types of Computers and Parts", type: "read", minutes: 25, href: "/library/types-of-computers", why: "Recognizing each part makes the build steps easier to follow.", auto: { lessonIds: ["types-of-computers", "internal-hardware", "external-hardware"] } },
  { id: "software", title: "System and Application Software", type: "read", minutes: 20, href: "/library/system-software", why: "Software knowledge helps you prepare a complete working system.", auto: { lessonIds: ["system-software", "application-software"] } },
  { id: "disassembly", title: "Practise Safe Disassembly", type: "play", minutes: 20, href: "/play/pc-lab?mode=disassembly", why: "A safe removal sequence protects the computer and the technician.", auto: { activityId: "disassembly" } },
  { id: "assembly", title: "Build a Computer in PC Lab", type: "play", minutes: 35, href: "/play/pc-lab", why: "The guided build connects the module steps to real hardware.", auto: { activityId: "pc-lab" } },
  { id: "case-files", title: "Solve the Case Files", type: "play", minutes: 20, href: "/play/case-files", why: "Troubleshooting practice turns symptoms into safe checks.", auto: { activityId: "case-files" } },
  { id: "tech-checkup", title: "Complete Tech Check-Up", type: "review", minutes: 15, href: "/play/tech-checkup", why: "Check how well you can explain your technician profile.", auto: { activityId: "tech-checkup" } },
  { id: "final", title: "Take the Final Exam", type: "test", minutes: 30, href: "/exam/final", why: "Use the final assessment to check your readiness.", auto: { activityId: "final" } }
];

const DAY_MS = 24 * 60 * 60 * 1000;

export function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateKey(key) {
  return new Date(`${key}T12:00:00`);
}

function availableDates(start, end, days) {
  const dates = [];
  for (let date = new Date(`${start}T12:00:00`), last = fromDateKey(end); date <= last; date = new Date(date.getTime() + DAY_MS)) {
    if (days.includes(date.getDay())) dates.push(dateKey(date));
  }
  return dates;
}

function confidenceFromPretest(state) {
  const score = state.progress.activities?.pretest?.lastPercent;
  if (score == null) return "building";
  if (score < 50) return "starting";
  if (score < 75) return "building";
  return "ready";
}

export function createPlan({ targetDate, days, minutesPerDay, confidence = "auto" }) {
  const target = fromDateKey(targetDate);
  const today = dateKey();
  if (!Number.isFinite(target.getTime()) || targetDate < today) {
    throw new RangeError("Choose today or a future target date.");
  }
  const weekdays = [...new Set(days.map(Number))].filter((day) => Number.isInteger(day) && day >= 0 && day <= 6);
  if (!weekdays.length) throw new RangeError("Choose at least one study day.");
  const minutes = Number(minutesPerDay);
  if (!Number.isInteger(minutes) || minutes < 10 || minutes > 180) {
    throw new RangeError("Choose between 10 and 180 study minutes per day.");
  }
  const start = weekdays.includes(fromDateKey(today).getDay()) ? today : dateKey(new Date(fromDateKey(today).getTime() + DAY_MS));
  const slots = availableDates(start, targetDate, weekdays);
  if (!slots.length) throw new RangeError("There are no selected study days before that target date.");

  const state = get();
  const chosenConfidence = confidence === "auto" ? confidenceFromPretest(state) : confidence;
  if (!["starting", "building", "ready"].includes(chosenConfidence)) {
    throw new RangeError("Choose a confidence level or use your Pre-Test result.");
  }
  const tasks = TASKS.map((task, index) => {
    const slot = TASKS.length > 1 ? Math.round((index * (slots.length - 1)) / (TASKS.length - 1)) : 0;
    return { ...task, date: slots[Math.max(0, slot)], completed: false, completedAt: null, completionSource: null };
  });
  const config = {
    targetDate,
    days: weekdays,
    minutesPerDay: minutes,
    confidence: chosenConfidence,
    createdAt: new Date().toISOString()
  };
  update((draft) => {
    draft.plan = { config, tasks, sessions: [], reminderDay: null };
  }, { type: "plan-created" });
  reconcileTasks(get());
  return get().plan;
}

function hasEvidence(state, task) {
  if (!task.auto) return false;
  if (task.auto.activityId) return Boolean(state.progress.activities?.[task.auto.activityId]?.attempts);
  if (task.auto.lessonIds) return task.auto.lessonIds.every((id) => Boolean(state.progress.lessons?.[id]?.readAt));
  return false;
}

function reconcileTasks(state) {
  const pending = state.plan?.tasks?.filter((task) => !task.completed && hasEvidence(state, task)) || [];
  if (!pending.length) return;
  const ids = new Set(pending.map((task) => task.id));
  update((draft) => {
    draft.plan.tasks.forEach((task) => {
      if (ids.has(task.id)) {
        task.completed = true;
        task.completedAt = new Date().toISOString();
        task.completionSource = "progress";
      }
    });
  }, { type: "plan-auto-complete" });
}

function addReviewTasks(state, activityId) {
  const activity = state.progress.activities?.[activityId];
  if (!state.plan?.config || !activity || activity.lastPercent >= 75) return;
  const item = ACTIVITY_BY_ID[activityId];
  if (!item) return;
  const stamp = activity.lastAt || new Date().toISOString();
  const base = fromDateKey(dateKey(new Date(stamp)));
  const reviews = [1, 3, 7].map((offset) => {
    const date = dateKey(new Date(base.getTime() + offset * DAY_MS));
    return {
      id: `review-${activityId}-${stamp.replace(/\D/g, "")}-${offset}`,
      title: `Review ${item.title}`,
      type: "review",
      minutes: 10,
      href: item.route,
      why: "A quick revisit can strengthen the idea that felt difficult.",
      date,
      completed: false,
      completedAt: null,
      completionSource: null,
      reviewFor: activityId
    };
  });
  update((draft) => {
    const existing = new Set(draft.plan.tasks.map((task) => task.id));
    draft.plan.tasks.push(...reviews.filter((task) => !existing.has(task.id)));
  }, { type: "plan-reviews" });
}

subscribe((state, meta) => {
  if (!state.plan?.config) return;
  reconcileTasks(state);
  if (meta.type === "activity" && meta.id) addReviewTasks(get(), meta.id);
});

export function completeTask(taskId, completed) {
  return update((draft) => {
    const task = draft.plan.tasks.find((item) => item.id === taskId);
    if (!task) throw new RangeError("That study task is no longer available.");
    task.completed = Boolean(completed);
    task.completedAt = task.completed ? new Date().toISOString() : null;
    task.completionSource = task.completed ? "manual" : null;
  }, { type: "plan-task", taskId });
}

export function smartReschedule() {
  const state = get();
  const config = state.plan?.config;
  if (!config) throw new Error("Create a study plan before rescheduling tasks.");
  const remaining = state.plan.tasks.filter((task) => !task.completed);
  if (!remaining.length) return state.plan;
  const today = dateKey();
  let end = config.targetDate < today ? today : config.targetDate;
  let slots = availableDates(today, end, config.days);
  for (let extension = 0; slots.length < remaining.length && extension < 4; extension += 1) {
    end = dateKey(new Date(fromDateKey(end).getTime() + 7 * DAY_MS));
    slots = availableDates(today, end, config.days);
  }
  if (!slots.length) throw new Error("No study days are available. Update your plan settings first.");
  update((draft) => {
    const pending = draft.plan.tasks.filter((task) => !task.completed);
    pending.forEach((task, index) => {
      const slot = Math.min(slots.length - 1, Math.floor((index * slots.length) / pending.length));
      task.date = slots[slot];
    });
    draft.plan.config.targetDate = end;
  }, { type: "plan-reschedule" });
  return get().plan;
}

export function logFocusSession(minutes = 25) {
  const amount = Math.round(Number(minutes));
  if (!Number.isFinite(amount) || amount < 1 || amount > 180) throw new RangeError("Focus time must be between 1 and 180 minutes.");
  return update((draft) => {
    draft.plan.sessions.push({ date: dateKey(), minutes: amount, completedAt: new Date().toISOString() });
    draft.plan.sessions = draft.plan.sessions.slice(-365);
  }, { type: "plan-focus" });
}

export function planStats(state = get()) {
  const plan = state.plan || { tasks: [], sessions: [] };
  const tasks = plan.tasks || [];
  const done = tasks.filter((task) => task.completed);
  const today = dateKey();
  const now = fromDateKey(today);
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const weekEnd = new Date(weekStart.getTime() + 6 * DAY_MS);
  const inThisWeek = (key) => {
    const date = fromDateKey(key);
    return date >= weekStart && date <= weekEnd;
  };
  const sessions = plan.sessions || [];
  const minutesStudied = done.reduce((sum, task) => sum + (Number(task.minutes) || 0), 0)
    + sessions.reduce((sum, session) => sum + (Number(session.minutes) || 0), 0);
  const weekMinutes = done.filter((task) => task.completedAt && inThisWeek(dateKey(new Date(task.completedAt))))
    .reduce((sum, task) => sum + (Number(task.minutes) || 0), 0)
    + sessions.filter((session) => inThisWeek(session.date)).reduce((sum, session) => sum + (Number(session.minutes) || 0), 0);
  const activityDays = new Set([
    ...done.filter((task) => task.completedAt).map((task) => dateKey(new Date(task.completedAt))),
    ...sessions.map((session) => session.date)
  ]);
  let streak = 0;
  const cursor = new Date(now);
  if (!activityDays.has(today)) cursor.setDate(cursor.getDate() - 1);
  while (activityDays.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  const weeklyGoal = (plan.config?.days?.length || 0) * (plan.config?.minutesPerDay || 0);
  return {
    total: tasks.length,
    completed: done.length,
    percent: tasks.length ? Math.round((done.length / tasks.length) * 100) : 0,
    minutesStudied,
    weekMinutes,
    weeklyGoal,
    weeklyPercent: weeklyGoal ? Math.min(100, Math.round((weekMinutes / weeklyGoal) * 100)) : 0,
    streak
  };
}

export function taskEvidenceComplete(task, state = get()) {
  return hasEvidence(state, task);
}

export function planTasks() {
  return [...(get().plan.tasks || [])].sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}
