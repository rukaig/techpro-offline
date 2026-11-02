/* ==========================================================================
   Home — the shopfront. One clear next step, a daily win, and the bench.
   ========================================================================== */
import { LESSONS, GOALS } from "../data/lessons.js";
import { ACTIVITIES } from "../data/activities.js";
import { dailyChallenge } from "../data/leaderboard-seed.js";
import { get, update } from "../services/store.js";
import {
  ensureDaily, overallProgress, goalMastery, recordActivity, today
} from "../services/progress.js";
import { companionName, say } from "../services/companion.js";
import { icon, stars as starIcons } from "../app/icons.js";
import { cardArt, companionArt, brandMark } from "../app/art.js";
import { esc, toast, announce } from "../app/ui.js";
import { showInstallCard } from "../app/chrome.js";
import { sound } from "../app/audio.js";
import { confetti } from "../app/confetti.js";
import { activityBest } from "../app/game-kit.js";
import { DEMO_PLAYERS } from "../data/leaderboard-seed.js";

export function homePage() {
  const state = get();
  const overall = overallProgress();
  const daily = ensureDaily();
  const challenge = dailyChallenge();
  const goals = Object.entries(GOALS).map(([id, goal]) => ({ id, ...goal, value: goalMastery(id) }));
  const localName = state.profile.displayName || "You";
  const localXp = state.progress.xp || 0;
  const ranked = [...DEMO_PLAYERS, { displayName: localName, xp: localXp, isYou: true, section: state.profile.gradeSection || "Guest bench", rating: state.rating }]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 4);
  const nextLesson = LESSONS.find((lesson) => !state.progress.lessons[lesson.id]?.readAt) || LESSONS[0];
  const nextActivity = ACTIVITIES.find((activity) => !state.progress.activities[activity.id]?.attempts) || ACTIVITIES.find((a) => a.id === "final");
  const flagship = ACTIVITIES.find((activity) => activity.id === "pc-lab");
  const featured = ["sort-station", "anatomy", "spot-mistake", "flashcards"].map((id) => ACTIVITIES.find((a) => a.id === id));
  const libraryProgress = Math.round((overall.lessonsRead / overall.lessonsTotal) * 100);
  const activityProgress = Math.round((overall.activitiesDone / overall.activitiesTotal) * 100);

  return `<div class="home">
    <section class="hero-home page-shell">
      <div class="hero-copy">
        <p class="eyebrow">CSS NC II · COC 1 · Assemble Computer Hardware</p>
        <h1>Build the machine.<br><span class="hero-accent">Understand every part.</span></h1>
        <p class="lede">A learning space for the DepEd module, rebuilt as something you can actually touch. Read the lessons, sort the software, then build a desktop from an empty case to a clean first boot.</p>
        <div class="cluster hero-actions">
          <a class="btn btn-primary btn-lg" href="/library/${nextLesson.id}">${state.progress.lessons[nextLesson.id] ? "Open the library" : `Start Lesson ${nextLesson.number}`} ${icon("arrowRight", 19)}</a>
          <a class="btn btn-ghost btn-lg" href="/play/pc-lab">${icon("wrench", 19)} Enter the PC Lab</a>
          <a class="btn btn-ghost btn-lg" href="/plan">${icon("calendar", 19)} Study plan</a>
        </div>
        <div class="hero-proof">
          <span>${icon("bookOpen", 17)} ${overall.lessonsTotal} lessons</span>
          <span>${icon("gamepad", 17)} ${overall.activitiesTotal} interactives</span>
          <span>${icon("shield", 17)} Works offline</span>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-art-frame">${cardArt("build")}</div>
        <div class="hero-stamp">
          <span class="hero-stamp-mark">${brandMark(30)}</span>
          <span><strong>TechPro</strong><small>First Edition · 2026</small></span>
        </div>
        <div class="hero-chip float-a">${icon("motherboard", 20)} <span>10-step build</span></div>
        <div class="hero-chip float-b">${icon("shield", 20)} <span>Safety first</span></div>
      </div>
    </section>

    <section class="page-shell daily-wrap" aria-labelledby="dailyTitle">
      <div class="daily-card">
        <div class="daily-mark" aria-hidden="true">${companionArt("thinking", { size: 78 })}</div>
        <div class="daily-copy">
          <p class="eyebrow">Daily challenge ${state.progress.daily?.done ? "· complete" : ""}</p>
          <h2 id="dailyTitle">${esc(challenge.title)}</h2>
          <p>${esc(challenge.prompt)}</p>
          <div class="daily-options" data-daily-options>
            ${challenge.options.map((option, index) => `<button class="daily-option" type="button" data-daily-index="${index}"><span class="option-letter">${String.fromCharCode(65 + index)}</span>${esc(option)}</button>`).join("")}
          </div>
          <div class="feedback daily-feedback" role="status" aria-live="polite" data-daily-feedback></div>
        </div>
        <div class="daily-side">
          <span class="daily-xp">+${challenge.xp} XP</span>
          <span class="tiny faint">One small win counts.</span>
          <button class="btn btn-ghost btn-sm" type="button" data-open-companion>${icon("message", 16)} Ask <span data-companion-label>${esc(companionName())}</span></button>
        </div>
      </div>
    </section>

    <section class="page-shell section" aria-labelledby="benchTitle">
      <div class="section-head">
        <div>
          <p class="eyebrow">Your bench</p>
          <h2 id="benchTitle">${state.profile.displayName ? `Good to see you, ${esc(state.profile.displayName.split(" ")[0])}.` : "A quiet bench, ready when you are."}</h2>
          <p>Progress saves on this device. Sign in later to carry it between devices.</p>
        </div>
        <a class="btn btn-ghost" href="/profile">${icon("chart", 18)} Full progress</a>
      </div>
      <div class="bench-grid">
        <div class="bench-level card card-pad">
          <div class="level-orbit" style="--ring:${overall.level.progress}">
            <span class="level-number">${overall.level.level}</span>
            <span class="level-caption">level</span>
          </div>
          <div class="level-copy">
            <p class="eyebrow">${esc(overall.level.title)}</p>
            <h3>${overall.xp.toLocaleString("en-PH")} XP</h3>
            <p class="tiny faint">${overall.level.next ? `${overall.level.toNext} XP to ${esc(overall.level.next.title)}` : "Top level reached. Keep the bench warm."}</p>
            <div class="progress mt-2"><span style="width:${overall.level.progress}%"></span></div>
          </div>
        </div>
        <div class="bench-stats">
          <div class="stat"><span class="stat-value">${overall.streak.count || 0}<span class="stat-unit">d</span></span><span class="stat-label">Streak</span></div>
          <div class="stat"><span class="stat-value">${overall.badges}<span class="stat-unit">/${22}</span></span><span class="stat-label">Badges</span></div>
          <div class="stat"><span class="stat-value">${overall.rating}</span><span class="stat-label">Rating</span></div>
          <div class="stat"><span class="stat-value">${libraryProgress}<span class="stat-unit">%</span></span><span class="stat-label">Library</span></div>
        </div>
        <div class="bench-goals card card-pad">
          <div class="section-head tight"><h3>Four learning goals</h3><span class="pill pill-soft">${activityProgress}% played</span></div>
          ${goals.map((goal) => `<div class="goal-row">
            <div class="goal-row-head"><span>${esc(goal.name)}</span><strong>${goal.value}%</strong></div>
            <div class="progress thin ${goal.value >= 80 ? "success" : ""}"><span style="width:${goal.value}%"></span></div>
          </div>`).join("")}
          <p class="tiny faint">Reading and practice both count toward mastery.</p>
        </div>
      </div>
    </section>

    <section class="page-shell section" aria-labelledby="halvesTitle">
      <div class="section-head">
        <div><p class="eyebrow">Two halves</p><h2 id="halvesTitle">Read it. Then do it.</h2></div>
        <p class="section-aside">The Library follows the module. The interactives make you use it.</p>
      </div>
      <div class="halves-grid">
        <a class="half-card half-library" href="/library">
          <span class="half-art" aria-hidden="true">${cardArt("remember")}</span>
          <span class="half-copy">
            <span class="eyebrow">The Library</span>
            <strong>Nine lessons, straight from the module</strong>
            <span>Search, bookmark, tap a term for the glossary, and mark a lesson read.</span>
            <span class="half-cta">${icon("bookOpen", 18)} Open the Library ${icon("arrowRight", 17)}</span>
          </span>
        </a>
        <a class="half-card half-play" href="/play">
          <span class="half-art" aria-hidden="true">${cardArt("safety")}</span>
          <span class="half-copy">
            <span class="eyebrow">The Interactives</span>
            <strong>Sixteen ways to practise</strong>
            <span>Sort, sequence, spot mistakes, label the board, inspect a PC, and build one.</span>
            <span class="half-cta">${icon("gamepad", 18)} Open the games ${icon("arrowRight", 17)}</span>
          </span>
        </a>
      </div>
    </section>

    <section class="page-shell section" aria-labelledby="flagshipTitle">
      <div class="flagship-card">
        <div class="flagship-copy">
          <p class="eyebrow">The flagship</p>
          <h2 id="flagshipTitle">PC Lab: build it from the case up.</h2>
          <p>Pick the compatible parts, seat the processor, apply the paste, lock both RAM clips, tighten without crushing the board, route the cables, and pass POST. Guided, practice, and challenge modes.</p>
          <div class="cluster">
            <a class="btn btn-accent btn-lg" href="/play/pc-lab">${icon("wrench", 19)} Start a guided build</a>
            <a class="btn btn-ghost" href="/play/pc-lab?mode=disassembly">${icon("screwdriver", 18)} Disassembly Mode</a>
          </div>
          <div class="flagship-stats">
            <span><strong>10</strong> ordered steps</span>
            <span><strong>8</strong> mini-checks</span>
            <span><strong>3</strong> star ratings</span>
          </div>
        </div>
        <div class="flagship-art" aria-hidden="true">
          <div class="flagship-screen">
            <span class="screen-label">CASE · OPEN</span>
            ${caseSilhouette()}
            <span class="screen-pulse pulse-one"></span>
            <span class="screen-pulse pulse-two"></span>
          </div>
          <div class="flagship-buddy">${companionArt("proud", { size: 92 })}<span>“Snug, not crushed.”</span></div>
        </div>
      </div>
      <div class="activity-strip">
        ${featured.map((activity) => `<a class="mini-activity" href="${activity.route}">
          <span class="mini-icon color-${activity.color}">${icon(activity.icon, 22)}</span>
          <span><strong>${esc(activity.title)}</strong><small>${esc(activity.tagline)}</small></span>
        </a>`).join("")}
      </div>
    </section>

    <section class="page-shell section" aria-labelledby="lessonsHomeTitle">
      <div class="section-head">
        <div><p class="eyebrow">From the module</p><h2 id="lessonsHomeTitle">Start where you are</h2></div>
        <a class="btn btn-ghost" href="/library">All nine lessons ${icon("arrowRight", 17)}</a>
      </div>
      <div class="lesson-grid home-lessons">
        ${LESSONS.slice(0, 6).map((lesson) => {
          const read = Boolean(state.progress.lessons[lesson.id]?.readAt);
          return `<a class="lesson-card ${read ? "is-read" : ""}" href="/library/${lesson.id}">
            <span class="lesson-number">${String(lesson.number).padStart(2, "0")}</span>
            <span class="lesson-card-copy">
              <span class="eyebrow">${esc(lesson.kicker)}</span>
              <strong>${esc(lesson.title)}</strong>
              <span>${esc(lesson.summary)}</span>
            </span>
            <span class="lesson-card-foot">${icon("clock", 15)} ${lesson.minutes} min ${read ? `<span class="read-mark">${icon("checkCircle", 16)} Read</span>` : `<span class="read-mark is-todo">${icon("arrowRight", 15)} Read</span>`}</span>
          </a>`;
        }).join("")}
      </div>
    </section>

    <section class="page-shell section home-lower">
      <div class="rank-preview card">
        <div class="section-head tight"><div><p class="eyebrow">This week</p><h3>Bench rankings</h3></div><a class="tiny" href="/leaderboard">Full board →</a></div>
        <ol class="mini-board">
          ${ranked.map((player, index) => `<li class="${player.isYou ? "is-you" : ""}">
            <span class="rank-number">${index + 1}</span>
            <span class="rank-avatar" style="--rank-accent:${player.accent || "var(--accent)"}">${player.isYou ? icon("user", 16) : esc(player.displayName.slice(0, 2).toUpperCase())}</span>
            <span class="rank-name"><strong>${esc(player.isYou ? `${player.displayName} (you)` : player.displayName)}</strong><small>${esc(player.section || "Demo student")}</small></span>
            <span class="rank-xp">${player.xp.toLocaleString("en-PH")}<small>XP</small></span>
          </li>`).join("")}
        </ol>
        <p class="tiny faint">Demo names are sample classmates. Your row is real and saves on this device.</p>
      </div>
      <div class="next-card card card-pad">
        <p class="eyebrow">Suggested next</p>
        <h3>${esc(nextActivity?.title || "Final Exam")}</h3>
        <p>${esc(nextActivity?.description || "Review the module, then take the post-test.")}</p>
        <a class="btn btn-primary mt-4" href="${nextActivity?.route || "/exam/final"}">${icon("playCircle", 18)} Open activity</a>
        <div class="next-divider"></div>
        <p class="eyebrow">Or warm up first</p>
        <a class="text-link" href="/play/word-chain">Word Bank Chain ${icon("arrowRight", 16)}</a>
        <a class="text-link" href="/exam/pretest">Take the pre-test ${icon("arrowRight", 16)}</a>
      </div>
    </section>

    <section class="page-shell section">
      ${showInstallCard()}
    </section>
  </div>`;
}

