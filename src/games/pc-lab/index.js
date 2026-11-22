/* ==========================================================================
   PC Lab — a physical, fail-forward build game.
   The 3D scene owns the bench; this controller owns the lesson order, score,
   strikes, hints, companion, level tabs and campaign results.
   ========================================================================== */

import { readTheme, observeTheme, applyCssThemeVars, THEME_IDS } from "../engine/theme.js";
import { GameAudio, vibrate } from "../engine/audio.js";
import { Bench2D } from "./fallback2d.js";
import { PART_BY_ID } from "../../data/parts.js";

const MAX_MISTAKES = 30;

const GUIDE_STEP_PART = {
  "clean-bench": "cleaning-cloth",
  "arrange-bench": "tools",
  "power-down": "computer",
  unplug: "power-cable",
  peripherals: "peripheral",
  jewelry: "jewelry",
  tools: "tools",
  bins: "screws",
  "remove-screws": "case-screws",
  strap: "strap",
  document: "labels",
  "lever-open": "cpu",
  align: "cpu",
  seat: "cpu",
  "lever-close": "cpu",
  paste: "thermal",
  cooler: "cooler",
  "clips-open": "ram",
  place: "ram",
  press: "ram",
  "clips-close": "ram",
  "power-on": "computer",
  fan: "cooler",
  psu: "psu",
  display: "display-cable",
  ram: "ram",
  fix: "cooler",
  boot: "computer"
};

const GUIDE_DETAILS = {
  "cleaning-cloth": {
    title: "Cleaning cloth",
    meaning: "A clean work surface keeps dust and loose items away from computer parts.",
    use: "Wipe the bench before placing tools or components on it."
  },
  computer: {
    title: "Computer system",
    meaning: "A computer system uses hardware and software to process information.",
    use: "Shut the system down properly before disconnecting power or opening the case."
  },
  "power-cable": {
    title: "Power cable",
    meaning: "The power cable connects the computer to an electrical outlet.",
    use: "Disconnect it from the power source before working inside the case."
  },
  peripheral: {
    title: "Peripheral devices",
    meaning: "Peripherals are devices connected to the computer, such as a monitor, keyboard, and mouse.",
    use: "Disconnect them before moving or servicing the computer."
  },
  jewelry: {
    title: "Metal jewelry",
    meaning: "Metal jewelry is a conductive accessory that can create a safety hazard.",
    use: "Remove bracelets and other conductive accessories before disassembly."
  },
  tools: {
    title: "Technician tools",
    meaning: "Tools help a technician handle and secure computer parts safely.",
    use: "Prepare the right tools before assembly or disassembly."
  },
  display: {
    title: "Monitor cable",
    meaning: "The monitor cable carries the display signal from the computer to the monitor.",
    use: "Check that it is securely connected when the monitor shows no image."
  },
  "case-screws": {
    title: "Case-panel screws",
    meaning: "Case-panel screws hold the computer's side cover in place.",
    use: "Remove them carefully and place them in a parts tray so they are not lost."
  }
};

function componentGuide(step, levelId) {
  const id = levelId === "ram" && step?.id === "align" ? "ram" : GUIDE_STEP_PART[step?.id];
  if (!id) return null;
  const part = PART_BY_ID[id];
  if (!part) return GUIDE_DETAILS[id] || null;
  return {
    title: part.name,
    meaning: `The ${part.name.toLowerCase()} is a computer hardware component in the ${part.category.toLowerCase()} category.`,
    use: part.blurb
  };
}

const LEVELS = [
  {
    id: "safety",
    tab: "L0 · Safety",
    short: "Safety",
    title: "Prepare the bench",
    subtitle: "DepEd safety preparation order",
    camera: "safety",
    par: 95,
    intro: "Start by preparing a clean, organized, safe workbench. Chip will guide one clear action at a time.",
    steps: [
      {
        id: "clean-bench",
        title: "Clean the workbench",
        action: "clean-bench",
        target: "clean-cloth",
        hint: "Click the blue cleaning cloth on the bench. Chip will wipe the work surface clean.",
        why: "A clean, clear surface helps prevent dust and loose items from damaging or hiding small components."
      },
      {
        id: "arrange-bench",
        title: "Set out tools and parts",
        action: "arrange-bench",
        target: "tools",
        hint: "Click the toolbox. Chip will set out the tools, parts tray, and bins so each item has a clear place.",
        why: "Keeping tools and parts in assigned areas makes each item easy to find and prevents screws from getting lost."
      },
      {
        id: "power-down",
        title: "Power the system down",
        action: "power",
        target: "power",
        hint: "Click the round power button on the front of the computer case.",
        why: "Shut the operating system down first. Yanking power while the drive is writing can corrupt files."
      },
      {
        id: "document",
        title: "Record the cable connections",
        action: "camera",
        target: "camera",
        hint: "Click the camera on the bench to record the cable connections before unplugging them.",
        why: "A photo of the cable routing makes reassembly reliable and faster."
      },
      {
        id: "unplug",
        title: "Disconnect the power cable",
        action: "plug",
        target: "plug",
        hint: "Click the power plug beside the strip to disconnect it.",
        why: "Removing the mains plug is the only reliable way to make the case electrically dead."
      },
      {
        id: "peripherals",
        title: "Disconnect the peripherals",
        action: "peripheral",
        target: "peripheral",
        hint: "Click the cable connecting the monitor to the computer.",
        why: "Peripheral cables can snag, pull a port loose, or carry a charge while you move the case."
      },
      {
        id: "jewelry",
        title: "Remove metal jewelry",
        action: "bracelet",
        target: "bracelet",
        hint: "Click the metal bracelet on the technician's wrist to remove it.",
        why: "A ring or bracelet can bridge a live circuit, short the board, and burn the technician."
      },
      {
        id: "strap",
        title: "Put on the antistatic wrist strap",
        action: "strap",
        target: "strap",
        hint: "Drag the blue wrist strap from the bench onto the technician's wrist.",
        why: "The strap drains static electricity from your body before it can damage the board."
      }
    ]
  },
  {
    id: "cpu",
    tab: "L2 · CPU",
    short: "CPU",
    title: "Seat the processor",
    subtitle: "Socket, alignment, paste, cooler",
    camera: "case",
    par: 110,
    intro: "Open the case carefully, keep its screws together, then prepare the processor socket.",
    steps: [
      {
        id: "remove-screws",
        title: "Remove the case-panel screws",
        action: "remove-screws",
        target: "case-screw",
        hint: "Drag each of the 4 case screws into the parts tray beside the motherboard. Place them anywhere inside the tray.",
        why: "Keep the small screws together in the parts tray. This prevents loss and makes reassembly easier."
      },
      {
        id: "lever-open",
        title: "Open the socket lever",
        action: "lever-open",
        target: "lever",
        hint: "Drag the free end of the metal socket lever upward until it stays raised.",
        why: "The lever lifts the retention plate so the processor can drop in without bending pins."
      },
      {
        id: "align",
        title: "Align the CPU triangle",
        action: "rotate",
        target: "cpu",
        control: "rotate",
        hint: "Click Rotate until the CPU's gold triangle points toward the socket's matching corner.",
        why: "The triangle and the notch are keyed. Forcing the CPU the wrong way bends pins."
      },
      {
        id: "seat",
        title: "Seat the CPU gently",
        action: "drop",
        target: "cpu",
        hint: "Drag the CPU over the open socket and release it gently.",
        why: "A processor should drop into a correctly opened socket with almost no pressure."
      },
      {
        id: "lever-close",
        title: "Lock the socket lever",
        action: "lever-close",
        target: "lever",
        hint: "Drag the raised socket lever downward until it sits flat.",
        why: "The locked lever holds the CPU flat so the cooler can make even contact."
      },
      {
        id: "paste",
        title: "Apply thermal paste",
        action: "paste",
        target: "cpu",
        hint: "Click the seated CPU once to apply one small dot of thermal paste.",
        why: "Thermal paste fills microscopic gaps between the CPU and cooler. Too much is as bad as too little."
      },
      {
        id: "cooler",
        title: "Mount the CPU cooler",
        action: "cooler",
        target: "cooler",
        hint: "Click the cooler above the CPU to place it.",
        why: "The cooler must sit flat and secure. A loose cooler lets the processor overheat and shut down."
      }
    ]
  },
  {
    id: "ram",
    tab: "L4 · RAM",
    short: "RAM",
    title: "Install the memory",
    subtitle: "Notch, clips, even pressure",
    camera: "ram",
    par: 100,
    intro: "Memory is keyed and stiff. Line up the notch, then press evenly until both clips click.",
    steps: [
      {
        id: "clips-open",
        title: "Open the DIMM clips",
        action: "clips-open",
        target: "clips",
        hint: "Click the RAM slot clips to open them.",
        why: "The clips must be open before the module can travel down into the slot."
      },
      {
        id: "align",
        title: "Match the RAM notch",
        action: "rotate",
        target: "ram",
        control: "rotate",
        hint: "Click Rotate until the notch in the RAM matches the key in the slot.",
        why: "The off-centre notch stops the module going in backwards. Never force it."
      },
      {
        id: "place",
        title: "Lower the RAM into the slot",
        action: "drop",
        target: "ram",
        hint: "Drag the RAM straight over the open slot and release it.",
        why: "Set the module straight down. Tilting it can crack the slot or the edge connector."
      },
      {
        id: "press",
        title: "Press evenly until both clips click",
        action: "seat",
        target: "ram",
        control: "hold",
        hint: "Press and hold the RAM, steady its wobble with small left/right movements, then release when the meter is green.",
        why: "Even pressure seats the contacts. Too little leaves the module loose; too much can flex the board."
      },
      {
        id: "clips-close",
        title: "Lock the DIMM clips",
        action: "clips-close",
        target: "clips",
        hint: "Click the RAM slot clips to lock the module in place.",
        why: "The clips lock the module in place and stop it creeping out under vibration."
      }
    ]
  },
  {
    id: "power",
    tab: "Fault · No POST",
    short: "Fault",
    title: "Carlo's no-display build",
    subtitle: "Fan still, screen dark",
    camera: "power",
    par: 120,
    intro: "The build powers up but the fan never spins and the monitor stays dark. Work the module fault order.",
    steps: [
      {
        id: "power-on",
        title: "Power on the system",
        action: "power",
        target: "power",
        hint: "Click the case power button once, then watch the fan.",
        why: "Record the symptom first: the system powers on, but there is no display and no fan movement."
      },
      {
        id: "fan",
        title: "Check the CPU fan connection",
        action: "fan-cable",
        target: "fan-cable",
        hint: "Click the fan connector behind the CPU cooler.",
        why: "The module starts with the cooling fan connection. A loose CPU fan header stops the fan and can trigger a no-POST protection state."
      },
      {
        id: "psu",
        title: "Check the PSU connections",
        action: "psu",
        target: "psu",
        hint: "Click the power supply to inspect its cable connections.",
        why: "Check the 24-pin and CPU power connectors. A partly seated PSU cable gives the same dead-screen symptom."
      },
      {
        id: "display",
        title: "Check the display cable",
        action: "peripheral",
        target: "monitor-cable",
        hint: "Click the cable connecting the monitor to the computer.",
        why: "A monitor cable that is loose or in the wrong port looks exactly like a failed build."
      },
      {
        id: "ram",
        title: "Reseat the RAM",
        action: "ram",
        target: "ram",
        hint: "Click the RAM stick to check that it is seated.",
        why: "A memory module that is not fully clicked home stops POST. Reseat it before replacing parts."
      },
      {
        id: "fix",
        title: "Reconnect the fan cable",
        action: "fan-cable",
        target: "fan-cable",
        hint: "Click the loose fan connector to reconnect it.",
        why: "The fault was the loose CPU fan connector. Reconnect it fully, then retest the system."
      },
      {
        id: "boot",
        title: "Power on and confirm POST",
        action: "power",
        target: "power",
        hint: "Click the power button again. Check that the fan spins and the display turns on.",
        why: "Always retest after a repair. A spinning fan and a POST screen confirm the fix."
      }
    ]
  }
];

