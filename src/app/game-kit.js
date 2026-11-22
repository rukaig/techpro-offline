/* ==========================================================================
   Shared pieces for every interactive: headers, scores, results, badges.
   ========================================================================== */
import { ACTIVITIES, ACTIVITY_BY_ID } from "../data/activities.js";
import { BADGE_BY_ID, levelForXp } from "../data/badges.js";
import { get } from "../services/store.js";
import { recordActivity } from "../services/progress.js";
import { cheer, oops, say } from "../services/companion.js";
import { icon, stars as starIcons } from "./icons.js";
import { sound } from "./audio.js";
import { confetti } from "./confetti.js";
import { esc, formatDuration, announce } from "./ui.js";

export function shuffle(items, seed = Date.now()) {
  const copy = [...items];
  let state = Math.abs(seed) % 2147483647 || 7;
  const random = () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function starsFor(percent) {
  if (percent >= 92) return 3;
  if (percent >= 72) return 2;
  return 1;
}

export function activityRecord(id) {
  return get().progress.activities[id] || null;
}

export function activityBest(id) {
  const record = activityRecord(id);
  return {
    percent: record?.bestPercent || 0,
    stars: record?.stars || 0,
    attempts: record?.attempts || 0
  };
}

export function activityHero(activity, {
  eyebrow = "Interactive",
  intro = activity.description,
  back = "/play",
  backLabel = "All interactives",
  actions = "",
  meta = ""
} = {}) {
  const best = activityBest(activity.id);
  return `<header class="game-head">
    <a class="back-link" href="${back}">${icon("arrowLeft", 17)} ${esc(backLabel)}</a>
    <div class="game-head-grid">
      <div class="game-head-copy">
        <p class="eyebrow">${esc(eyebrow)} ${activity.tagline ? `· ${esc(activity.tagline)}` : ""}</p>
        <h1>${esc(activity.title)}</h1>
        <p class="lede">${esc(intro)}</p>
        <div class="game-meta">
          <span class="pill">${icon("clock", 15)} About ${activity.minutes} min</span>
          <span class="pill">${icon("zap", 15)} Up to ${activity.xp} XP</span>
          <span class="pill">${icon("target", 15)} ${esc(goalName(activity.goal))}</span>
          ${meta}
        </div>
        ${actions ? `<div class="cluster mt-4">${actions}</div>` : ""}
      </div>
      <aside class="best-card" aria-label="Your best result">
        <span class="best-icon">${icon(activity.icon || "gamepad", 30)}</span>
        <div>
          <p class="best-label">Your best</p>
          <p class="best-value">${best.percent ? `${best.percent}%` : "Not yet"}</p>
          ${best.stars ? starIcons(best.stars) : `<span class="tiny faint">First attempt is free practice.</span>`}
          <p class="tiny faint">${best.attempts ? `${best.attempts} attempt${best.attempts === 1 ? "" : "s"}` : "No score recorded"}</p>
        </div>
      </aside>
    </div>
  </header>`;
}

function goalName(goal) {
  return {
    identify: "Identify parts",
    software: "Tell software apart",
    safety: "Work safely",
    explain: "Explain the system"
  }[goal] || "Learning goal";
}

export function gameBar({ label = "Progress", value = 0, total = 1, aside = "" }) {
  const percent = total ? Math.round((value / total) * 100) : 0;
  return `<div class="game-bar">
    <div class="game-bar-copy"><span>${esc(label)}</span><strong data-bar-label>${value} / ${total}</strong>${aside ? `<span class="game-bar-aside">${aside}</span>` : ""}</div>
    <div class="progress" role="progressbar" aria-label="${esc(label)}" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${value}"><span style="width:${percent}%"></span></div>
  </div>`;
}

export function feedbackMarkup() {
  return `<div class="feedback" role="status" aria-live="polite"></div>`;
}

export function setFeedback(root, state, title, message) {
  const el = root.querySelector(".feedback");
  if (!el) return;
  el.className = `feedback is-visible is-${state}`;
  el.innerHTML = `${icon(state === "correct" ? "checkCircle" : state === "wrong" ? "xCircle" : "lightbulb", 20)}<div>${title ? `<strong>${esc(title)}</strong>` : ""}<span>${message || ""}</span></div>`;
}

export function clearFeedback(root) {
  const el = root.querySelector(".feedback");
  if (el) el.className = "feedback";
}

export function hintBlock(text, id = "hint") {
  return `<div class="hint-row">
    <button class="btn btn-ghost btn-sm" type="button" data-hint="${id}">${icon("lightbulb", 17)} Need a hint?</button>
    <p class="hint-copy" id="${id}" hidden>${esc(text)}</p>
  </div>`;
}

export function bindHint(root) {
  root.querySelectorAll("[data-hint]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = root.querySelector(`#${button.dataset.hint}`);
      if (!target) return;
      target.hidden = !target.hidden;
      button.setAttribute("aria-expanded", String(!target.hidden));
      if (!target.hidden) say("Nice and steady. The hint is on the bench.");
    });
  });
}