function caseSilhouette() {
  return `<svg class="mini-case" viewBox="0 0 360 260" aria-hidden="true" focusable="false">
    <rect x="62" y="18" width="236" height="214" rx="10" fill="var(--case-metal, #39444c)" stroke="var(--case-edge, #131a1e)" stroke-width="4"/>
    <rect x="78" y="34" width="204" height="182" rx="5" fill="var(--case-inner, #202a30)"/>
    <rect x="94" y="50" width="130" height="112" rx="5" fill="var(--case-board, #294438)" stroke="var(--case-line, #8a9aa5)" stroke-width="2"/>
    <rect x="112" y="68" width="38" height="38" rx="3" fill="var(--case-line, #8a9aa5)" opacity=".7"/>
    <rect x="160" y="68" width="16" height="64" rx="2" fill="var(--case-line, #8a9aa5)" opacity=".6"/>
    <rect x="184" y="68" width="16" height="64" rx="2" fill="var(--case-line, #8a9aa5)" opacity=".6"/>
    <rect x="94" y="176" width="94" height="18" rx="3" fill="var(--case-slot, #171e23)"/>
    <rect x="216" y="50" width="48" height="80" rx="3" fill="var(--case-cage, #28323a)"/>
    <circle cx="154" cy="126" r="20" fill="none" stroke="var(--accent)" stroke-width="4"/>
    <path d="M142 114l24 24M166 114l-24 24" stroke="var(--accent)" stroke-width="3"/>
    <circle cx="302" cy="126" r="6" fill="var(--accent)"/>
  </svg>`;
}

