/* ==========================================================================
   PC Lab Workbench — a small, honest 2D step simulation.

   No canvas, no view controls, no drag, no network. Every step is one clear tap on
   the right part/action; the case diagram fills or clears with the answer.
   The same engine runs two orders: the build drill and the reverse drill.
   ========================================================================== */
import { ACTIVITY_BY_ID } from "../data/activities.js";
import {
  activityHero,
  gameBar,
  feedbackMarkup,
  setFeedback,
  clearFeedback,
  finishGame,
  bindResultPanel
} from "../app/game-kit.js";
import { sound } from "../app/audio.js";
import { icon } from "../app/icons.js";
import { esc } from "../app/ui.js";

/* ----------------------------------------------------------------- steps */

const BUILD_STEPS = [
  {
    id: "prepare-bench",
    slot: { id: "bench", label: "Bench + strap", icon: "shield" },
    title: "Prepare a safe bench",
    prompt: "Clear a flat, dry surface, remove jewelry, and fit a grounded antistatic wrist strap.",
    correct: "b-prepare",
    options: [
      { id: "b-prepare", label: "Clear bench + fit strap", icon: "shield" },
      { id: "b-power", label: "Power on to warm parts", icon: "power" },
      { id: "b-metal", label: "Work on bare metal", icon: "wrench" },
      { id: "b-jump", label: "Start with the CPU", icon: "cpu" }
    ],
    reason: "Power, bare metal, or jumping ahead puts static discharge and loose tools near live parts. Safety and a grounded strap come before any component is handled.",
    hint: "Start with the surface you work on and the strap on your wrist, before touching any part.",
    success: "Bench is clear and you are grounded. Static damage risk is down before the first part is touched."
  },
  {
    id: "standoffs",
    slot: { id: "standoffs", label: "Standoffs", icon: "screw" },
    title: "Fit the case standoffs",
    prompt: "Screw the brass standoffs into the case tray at the board mounting holes.",
    correct: "b-standoffs",
    options: [
      { id: "b-standoffs", label: "Fit brass standoffs", icon: "screw" },
      { id: "b-loose", label: "Drop board on bare tray", icon: "container" },
      { id: "b-tape", label: "Tape the board down", icon: "clip" },
      { id: "b-cpu-early", label: "Seat the CPU first", icon: "cpu" }
    ],
    reason: "A motherboard laid on bare metal shorts out. Standoffs lift the board and give the screws something solid to bite into before the board is installed.",
    hint: "Look for the small brass posts that raise the board off the metal tray.",
    success: "Standoffs are set. The board will sit above the metal tray instead of touching it."
  },
  {
    id: "motherboard",
    slot: { id: "motherboard", label: "Motherboard", icon: "motherboard" },
    title: "Seat the motherboard",
    prompt: "Lower the board onto the standoffs, align every hole, and tighten screws in a cross pattern.",
    correct: "b-motherboard",
    options: [
      { id: "b-motherboard", label: "Align holes + screw board", icon: "motherboard" },
      { id: "b-force", label: "Force one corner first", icon: "wrench" },
      { id: "b-cpu-first", label: "Fit CPU before board", icon: "cpu" },
      { id: "b-gpu-tray", label: "Mount GPU on the tray", icon: "card" }
    ],
    reason: "The board must be fixed before anything is fitted to it. Forcing one corner misaligns the holes and can crack the circuit board; cross-tightening keeps it flat.",
    hint: "The board goes onto the standoffs first; everything else mounts on the board.",
    success: "The board is flat and secure. Its socket and slots are now stable work surfaces."
  },
  {
    id: "cpu-align",
    slot: { id: "cpu", label: "CPU", icon: "cpu" },
    title: "Align and seat the CPU",
    prompt: "Match the triangle mark to the socket corner, lower the chip flat, then lock the lever.",
    correct: "b-cpu",
    options: [
      { id: "b-cpu", label: "Match mark + lower flat", icon: "cpu" },
      { id: "b-drop", label: "Drop chip at an angle", icon: "alertTriangle" },
      { id: "b-paste-socket", label: "Paste the empty socket", icon: "drop" },
      { id: "b-ram-first", label: "Fit RAM first", icon: "ram" }
    ],
    reason: "The triangle marks pin 1. A tilted or reversed chip bends socket pins; paste belongs on the seated chip, not in an empty socket.",
    hint: "Find the triangle on the chip and the matching mark in the socket before you lower it.",
    success: "CPU sits flat with the lever locked. Pin 1 is aligned, so the socket is undamaged."
  },
  {
    id: "cooler",
    slot: { id: "cooler", label: "Cooler + paste", icon: "cooling" },
    title: "Apply paste and fit the cooler",
    prompt: "Add a pea-sized dot of thermal paste on the seated CPU, seat the cooler squarely, and tighten in a cross pattern.",
    correct: "b-cooler",
    options: [
      { id: "b-cooler", label: "Paste dot + cross-tighten", icon: "cooling" },
      { id: "b-paste-empty", label: "Paste the empty socket", icon: "drop" },
      { id: "b-one-screw", label: "Tighten one screw fully", icon: "screw" },
      { id: "b-no-paste", label: "Skip paste entirely", icon: "xCircle" }
    ],
    reason: "Paste goes on top of the seated chip to fill microscopic gaps. Tightening one side first tilts the cooler and leaves an air gap that overheats the chip.",
    hint: "Paste goes on the chip you just seated, and cooler screws tighten evenly on opposite sides.",
    success: "Paste and cooler are in place with even pressure. Heat now has a path away from the CPU."
  },
  {
    id: "ram",
    slot: { id: "ram", label: "RAM", icon: "ram" },
    title: "Seat RAM with notch and clips",
    prompt: "Line up the notch, press both ends evenly until the side clips click shut.",
    correct: "b-ram",
    options: [
      { id: "b-ram", label: "Align notch + click clips", icon: "ram" },
      { id: "b-force-ram", label: "Force it past the notch", icon: "alertTriangle" },
      { id: "b-one-end", label: "Press only one end", icon: "hand" },
      { id: "b-cables-early", label: "Connect cables first", icon: "cable" }
    ],
    reason: "The notch prevents a wrong-direction fit. Pressing one end or forcing the module cracks the slot; both clips must click to make full contact.",
    hint: "Match the notch, then press both ends until the clips snap in.",
    success: "RAM is seated and both clips are locked. The memory contacts are making full connection."
  },
  {
    id: "psu-gpu",
    slot: { id: "gpu", label: "PSU · storage · GPU", icon: "card" },
    title: "Fit PSU, storage and GPU",
    prompt: "Secure the power supply, mount the drive, then slide the GPU into its slot and screw the bracket.",
    correct: "b-gpu",
    options: [
      { id: "b-gpu", label: "PSU + drive + GPU", icon: "card" },
      { id: "b-gpu-first", label: "GPU before the board", icon: "expansion" },
      { id: "b-psu-loose", label: "Leave PSU unbolted", icon: "psu" },
      { id: "b-ram-out", label: "Remove RAM for room", icon: "ram" }
    ],
    reason: "The board must already be fixed before a GPU is pushed into its slot, and the supply must be bolted so its leads do not pull loose. Removing working parts is not part of a build.",
    hint: "Follow the order: power supply, storage, then the expansion card in its slot.",
    success: "PSU, drive and GPU are fitted. The system now has power, storage and graphics hardware."
  },
  {
    id: "cables",
    slot: { id: "cables", label: "Cable routing", icon: "cable" },
    title: "Route and connect cables",
    prompt: "Connect the 24-pin, CPU, SATA and front-panel leads, then tuck them clear of fans.",
    correct: "b-cables",
    options: [
      { id: "b-cables", label: "Route + tie cables", icon: "cable" },
      { id: "b-loose", label: "Leave leads across fans", icon: "fan" },
      { id: "b-skip-panel", label: "Skip front-panel leads", icon: "power" },
      { id: "b-unplug", label: "Unplug the supply", icon: "plug" }
    ],
    reason: "Loose leads can stop a fan or catch on a hot part, and skipped front-panel wiring leaves the power button dead. Tidy routing also makes later checks possible.",
    hint: "Connect the power and data leads, then bundle them away from moving fans.",
    success: "Cables are connected and tied clear of fans. Airflow and the front-panel buttons work."
  },
  {
    id: "safety-check",
    slot: { id: "check", label: "Safety check", icon: "shield" },
    title: "Run the safety check",
    prompt: "Confirm no tools or loose screws remain inside, all screws are tight, and nothing blocks the fans.",
    correct: "b-check",
    options: [
      { id: "b-check", label: "Inspect + clear the case", icon: "shield" },
      { id: "b-close-only", label: "Close the case immediately", icon: "container" },
      { id: "b-power-now", label: "Power on without looking", icon: "power" },
      { id: "b-leave-tools", label: "Leave tools inside", icon: "wrench" }
    ],
    reason: "Tools or screws left inside can short the board or jam a fan. A visual check before power is the last chance to catch that mistake.",
    hint: "Look inside for stray tools and loose screws before you close anything.",
    success: "Case interior is clear and fans are unobstructed. It is safe to power up."
  },
  {
    id: "post",
    slot: { id: "post", label: "POST + first boot", icon: "power" },
    title: "Watch POST and first boot",
    prompt: "Switch on the supply and case power, watch the power-on self-test and fan spin, then confirm the boot screen.",
    correct: "b-post",
    options: [
      { id: "b-post", label: "Power on + watch POST", icon: "power" },
      { id: "b-hold", label: "Hold the button down", icon: "hand" },
      { id: "b-skip-screen", label: "Skip the display check", icon: "monitor" },
      { id: "b-seal", label: "Seal the case before testing", icon: "container" }
    ],
    reason: "POST reports hardware faults before the system starts. A blank display or no fan spin means you must stop and recheck the leads rather than assume the build works.",
    hint: "Turn it on briefly and watch for the power-on self-test and a display.",
    success: "POST passed and the first boot reached the screen. The build is complete."
  }
];

