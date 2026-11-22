/* ==========================================================================
   Study Plan — local-first schedule, focus timer, and calendar exports.
   ========================================================================== */
import { get, subscribe, update } from "../services/store.js";
import {
  completeTask, createPlan, dateKey, logFocusSession, planStats, planTasks,
  smartReschedule, taskEvidenceComplete
} from "../services/plan.js";
import { companionName, say } from "../services/companion.js";
import { icon } from "../app/icons.js";
import { confirmDialog, downloadFile, esc, toast } from "../app/ui.js";

const DAYS = [
  ["1", "Monday"], ["2", "Tuesday"], ["3", "Wednesday"], ["4", "Thursday"],
  ["5", "Friday"], ["6", "Saturday"], ["0", "Sunday"]
];
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const VIEW_LABELS = { today: "Today", week: "Week", month: "Month" };

function dateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return dateKey(date);
}

function prettyDate(key, options = { weekday: "short", month: "short", day: "numeric" }) {
  return new Intl.DateTimeFormat("en", options).format(new Date(`${key}T12:00:00`));
}

function confidenceDefault() {
  const score = get().progress.activities?.pretest?.lastPercent;
  if (score == null) return "auto";
  if (score < 50) return "starting";
  if (score < 75) return "building";
  return "ready";
}

function setupMarkup() {
  const defaultConfidence = confidenceDefault();
  return `<section class="plan-setup card card-pad" aria-labelledby="planSetupTitle">
    <p class="eyebrow">A plan that fits your week</p>
    <h2 id="planSetupTitle">Set a target, then take one step at a time.</h2>
    <p class="lede">Three quick steps help shape a schedule around your real week.</p>
    <form class="plan-setup-form" data-plan-setup>
      <section class="plan-step-panel" data-plan-step="1" aria-labelledby="planStepOne">
        <p class="eyebrow">Step 1 of 3</p><h3 id="planStepOne" tabindex="-1">Choose your target date</h3>
        <label class="field" for="planTarget"><span class="field-label">When would you like to be ready?</span>
          <input class="input" type="date" id="planTarget" name="targetDate" min="${dateKey()}" value="${dateOffset(21)}" required>
          <span class="field-hint">Use an exam date, class deadline, or your own goal.</span>
        </label>
        <button class="btn btn-primary" type="button" data-plan-next>Continue ${icon("arrowRight", 18)}</button>
      </section>
      <section class="plan-step-panel" data-plan-step="2" aria-labelledby="planStepTwo" hidden>
        <p class="eyebrow">Step 2 of 3</p><h3 id="planStepTwo" tabindex="-1">Set your weekly rhythm</h3>
        <fieldset class="field">
          <legend class="field-label">Days available each week</legend>
          <div class="plan-day-options">${DAYS.map(([value, label]) => `<label class="plan-day-option"><input type="checkbox" name="days" value="${value}" ${Number(value) >= 1 && Number(value) <= 5 ? "checked" : ""}><span>${label}</span></label>`).join("")}</div>
        </fieldset>
        <label class="field" for="planMinutes"><span class="field-label">Minutes per study day</span>
          <select class="input" id="planMinutes" name="minutesPerDay">
            ${[15, 20, 25, 30, 45, 60].map((minutes) => `<option value="${minutes}" ${minutes === 25 ? "selected" : ""}>${minutes} minutes</option>`).join("")}
          </select>
        </label>
        <div class="cluster"><button class="btn btn-ghost" type="button" data-plan-back>${icon("arrowLeft", 18)} Back</button><button class="btn btn-primary" type="button" data-plan-next>Continue ${icon("arrowRight", 18)}</button></div>
      </section>
      <section class="plan-step-panel" data-plan-step="3" aria-labelledby="planStepThree" hidden>
        <p class="eyebrow">Step 3 of 3</p><h3 id="planStepThree" tabindex="-1">Check in with yourself</h3>
        <label class="field" for="planConfidence"><span class="field-label">How confident do you feel?</span>
          <select class="input" id="planConfidence" name="confidence">
            <option value="auto" ${defaultConfidence === "auto" ? "selected" : ""}>Use my Pre-Test result${get().progress.activities?.pretest?.lastPercent == null ? " when I take it" : ""}</option>
            <option value="starting" ${defaultConfidence === "starting" ? "selected" : ""}>I am just starting</option>
            <option value="building" ${defaultConfidence === "building" ? "selected" : ""}>I know some of it</option>
            <option value="ready" ${defaultConfidence === "ready" ? "selected" : ""}>I feel mostly ready</option>
          </select>
          <span class="field-hint">This helps you set a starting point. You can change your plan later.</span>
        </label>
        <div class="cluster"><button class="btn btn-ghost" type="button" data-plan-back>${icon("arrowLeft", 18)} Back</button><button class="btn btn-primary" type="submit">${icon("calendar", 18)} Build my study plan</button></div>
      </section>
    </form>
  </section>`;
}

