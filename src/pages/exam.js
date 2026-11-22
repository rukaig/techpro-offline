/* ==========================================================================
   Exam overview and the module's pre-test / post-test engine.
   ========================================================================== */
import { PRETEST, POSTTEST, M2_PRETEST, M2_POSTTEST, gradeQuiz, shuffleItems } from "../data/quiz.js";
import { MODULES } from "../data/lessons.js";
import { get } from "../services/store.js";
import { activityBest } from "../app/game-kit.js";
import { finishGame, bindResultPanel, activityHero } from "../app/game-kit.js";
import { icon, stars } from "../app/icons.js";
import { esc, confirmDialog, announce, formatDate } from "../app/ui.js";
import { sound } from "../app/audio.js";
import { Timer } from "../app/time.js";
import { setFeedback, clearFeedback } from "../app/game-kit.js";

export function examOverviewPage() {
  return `<div class="exam-hub page-shell">
    <header class="page-head">
      <div>
        <p class="eyebrow">Assessment</p>
        <h1>Four tests. Two modules.</h1>
        <p class="lede">Each module has its own 15-item pre-test and post-test. Choose a module, check where you started, then prove what changed. Every test is retakeable and keeps your best score on this device.</p>
      </div>
      <div class="exam-seal" aria-hidden="true">${icon("award", 54)}<span>COC 1</span></div>
    </header>

    <div class="play-filters" role="group" aria-label="Filter assessments by module">
      <button class="chip is-active" type="button" data-exam-module="all">All tests</button>
      ${MODULES.map((module) => `<button class="chip" type="button" data-exam-module="${module.id}">${esc(module.number)} · ${esc(module.short)}</button>`).join("")}
      <span class="play-filter-count tiny faint" data-exam-count>4 shown</span>
    </div>

    <section data-exam-panel="module1">
      <div class="section-head tight">
        <div><p class="eyebrow">Module 1</p><h2>Assemble Computer Hardware</h2></div>
        <span class="tiny faint">2 tests</span>
      </div>
      <div class="exam-grid">
        ${examCard(PRETEST, "module1", "Baseline")}
        ${examCard(POSTTEST, "module1", "Post-test", "Assembly Ready")}
      </div>
    </section>

    <section class="section" data-exam-panel="module2">
      <div class="section-head tight">
        <div><p class="eyebrow">Module 2</p><h2>BIOS/UEFI Configuration</h2></div>
        <span class="tiny faint">2 tests</span>
      </div>
      <div class="exam-grid">
        ${examCard(M2_PRETEST, "module2", "Baseline")}
        ${examCard(M2_POSTTEST, "module2", "Post-test", "BIOS Ready")}
      </div>
    </section>

    <section class="section exam-rules card card-pad">
      <p class="eyebrow">Before you start</p>
      <h2>How the tests work</h2>
      <div class="rules-grid">
        <div><span class="rule-number">01</span><strong>One item at a time</strong><p>Move back and forward freely. The question map shows what is answered.</p></div>
        <div><span class="rule-number">02</span><strong>No hard fail</strong><p>Every item gets an explanation after you submit. A low score opens the review, not a locked door.</p></div>
        <div><span class="rule-number">03</span><strong>Best score kept</strong><p>Retakes do not lower your recorded best. XP is awarded only for improvement.</p></div>
        <div><span class="rule-number">04</span><strong>Offline by design</strong><p>Questions, timers, and results all run in this browser. Progress stays on this device.</p></div>
      </div>
      <div class="callout callout-tip mt-4">${icon("lightbulb", 20)}<div><strong>Read the explanations</strong>They are written from each module's answer key, not from a generic bank. That is where a score turns into understanding.</div></div>
    </section>

    <section class="section">
      <div class="split">
        <div class="card card-pad"><p class="eyebrow">Module 1 warm-up</p><h3>Not ready for fifteen?</h3><p>Try the Word Bank Chain or a flashcard deck first. They cover the assembly vocabulary in smaller pieces.</p><div class="cluster mt-3"><a class="btn btn-ghost" href="/play/flashcards">Flashcards</a><a class="btn btn-ghost" href="/play/word-chain">Word Bank Chain</a></div></div>
        <div class="card card-pad"><p class="eyebrow">Module 2 warm-up</p><h3>BIOS getting fuzzy?</h3><p>Flip the firmware terms or arrange the startup path before taking the BIOS/UEFI tests.</p><div class="cluster mt-3"><a class="btn btn-ghost" href="/play/bios-flashcards">BIOS Flashcards</a><a class="btn btn-ghost" href="/play/startup-sequence">Startup Relay</a></div></div>
      </div>
    </section>
  </div>`;
}

