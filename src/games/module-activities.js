/* ==========================================================================
   Five module-grounded interactives that complete the activity catalogue.
   Anatomy, safety check-up, case files, flashcards and reflection journal.
   Each page is a string; each mount returns a cleanup function for the router.
   ========================================================================== */
import { ACTIVITY_BY_ID } from "../data/activities.js";
import {
  activityHero,
  bindResultPanel,
  clearFeedback,
  finishGame,
  setFeedback
} from "../app/game-kit.js";
import { GLOSSARY } from "../data/glossary.js";
import knowledgeEntries from "../../knowledge/index.json";
import { get, set } from "../services/store.js";
import { esc, announce } from "../app/ui.js";
import { icon } from "../app/icons.js";
import { sound } from "../app/audio.js";

const GLOSSARY_BY_ID = Object.fromEntries(GLOSSARY.map((entry) => [entry.id, entry]));

function define(id) {
  return GLOSSARY_BY_ID[id]?.definition || "";
}

function knowledge(id) {
  return knowledgeEntries.find((entry) => entry.id === id)?.text || "";
}

/* One sentence from a bundled module passage, optionally the one with a keyword. */
function guide(id, word = "") {
  const sentences = knowledge(id).replace(/\s+/g, " ").split(/(?:\.|\?|!)\s+/);
  const hit = word ? sentences.find((line) => line.toLowerCase().includes(word.toLowerCase())) : sentences[0];
  return `${(hit || sentences[0] || "").replace(/[.!?]$/, "")}.`;
}

function cleanText(value, max) {
  return esc(String(value || "").trim().slice(0, max));
}

