/* ==========================================================================
   Term 1 – Module 2: BIOS/UEFI Configuration interactives.

   Six self-contained games. No network, no dynamic import, no external assets.
   Every page has a real Back link to the Play hub and records local progress.
   ========================================================================== */
import { ACTIVITY_BY_ID } from "../data/activities.js";
import { GLOSSARY } from "../data/glossary.js";
import {
  activityHero,
  bindResultPanel,
  clearFeedback,
  finishGame,
  setFeedback
} from "../app/game-kit.js";
import { esc, announce } from "../app/ui.js";
import { icon } from "../app/icons.js";
import { sound, vibrate } from "../app/audio.js";

const TERMS = Object.fromEntries(GLOSSARY.map((entry) => [entry.id, entry]));

function define(id) {
  return TERMS[id]?.definition || "";
}

function resultMarkup(options) {
  return finishGame(options).replace(/href="\//g, 'href="#/');
}

function showResult(host, options) {
  host.innerHTML = resultMarkup(options);
  bindResultPanel(host, () => window.location.reload());
  announce("Activity complete. Review the result, then try again or return to all interactives.");
}

function choiceButtons(options, chosen = null, locked = false) {
  return options.map(([key, label]) => `
    <button class="study-option${chosen === key ? " is-selected" : ""}" type="button"
      data-choice="${esc(key)}" ${locked ? "disabled" : ""}>${esc(label)}</button>
  `).join("");
}

function hero(activityId, eyebrow, intro) {
  return activityHero(ACTIVITY_BY_ID[activityId], {
    eyebrow,
    intro,
    back: "#/play",
    backLabel: "All interactives"
  });
}

/* --------------------------------------------------------------------------
   1. Startup Relay — tap the startup events in the module's sequence.
   -------------------------------------------------------------------------- */
const STARTUP_STEPS = [
  { id: "power", label: "Press power: the processor begins running firmware instructions", why: "Startup begins before the operating system, with instructions stored in motherboard firmware." },
  { id: "firmware", label: "BIOS/UEFI initialises essential hardware", why: "Firmware prepares the processor, memory, keyboard, graphics, and storage devices." },
  { id: "post", label: "POST checks the essential hardware", why: "Power-On Self-Test reports missing or failing hardware through messages, beeps, lights, or a halted boot." },
  { id: "search", label: "Firmware searches boot devices for startup files", why: "Boot order decides which device is checked first for the files needed to start the computer." },
  { id: "os", label: "The operating system loads", why: "Once startup files are found, control passes to the operating system." }
];

const STARTUP_TILES = ["post", "os", "power", "search", "firmware"];

export function startupSequencePage() {
  return `${hero("startup-sequence", "Module 2 · Startup path", "Tap the five startup events in the order the module gives. Each correct tap explains what just happened.")}
  <section class="study-game engagement-game" data-bios-game="startup-sequence">
    <div class="study-head">
      <span class="pill">Step <strong data-step>1 / 5</strong></span>
      <span class="pill">Mistakes <strong data-mistakes>0</strong></span>
    </div>
    <div data-stage></div>
    <div class="feedback" role="status" aria-live="polite"></div>
  </section>`;
}

export function mountStartupSequence(root) {
  const host = root.querySelector('[data-bios-game="startup-sequence"]');
  if (!host) return () => {};
  const stage = host.querySelector("[data-stage]");
  const activity = ACTIVITY_BY_ID["startup-sequence"];
  const done = new Set();
  let next = 0;
  let mistakes = 0;

  function counters() {
    host.querySelector("[data-step]").textContent = `${Math.min(next + 1, 5)} / 5`;
    host.querySelector("[data-mistakes]").textContent = String(mistakes);
  }

  function render() {
    stage.innerHTML = `
      <p class="study-prompt">What happens <strong>next</strong> after you press the power button?</p>
      <div class="study-grid">
        ${STARTUP_TILES.map((id) => {
          const item = STARTUP_STEPS.find((step) => step.id === id);
          return `<button class="study-option${done.has(id) ? " is-correct" : ""}" type="button"
            data-startup="${id}" ${done.has(id) ? "disabled" : ""}>${esc(item.label)}</button>`;
        }).join("")}
      </div>
      <div class="cluster mt-4"><button class="btn btn-ghost btn-sm" type="button" data-startup-hint>${icon("lightbulb", 16)} Need a hint?</button></div>`;
    counters();
    stage.querySelectorAll("[data-startup]").forEach((button) => {
      button.addEventListener("click", () => pick(button.dataset.startup));
    });
    stage.querySelector("[data-startup-hint]")?.addEventListener("click", () => {
      setFeedback(host, "hint", "Think about the sequence", STARTUP_STEPS[next].why);
    });
  }

  function pick(id) {
    const expected = STARTUP_STEPS[next];
    if (id !== expected.id) {
      mistakes += 1;
      sound.wrong();
      vibrate(18);
      setFeedback(host, "wrong", "Not this step yet", "The firmware and POST work happens before the operating system loads.");
      counters();
      return;
    }
    done.add(id);
    sound.correct();
    vibrate(12);
    setFeedback(host, "correct", expected.label, expected.why);
    next += 1;
    counters();
    if (next >= STARTUP_STEPS.length) finish();
    else render();
  }

  function finish() {
    const score = Math.max(0, STARTUP_STEPS.length - mistakes);
    showResult(host, {
      activity,
      score,
      total: STARTUP_STEPS.length,
      accuracy: (score / STARTUP_STEPS.length) * 100,
      heading: "Startup path complete",
      intro: "Power on, firmware, POST, boot-device search, operating system. That is the module's startup sequence.",
      detail: `<div class="learned-list"><p><strong>What you learned</strong></p><p>Firmware runs before the operating system. POST checks essential hardware, and the boot order decides where startup files are found.</p></div>`
    });
  }

  render();
  return () => {};
}

/* --------------------------------------------------------------------------
   Generic one-question-at-a-time engine for three Module 2 drills.
   -------------------------------------------------------------------------- */
function choicePage(activityId, eyebrow, intro) {
  return `${hero(activityId, eyebrow, intro)}
  <section class="study-game engagement-game" data-bios-game="${activityId}">
    <div class="study-head">
      <span class="pill">Item <strong data-item>1 / 1</strong></span>
      <span class="pill">Correct <strong data-score>0</strong></span>
    </div>
    <div data-stage></div>
    <div class="feedback" role="status" aria-live="polite"></div>
  </section>`;
}

function mountChoiceGame(root, activityId, steps) {
  const host = root.querySelector(`[data-bios-game="${activityId}"]`);
  if (!host) return () => {};
  const stage = host.querySelector("[data-stage]");
  const activity = ACTIVITY_BY_ID[activityId];
  let index = 0;
  let score = 0;
  let answered = false;

  function counters() {
    host.querySelector("[data-item]").textContent = `${Math.min(index + 1, steps.length)} / ${steps.length}`;
    host.querySelector("[data-score]").textContent = `${score} / ${steps.length}`;
  }

  function render() {
    const item = steps[index];
    stage.innerHTML = `
      ${item.context ? `<article class="study-card"><p>${esc(item.context)}</p></article>` : ""}
      <p class="study-prompt">${esc(item.prompt)}</p>
      <div class="study-grid">${choiceButtons(item.options)}</div>
      <div class="cluster mt-4" data-next-slot></div>`;
    counters();
    stage.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => answer(button));
    });
  }

  function answer(button) {
    if (answered) return;
    answered = true;
    const item = steps[index];
    const chosen = button.dataset.choice;
    const correct = chosen === item.answer;
    if (correct) score += 1;
    sound[correct ? "correct" : "wrong"]();
    vibrate(correct ? 12 : 22);
    stage.querySelectorAll("[data-choice]").forEach((el) => {
      if (el.dataset.choice === item.answer) el.classList.add("is-correct");
      else if (el === button) el.classList.add("is-wrong");
      el.disabled = true;
    });
    setFeedback(host, correct ? "correct" : "wrong", correct ? "Good call" : "Check the clue", item.why);
    const nextSlot = stage.querySelector("[data-next-slot]");
    if (nextSlot) {
      nextSlot.innerHTML = `<button class="btn btn-primary" type="button" data-next>${index === steps.length - 1 ? "See results" : "Next item"} ${icon("arrowRight", 17)}</button>`;
      nextSlot.querySelector("[data-next]").addEventListener("click", advance);
    }
    counters();
  }

  function advance() {
    answered = false;
    clearFeedback(host);
    index += 1;
    if (index >= steps.length) finish();
    else render();
  }

  function finish() {
    showResult(host, {
      activity,
      score,
      total: steps.length,
      heading: "Module 2 drill complete",
      intro: "Review the explanations, then retry any item you missed.",
      detail: `<div class="learned-list"><p><strong>Remember</strong></p><p>Start with an observation. Hardware clues point to connections and components; configuration clues point to settings and saved changes.</p></div>`
    });
  }

  render();
  return () => {};
}