/**
 * Record a finished activity and return the result panel markup.
 * Call bindResultPanel(root, retry) after inserting it.
 */
export function finishGame({
  activity,
  score = 0,
  total = 1,
  accuracy = null,
  stars = null,
  xp = null,
  detail = "",
  meta = {},
  timeSeconds = null,
  heading = "Bench work complete",
  intro = ""
}) {
  const percent = accuracy != null ? Math.round(accuracy) : total ? Math.round((score / total) * 100) : 0;
  const starCount = stars == null ? starsFor(percent) : stars;
  const xpAward = xp == null ? activity.xp : xp;
  const result = recordActivity({
    id: activity.id,
    score,
    total,
    accuracy: percent,
    stars: starCount,
    xp: xpAward,
    meta
  });
  sound.finish();
  if (starCount >= 2) {
    confetti({ count: 40 + starCount * 30, duration: 1700 });
    cheer();
  } else if (percent >= 60) {
    say("complete", { mood: "proud", force: true });
  } else {
    oops("Not quite. Check the review below, then run it again.");
  }
  announce(`${activity.title} complete. ${percent} percent. ${starCount} of 3 stars.`);

  const next = nextActivity(activity);
  const examRoute = activity.moduleId === "module2" ? "/exam/bios-final" : "/exam/final";
  const newBadges = result.newBadges || [];
  return `<section class="result-panel" aria-labelledby="resultTitle" data-result>
    <div class="result-burst" aria-hidden="true">${starIcons(starCount)}</div>
    <p class="eyebrow">${percent >= 72 ? "Good work" : "Run recorded"} · ${esc(activity.title)}</p>
    <h2 id="resultTitle">${esc(heading)}</h2>
    ${intro ? `<p class="lede">${esc(intro)}</p>` : ""}
    <div class="result-score">
      <span class="result-percent">${percent}<small>%</small></span>
      <span class="result-fraction">${score} of ${total} correct</span>
    </div>
    <div class="result-stats">
      <div class="stat"><span class="stat-value">+${result.earnedXp}</span><span class="stat-label">XP earned</span></div>
      <div class="stat"><span class="stat-value">${starCount}<span class="stat-unit">/3</span></span><span class="stat-label">Stars</span></div>
      ${timeSeconds != null ? `<div class="stat"><span class="stat-value">${formatDuration(timeSeconds)}</span><span class="stat-label">Time</span></div>` : ""}
      <div class="stat"><span class="stat-value">${get().rating}</span><span class="stat-label">Bench rating</span></div>
    </div>
    ${newBadges.length ? `<div class="badge-unlock" aria-live="polite">
      <p class="eyebrow">New badge${newBadges.length > 1 ? "s" : ""}</p>
      <div class="badge-unlock-row">${newBadges.map((badge) => `<span class="badge-chip">${icon(badge.icon, 18)} ${esc(badge.name)}</span>`).join("")}</div>
    </div>` : ""}
    ${detail ? `<div class="result-detail">${detail}</div>` : ""}
    <div class="result-actions">
      <button class="btn btn-primary" type="button" data-retry>${icon("refresh", 18)} Try again</button>
      <a class="btn btn-ghost" href="/play">${icon("gamepad", 18)} All interactives</a>
      ${next ? `<a class="btn btn-soft" href="${next.route}">Next: ${esc(next.title)} ${icon("arrowRight", 17)}</a>` : `<a class="btn btn-soft" href="${examRoute}">Module exam ${icon("arrowRight", 17)}</a>`}
    </div>
    <p class="tiny faint result-level">Level ${result.level.level} · ${esc(result.level.title)} · ${get().progress.xp.toLocaleString("en-PH")} XP total</p>
  </section>`;
}

export function bindResultPanel(root, retry) {
  root.querySelector("[data-retry]")?.addEventListener("click", () => {
    sound.click();
    retry?.();
  });
}

function nextActivity(activity) {
  const index = ACTIVITIES.findIndex((item) => item.id === activity.id);
  if (index < 0) return null;
  return ACTIVITIES.slice(index + 1).find((item) => item.moduleId === activity.moduleId) || null;
}

export function activityLink(activity) {
  return `<a class="activity-tile" href="${activity.route}">
    <span class="activity-icon color-${activity.color}">${icon(activity.icon, 24)}</span>
    <span class="activity-copy"><strong>${esc(activity.title)}</strong><small>${esc(activity.tagline)}</small></span>
    <span class="activity-arrow">${icon("arrowRight", 18)}</span>
  </a>`;
}

export function emptyGame(iconName, title, message) {
  return `<div class="empty-state">${icon(iconName, 36)}<h2>${esc(title)}</h2><p>${esc(message)}</p><a class="btn btn-primary" href="/play">Back to interactives</a></div>`;
}

export function badgeName(id) {
  return BADGE_BY_ID[id]?.name || id;
}

export function levelLine() {
  const level = levelForXp(get().progress.xp || 0);
  return `Level ${level.level} · ${level.title}`;
}

export { ACTIVITIES, ACTIVITY_BY_ID };
