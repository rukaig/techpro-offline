/* ==========================================================================
   Ask TechPro (offline) — 100% local study helper.
   No API key, no external models, no server, zero network.
   Searches the bundled module knowledge index, glossary, and authored answers.
   ========================================================================== */
import { get } from "../services/store.js";
import { companionArt } from "../app/art.js";
import { companionName } from "../services/companion.js";
import { GLOSSARY } from "../data/glossary.js";
import { esc } from "../app/ui.js";
import knowledgeEntries from "../../knowledge/index.json";

const COMMON_QUESTIONS = [
  {
    keywords: ["cpu", "processor", "explain", "brain"],
    question: "Explain the CPU like I am 10.",
    answer: "The CPU (Central Processing Unit) is the brain of the computer. It executes instructions and does all the math and decision-making. When installing a CPU, you must match the processor's alignment marks with the motherboard socket and never touch the pins or force the lever down.",
    lessonId: "internal-hardware",
    lessonTitle: "Internal Hardware Components",
    route: "/library/internal-hardware"
  },
  {
    keywords: ["ram", "memory", "quiz", "temporary"],
    question: "What is RAM and how does it work?",
    answer: "RAM (Random Access Memory) is fast, temporary working memory. It holds the programs and files you are actively using right now. When you turn off the computer, everything in RAM is wiped clean. RAM sticks must align with the notch in the DIMM slot and be pushed evenly until the side clips snap shut.",
    lessonId: "internal-hardware",
    lessonTitle: "Internal Hardware Components",
    route: "/library/internal-hardware"
  },
  {
    keywords: ["driver", "firmware", "difference", "bios", "uefi"],
    question: "What is the difference between a device driver and firmware?",
    answer: "Firmware is permanent software stored directly on a chip on the hardware (such as the motherboard BIOS or UEFI) that tells the device how to start up. A device driver is software installed inside the operating system (like Windows or Linux) that lets the OS communicate with specific hardware like a printer, graphics card, or sound card.",
    lessonId: "system-software",
    lessonTitle: "System Software & Firmware",
    route: "/library/system-software"
  },
  {
    keywords: ["unplug", "safety", "open", "case", "shock", "power"],
    question: "Why should I unplug a computer before opening the case?",
    answer: "Safety First: You must always power down and unplug the power cable from the wall before opening the case. This protects you from electrical shock and protects sensitive electronic parts from short-circuit damage. Press the power button once after unplugging to drain residual power from capacitors.",
    lessonId: "disassembly",
    lessonTitle: "Safe Disassembly Preparation",
    route: "/library/disassembly"
  },
  {
    keywords: ["types", "computer", "desktop", "laptop", "tablet", "server"],
    question: "What are the four main types of computers?",
    answer: "The module covers four main types: Desktops (designed for a fixed desk with separate components), Laptops (portable all-in-one with screen and keyboard), Tablets (handheld touchscreen devices), and Servers (powerful computers that provide services and resources to other computers over a network).",
    lessonId: "types-of-computers",
    lessonTitle: "Types of Computers",
    route: "/library/types-of-computers"
  },
  {
    keywords: ["thermal", "paste", "heatsink", "cooler"],
    question: "What is thermal paste and why is it needed?",
    answer: "Thermal paste (thermal interface material) fills microscopic air pockets between the top of the CPU and the metal heat sink. Air is a poor heat conductor; thermal paste ensures efficient heat transfer from the processor to the cooler so the CPU does not overheat.",
    lessonId: "assembly",
    lessonTitle: "Computer Assembly Procedures",
    route: "/library/assembly"
  },
  {
    keywords: ["standoff", "motherboard", "tray", "short"],
    question: "What are motherboard standoffs?",
    answer: "Standoffs are small brass or metal spacers screwed into the computer case tray. The motherboard rests on top of them so the solder points on the back of the motherboard never touch the bare metal case, preventing electrical short circuits.",
    lessonId: "assembly",
    lessonTitle: "Computer Assembly Procedures",
    route: "/library/assembly"
  },
  {
    keywords: ["order", "disassembly", "sequence", "steps"],
    question: "What is the proper preparation sequence before disassembly?",
    answer: "Before disassembly: 1) Unplug power and peripherals. 2) Clear and clean the workspace. 3) Put on your anti-static wrist strap. 4) Prepare screwdrivers and parts cups. 5) Document and photograph cable connections. 6) Remove the side panels carefully.",
    lessonId: "disassembly",
    lessonTitle: "Safe Disassembly Procedures",
    route: "/library/disassembly"
  }
];

