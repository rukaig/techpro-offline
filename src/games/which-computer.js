import { ACTIVITY_BY_ID } from "../data/activities.js";
import { activityHero, finishGame, bindResultPanel } from "../app/game-kit.js";
import { sound, vibrate } from "../app/audio.js";
import { esc } from "../app/ui.js";
import { seededShuffle } from "./engine/kit.js";

const TYPES = [
  { name: "Desktop", rule: "A fixed personal computer with separate monitor and keyboard.", source: "content/module.md" },
  { name: "Laptop", rule: "A portable personal computer for work while moving.", source: "content/module.md" },
  { name: "Tablet", rule: "A portable touchscreen computer for mobile use.", source: "content/module.md" },
  { name: "Server", rule: "A computer that provides resources or services to many users.", source: "content/module.md" }
];

const NEEDS = [
  { need: "Choose a phone-sized screen for reading in bed.", answer: "Tablet", explanation: "A tablet is a portable touchscreen computer." },
  { need: "Run a fixed office station with a separate monitor.", answer: "Desktop", explanation: "A desktop is designed for a fixed workstation." },
  { need: "Carry a keyboard and screen between classes.", answer: "Laptop", explanation: "A laptop combines a keyboard and screen in a portable unit." },
  { need: "Provide files and services to many classroom computers.", answer: "Server", explanation: "A server provides resources and services to other computers." },
  { need: "Use touch controls in a small portable device.", answer: "Tablet", explanation: "Tablets use portable touchscreen use." },
  { need: "Use separate desktop parts at one desk.", answer: "Desktop", explanation: "The desktop uses separate components at a fixed location." }
];

export function whichComputerPage() {
  const activity = ACTIVITY_BY_ID["which-computer"];
  return `${activityHero(activity, { eyebrow: "Swipe · Strategy", intro: "Read each need and tap or swipe the matching machine card." })}
  <section class="engagement-game swipe-game" data-which-game>
    <div class="game-toolbar">
      <span class="pill">Round <strong data-round>1 / 6</strong></span>
      <span class="pill">Streak <strong data-streak>0</strong></span>
      <button class="icon-button" type="button" data-hint aria-label="Hint">Hint</button>
    </div>
    <article class="need-card" data-need-card>
      <p class="eyebrow">Customer need</p>
      <h2 data-need></h2>
    </article>
    <div class="machine-cards" data-machine-cards>
      ${TYPES.map((type) => `<button class="machine-card" type="button" data-machine="${esc(type.name)}"><strong>${esc(type.name)}</strong><span>${esc(type.rule)}</span></button>`).join("")}
    </div>
    <p class="game-feedback" data-feedback role="status" aria-live="polite">Choose the best machine.</p>
  </section>`;
}

export function mountWhichComputer(root) {
  let round = 0;
  let streak = 0;
  let score = 0;
  let dragStart = null;
  const queue = seededShuffle(NEEDS, 4821);
  const game = root.querySelector("[data-which-game]");
  const needEl = root.querySelector("[data-need]");
  const feedback = root.querySelector("[data-feedback]");

  function show() {
    needEl.textContent = queue[round].need;
    root.querySelector("[data-round]").textContent = `${round + 1} / ${queue.length}`;
  }

  function choose(name) {
    const current = queue[round];
    if (name === current.answer) {
      score += 100 + streak * 10;
      streak += 1;
      feedback.textContent = `Matched: ${current.explanation}`;
      sound.correct();
      vibrate(12);
    } else {
      streak = 0;
      feedback.textContent = `Try the other fit: ${current.explanation}`;
      sound.wrong();
      vibrate(24);
    }
    root.querySelector("[data-streak]").textContent = String(streak);
    round += 1;
    if (round >= queue.length) {
      const percent = Math.round((score / (queue.length * 150)) * 100);
      game.innerHTML = finishGame({
        activity: ACTIVITY_BY_ID["which-computer"],
        score,
        total: queue.length * 150,
        accuracy: percent,
        detail: `<div class="learned-list"><p><strong>What you learned</strong></p><p>Desktop: fixed workstation. Laptop: portable keyboard and screen. Tablet: portable touchscreen. Server: provides resources to other computers.</p></div>`
      });
      bindResultPanel(game, () => mountWhichComputer(root));
    } else show();
  }

  root.querySelectorAll("[data-machine]").forEach((button) => {
    button.addEventListener("click", () => choose(button.dataset.machine));
  });
  const card = root.querySelector("[data-need-card]");
  card.addEventListener("pointerdown", (event) => {
    dragStart = event.clientX;
    card.setPointerCapture?.(event.pointerId);
  });
  card.addEventListener("pointerup", (event) => {
    if (dragStart == null) return;
    const delta = event.clientX - dragStart;
    dragStart = null;
    if (Math.abs(delta) < 55) return;
    const index = delta > 0 ? 0 : 3;
    choose(TYPES[index].name);
  });
  root.querySelector("[data-hint]").addEventListener("click", () => {
    const current = queue[round];
    feedback.textContent = `${TYPES.find((type) => type.name === current.answer)?.rule}`;
  });
  show();
}
