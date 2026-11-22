/* ==========================================================================
   Ask TechPro (offline) — 100% local study helper.
   No API key, no external models, no server, zero network, no fetch.
   Searches the bundled module knowledge index, glossary, and authored answers.
   ========================================================================== */
import { companionArt } from "../app/art.js";
import { GLOSSARY, GLOSSARY_BY_ID, glossaryForLesson } from "../data/glossary.js";
import { lessonById } from "../data/lessons.js";
import { ACTIVITIES } from "../data/activities.js";
import { esc } from "../app/ui.js";
import knowledgeEntries from "../../knowledge/index.json" with { type: "json" };

/* --------------------------------------------------------------------------
   Authored answers. These are short teaching explanations, not generated text.
   -------------------------------------------------------------------------- */
const COMMON_QUESTIONS = [
  {
    keywords: ["cpu", "processor", "explain", "brain"],
    question: "Explain the CPU like I am 10.",
    answer: "The CPU (Central Processing Unit) is the brain of the computer. It executes instructions and does all the math and decision-making. When installing a CPU, you must match the processor's alignment marks with the motherboard socket and never touch the pins or force the lever down.",
    lessonId: "internal-hardware",
    lessonTitle: "Internal Hardware",
    route: "/library/internal-hardware"
  },
  {
    keywords: ["ram", "memory", "quiz", "temporary"],
    question: "What is RAM and how does it work?",
    answer: "RAM (Random Access Memory) is fast, temporary working memory. It holds the programs and files you are actively using right now. When you turn off the computer, everything in RAM is wiped clean. RAM sticks must align with the notch in the DIMM slot and be pushed evenly until the side clips snap shut.",
    lessonId: "internal-hardware",
    lessonTitle: "Internal Hardware",
    route: "/library/internal-hardware"
  },
  {
    keywords: ["driver", "firmware", "difference", "bios", "uefi"],
    question: "What is the difference between a device driver and firmware?",
    answer: "Firmware is permanent software stored directly on a chip on the hardware (such as the motherboard BIOS or UEFI) that tells the device how to start up. A device driver is software installed inside the operating system (like Windows or Linux) that lets the OS communicate with specific hardware like a printer, graphics card, or sound card.",
    lessonId: "system-software",
    lessonTitle: "System Software",
    route: "/library/system-software"
  },
  {
    keywords: ["unplug", "safety", "open", "case", "shock", "power"],
    question: "Why should I unplug a computer before opening the case?",
    answer: "Safety First: You must always power down and unplug the power cable from the wall before opening the case. This protects you from electrical shock and protects sensitive electronic parts from short-circuit damage. Press the power button once after unplugging to drain residual power from capacitors.",
    lessonId: "disassembly",
    lessonTitle: "Safe Disassembly",
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
    lessonTitle: "Computer Assembly",
    route: "/library/assembly"
  },
  {
    keywords: ["standoff", "motherboard", "tray", "short"],
    question: "What are motherboard standoffs?",
    answer: "Standoffs are small brass or metal spacers screwed into the computer case tray. The motherboard rests on top of them so the solder points on the back of the motherboard never touch the bare metal case, preventing electrical short circuits.",
    lessonId: "assembly",
    lessonTitle: "Computer Assembly",
    route: "/library/assembly"
  },
  {
    keywords: ["order", "disassembly", "sequence", "steps"],
    question: "What is the proper preparation sequence before disassembly?",
    answer: "Before disassembly: 1) Unplug power and peripherals. 2) Clear and clean the workspace. 3) Put on your anti-static wrist strap. 4) Prepare screwdrivers and parts cups. 5) Document and photograph cable connections. 6) Remove the side panels carefully.",
    lessonId: "disassembly",
    lessonTitle: "Safe Disassembly",
    route: "/library/disassembly"
  },
  {
    keywords: ["bios", "uefi", "firmware", "startup"],
    question: "What are BIOS and UEFI and what do they do?",
    answer: "BIOS and UEFI are firmware stored on the motherboard. They run before the operating system, initialise essential hardware, run POST, and search for a boot device. Traditional BIOS is usually text-based; UEFI is the modern interface and may support a graphical setup screen, mouse input, security settings, and diagnostics.",
    lessonId: "bios-startup",
    lessonTitle: "BIOS, UEFI and the Startup Path",
    route: "/library/bios-startup"
  },
  {
    keywords: ["post", "beep", "diagnostic", "hardware check"],
    question: "What does POST check during startup?",
    answer: "POST (Power-On Self-Test) checks essential hardware such as the processor, memory, keyboard, graphics, and storage devices. A failed check may appear as an error message, beep code, diagnostic light, or a stopped startup. These are clues, not an automatic diagnosis.",
    lessonId: "bios-startup",
    lessonTitle: "BIOS, UEFI and the Startup Path",
    route: "/library/bios-startup"
  },
  {
    keywords: ["setup", "delete", "f2", "enter", "access"],
    question: "How do I enter the BIOS/UEFI setup utility?",
    answer: "Watch the startup screen for the setup-key prompt and press the manufacturer-designated key shortly after power on. Common keys are Delete, Esc, F1, F2, F10, and F12. If the operating system loads, restart and press earlier. Change only the settings the task requires.",
    lessonId: "bios-setup",
    lessonTitle: "Inside the Setup Utility",
    route: "/library/bios-setup"
  },
  {
    keywords: ["boot", "boot order", "priority", "usb", "installation"],
    question: "How should I set boot order for USB installation?",
    answer: "For an operating system installation from USB, set the bootable USB drive first, the internal storage drive second, and optical or network devices next. Save Changes and Exit to apply the order. After installation, return the internal drive to first place for daily startup.",
    lessonId: "bios-boot",
    lessonTitle: "Boot Devices and Boot Order",
    route: "/library/bios-boot"
  }
];