function taskMarkup(task) {
  const autoDone = taskEvidenceComplete(task);
  const label = task.completed ? "Completed" : "Mark complete";
  return `<article class="plan-task${task.completed ? " is-complete" : ""}">
    <label class="plan-task-check" aria-label="${label}: ${esc(task.title)}">
      <input type="checkbox" data-plan-task="${esc(task.id)}" ${task.completed ? "checked" : ""} ${autoDone ? "disabled" : ""}>
      <span class="plan-check-mark" aria-hidden="true">${task.completed ? icon("check", 14) : ""}</span>
    </label>
    <div class="plan-task-copy">
      <div class="plan-task-meta"><span class="tag">${esc(task.type)}</span><span>${esc(prettyDate(task.date))}</span><span>${task.minutes} min</span></div>
      <h3>${esc(task.title)}</h3>
      <p>${esc(task.why)}</p>
      ${task.completionSource === "progress" ? `<small class="plan-auto-note">Completed from your saved progress</small>` : ""}
    </div>
    <a class="btn btn-ghost btn-sm plan-task-open" href="${esc(task.href)}">Open ${icon("arrowRight", 16)}</a>
  </article>`;
}

function weekRange(offset = 0) {
  const today = new Date(`${dateKey()}T12:00:00`);
  const start = new Date(today);
  start.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  start.setDate(start.getDate() + offset * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start: dateKey(start), end: dateKey(end) };
}

function calendarMarkup(tasks, offset = 0) {
  const today = new Date(`${dateKey()}T12:00:00`);
  const first = new Date(today.getFullYear(), today.getMonth() + offset, 1, 12);
  const firstMondayOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: firstMondayOffset }, () => `<div class="plan-month-cell is-empty" aria-hidden="true"></div>`);
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(first.getFullYear(), first.getMonth(), day, 12);
    const key = dateKey(date);
    const dayTasks = tasks.filter((task) => task.date === key);
    cells.push(`<div class="plan-month-cell${key === dateKey() ? " is-today" : ""}">
      <span class="plan-month-date">${day}</span>
      ${dayTasks.slice(0, 2).map((task) => `<span class="plan-month-task${task.completed ? " is-complete" : ""}" title="${esc(task.title)}">${esc(task.title)}</span>`).join("")}
      ${dayTasks.length > 2 ? `<span class="tiny faint">+${dayTasks.length - 2} more</span>` : ""}
    </div>`);
  }
  return `<div class="plan-month-grid" role="grid" aria-label="${new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(today)}">
    ${DAY_LABELS.map((day) => `<span class="plan-month-heading" role="columnheader">${day}</span>`).join("")}
    ${cells.join("")}
  </div>`;
}

function calendarFile(tasks) {
  const escapeValue = (value) => String(value).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
  const events = tasks.map((task) => `BEGIN:VEVENT\nUID:${task.id}@techpro.local\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}\nDTSTART;VALUE=DATE:${task.date.replace(/-/g, "")}\nSUMMARY:${escapeValue(task.title)}\nDESCRIPTION:${escapeValue(task.why)}\nURL:${new URL(task.href, location.origin).href}\nEND:VEVENT`).join("\n");
  return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TechPro//Study Plan//EN\nCALSCALE:GREGORIAN\n${events}\nEND:VCALENDAR\n`;
}

