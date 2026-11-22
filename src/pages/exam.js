/* ==========================================================================
   Exam overview and the module's pre-test / post-test engine.
   ========================================================================== */
import { PRETEST, POSTTEST, gradeQuiz, shuffleItems } from "../data/quiz.js";
import { get } from "../services/store.js";
import { activityBest } from "../app/game-kit.js";
import { finishGame, bindResultPanel, activityHero } from "../app/game-kit.js";
import { icon, stars } from "../app/icons.js";
import { esc, confirmDialog, announce, formatDate } from "../app/ui.js";
import { sound } from "../app/audio.js";
import { Timer } from "../app/time.js";
import { setFeedback, clearFeedback } from "../app/game-kit.js";

export function examOverviewPage() {
  const pre = get().progress.activities.pretest;
  const post = get().progress.activities.final;
  return `<div class="exam-hub page-shell">
    <header class="page-head">
      <div>
        <p class="eyebrow">Assessment</p>
        <h1>Two tests. Same fifteen items.</h1>
        <p class="lede">The module's pre-test tells you where you started. The post-test tells you what changed. Both are practice-friendly: you can retake them, and your best score is the one kept.</p>
      </div>
      <div class="exam-seal" aria-hidden="true">${icon("award", 54)}<span>COC 1</span></div>
    </header>

    <div class="exam-grid">
      <article class="exam-card card">
        <div class="exam-card-head"><span class="badge badge-accent">Baseline</span>${icon("exam", 30)}</div>
        <h2>Pre-Test</h2>
        <p>Fifteen items, no timer. Take it before reading to see what you already know. Your score is a starting point, not a grade.</p>
        <ul class="tick-list">
          <li>${icon("check", 16)} 15 multiple-choice items</li>
          <li>${icon("check", 16)} No time limit</li>
          <li>${icon("check", 16)} Explanations after submitting</li>
        </ul>
        <div class="exam-best">${pre ? `<strong>${pre.bestPercent}%</strong><span>Best · ${pre.attempts} attempt${pre.attempts === 1 ? "" : "s"}</span>` : `<strong>Not taken</strong><span>About 10 minutes</span>`}</div>
        <a class="btn btn-primary btn-block" href="/exam/pretest">${pre ? "Retake pre-test" : "Start pre-test"} ${icon("arrowRight", 18)}</a>
      </article>

      <article class="exam-card card exam-final">
        <div class="exam-card-head"><span class="badge">Post-test</span>${icon("graduation", 32)}</div>
        <h2>Final Exam</h2>
        <p>The module's 15-item post-test, shuffled, with a 20-minute timer. Score 80% to earn the <strong>Assembly Ready</strong> badge.</p>
        <ul class="tick-list">
          <li>${icon("check", 16)} 15 items · 20 minutes</li>
          <li>${icon("check", 16)} 80% earns the badge</li>
          <li>${icon("check", 16)} Best score kept</li>
        </ul>
        <div class="exam-best">${post ? `<strong>${post.bestPercent}%</strong><span>Best · ${post.attempts} attempt${post.attempts === 1 ? "" : "s"}</span>` : `<strong>Not taken</strong><span>Take it when you are ready</span>`}</div>
        <a class="btn btn-accent btn-block" href="/exam/final">${post ? "Retake final exam" : "Start final exam"} ${icon("arrowRight", 18)}</a>
      </article>
    </div>

    <section class="section exam-rules card card-pad">
      <p class="eyebrow">Before you start</p>
      <h2>How the tests work</h2>
      <div class="rules-grid">
        <div><span class="rule-number">01</span><strong>One item at a time</strong><p>Move back and forward freely. The question map shows what is answered.</p></div>
        <div><span class="rule-number">02</span><strong>No hard fail</strong><p>Every item gets an explanation after you submit. A low score opens the review, not a locked door.</p></div>
        <div><span class="rule-number">03</span><strong>Best score kept</strong><p>Retakes do not lower your recorded best. XP is awarded only for improvement.</p></div>
        <div><span class="rule-number">04</span><strong>Teacher view</strong><p>Your local record can be exported. Signing in adds cloud sync and a leaderboard entry.</p></div>
      </div>
      <div class="callout callout-tip mt-4">${icon("lightbulb", 20)}<div><strong>Read the explanations</strong>They are written from the module's answer key, not from a generic bank. That is where the score turns into understanding.</div></div>
    </section>

    <section class="section">
      <div class="split">
        <div class="card card-pad"><p class="eyebrow">Warm-up</p><h3>Not ready for fifteen?</h3><p>Try the Word Bank Chain or a flashcard deck first. They cover the same vocabulary in smaller pieces.</p><div class="cluster mt-3"><a class="btn btn-ghost" href="/play/flashcards">Flashcards</a><a class="btn btn-ghost" href="/play/word-chain">Word Bank Chain</a></div></div>
        <div class="card card-pad"><p class="eyebrow">Proof of practice</p><h3>Want the build badge?</h3><p>Complete a guided PC Lab build. The final exam is easier when the ten steps already make sense in your hands.</p><div class="cluster mt-3"><a class="btn btn-primary" href="/play/pc-lab">${icon("wrench", 17)} Open PC Lab</a></div></div>
      </div>
    </section>
  </div>`;
}

export function quizPage({ bank }) {
  const activity = bank.id === "pretest" ? "pretest" : "final";
  const data = bank.id === "pretest" ? PRETEST : POSTTEST;
  const activityData = {
    id: activity,
    title: data.title,
    tagline: data.subtitle,
    description: data.description,
    minutes: Math.round((data.timeLimit || 600) / 60),
    xp: activity === "final" ? 150 : 40,
    icon: activity === "final" ? "graduation" : "exam",
    goal: "explain",
    taglineAlt: data.subtitle
  };
  const best = activityBest(activity);

  return {
    title: data.title,
    html: `<div class="exam-page page-shell">
      ${activityHero(activityData, {
        eyebrow: activity === "final" ? "Post-test" : "Pre-test",
        intro: data.description,
        meta: data.timeLimit ? `<span class="pill pill-warning">${icon("timer", 15)} 20:00 limit</span>` : `<span class="pill pill-soft">${icon("clock", 15)} No timer</span>`
      })}
      <div data-quiz-stage>
        ${examIntro(data, best, activity)}
      </div>
    </div>`,
    mount(root) {
      return mountQuiz(root, data, activityData);
    }
  };
}

function examIntro(data, best, activityId) {
  return `<section class="exam-intro card">
    <div class="exam-intro-copy">
      <p class="eyebrow">${data.items.length} items</p>
      <h2>${activityId === "pretest" ? "See what you already know" : "Show what changed"}</h2>
      <p>${activityId === "pretest" ? "Answer honestly. Guessing is fine here — the pre-test exists to make the learning visible, not to judge you." : "The items are shuffled. You have twenty minutes. You can move between questions before submitting."}</p>
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
          ${data.timeLimit ? `<span class="timer-pill" data-exam-timer>${icon("timer", 16)}<span>20:00</span></span>` : `<span class="pill pill-soft">${icon("clock", 15)} Untimed</span>`}
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
      intro: activityData.id === "pretest" ? "This is your baseline. Read the explanations, then start the Library." : "Your best score is kept. Review anything that surprised you."
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