/* --------------------------------------------------------------------------
   Offline text retrieval. Everything here is pure: no DOM, no network.
   -------------------------------------------------------------------------- */
const STOPWORDS = new Set([
  "a", "about", "an", "and", "any", "are", "as", "at", "be", "been", "best",
  "between", "but", "by", "can", "correct", "did", "difference", "do", "does",
  "each", "example", "examples", "explain", "for", "from", "had", "has", "have",
  "how", "i", "if", "in", "into", "is", "it", "its", "like", "main", "mean",
  "means", "me", "module", "more", "most", "my", "need", "needs", "of", "on",
  "or", "our", "question", "questions", "right", "should", "so", "term", "terms",
  "that", "the", "their", "them", "then", "there", "these", "they", "thing",
  "things", "this", "to", "topic", "topics", "use", "used", "using", "very",
  "was", "we", "were", "what", "when", "where", "which", "who", "why", "will",
  "with", "would", "wrong", "you", "your"
]);

// Multi-word phrases are collapsed before tokenising so that "power supply"
// and "power-supply" both become the same canonical token.
const PHRASE_SYNONYMS = [
  ["random access memory", "ram"],
  ["memory module", "ram"],
  ["central processing unit", "cpu"],
  ["hard disk drive", "storage"],
  ["solid state drive", "storage"],
  ["hard disk", "storage"],
  ["hard drive", "storage"],
  ["power supply unit", "psu"],
  ["power supply", "psu"],
  ["anti static", "esd"],
  ["electrostatic discharge", "esd"],
  ["operating system", "os"],
  ["video card", "gpu"],
  ["graphics card", "gpu"],
  ["circuit board", "board"],
  ["basic input output system", "bios"],
  ["unified extensible firmware interface", "uefi"],
  ["power on self test", "post"],
  ["boot priority", "boot order"],
  ["setup utility", "bios setup"]
];

const WORD_SYNONYMS = {
  processor: "cpu", processors: "cpu", cpu: "cpu",
  memory: "ram", ram: "ram", dimm: "ram",
  storage: "storage", drive: "storage", disk: "storage", hdd: "storage", ssd: "storage",
  psu: "psu", supply: "psu",
  esd: "esd", static: "esd", electrostatic: "esd", antistatic: "esd", strap: "esd",
  motherboard: "board", board: "board",
  os: "os",
  gpu: "gpu", graphics: "gpu", video: "gpu",
  heatsink: "cooling", cooler: "cooling", fan: "cooling", cooling: "cooling",
  bios: "bios", uefi: "uefi", firmware: "bios", post: "post",
  boot: "boot", priority: "boot", cmos: "cmos", setup: "bios"
};

const PROTECTED_STEMS = new Set(["ram", "cpu", "os", "psu", "esd", "gpu", "bios", "uefi", "post"]);