function dashboardMarkup(view, timerSeconds, timerRunning, timerMode, weekOffset = 0, monthOffset = 0) {
  const state = get();
  const plan = state.plan;
  const tasks = planTasks();
  const stats = planStats(state);
  const range = weekRange(weekOffset);
  const visibleTasks = view === "today"
    ? tasks.filter((task) => task.date === dateKey())
    : view === "week"
      ? tasks.filter((task) => task.date >= range.start && task.date <= range.end)
      : tasks.filter((task) => task.date.slice(0, 7) === dateKey(new Date(new Date().getFullYear(), new Date().getMonth() + monthOffset, 1, 12)).slice(0, 7));
  const todayTasks = tasks.filter((task) => task.date === dateKey());
  const pending = tasks.filter((task) => !task.completed);
  const doneToday = todayTasks.filter((task) => task.completed).length;
  const todayProgress = todayTasks.length ? Math.round((doneToday / todayTasks.length) * 100) : 0;
  const weekGoal = stats.weeklyGoal;
  const timerText = `${String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:${String(timerSeconds % 60).padStart(2, "0")}`;
  const confidenceLabel = { starting: "Just starting", building: "Building confidence", ready: "Feeling ready" }[plan.config.confidence];
  const monthDate = new Date(new Date().getFullYear(), new Date().getMonth() + monthOffset, 1, 12);
  const weekNav = view === "week" ? `<div class="plan-calendar-nav"><button class="btn btn-ghost btn-sm" type="button" data-week-step="-1" aria-label="Previous week">${icon("chevronLeft", 16)}</button><span>${esc(prettyDate(range.start, { month: "short", day: "numeric" }))} – ${esc(prettyDate(range.end, { month: "short", day: "numeric" }))}</span><button class="btn btn-ghost btn-sm" type="button" data-week-step="1" aria-label="Next week">${icon("chevronRight", 16)}</button></div>` : "";
  const monthNav = view === "month" ? `<div class="plan-calendar-nav"><button class="btn btn-ghost btn-sm" type="button" data-month-step="-1" aria-label="Previous month">${icon("chevronLeft", 16)}</button><strong>${new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(monthDate)}</strong><button class="btn btn-ghost btn-sm" type="button" data-month-step="1" aria-label="Next month">${icon("chevronRight", 16)}</button></div>` : "";
  const scheduleContent = view === "month"
    ? calendarMarkup(tasks, monthOffset)
    : visibleTasks.length
      ? `<div class="plan-task-list">${visibleTasks.map(taskMarkup).join("")}</div>`
      : `<div class="plan-empty"><strong>${view === "today" ? "No task scheduled for today." : "Nothing scheduled this week."}</strong><p>That is okay. Check another date or use a short focus session.</p><a class="btn btn-ghost btn-sm" href="${pending[0]?.href || "/library"}">${icon("arrowRight", 16)} Continue studying</a></div>`;

  return `<div class="plan-dashboard">
    <header class="plan-header">
      <div><p class="eyebrow">Your study plan</p><h2>Steady progress, one session at a time.</h2>
        <p class="lede">${confidenceLabel} · Target ${esc(prettyDate(plan.config.targetDate, { month: "long", day: "numeric", year: "numeric" }))}</p>
      </div>
      <div class="plan-header-actions">
        <button class="btn btn-ghost btn-sm" type="button" data-reminders>${icon("bell", 17)} Reminders</button>
        <button class="btn btn-ghost btn-sm" type="button" data-print>${icon("printer", 17)} Print</button>
        <button class="btn btn-ghost btn-sm" type="button" data-ics>${icon("calendar", 17)} Export .ics</button>
        <button class="btn btn-ghost btn-sm" type="button" data-reschedule>${icon("refresh", 17)} Smart reschedule</button>
        <button class="btn btn-ghost btn-sm" type="button" data-rebuild-plan>Change plan</button>
      </div>
    </header>

    <section class="plan-summary" aria-label="Study plan progress">
      <article class="card plan-ring-card">
        <div class="plan-ring" role="img" aria-label="${stats.percent}% of plan complete" style="--plan-progress:${stats.percent}%">
          <div><strong>${stats.percent}%</strong><span>complete</span></div>
        </div>
        <div><p class="eyebrow">Plan progress</p><h3>${stats.completed} of ${stats.total} tasks</h3><p>${pending.length ? `${pending.length} steps left. You have time to keep moving.` : "You finished every planned task. Well done."}</p></div>
      </article>
      <article class="card plan-metric"><span class="plan-metric-icon">${icon("clock", 20)}</span><span class="tiny faint">Minutes studied</span><strong>${stats.minutesStudied}</strong><small>${stats.weekMinutes} this week</small></article>
      <article class="card plan-metric"><span class="plan-metric-icon">${icon("flame", 20)}</span><span class="tiny faint">Study streak</span><strong>${stats.streak}</strong><small>${stats.streak === 1 ? "day" : "days"} in a row</small></article>
    </section>

    <section class="card plan-week-goal" aria-label="Weekly study goal">
      <div><div class="section-head tight"><div><p class="eyebrow">Weekly goal</p><h3>${stats.weekMinutes} of ${weekGoal} minutes</h3></div><strong>${stats.weeklyPercent}%</strong></div>
        <div class="progress"><span style="width:${stats.weeklyPercent}%"></span></div>
      </div>
      <div class="plan-companion">${icon("sparkles", 18)} <span>${esc(companionName())} says: small, steady sessions count.</span></div>
    </section>

    <section class="plan-main-grid">
      <div class="card plan-schedule-card">
        <div class="section-head plan-schedule-head">
          <div><p class="eyebrow">Your schedule</p><h3>${view === "today" ? "Today" : view === "week" ? (weekOffset ? `${weekOffset > 0 ? "Next" : "Previous"} week` : "This week") : "Month"}</h3></div>
          <div class="segmented plan-view-tabs" role="group" aria-label="Study plan view">
            ${Object.entries(VIEW_LABELS).map(([id, label]) => `<button type="button" data-plan-view="${id}" class="${view === id ? "is-active" : ""}" aria-pressed="${view === id}">${label}</button>`).join("")}
          </div>
        </div>
        ${weekNav}${monthNav}${scheduleContent}
      </div>

      <aside class="plan-side">
        <section class="card plan-today-card">
          <div class="section-head tight"><div><p class="eyebrow">Today</p><h3>${todayTasks.length ? `${doneToday} of ${todayTasks.length} done` : "A fresh start"}</h3></div></div>
          <div class="plan-today-meter" role="img" aria-label="${todayProgress}% of today's tasks complete" style="--today-progress:${todayProgress}%"><span>${todayProgress}%</span></div>
          ${todayTasks.length ? `<div class="plan-today-list">${todayTasks.map((task) => `<a href="${esc(task.href)}" class="${task.completed ? "is-complete" : ""}">${task.completed ? icon("checkCircle", 16) : icon("circle", 16)}<span>${esc(task.title)}</span></a>`).join("")}</div>` : `<p class="tiny faint">Your next study day is ${pending[0] ? esc(prettyDate(pending[0].date)) : "complete"}.</p>`}
        </section>
        <section class="card plan-focus-card">
          <p class="eyebrow">Focus timer</p><h3>One calm session</h3>
          <div class="plan-timer" aria-live="polite" data-timer-display>${timerText}</div>
          <p class="tiny faint">${timerRunning ? (timerMode === "focus" ? "Stay with one task. Your focus time is being counted down." : "Step away for a moment. Your break timer is running.") : "Focus for 25 minutes, then take an optional 5-minute break."}</p>
          <div class="cluster">
            <button class="btn btn-primary" type="button" data-timer-start>${timerRunning ? "Pause timer" : timerMode === "focus" ? "Start focus" : "Start break"}</button>
            <button class="btn btn-ghost" type="button" data-timer-reset>Reset</button>
          </div>
        </section>
        <section class="card plan-next-card">
          <p class="eyebrow">Up next</p>
          ${pending[0] ? `<h3>${esc(pending[0].title)}</h3><p>${esc(prettyDate(pending[0].date))} · ${pending[0].minutes} minutes</p><a class="btn btn-soft btn-sm" href="${esc(pending[0].href)}">Open task ${icon("arrowRight", 16)}</a>` : `<h3>Plan complete</h3><p>You have completed your current study goals.</p>`}
        </section>
      </aside>
    </section>
  </div>`;
}