function scoreQuery(query, text) {
  const words = String(query).toLowerCase().match(/[\p{L}\p{N}]{2,}/gu) || [];
  const target = String(text).toLowerCase();
  let score = 0;
  for (const w of words) {
    if (target.includes(w)) score += 1;
  }
  return score;
}

export function searchOfflineKnowledge(query) {
  const clean = String(query || "").trim();
  if (!clean) return null;

  // 1. Check common authored questions
  let bestCommon = null;
  let bestCommonScore = 0;
  for (const item of COMMON_QUESTIONS) {
    const s = scoreQuery(clean, `${item.question} ${item.keywords.join(" ")} ${item.answer}`);
    if (s > bestCommonScore) {
      bestCommonScore = s;
      bestCommon = item;
    }
  }

  // 2. Check Glossary
  let bestGlossary = null;
  let bestGlossaryScore = 0;
  for (const term of GLOSSARY) {
    const s = scoreQuery(clean, `${term.term} ${term.definition}`);
    if (s > bestGlossaryScore) {
      bestGlossaryScore = s;
      bestGlossary = term;
    }
  }

  // 3. Search knowledge entries (module passages)
  const matchedSources = [];
  if (Array.isArray(knowledgeEntries)) {
    const scored = knowledgeEntries.map((entry) => {
      const s = scoreQuery(clean, `${entry.title} ${entry.text}`);
      return { entry, score: s };
    }).filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.entry);
    matchedSources.push(...scored);
  }

  return {
    common: bestCommonScore >= 1 ? bestCommon : null,
    glossary: bestGlossaryScore >= 1 ? bestGlossary : null,
    sources: matchedSources
  };
}

export function assistantPage() {
  return `<div class="page-shell section assistant-page">
    <header class="page-head">
      <div>
        <p class="eyebrow">Offline helper · No internet needed</p>
        <h1>Ask TechPro</h1>
        <p class="lede">Search module lessons, hardware definitions, and safety tips instantly from this computer. No server, no accounts, and no AI key.</p>
      </div>
      <div class="assistant-head-art" aria-hidden="true">${companionArt("thinking", { size: 90 })}</div>
    </header>

    <div class="card card-pad search-box-card">
      <form class="assistant-search-form" data-search-form>
        <label for="offlineQuery" class="visually-hidden">Ask a question or search a topic</label>
        <div class="input-with-button">
          <input class="input" id="offlineQuery" name="query" type="text" placeholder="e.g. What does RAM do? or Why use thermal paste?" autocomplete="off" autofocus>
          <button class="btn btn-primary" type="submit">Search</button>
        </div>
      </form>

      <div class="suggestions-row mt-3">
        <span class="tiny faint">Popular topics:</span>
        ${COMMON_QUESTIONS.slice(0, 5).map((q) => `
          <button class="chip chip-sm" type="button" data-prompt="${esc(q.question)}">${esc(q.question)}</button>
        `).join("")}
      </div>
    </div>

    <section class="assistant-results-stage" data-results-stage aria-live="polite">
      <!-- Default state: helpful hints -->
      <div class="assistant-empty-prompt card card-pad">
        <p class="eyebrow">Quick tips</p>
        <p>Type any keyword or question above to find answers directly from the DepEd Computer Systems Servicing module. Everything runs locally on this device.</p>
        <div class="cluster mt-2">
          <a class="btn btn-ghost btn-sm" href="#/library">Browse Library</a>
          <a class="btn btn-ghost btn-sm" href="#/play/pc-lab">Go to PC Lab</a>
        </div>
      </div>
    </section>
  </div>`;
}