/* --------------------------------------------------------------------------
   2. Boot Order Builder
   -------------------------------------------------------------------------- */
const BOOT_STEPS = [
  {
    context: "A newly assembled desktop completes POST. The bootable USB installer and internal drive are both detected.",
    prompt: "Which boot order prepares this computer to install an operating system from USB?",
    answer: "usb",
    options: [
      ["internal", "Internal drive → USB → network"],
      ["network", "Network → internal drive → USB"],
      ["usb", "USB → internal drive → network"],
      ["defaults", "Leave the current order unchanged"]
    ],
    why: "The USB installer must be checked first. After it is no longer needed, the internal drive returns to first place."
  },
  {
    context: "The operating system is installed and the computer works normally every morning.",
    prompt: "Which device should normally be first in the boot order for daily use?",
    answer: "internal",
    options: [["internal", "Internal storage drive"], ["usb", "Bootable USB drive"], ["optical", "Optical disc"], ["network", "Network device"]],
    why: "The internal storage drive contains the installed operating system used for daily startup."
  },
  {
    context: "The BIOS/UEFI detects the bootable USB installer, but the computer keeps loading the operating system from the internal drive.",
    prompt: "Which setting should the technician check first?",
    answer: "priority",
    options: [["priority", "Boot priority"], ["resolution", "Display resolution"], ["layout", "Keyboard layout"], ["volume", "Speaker volume"]],
    why: "A detected USB that is not used means the saved boot priority still places another device first."
  },
  {
    context: "The USB installer is detected and first in the boot order, but the computer still will not start from it.",
    prompt: "What should the technician check next?",
    answer: "media",
    options: [["media", "Whether the installer was prepared correctly as bootable media"], ["fan", "Whether the case fan is clean"], ["wallpaper", "Whether the desktop wallpaper is set"], ["mouse", "Whether the mouse pointer moves"]],
    why: "If the device is detected and prioritised, the bootable media itself is the next likely issue."
  }
];