const DISASSEMBLY_STEPS = [
  {
    id: "make-safe",
    slot: { id: "safe", label: "Made safe", icon: "power" },
    title: "Make the machine safe",
    prompt: "Save work, shut down from the system, switch off the supply, and fit a grounded antistatic strap.",
    correct: "d-safe",
    options: [
      { id: "d-safe", label: "Shut down + ground yourself", icon: "shield" },
      { id: "d-yank", label: "Pull the plug while running", icon: "plug" },
      { id: "d-open", label: "Open the case first", icon: "container" },
      { id: "d-jewelry", label: "Keep jewelry on", icon: "hand" }
    ],
    reason: "A running machine holds charge in capacitors and live circuits. Shutdown plus a grounded strap removes electrical and static risk before the case is opened.",
    hint: "Software shutdown first, then switch off the supply and put on your strap.",
    success: "System is shut down and you are grounded. It is now safe to begin."
  },
  {
    id: "document-cables",
    slot: { id: "document", label: "Cables logged", icon: "file" },
    title: "Document every cable",
    prompt: "Photograph and label each lead and connector before you unplug anything.",
    correct: "d-document",
    options: [
      { id: "d-document", label: "Photo + label each lead", icon: "file" },
      { id: "d-memory", label: "Rely on memory", icon: "brain" },
      { id: "d-pull-first", label: "Unplug before looking", icon: "plug" },
      { id: "d-skip", label: "Skip documentation", icon: "xCircle" }
    ],
    reason: "Reassembly depends on knowing where each lead went. Unplugging first loses that information and can damage a connector forced back the wrong way.",
    hint: "Record what you see before you remove anything.",
    success: "Every lead is photographed and labelled. Reassembly will be straightforward."
  },
  {
    id: "disconnect-peripherals",
    slot: { id: "peripherals", label: "Peripherals off", icon: "monitor" },
    title: "Disconnect peripherals",
    prompt: "Unplug the monitor, keyboard, mouse and other external devices from the back of the case.",
    correct: "d-peripherals",
    options: [
      { id: "d-peripherals", label: "Unplug external devices", icon: "monitor" },
      { id: "d-internal", label: "Remove internal cards first", icon: "card" },
      { id: "d-leave-on", label: "Leave peripherals attached", icon: "xCircle" },
      { id: "d-force", label: "Pull by the cable", icon: "cable" }
    ],
    reason: "External devices must be freed before the case is worked on, and tugging by the wire damages the port or the lead. Grab the connector, not the cord.",
    hint: "Start with what is outside the case: screen, keyboard and mouse.",
    success: "Peripherals are disconnected and ports are free of strain."
  },
  {
    id: "unplug-power",
    slot: { id: "power", label: "Power unplugged", icon: "plug" },
    title: "Unplug the power cord",
    prompt: "Remove the power cord from the supply and press the case power button to discharge residual power.",
    correct: "d-unplug",
    options: [
      { id: "d-unplug", label: "Unplug + discharge", icon: "plug" },
      { id: "d-switch", label: "Switch off but leave plugged", icon: "power" },
      { id: "d-cover", label: "Open with power still in", icon: "alertTriangle" },
      { id: "d-cover-psu", label: "Cover the supply", icon: "psu" }
    ],
    reason: "A switched-off supply is still connected to mains. Unplugging and draining residual charge removes the last electrical hazard inside the case.",
    hint: "The cord must come out, then press the power button once to drain what is left.",
    success: "Mains power is disconnected and residual charge is drained. The case is dead."
  },
  {
    id: "side-panel",
    slot: { id: "panel", label: "Side panel off", icon: "container" },
    title: "Remove the side panel",
    prompt: "Undo the panel screws, slide the panel off, and place the screws in a labelled container.",
    correct: "d-panel",
    options: [
      { id: "d-panel", label: "Unscrew + slide panel off", icon: "container" },
      { id: "d-pry", label: "Pry with a screwdriver", icon: "screwdriver" },
      { id: "d-scatter", label: "Scatter screws on the bench", icon: "screw" },
      { id: "d-front", label: "Work through the front", icon: "xCircle" }
    ],
    reason: "Forcing the panel bends the case, and loose screws are easily lost or left where they can short the board. A labelled container keeps the set together.",
    hint: "Find the panel screws at the rear, then slide the panel toward the front.",
    success: "Panel is off and screws are labelled. The interior is accessible and organised."
  },
  {
    id: "remove-gpu",
    slot: { id: "gpu", label: "GPU out", icon: "card" },
    title: "Remove the GPU",
    prompt: "Unscrew the bracket, release the slot latch, and lift the card straight out by its edges.",
    correct: "d-gpu",
    options: [
      { id: "d-gpu", label: "Release latch + lift card", icon: "card" },
      { id: "d-yank-gpu", label: "Yank the card sideways", icon: "alertTriangle" },
      { id: "d-psu-first", label: "Pull the supply out first", icon: "psu" },
      { id: "d-leave-gpu", label: "Leave it in place", icon: "xCircle" }
    ],
    reason: "The card lifts straight up after the latch is released; twisting it cracks the slot. It comes out before the supply so nothing above it is in the way.",
    hint: "Undo the bracket screw and the slot latch, then lift the card evenly.",
    success: "GPU is out and set aside. Its slot is free for the next part."
  },
  {
    id: "remove-ram",
    slot: { id: "ram", label: "RAM out", icon: "ram" },
    title: "Release and remove RAM",
    prompt: "Push both side clips out, then lift each module straight up by its edges.",
    correct: "d-ram",
    options: [
      { id: "d-ram", label: "Open clips + lift edges", icon: "ram" },
      { id: "d-pull-ram", label: "Pull by the gold contacts", icon: "hand" },
      { id: "d-one-clip", label: "Release only one clip", icon: "alertTriangle" },
      { id: "d-cut", label: "Cut the module out", icon: "xCircle" }
    ],
    reason: "Both clips must release or the slot tears. Gold contacts carry skin oil and are easily damaged, so handle memory by its edges only.",
    hint: "Press both clips outward and lift the module by its sides.",
    success: "RAM modules are out and held by their edges. Contacts stay clean and intact."
  },
  {
    id: "remove-cooler",
    slot: { id: "cooler", label: "Cooler off", icon: "cooling" },
    title: "Remove the cooler",
    prompt: "Loosen the cooler screws in a cross pattern, then twist it gently to break the paste seal and lift it off.",
    correct: "d-cooler",
    options: [
      { id: "d-cooler", label: "Cross-loosen + twist off", icon: "cooling" },
      { id: "d-force-cooler", label: "Yank straight up hard", icon: "alertTriangle" },
      { id: "d-heat", label: "Heat the chip to loosen it", icon: "flame" },
      { id: "d-bend", label: "Bend the bracket away", icon: "wrench" }
    ],
    reason: "Paste bonds the cooler to the chip. Even loosening and a gentle twist free it without levering against the board or cracking the chip.",
    hint: "Undo screws evenly, then a small twist releases the dried paste.",
    success: "Cooler is off without stressing the socket. The CPU is now exposed."
  },
  {
    id: "remove-cpu",
    slot: { id: "cpu", label: "CPU out", icon: "cpu" },
    title: "Lift out the CPU",
    prompt: "Release the socket lever fully, lift the chip straight up by its edges, and store it in a safe tray.",
    correct: "d-cpu",
    options: [
      { id: "d-cpu", label: "Lever + lift by edges", icon: "cpu" },
      { id: "d-slide", label: "Slide the chip sideways", icon: "alertTriangle" },
      { id: "d-touch-pins", label: "Touch the pins", icon: "hand" },
      { id: "d-leave-cpu", label: "Leave it clipped in", icon: "xCircle" }
    ],
    reason: "Sliding the chip bends pins and touching contacts transfers static. A fully open lever and a straight lift keep both the chip and socket intact.",
    hint: "Open the lever all the way before lifting the chip straight up.",
    success: "CPU is out and stored safely. Socket pins are undamaged."
  },
  {
    id: "remove-psu-mb",
    slot: { id: "psu-mb", label: "PSU + board out", icon: "motherboard" },
    title: "Remove PSU and motherboard",
    prompt: "Unscrew the supply, remove all board screws, then lift the board out by its edge and place parts in labelled trays.",
    correct: "d-psu",
    options: [
      { id: "d-psu", label: "Unscrew + lift board out", icon: "motherboard" },
      { id: "d-pry-board", label: "Pry the board with a tool", icon: "screwdriver" },
      { id: "d-toss-screws", label: "Toss screws together", icon: "screw" },
      { id: "d-skip-labels", label: "Skip the labels", icon: "xCircle" }
    ],
    reason: "The supply and board come out last, once everything attached to them is clear. Prying or mixing unlabelled screws damages the board and makes reassembly guesswork.",
    hint: "Take out the supply and board only after the smaller parts are off, and label every screw.",
    success: "PSU and board are out and all parts are labelled. The reverse drill is complete."
  }
];