export function mountAssistant(root) {
  const form = root.querySelector("[data-search-form]");
  const input = root.querySelector("#offlineQuery");
  const stage = root.querySelector("[data-results-stage]");

  const executeSearch = (query) => {
    const q = String(query || "").trim();
    if (!q) return;

    if (input) input.value = q;
    const res = searchOfflineKnowledge(q);
    if (!stage) return;

    let html = "";

    // Primary answer if found
    if (res.common) {
      html += `
        <article class="card card-pad assistant-result-card is-primary">
          <p class="eyebrow">Answer from TechPro</p>
          <h2 style="font-size:1.25rem;margin-top:0.25rem">${esc(res.common.question)}</h2>
          <p class="assistant-answer-text mt-2" style="font-size:1.05rem;line-height:1.6">${esc(res.common.answer)}</p>
          <div class="cluster mt-3">
            <a class="btn btn-primary btn-sm" href="#${res.common.route}">Open ${esc(res.common.lessonTitle)}</a>
            <button class="btn btn-ghost btn-sm" type="button" data-copy-btn>Copy answer</button>
          </div>
        </article>
      `;
    }

    // Glossary match
    if (res.glossary && (!res.common || res.glossary.term.toLowerCase() !== res.common.question.toLowerCase())) {
      html += `
        <article class="card card-pad assistant-result-card">
          <p class="eyebrow">Glossary definition</p>
          <h3 style="font-size:1.15rem">${esc(res.glossary.term)}</h3>
          <p class="mt-1">${esc(res.glossary.definition)}</p>
          <div class="cluster mt-2">
            <a class="btn btn-soft btn-sm" href="#/library/${res.glossary.lesson}">Read related lesson</a>
          </div>
        </article>
      `;
    }

    // Module source excerpts
    if (res.sources && res.sources.length > 0) {
      html += `
        <div class="card card-pad mt-3">
          <p class="eyebrow">Related module sections</p>
          <div class="stack-sm mt-2">
            ${res.sources.map((src) => `
              <div class="module-source-item" style="padding:0.75rem 0;border-bottom:1px solid var(--line)">
                <strong>${esc(src.title)}</strong>
                <p class="tiny text-muted mt-1" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${esc(src.text)}</p>
                <a class="btn btn-ghost btn-sm mt-2" href="#${src.route}">Go to lesson section</a>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    if (!res.common && !res.glossary && (!res.sources || res.sources.length === 0)) {
      html = `
        <div class="card card-pad" role="status">
          <p class="eyebrow">No direct match</p>
          <h2>No matching module topic found for "${esc(q)}"</h2>
          <p class="mt-2">Try searching for core hardware terms like CPU, RAM, Power Supply, Motherboard, or Operating System.</p>
          <div class="cluster mt-3">
            <a class="btn btn-primary btn-sm" href="#/library">Explore all lessons</a>
            <a class="btn btn-ghost btn-sm" href="#/play">Try a game</a>
          </div>
        </div>
      `;
    }

    stage.innerHTML = html;

    stage.querySelector("[data-copy-btn]")?.addEventListener("click", (e) => {
      const textToCopy = res.common?.answer || "";
      if (textToCopy) {
        navigator.clipboard?.writeText(textToCopy);
        e.target.textContent = "Copied!";
        setTimeout(() => { e.target.textContent = "Copy answer"; }, 1500);
      }
    });
  };

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    executeSearch(input?.value);
  });

  root.querySelectorAll("[data-prompt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      executeSearch(btn.dataset.prompt);
    });
  });
}
