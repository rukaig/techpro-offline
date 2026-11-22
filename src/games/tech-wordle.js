import { ACTIVITY_BY_ID } from "../data/activities.js";
import { activityHero, finishGame, bindResultPanel } from "../app/game-kit.js";
import { sound, vibrate } from "../app/audio.js";
import { normalizeWord, scoreWordle, todaySeed, mulberry32, seedCode } from "./engine/kit.js";

const TERMS = [
  ["RAM", "Hardware", "Data is stored temporarily while programs are running."],
  ["CPU", "Hardware", "This component executes instructions and processes data."],
  ["SERVER", "Hardware", "This computer provides resources or services to many users."],
  ["MEMORY", "Hardware", "The temporary working area for programs and data."],
  ["SOFTWARE", "Software", "Instructions and programs that tell hardware what to do."],
  ["FIRMWARE", "Software", "Low-level software built into a hardware device."],
  ["KEYBOARD", "Hardware", "This input device enters letters, numbers, symbols, and commands."]
];

export function techWordlePage() {
  const activity = ACTIVITY_BY_ID["tech-wordle"];
  const hero = activityHero(activity, {
    eyebrow: "Word Lab - Tech Wordle",
    intro: "Guess the module term in six tries."
  });
  return hero + [
    "<section class=\"engagement-game wordle-game\" data-wordle-game>",
    "<div class=\"game-toolbar\">",
    "<span class=\"pill\" data-category>Category</span>",
    "<span class=\"seed-code\" data-wordle-code></span>",
    "<button class=\"icon-button\" type=\"button\" data-wordle-hint>Hint</button>",
    "</div>",
    "<p class=\"wordle-clue\" data-clue></p>",
    "<div class=\"wordle-board\" data-wordle-board></div>",
    "<div class=\"wordle-keyboard\" data-wordle-keyboard></div>",
    "<p class=\"game-feedback\" data-feedback role=\"status\">Use the on-screen keyboard.</p>",
    "</section>"
  ].join("");
}

export function mountTechWordle(root) {
  const activity = ACTIVITY_BY_ID["tech-wordle"];
  const game = root.querySelector(".wordle-game");
  const seed = todaySeed();
  const random = mulberry32(seed);
  const target = TERMS[Math.floor(random() * TERMS.length)];
  const answer = normalizeWord(target[0]);
  let guess = "";
  let row = 0;
  let solved = false;
  const length = answer.length;

  root.querySelector("[data-category]").textContent = "Category: " + target[1];
  root.querySelector("[data-wordle-code]").textContent = seedCode(seed);
  root.querySelector("[data-clue]").textContent = target[2];

  const board = root.querySelector("[data-wordle-board]");
  board.style.setProperty("--word-length", String(length));
  for (let r = 0; r < 6; r += 1) {
    const rowEl = document.createElement("div");
    rowEl.className = "wordle-row";
    for (let c = 0; c < length; c += 1) {
      const cell = document.createElement("span");
      cell.className = "wordle-cell";
      rowEl.appendChild(cell);
    }
    board.appendChild(rowEl);
  }

  const keyboard = root.querySelector("[data-wordle-keyboard]");
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wordle-key";
    button.textContent = letter;
    button.dataset.key = letter;
    keyboard.appendChild(button);
  });
  ["ENTER", "BACK"].forEach((label) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wordle-key wordle-key-wide";
    button.textContent = label;
    button.dataset.key = label.toLowerCase();
    keyboard.appendChild(button);
  });

  function paint() {
    const cells = board.querySelectorAll(".wordle-row")[row].querySelectorAll(".wordle-cell");
    for (let i = 0; i < length; i += 1) {
      cells[i].textContent = guess[i] || "";
    }
  }

  function finish(won) {
    game.innerHTML = finishGame({
      activity,
      score: won ? 6 - row : 0,
      total: 6,
      accuracy: won ? Math.round(((6 - row) / 6) * 100) : 0,
      meta: { seedCode: seedCode(seed), mode: "daily" },
      detail: "<div class=\"learned-list\"><p><strong>What you learned</strong></p><p>" +
        target[0] + ": " + target[2] + "</p></div>"
    });
    bindResultPanel(game, () => window.location.reload());
  }

  function submit() {
    if (guess.length !== length) {
      root.querySelector("[data-feedback]").textContent = "The term needs " + length + " letters.";
      sound.wrong();
      return;
    }
    const states = scoreWordle(guess, answer);
    const cells = board.querySelectorAll(".wordle-row")[row].querySelectorAll(".wordle-cell");
    states.forEach((state, index) => {
      cells[index].className = "wordle-cell is-" + state;
      const key = root.querySelector("[data-key=\"" + guess[index] + "\"]");
      if (key) key.className = "wordle-key is-" + state;
    });
    if (guess === answer) {
      solved = true;
      finish(true);
    } else {
      row += 1;
      guess = "";
      if (row >= 6) finish(false);
      else {
        root.querySelector("[data-feedback]").textContent =
          "Try again. " + (6 - row) + " tries remain.";
        sound.wrong();
        vibrate(24);
      }
    }
  }

  keyboard.addEventListener("click", (event) => {
    const button = event.target.closest("[data-key]");
    if (!button || solved) return;
    if (button.dataset.key === "enter") submit();
    else if (button.dataset.key === "back") {
      guess = guess.slice(0, -1);
      paint();
    } else if (guess.length < length) {
      guess += button.dataset.key;
      paint();
      sound.click();
    }
  });

  root.querySelector("[data-wordle-hint]").addEventListener("click", () => {
    root.querySelector("[data-feedback]").textContent =
      "Hint: " + target[1] + ". It starts with " + answer[0] + ".";
  });
  paint();
}