function stepsFor(mode) {
  return mode === "disassembly" ? DISASSEMBLY_STEPS : BUILD_STEPS;
}

function modeFor(query) {
  return query?.get?.("mode") === "disassembly" ? "disassembly" : "build";
}

/* --------------------------------------------------------------- markup */

function optionMarkup(option) {
  return `<button class="pclab-part" type="button" data-action="${esc(option.id)}" aria-label="${esc(option.label)}">
    <span class="pclab-part-icon" aria-hidden="true">${icon(option.icon, 22)}</span>
    <span class="pclab-part-label">${esc(option.label)}</span>
  </button>`;
}

function slotMarkup(step, initialState) {
  const filled = initialState === "filled" || initialState === "present";
  return `<div class="pclab-slot" data-slot="${esc(step.slot.id)}" data-state="${initialState}">
    <span class="pclab-slot-icon" aria-hidden="true">${icon(step.slot.icon, 20)}</span>
    <span class="pclab-slot-label">${esc(step.slot.label)}</span>
    <span class="pclab-slot-state" data-slot-state>${filled ? "Fitted" : "Empty"}</span>
  </div>`;
}

function stepListMarkup(steps) {
  return steps.map((step, index) => `<li data-step-item="${esc(step.id)}">
    <span class="pclab-step-num" aria-hidden="true">${index + 1}</span>
    <span class="pclab-step-name">${esc(step.title)}</span>
  </li>`).join("");
}

