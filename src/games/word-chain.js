import { ACTIVITY_BY_ID } from "../data/activities.js";
import { activityHero, finishGame, bindResultPanel } from "../app/game-kit.js";
import { sound, vibrate } from "../app/audio.js";
import { esc } from "../app/ui.js";
import { seededShuffle } from "./engine/kit.js";

const LINKS = [
  { term: "Hardware", definition: "Physical components that can be seen and touched.", source: "content/module.md" },
  { term: "Software", definition: "Instructions and programs that tell hardware what to do.", source: "content/module.md" },
  { term: "Motherboard", definition: "The main circuit board that connects and supports computer components.", source: "content/module.md" },
  { term: "Processor", definition: "The component that executes instructions and processes data.", source: "content/module.md" },
  { term: "RAM", definition: "Memory that stores data temporarily while programs are running.", source: "content/module.md" },
  { term: "Operating System", definition: "System software that manages computer hardware and other programs.", source: "content/module.md" },
  { term: "Device Driver", definition: "Software that lets the operating system communicate with hardware.", source: "content/module.md" },
  { term: "Application Software", definition: "Software used to perform specific tasks for the user.", source: "content/module.md" },
  { term: "Safety Procedures", definition: "Actions that reduce risk during disassembly and assembly.", source: "content/module.md" },
  { term: "Assembly", definition: "The process of putting computer parts together in the correct order.", source: "content/module.md" }
];

export function wordChainPage() {
  const activity = ACTIVITY_BY_ID["word-chain"];
  return `${activityHero(activity, { eyebrow: "Word puzzle · Chain", intro: "Drop the right ten terms into the chain. A locked link releases a short cascade." })}
  <section class="engagement-game chain-game" data-chain-game>
    <div class="game-toolbar">
      <span class="pill">Links <strong data-links>0 / 10</strong></span>
      <button class="icon-button" type="button" data-hint>Hint</button>
    </div>
    <div class="chain-board" data-chain-board>
      ${LINKS.map((link, index) => `<div class="chain-link" data-link="${index}">
        <span class="chain-number">${index + 1}</span>
        <p>${esc(link.definition)}</p>
        <button class="chain-slot" type="button" data-slot="${index}" aria-label="Choose term for link ${index + 1}">Choose term</button>
      </div>`).join("")}
    </div>
    <div class="term-bank" data-term-bank>
      ${seededShuffle(LINKS, 4821).map((link) => `<button class="term-token" type="button" data-term="${esc(link.term)}">${esc(link.term)}</button>`).join("")}
    </div>
    <p class="game-feedback" data-feedback role="status" aria-live="polite">Choose a link, then choose its term.</p>
  </section>`;
}

export function mountWordChain(root) {
  let selectedLink = null;
  let selectedTerm = null;
  let locked = 0;
  let mistakes = 0;
  const game = root.querySelector("[data-chain-game]");
  const feedback = root.querySelector("[data-feedback]");

  root.querySelectorAll("[data-slot]").forEach((slot) => {
    slot.addEventListener("click", () => {
      if (slot.closest(".chain-link").classList.contains("is-locked")) return;
      root.querySelectorAll("[data-slot]").forEach((el) => el.classList.remove("is-selected"));
      slot.classList.add("is-selected");
      selectedLink = Number(slot.dataset.slot);
      feedback.textContent = `Link ${selectedLink + 1} selected. Choose a term.`;
      sound.click();
    });
  });

  root.querySelectorAll("[data-term]").forEach((token) => {
    token.addEventListener("click", () => {
      selectedTerm = token.dataset.term;
      if (selectedLink == null) {
        feedback.textContent = "First choose a chain link.";
        sound.click();
        return;
      }
      const link = LINKS[selectedLink];
      if (selectedTerm === link.term) {
        const slot = root.querySelector(`[data-slot="${selectedLink}"]`);
        slot.textContent = selectedTerm;
        slot.closest(".chain-link").classList.add("is-locked");
        token.hidden = true;
        locked += 1;
        root.querySelector("[data-links]").textContent = `${locked} / ${LINKS.length}`;
        feedback.textContent = `Link locked: ${link.term}. ${link.definition}`;
        sound.correct();
        vibrate(12);
        selectedLink = null;
        if (locked === LINKS.length) finish();
      } else {
        mistakes += 1;
        const chain = root.querySelector(`[data-link="${selectedLink}"]`);
        chain.classList.remove("is-wrong");
        void chain.offsetWidth;
        chain.classList.add("is-wrong");
        setTimeout(() => chain.classList.remove("is-wrong"), 300);
        feedback.textContent = `That term does not fit this link. ${link.definition}`;
        sound.wrong();
        vibrate(24);
      }
    });
  });

  root.querySelector("[data-hint]").addEventListener("click", () => {
    if (selectedLink == null) {
      const open = LINKS.find((_, index) => !root.querySelector(`[data-link="${index}"]`).classList.contains("is-locked"));
      feedback.textContent = open ? `Hint: ${open.definition}` : "The chain is complete.";
    } else {
      feedback.textContent = `Hint: this link uses ${LINKS[selectedLink].term}.`;
    }
  });

  function finish() {
    const percent = Math.round((LINKS.length / (LINKS.length + mistakes)) * 100);
    game.innerHTML = finishGame({
      activity: ACTIVITY_BY_ID["word-chain"],
      score: LINKS.length,
      total: LINKS.length + mistakes,
      accuracy: percent,
      detail: `<div class="learned-list"><p><strong>What you learned</strong></p><p>Hardware, software, major components, operating software, safety procedures, and assembly form the module's core word chain.</p></div>`
    });
    bindResultPanel(game, () => window.location.reload());
  }
}
