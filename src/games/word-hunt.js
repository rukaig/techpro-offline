import { ACTIVITY_BY_ID } from "../data/activities.js";
import { activityHero, finishGame, bindResultPanel } from "../app/game-kit.js";
import { sound, vibrate } from "../app/audio.js";
import { esc } from "../app/ui.js";
import vocab from "./data/vocab.json";
import { generateWordSearch, todaySeed, seedCode } from "./engine/kit.js";

const CATEGORY_WORDS = {
  Hardware: ["MOTHERBOARD", "PROCESSOR", "MEMORY", "KEYBOARD", "MONITOR", "MOUSE"],
  Software: ["SOFTWARE", "OPERATING SYSTEM", "DEVICE DRIVER", "APPLICATION SOFTWARE", "FIRMWARE", "UTILITY SOFTWARE"],
  Safety: ["ANTISTATICWRISTSTRAP", "LABELEDCONTAINER", "HEATSINK", "STANDOFFS", "RETAININGCLIPS"],
  Procedures: ["ASSEMBLY", "DISASSEMBLY", "DOCUMENT", "SHUTDOWN", "UNPLUG", "LABEL"]
};

export function wordHuntPage() {
  const activity = ACTIVITY_BY_ID["word-hunt"];
  const hero = activityHero(activity, {
    eyebrow: "Word Lab - Hunt",
    intro: "Find hidden module terms. Tap the first letter and last letter."
  });
  return hero + `
  <section class="engagement-game hunt-game" data-hunt-game>
    <div class="game-toolbar">
      <div class="mode-tabs">
        <button class="chip is-active" type="button" data-theme-mode="Hardware">Hardware</button>
        <button class="chip" type="button" data-theme-mode="Software">Software</button>
        <button class="chip" type="button" data-theme-mode="Safety">Safety</button>
      </div>
      <button class="icon-button" type="button" data-hunt-hint>Hint</button>
    </div>
    <div class="hunt-status">
      <span>Found <strong data-found>0</strong></span>
      <span class="seed-code" data-seed-code></span>
    </div>
    <div class="word-grid" data-word-grid aria-label="Word search grid"></div>
    <div class="hunt-words" data-hunt-words></div>
    <p class="game-feedback" data-feedback role="status" aria-live="polite">Tap the first and last letter of a hidden term.</p>
  </section>`;
}

export function mountWordHunt(root) {
  const activity = ACTIVITY_BY_ID["word-hunt"];
  const game = root.querySelector("[data-hunt-game]");
  let theme = "Hardware";
  let seed = todaySeed();
  let startCell = null;
  let found = new Set();
  let puzzle;

  function build() {
    found = new Set();
    const words = CATEGORY_WORDS[theme];
    puzzle = generateWordSearch({ words, size: 11, seed });
    root.querySelector("[data-found]").textContent = "0";
    root.querySelector("[data-seed-code]").textContent = seedCode(seed);
    const grid = root.querySelector("[data-word-grid]");
    grid.innerHTML = puzzle.grid.map((row, y) => row.map((letter, x) =>
      `<button type="button" class="hunt-cell" data-cell="${x}:${y}" aria-label="Letter ${esc(letter)}">${esc(letter)}</button>`
    ).join("")).join("");
    const terms = root.querySelector("[data-hunt-words]");
    terms.innerHTML = words.map((word) =>
      `<span data-hunt-word="${word}">${esc(word)}</span>`
    ).join("");
    bindCells();
  }

  function termDefinition(word) {
    const record = vocab.find((item) =>
      item.term.toUpperCase().replace(/[^A-Z]/g, "") === word
    );
    return record?.definition || "A module term from this puzzle.";
  }

  function checkSelection(endCell) {
    if (!startCell) return;
    const start = startCell.split(":").map(Number);
    const end = endCell.split(":").map(Number);
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const straight = dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy);
    if (!straight) {
      root.querySelector("[data-feedback]").textContent = "Choose letters in a straight row.";
      clearStart();
      return;
    }
    const stepX = dx === 0 ? 0 : dx / Math.abs(dx);
    const stepY = dy === 0 ? 0 : dy / Math.abs(dy);
    const length = Math.max(Math.abs(dx), Math.abs(dy)) + 1;
    let letters = "";
    const selected = [];
    for (let i = 0; i < length; i += 1) {
      const x = start[0] + stepX * i;
      const y = start[1] + stepY * i;
      const key = x + ":" + y;
      selected.push(key);
      letters += puzzle.grid[y][x];
    }
    const reverse = [...letters].reverse().join("");
    const match = puzzle.placed.find((item) =>
      (item.word === letters || item.word === reverse) && !found.has(item.word)
    );
    if (match) {
      found.add(match.word);
      selected.forEach((key) =>
        root.querySelector('[data-cell="' + key + '"]')?.classList.add("is-found")
      );
      const label = root.querySelector('[data-hunt-word="' + match.word + '"]');
      label?.classList.add("is-found");
      root.querySelector("[data-found]").textContent = String(found.size);
      root.querySelector("[data-feedback]").textContent =
        match.word + ": " + termDefinition(match.word);
      sound.correct();
      vibrate(12);
      if (found.size === puzzle.placed.length) finish();
    } else {
      root.querySelector("[data-feedback]").textContent =
        "Those letters do not form a hidden term.";
      sound.wrong();
      vibrate(24);
    }
    clearStart();
  }

  function clearStart() {
    startCell = null;
    root.querySelectorAll(".hunt-cell.is-start").forEach((cell) =>
      cell.classList.remove("is-start")
    );
  }

  function bindCells() {
    root.querySelectorAll("[data-cell]").forEach((cell) => {
      cell.addEventListener("click", () => {
        if (!startCell) {
          startCell = cell.dataset.cell;
          cell.classList.add("is-start");
          root.querySelector("[data-feedback]").textContent =
            "Now choose the last letter.";
          sound.click();
        } else {
          checkSelection(cell.dataset.cell);
        }
      });
    });
  }

  function finish() {
    game.innerHTML = finishGame({
      activity,
      score: found.size,
      total: puzzle.placed.length,
      accuracy: 100,
      meta: { seedCode: seedCode(seed), mode: "daily" },
      detail: '<div class="learned-list"><p><strong>What you learned</strong></p><p>Review the found module terms in the Collection and add missed words to Flashcards.</p></div>'
    });
    bindResultPanel(game, () => window.location.reload());
  }

  root.querySelectorAll("[data-theme-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      theme = button.dataset.themeMode;
      root.querySelectorAll("[data-theme-mode]").forEach((el) =>
        el.classList.toggle("is-active", el === button)
      );
      seed = todaySeed();
      build();
    });
  });
  root.querySelector("[data-hunt-hint]").addEventListener("click", () => {
    const remaining = puzzle.placed.find((item) => !found.has(item.word));
    if (remaining) {
      root.querySelector("[data-feedback]").textContent =
        "Hint: find " + remaining.word + ". " + termDefinition(remaining.word);
    }
  });
  build();
}