const MIN_STRONG_CONFIDENCE = 0.55;
const MIN_DEFINITION_CONFIDENCE = 0.45;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeText(text) {
  let value = String(text == null ? "" : text).toLowerCase();
  for (const [phrase, canonical] of PHRASE_SYNONYMS) {
    const pattern = phrase.split(/\s+/).map(escapeRegExp).join("[\\s-]+");
    value = value.replace(new RegExp(`\\b${pattern}\\b`, "g"), ` ${canonical} `);
  }
  return value.replace(/\s+/g, " ").trim();
}

function stem(token) {
  if (PROTECTED_STEMS.has(token) || token.length < 5) return token;
  if (token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (token.endsWith("ing") && token.length > 6) return token.slice(0, -3);
  if (token.endsWith("ed") && token.length > 5) return token.slice(0, -2);
  if (token.endsWith("es") && token.length > 5) return token.slice(0, -2);
  if (token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}

function tokenize(text) {
  const words = normalizeText(text).match(/[\p{L}\p{N}]+/gu) || [];
  const tokens = new Set();
  for (const raw of words) {
    if (raw.length < 2 || STOPWORDS.has(raw)) continue;
    tokens.add(WORD_SYNONYMS[raw] || raw);
  }
  return [...tokens];
}

function scoreMatch(queryInfo, title, body) {
  const titleTokens = new Set(tokenize(title));
  const bodyTokens = new Set(tokenize(body));
  const titleStems = new Set([...titleTokens].map(stem));
  const bodyStems = new Set([...bodyTokens].map(stem));
  const matched = new Set();
  let raw = 0;

  for (const token of queryInfo.tokens) {
    const root = stem(token);
    let hit = false;
    if (titleTokens.has(token)) { raw += 3; hit = true; }
    else if (titleStems.has(root)) { raw += 2; hit = true; }
    if (bodyTokens.has(token)) { raw += 1; hit = true; }
    else if (bodyStems.has(root)) { raw += 0.5; hit = true; }
    if (hit) matched.add(token);
  }

  // An exact multi-word phrase is worth more than scattered word overlaps.
  if (queryInfo.tokens.length >= 2) {
    const phrase = normalizeText(queryInfo.clean);
    if (phrase && normalizeText(title).includes(phrase)) raw += 6;
    else if (phrase && normalizeText(body).includes(phrase)) raw += 3;
  }

  const max = queryInfo.tokens.length * 4 + (queryInfo.tokens.length >= 2 ? 6 : 0);
  return { confidence: max ? Math.min(1, raw / max) : 0, matched };
}

/**
 * Search the bundled module offline.
 * @param {string} query
 * @returns {{common: object|null, glossary: object|null, sources: object[], confidence: number, matchedTerms: string[]}|null}
 */
export function searchOfflineKnowledge(query) {
  const clean = String(query == null ? "" : query).trim();
  if (!clean) return null;

  const queryInfo = { clean, tokens: tokenize(clean) };
  const empty = { common: null, glossary: null, sources: [], confidence: 0, matchedTerms: [] };
  if (!queryInfo.tokens.length) return empty;

  const allMatched = new Set();
  let bestConfidence = 0;

  let common = null;
  let commonConfidence = 0;
  for (const item of COMMON_QUESTIONS) {
    const result = scoreMatch(queryInfo, item.question, `${item.keywords.join(" ")} ${item.answer}`);
    result.matched.forEach((term) => allMatched.add(term));
    if (result.confidence > commonConfidence) {
      commonConfidence = result.confidence;
      common = item;
    }
  }
  if (commonConfidence >= MIN_STRONG_CONFIDENCE) {
    bestConfidence = Math.max(bestConfidence, commonConfidence);
    common = { ...common, confidence: Math.round(commonConfidence * 100) / 100 };
  } else common = null;

  let glossary = null;
  let glossaryConfidence = 0;
  for (const term of GLOSSARY) {
    const result = scoreMatch(queryInfo, term.term, term.definition);
    result.matched.forEach((matched) => allMatched.add(matched));
    if (result.confidence > glossaryConfidence) {
      glossaryConfidence = result.confidence;
      glossary = term;
    }
  }
  if (glossaryConfidence >= MIN_DEFINITION_CONFIDENCE) {
    bestConfidence = Math.max(bestConfidence, glossaryConfidence);
    glossary = { ...glossary, confidence: Math.round(glossaryConfidence * 100) / 100 };
  } else glossary = null;

  const sources = [];
  if (Array.isArray(knowledgeEntries)) {
    const scored = knowledgeEntries.map((entry) => ({
      entry,
      ...scoreMatch(queryInfo, entry.title, entry.text)
    })).filter((item) => item.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);

    for (const item of scored) {
      item.matched.forEach((term) => allMatched.add(term));
      bestConfidence = Math.max(bestConfidence, item.confidence);
      sources.push({ ...item.entry, confidence: Math.round(item.confidence * 100) / 100 });
    }
  }

  return {
    common,
    glossary,
    sources,
    confidence: Math.round(bestConfidence * 100) / 100,
    matchedTerms: [...allMatched]
  };
}

/* --------------------------------------------------------------------------
   Lesson explainer (contextual "Explain this lesson" from the library).
   -------------------------------------------------------------------------- */
function queryFromLocation() {
  if (typeof window === "undefined" || !window.location) return new URLSearchParams();
  const hash = String(window.location.hash || "");
  const virtual = hash.startsWith("#") ? hash.slice(1) : hash;
  const mark = virtual.indexOf("?");
  try {
    return new URLSearchParams(mark >= 0 ? virtual.slice(mark + 1) : "");
  } catch {
    return new URLSearchParams();
  }
}

function resolveLessonId(query) {
  const direct = query && typeof query.get === "function" ? query.get("lesson") : query?.lesson;
  if (direct) return String(direct);
  return queryFromLocation().get("lesson") || "";
}

function stripHtml(html) {
  return String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function lessonPassages(lessonId) {
  const curated = knowledgeEntries.filter((entry) => entry.lessonId === lessonId);
  if (curated.length) return curated.slice(0, 4);

  // Lessons without a curated passage still get a text-only fallback.
  const lesson = lessonById[lessonId];
  if (!lesson) return [];
  return lesson.sections.map((section) => ({
    id: `${lessonId}-${section.id}`,
    title: section.title,
    text: stripHtml(section.html),
    route: `/library/${lessonId}#${section.id}`,
    source: "module"
  }));
}

function plainSummary(passages, fallback = "") {
  const seen = new Set();
  const sentences = [];
  for (const passage of passages.slice(0, 3)) {
    for (const piece of String(passage.text || "").split(/(?<=[.!?])\s+/)) {
      const sentence = piece.replace(/\s+/g, " ").trim();
      if (sentence.length < 25) continue;
      const key = sentence.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      sentences.push(sentence.length > 260 ? `${sentence.slice(0, 257).trimEnd()}…` : sentence);
      if (sentences.length >= 4) break;
    }
    if (sentences.length >= 4) break;
  }
  return sentences.join(" ") || fallback;
}

function lessonTerms(lessonId, lesson) {
  const direct = glossaryForLesson(lessonId);
  const keyed = (lesson?.keyTerms || []).map((id) => GLOSSARY_BY_ID[id]).filter(Boolean);
  const chosen = [];
  const seen = new Set();
  for (const term of [...keyed, ...direct, ...GLOSSARY]) {
    if (!term || seen.has(term.id)) continue;
    seen.add(term.id);
    chosen.push(term);
    if (chosen.length >= 5) break;
  }
  return chosen;
}

function relatedActivities(lessonId) {
  const related = ACTIVITIES.filter((activity) => activity.lesson === lessonId).slice(0, 2);
  if (related.length) return related;
  return ACTIVITIES.filter((activity) => activity.id === "pc-lab" || activity.id === "flashcards");
}

function lessonContext(lessonId) {
  if (!lessonId) return null;
  const lesson = lessonById[lessonId];
  const passages = lessonPassages(lessonId);
  if (!lesson && !passages.length) return null;

  const remembered = (lesson?.objectives || []).slice(0, 4);
  if (!remembered.length) {
    remembered.push(...passages.slice(0, 3).map((passage) => plainSummary([passage], passage.title)));
  }

  return {
    lessonId,
    title: lesson?.title || passages[0]?.title || "Module lesson",
    route: `/library/${lessonId}`,
    summary: plainSummary(passages, lesson?.summary || ""),
    terms: lessonTerms(lessonId, lesson),
    remembered,
    activities: relatedActivities(lessonId)
  };
}

function lessonMarkup(context) {
  return `
    <article class="card card-pad assistant-lesson-card" data-assistant-lesson="${esc(context.lessonId)}" data-assistant-lesson-title="${esc(context.title)}">
      <div class="cluster">
        <p class="eyebrow">Lesson explainer · Offline</p>
        <span class="pill pill-soft assistant-confidence">Lesson context</span>
      </div>
      <h2 class="mt-2">${esc(context.title)}</h2>
      <p class="lede assistant-summary mt-2">${esc(context.summary)}</p>

      <section class="stack-sm mt-3">
        <p class="eyebrow">Key terms from this lesson</p>
        ${context.terms.map((term) => `<p><strong>${esc(term.term)}</strong> — ${esc(term.definition)}</p>`).join("")}
      </section>

      <section class="mt-3">
        <p class="eyebrow">What to remember</p>
        <ul class="stack-sm mt-2">
          ${context.remembered.map((item) => `<li><span aria-hidden="true">✓</span> ${esc(item)}</li>`).join("")}
        </ul>
      </section>

      <section class="mt-3">
        <p class="eyebrow">Keep going</p>
        <div class="cluster mt-2">
          <a class="btn btn-primary btn-sm" href="#${esc(context.route)}">Open ${esc(context.title)}</a>
          ${context.activities.map((activity) => `<a class="btn btn-soft btn-sm" href="#${esc(activity.route)}">${esc(activity.title)}</a>`).join("")}
        </div>
      </section>
    </article>`;
}

/* --------------------------------------------------------------------------
   Result presentation.
   -------------------------------------------------------------------------- */
function excerpt(text, max = 280) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

function pct(confidence) {
  return `${Math.round(Math.max(0, Math.min(1, Number(confidence) || 0)) * 100)}%`;
}

function matchedMarkup(terms) {
  if (!terms || !terms.length) return "";
  return `<p class="tiny faint mt-2">Matched: ${terms.map((term) => `<span class="pill pill-soft">${esc(term)}</span>`).join(" ")}</p>`;
}

function resultMarkup(res, query) {
  let html = "";

  if (res.common) {
    html += `
      <article class="card card-pad assistant-result-card is-primary">
        <div class="cluster">
          <p class="eyebrow">Answer from TechPro</p>
          <span class="pill pill-success assistant-confidence">Strong match</span>
        </div>
        <h2 class="mt-2">${esc(res.common.question)}</h2>
        <p class="assistant-answer-text mt-3">${esc(res.common.answer)}</p>
        <p class="tiny faint mt-2">Match confidence: ${pct(res.common.confidence)}</p>
        ${matchedMarkup(res.matchedTerms)}
        <div class="cluster mt-3">
          <a class="btn btn-primary btn-sm" href="#${esc(res.common.route)}">Open ${esc(res.common.lessonTitle)}</a>
          <button class="btn btn-ghost btn-sm" type="button" data-copy-btn data-copy-text="${esc(res.common.answer)}">Copy answer</button>
          <span class="tiny faint" role="status" aria-live="polite" data-copy-status></span>
        </div>
      </article>`;
  }

  if (res.glossary) {
    html += `
      <article class="card card-pad assistant-result-card">
        <div class="cluster">
          <p class="eyebrow">Definition</p>
          <span class="pill pill-soft assistant-confidence">Definition</span>
        </div>
        <h3 class="mt-2">${esc(res.glossary.term)}</h3>
        <p class="mt-2">${esc(res.glossary.definition)}</p>
        <p class="tiny faint mt-2">Match confidence: ${pct(res.glossary.confidence)}</p>
        <div class="cluster mt-3">
          <a class="btn btn-soft btn-sm" href="#/library/${esc(res.glossary.lesson)}">Read related lesson</a>
        </div>
      </article>`;
  }

  if (res.sources && res.sources.length) {
    const weakOnly = !res.common && !res.glossary;
    html += `
      <div class="card card-pad mt-3">
        <div class="cluster">
          <p class="eyebrow">${weakOnly ? "Closest module sections" : "From the module"}</p>
          <span class="pill ${weakOnly ? "pill-warning" : "pill-soft"} assistant-confidence">${weakOnly ? "Not a direct answer" : "From the module"}</span>
        </div>
        ${weakOnly ? `<p class="tiny faint mt-2">These passages mention your topic, but they are not a direct answer. Open a lesson or try a more specific question.</p>` : ""}
        <div class="stack-sm mt-3">
          ${res.sources.map((source) => `
            <div class="assistant-source-item">
              <p class="eyebrow">From the module · ${pct(source.confidence)} match</p>
              <strong>${esc(source.title)}</strong>
              <p class="tiny faint mt-2">${esc(excerpt(source.text))}</p>
              <a class="btn btn-ghost btn-sm mt-2" href="#${esc(source.route)}">Go to lesson section</a>
            </div>`).join("")}
        </div>
      </div>`;
  }

  if (!html) {
    html = `
      <div class="card card-pad" role="status">
        <div class="cluster">
          <p class="eyebrow">No direct match</p>
          <span class="pill pill-warning assistant-confidence">Low confidence</span>
        </div>
        <h2 class="mt-2">No matching module topic found for “${esc(query)}”</h2>
        <p class="mt-3">Try searching for core hardware terms like CPU, RAM, Power Supply, Motherboard, or Operating System.</p>
        <div class="cluster mt-3">
          <a class="btn btn-primary btn-sm" href="#/library">Explore all lessons</a>
          <a class="btn btn-ghost btn-sm" href="#/play">Try a game</a>
        </div>
      </div>`;
  }

  return html;
}

/* --------------------------------------------------------------------------
   Page + mount.
   -------------------------------------------------------------------------- */
export function assistantPage({ query } = {}) {
  const context = lessonContext(resolveLessonId(query));
  const buddySkin = (typeof document !== "undefined" && document.documentElement.dataset.buddy) || "classic";

  return `<div class="page-shell section assistant-page">
    <header class="page-head">
      <div>
        <p class="eyebrow">Offline helper · No internet needed</p>
        <h1>Ask TechPro</h1>
        <p class="lede">Search module lessons, hardware definitions, and safety tips instantly from this computer. No server, no accounts, and no AI key.</p>
      </div>
      <div class="assistant-head-art" aria-hidden="true">${companionArt("thinking", { size: 90, skin: buddySkin })}</div>
    </header>

    <div class="card card-pad search-box-card">
      <form class="assistant-search-form" data-search-form>
        <label for="offlineQuery" class="visually-hidden">Ask a question or search a topic</label>
        <div class="input-with-button">
          <input class="input" id="offlineQuery" name="query" type="text" value="${context ? esc(context.title) : ""}" placeholder="e.g. What does RAM do? or Why use thermal paste?" autocomplete="off" autofocus>
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
      ${context ? lessonMarkup(context) : `
        <div class="assistant-empty-prompt card card-pad">
          <p class="eyebrow">Quick tips</p>
          <p>Type any keyword or question above to find answers directly from the DepEd Computer Systems Servicing module. Everything runs locally on this device.</p>
          <div class="cluster mt-3">
            <a class="btn btn-ghost btn-sm" href="#/library">Browse Library</a>
            <a class="btn btn-ghost btn-sm" href="#/play/pc-lab">Go to PC Lab</a>
          </div>
        </div>`}
    </section>
  </div>`;
}

function fallbackCopy(text) {
  if (typeof document === "undefined" || typeof document.execCommand !== "function") return false;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.setAttribute("aria-hidden", "true");
  area.style.position = "fixed";
  area.style.top = "-1000px";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  area.setSelectionRange(0, area.value.length);
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  area.remove();
  return copied;
}

export function mountAssistant(root, { query } = {}) {
  if (!root) return;

  const form = root.querySelector("[data-search-form]");
  const input = root.querySelector("#offlineQuery");
  const stage = root.querySelector("[data-results-stage]");
  const fromDom = root.querySelector("[data-assistant-lesson]")?.dataset.assistantLesson || "";
  const context = lessonContext(resolveLessonId(query) || fromDom);

  if (context) {
    if (input && !input.value.trim()) input.value = context.title;
    if (stage && !stage.querySelector("[data-assistant-lesson]")) stage.innerHTML = lessonMarkup(context);
  }

  const executeSearch = (queryText) => {
    const q = String(queryText || "").trim();
    if (!q || !stage) return;

    if (input) input.value = q;
    const res = searchOfflineKnowledge(q);
    if (!res) return;
    stage.innerHTML = resultMarkup(res, q);

    const copyButton = stage.querySelector("[data-copy-btn]");
    copyButton?.addEventListener("click", async (event) => {
      const button = event.currentTarget;
      const status = stage.querySelector("[data-copy-status]");
      const text = button.dataset.copyText || "";
      let copied = false;

      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch {
          copied = false;
        }
      }
      if (!copied) copied = fallbackCopy(text);

      if (status) {
        status.textContent = copied
          ? "Copied to clipboard."
          : "Could not copy here — select the answer text and copy it manually.";
      }
      window.setTimeout(() => {
        if (status?.isConnected) status.textContent = "";
      }, 2600);
    });
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    executeSearch(input?.value);
  });

  root.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => executeSearch(button.dataset.prompt));
  });
}
