/* ==========================================================================
   Progress, XP, badges, streaks, goals, and Elo-style rating.
   ========================================================================== */
import { get, update, subscribe } from "./store.js";
import { levelForXp, BADGES } from "../data/badges.js";
import { ACTIVITIES, ACTIVITY_BY_ID } from "../data/activities.js";
import { LESSONS } from "../data/lessons.js";
import { dailyChallenge } from "../data/leaderboard-seed.js";

export function dayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return dayKey(date);
}

export function today() {
  return dayKey();
}

export function ensureDaily() {
  const challenge = dailyChallenge();
  const progress = get().progress;
  if (progress.daily?.date === today()) return progress.daily;
  return update((draft) => {
    draft.progress.daily = { date: today(), activityId: challenge.id, done: false };
  }, { type: "daily" }).progress.daily;
}

export function touchStreak() {
  const progress = get().progress;
  const last = progress.streak.lastDay;
  const key = today();
  if (last === key) return progress.streak;
  return update((draft) => {
    const prev = draft.progress.streak;
    const count = last === yesterdayKey() ? (prev.count || 0) + 1 : 1;
    draft.progress.streak = { count, lastDay: key, best: Math.max(prev.best || 0, count) };
  }, { type: "streak" }).progress.streak;
}

export function markLessonRead(lessonId, sectionId = null) {
  const result = update((draft) => {
    const existing = draft.progress.lessons[lessonId] || { readAt: null, sections: [] };
    if (sectionId && !existing.sections.includes(sectionId)) existing.sections.push(sectionId);
    existing.readAt = new Date().toISOString();
    draft.progress.lessons[lessonId] = existing;
    const last = draft.progress.streak.lastDay;
    if (last !== today()) {
      const count = last === yesterdayKey() ? (draft.progress.streak.count || 0) + 1 : 1;
      draft.progress.streak = { count, lastDay: today(), best: Math.max(draft.progress.streak.best || 0, count) };
    }
  }, { type: "lesson-read", lessonId });
  const fresh = evaluateBadges();
  return { state: result, badges: fresh };
}

export function markLessonUnread(lessonId) {
  return update((draft) => {
    delete draft.progress.lessons[lessonId];
  }, { type: "lesson-unread", lessonId });
}

export function isLessonRead(lessonId) {
  return Boolean(get().progress.lessons[lessonId]?.readAt);
}

export function lessonSectionRead(lessonId, sectionId) {
  return Boolean(get().progress.lessons[lessonId]?.sections?.includes(sectionId));
}

export function toggleBookmark(lessonId) {
  const has = get().bookmarks.includes(lessonId);
  update((draft) => {
    draft.bookmarks = has ? draft.bookmarks.filter((id) => id !== lessonId) : [...draft.bookmarks, lessonId];
  }, { type: "bookmark", lessonId });
  return !has;
}

export function isBookmarked(lessonId) {
  return get().bookmarks.includes(lessonId);
}

export function saveNote(lessonId, text) {
  return update((draft) => {
    draft.notes[lessonId] = text;
  }, { type: "note", lessonId });
}

export function getNote(lessonId) {
  return get().notes[lessonId] || "";
}