/* finishGame links are absolute; hash routing needs #/ so file:// works. */
function resultMarkup(options) {
  return finishGame(options).replace(/href="\//g, 'href="#/');
}

function showResult(host, options) {
  host.innerHTML = resultMarkup(options);
  bindResultPanel(host, () => window.location.reload());
  announce("Activity complete. Review the result, then try again or return to all interactives.");
}

function feedback(root, state, title, message) {
  setFeedback(root, state, title, message);
}

function listen(target, type, handler) {
  target.addEventListener(type, handler);
  return () => target.removeEventListener(type, handler);
}

function shuffled(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function optionButtons(options) {
  return options.map(([key, label]) =>
    `<button class="study-option" type="button" data-action="answer" data-choice="${esc(key)}">${esc(label)}</button>`
  ).join("");
}

/* Custom terms are escaped once when saved, so render them as stored. */
function cardText(card, field) {
  return card.custom ? card[field] : esc(card[field]);
}

function spoken(value) {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function markChoices(scope, answer, chosen) {
  scope.querySelectorAll("[data-action='answer']").forEach((button) => {
    if (button.dataset.choice === answer) button.classList.add("is-correct");
    else if (button.dataset.choice === chosen) button.classList.add("is-wrong");
    button.disabled = true;
  });
}

/* ==========================================================================
   1. Anatomy Explorer — eight part tiles, then a six-question labeling quiz.
   ========================================================================== */
const ANATOMY_PARTS = [
  { id: "cpu", name: "CPU (processor)", icon: "cpu", glossary: "cpu", tip: "Align its marks with the socket. Never force it into place." },
  { id: "ram", name: "RAM", icon: "ram", glossary: "ram", tip: "Both retaining clips must lock when the module is fully seated." },
  { id: "motherboard", name: "Motherboard", icon: "motherboard", glossary: "motherboard", tip: "It mounts on case standoffs, not directly on the metal tray." },
  { id: "psu", name: "Power supply (PSU)", icon: "psu", glossary: "psu", tip: "Use the right connectors and keep its vents unobstructed." },
  { id: "storage", name: "Storage drive", icon: "storage", glossary: "storage", tip: "An SSD uses flash memory; an HDD records on spinning platters." },
  { id: "gpu", name: "Graphics card", icon: "card", glossary: "expansion-card", tip: "Seat it fully in a compatible slot and secure its bracket." },
  { id: "cooler", name: "Heat sink / cooler", icon: "cooling", glossary: "cooling", tip: "Connect its fan to CPU_FAN; poor cooling causes overheating." },
  { id: "case", name: "System case", icon: "vent", glossary: "system-unit", tip: "It holds and protects the internal components of the build." }
];

const ANATOMY_QUIZ = [
  {
    prompt: "Which part executes instructions and performs calculations?",
    answer: "cpu",
    options: [["ram", "RAM"], ["cpu", "CPU (processor)"], ["psu", "Power supply"], ["storage", "Storage drive"]],
    why: define("cpu")
  },
  {
    prompt: "Which part temporarily holds the data and instructions the processor is using?",
    answer: "ram",
    options: [["storage", "Storage drive"], ["motherboard", "Motherboard"], ["ram", "RAM"], ["cooler", "Heat sink"]],
    why: define("ram")
  },
  {
    prompt: "Which part keeps files, programs, and the operating system when power is off?",
    answer: "storage",
    options: [["psu", "Power supply"], ["storage", "Storage drive"], ["gpu", "Graphics card"], ["ram", "RAM"]],
    why: define("storage")
  },
  {
    prompt: "Which part converts outlet electricity into power for the internal components?",
    answer: "psu",
    options: [["cpu", "CPU"], ["psu", "Power supply (PSU)"], ["case", "System case"], ["gpu", "Graphics card"]],
    why: define("psu")
  },
  {
    prompt: "Which board must match the processor's socket and chipset before installation?",
    answer: "motherboard",
    options: [["motherboard", "Motherboard"], ["cooler", "Heat sink"], ["storage", "Storage drive"], ["ram", "RAM"]],
    why: `${define("chipset")} ${guide("compatibility", "processor")}`
  },
  {
    prompt: "Which part keeps components within a safe operating temperature?",
    answer: "cooler",
    options: [["case", "System case"], ["gpu", "Graphics card"], ["cooler", "Heat sink / cooler"], ["ram", "RAM"]],
    why: define("cooling")
  }
];

export function anatomyPage() {
  const activity = ACTIVITY_BY_ID.anatomy;
  return `${activityHero(activity, {
    eyebrow: "Explore · Internal hardware",
    intro: "Tap each part to read what it does, then label six parts in a challenge build.",
    back: "#/play"
  })}
  <section class="study-game engagement-game" data-anatomy>
    <div class="study-head">
      <span class="pill">Phase <strong data-phase>1 of 2 · Explore</strong></span>
      <span class="pill">Inspected <strong data-inspected>0 / 8</strong></span>
      <span class="pill">Quiz <strong data-score>0 / 6</strong></span>
    </div>
    <div data-stage></div>
    <div class="feedback" role="status" aria-live="polite"></div>
  </section>`;
}

export function mountAnatomy(root) {
  const host = root.querySelector("[data-anatomy]");
  if (!host) return () => {};
  const stage = host.querySelector("[data-stage]");
  const visited = new Set();
  let phase = "explore";
  let question = 0;
  let score = 0;
  let answered = false;
  const cleanups = [];

  function counters() {
    host.querySelector("[data-phase]").textContent = phase === "explore" ? "1 of 2 · Explore" : "2 of 2 · Quiz";
    host.querySelector("[data-inspected]").textContent = `${visited.size} / 8`;
    host.querySelector("[data-score]").textContent = `${score} / 6`;
  }

  function renderExplore() {
    stage.innerHTML = `
      <p class="lede">${esc(guide("computer-system", "hardware and software"))}</p>
      <div class="part-grid">
        ${ANATOMY_PARTS.map((part) => `<button class="part-button${visited.has(part.id) ? " is-selected" : ""}" type="button" data-action="inspect" data-part="${part.id}">${icon(part.icon, 22)}<span>${esc(part.name)}</span></button>`).join("")}
      </div>
      <div class="part-detail" data-part-detail aria-live="polite">
        <p class="faint">Choose a part tile to reveal its job in the system.</p>
      </div>
      <div class="cluster mt-4">
        <button class="btn btn-primary" type="button" data-action="start-quiz">Start the 6-question labeling quiz</button>
      </div>`;
    counters();
  }

  function inspect(id) {
    const part = ANATOMY_PARTS.find((item) => item.id === id);
    if (!part) return;
    visited.add(id);
    sound.click();
    const detail = stage.querySelector("[data-part-detail]");
    detail.innerHTML = `<h2>${esc(part.name)}</h2><p>${esc(define(part.glossary))}</p><p class="study-note">${esc(part.tip)}</p>`;
    stage.querySelector(`[data-part="${id}"]`)?.classList.add("is-selected");
    feedback(host, "hint", `${part.name} inspected`, "Read its job, then inspect the remaining tiles.");
    counters();
  }

  function renderQuestion() {
    const item = ANATOMY_QUIZ[question];
    stage.innerHTML = `
      <div class="study-head">
        <span class="pill">Question <strong>${question + 1} / ${ANATOMY_QUIZ.length}</strong></span>
        <span class="pill">Correct so far <strong>${score}</strong></span>
      </div>
      <p class="study-prompt">${esc(item.prompt)}</p>
      <div class="study-grid">${optionButtons(item.options)}</div>
      <div class="cluster mt-4" data-next-slot></div>`;
    counters();
  }

  function answer(choice) {
    if (answered) return;
    answered = true;
    const item = ANATOMY_QUIZ[question];
    const correct = choice === item.answer;
    if (correct) score += 1;
    sound[correct ? "correct" : "wrong"]();
    markChoices(stage, item.answer, choice);
    feedback(host, correct ? "correct" : "wrong", correct ? "Correct label" : "Check the part again", esc(item.why));
    stage.querySelector("[data-next-slot]").innerHTML =
      `<button class="btn btn-primary" type="button" data-action="next">${question === ANATOMY_QUIZ.length - 1 ? "See results" : "Next question"}</button>`;
    counters();
  }

  function next() {
    if (question === ANATOMY_QUIZ.length - 1) {
      phase = "result";
      showResult(host, {
        activity: ACTIVITY_BY_ID.anatomy,
        score,
        total: ANATOMY_QUIZ.length,
        detail: `<div class="learned-list"><p><strong>Parts you labelled</strong></p><p>${ANATOMY_PARTS.map((part) => esc(part.name)).join(" · ")}</p><p class="study-note">${esc(guide("compatibility", "compatible"))}</p></div>`
      });
      return;
    }
    question += 1;
    answered = false;
    clearFeedback(host);
    sound.click();
    renderQuestion();
  }

  cleanups.push(listen(host, "click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button || !host.contains(button)) return;
    if (button.dataset.action === "inspect") inspect(button.dataset.part);
    else if (button.dataset.action === "start-quiz") {
      if (visited.size < ANATOMY_PARTS.length) {
        feedback(host, "wrong", "Inspect all eight parts first", `You have viewed ${visited.size} of 8 tiles. Tap the rest, then start the quiz.`);
        sound.wrong();
        return;
      }
      phase = "quiz";
      question = 0;
      answered = false;
      clearFeedback(host);
      sound.click();
      announce("Labeling quiz started. Six questions.");
      renderQuestion();
    } else if (button.dataset.action === "answer") answer(button.dataset.choice);
    else if (button.dataset.action === "next") next();
  }));

  renderExplore();
  return () => cleanups.forEach((off) => off());
}

/* ==========================================================================
   2. Tech Check-Up — six safe/unsafe inspection choices and a recommendation.
   ========================================================================== */
const CHECKUP_ITEMS = [
  {
    id: "damage", title: "External damage", critical: true,
    scene: "Before touching the workstation you notice a cracked side panel and a frayed cable.",
    safe: "Leave it unplugged and refer the unit for service.",
    unsafe: "Ignore the damaged cable and continue the inspection.",
    why: `${guide("basic-troubleshooting", "damaged wiring")} Damaged insulation is a hazard, not a quick cosmetic fix.`
  },
  {
    id: "cables", title: "Ports and cables", critical: false,
    scene: "The monitor cable is loose and a USB connector is twisted in its port.",
    safe: "Reseat each connector by its body and confirm the display cable is secure.",
    unsafe: "Pull the cables by the wires and push them in harder.",
    why: guide("disassembly", "connectors")
  },
  {
    id: "power", title: "Power cord", critical: true,
    scene: "You need to look inside the system unit to check a component.",
    safe: "Shut down properly and disconnect the power cord before opening the case.",
    unsafe: "Leave the computer plugged in so you can test it while it is open.",
    why: guide("safety", "disconnect")
  },
  {
    id: "esd", title: "Antistatic safety", critical: true,
    scene: "You are about to lift a memory module out of its slot.",
    safe: "Wear a grounded antistatic wrist strap and handle the board by its edges.",
    unsafe: "Wear a metal bracelet and touch the gold contacts of the module.",
    why: `${define("esd")} ${guide("safety", "antistatic")}`
  },
  {
    id: "post", title: "POST and beep codes", critical: false,
    scene: "At startup you hear repeated beeps and see no logo on the monitor.",
    safe: "Note the pattern, shut down and unplug, then inspect seating and cables one at a time.",
    unsafe: "Keep pressing the power button until the message disappears.",
    why: `${define("post")} ${guide("basic-troubleshooting", "indicator")}`
  },
  {
    id: "drivers", title: "OS and drivers", critical: false,
    scene: "The operating system loads, but a newly installed printer is not recognized.",
    safe: "Install the correct device driver for that printer.",
    unsafe: "Replace the motherboard because the printer will never work.",
    why: define("device-driver")
  }
];

export function techCheckupPage() {
  const activity = ACTIVITY_BY_ID["tech-checkup"];
  return `${activityHero(activity, {
    eyebrow: "Bench · Inspection form",
    intro: "Work through six checks. Choose the safe action, then read the risk behind each wrong answer.",
    back: "#/play"
  })}
  <section class="study-game engagement-game" data-checkup>
    <div class="study-head">
      <span class="pill">Check <strong data-check>1 / 6</strong></span>
      <span class="pill">Safe choices <strong data-safe>0</strong></span>
      <span class="pill">Status <strong data-status>In progress</strong></span>
    </div>
    <div data-stage></div>
    <div class="feedback" role="status" aria-live="polite"></div>
  </section>`;
}

export function mountTechCheckup(root) {
  const host = root.querySelector("[data-checkup]");
  if (!host) return () => {};
  const stage = host.querySelector("[data-stage]");
  let index = 0;
  let safe = 0;
  let criticalMiss = false;
  let answered = false;
  const cleanups = [];

  function render() {
    const item = CHECKUP_ITEMS[index];
    stage.innerHTML = `
      <article class="study-card">
        <p class="eyebrow">Inspection ${index + 1} of ${CHECKUP_ITEMS.length}</p>
        <h2 class="study-prompt">${esc(item.title)}</h2>
        <p class="study-note">${esc(item.scene)}</p>
      </article>
      <p class="lede">Which action is safe and correct for this check?</p>
      <div class="study-grid">
        <button class="study-option" type="button" data-action="answer" data-choice="safe">${esc(item.safe)}</button>
        <button class="study-option" type="button" data-action="answer" data-choice="unsafe">${esc(item.unsafe)}</button>
      </div>
      <div class="cluster mt-4" data-next-slot></div>`;
    host.querySelector("[data-check]").textContent = `${index + 1} / ${CHECKUP_ITEMS.length}`;
    host.querySelector("[data-safe]").textContent = String(safe);
  }

  function answer(choice) {
    if (answered) return;
    answered = true;
    const item = CHECKUP_ITEMS[index];
    const correct = choice === "safe";
    if (correct) safe += 1;
    else if (item.critical) criticalMiss = true;
    sound[correct ? "correct" : "wrong"]();
    markChoices(stage, "safe", choice);
    feedback(host, correct ? "correct" : "wrong",
      correct ? "Safe action recorded" : "Unsafe choice — here is the risk", esc(item.why));
    host.querySelector("[data-safe]").textContent = String(safe);
    stage.querySelector("[data-next-slot]").innerHTML =
      `<button class="btn btn-primary" type="button" data-action="next">${index === CHECKUP_ITEMS.length - 1 ? "See recommendation" : "Next check"}</button>`;
  }

  function next() {
    if (index < CHECKUP_ITEMS.length - 1) {
      index += 1;
      answered = false;
      clearFeedback(host);
      sound.click();
      render();
      return;
    }
    const recommendation = safe === CHECKUP_ITEMS.length
      ? "Use as-is — no fault found. Keep the documented routine checks and record what you observed."
      : (!criticalMiss && safe >= 4)
        ? "Clean and service — recheck part seating, cables, cooling, and drivers before returning it to use."
        : "Refer to a technician — a safety hazard or repeated fault needs qualified help.";
    host.querySelector("[data-status]").textContent = recommendation.split(" — ")[0];
    showResult(host, {
      activity: ACTIVITY_BY_ID["tech-checkup"],
      score: safe,
      total: CHECKUP_ITEMS.length,
      detail: `<div class="learned-list"><p><strong>Technician recommendation</strong></p><p>${esc(recommendation)}</p><p class="study-note">${esc(guide("basic-troubleshooting", "Change one thing"))}</p></div>`,
      meta: { criticalMiss, recommendation }
    });
  }

  cleanups.push(listen(host, "click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button || !host.contains(button)) return;
    if (button.dataset.action === "answer") answer(button.dataset.choice);
    else if (button.dataset.action === "next") next();
  }));

  render();
  return () => cleanups.forEach((off) => off());
}

/* ==========================================================================
   3. Case Files — Andrea's parts list and Carlo's no-display build.
   ========================================================================== */
const CASES = [
  {
    id: "andrea",
    title: "Case 1 · Andrea's parts list",
    intro: "Andrea is building a desktop for documents, presentations, browsing, and online classes. The list has a motherboard, a processor that does not fit its socket, DDR4 memory, storage, a power supply, a cooler, a case, monitor, keyboard, and mouse. No programs are listed.",
    questions: [
      {
        prompt: "Andrea's processor will not seat in the board's socket. What is the correct move?",
        answer: "b",
        options: [["a", "Force it down until it fits"], ["b", "Check the specifications and choose a matching processor"], ["c", "Add more thermal paste and try again"]],
        why: `${guide("compatibility", "processor")} ${guide("compatibility", "forcing")}`
      },
      {
        prompt: "Which system software must be installed so the hardware and applications can work?",
        answer: "a",
        options: [["a", "An operating system"], ["b", "A word processor"], ["c", "A graphics driver only"]],
        why: define("operating-system")
      },
      {
        prompt: "Which set of applications matches Andrea's school tasks?",
        answer: "c",
        options: [["a", "Antivirus, backup, and disk tools only"], ["b", "Firmware and a device driver only"], ["c", "Word processor, presentation software, and a web browser"]],
        why: define("application-software")
      }
    ],
    model: "Check compatibility first and choose a processor that matches the socket and chipset. Install an operating system, then add a word processor, presentation software, and a web browser for the school tasks."
  },
  {
    id: "carlo",
    title: "Case 2 · Carlo's no-display build",
    intro: "Carlo finished cleaning the internal components. During reassembly he connected the power cable before checking the installed parts. On startup the cooling fan did not operate and the monitor displayed no image.",
    questions: [
      {
        prompt: "What should Carlo do before he opens the case again?",
        answer: "b",
        options: [["a", "Leave it on so the fan can be watched closely"], ["b", "Shut down, disconnect power, and apply ESD protection"], ["c", "Unplug only the monitor and keep the system powered"]],
        why: guide("safety", "shut it down")
      },
      {
        prompt: "The fan is silent and there is no display. Which checks come first?",
        answer: "a",
        options: [["a", "Cooler seating, CPU_FAN header, power cables, and display cable"], ["b", "Replace the processor immediately"], ["c", "Remove the cooler while the system is running"]],
        why: `${define("fan-header")} ${guide("assembly", "Before connecting power")}`
      },
      {
        prompt: "One connection was reseated but the fault remains. What is the disciplined next step?",
        answer: "c",
        options: [["a", "Change several parts at once to save time"], ["b", "Keep powering on until the image appears"], ["c", "Check one thing at a time, record results, and stop for qualified help if a hazard appears"]],
        why: `${guide("basic-troubleshooting", "Change one thing")} ${guide("basic-troubleshooting", "Do not guess")}`
      }
    ],
    model: "Shut down and disconnect power before inspecting. Reseat the cooler and confirm its fan is on CPU_FAN, check power and display cables, then change one thing at a time. Stop and get qualified help if any hazard appears."
  }
];

export function caseFilesPage() {
  const activity = ACTIVITY_BY_ID["case-files"];
  return `${activityHero(activity, {
    eyebrow: "Diagnostics · Two repair stories",
    intro: "Read each module case, choose the diagnostic step, and compare your reasoning with the model answer.",
    back: "#/play"
  })}
  <section class="study-game engagement-game" data-cases>
    <div class="study-head">
      <span class="pill">Case <strong data-case-label>1 / 2</strong></span>
      <span class="pill">Question <strong data-question-label>1 / 3</strong></span>
      <span class="pill">Correct <strong data-score>0 / 6</strong></span>
    </div>
    <div data-stage></div>
    <div class="feedback" role="status" aria-live="polite"></div>
  </section>`;
}

export function mountCaseFiles(root) {
  const host = root.querySelector("[data-cases]");
  if (!host) return () => {};
  const stage = host.querySelector("[data-stage]");
  let caseIndex = 0;
  let question = 0;
  let score = 0;
  let answered = false;
  const cleanups = [];

  function counters() {
    host.querySelector("[data-case-label]").textContent = `${caseIndex + 1} / ${CASES.length}`;
    host.querySelector("[data-question-label]").textContent = `${question + 1} / 3`;
    host.querySelector("[data-score]").textContent = `${score} / 6`;
  }

  function renderQuestion() {
    const file = CASES[caseIndex];
    const item = file.questions[question];
    stage.innerHTML = `
      <article class="study-card">
        <p class="eyebrow">${esc(file.title)}</p>
        ${question === 0 ? `<p class="study-note">${esc(file.intro)}</p>` : `<p class="study-note">Same case: ${esc(file.title.split("· ")[1])}. Continue the diagnosis.</p>`}
      </article>
      <p class="study-prompt">${esc(item.prompt)}</p>
      <div class="study-grid">${optionButtons(item.options)}</div>
      <div class="cluster mt-4" data-next-slot></div>`;
    counters();
  }

  function renderModel() {
    stage.innerHTML = `
      <article class="study-card">
        <p class="eyebrow">Model answer · ${esc(CASES[caseIndex].title)}</p>
        <div class="study-detail">${esc(CASES[caseIndex].model)}</div>
        <p class="study-note">${esc(guide("computer-system", "incompatible"))}</p>
      </article>
      <div class="cluster mt-4">
        <button class="btn btn-primary" type="button" data-action="continue">${caseIndex === CASES.length - 1 ? "See results" : "Open the next case"}</button>
      </div>`;
    counters();
  }

  function answer(choice) {
    if (answered) return;
    answered = true;
    const item = CASES[caseIndex].questions[question];
    const correct = choice === item.answer;
    if (correct) score += 1;
    sound[correct ? "correct" : "wrong"]();
    markChoices(stage, item.answer, choice);
    feedback(host, correct ? "correct" : "wrong", correct ? "Sound diagnosis" : "Model answer explains why", esc(item.why));
    stage.querySelector("[data-next-slot]").innerHTML =
      `<button class="btn btn-primary" type="button" data-action="next">${question === 2 ? "Read the model answer" : "Next question"}</button>`;
    counters();
  }

  function next() {
    if (question < 2) {
      question += 1;
      answered = false;
      clearFeedback(host);
      sound.click();
      renderQuestion();
      return;
    }
    clearFeedback(host);
    sound.click();
    renderModel();
  }

  function continueCase() {
    if (caseIndex < CASES.length - 1) {
      caseIndex += 1;
      question = 0;
      answered = false;
      clearFeedback(host);
      sound.click();
      renderQuestion();
      return;
    }
    showResult(host, {
      activity: ACTIVITY_BY_ID["case-files"],
      score,
      total: 6,
      detail: `<div class="learned-list"><p><strong>Model answers</strong></p><p>${CASES.map((file) => `<strong>${esc(file.title.split("· ")[1])}:</strong> ${esc(file.model)}`).join("<br>")}</p></div>`,
      meta: { cases: CASES.map((file) => file.id), gradedSteps: 6 }
    });
  }

  cleanups.push(listen(host, "click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button || !host.contains(button)) return;
    if (button.dataset.action === "answer") answer(button.dataset.choice);
    else if (button.dataset.action === "next") next();
    else if (button.dataset.action === "continue") continueCase();
  }));

  renderQuestion();
  return () => cleanups.forEach((off) => off());
}