export function planPage() {
  const plan = get().plan;
  return `<div class="page-shell section plan-page">
    <header class="page-head"><div><p class="eyebrow">Study Plan</p><h1>Make a little progress every week.</h1>
      <p class="lede">A kind, practical route through the module. Your plan stays on this device and works offline.</p>
    </div></header>
    ${plan?.config ? dashboardMarkup("today", 25 * 60, false, "focus") : setupMarkup()}
  </div>`;
}

export function mountPlan(root) {
  let view = "today";
  let weekOffset = 0;
  let monthOffset = 0;
  let setupStep = 1;
  let secondsLeft = 25 * 60;
  let timerRunning = false;
  let timerMode = "focus";
  let timerId = null;
  let disposed = false;

  const paint = () => {
    const plan = get().plan;
    root.innerHTML = `<div class="page-shell section plan-page">
      <header class="page-head"><div><p class="eyebrow">Study Plan</p><h1>Make a little progress every week.</h1>
        <p class="lede">A kind, practical route through the module. Your plan stays on this device and works offline.</p>
      </div></header>
      ${plan?.config ? dashboardMarkup(view, secondsLeft, timerRunning, timerMode, weekOffset, monthOffset) : setupMarkup()}
    </div>`;

    root.querySelector("[data-plan-setup]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (setupStep !== 3) return;
      const form = new FormData(event.currentTarget);
      try {
        createPlan({
          targetDate: String(form.get("targetDate") || ""),
          days: form.getAll("days"),
          minutesPerDay: Number(form.get("minutesPerDay")),
          confidence: String(form.get("confidence") || "auto")
        });
        view = "today";
        toast("Your study plan is ready. Start with one small step.", "success");
        say("daily", { mood: "happy", force: true });
        paint();
      } catch (error) {
        toast(error.message || "We could not create that plan. Check your dates and study days.", "error");
      }
    });
    const showSetupStep = (step) => {
      setupStep = Math.max(1, Math.min(3, step));
      root.querySelectorAll("[data-plan-step]").forEach((panel) => {
        panel.hidden = Number(panel.dataset.planStep) !== setupStep;
      });
      root.querySelector(`[data-plan-step="${setupStep}"] h3`)?.focus();
    };
    root.querySelectorAll("[data-plan-next]").forEach((button) => {
      button.addEventListener("click", () => {
        if (setupStep === 1 && !root.querySelector("#planTarget")?.reportValidity()) return;
        if (setupStep === 2 && !root.querySelector("[name=days]:checked")) {
          toast("Choose at least one study day.", "info");
          return;
        }
        showSetupStep(setupStep + 1);
      });
    });
    root.querySelectorAll("[data-plan-back]").forEach((button) => {
      button.addEventListener("click", () => showSetupStep(setupStep - 1));
    });

    root.querySelectorAll("[data-plan-view]").forEach((button) => {
      button.addEventListener("click", () => {
        view = button.dataset.planView;
        paint();
      });
    });
    root.querySelectorAll("[data-week-step]").forEach((button) => {
      button.addEventListener("click", () => { weekOffset += Number(button.dataset.weekStep); paint(); });
    });
    root.querySelectorAll("[data-month-step]").forEach((button) => {
      button.addEventListener("click", () => { monthOffset += Number(button.dataset.monthStep); paint(); });
    });
    root.querySelectorAll("[data-plan-task]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        completeTask(checkbox.dataset.planTask, checkbox.checked);
        toast(checkbox.checked ? "Task marked complete. Nice work." : "Task moved back to your list.", "success", 1800);
      });
    });
    root.querySelector("[data-reschedule]")?.addEventListener("click", () => {
      try {
        const next = smartReschedule();
        toast(`Your remaining tasks are spread through ${prettyDate(next.config.targetDate)}.`, "success");
      } catch (error) {
        toast(error.message || "We could not reschedule those tasks.", "error");
      }
    });
    root.querySelector("[data-rebuild-plan]")?.addEventListener("click", async () => {
      const confirmed = await confirmDialog({
        title: "Change your study plan?",
        message: "Creating a new plan replaces its schedule and task checkmarks. Your learning progress remains saved.",
        confirmText: "Change plan"
      });
      if (confirmed) {
        setupStep = 1;
        update((draft) => { draft.plan = { config: null, tasks: [], sessions: [], reminderDay: null }; }, { type: "plan-reset" });
        paint();
      }
    });
    root.querySelector("[data-print]")?.addEventListener("click", () => window.print());
    root.querySelector("[data-ics]")?.addEventListener("click", () => {
      downloadFile("techpro-study-plan.ics", calendarFile(planTasks()), "text/calendar;charset=utf-8");
      toast("Calendar file downloaded.", "success");
    });
    root.querySelector("[data-reminders]")?.addEventListener("click", async () => {
      if (!("Notification" in window)) {
        toast("This browser does not support study reminders.", "info");
        return;
      }
      if (Notification.permission === "denied") {
        toast("Notifications are blocked in this browser. You can enable them in site settings.", "info");
        return;
      }
      const permission = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
      if (permission !== "granted") {
        toast("No reminder was set. Your plan will still be here when you return.", "info");
        return;
      }
      const current = get().plan;
      const due = current.tasks.filter((task) => task.date === dateKey() && !task.completed);
      if (due.length && current.reminderDay !== dateKey()) {
        new Notification("Your TechPro study plan", { body: `${due.length} small task${due.length === 1 ? "" : "s"} are ready when you are.`, icon: "./assets/icon-192.png" });
        update((draft) => { draft.plan.reminderDay = dateKey(); }, { type: "plan-reminder" });
      }
      toast(due.length ? "Reminder enabled for today's tasks." : "Reminders are enabled. No task is due today.", "success");
    });
    root.querySelector("[data-timer-start]")?.addEventListener("click", () => {
      if (timerRunning) {
        window.clearInterval(timerId);
        timerId = null;
        timerRunning = false;
        paint();
        return;
      }
      timerRunning = true;
      timerId = window.setInterval(() => {
        if (disposed) return;
        secondsLeft = Math.max(0, secondsLeft - 1);
        const display = root.querySelector("[data-timer-display]");
        if (display) display.textContent = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;
        if (secondsLeft === 0) {
          window.clearInterval(timerId);
          timerId = null;
          timerRunning = false;
          if (timerMode === "focus") {
            logFocusSession(25);
            timerMode = "break";
            secondsLeft = 5 * 60;
            toast("Focus session complete. Your 5-minute break is ready.", "success", 5000);
            say("complete", { mood: "proud" });
          } else {
            timerMode = "focus";
            secondsLeft = 25 * 60;
            toast("Break complete. Start another focus session when you are ready.", "success", 4000);
          }
          paint();
        }
      }, 1000);
      paint();
    });
    root.querySelector("[data-timer-reset]")?.addEventListener("click", () => {
      window.clearInterval(timerId);
      timerId = null;
      timerRunning = false;
      timerMode = "focus";
      secondsLeft = 25 * 60;
      paint();
    });
  };

  paint();
  const unsubscribe = subscribe((state, meta) => {
    if (meta.type !== "plan-focus") paint();
  });
  return () => {
    disposed = true;
    window.clearInterval(timerId);
    unsubscribe();
  };
}