function examCard(bank, moduleId, badge, badgeName = "Ready") {
  const record = get().progress.activities[bank.activityId];
  const isPre = bank.kind === "pretest";
  const minutes = Math.round((bank.timeLimit || 600) / 60);
  return `<article class="exam-card card ${isPre ? "" : "exam-final"}">
    <div class="exam-card-head"><span class="badge ${isPre ? "badge-accent" : ""}">${esc(badge)}</span>${icon(bank.icon || (isPre ? "exam" : "graduation"), 30)}</div>
    <h2>${esc(bank.title)}</h2>
    <p>${esc(bank.description)}</p>
    <ul class="tick-list">
      <li>${icon("check", 16)} 15 multiple-choice items</li>
      <li>${icon("check", 16)} ${bank.timeLimit ? `${minutes} minute limit` : "No time limit"}</li>
      <li>${icon("check", 16)} Explanations after submitting</li>
      ${isPre ? "" : `<li>${icon("check", 16)} 80% earns ${esc(badgeName)}</li>`}
    </ul>
    <div class="exam-best">${record ? `<strong>${record.bestPercent}%</strong><span>Best · ${record.attempts} attempt${record.attempts === 1 ? "" : "s"}</span>` : `<strong>Not taken</strong><span>About ${minutes} minutes</span>`}</div>
    <a class="btn ${isPre ? "btn-primary" : "btn-accent"} btn-block" href="/exam/${bank.id}">${record ? "Retake" : "Start"} ${isPre ? "pre-test" : "post-test"} ${icon("arrowRight", 18)}</a>
  </article>`;
}

export function mountExam(root) {
  root.querySelectorAll("a[href^='/exam/'], a[href^='#/exam/']").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === "/exam" || href === "#/exam") return;
    link.setAttribute("data-keep", "true");
  });

  const panels = Array.from(root.querySelectorAll("[data-exam-panel]"));
  const count = root.querySelector("[data-exam-count]");
  root.querySelectorAll("[data-exam-module]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.examModule;
      root.querySelectorAll("[data-exam-module]").forEach((el) => el.classList.toggle("is-active", el === button));
      let shown = 0;
      panels.forEach((panel) => {
        const visible = selected === "all" || panel.dataset.examPanel === selected;
        panel.hidden = !visible;
        if (visible) shown += panel.querySelectorAll(".exam-card").length;
      });
      if (count) count.textContent = `${shown} shown`;
    });
  });
}

export function quizPage({ bank }) {
  const data = bank;
  const activity = data.activityId || data.id;
  const isPre = data.kind === "pretest";
  const activityData = {
    id: activity,
    title: data.title,
    tagline: data.subtitle,
    description: data.description,
    minutes: Math.round((data.timeLimit || 600) / 60),
    xp: data.xp || (isPre ? 40 : 150),
    icon: data.icon || (isPre ? "exam" : "graduation"),
    goal: isPre ? "identify" : "explain",
    taglineAlt: data.subtitle
  };
  const best = activityBest(activity);
  const limit = data.timeLimit ? `${Math.round(data.timeLimit / 60)}:00 limit` : "No timer";

  return {
    title: data.title,
    html: `<div class="exam-page page-shell">
      ${activityHero(activityData, {
        eyebrow: isPre ? "Pre-test" : "Post-test",
        intro: data.description,
        meta: data.timeLimit ? `<span class="pill pill-warning">${icon("timer", 15)} ${limit}</span>` : `<span class="pill pill-soft">${icon("clock", 15)} No timer</span>`
      })}
      <div data-quiz-stage>
        ${examIntro(data, best, isPre)}
      </div>
    </div>`,
    mount(root) {
      return mountQuiz(root, data, activityData);
    }
  };
}