export function saveJournal(entry) {
  return update((draft) => {
    const existing = draft.journal.find((item) => item.id === entry.id);
    if (existing) Object.assign(existing, entry, { updatedAt: new Date().toISOString() });
    else draft.journal.unshift({ ...entry, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    draft.journal = draft.journal.slice(0, 30);
  }, { type: "journal" });
}

export function awardXp(amount, reason = "") {
  return update((draft) => {
    draft.progress.xp = Math.max(0, (draft.progress.xp || 0) + Math.round(amount));
  }, { type: "xp", reason, amount });
}

/**
 * Record one finished activity. Keeps the best score, awards only improved XP,
 * updates rating and goals, then checks badges.
 */
export function recordActivity({
  id,
  score = 0,
  total = 1,
  accuracy = null,
  stars = 0,
  xp = 0,
  meta = {}
}) {
  const activity = ACTIVITY_BY_ID[id];
  const percent = accuracy != null ? Math.round(accuracy) : total ? Math.round((score / total) * 100) : 0;
  const previous = get().progress.activities[id] || { bestPercent: 0, attempts: 0, awardedXp: 0, stars: 0 };
  const deservedXp = Math.round(xp || activity?.xp || 0);
  const newBadges = [];
  let earnedXp = 0;

  update((draft) => {
    const record = draft.progress.activities[id] || { bestPercent: 0, attempts: 0, awardedXp: 0, stars: 0 };
    record.attempts = (record.attempts || 0) + 1;
    record.lastAt = new Date().toISOString();
    record.lastPercent = percent;
    record.lastScore = score;
    record.lastTotal = total;
    record.stars = Math.max(record.stars || 0, stars);
    record.bestPercent = Math.max(record.bestPercent || 0, percent);
    record.bestScore = Math.max(record.bestScore || 0, score);
    record.bestTotal = Math.max(record.bestTotal || 0, total);
    record.awardedXp = record.awardedXp || 0;
    earnedXp = Math.max(0, deservedXp - record.awardedXp);
    if (percent > (record.bestPercent || 0) || !record.awardedXp) {
      // Award the improved share even when the percentage is unchanged.
      earnedXp = Math.max(earnedXp, Math.round(deservedXp * 0.35));
    }
    record.awardedXp += earnedXp;
    draft.progress.activities[id] = record;
    draft.progress.xp = Math.max(0, (draft.progress.xp || 0) + earnedXp);

    // Streak
    const last = draft.progress.streak.lastDay;
    if (last !== today()) {
      const count = last === yesterdayKey() ? (draft.progress.streak.count || 0) + 1 : 1;
      draft.progress.streak = { count, lastDay: today(), best: Math.max(draft.progress.streak.best || 0, count) };
    }

    // Elo-style rating against the activity's own difficulty.
    const expected = 1 / (1 + Math.pow(10, ((activity?.xp || 80) - (draft.rating || 1000)) / 400));
    const actual = percent / 100;
    draft.rating = Math.round((draft.rating || 1000) + 14 * (actual - expected));
    draft.rating = Math.max(600, Math.min(1800, draft.rating));

    // Goal mastery
    if (activity?.goal) {
      const current = draft.progress.goals[activity.goal] || 0;
      const weighted = Math.round(percent * 0.65 + Math.min(100, record.attempts * 10) * 0.35);
      draft.progress.goals[activity.goal] = Math.max(current, Math.min(100, weighted));
    }

    // Daily challenge
    const challenge = dailyChallenge();
    if (id === "daily" || (meta.daily && draft.progress.daily?.date === today())) {
      draft.progress.daily.done = true;
    }
    if (id === "daily") {
      draft.progress.daily = { date: today(), activityId: challenge.id, done: true };
    }

    // Save a compact score row for the local leaderboard.
    draft.scores = [
      { id, percent, stars, at: new Date().toISOString(), mode: meta.mode || null },
      ...(draft.scores || [])
    ].slice(0, 40);

    // Best of each activity is enough for a local player card.
    newBadges.push(...checkBadges(draft));
    newBadges.forEach((badge) => {
      if (!draft.progress.badges.includes(badge.id)) draft.progress.badges.push(badge.id);
    });
  }, { type: "activity", id });

  return {
    earnedXp,
    percent,
    stars,
    newBadges,
    rating: get().rating,
    level: levelForXp(get().progress.xp)
  };
}

function checkBadges(draft) {
  const earned = [];
  const activities = draft.progress.activities;
  const has = (id) => draft.progress.badges.includes(id);
  const add = (id) => {
    if (!has(id) && !earned.some((badge) => badge.id === id)) {
      const badge = BADGES.find((item) => item.id === id);
      if (badge) earned.push(badge);
    }
  };
  const lessonsRead = Object.keys(draft.progress.lessons).filter((id) => draft.progress.lessons[id].readAt);
  const perfect = (id) => activities[id]?.bestPercent === 100;

  if (lessonsRead.length >= 1) add("first-step");
  if (lessonsRead.length >= LESSONS.length) add("bookworm");
  if ((activities["sort-station"]?.bestPercent || 0) >= 80) add("sorter");
  if ((activities["order-rush"]?.bestPercent || 0) === 100) add("sequence");
  if ((activities["software-mission"]?.bestPercent || 0) === 100) add("toolsmith");
  if ((activities["spot-mistake"]?.bestPercent || 0) >= 90) add("eagle-eye");
  if ((activities["anatomy"]?.bestPercent || 0) >= 90) add("anatomist");
  if (activities["pc-lab"]?.attempts) add("first-build");
  if ((activities["pc-lab"]?.stars || 0) >= 3) add("clean-build");
  if (activities["disassembly"]?.attempts) add("teardown");
  if ((activities["case-files"]?.bestPercent || 0) >= 80) add("case-closed");
  if ((activities["flashcards"]?.bestPercent || 0) >= 80) add("recall");
  if (activities["tech-checkup"]?.attempts) add("inspector");
  if (perfect("word-chain")) add("wordchain");
  if (draft.journal?.length) add("reflective");
  if ((activities["final"]?.bestPercent || 0) >= 80) add("assembly-ready");
  if (perfect("final")) add("perfect-exam");
  if ((draft.progress.streak?.best || 0) >= 3) add("three-day");
  if ((draft.progress.streak?.count || 0) >= 7) add("week-streak");
  if (Object.values(draft.progress.goals || {}).every((value) => value >= 80)) add("goal-getter");
  if (draft.progress.daily?.done) add("daily");
  if (draft.companion?.renamed && Object.keys(activities).length > 0) add("helper");
  return earned;
}

export function evaluateBadges() {
  const before = get().progress.badges.slice();
  const earned = update((draft) => {
    const found = checkBadges(draft);
    found.forEach((badge) => {
      if (!draft.progress.badges.includes(badge.id)) draft.progress.badges.push(badge.id);
    });
  }, { type: "badges" }).progress.badges.filter((id) => !before.includes(id));
  return earned.map((id) => BADGES.find((badge) => badge.id === id)).filter(Boolean);
}

export function goalMastery(goalId) {
  const state = get();
  const activities = ACTIVITIES.filter((activity) => activity.goal === goalId && activity.id !== "final");
  const bests = activities.map((activity) => state.progress.activities[activity.id]?.bestPercent || 0);
  const activityPart = bests.length ? bests.reduce((sum, value) => sum + value, 0) / bests.length : 0;
  const relevantLessons = LESSONS.filter((lesson) => lesson.goal === goalId);
  const readPart = relevantLessons.length
    ? (relevantLessons.filter((lesson) => state.progress.lessons[lesson.id]?.readAt).length / relevantLessons.length) * 100
    : 0;
  const readingWeight = 0.45;
  return Math.round(activityPart * (1 - readingWeight) + readPart * readingWeight);
}

export function overallProgress() {
  const lessonsRead = LESSONS.filter((lesson) => get().progress.lessons[lesson.id]?.readAt).length;
  const activitiesDone = Object.keys(get().progress.activities).length;
  return {
    lessonsRead,
    lessonsTotal: LESSONS.length,
    activitiesDone,
    activitiesTotal: ACTIVITIES.length,
    badges: get().progress.badges.length,
    xp: get().progress.xp,
    level: levelForXp(get().progress.xp),
    streak: get().progress.streak,
    rating: get().rating
  };
}

export function activityPercent(id) {
  return get().progress.activities[id]?.bestPercent || 0;
}

export function activityStars(id) {
  return get().progress.activities[id]?.stars || 0;
}

export { subscribe };