export function bootOrderBuilderPage() {
  return choicePage("boot-order-builder", "Module 2 · Boot priority", "Choose the device priority and the next safe check for four real boot scenarios.");
}

export function mountBootOrderBuilder(root) {
  return mountChoiceGame(root, "boot-order-builder", BOOT_STEPS);
}

/* --------------------------------------------------------------------------
   3. Hardware or Setting?
   -------------------------------------------------------------------------- */
const DIAGNOSIS_STEPS = [
  { prompt: "The computer does not turn on. No lights appear and none of the fans spin.", answer: "h", why: "No lights or fan movement points to power, the PSU, or motherboard power connections." },
  { prompt: "The computer detects a bootable USB drive but continues to load the operating system from the internal drive.", answer: "c", why: "The USB is detected, so the clue is the saved boot priority." },
  { prompt: "The firmware shows less memory than the amount physically installed.", answer: "h", why: "A module may be improperly seated, incompatible, or defective." },
  { prompt: "The USB drive is listed in the boot options, but the internal drive is set as the first boot device.", answer: "c", why: "The boot order, not a missing part, explains the behaviour." },
  { prompt: "The computer turns on, but the processor cooling fan does not spin.", answer: "h", why: "A disconnected, blocked, or defective processor fan is a physical problem." },
  { prompt: "The date and time become wrong whenever the computer is disconnected from electrical power.", answer: "h", why: "A weak or depleted CMOS battery is the likely physical cause." },
  { prompt: "A storage drive does not appear in System Information after assembly.", answer: "h", why: "Check the drive's power and data cables or a disabled port before replacing it." },
  { prompt: "The technician changed the boot order, then chose Discard Changes and Exit.", answer: "c", why: "The configuration change was never saved." },
  { prompt: "A memory-related beep code appears even after the RAM module was removed and reinstalled.", answer: "h", why: "Repeated POST memory errors point to seating, compatibility, or a defective module." },
  { prompt: "The USB installer appears as both UEFI and legacy, and the technician selects the wrong mode.", answer: "c", why: "The firmware boot mode does not match the intended installation." }
];