/* ==========================================================================
   4. Flashcards + Quick Recap — flip cards, shuffle, one custom term, recap.
   ========================================================================== */
const CARD_IDS = ["hardware", "software", "motherboard", "cpu", "ram", "storage", "psu", "esd"];
const FLASHCARDS_KEY = "studyFlashcards";
const RECAP = [
  {
    prompt: "Hardware is…",
    answer: "a",
    options: [["a", "The physical components you can see and touch"], ["b", "The programs that tell the computer what to do"], ["c", "A set of startup beep codes"]],
    why: define("hardware")
  },
  {
    prompt: "System software…",
    answer: "b",
    options: [["a", "Helps a user write a school report"], ["b", "Manages hardware and provides a platform for other programs"], ["c", "Is the same thing as the processor"]],
    why: define("system-software")
  },
  {
    prompt: "RAM…",
    answer: "c",
    options: [["a", "Keeps files when power is off"], ["b", "Converts outlet electricity for the parts"], ["c", "Temporarily holds active data and clears when power is off"]],
    why: define("ram")
  },
  {
    prompt: "A storage device…",
    answer: "a",
    options: [["a", "Keeps files, programs, and the OS when the computer is off"], ["b", "Connects the processor to the motherboard"], ["c", "Is another name for the cooling fan"]],
    why: define("storage")
  },
  {
    prompt: "Before powering on an assembled computer…",
    answer: "b",
    options: [["a", "Remove the cooler to check the processor"], ["b", "Inspect seating, cables, screws, cooling, and the closed case"], ["c", "Install applications before checking any cable"]],
    why: guide("assembly", "Before connecting power")
  }
];