const THEME_ORDER = THEME_IDS;

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function starsMarkup(count) {
  return `<span class="pclab-stars" aria-label="${count} of 3 stars">${[0, 1, 2]
    .map((index) => `<span class="${index < count ? "is-on" : ""}" aria-hidden="true">★</span>`)
    .join("")}</span>`;
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.round(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export class PcLabGame {
  constructor(options) {
    this.options = options || {};
    this.mount = this.options.mount;
    if (!this.mount) throw new Error("PC Lab needs a mount element.");
    this.settings = { quality: "auto", sound: true, haptics: true, motion: "full", ...(this.options.settings || {}) };
    this.voiceEnabled = this.settings.voiceGuidance !== false;
    this.voicePreference = this.voiceEnabled;
    this.voiceGender = this.settings.voiceGender === "boy" ? "boy" : "girl";
    this.voiceName = this.settings.voiceName || "";
    this.speechVoices = [];
    this.voiceAvailable = false;
    this.theme = readTheme();
    this.audio = new GameAudio({ theme: this.theme.id, enabled: this.settings.sound !== false });
    this.companion = this.options.companion || {};
    this.mode = this.options.mode || "build";
    this.levelIndex = 0;
    this.stepIndex = 0;
    this.strikes = 0;
    this.hintsUsed = 0;
    this.score = 1000;
    this.completed = { ...(this.options.completed || {}) };
    this.levelStartedAt = performance.now();
    this.gameStartedAt = performance.now();
    this.waitingForBoot = false;
    this.failed = false;
    this.overlayOpen = false;
    this.paused = false;
    this.destroyed = false;
    this.timers = new Set();
    this.hold = null;
    this.qualityInfo = null;

    this.renderShell();
    this.bindDom();
    this.createView();
    this.startLevel(this.firstPlayableIndex(), { instant: true, silent: true });
    this.observeTheme();
    this.startClock();
  }

  /* ------------------------------------------------------------------ shell */

  renderShell() {
    const saved = this.completed;
    const tabs = LEVELS.map((level, index) => {
      const done = saved[level.id];
      return `<button class="pclab-tab ${done ? "is-done" : ""}" type="button" data-level="${index}">
        <span>${esc(level.tab)}</span>
        ${done ? `<span class="pclab-tab-star" aria-label="completed">★</span>` : ""}
      </button>`;
    }).join("");

    this.mount.innerHTML = `
      <div class="pclab-game" data-pclab>
        <div class="pclab-stage">
          <div class="pclab-canvas" data-canvas aria-label="3D PC Lab workbench"></div>
          <div class="pclab-topbar">
            <div class="pclab-tabs" role="tablist" aria-label="PC Lab levels">${tabs}</div>
            <div class="pclab-top-actions">
              <button class="pclab-icon-btn" type="button" data-camera title="Camera presets" aria-label="Camera presets">⌖</button>
              <button class="pclab-icon-btn" type="button" data-game-fullscreen aria-pressed="false" title="Enter fullscreen" aria-label="Enter fullscreen">⛶</button>
              <button class="pclab-icon-btn" type="button" data-settings-open title="Game settings" aria-label="Game settings">⚙</button>
              <a class="pclab-icon-btn" href="/play" data-exit title="Leave the bench" aria-label="Leave the bench">✕</a>
            </div>
          </div>

          <div class="pclab-hud">
            <div class="pclab-hud-item">
              <span class="pclab-label">Level</span>
              <strong data-hud-level>${esc(LEVELS[0].tab)}</strong>
            </div>
            <div class="pclab-hud-item">
              <span class="pclab-label">Step</span>
              <strong data-hud-step>1 / ${LEVELS[0].steps.length}</strong>
            </div>
            <div class="pclab-hud-item">
              <span class="pclab-label">Time</span>
              <strong data-hud-time>00:00</strong>
            </div>
            <div class="pclab-hud-item">
              <span class="pclab-label">Score</span>
              <strong data-hud-score>1000</strong>
            </div>
            <div class="pclab-hud-item pclab-hud-strikes">
              <span class="pclab-label">Mistakes</span>
              <strong data-hud-strikes aria-label="0 of 30 mistakes">0 / 30</strong>
            </div>
          </div>

          <div class="pclab-toast" data-toast role="status" aria-live="polite" hidden></div>
          <div class="pclab-quality" data-quality hidden></div>
        </div>

        <div class="pclab-objective" data-objective>
          <p class="pclab-eyebrow" data-objective-eyebrow>Step 1</p>
          <h2 data-objective-title>Clean the workbench</h2>
          <p class="pclab-eyebrow">Your action</p>
          <p data-objective-hint>Click the blue cleaning cloth on the bench.</p>
          <div class="pclab-motion-guide" data-motion-guide hidden aria-hidden="true">
            <span class="pclab-motion-arrow">↑</span>
            <span data-motion-label>Drag the lever up</span>
          </div>
          <div class="pclab-meter" data-meter hidden>
            <div class="pclab-meter-track">
              <span class="pclab-meter-zone"></span>
              <span class="pclab-meter-fill" data-meter-fill></span>
            </div>
            <div class="pclab-meter-labels"><span>Too light</span><span>Click</span><span>Too hard</span></div>
          </div>
          <div class="pclab-controls">
            <button class="btn btn-ghost btn-sm" type="button" data-hint>Hint</button>
            <button class="btn btn-ghost btn-sm" type="button" data-why>Why?</button>
            <button class="btn btn-ghost btn-sm" type="button" data-voice-toggle aria-pressed="true">Voice guidance on</button>
            <button class="btn btn-ghost btn-sm" type="button" data-voice-test>Test voice</button>
            <button class="btn btn-accent btn-sm" type="button" data-rotate hidden>Rotate</button>
            <button class="btn btn-accent btn-sm" type="button" data-hold hidden>Press &amp; hold</button>
          </div>
          <p class="pclab-why" data-why-copy hidden></p>
        </div>

        <aside class="pclab-side">
          <div class="pclab-companion">
            <div class="pclab-companion-art" data-companion-art></div>
            <div>
              <p class="pclab-eyebrow" data-companion-name>Chip</p>
              <p class="pclab-companion-line" data-companion-line>Let's make the bench safe first.</p>
            </div>
          </div>
          <section class="pclab-guide" aria-labelledby="pclabGuideTitle">
            <div class="pclab-guide-head">
              <div>
                <p class="pclab-eyebrow">Part guide</p>
                <h2 id="pclabGuideTitle" data-guide-title>Computer system</h2>
              </div>
              <button class="btn btn-ghost btn-sm" type="button" data-guide-speak>Read answer</button>
            </div>
            <div class="pclab-guide-questions" role="group" aria-label="Component questions">
              <button class="chip is-active" type="button" data-guide-choice="meaning" aria-pressed="true">What is it?</button>
              <button class="chip" type="button" data-guide-choice="use" aria-pressed="false">What is it used for?</button>
            </div>
            <p class="pclab-guide-prompt" data-guide-prompt>What is it?</p>
            <p class="pclab-guide-answer" data-guide-answer>A computer system uses hardware and software to process information.</p>
          </section>
          <ol class="pclab-steps" data-steps></ol>
          <div class="pclab-side-actions">
            <button class="btn btn-ghost btn-sm" type="button" data-restart>Restart level</button>
            <button class="btn btn-ghost btn-sm" type="button" data-skip>Level select</button>
          </div>
        </aside>

        <div class="pclab-overlay" data-overlay hidden></div>

        <div class="pclab-popover" data-settings hidden>
          <div class="pclab-popover-head">
            <h2>Bench settings</h2>
            <button class="pclab-icon-btn" type="button" data-settings-close aria-label="Close settings">✕</button>
          </div>
          <label class="pclab-toggle"><span>Sound</span><input type="checkbox" data-setting="sound"></label>
          <label class="pclab-toggle"><span>Haptics</span><input type="checkbox" data-setting="haptics"></label>
          <label class="pclab-toggle"><span>Reduced motion</span><input type="checkbox" data-setting="motion"></label>
          <label class="pclab-toggle"><span>Voice guidance</span><input type="checkbox" data-setting="voice"></label>
          <label class="pclab-field"><span>Voice style</span>
            <select data-setting="voiceGender">
              <option value="girl">Girl · cute and gentle</option>
              <option value="boy">Boy · cute and gentle</option>
            </select>
          </label>
          <p class="pclab-voice-note">Voice style uses your browser's installed speech voices. Tap Test voice once to activate narration.</p>
          <p class="pclab-voice-status" data-voice-status role="status" aria-live="polite"></p>
          <label class="pclab-field"><span>Quality</span>
            <select data-setting="quality">
              <option value="auto">Auto</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </label>
          <button class="btn btn-soft btn-sm" type="button" data-theme-next>Next theme</button>
          <div class="pclab-presets">
            <span class="pclab-label">Camera</span>
            <div class="pclab-preset-row">
              <button class="chip" type="button" data-preset="overview">Overview</button>
              <button class="chip" type="button" data-preset="top">Top</button>
              <button class="chip" type="button" data-preset="side">Side</button>
              <button class="chip" type="button" data-preset="back">Back</button>
            </div>
          </div>
          <p class="tiny faint" data-quality-label></p>
        </div>
      </div>
    `;

    this.root = this.mount.querySelector("[data-pclab]");
    this.canvasHost = this.root.querySelector("[data-canvas]");
    this.objective = this.root.querySelector("[data-objective]");
    this.stepsEl = this.root.querySelector("[data-steps]");
    this.toastEl = this.root.querySelector("[data-toast]");
    this.overlay = this.root.querySelector("[data-overlay]");
    this.settingsPanel = this.root.querySelector("[data-settings]");
    this.meter = this.root.querySelector("[data-meter]");
    this.meterFill = this.root.querySelector("[data-meter-fill]");
    this.rotateButton = this.root.querySelector("[data-rotate]");
    this.holdButton = this.root.querySelector("[data-hold]");
    this.whyCopy = this.root.querySelector("[data-why-copy]");
    this.voiceButton = this.root.querySelector("[data-voice-toggle]");
    this.voiceStatus = this.root.querySelector("[data-voice-status]");
    this.guideTitle = this.root.querySelector("[data-guide-title]");
    this.guidePrompt = this.root.querySelector("[data-guide-prompt]");
    this.guideAnswer = this.root.querySelector("[data-guide-answer]");
    this.objectiveHint = this.root.querySelector("[data-objective-hint]");
    this.qualityEl = this.root.querySelector("[data-quality]");
    this.renderCompanion("happy", "Safety first. Then we build.");
  }

  bindDom() {
    this.onClick = (event) => {
      const levelButton = event.target.closest("[data-level]");
      if (levelButton) {
        this.startLevel(Number(levelButton.dataset.level));
        return;
      }
      if (event.target.closest("[data-hint]")) { this.showHint(); return; }
      if (event.target.closest("[data-why]")) { this.toggleWhy(); return; }
      if (event.target.closest("[data-rotate]")) { this.view?.rotateSelected?.(); return; }
      if (event.target.closest("[data-voice-toggle]")) { this.setVoiceEnabled(!this.voiceEnabled); return; }
      if (event.target.closest("[data-voice-test]")) {
        this.setVoiceEnabled(true, { announce: false });
        this.speak(`Hi there! I'm your ${this.voiceGender === "girl" ? "girl" : "boy"} voice guide. Let's build together!`, { test: true });
        return;
      }
      if (event.target.closest("[data-guide-speak]")) {
        this.speak(this.guideAnswer?.textContent || "");
        return;
      }
      const guideChoice = event.target.closest("[data-guide-choice]");
      if (guideChoice) { this.selectGuideQuestion(guideChoice.dataset.guideChoice); return; }
      if (event.target.closest("[data-game-fullscreen]")) {
        this.options.onToggleFullscreen?.();
        return;
      }
      if (event.target.closest("[data-restart]")) { this.restartLevel(); return; }
      if (event.target.closest("[data-skip]")) { this.showLevelSelect(); return; }
      if (event.target.closest("[data-settings-open]")) { this.toggleSettings(true); return; }
      if (event.target.closest("[data-settings-close]")) { this.toggleSettings(false); return; }
      if (event.target.closest("[data-camera]")) { this.toggleSettings(true); return; }
      if (event.target.closest("[data-theme-next]")) { this.nextTheme(); return; }
      const preset = event.target.closest("[data-preset]");
      if (preset) { this.view?.focus?.(preset.dataset.preset); return; }
      const overlayButton = event.target.closest("[data-overlay-action]");
      if (overlayButton && performance.now() - (this.overlayShownAt || 0) < 350) return;
      if (overlayButton) { this.onOverlayAction(overlayButton.dataset.overlayAction); return; }
    };
    this.root.addEventListener("click", this.onClick);

    this.onChange = (event) => {
      const key = event.target.dataset.setting;
      if (!key) return;
      if (key === "motion") {
        this.updateSettings({ motion: event.target.checked ? "reduced" : "full" });
      } else if (key === "sound" || key === "haptics") {
        this.updateSettings({ [key]: event.target.checked });
      } else if (key === "voice") {
        this.setVoiceEnabled(event.target.checked);
      } else if (key === "voiceGender") {
        this.setVoiceGender(event.target.value);
      } else if (key === "quality") {
        this.updateSettings({ quality: event.target.value });
      }
    };
    this.root.addEventListener("change", this.onChange);
    this.setupSpeech();

    this.onHoldDown = (event) => {
      if (this.currentStep()?.control !== "hold" || this.hold) return;
      event.preventDefault();
      this.hold = { x: event.clientX, pointerId: event.pointerId };
      this.holdButton.setPointerCapture?.(event.pointerId);
      this.view?.startSeat?.();
    };
    this.onHoldMove = (event) => {
      if (!this.hold || event.pointerId !== this.hold.pointerId) return;
      const dx = event.clientX - this.hold.x;
      this.hold.x = event.clientX;
      this.view?.nudgeSeat?.(dx);
    };
    this.onHoldUp = (event) => {
      if (!this.hold || event.pointerId !== this.hold.pointerId) return;
      this.hold = null;
      this.view?.finishSeat?.();
    };
    this.holdButton.addEventListener("pointerdown", this.onHoldDown);
    this.holdButton.addEventListener("pointermove", this.onHoldMove);
    this.holdButton.addEventListener("pointerup", this.onHoldUp);
    this.holdButton.addEventListener("pointercancel", this.onHoldUp);

    this.onKey = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const tag = event.target?.tagName?.toLowerCase();
      if (["input", "select", "textarea"].includes(tag)) return;
      if (event.key === "h" || event.key === "H") this.showHint();
      if (event.key === "w" || event.key === "W") this.toggleWhy();
      if (event.key === "Escape") {
        if (!this.settingsPanel.hidden) this.toggleSettings(false);
        else if (this.overlayOpen) this.closeOverlay();
      }
    };
    document.addEventListener("keydown", this.onKey);
  }

  /* ------------------------------------------------------------------- view */

  createView() {
    const callbacks = {
      onClick: (action) => this.onSceneClick(action),
      onPartDrop: (result) => this.onPartDrop(result),
      onSafetyDrop: (result) => this.onSafetyDrop(result),
      onRotate: (result) => this.onRotate(result),
      onSeatStart: () => this.onSeatStart(),
      onSeatProgress: (progress) => this.onSeatProgress(progress),
      onSeatResult: (result) => this.onSeatResult(result),
      onSeatCancel: () => {
        this.meter.classList.remove("is-live");
        this.resetMeter();
      },
      onReject: (reason) => this.onReject(reason),
      onBooted: () => this.onBooted(),
      onPowerFault: () => this.onPowerFault(),
      onBoardMounted: () => this.onBoardMounted(),
      onEscape: () => this.onEscape(),
      canDrag: (part) => this.canDrag(part),
      onBlocked: (part) => this.onBlocked(part),
      onLeverDragIncomplete: () => this.toast("Keep dragging the lever until it reaches its raised or locked position.", "info", 2400)
    };

    this.view = new Bench2D({
      container: this.canvasHost,
      theme: this.theme,
      settings: this.settings,
      audio: this.audio,
      callbacks: {
        ...callbacks,
        debugStep: () => this.currentStep()?.id || null,
        currentStep: () => this.currentStep()
      }
    });
    this.qualityEl.hidden = false;
    this.qualityEl.textContent = "2D flat-lay bench";
  }

  observeTheme() {
    this.stopTheme = observeTheme((theme) => {
      this.theme = theme;
      this.audio.setTheme(theme.id);
      this.view?.setTheme?.(theme);
      applyCssThemeVars(this.root);
    });
    applyCssThemeVars(this.root);
  }

  startClock() {
    this.clockTimer = window.setInterval(() => {
      if (this.destroyed) return;
      this.updateClock();
    }, 500);
  }

  updateClock() {
    const elapsed = (performance.now() - this.levelStartedAt) / 1000;
    const el = this.root.querySelector("[data-hud-time]");
    if (el) el.textContent = formatTime(elapsed);
  }

  /* ------------------------------------------------------------------ levels */

  firstPlayableIndex() {
    const index = LEVELS.findIndex((level) => !this.completed[level.id]);
    return index < 0 ? 0 : index;
  }

  currentLevel() {
    return LEVELS[this.levelIndex];
  }

  currentStep() {
    return this.currentLevel()?.steps[this.stepIndex] || null;
  }

  startLevel(index, { instant = false, silent = false } = {}) {
    if (this.destroyed) return;
    if (!silent && this.overlayOpen) this.closeOverlay();
    this.levelIndex = clamp(Number(index) || 0, 0, LEVELS.length - 1);
    this.stepIndex = 0;
    this.strikes = 0;
    this.hintsUsed = 0;
    this.score = 1000;
    this.failed = false;
    this.waitingForBoot = false;
    this.levelStartedAt = performance.now();
    this.hold = null;
    this.removedCaseScrews = 0;
    this.clearTimers();

    const level = this.currentLevel();
    this.view?.setLevel?.(level.id, { instant: true });
    this.view?.focus?.(level.camera, instant);
    this.root.querySelectorAll("[data-level]").forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === this.levelIndex);
      button.setAttribute("aria-selected", String(buttonIndex === this.levelIndex));
    });
    this.hudLevel().textContent = level.tab;
    this.renderSteps();
    this.renderStep({ animate: !instant, announce: false });
    this.updateHud();
    this.updateClock();
    this.toggleSettings(false);
    this.renderCompanion("happy", level.intro);
    this.toast(level.intro, "info", 4200);
    const firstStep = this.currentStep();
    if (firstStep) this.speak(`${level.intro} ${firstStep.title}. ${firstStep.hint}`);
    this.audio.whoosh();
    this.track("level-start", { level: level.id });
  }

  restartLevel() {
    this.startLevel(this.levelIndex);
  }

  renderStep({ animate = true, announce = true } = {}) {
    const step = this.currentStep();
    const level = this.currentLevel();
    if (!step) return;
    const eyebrow = this.root.querySelector("[data-objective-eyebrow]");
    const title = this.root.querySelector("[data-objective-title]");
    const hint = this.root.querySelector("[data-objective-hint]");
    if (eyebrow) eyebrow.textContent = `${level.short} · Step ${this.stepIndex + 1} of ${level.steps.length}`;
    if (title) title.textContent = step.title;
    if (hint) hint.textContent = step.hint;
    const motionGuide = this.root.querySelector("[data-motion-guide]");
    if (motionGuide) {
      const direction = step.action === "lever-close" ? "down" : "up";
      motionGuide.hidden = !step.action.startsWith("lever");
      motionGuide.classList.toggle("is-down", direction === "down");
      motionGuide.querySelector(".pclab-motion-arrow").textContent = direction === "down" ? "↓" : "↑";
      motionGuide.querySelector("[data-motion-label]").textContent = `Drag the lever ${direction}`;
    }
    this.whyCopy.hidden = true;
    this.whyCopy.textContent = step.why;
    this.renderComponentGuide(step);
    this.rotateButton.hidden = step.control !== "rotate";
    this.holdButton.hidden = step.control !== "hold";
    this.meter.hidden = step.control !== "hold";
    if (step.control !== "hold") this.resetMeter();
    this.objective.classList.toggle("is-pulsing", animate && this.settings.motion !== "reduced");
    if (animate) {
      window.setTimeout(() => this.objective.classList.remove("is-pulsing"), 500);
    }
    this.view?.highlight?.(step.target || null);
    if (announce) this.speak(`${step.title}. ${step.hint}`);
    this.updateHud();
    this.renderSteps();
  }

  renderSteps() {
    const level = this.currentLevel();
    if (!level) return;
    this.stepsEl.innerHTML = level.steps.map((step, index) => {
      const done = index < this.stepIndex;
      const current = index === this.stepIndex;
      return `<li class="${done ? "is-done" : ""} ${current ? "is-current" : ""}">
        <span class="pclab-step-dot" aria-hidden="true">${done ? "✓" : index + 1}</span>
        <span>${esc(step.title)}</span>
      </li>`;
    }).join("");
  }

  renderComponentGuide(step) {
    const guide = componentGuide(step, this.currentLevel()?.id);
    if (!guide) return;
    this.guideTitle.textContent = guide.title;
    this.guideQuestion = "meaning";
    this.guideContent = guide;
    this.selectGuideQuestion("meaning", { announce: false });
  }

  selectGuideQuestion(question, { announce = false } = {}) {
    if (!this.guideContent || !["meaning", "use"].includes(question)) return;
    this.guideQuestion = question;
    const prompt = question === "meaning"
      ? `What is ${this.guideContent.title}?`
      : `What is ${this.guideContent.title} used for?`;
    this.guidePrompt.textContent = prompt;
    this.guideAnswer.textContent = this.guideContent[question];
    this.root.querySelectorAll("[data-guide-choice]").forEach((button) => {
      const selected = button.dataset.guideChoice === question;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    if (announce && this.voiceEnabled) this.speak(this.guideContent[question]);
  }

  setupSpeech() {
    this.speechSynthesis = window.speechSynthesis || null;
    this.speechSupported = Boolean(this.speechSynthesis && window.SpeechSynthesisUtterance);
    this.speechActivated = false;
    this.onVoicesChanged = () => {
      this.speechVoices = this.speechSynthesis?.getVoices?.() || [];
      this.voiceAvailable = this.speechSupported && this.speechVoices.length > 0;
      if (this.voiceAvailable && this.voicePreference) {
        this.setVoiceEnabled(true, { announce: false, persist: false, activate: false });
      } else if (!this.voiceAvailable) {
        this.setVoiceEnabled(false, { announce: false, persist: false, activate: false });
      }
      this.updateVoiceStatus();
    };
    if (this.speechSupported) {
      this.speechSynthesis.addEventListener?.("voiceschanged", this.onVoicesChanged);
      this.onVoicesChanged();
      window.setTimeout(this.onVoicesChanged, 1200);
    }
    this.setVoiceEnabled(this.voiceEnabled, { announce: false, persist: false, activate: false });
  }

  updateVoiceStatus(message = "") {
    if (!this.voiceStatus) return;
    if (message) {
      this.voiceStatus.textContent = message;
      return;
    }
    if (!this.speechSupported) {
      this.voiceStatus.textContent = "Voice narration is not supported by this browser. Try a current version of Chrome, Edge, or Safari.";
      return;
    }
    if (!this.voiceAvailable) {
      this.voiceStatus.textContent = "No speech voices are installed or available in this browser. Enable a system voice, then reload the game.";
      return;
    }
    const voice = this.speechVoices.find((item) => item.name === this.voiceName)
      || this.findPreferredVoice();
    this.voiceStatus.textContent = voice
      ? `Ready: ${voice.name} · cute, gentle ${this.voiceGender} style`
      : `Ready: browser voice · cute, gentle ${this.voiceGender} style`;
  }

  findPreferredVoice() {
    const voices = this.speechVoices || [];
    if (this.voiceName) {
      const saved = voices.find((voice) => voice.name === this.voiceName);
      if (saved) return saved;
    }
    const genderPattern = this.voiceGender === "girl"
      ? /\b(female|woman|girl|samantha|victoria|karen|moira|tessa|serena|zira|aria|jenny)\b/i
      : /\b(male|man|boy|daniel|alex|david|george|james|guy|ryan|fred)\b/i;
    return voices.find((voice) => genderPattern.test(voice.name))
      || voices.find((voice) => /^en([-_]|$)/i.test(voice.lang))
      || voices[0]
      || null;
  }

  setVoiceGender(gender) {
    if (!["girl", "boy"].includes(gender)) return;
    this.voiceGender = gender;
    this.voiceName = "";
    this.updateVoiceStatus();
    this.updateSettings({ voiceGender: gender, voiceName: "" });
  }

  setVoiceEnabled(enabled, { announce = true, persist = true, activate = true } = {}) {
    this.voiceEnabled = Boolean(enabled);
    if (persist) this.voicePreference = this.voiceEnabled;
    if (activate && this.voiceEnabled) this.speechActivated = true;
    if (!this.voiceAvailable) this.voiceEnabled = false;
    if (!this.voiceEnabled) this.speechSynthesis?.cancel();
    if (this.voiceButton) {
      this.voiceButton.disabled = !this.voiceAvailable;
      this.voiceButton.textContent = this.voiceEnabled ? "Voice guidance on" : "Voice guidance off";
      this.voiceButton.setAttribute("aria-pressed", String(this.voiceEnabled));
      this.voiceButton.title = this.speechSupported ? "" : "Speech synthesis is not available in this browser.";
    }
    const readAnswer = this.root.querySelector("[data-guide-speak]");
    if (readAnswer) readAnswer.disabled = !this.voiceAvailable || !this.voiceEnabled;
    const testVoice = this.root.querySelector("[data-voice-test]");
    if (testVoice) testVoice.disabled = !this.voiceAvailable;
    const setting = this.settingsPanel.querySelector('[data-setting="voice"]');
    if (setting) {
      setting.checked = this.voiceEnabled;
      setting.disabled = !this.voiceAvailable;
    }
    this.updateVoiceStatus();
    if (persist) this.options.onSettingsChange?.({ voiceGuidance: this.voiceEnabled });
    if (this.voiceEnabled && announce) {
      const step = this.currentStep();
      if (step) this.speak(`${step.title}. ${step.hint}`);
    }
  }

  speak(text, { test = false } = {}) {
    if (!this.voiceEnabled || !text) return;
    if (!this.speechActivated && !test) {
      this.updateVoiceStatus("Tap Test voice once to activate spoken guidance.");
      return;
    }
    const Utterance = window.SpeechSynthesisUtterance;
    if (!this.voiceAvailable || !this.speechSupported || !Utterance) {
      this.setVoiceEnabled(false);
      return;
    }
    this.speechSynthesis.cancel();
    const utterance = new Utterance(text);
    const voice = this.findPreferredVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
      if (this.voiceName !== voice.name) {
        this.voiceName = voice.name;
        this.options.onSettingsChange?.({ voiceName: voice.name });
      }
    } else {
      utterance.lang = document.documentElement.lang || "en-US";
    }
    utterance.rate = 0.88;
    utterance.pitch = this.voiceGender === "girl" ? 1.18 : 0.92;
    utterance.onstart = () => this.updateVoiceStatus(
      `${test ? "Voice test" : "Speaking"}: ${voice?.name || "browser voice"} · gentle ${this.voiceGender} style`
    );
    utterance.onend = () => this.updateVoiceStatus();
    utterance.onerror = (event) => {
      if (!["canceled", "interrupted"].includes(event.error) && !this.destroyed) {
        this.setVoiceEnabled(false, { announce: false });
        this.updateVoiceStatus("Voice playback failed in this browser. Check system speech settings or choose another browser voice.");
        this.toast("Voice playback failed. The on-screen instructions are still available.", "warn", 3600);
      }
    };
    this.speechSynthesis.speak(utterance);
    if (this.speechSynthesis.paused) this.speechSynthesis.resume();
  }

  updateHud() {
    const level = this.currentLevel();
    this.hudLevel().textContent = level.tab;
    this.root.querySelector("[data-hud-step]").textContent = `${Math.min(this.stepIndex + 1, level.steps.length)} / ${level.steps.length}`;
    this.root.querySelector("[data-hud-score]").textContent = String(Math.max(0, this.score));
    const strikes = this.root.querySelector("[data-hud-strikes]");
    strikes.textContent = `${this.strikes} / ${MAX_MISTAKES}`;
    strikes.setAttribute("aria-label", `${this.strikes} of ${MAX_MISTAKES} mistakes`);
  }

  hudLevel() {
    return this.root.querySelector("[data-hud-level]");
  }

  completeStep({ silent = false } = {}) {
    const step = this.currentStep();
    const level = this.currentLevel();
    if (!step) return;
    if (!silent) {
      this.audio.clickSnap();
      vibrate(12, this.settings.haptics !== false);
      this.toast(`${step.title} — done.`, "success", 2200);
    }
    if (this.stepIndex >= level.steps.length - 1) {
      this.finishLevel();
      return;
    }
    this.stepIndex += 1;
    const next = this.currentStep();
    this.renderStep();
    this.updateHud();
    if (next) {
      this.renderCompanion("happy", `Next: ${next.title}. ${next.hint}`);
      this.track("step", { level: level.id, step: step.id });
    }
  }

  finishLevel() {
    const level = this.currentLevel();
    const elapsed = (performance.now() - this.levelStartedAt) / 1000;
    const timePenalty = Math.max(0, Math.round((elapsed - level.par) * 3));
    const finalScore = clamp(Math.round(this.score - timePenalty), 0, 1000);
    const stars = finalScore >= 850 ? 3 : finalScore >= 650 ? 2 : 1;
    const result = {
      level: level.id,
      score: finalScore,
      stars,
      time: Math.round(elapsed),
      strikes: this.strikes,
      hints: this.hintsUsed,
      at: new Date().toISOString()
    };
    this.completed[level.id] = result;
    this.options.onSaveLevel?.(result);
    this.audio.success();
    vibrate([18, 40, 24], this.settings.haptics !== false);
    this.track("level-complete", result);

    const tab = this.root.querySelector(`[data-level="${this.levelIndex}"]`);
    tab?.classList.add("is-done");
    if (!tab?.querySelector(".pclab-tab-star")) {
      tab?.insertAdjacentHTML("beforeend", '<span class="pclab-tab-star" aria-label="completed">★</span>');
    }

    if (this.levelIndex < LEVELS.length - 1) {
      const nextLevel = LEVELS[this.levelIndex + 1];
      this.renderCompanion(stars >= 2 ? "celebrating" : "happy", `Bench clean. Next is ${nextLevel.tab}.`);
      this.showOverlay(`
        <div class="pclab-result">
          <p class="pclab-eyebrow">Level complete · ${esc(level.tab)}</p>
          <h2>${esc(level.title)}</h2>
          ${starsMarkup(stars)}
          <div class="pclab-result-grid">
            <div><strong>${finalScore}</strong><span>score</span></div>
            <div><strong>${formatTime(elapsed)}</strong><span>time</span></div>
            <div><strong>${this.strikes}</strong><span>strikes</span></div>
            <div><strong>${this.hintsUsed}</strong><span>hints</span></div>
          </div>
          <p class="pclab-result-copy">${esc(level.subtitle)}. ${stars >= 2 ? "That order will keep the machine serviceable." : "Clean enough to continue. Replay for a higher score."}</p>
          <div class="pclab-result-actions">
            <button class="btn btn-primary" type="button" data-overlay-action="next">Next: ${esc(nextLevel.tab)}</button>
            <button class="btn btn-ghost" type="button" data-overlay-action="retry">Retry level</button>
            <button class="btn btn-ghost" type="button" data-overlay-action="select">Level select</button>
          </div>
        </div>
      `);
    } else {
      this.finishCampaign();
    }
  }

  finishCampaign() {
    const results = LEVELS.map((level) => this.completed[level.id]).filter(Boolean);
    const allDone = results.length === LEVELS.length;
    const totalScore = results.reduce((sum, item) => sum + item.score, 0);
    const totalStars = results.reduce((sum, item) => sum + item.stars, 0);
    const totalTime = results.reduce((sum, item) => sum + item.time, 0);
    const accuracy = allDone ? Math.round((totalScore / (LEVELS.length * 1000)) * 100) : null;
    const stars = allDone ? Math.max(1, Math.round(totalStars / LEVELS.length)) : 1;
    let campaign = null;
    if (allDone) {
      campaign = this.options.onCampaignComplete?.({
        score: totalScore,
        total: LEVELS.length * 1000,
        accuracy,
        stars,
        timeSeconds: totalTime,
        levels: results,
        mode: this.mode
      }) || null;
    }
    this.audio.success();
    this.renderCompanion(allDone ? "celebrating" : "thinking", allDone
      ? "Four benches, one clean build. That is the whole COC 1 workflow."
      : "One more level to finish the campaign. Open level select to see what is missing.");

    const xpLine = campaign
      ? `<p class="pclab-result-copy">+${campaign.earnedXp ?? 0} XP recorded${campaign.newBadges?.length ? ` · ${campaign.newBadges.map((badge) => esc(badge.name)).join(", ")}` : ""}.</p>`
      : `<p class="pclab-result-copy">Campaign recorded only when all four benches are complete. You have ${results.length} of ${LEVELS.length}.</p>`;

    this.showOverlay(`
      <div class="pclab-result">
        <p class="pclab-eyebrow">Campaign ${allDone ? "complete" : "in progress"}</p>
        <h2>${allDone ? "The build is alive." : "Keep the bench moving."}</h2>
        ${allDone ? starsMarkup(stars) : ""}
        <div class="pclab-result-grid">
          <div><strong>${allDone ? accuracy : results.length}</strong><span>${allDone ? "% accuracy" : "of 4 levels"}</span></div>
          <div><strong>${totalScore}</strong><span>total score</span></div>
          <div><strong>${formatTime(totalTime)}</strong><span>bench time</span></div>
          <div><strong>${totalStars}</strong><span>stars</span></div>
        </div>
        ${xpLine}
        <div class="pclab-result-actions">
          <button class="btn btn-primary" type="button" data-overlay-action="select">Play a level</button>
          <button class="btn btn-ghost" type="button" data-overlay-action="retry">Retry fault level</button>
          <a class="btn btn-ghost" href="/play">Back to interactives</a>
        </div>
      </div>
    `);
    this.track("campaign-complete", { allDone, accuracy, stars });
  }

  failLevel(reason = `You have reached ${MAX_MISTAKES} mistakes. Take a moment to review the step, then try again.`) {
    if (this.failed) return;
    this.failed = true;
    this.audio.fail();
    vibrate([30, 50, 30], this.settings.haptics !== false);
    this.renderCompanion("oops", reason);
    this.showOverlay(`
      <div class="pclab-result is-fail">
        <p class="pclab-eyebrow">Bench reset</p>
        <h2>Pause and reset the bench.</h2>
        <p class="pclab-result-copy">${esc(reason)} Nothing was saved for this attempt.</p>
        <div class="pclab-result-actions">
          <button class="btn btn-primary" type="button" data-overlay-action="retry">Restart level</button>
          <button class="btn btn-ghost" type="button" data-overlay-action="select">Level select</button>
          <a class="btn btn-ghost" href="/play">Back to interactives</a>
        </div>
      </div>
    `);
  }

  /* ---------------------------------------------------------------- actions */

  onSceneClick(action) {
    if (this.overlayOpen || this.failed) return;
    const step = this.currentStep();
    if (!step) return;
    if (action === "rotate") return;
    const mapped = action === "lever" && step.action.startsWith("lever")
      ? step.action
      : action === "tools" && step.action === "arrange-bench"
        ? step.action
        : action === "clips" && step.action.startsWith("clips")
          ? step.action
          : action;
    if (mapped === step.action) {
      this.runStep(step);
      return;
    }
    if (this.currentLevel().id === "power" && ["fan-cable", "psu", "peripheral", "ram"].includes(action)) {
      this.score = Math.max(0, this.score - 20);
      this.strikes += 1;
      this.updateHud();
      this.audio.error();
      this.renderCompanion("thinking", "That connection is seated. Keep checking in the module order.");
      this.toast("Not the fault. Check the next item in the order.", "warn", 2600);
      this.speak("That component is not the fault. Keep checking in the module order.");
      if (this.strikes >= MAX_MISTAKES) this.failLevel(`You have reached ${MAX_MISTAKES} mistakes. Take a moment to review the step, then try again.`);
      return;
    }
    this.wrongAction(action, step);
  }

  runStep(step) {
    const level = this.currentLevel();
    if (level.id === "safety") {
      switch (step.action) {
        case "clean-bench": this.view.cleanBench(); break;
        case "arrange-bench": this.view.arrangeBench(); break;
        case "power": this.view.shutdownSafety(); break;
        case "plug": this.view.unplugPower(); break;
        case "peripheral": this.view.disconnectPeripheral(); break;
        case "bracelet": this.view.removeBracelet(); break;
        case "tools": this.view.prepareTools(); break;
        case "bins": this.view.prepareBins(); break;
        case "strap": this.view.wearStrap(); break;
        case "camera": this.view.documentConnections(); break;
        default: break;
      }
      this.completeStep();
      return;
    }

    if (level.id === "cpu") {
      if (step.action === "lever-open") {
        this.view.setLever(true);
        this.completeStep();
      } else if (step.action === "lever-close") {
        this.view.setLever(false);
        this.completeStep();
      } else if (step.action === "paste") {
        this.view.applyPaste();
        this.view.showCoolerReady();
        this.completeStep();
      } else if (step.action === "cooler") {
        this.view.mountCooler();
        this.completeStep();
      }
      return;
    }

    if (level.id === "ram") {
      if (step.action === "clips-open") {
        this.view.openRamClips();
        this.completeStep();
      } else if (step.action === "clips-close") {
        this.view.closeRamClips();
        this.completeStep();
      }
      return;
    }

    if (level.id === "power") {
      if (step.action === "power" && step.id === "power-on") {
        this.view.powerOn();
        this.completeStep();
        this.schedule(() => {
          if (!this.destroyed && this.currentLevel().id === "power" && this.currentStep()?.id === "fan") {
            this.view.powerFault();
          }
        }, 1150);
      } else if (step.action === "fan-cable" && step.id === "fan") {
        this.view.inspectFanCable();
        this.completeStep();
        this.toast("The fan connector is loose. Continue the module checks before reconnecting it.", "warn", 3200);
      } else if (step.action === "psu") {
        this.view.checkPsu();
        this.completeStep();
      } else if (step.action === "peripheral") {
        this.view.checkMonitorCable();
        this.completeStep();
      } else if (step.action === "ram") {
        this.view.reseatRamPower();
        this.completeStep();
      } else if (step.action === "fan-cable" && step.id === "fix") {
        this.view.fixFanCable();
        this.completeStep();
        this.renderCompanion("happy", "Fan connector reconnected. Now retest the system.");
      } else if (step.action === "power" && step.id === "boot") {
        this.waitingForBoot = true;
        this.view.powerOn();
        this.toast("POST in progress. Watch the fan and the display.", "info", 3200);
      }
      return;
    }
  }

  wrongAction(action, step) {
    if (this.overlayOpen || this.failed) return;
    this.audio.error();
    this.score = Math.max(0, this.score - 120);
    this.strikes += 1;
    this.updateHud();
    this.renderCompanion("oops", `Not yet. ${step.hint}`);
    this.toast(`Not yet. ${step.title}.`, "warn", 2800);
    this.view?.highlight?.(step.target || null);
    this.track("strike", { level: this.currentLevel().id, action, step: step.id });
    this.speak(`Try again. ${step.hint}`);
    if (this.strikes >= MAX_MISTAKES) {
      this.failLevel(`You have reached ${MAX_MISTAKES} mistakes. Take a moment to review the step, then try again.`);
    }
  }

  canDrag(part) {
    const step = this.currentStep();
    if (!step) return false;
    if (this.currentLevel().id === "safety") {
      return (part === "strap" && step.action === "strap")
        || (part === "camera" && step.action === "camera")
        || (part === "plug" && step.action === "plug");
    }
    if (part === "case-screw") return step.action === "remove-screws";
    if (part === "lever") return step.action.startsWith("lever");
    if (part === "cpu") return step.action === "drop";
    if (part === "ram") return step.action === "drop";
    return false;
  }

  onBlocked(part) {
    const step = this.currentStep();
    if (step) this.toast(`Finish “${step.title}” first.`, "warn", 2200);
  }

  onSafetyDrop({ action, valid }) {
    if (this.overlayOpen || this.failed) return;
    const step = this.currentStep();
    if (!step) return;
    if (valid && action === step.action) {
      this.completeStep();
      return;
    }
    if (valid) {
      this.wrongAction(action, step);
      return;
    }
    this.toast(`No problem—try that drop again. ${step.hint}`, "info", 3000);
  }

  onPartDrop(result) {
    if (this.overlayOpen || this.failed) return;
    const step = this.currentStep();
    if (!step) return;
    if (result.part === "case-screw" && step.action === "remove-screws") {
      if (!result.valid) {
        this.toast("No problem—drop the screw anywhere inside the parts tray beside the motherboard.", "info", 2800);
        return;
      }
      this.removedCaseScrews += 1;
      if (this.removedCaseScrews === 4) {
        this.view?.openCasePanel();
        this.view?.focus("cpu");
        this.completeStep();
      } else {
        this.objectiveHint.textContent = `${this.removedCaseScrews} of 4 screws in the parts tray. Keep going.`;
        this.toast(`${this.removedCaseScrews} of 4 case screws removed.`, "success", 1800);
      }
      return;
    }
    if (step.action !== "drop") {
      if (result.valid) {
        this.view?.reject?.(result.part === "cpu" ? this.view.cpu : this.view.ram, "order");
      }
      this.wrongAction(result.part, step);
      return;
    }
    if (!result.valid) {
      if (result.reason === "target") {
        this.toast("No problem—try again and release the part over its highlighted target.", "info", 2600);
        return;
      }
      this.audio.error();
      this.score = Math.max(0, this.score - 80);
      this.strikes += 1;
      this.updateHud();
      const messages = {
        lever: "The socket lever is still closed. Open it before seating the CPU.",
        orientation: "The triangle is not aligned. Rotate the part and try again.",
        force: "Too fast and too hard. Set the part down gently.",
        target: "Release the part over the socket or slot."
      };
      this.renderCompanion("oops", messages[result.reason] || messages.target);
      this.toast(messages[result.reason] || messages.target, "warn", 3000);
      this.track("drop-fail", { part: result.part, reason: result.reason });
      this.speak(messages[result.reason] || messages.target);
      if (this.strikes >= MAX_MISTAKES) this.failLevel(`You have reached ${MAX_MISTAKES} mistakes. Use the alignment marks and gentle pressure, then try again.`);
      return;
    }
    if (result.part === "cpu") {
      const gentle = (result.speed || 0) < 2.2 && (result.height || 0) < 0.3;
      this.view.seatCpu({ gentle });
      this.completeStep();
      return;
    }
    if (result.part === "ram") {
      this.view.seatRamReady();
      this.completeStep();
    }
  }

  onRotate({ part, aligned }) {
    if (this.overlayOpen || this.failed) return;
    const step = this.currentStep();
    if (!step) return;
    if (step.action !== "rotate") {
      this.toast("Rotate only matters when the part is not aligned yet.", "info", 2000);
      return;
    }
    if (aligned) {
      this.renderCompanion("happy", "The alignment mark matches. Now move the part into place.");
      this.completeStep();
    } else {
      this.audio.click();
      this.toast("Not aligned yet. Keep rotating.", "info", 1800);
    }
  }

  onSeatStart() {
    this.meter.hidden = false;
    this.meter.classList.add("is-live");
    this.renderCompanion("thinking", "Hold. Keep the module level and release in the green zone.");
    this.speak("Hold. Keep the module level and release in the green zone.");
    this.track("seat-start");
  }

  onSeatProgress({ pressure, balance }) {
    const percent = clamp(pressure / 1.15, 0, 1) * 100;
    if (this.meterFill) this.meterFill.style.width = `${percent}%`;
    this.meter.dataset.pressure = pressure.toFixed(2);
    this.meter.dataset.balance = balance.toFixed(2);
    this.meter.classList.toggle("is-balanced", Math.abs(balance) < 0.36);
    this.meter.classList.toggle("is-tilted", Math.abs(balance) >= 0.36);
  }

  onSeatResult(result) {
    if (this.overlayOpen || this.failed) return;
    this.meter.classList.remove("is-live");
    if (result.ok) {
      this.completeStep();
      this.renderCompanion("happy", "Both clips clicked. That module is fully seated.");
      return;
    }
    this.audio.error();
    this.score = Math.max(0, this.score - 100);
    this.strikes += 1;
    this.updateHud();
    const reason = result.overpressure
      ? "Too much pressure. Ease off and let the clips do the work."
      : result.underpressure
        ? "Not enough pressure. The module is not fully seated."
        : "The module tilted. Keep it level while you press.";
    this.renderCompanion("oops", reason);
    this.toast(reason, "warn", 3200);
    this.resetMeter();
    this.track("seat-fail", { pressure: result.pressure, balanced: result.balanced });
    this.speak(reason);
    if (this.strikes >= MAX_MISTAKES) this.failLevel(`You have reached ${MAX_MISTAKES} mistakes. Keep the module level and press evenly, then try again.`);
  }

  onReject(reason) {
    if (this.overlayOpen || this.failed) return;
    this.track("reject", { reason });
  }

  onPowerFault() {
    if (this.overlayOpen || this.failed) return;
    this.renderCompanion("oops", "No display and the fan is still. Work the fault order: fan, PSU, display, RAM.");
    this.toast("No POST. The fan is still and the monitor is dark.", "warn", 4200);
    this.audio.error();
    this.speak("No display and the fan is still. Check the fan, power supply, display cable, and memory in order.");
    this.track("power-fault");
  }

  onBooted() {
    if (this.overlayOpen || this.failed) return;
    if (this.currentLevel().id !== "power") return;
    if (this.waitingForBoot) {
      this.waitingForBoot = false;
      this.completeStep();
      this.renderCompanion("celebrating", "Fan spinning, display alive. POST confirms the repair.");
    }
  }

  onBoardMounted() {
    this.track("board-mounted");
  }

  onEscape() {
    if (!this.settingsPanel.hidden) this.toggleSettings(false);
    else if (this.overlayOpen) this.closeOverlay();
  }

  /* ------------------------------------------------------------------- hints */

  showHint() {
    if (this.overlayOpen || this.failed) return;
    const step = this.currentStep();
    if (!step) return;
    this.hintsUsed += 1;
    this.score = Math.max(0, this.score - 40);
    this.updateHud();
    this.whyCopy.hidden = true;
    this.renderCompanion("thinking", step.hint);
    this.toast(step.hint, "info", 5200);
    this.view?.highlight?.(step.target || null);
    this.speak(step.hint);
    this.audio.hover();
    this.track("hint", { level: this.currentLevel().id, step: step.id });
  }

  toggleWhy() {
    const step = this.currentStep();
    if (!step) return;
    this.whyCopy.hidden = !this.whyCopy.hidden;
    if (!this.whyCopy.hidden) {
      this.whyCopy.textContent = step.why;
      this.renderCompanion("thinking", step.why);
      this.speak(step.why);
    }
  }

  resetMeter() {
    if (this.meterFill) this.meterFill.style.width = "0%";
    this.meter.classList.remove("is-balanced", "is-tilted", "is-live");
  }

  /* ------------------------------------------------------------------ overlay */

  showOverlay(html) {
    this.overlayShownAt = performance.now();
    this.overlay.innerHTML = html;
    this.overlay.hidden = false;
    this.overlayOpen = true;
    this.root.classList.add("is-overlay");
    window.setTimeout(() => this.overlay.querySelector("button, a")?.focus({ preventScroll: true }), 40);
  }

  closeOverlay() {
    this.overlay.hidden = true;
    this.overlayOpen = false;
    this.root.classList.remove("is-overlay");
  }

  onOverlayAction(action) {
    if (action === "next") {
      this.startLevel(this.levelIndex + 1);
      return;
    }
    if (action === "retry") {
      this.startLevel(this.levelIndex);
      return;
    }
    if (action === "select") {
      this.showLevelSelect();
    }
    if (action === "close") {
      this.closeOverlay();
    }
  }

  showLevelSelect() {
    const rows = LEVELS.map((level, index) => {
      const result = this.completed[level.id];
      return `<button class="pclab-select-row" type="button" data-level="${index}">
        <span><strong>${esc(level.tab)}</strong><small>${esc(level.subtitle)}</small></span>
        <span class="pclab-select-result">${result ? `${result.score} · ${"★".repeat(result.stars)}` : "Not yet"}</span>
      </button>`;
    }).join("");
    this.showOverlay(`
      <div class="pclab-result">
        <p class="pclab-eyebrow">Bench select</p>
        <h2>Pick up a level</h2>
        <div class="pclab-select-list">${rows}</div>
        <div class="pclab-result-actions">
          <button class="btn btn-ghost" type="button" data-overlay-action="close">Close</button>
          <a class="btn btn-ghost" href="/play">Back to interactives</a>
        </div>
      </div>
    `);
  }

  /* --------------------------------------------------------------- settings */

  toggleSettings(open) {
    this.settingsPanel.hidden = !open;
    if (!open) return;
    this.settingsPanel.querySelector('[data-setting="sound"]').checked = this.settings.sound !== false;
    this.settingsPanel.querySelector('[data-setting="haptics"]').checked = this.settings.haptics !== false;
    this.settingsPanel.querySelector('[data-setting="motion"]').checked = this.settings.motion === "reduced";
    this.settingsPanel.querySelector('[data-setting="voice"]').checked = this.voiceEnabled;
    this.settingsPanel.querySelector('[data-setting="voice"]').disabled = !this.voiceAvailable;
    this.settingsPanel.querySelector('[data-setting="voiceGender"]').value = this.voiceGender;
    this.settingsPanel.querySelector('[data-setting="voiceGender"]').disabled = !this.voiceAvailable;
    this.settingsPanel.querySelector('[data-setting="quality"]').value = this.settings.quality || "auto";
    this.settingsPanel.querySelector("[data-quality-label]").textContent = this.qualityInfo
      ? `${this.qualityInfo.label} · ${this.qualityInfo.fps || 60} fps`
      : "";
  }

  updateSettings(patch) {
    this.settings = { ...this.settings, ...patch };
    if (patch.quality) this.settings.quality = patch.quality;
    this.audio.setEnabled(this.settings.sound !== false);
    this.view?.setSettings?.(this.settings);
    this.options.onSettingsChange?.(patch);
    if (patch.motion) {
      document.documentElement.dataset.motion = patch.motion;
    }
    this.toggleSettings(true);
    this.toast("Bench settings updated.", "success", 1800);
  }

  nextTheme() {
    const current = THEME_ORDER.indexOf(this.theme.id);
    const next = THEME_ORDER[(current + 1) % THEME_ORDER.length];
    this.options.onThemeChange?.(next);
    this.toast("Theme applied to the bench.", "success", 1800);
  }

  onQuality(quality) {
    this.qualityInfo = quality;
    this.qualityEl.hidden = false;
    this.qualityEl.textContent = quality.label;
    const label = this.settingsPanel.querySelector("[data-quality-label]");
    if (label) label.textContent = `${quality.label} · ${quality.fps || 60} fps`;
  }

  /* --------------------------------------------------------------- companion */

  renderCompanion(mood, line) {
    const art = this.options.companionArt?.(mood, { size: 96 }) || "";
    const artEl = this.root.querySelector("[data-companion-art]");
    if (artEl) artEl.innerHTML = art;
    const nameEl = this.root.querySelector("[data-companion-name]");
    if (nameEl) nameEl.textContent = this.options.companionName || this.companion.name || "Chip";
    const lineEl = this.root.querySelector("[data-companion-line]");
    if (lineEl) lineEl.textContent = line;
    this.options.onCompanionSay?.(line, mood);
  }

  /* ------------------------------------------------------------------- toast */

  toast(message, type = "info", duration = 2600) {
    if (!this.toastEl || !message) return;
    this.toastEl.hidden = false;
    this.toastEl.className = `pclab-toast is-${type}`;
    this.toastEl.textContent = message;
    clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => {
      if (this.toastEl) this.toastEl.hidden = true;
    }, duration);
  }

  /* ------------------------------------------------------------------ timers */

  schedule(fn, ms) {
    const id = window.setTimeout(() => {
      this.timers.delete(id);
      if (!this.destroyed) fn();
    }, ms);
    this.timers.add(id);
    return id;
  }

  clearTimers() {
    this.timers.forEach((id) => clearTimeout(id));
    this.timers.clear();
  }

  track(name, detail = {}) {
    try {
      window.dispatchEvent(new CustomEvent("techpro:game", {
        detail: { game: "pc-lab", name, ...detail, at: Date.now() }
      }));
    } catch { /* event dispatch is optional */ }
  }

  /* ------------------------------------------------------------------ destroy */

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.stopTheme?.();
    this.clearTimers();
    clearInterval(this.clockTimer);
    clearTimeout(this.toastTimer);
    document.removeEventListener("keydown", this.onKey);
    this.speechSynthesis?.removeEventListener?.("voiceschanged", this.onVoicesChanged);
    this.speechSynthesis?.cancel();
    this.root?.removeEventListener("click", this.onClick);
    this.root?.removeEventListener("change", this.onChange);
    this.holdButton?.removeEventListener("pointerdown", this.onHoldDown);
    this.holdButton?.removeEventListener("pointermove", this.onHoldMove);
    this.holdButton?.removeEventListener("pointerup", this.onHoldUp);
    this.holdButton?.removeEventListener("pointercancel", this.onHoldUp);
    this.view?.dispose?.();
    if (this.mount) this.mount.innerHTML = "";
  }
}

let activeGame = null;

export function start(options) {
  stop();
  activeGame = new PcLabGame(options);
  if (options?.debug) window.__pcLab = activeGame;
  return activeGame;
}

export function stop() {
  if (activeGame) {
    activeGame.destroy();
    activeGame = null;
  }
}

export { LEVELS };
