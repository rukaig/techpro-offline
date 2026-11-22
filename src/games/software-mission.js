import { ACTIVITY_BY_ID } from "../data/activities.js";
import { activityHero, finishGame, bindResultPanel } from "../app/game-kit.js";
import { sound, vibrate } from "../app/audio.js";
import { esc } from "../app/ui.js";
import { seededShuffle } from "./engine/kit.js";
import ACTIVITY_DATA from "./data/activity-data.json";

const SITUATIONS = ACTIVITY_DATA.softwareSituations;

const TOOLS = ["Operating System", "Device Driver", "Antivirus", "Word Processor", "Presentation Software", "Web Browser"];

export function softwareMissionPage() {
  const activity = ACTIVITY_BY_ID["software-mission"];
  return `${activityHero(activity, { eyebrow: "Time management · Help desk", intro: "Serve each customer before patience runs out by placing the right tool badge." })}
  <section class="engagement-game mission-game" data-mission-game>
    <div class="game-toolbar">
      <span class="pill">Shift <strong data-shift>1 / 6</strong></span>
      <span class="pill">Tips <strong data-tips>0</strong></span>
      <button class="icon-button" type="button" data-hint>Hint</button>
    </div>
    <article class="customer-card" data-customer-card>
      <p class="eyebrow" data-customer>Customer</p>
      <h2 data-need></h2>
      <div class="patience"><span data-patience></span></div>
    </article>
    <div class="tool-badges" data-tools>
      ${TOOLS.map((tool) => `<button class="tool-badge" type="button" data-tool="${esc(tool)}">${esc(tool)}</button>`).join("")}
    </div>
    <p class="game-feedback" data-feedback role="status" aria-live="polite">Choose a tool badge for this customer.</p>
  </section>`;
}

export function mountSoftwareMission(root) {
  let index = 0;
  let tips = 0;
  let mistakes = 0;
  let patience = 100;
  let timer = null;
  const queue = seededShuffle(SITUATIONS, 4821);
  const game = root.querySelector("[data-mission-game]");
  const feedback = root.querySelector("[data-feedback]");
  const patienceEl = root.querySelector("[data-patience]");

  function show() {
    clearInterval(timer);
    patience = 100;
    const current = queue[index];
    root.querySelector("[data-customer]").textContent = current.customer;
    root.querySelector("[data-need]").textContent = current.need;
    root.querySelector("[data-shift]").textContent = `${index + 1} / ${queue.length}`;
    patienceEl.style.width = "100%";
    timer = setInterval(() => {
      patience = Math.max(0, patience - 2);
      patienceEl.style.width = `${patience}%`;
      if (patience === 0) {
        clearInterval(timer);
        mistakes += 1;
        feedback.textContent = `The customer waited: ${queue[index].reason}`;
        sound.wrong();
        index += 1;
        if (index >= queue.length) finish();
        else setTimeout(show, 450);
      }
    }, 250);
  }

  function finish() {
    clearInterval(timer);
    const percent = Math.round(((queue.length - mistakes) / queue.length) * 100);
    game.innerHTML = finishGame({
      activity: ACTIVITY_BY_ID["software-mission"],
      score: queue.length - mistakes,
      total: queue.length,
      accuracy: percent,
      detail: `<div class="learned-list"><p><strong>What you learned</strong></p><p>The operating system manages the computer, drivers connect hardware, utilities protect or maintain it, and applications perform user tasks.</p></div>`
    });
    bindResultPanel(game, () => window.location.reload());
  }

  root.querySelectorAll("[data-tool]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = queue[index];
      if (button.dataset.tool === current.answer) {
        tips += 100 + Math.round(patience);
        feedback.textContent = `Correct: ${current.reason}`;
        sound.correct();
        vibrate(12);
        button.classList.add("is-served");
        setTimeout(() => button.classList.remove("is-served"), 180);
      } else {
        mistakes += 1;
        feedback.textContent = `Try another tool: ${current.reason}`;
        sound.wrong();
        vibrate(24);
        return;
      }
      root.querySelector("[data-tips]").textContent = String(tips);
      index += 1;
      if (index >= queue.length) finish();
      else setTimeout(show, 350);
    });
  });

  root.querySelector("[data-hint]").addEventListener("click", () => {
    feedback.textContent = `Hint: ${queue[index].reason}`;
  });
  show();
}
