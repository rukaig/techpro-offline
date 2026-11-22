import { ACTIVITY_BY_ID } from "../data/activities.js";
import { activityHero, finishGame, bindResultPanel } from "../app/game-kit.js";
import { sound, vibrate } from "../app/audio.js";

// Safe preparation order from the module's disassembly procedure.
const STEPS = [
  ["1", "Shut down the computer properly"],
  ["2", "Disconnect the computer and peripheral devices from the power source"],
  ["3", "Wear an antistatic wrist strap or discharge static electricity safely"],
  ["4", "Document or take note of the cable connections"],
  ["5", "Remove the computer case cover carefully"],
  ["6", "Organize the removed parts and screws in labeled containers"]
];

const TIME_LIMIT = 90;

function clockText(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function orderRushPage() {
  const activity = ACTIVITY_BY_ID["order-rush"];
  const hero = activityHero(activity, {
    eyebrow: "Escape room - Lab sequence",
    intro: "Unlock all six lab doors in the module's safe preparation order before the clock runs out."
  });
  return hero + [
    "<section class=\"engagement-game escape-game\" data-order-game>",
    "<div class=\"game-toolbar\">",
    "<span class=\"pill\">Door <strong data-door>1 / 6</strong></span>",
    `<span class="pill escape-clock">Time <strong data-clock>${clockText(TIME_LIMIT)}</strong></span>`,
    "<button class=\"icon-button\" type=\"button\" data-order-hint>Hint</button>",
    "</div>",
    "<div class=\"escape-timer\" aria-hidden=\"true\"><span data-timer-bar></span></div>",
    "<div class=\"locked-doors\" data-door-buttons>",
    STEPS.map((step) => `<button class="door-card" type="button" data-step="${step[0]}"><span>${step[0]}</span><strong>${step[1]}</strong></button>`).join(""),
    "</div>",
    "<p class=\"game-feedback\" data-feedback role=\"status\">Choose step 1 to open the first door.</p>",
    "</section>"
  ].join("");
}

export function mountOrderRush(root) {
  const activity = ACTIVITY_BY_ID["order-rush"];
  const game = root.querySelector("[data-order-game]");
  const feedback = root.querySelector("[data-feedback]");
  const clock = root.querySelector("[data-clock]");
  const timerBar = root.querySelector("[data-timer-bar]");
  const doorLabel = root.querySelector("[data-door]");
  let next = 1;
  let mistakes = 0;
  let remaining = TIME_LIMIT;
  let done = false;
  let blockedTimeout = null;

  const timer = setInterval(() => {
    if (done) return;
    remaining = Math.max(0, remaining - 1);
    clock.textContent = clockText(remaining);
    timerBar.style.width = `${(remaining / TIME_LIMIT) * 100}%`;
    if (remaining === 0) finish();
  }, 1000);

  function finish() {
    if (done) return;
    done = true;
    clearInterval(timer);
    const opened = next - 1;
    const percent = opened === 6
      ? Math.round((6 / (6 + mistakes)) * 100)
      : Math.round((opened / 6) * 100);
    game.innerHTML = finishGame({
      activity,
      score: opened,
      total: 6,
      accuracy: percent,
      timeSeconds: TIME_LIMIT - remaining,
      meta: { opened, mistakes, completed: opened === 6 },
      detail: "<div class=\"learned-list\"><p><strong>What you learned</strong></p><p>Shut down, disconnect power, use antistatic protection, document cables, remove the cover, then organize parts in labeled containers.</p></div>"
    });
    bindResultPanel(game, () => window.location.reload());
  }

  root.querySelectorAll("[data-step]").forEach((button) => button.addEventListener("click", () => {
    if (done || button.classList.contains("is-open")) return;
    if (Number(button.dataset.step) === next) {
      button.classList.add("is-open");
      feedback.textContent = "Door unlocked: " + STEPS[next - 1][1];
      next += 1;
      doorLabel.textContent = Math.min(next, 6) + " / 6";
      sound.correct();
      vibrate(12);
      if (next > 6) finish();
    } else {
      mistakes += 1;
      button.classList.add("is-blocked");
      blockedTimeout = setTimeout(() => button.classList.remove("is-blocked"), 300);
      feedback.textContent = "Door stays locked. Continue with step " + next + ".";
      sound.wrong();
      vibrate(24);
    }
  }));

  root.querySelector("[data-order-hint]").addEventListener("click", () => {
    feedback.textContent = "Hint: " + (STEPS[next - 1]?.[1] || "All doors are open.");
  });

  return () => {
    done = true;
    clearInterval(timer);
    clearTimeout(blockedTimeout);
  };
}
