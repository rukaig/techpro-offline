import { ACTIVITY_BY_ID } from "../data/activities.js";
import { activityHero, finishGame, bindResultPanel } from "../app/game-kit.js";
import { sound, vibrate } from "../app/audio.js";
import { esc } from "../app/ui.js";
import { seededShuffle, difficultySettings } from "./engine/kit.js";
import ACTIVITY_DATA from "./data/activity-data.json";

const ITEMS = ACTIVITY_DATA.sortItems;

export function sortStationPage() {
  const activity = ACTIVITY_BY_ID["sort-station"];
  return `${activityHero(activity, { eyebrow: "Arcade · Conveyor", intro: "Tap an item, then its chute. Keep the belt moving before the jam meter fills." })}
  <section class="engagement-game sort-station" data-sort-game>
    <div class="game-toolbar">
      <div class="mode-tabs" role="group" aria-label="Difficulty">
        <button class="chip" type="button" data-mode="relaxed">Relaxed</button>
        <button class="chip is-active" type="button" data-mode="standard">Standard</button>
        <button class="chip" type="button" data-mode="challenge">Challenge</button>
      </div>
      <button class="icon-button" type="button" data-hint aria-label="Hint">Hint</button>
    </div>
    <div class="sort-status">
      <span>Combo <strong data-combo>0</strong></span>
      <span>Score <strong data-score>0</strong></span>
      <span>Wave <strong data-wave>1 / 5</strong></span>
    </div>
    <div class="conveyor" aria-label="Sort conveyor">
      <div class="conveyor-belt"><div class="sort-item" data-current-item tabindex="0"></div></div>
    </div>
    <div class="jam-meter"><span data-jam></span></div>
    <div class="sort-chutes">
      ${["Hardware", "System Software", "Application Software"].map((name) => `<button class="sort-chute" type="button" data-chute="${esc(name)}"><strong>${esc(name)}</strong><small>Send item</small></button>`).join("")}
    </div>
    <p class="game-feedback" data-feedback role="status" aria-live="polite">Choose the item, then choose a chute.</p>
  </section>`;
}

export function mountSortStation(root) {
  let mode = "standard";
  let wave = 0;
  let score = 0;
  let combo = 0;
  let mistakes = 0;
  let jam = 0;
  let selected = null;
  const allItems = seededShuffle(ITEMS, 4821).concat(seededShuffle(ITEMS, 7419));
  let queue = allItems.slice(0, 10);

  const game = root.querySelector("[data-sort-game]");
  const itemEl = root.querySelector("[data-current-item]");
  const feedback = root.querySelector("[data-feedback]");
  const jamEl = root.querySelector("[data-jam]");

  function showItem() {
    selected = null;
    itemEl.classList.remove("is-selected");
    const item = queue[wave];
    itemEl.textContent = item?.name || "";
    itemEl.dataset.itemIndex = String(wave);
  }

  function finish() {
    const total = 10;
    const percent = Math.round((score / (total * 100)) * 100);
    const stars = percent >= 92 ? 3 : percent >= 72 ? 2 : 1;
    game.innerHTML = finishGame({
      activity: ACTIVITY_BY_ID["sort-station"],
      score,
      total: total * 100,
      accuracy: percent,
      stars,
      detail: `<div class="learned-list"><p><strong>What you learned</strong></p><p>Hardware is physical equipment. System software manages the system. Application software performs user tasks.</p></div>`
    });
    bindResultPanel(game, () => mountSortStation(root));
  }

  function wrong(item, chute) {
    combo = 0;
    mistakes += 1;
    jam = Math.min(100, jam + 18);
    jamEl.style.width = `${jam}%`;
    feedback.textContent = `${item.name} bounced back: ${item.reason}`;
    itemEl.classList.remove("is-selected");
    itemEl.classList.add("is-wrong");
    setTimeout(() => itemEl.classList.remove("is-wrong"), 280);
    sound.wrong();
    vibrate?.(24);
  }

  itemEl.addEventListener("click", () => {
    selected = queue[wave];
    itemEl.classList.add("is-selected");
    feedback.textContent = `${selected.name} selected. Choose a chute.`;
    sound.click();
  });

  root.querySelectorAll("[data-chute]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!selected) {
        feedback.textContent = "First choose the item on the belt.";
        sound.click();
        return;
      }
      if (selected.category === button.dataset.chute) {
        combo += 1;
        const points = 100 + Math.min(combo, 5) * 10;
        score += points;
        jam = Math.max(0, jam - 8);
        jamEl.style.width = `${jam}%`;
        feedback.textContent = `Sorted: ${selected.reason}`;
        itemEl.classList.add("is-correct");
        sound.correct();
        vibrate(12);
        setTimeout(() => itemEl.classList.remove("is-correct"), 180);
      } else {
        wrong(selected, button.dataset.chute);
      }
      wave += 1;
      root.querySelector("[data-combo]").textContent = String(combo);
      root.querySelector("[data-score]").textContent = String(score);
      root.querySelector("[data-wave]").textContent = `${Math.min(wave + 1, 5)} / 5`;
      if (wave >= queue.length) finish();
      else showItem();
    });
  });

  root.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.mode;
      root.querySelectorAll("[data-mode]").forEach((el) => el.classList.toggle("is-active", el === button));
      difficultySettings(wave, mode);
    });
  });
  root.querySelector("[data-hint]").addEventListener("click", () => {
    feedback.textContent = queue[wave]?.category === "Hardware"
      ? "Hint: look for a physical part you can see or touch."
      : queue[wave]?.category === "System Software"
        ? "Hint: system software manages the computer or maintains it."
        : "Hint: application software helps the user perform a task.";
  });

  showItem();
}