export function configOrHardwarePage() {
  return choicePage("config-or-hardware", "Module 2 · Diagnose the clue", "Classify each startup symptom as a hardware/connection problem (H) or a configuration problem (C).");
}

export function mountConfigOrHardware(root) {
  const steps = DIAGNOSIS_STEPS.map((step) => ({
    ...step,
    options: [["h", "H · Hardware or physical connection"], ["c", "C · BIOS/UEFI configuration"]]
  }));
  return mountChoiceGame(root, "config-or-hardware", steps);
}

/* --------------------------------------------------------------------------
   4. Carlo's Boot Case
   -------------------------------------------------------------------------- */
const CASE_STEPS = [
  {
    context: "Carlo's computer completes POST. It detects the processor, 8 GB RAM, a 500 GB internal drive, keyboard, mouse, and a bootable USB installer. It shows “Operating System Not Found”.",
    prompt: "What prevents the computer from starting from the USB installer?",
    answer: "order",
    options: [["order", "The internal drive is checked before the USB drive"], ["ram", "The RAM is not detected"], ["usb", "The USB installer is not detected"], ["post", "POST did not run"]],
    why: "The USB is detected and POST succeeded. The reported boot order places the internal drive first."
  },
  {
    prompt: "Which observation shows that the problem is not an undetected USB drive?",
    answer: "detected",
    options: [["detected", "The bootable USB installer appears in the detected devices and boot options"], ["silent", "The computer makes no sound"], ["keyboard", "The keyboard works"], ["clock", "The date is correct"]],
    why: "A device listed in the firmware has been detected; the fault is in the chosen priority."
  },
  {
    prompt: "Which BIOS/UEFI setting must Carlo change?",
    answer: "priority",
    options: [["priority", "Boot order / boot priority"], ["voltage", "Processor voltage"], ["fan", "Fan speed"], ["password", "Firmware password"]],
    why: "Boot priority decides which detected device the firmware checks for startup files."
  },
  {
    prompt: "Which boot order should Carlo save for the installation?",
    answer: "usb-first",
    options: [["usb-first", "USB → internal drive → network device"], ["internal-first", "Internal drive → network device → USB"], ["network-first", "Network → USB → internal drive"], ["no-change", "Keep the current order"]],
    why: "The USB installer comes first; the internal drive and network device follow."
  },
  {
    prompt: "Which exit option applies the new configuration?",
    answer: "save",
    options: [["save", "Save Changes and Exit"], ["discard", "Discard Changes and Exit"], ["defaults", "Load Setup Defaults"], ["close", "Close the setup window"]],
    why: "Save Changes and Exit stores the new boot order before the computer restarts."
  },
  {
    prompt: "After the operating system is installed, what should Carlo restore?",
    answer: "restore",
    options: [["restore", "Put the internal storage drive first in the boot order"], ["usb", "Keep the USB drive first"], ["disable", "Disable the internal drive"], ["defaults-only", "Remove the USB drive from the list"]],
    why: "Daily startup should use the internal drive that now contains the installed operating system."
  }
];

export function biosCaseFilesPage() {
  return choicePage("bios-case-files", "Module 2 · Case study", "Work through Carlo's boot-order case using the module's own step-by-step answer.");
}

export function mountBiosCaseFiles(root) {
  return mountChoiceGame(root, "bios-case-files", CASE_STEPS);
}

/* --------------------------------------------------------------------------
   5. BIOS Setup Lab — a small, fully offline setup-utility simulation.
   -------------------------------------------------------------------------- */
const LAB_PHASES = ["Enter setup", "Verify hardware", "Date and time", "Boot order", "Exit option", "Restore"];

