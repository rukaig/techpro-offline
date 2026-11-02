/* ==========================================================================
   Play hub — every interactive, grouped by how you want to practise.
   ========================================================================== */
import { ACTIVITIES } from "../data/activities.js";
import { GOALS } from "../data/lessons.js";
import { get } from "../services/store.js";
import { activityBest } from "../app/game-kit.js";
import { icon, stars } from "../app/icons.js";
import { cardArt, companionArt } from "../app/art.js";
import { esc } from "../app/ui.js";
import { showInstallCard } from "../app/chrome.js";

const GROUPS = [
  {
    id: "start",
    title: "Start here",
    note: "Baseline, vocabulary, and the big build.",
    ids: ["pretest", "pc-lab", "disassembly"]
  },
  {
    id: "drills",
    title: "Quick drills",
    note: "Five to eight minutes each. Perfect for a warm-up.",
    ids: ["sort-station", "order-rush", "software-mission", "spot-mistake", "which-computer"]
  },
  {
    id: "explore",
    title: "Explore & inspect",
    note: "Look closely at parts, software, and a real workstation.",
    ids: ["anatomy", "software-sorter", "tech-checkup"]
  },
  {
    id: "review",
    title: "Review & reflect",
    note: "Bring it together, then prove it.",
    ids: ["case-files", "flashcards", "word-chain", "reflection", "final"]
  }
];

export function playPage() {
  const state = get();
  const done = Object.keys(state.progress.activities).length;
  const flagship = ACTIVITIES.find((activity) => activity.id === "pc-lab");
  const labBest = activityBest("pc-lab");
  return `<div class="play-hub page-shell">
    <header class="page-head play-head">
      <div>
        <p class="eyebrow">The Interactives</p>
        <h1>Sixteen ways to make it stick.</h1>
        <p class="lede">Every activity maps back to a module section. Short drills for a spare five minutes, the PC Lab for a full build, and a final exam when you are ready.</p>
      </div>
      <div class="play-head-art" aria-hidden="true">${companionArt("happy", { size: 118 })}</div>
    </header>

    <div class="play-progress-row">
      <div class="play-progress-copy"><span class="eyebrow">Your run</span><strong>${done} of ${ACTIVITIES.length} interactives recorded</strong></div>
      <div class="progress"><span style="width:${Math.round((done / ACTIVITIES.length) * 100)}%"></span></div>
      <a class="btn btn-ghost btn-sm" href="/profile">${icon("chart", 17)} Progress</a>
    </div>

    <section class="flagship-banner" aria-labelledby="labBannerTitle">
      <div class="flagship-banner-copy">
        <p class="eyebrow">Flagship · PC Lab</p>
        <h2 id="labBannerTitle">${labBest.percent ? "Back to the bench?" : "Build a desktop from an empty case."}</h2>
        <p>Parts tray, compatibility checks, thermal paste, RAM clips, a tighten meter, cable routing, POST, and a companion who comments on your choices. Guided, practice, or challenge.</p>
        <div class="cluster">
          <a class="btn btn-accent" href="/play/pc-lab">${icon("wrench", 18)} ${labBest.percent ? "Build again" : "Start guided build"}</a>
          <a class="btn btn-ghost" href="/play/pc-lab?mode=disassembly">${icon("screwdriver", 18)} Disassemble</a>
        </div>
      </div>
      <div class="flagship-banner-score">
        ${labBest.percent ? `<span class="big-score">${labBest.percent}<small>%</small></span>${stars(labBest.stars)}<span class="tiny faint">${labBest.attempts} build${labBest.attempts === 1 ? "" : "s"}</span>` : `<span class="big-score">10<small> steps</small></span><span class="tiny faint">No build recorded yet.</span>`}
      </div>
    </section>

    <div class="play-filters" role="group" aria-label="Filter activities">
      <button class="chip is-active" type="button" data-filter="all">All ${ACTIVITIES.length}</button>
      ${Object.entries(GOALS).map(([id, goal]) => `<button class="chip" type="button" data-filter="${id}">${esc(goal.short)}</button>`).join("")}
      <span class="play-filter-count tiny faint" data-filter-count>${ACTIVITIES.length} shown</span>
    </div>

    ${GROUPS.map((group) => `<section class="play-group" data-group aria-labelledby="group-${group.id}">
      <div class="section-head tight">
        <div><p class="eyebrow">${esc(group.note)}</p><h2 id="group-${group.id}">${esc(group.title)}</h2></div>
      </div>
      <div class="activity-grid">
        ${group.ids.map((id) => {
          const activity = ACTIVITIES.find((item) => item.id === id);
          return activity ? activityCard(activity) : "";
        }).join("")}
      </div>
    </section>`).join("")}

    <section class="section play-extras">
      <div class="play-extra card card-pad">
        <div><p class="eyebrow">Assessment</p><h2>The two module tests</h2><p>The pre-test sets a baseline. The post-test is the same 15-item assessment with explanations, a timer, and your best score kept.</p></div>
        <div class="cluster"><a class="btn btn-primary" href="/exam/pretest">Pre-test</a><a class="btn btn-soft" href="/exam/final">Final Exam</a></div>
      </div>
      <div class="play-extra card card-pad">
        <div><p class="eyebrow">Class</p><h2>Leaderboard & teacher view</h2><p>See where your XP lands, open player cards, or check class progress and export a CSV.</p></div>
        <div class="cluster"><a class="btn btn-ghost" href="/leaderboard">${icon("trophy", 17)} Leaderboard</a><a class="btn btn-ghost" href="/teacher">${icon("users", 17)} Teacher view</a></div>
      </div>
    </section>

    <section class="page-shell section">
      ${showInstallCard()}
    </section>
  </div>`;
}

function activityCard(activity) {
  const best = activityBest(activity.id);
  return `<a class="activity-card ${activity.flagship ? "is-flagship" : ""}" href="${activity.route}" data-activity-card data-goal="${activity.goal}">
    <span class="activity-card-top">
      <span class="activity-icon color-${activity.color}">${icon(activity.icon, 24)}</span>
      ${activity.flagship ? `<span class="tag tag-accent">Flagship</span>` : best.percent ? `<span class="tag tag-success">${best.percent}%</span>` : `<span class="tag">${activity.minutes} min</span>`}
    </span>
    <span class="activity-card-copy">
      <strong>${esc(activity.title)}</strong>
      <span>${esc(activity.tagline)}</span>
      <small>${esc(activity.description)}</small>
    </span>
    <span class="activity-card-foot">
      <span>${activity.xp} XP</span>
      ${best.stars ? stars(best.stars) : `<span class="tiny faint">Not played</span>`}
      ${icon("arrowRight", 17)}
    </span>
  </a>`;
}

export function mountPlay(root) {
  const cards = Array.from(root.querySelectorAll("[data-activity-card]"));
  const groups = Array.from(root.querySelectorAll("[data-group]"));
  const count = root.querySelector("[data-filter-count]");
  root.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      root.querySelectorAll("[data-filter]").forEach((el) => el.classList.toggle("is-active", el === button));
      let shown = 0;
      cards.forEach((card) => {
        const visible = filter === "all" || card.dataset.goal === filter;
        card.hidden = !visible;
        if (visible) shown += 1;
      });
      groups.forEach((group) => {
        group.hidden = !group.querySelector("[data-activity-card]:not([hidden])");
      });
      if (count) count.textContent = `${shown} shown`;
    });
  });
}