export function pcLabPage({ query } = {}) {
  const mode = modeFor(query);
  const reverse = mode === "disassembly";
  const activity = ACTIVITY_BY_ID[reverse ? "disassembly" : "pc-lab"];
  const steps = stepsFor(mode);
  const initialState = reverse ? "present" : "empty";
  const other = reverse
    ? { href: "#/play/pc-lab", label: "Build mode", glyph: "wrench" }
    : { href: "#/play/pc-lab?mode=disassembly", label: "Reverse drill", glyph: "screwdriver" };

  return `<div class="pclab-page">
    ${activityHero(activity, {
      eyebrow: reverse ? "Reverse drill · 2D simulation" : "Build drill · 2D simulation",
      intro: reverse
        ? "Take a finished machine apart in the safe order: make it dead, record the leads, then remove each part from the outside in."
        : "Build a computer one safe action at a time. Each correct tap fills the next slot in the case diagram.",
      back: "/play",
      backLabel: "All interactives",
      actions: `<a class="btn btn-ghost btn-sm" href="${other.href}">${icon(other.glyph, 17)} ${other.label}</a>`,
      meta: `<span class="pill">${icon("target", 15)} Tap to act</span>
        <span class="pill">${icon("layers", 15)} 10 ordered steps</span>`
    })}

    <section class="pclab-workbench" data-pclab-workbench aria-label="PC Lab workbench">
      <div class="pclab-note">
        <h2>How this works</h2>
        <ol>
          <li>Read the current step, then tap the one correct action in the tray.</li>
          <li>The case diagram fills (build) or clears (reverse) as each step is completed.</li>
          <li>A wrong tap explains why it is unsafe here and shows what to do instead.</li>
        </ol>
        <p>${icon("shield", 16)} <strong>No internet needed.</strong> This is a self-contained 2D simulation; it works offline and stores only your local progress.</p>
      </div>

      <div class="pclab-stage" data-pclab>
        <div class="pclab-stage-head">
          <span class="pclab-step-status" data-step-status>Step 1 of ${steps.length}</span>
          <span class="pclab-mode-tag">${reverse ? "Reverse drill" : "Build drill"}</span>
          <button class="pclab-hint-btn" type="button" data-pclab-hint aria-expanded="false" aria-controls="pclab-hint">${icon("lightbulb", 17)} Need a hint?</button>
          <p class="pclab-hint-copy" id="pclab-hint" hidden>${esc(steps[0].hint)}</p>
        </div>
        <div data-bar>${gameBar({ label: "Steps complete", value: 0, total: steps.length })}</div>
        <div class="pclab-case" data-case>${steps.map((step) => slotMarkup(step, initialState)).join("")}</div>
        ${feedbackMarkup()}
      </div>

      <div class="pclab-tray">
        <div class="pclab-tray-head">
          <p class="eyebrow">Your next action</p>
          <h2 class="pclab-prompt-title" data-prompt-title>${esc(steps[0].title)}</h2>
          <p class="pclab-prompt" data-prompt>${esc(steps[0].prompt)}</p>
        </div>
        <div class="pclab-actions" data-actions>${steps[0].options.map(optionMarkup).join("")}</div>
      </div>

      <ol class="pclab-step-list" data-step-list>${stepListMarkup(steps)}</ol>
    </section>
  </div>`;
}