export function biosSetupLabPage() {
  return `${hero("bios-setup-lab", "Module 2 · Guided configuration", "Work through six setup tasks: enter the utility, verify detected hardware, set date and time, arrange the boot order, save, and restore normal startup.")}
  <section class="study-game engagement-game bios-lab" data-bios-game="bios-setup-lab">
    <div class="study-head">
      <span class="pill">Task <strong data-phase>1 / 6</strong></span>
      <span class="pill">Task name <strong data-phase-name>${esc(LAB_PHASES[0])}</strong></span>
      <span class="pill">Correct first try <strong data-phase-score>0 / 6</strong></span>
    </div>
    <div class="setup-screen" aria-hidden="true"><span>TECHPRO SETUP · BIOS/UEFI</span><span data-screen-state>STANDBY</span></div>
    <div data-stage></div>
    <div class="feedback" role="status" aria-live="polite"></div>
  </section>`;
}

export function mountBiosSetupLab(root) {
  const host = root.querySelector('[data-bios-game="bios-setup-lab"]');
  if (!host) return () => {};
  const stage = host.querySelector("[data-stage]");
  const activity = ACTIVITY_BY_ID["bios-setup-lab"];
  const found = new Set();
  const timers = [];
  let phase = 0;
  let phaseScore = 0;
  let phaseClean = true;
  let advancing = false;
  let order = ["Internal storage drive", "Network device", "Bootable USB drive"];

  function counters() {
    host.querySelector("[data-phase]").textContent = `${Math.min(phase + 1, 6)} / 6`;
    host.querySelector("[data-phase-name]").textContent = LAB_PHASES[Math.min(phase, 5)];
    host.querySelector("[data-phase-score]").textContent = `${phaseScore} / 6`;
    host.querySelector("[data-screen-state]").textContent = phase === 0 ? "STANDBY" : phase === 5 ? "RESTARTING" : "SETUP";
  }

  function nextPhase(correct) {
    if (advancing) return;
    advancing = true;
    if (correct && phaseClean) phaseScore += 1;
    // Let the feedback stay readable before the next setup screen appears.
    const timer = setTimeout(() => {
      if (!document.contains(host)) return;
      phase += 1;
      phaseClean = true;
      advancing = false;
      counters();
      if (phase >= LAB_PHASES.length) finish();
      else render();
    }, 420);
    timers.push(timer);
  }

  function miss(title, message) {
    phaseClean = false;
    sound.wrong();
    vibrate(20);
    setFeedback(host, "wrong", title, message);
  }

  function hit(title, message) {
    sound.correct();
    vibrate(12);
    setFeedback(host, "correct", title, message);
  }

  function render() {
    clearFeedback(host);
    counters();
    if (phase === 0) renderAccess();
    else if (phase === 1) renderHardware();
    else if (phase === 2) renderDateTime();
    else if (phase === 3) renderOrder();
    else if (phase === 4) renderExit();
    else renderRestore();
  }

  function renderAccess() {
    stage.innerHTML = `
      <p class="study-prompt">The startup screen flashes for a second. What should the technician do to enter setup?</p>
      <div class="study-grid">${choiceButtons([
        ["watch", "Watch for the setup-key prompt, then press the manufacturer's key (for example Delete)"],
        ["random", "Press every key until a menu appears"],
        ["wait", "Wait for the operating system, then open Settings"],
        ["unplug", "Unplug the keyboard and press the power button"]
      ])}</div>`;
    stage.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => {
      if (button.dataset.choice === "watch") {
        hit("Setup utility opened", "The setup key is shown briefly at startup. Check the manufacturer's guide because keys vary by model.");
        nextPhase(true);
      } else miss("Still at the startup screen", "Watch for the prompt and press the designated key early. Do not press random keys.");
    }));
  }

  function renderHardware() {
    const devices = [
      ["cpu", "Processor"], ["ram", "8 GB RAM"], ["drive", "500 GB internal drive"], ["usb", "Bootable USB installer"], ["input", "Keyboard and mouse"]
    ];
    stage.innerHTML = `
      <p class="study-prompt">System Information is open. Check every device that the case says was detected.</p>
      <div class="study-grid">
        ${devices.map(([id, label]) => `<button class="study-option${found.has(id) ? " is-selected" : ""}" type="button" data-device="${id}" aria-pressed="${found.has(id)}">${esc(label)}</button>`).join("")}
      </div>
      <div class="cluster mt-4"><button class="btn btn-primary" type="button" data-confirm-hardware>Confirm hardware check</button></div>`;
    stage.querySelectorAll("[data-device]").forEach((button) => button.addEventListener("click", () => {
      if (found.has(button.dataset.device)) found.delete(button.dataset.device);
      else found.add(button.dataset.device);
      button.classList.toggle("is-selected", found.has(button.dataset.device));
      button.setAttribute("aria-pressed", String(found.has(button.dataset.device)));
      sound.click();
    }));
    stage.querySelector("[data-confirm-hardware]").addEventListener("click", () => {
      if (found.size !== devices.length) {
        miss("Check every listed device", "The case states that all five devices were detected before Carlo changed the boot order.");
        return;
      }
      hit("Hardware verified", "All listed parts appear. An undetected part would need connection or compatibility checks first.");
      nextPhase(true);
    });
  }

  function renderDateTime() {
    const today = new Date().toISOString().slice(0, 10);
    const time = new Date().toTimeString().slice(0, 5);
    stage.innerHTML = `
      <p class="study-prompt">The system clock reads 2019-01-01, 00:00. Enter the correct date and time, then apply the change.</p>
      <div class="setup-form">
        <label>Date <input class="input" type="date" data-setup-date value="${today}"></label>
        <label>Time <input class="input" type="time" data-setup-time value="${time}"></label>
      </div>
      <div class="cluster mt-4">
        <button class="btn btn-ghost btn-sm" type="button" data-set-now>${icon("refresh", 16)} Use today's values</button>
        <button class="btn btn-primary" type="button" data-apply-date>Apply date and time</button>
      </div>`;
    stage.querySelector("[data-set-now]").addEventListener("click", () => {
      stage.querySelector("[data-setup-date]").value = today;
      stage.querySelector("[data-setup-time]").value = time;
      sound.click();
    });
    stage.querySelector("[data-apply-date]").addEventListener("click", () => {
      const date = stage.querySelector("[data-setup-date]").value;
      const clock = stage.querySelector("[data-setup-time]").value;
      if (date !== today || !clock) {
        miss("Wrong date or time", "Use today's date and a real time. Firmware date and time affect timestamps, certificates, tasks, and updates.");
        return;
      }
      hit("Date and time set", "The operating system will start with the correct values. Repeated loss after power off would point to the CMOS battery.");
      nextPhase(true);
    });
  }

  function renderOrder() {
    stage.innerHTML = `
      <p class="study-prompt">Arrange the boot order for USB installation: USB first, internal drive second, network device third.</p>
      <div class="boot-lanes" data-boot-lanes>
        ${order.map((device, index) => `<div class="boot-lane">
          <span class="boot-position">${index + 1}</span><strong>${esc(device)}</strong>
          <span class="cluster">
            <button class="icon-button" type="button" data-move="${index}" data-direction="-1" aria-label="Move ${esc(device)} up">↑</button>
            <button class="icon-button" type="button" data-move="${index}" data-direction="1" aria-label="Move ${esc(device)} down">↓</button>
          </span>
        </div>`).join("")}
      </div>
      <div class="cluster mt-4"><button class="btn btn-primary" type="button" data-confirm-order>Save this order in setup</button></div>`;
    stage.querySelectorAll("[data-move]").forEach((button) => button.addEventListener("click", () => {
      const index = Number(button.dataset.move);
      const target = index + Number(button.dataset.direction);
      if (target < 0 || target >= order.length) return;
      [order[index], order[target]] = [order[target], order[index]];
      sound.click();
      renderOrder();
    }));
    stage.querySelector("[data-confirm-order]").addEventListener("click", () => {
      const correct = order[0] === "Bootable USB drive" && order[1] === "Internal storage drive" && order[2] === "Network device";
      if (!correct) {
        miss("Order not ready", "The bootable USB installer must be first so the firmware finds the installation files before the internal drive's operating system.");
        return;
      }
      hit("Boot order arranged", "USB → internal → network is the installation order. Restore the internal drive to first place after the operating system is installed.");
      nextPhase(true);
    });
  }

  function renderExit() {
    stage.innerHTML = `
      <p class="study-prompt">The new settings are ready. Which exit option makes them take effect?</p>
      <div class="study-grid">${choiceButtons([
        ["save", "Save Changes and Exit"],
        ["discard", "Discard Changes and Exit"],
        ["defaults", "Load Setup Defaults"]
      ])}</div>`;
    stage.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => {
      if (button.dataset.choice === "save") {
        hit("Changes saved", "Save Changes and Exit stores the configuration before the computer restarts.");
        nextPhase(true);
      } else if (button.dataset.choice === "discard") {
        miss("Changes discarded", "Discard Changes and Exit leaves the old boot order in place. Use it only for unwanted edits.");
        nextPhase(false);
      } else {
        miss("Defaults are too broad", "Load Setup Defaults restores recommended values and may replace earlier settings. Review them before saving.");
        nextPhase(false);
      }
    }));
  }

  function renderRestore() {
    stage.innerHTML = `
      <p class="study-prompt">The operating system installed successfully. What should the final configuration be?</p>
      <div class="study-grid">${choiceButtons([
        ["internal", "Internal storage drive first; USB can stay available lower in the list"],
        ["usb", "Keep the USB installer first"],
        ["remove", "Remove the internal drive from the boot list"],
        ["skip", "Restart without changing anything"]
      ])}</div>`;
    stage.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => {
      if (button.dataset.choice === "internal") {
        hit("Normal startup restored", "The internal drive holds the operating system, so it returns to first place for daily use.");
        nextPhase(true);
      } else {
        miss("Daily startup would be wrong", "After installation, the internal storage drive should normally be first again.");
        nextPhase(false);
      }
    }));
  }

  function finish() {
    showResult(host, {
      activity,
      score: phaseScore,
      total: LAB_PHASES.length,
      heading: "Setup utility configuration complete",
      intro: "You entered setup, verified hardware, set the clock, arranged the boot order, saved, and restored daily startup.",
      detail: `<div class="learned-list"><p><strong>Technician habit</strong></p><p>Record the originals, verify detected hardware, change only the required setting, review, save, then observe the restart.</p></div>`
    });
  }

  render();
  return () => timers.forEach((timer) => clearTimeout(timer));
}