function baseCards() {
  const cards = CARD_IDS.map((id) => ({ term: GLOSSARY_BY_ID[id].term, body: define(id) }));
  const custom = get(FLASHCARDS_KEY)?.custom;
  if (custom?.term) cards.push({ term: custom.term, body: custom.definition || "", custom: true });
  return cards;
}

export function flashcardsPage() {
  const activity = ACTIVITY_BY_ID.flashcards;
  return `${activityHero(activity, {
    eyebrow: "Review · Flip and recall",
    intro: "Flip eight module terms, shuffle the deck, add one tricky term, then answer a rapid recap.",
    back: "#/play"
  })}
  <section class="study-game engagement-game" data-flashcards>
    <div class="study-head">
      <span class="pill">Phase <strong data-phase>Cards</strong></span>
      <span class="pill">Cards <strong data-card-count>8 / 8</strong></span>
      <span class="pill">Recap <strong data-recap-score>0 / 5</strong></span>
    </div>
    <div data-stage></div>
    <div class="feedback" role="status" aria-live="polite"></div>
  </section>`;
}

export function mountFlashcards(root) {
  const host = root.querySelector("[data-flashcards]");
  if (!host) return () => {};
  const stage = host.querySelector("[data-stage]");
  let cards = baseCards();
  const flipped = new Set();
  let question = 0;
  let score = 0;
  let answered = false;
  let phase = "cards";
  const cleanups = [];

  function counters() {
    host.querySelector("[data-phase]").textContent = phase === "cards" ? "Cards" : "Quick recap";
    host.querySelector("[data-card-count]").textContent = `${cards.length} / ${cards.length}`;
    host.querySelector("[data-recap-score]").textContent = `${score} / 5`;
  }

  function renderCards() {
    stage.innerHTML = `
      <p class="lede">Tap a card to flip between the term and its module definition.</p>
      <div class="study-grid">
        ${cards.map((card, i) => `<button class="flashcard${flipped.has(i) ? " is-selected" : ""}" type="button" data-action="flip" data-card="${i}" aria-pressed="${flipped.has(i)}">
          <span class="flashcard-face">${cardText(card, "term")}</span>
          <span class="flashcard-face">${cardText(card, "body")}</span>
        </button>`).join("")}
      </div>
      <div class="cluster mt-4">
        <button class="btn btn-ghost" type="button" data-action="shuffle">${icon("refresh", 17)} Shuffle cards</button>
        <button class="btn btn-primary" type="button" data-action="start-recap">Start 5-question recap</button>
      </div>
      <article class="study-card">
        <p class="study-prompt">Add one tricky term from your own notes</p>
        <div class="study-grid">
          <input class="input" data-custom-term maxlength="60" placeholder="Term" aria-label="Your term">
          <input class="input" data-custom-def maxlength="240" placeholder="Definition" aria-label="Your definition">
        </div>
        <div class="cluster mt-4"><button class="btn btn-soft" type="button" data-action="save-custom">Save card on this device</button></div>
      </article>`;
    counters();
  }

  function renderQuestion() {
    const item = RECAP[question];
    stage.innerHTML = `
      <div class="study-head">
        <span class="pill">Recap <strong>${question + 1} / ${RECAP.length}</strong></span>
        <span class="pill">Correct <strong>${score}</strong></span>
      </div>
      <p class="study-prompt">${esc(item.prompt)}</p>
      <div class="study-grid">${optionButtons(item.options)}</div>
      <div class="cluster mt-4" data-next-slot></div>`;
    counters();
  }

  function flip(index) {
    const card = cards[index];
    if (!card) return;
    if (flipped.has(index)) flipped.delete(index);
    else flipped.add(index);
    const button = stage.querySelector(`[data-card="${index}"]`);
    button?.classList.toggle("is-selected", flipped.has(index));
    button?.setAttribute("aria-pressed", String(flipped.has(index)));
    sound.click();
    announce(flipped.has(index) ? `${spoken(card.term)}: ${spoken(card.body)}` : spoken(card.term));
  }

  function saveCustom() {
    const term = cleanText(stage.querySelector("[data-custom-term]")?.value, 60);
    const definition = cleanText(stage.querySelector("[data-custom-def]")?.value, 240);
    if (!term || !definition) {
      feedback(host, "wrong", "Both fields are needed", "Write a short term and a definition, then save the card.");
      sound.wrong();
      return;
    }
    set(FLASHCARDS_KEY, { custom: { term, definition } });
    cards = baseCards();
    flipped.clear();
    sound.correct();
    feedback(host, "correct", "Saved on this device", "Your card was added to the deck. Tap it to flip it like the others.");
    announce("Custom flashcard saved on this device.");
    renderCards();
  }

  function answer(choice) {
    if (answered) return;
    answered = true;
    const item = RECAP[question];
    const correct = choice === item.answer;
    if (correct) score += 1;
    sound[correct ? "correct" : "wrong"]();
    markChoices(stage, item.answer, choice);
    feedback(host, correct ? "correct" : "wrong", correct ? "Recall confirmed" : "Review this definition", esc(item.why));
    stage.querySelector("[data-next-slot]").innerHTML =
      `<button class="btn btn-primary" type="button" data-action="next">${question === RECAP.length - 1 ? "See results" : "Next question"}</button>`;
    counters();
  }

  function next() {
    if (question < RECAP.length - 1) {
      question += 1;
      answered = false;
      clearFeedback(host);
      sound.click();
      renderQuestion();
      return;
    }
    showResult(host, {
      activity: ACTIVITY_BY_ID.flashcards,
      score,
      total: RECAP.length,
      detail: `<div class="learned-list"><p><strong>Deck recap</strong></p><p>${cards.map((card) => cardText(card, "term")).join(" · ")}</p><p class="study-note">${esc(guide("computer-system", "hardware and software"))}</p></div>`
    });
  }

  cleanups.push(listen(host, "click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button || !host.contains(button)) return;
    const action = button.dataset.action;
    if (action === "flip") flip(Number(button.dataset.card));
    else if (action === "shuffle") { cards = shuffled(cards); flipped.clear(); sound.click(); announce("Cards shuffled."); renderCards(); }
    else if (action === "save-custom") saveCustom();
    else if (action === "start-recap") {
      phase = "recap";
      question = 0;
      answered = false;
      clearFeedback(host);
      sound.click();
      announce("Rapid recap started. Five questions.");
      renderQuestion();
    } else if (action === "answer") answer(button.dataset.choice);
    else if (action === "next") next();
  }));

  renderCards();
  return () => cleanups.forEach((off) => off());
}