export function mountHome(root) {
  const options = root.querySelector("[data-daily-options]");
  const feedback = root.querySelector("[data-daily-feedback]");
  if (!options) return;
  const challenge = dailyChallenge();
  options.querySelectorAll("[data-daily-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const chosen = Number(button.dataset.dailyIndex);
      if (get().progress.daily?.done) {
        if (feedback) {
          feedback.className = "feedback is-visible is-hint daily-feedback";
          feedback.innerHTML = `${icon("checkCircle", 20)}<div><strong>Already completed today</strong><span>Come back tomorrow for a fresh item.</span></div>`;
        }
        return;
      }
      options.querySelectorAll("button").forEach((el) => el.classList.remove("is-correct", "is-wrong"));
      if (chosen === challenge.answer) {
        button.classList.add("is-correct");
        sound.correct();
        confetti({ count: 60, duration: 1400 });
        const result = recordActivity({ id: "daily", score: 1, total: 1, accuracy: 100, stars: 3, xp: challenge.xp, meta: { daily: true } });
        if (feedback) {
          feedback.className = "feedback is-visible is-correct daily-feedback";
          feedback.innerHTML = `${icon("checkCircle", 20)}<div><strong>Correct. +${challenge.xp} XP</strong><span>${esc(challenge.explain)}</span></div>`;
        }
        toast(`Daily challenge complete. +${challenge.xp} XP`, "success");
        announce("Daily challenge complete.");
        say("daily", { mood: "celebrating" });
        if (result.newBadges?.length) toast(`New badge: ${result.newBadges[0].name}`, "success", 5000);
      } else {
        button.classList.add("is-wrong");
        sound.wrong();
        if (feedback) {
          feedback.className = "feedback is-visible is-wrong daily-feedback";
          feedback.innerHTML = `${icon("xCircle", 20)}<div><strong>Not that one</strong><span>Try again. There is no penalty on the daily challenge.</span></div>`;
        }
      }
    });
  });
  root.querySelector("[data-open-companion]")?.addEventListener("click", async () => {
    const { openCompanion } = await import("../app/chrome.js");
    openCompanion();
  });
}