function examIntro(data, best, isPre) {
  const minutes = Math.round((data.timeLimit || 600) / 60);
  return `<section class="exam-intro card">
    <div class="exam-intro-copy">
      <p class="eyebrow">${data.items.length} items</p>
      <h2>${isPre ? "See what you already know" : "Show what changed"}</h2>
      <p>${isPre ? "Answer honestly. Guessing is fine here — the pre-test exists to make the learning visible, not to judge you." : `The items are shuffled. You have ${minutes} minutes. You can move between questions before submitting.`}</p>
      <ul class="exam-instructions">
        <li>${icon("checkCircle", 17)} Choose one answer per item.</li>
        <li>${icon("checkCircle", 17)} Use the question map to jump around.</li>
        <li>${icon("checkCircle", 17)} Explanations appear after you submit.</li>
        ${data.timeLimit ? `<li>${icon("timer", 17)} The test submits automatically at 0:00.</li>` : ""}
      </ul>
    </div>
    <div class="exam-intro-side">
      <div class="exam-best-card">
        <span class="eyebrow">Your best</span>
        <strong>${best.percent ? `${best.percent}%` : "—"}</strong>
        ${best.stars ? stars(best.stars) : `<span class="tiny faint">No score recorded</span>`}
      </div>
      <button class="btn btn-primary btn-lg btn-block" type="button" data-start-exam>${icon("playCircle", 19)} Begin</button>
      <p class="tiny faint center">You can leave and come back before submitting.</p>
    </div>
  </section>`;
}