/* --------------------------------------------------------------------------
   6. BIOS Flashcards + recall check
   -------------------------------------------------------------------------- */
const CARD_IDS = ["bios", "uefi", "firmware", "post", "setup-utility", "system-information", "boot-device", "boot-order", "boot-menu", "cmos-battery", "save-changes", "discard-changes"];

const RECALL_STEPS = [
  { prompt: "POST is…", answer: "a", options: [["a", "A hardware check that runs during startup"], ["b", "An application that edits documents"], ["c", "A USB installer brand"]], why: define("post") },
  { prompt: "The setup utility is opened by…", answer: "b", options: [["b", "Pressing a manufacturer-designated key shortly after power on"], ["a", "Opening the web browser"], ["c", "Removing the CMOS battery"]], why: define("setup-utility") },
  { prompt: "System Information shows…", answer: "c", options: [["c", "Detected processor, memory, storage, firmware version, and clock"], ["a", "Only the desktop wallpaper"], ["b", "Only the keyboard layout"]], why: define("system-information") },
  { prompt: "For daily startup, first in the boot order is usually…", answer: "a", options: [["a", "The internal drive with the operating system"], ["b", "The optical drive"], ["c", "The network device"]], why: "The installed operating system lives on the internal drive." },
  { prompt: "To abandon an accidental unsaved edit…", answer: "b", options: [["b", "Choose Discard Changes and Exit"], ["a", "Choose Save Changes and Exit"], ["c", "Unplug the drive"]], why: define("discard-changes") }
];