/* ---------------------------------------------------------------- mount */

export function mountPcLabWorkbench(root, { query } = {}) {
  const mode = modeFor(query);
  const reverse = mode === "disassembly";
  const activity = ACTIVITY_BY_ID[reverse ? "disassembly" : "pc-lab"];
  const steps = stepsFor(mode);
  const workbench = root?.querySelector?.("[data-pclab-workbench]");
  if (!workbench) return () => {};

  const barHost = workbench.querySelector("[data-bar]");
  const actionsHost = workbench.querySelector("[data-actions]");
  const status = workbench.querySelector("[data-step-status]");
  const promptTitle = workbench.querySelector("[data-prompt-title]");
  const prompt = workbench.querySelector("[data-prompt]");
  const hintCopy = workbench.querySelector("#pclab-hint");
  const hintButton = workbench.querySelector("[data-pclab-hint]");
  const caseEl = workbench.querySelector("[data-case]");
  const stepItems = Array.from(workbench.querySelectorAll("[data-step-item]"));

  let index = 0;
  let mistakes = 0;
  let done = false;
  let busy = false;
  let finishTimer = null;
  let stepTimer = null;
  let wrongTimer = null;
  const startedAt = Date.now();
  const token = Symbol("pclab-workbench");

  function renderStep() {
    const step = steps[index];
    status.textContent = `Step ${index + 1} of ${steps.length}`;
    promptTitle.textContent = step.title;
    prompt.textContent = step.prompt;
    if (hintCopy) {
      hintCopy.textContent = step.hint;
      hintCopy.hidden = true;
    }
    hintButton?.setAttribute("aria-expanded", "false");
    if (barHost) barHost.innerHTML = gameBar({ label: "Steps complete", value: index, total: steps.length });
    if (actionsHost) actionsHost.innerHTML = step.options.map(optionMarkup).join("");
    caseEl?.querySelectorAll(".pclab-slot").forEach((slot, slotIndex) => {
      slot.classList.toggle("is-current", slotIndex === index);
    });
    stepItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-current", itemIndex === index);
      if (itemIndex < index) item.classList.add("is-done");
    });
    clearFeedback(workbench);
  }

  function completeSlot(step) {
    const slot = caseEl?.querySelector(`[data-slot="${step.slot.id}"]`);
    if (!slot) return;
    slot.dataset.state = reverse ? "cleared" : "filled";
    const stateText = slot.querySelector("[data-slot-state]");
    if (stateText) stateText.textContent = reverse ? "Removed" : "Fitted";
    slot.classList.remove("is-current");
  }

  function finish() {
    if (done) return;
    done = true;
    const accuracy = Math.round((steps.length / (steps.length + mistakes)) * 100);
    const recap = reverse
      ? "Made the machine safe, documented every lead, removed the peripherals and power, then took off the panel, GPU, RAM, cooler, CPU, supply and board in order."
      : "Prepared the bench, fitted standoffs and board, aligned the CPU, applied paste and cooler, seated RAM, fitted the supply and card, routed cables, checked safety, and watched POST.";
    workbench.innerHTML = finishGame({
      activity,
      score: steps.length,
      total: steps.length + mistakes,
      accuracy,
      timeSeconds: Math.round((Date.now() - startedAt) / 1000),
      meta: { mode, mistakes },
      heading: reverse ? "Reverse drill complete" : "Build complete",
      intro: reverse
        ? "Every connection was logged and every part removed in the safe order."
        : "The machine passed its safety check and first boot.",
      detail: `<div class="learned-list"><p><strong>${reverse ? "What you practised" : "What you built"}</strong></p><p>${esc(recap)}</p></div>`
    });
    bindResultPanel(workbench, () => window.location.reload());
  }

  function choose(actionId, button) {
    if (done || busy) return;
    const step = steps[index];
    if (!step) return;

    if (actionId === step.correct) {
      completeSlot(step);
      stepItems[index]?.classList.add("is-done");
      stepItems[index]?.classList.remove("is-current");
      sound.correct();
      setFeedback(workbench, "correct", `Correct — ${step.title}`, step.success);
      busy = true;
      // Brief pause lets the learner read why the action was right.
      stepTimer = setTimeout(() => {
        busy = false;
        index += 1;
        if (index >= steps.length) {
          if (status) status.textContent = `Step ${steps.length} of ${steps.length}`;
          if (barHost) barHost.innerHTML = gameBar({ label: "Steps complete", value: steps.length, total: steps.length });
          finish();
        } else {
          renderStep();
        }
      }, 300);
      return;
    }

    mistakes += 1;
    sound.wrong();
    const correctOption = step.options.find((option) => option.id === step.correct);
    setFeedback(
      workbench,
      "wrong",
      "Not the safe order",
      `${esc(step.reason)} <strong>Do this instead:</strong> ${esc(correctOption?.label || step.prompt)}.`
    );
    button.classList.add("is-wrong");
    clearTimeout(wrongTimer);
    wrongTimer = setTimeout(() => button.classList.remove("is-wrong"), 420);
  }

  function onClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const actionButton = target.closest("[data-action]");
    if (actionButton && workbench.contains(actionButton)) {
      choose(actionButton.dataset.action, actionButton);
      return;
    }
    if (target.closest("[data-pclab-hint]")) {
      const willShow = Boolean(hintCopy && hintCopy.hidden);
      if (hintCopy) hintCopy.hidden = !willShow;
      hintButton?.setAttribute("aria-expanded", String(willShow));
      sound.click();
    }
  }

  workbench.addEventListener("click", onClick);
  window.__pcLab = {
    __token: token,
    mode,
    steps: steps.map((step) => step.id),
    currentStep: () => ({
      index,
      id: index < steps.length ? steps[index].id : null,
      total: steps.length,
      mistakes
    })
  };

  return () => {
    done = true;
    busy = false;
    clearTimeout(finishTimer);
    clearTimeout(stepTimer);
    clearTimeout(wrongTimer);
    workbench.removeEventListener("click", onClick);
    if (window.__pcLab?.__token === token) delete window.__pcLab;
  };
}