/* ==========================================================================
   5. Reflection Journal — four prompts, local auto-save, ungraded completion.
   ========================================================================== */
const REFLECTION_KEY = "studyReflection";
const PROMPTS = [
  { id: "safety", text: "What safety step will you always do first before opening a computer case?", hint: "Think about power and static electricity." },
  { id: "hardware", text: "Which part was hardest to identify and why?", hint: "Name the part and the clue that helped you." },
  { id: "ram", text: "How would you explain RAM to a classmate?", hint: "Use the idea of temporary working memory." },
  { id: "purchase", text: "What would you check before buying a replacement part?", hint: "Think about compatibility and specifications." }
];

export function reflectionPage() {
  const activity = ACTIVITY_BY_ID.reflection;
  return `${activityHero(activity, {
    eyebrow: "Journal · Self-reflection",
    intro: "Answer four prompts in your own words. Nothing is graded and every answer stays on this device.",
    back: "#/play"
  })}
  <section class="study-game engagement-game" data-reflection>
    <div class="study-head">
      <span class="pill">Prompts <strong>4</strong></span>
      <span class="pill">Saved locally <strong>On this device</strong></span>
    </div>
    <div data-stage></div>
    <div class="feedback" role="status" aria-live="polite"></div>
  </section>`;
}

export function mountReflection(root) {
  const host = root.querySelector("[data-reflection]");
  if (!host) return () => {};
  const stage = host.querySelector("[data-stage]");
  const saved = get(REFLECTION_KEY) || {};
  const answers = { ...(saved.answers || {}) };
  let completedAt = saved.completedAt || null;
  let saveTimer = null;
  const cleanups = [];

  function stamp() {
    return new Date().toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit" });
  }

  function persist(final = false) {
    const savedAt = Date.now();
    if (final) completedAt = savedAt;
    set(REFLECTION_KEY, { answers: { ...answers }, savedAt, completedAt });
    const status = stage.querySelector("[data-save-status]");
    if (status) status.textContent = `Saved on this device · ${stamp()}`;
  }

  function render() {
    stage.innerHTML = `
      <p class="study-note">${esc(guide("safety", "disconnect"))} ${esc(guide("compatibility", "compatible"))}</p>
      <div class="journal-list">
        ${PROMPTS.map((prompt, i) => `
          <div class="journal-item">
            <label class="journal-prompt" for="journal-${prompt.id}">${i + 1}. ${esc(prompt.text)} <span class="tiny faint">${esc(prompt.hint)}</span></label>
            <textarea id="journal-${prompt.id}" class="journal-input textarea" rows="3" data-prompt="${prompt.id}" placeholder="Write your answer here…">${esc(answers[prompt.id] || "")}</textarea>
          </div>`).join("")}
      </div>
      <p class="study-note" data-save-status role="status" aria-live="polite">Saved on this device · ${saved.savedAt ? new Date(saved.savedAt).toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit" }) : "answers save as you type"}</p>
      <div class="cluster mt-4">
        <button class="btn btn-primary" type="button" data-action="finish">Finish &amp; save</button>
      </div>`;
  }

  cleanups.push(listen(host, "input", (event) => {
    const field = event.target.closest("[data-prompt]");
    if (!field) return;
    answers[field.dataset.prompt] = field.value;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { persist(false); announce("Journal answer saved on this device."); }, 250);
  }));

  cleanups.push(listen(host, "change", (event) => {
    if (!event.target.closest("[data-prompt]")) return;
    clearTimeout(saveTimer);
    persist(false);
  }));

  cleanups.push(listen(host, "click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button || button.dataset.action !== "finish") return;
    clearTimeout(saveTimer);
    persist(true);
    sound.click();
    const written = PROMPTS.filter((prompt) => (answers[prompt.id] || "").trim()).length;
    announce("Reflection saved on this device.");
    showResult(host, {
      activity: ACTIVITY_BY_ID.reflection,
      score: PROMPTS.length,
      total: PROMPTS.length,
      accuracy: 100,
      heading: "Reflection saved",
      intro: "Your four answers stay on this device. This is self-reflection, not a graded test.",
      meta: { type: "self-reflection", graded: false, prompts: PROMPTS.length, answered: written },
      detail: `<div class="learned-list"><p><strong>What you recorded</strong></p><p>${written} of 4 prompts answered. ${written < 4 ? "You can return any time to add more." : "All four prompts have an answer."}</p><p class="study-note">No response is marked right or wrong. Keep the notes for your own practice.</p></div>`
    });
  }));

  render();
  return () => {
    clearTimeout(saveTimer);
    cleanups.forEach((off) => off());
  };
}