function mountQuiz(root, data, activityData) {
  const stage = root.querySelector("[data-quiz-stage]");
  if (!stage) return;
  let items = [];
  let answers = {};
  let index = 0;
  let timer = null;
  let startedAt = 0;
  let submitted = false;

  function start() {
    items = data.shuffle ? shuffleItems(data.items, Date.now()) : [...data.items];
    answers = {};
    index = 0;
    submitted = false;
    startedAt = Date.now();
    renderQuestion();
    if (data.timeLimit) {
      timer = new Timer({
        seconds: data.timeLimit,
        countdown: true,
        onTick(display) {
          const el = root.querySelector("[data-exam-timer]");
          if (el) {
            el.querySelector("span:last-child").textContent = display;
            el.classList.toggle("is-low", timer?.remaining <= 120);
          }
        },
        onDone() {
          announce("Time is up. Submitting the exam.");
          submit(true);
        }
      });
      timer.start();
    }
  }

  function renderQuestion() {
    const item = items[index];
    const chosen = answers[item.id];
    stage.innerHTML = `<section class="quiz-shell" aria-label="Question ${index + 1} of ${items.length}">
      <div class="quiz-top">
        <div class="quiz-top-left">
          <span class="pill">Question ${index + 1} of ${items.length}</span>
          ${data.timeLimit ? `<span class="timer-pill" data-exam-timer>${icon("timer", 16)}<span>${Math.round(data.timeLimit / 60)}:00</span></span>` : `<span class="pill pill-soft">${icon("clock", 15)} Untimed</span>`}
        </div>
        <div class="quiz-top-right">
          <span class="tiny faint">${Object.keys(answers).length} answered</span>
          <button class="btn btn-ghost btn-sm" type="button" data-submit-exam>Submit</button>
        </div>
      </div>
      <div class="quiz-layout">
        <div class="quiz-main card">
          <div class="quiz-progress progress thin"><span style="width:${Math.round(((index + 1) / items.length) * 100)}%"></span></div>
          <p class="eyebrow">Item ${String(index + 1).padStart(2, "0")}</p>
          <h2 class="quiz-prompt">${esc(item.prompt)}</h2>
          <div class="option-grid quiz-options" role="radiogroup" aria-label="Answer choices">
            ${item.options.map((option, oIndex) => `<button class="option-button ${chosen === oIndex ? "is-chosen" : ""}" type="button" role="radio" aria-checked="${chosen === oIndex}" data-pick="${oIndex}">
              <span class="option-letter">${String.fromCharCode(65 + oIndex)}</span><span>${esc(option)}</span>
            </button>`).join("")}
          </div>
          <div class="feedback" role="status" aria-live="polite"></div>
          <div class="quiz-nav">
            <button class="btn btn-ghost" type="button" data-prev ${index === 0 ? "disabled" : ""}>${icon("arrowLeft", 18)} Previous</button>
            <span class="tiny faint">Answers save on this device until you submit.</span>
            ${index < items.length - 1
              ? `<button class="btn btn-primary" type="button" data-next>Next ${icon("arrowRight", 18)}</button>`
              : `<button class="btn btn-accent" type="button" data-submit-exam>Finish &amp; submit ${icon("checkCircle", 18)}</button>`}
          </div>
        </div>
        <aside class="quiz-map card" aria-label="Question map">
          <p class="eyebrow">Question map</p>
          <div class="map-grid">
            ${items.map((entry, i) => `<button class="map-dot ${answers[entry.id] != null ? "is-answered" : ""} ${i === index ? "is-current" : ""}" type="button" data-jump="${i}" aria-label="Question ${i + 1}${answers[entry.id] != null ? ", answered" : ", unanswered"}">${i + 1}</button>`).join("")}
          </div>
          <div class="map-key"><span><i class="key-dot is-answered"></i> Answered</span><span><i class="key-dot"></i> Open</span></div>
          <button class="btn btn-soft btn-block mt-3" type="button" data-submit-exam>${icon("send", 17)} Submit test</button>
        </aside>
      </div>
    </section>`;
    bindQuestion();
  }

  function bindQuestion() {
    stage.querySelectorAll("[data-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = items[index];
        answers[item.id] = Number(button.dataset.pick);
        sound.click();
        stage.querySelectorAll("[data-pick]").forEach((el) => {
          const active = el === button;
          el.classList.toggle("is-chosen", active);
          el.setAttribute("aria-checked", String(active));
        });
        stage.querySelector("[data-jump]")?.classList.add("is-answered");
        updateMap();
      });
    });
    stage.querySelector("[data-prev]")?.addEventListener("click", () => {
      if (index > 0) { index -= 1; renderQuestion(); }
    });
    stage.querySelector("[data-next]")?.addEventListener("click", () => {
      if (index < items.length - 1) { index += 1; renderQuestion(); }
    });
    stage.querySelectorAll("[data-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        index = Number(button.dataset.jump);
        renderQuestion();
      });
    });
    stage.querySelectorAll("[data-submit-exam]").forEach((button) => {
      button.addEventListener("click", () => submit(false));
    });
  }

  function updateMap() {
    const dots = stage.querySelectorAll("[data-jump]");
    items.forEach((entry, i) => {
      const dot = dots[i];
      if (!dot) return;
      dot.classList.toggle("is-answered", answers[entry.id] != null);
      dot.classList.toggle("is-current", i === index);
    });
    const count = stage.querySelector(".quiz-top-right .tiny");
    if (count) count.textContent = `${Object.keys(answers).length} answered`;
  }

  async function submit(auto) {
    if (submitted) return;
    const unanswered = items.filter((item) => answers[item.id] == null).length;
    if (!auto && unanswered) {
      const yes = await confirmDialog({
        title: `${unanswered} unanswered item${unanswered === 1 ? "" : "s"}`,
        message: "Unanswered items are marked wrong. Submit anyway, or go back and finish?",
        confirmText: "Submit now"
      });
      if (!yes) return;
    }
    submitted = true;
    timer?.stop();
    const timeSeconds = Math.round((Date.now() - startedAt) / 1000);
    const grade = gradeQuiz({ items }, answers);
    const detail = `<div class="review-head"><h3>Item review</h3><p>Every explanation comes from the module's answer key.</p></div>
      <div class="review-list">
        ${grade.results.map((result, i) => `<details class="review-item ${result.correct ? "is-correct" : "is-wrong"}" ${result.correct ? "" : "open"}>
          <summary>
            <span class="review-state">${icon(result.correct ? "checkCircle" : "xCircle", 19)}</span>
            <span class="review-q"><strong>${i + 1}. ${esc(result.prompt)}</strong><small>Your answer: ${result.chosen != null ? `${String.fromCharCode(65 + result.chosen)}. ${esc(result.options[result.chosen])}` : "No answer"}</small></span>
            <span class="review-mark">${result.correct ? "Correct" : "Review"}</span>
          </summary>
          <div class="review-body">
            ${!result.correct ? `<p class="review-answer"><strong>Correct answer:</strong> ${String.fromCharCode(65 + result.answer)}. ${esc(result.options[result.answer])}</p>` : ""}
            <p>${esc(result.explain)}</p>
          </div>
        </details>`).join("")}
      </div>`;
    const resultHtml = finishGame({
      activity: activityData,
      score: grade.score,
      total: grade.total,
      accuracy: grade.percent,
      stars: grade.percent >= 80 ? 3 : grade.percent >= 60 ? 2 : 1,
      detail,
      timeSeconds,
      heading: grade.percent >= 80 ? "Assessment passed" : "Assessment recorded",
      intro: data.kind === "pretest" ? "This is your baseline. Read the explanations, then open the Library." : "Your best score is kept. Review anything that surprised you."
    });
    stage.innerHTML = resultHtml;
    bindResultPanel(stage, start);
    window.scrollTo({ top: 0, behavior: document.documentElement.dataset.motion === "reduced" ? "auto" : "smooth" });
    announce(`Exam submitted. ${grade.percent} percent.`);
  }

  root.querySelector("[data-start-exam]")?.addEventListener("click", () => {
    sound.click();
    start();
  });

  return () => timer?.stop();
}
