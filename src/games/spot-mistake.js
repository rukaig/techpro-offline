import { ACTIVITY_BY_ID } from "../data/activities.js";
import { activityHero, finishGame, bindResultPanel } from "../app/game-kit.js";
import { sound, vibrate } from "../app/audio.js";

// Unsafe practices in Alex's workstation and the exact module correction.
const MISTAKES = [
  ["Electrical outlet", "Shut down the computer and disconnect it from the power source."],
  ["Open case", "Follow the proper shutdown procedure before opening the case."],
  ["Screw edge", "Place screws in a labeled parts container."],
  ["Metal bracelet", "Remove jewelry and conductive accessories."],
  ["Gold contacts", "Hold memory modules by their edges."],
  ["No cable labels", "Take pictures, draw a diagram, or label connections."]
];

export function spotMistakePage() {
  const activity = ACTIVITY_BY_ID["spot-mistake"];
  const hero = activityHero(activity, {
    eyebrow: "Hidden object hunt",
    intro: "Sweep Alex's workstation. Tap each unsafe practice and apply the exact correction."
  });
  return hero + [
    "<section class=\"engagement-game spot-game\" data-spot-game>",
    "<div class=\"game-toolbar\">",
    "<span class=\"pill\">Fixed <strong data-fixed>0 / 6</strong></span>",
    "<button class=\"icon-button\" type=\"button\" data-spot-hint>Hint</button>",
    "</div>",
    "<div class=\"workstation-scene\" data-workstation>",
    MISTAKES.map((item, i) => `<button class="hidden-practice hidden-${i + 1}" type="button" data-practice="${i}">${item[0]}</button>`).join(""),
    "</div>",
    "<p class=\"game-feedback\" data-feedback role=\"status\">Tap an unsafe practice in the scene.</p>",
    "</section>"
  ].join("");
}

export function mountSpotMistake(root) {
  const activity = ACTIVITY_BY_ID["spot-mistake"];
  const game = root.querySelector("[data-spot-game]");
  const scene = root.querySelector("[data-workstation]");
  const feedback = root.querySelector("[data-feedback]");
  const fixedLabel = root.querySelector("[data-fixed]");
  const controls = Array.from(root.querySelectorAll("[data-practice]"));
  let fixed = 0;
  let mistakes = 0;
  let done = false;
  let finishTimeout = null;
  let shakeTimeout = null;

  function finish() {
    if (done) return;
    done = true;
    const percent = Math.round((6 / (6 + mistakes)) * 100);
    game.innerHTML = finishGame({
      activity,
      score: 6,
      total: 6 + mistakes,
      accuracy: percent,
      meta: { mistakes },
      detail: "<div class=\"learned-list\"><p><strong>What you learned</strong></p><p>Disconnect power, shut down first, organize screws, remove jewelry, hold memory by its edges, and document connections.</p></div>"
    });
    bindResultPanel(game, () => window.location.reload());
  }

  controls.forEach((button) => button.addEventListener("click", () => {
    if (done || button.classList.contains("is-fixed")) return;
    const item = MISTAKES[Number(button.dataset.practice)];
    button.classList.add("is-fixed");
    button.classList.remove("is-hinted");
    fixed += 1;
    feedback.textContent = "Fixed: " + item[1];
    fixedLabel.textContent = fixed + " / 6";
    sound.correct();
    vibrate(12);
    if (fixed === 6) finishTimeout = setTimeout(finish, 350);
  }));

  scene.addEventListener("click", (event) => {
    if (done || event.target.closest("[data-practice]")) return;
    mistakes += 1;
    scene.classList.add("is-wrong");
    shakeTimeout = setTimeout(() => scene.classList.remove("is-wrong"), 280);
    feedback.textContent = "Nothing unsafe there. Look closer before you tap.";
    sound.wrong();
    vibrate(24);
  });

  root.querySelector("[data-spot-hint]").addEventListener("click", () => {
    if (done) return;
    const open = controls.find((button) => !button.classList.contains("is-fixed"));
    controls.forEach((button) => button.classList.remove("is-hinted"));
    if (open) {
      open.classList.add("is-hinted");
      const item = MISTAKES[Number(open.dataset.practice)];
      feedback.textContent = "Hint: look for " + item[0] + ".";
    } else {
      feedback.textContent = "Every practice is fixed.";
    }
  });

  return () => {
    done = true;
    clearTimeout(finishTimeout);
    clearTimeout(shakeTimeout);
  };
}