export function biosFlashcardsPage() {
  return `${hero("bios-flashcards", "Module 2 · Recall", "Flip twelve BIOS/UEFI terms, then answer a five-item recall check. Every definition comes from the app's offline glossary.")}
  <section class="study-game engagement-game" data-bios-game="bios-flashcards">
    <div class="study-head">
      <span class="pill">Phase <strong data-phase>Cards</strong></span>
      <span class="pill">Flipped <strong data-flipped>0 / 12</strong></span>
      <span class="pill">Recall <strong data-score>0 / 5</strong></span>
    </div>
    <div data-stage></div>
    <div class="feedback" role="status" aria-live="polite"></div>
  </section>`;
}

export function mountBiosFlashcards(root) {
  const host = root.querySelector('[data-bios-game="bios-flashcards"]');
  if (!host) return () => {};
  const stage = host.querySelector("[data-stage]");
  const activity = ACTIVITY_BY_ID["bios-flashcards"];
  const flipped = new Set();
  let phase = "cards";
  let index = 0;
  let score = 0;
  let answered = false;

  function counters() {
    host.querySelector("[data-phase]").textContent = phase === "cards" ? "Cards" : "Recall";
    host.querySelector("[data-flipped]").textContent = `${flipped.size} / ${CARD_IDS.length}`;
    host.querySelector("[data-score]").textContent = `${score} / ${RECALL_STEPS.length}`;
  }

  function renderCards() {
    stage.innerHTML = `
      <p class="study-prompt">Tap a card to flip between the term and its module definition.</p>
      <div class="study-grid">
        ${CARD_IDS.map((id, i) => `<button class="flashcard${flipped.has(i) ? " is-selected" : ""}" type="button" data-card="${i}" aria-pressed="${flipped.has(i)}">
          <span class="flashcard-face">${esc(TERMS[id].term)}</span>
          <span class="flashcard-face">${esc(define(id))}</span>
        </button>`).join("")}
      </div>
      <div class="cluster mt-4"><button class="btn btn-primary" type="button" data-start-recall>${icon("brain", 17)} Start 5-item recall</button></div>`;
    stage.querySelectorAll("[data-card]").forEach((button) => button.addEventListener("click", () => {
      const i = Number(button.dataset.card);
      if (flipped.has(i)) flipped.delete(i);
      else {
        flipped.add(i);
        sound.click();
      }
      button.classList.toggle("is-selected", flipped.has(i));
      button.setAttribute("aria-pressed", String(flipped.has(i)));
      counters();
    }));
    stage.querySelector("[data-start-recall]").addEventListener("click", () => {
      phase = "recall";
      renderQuestion();
    });
    counters();
  }

  function renderQuestion() {
    const item = RECALL_STEPS[index];
    stage.innerHTML = `
      <div class="study-head"><span class="pill">Recall <strong>${index + 1} / ${RECALL_STEPS.length}</strong></span><span class="pill">Correct <strong>${score}</strong></span></div>
      <p class="study-prompt">${esc(item.prompt)}</p>
      <div class="study-grid">${choiceButtons(item.options)}</div>
      <div class="cluster mt-4" data-next-slot></div>`;
    counters();
    stage.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => answer(button, item)));
  }

  function answer(button, item) {
    if (answered) return;
    answered = true;
    const correct = button.dataset.choice === item.answer;
    if (correct) score += 1;
    sound[correct ? "correct" : "wrong"]();
    stage.querySelectorAll("[data-choice]").forEach((el) => {
      if (el.dataset.choice === item.answer) el.classList.add("is-correct");
      else if (el === button) el.classList.add("is-wrong");
      el.disabled = true;
    });
    setFeedback(host, correct ? "correct" : "wrong", correct ? "Good recall" : "Review this term", item.why);
    stage.querySelector("[data-next-slot]").innerHTML = `<button class="btn btn-primary" type="button" data-next>${index === RECALL_STEPS.length - 1 ? "See results" : "Next"} ${icon("arrowRight", 17)}</button>`;
    stage.querySelector("[data-next]").addEventListener("click", () => {
      answered = false;
      clearFeedback(host);
      index += 1;
      if (index >= RECALL_STEPS.length) finish();
      else renderQuestion();
    });
    counters();
  }

  function finish() {
    showResult(host, {
      activity,
      score,
      total: RECALL_STEPS.length,
      heading: "Flashcard recall complete",
      intro: "Review the definitions you missed, then retry the deck before the post-test.",
      detail: `<div class="learned-list"><p><strong>Remember</strong></p><p>Firmware starts the computer, POST checks hardware, boot order chooses the startup device, and the exit option decides whether changes apply.</p></div>`
    });
  }

  renderCards();
  return () => {};
}
