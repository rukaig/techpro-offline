/* ==========================================================================
   PC Lab 2D top-down flat-lay bench.

   This is the only renderer. It replaces the WebGL scene so a tap can never be
   swallowed by an invisible 3D hit shape. Every object on the bench is a real
   DOM element with a generous (>= 48 CSS px) hit area, and one pointer
   controller owns every input:

     - tap once on a part to act on it
     - tap once on a part that needs a target, then tap the target (tap-tap)
     - or press and drag the part onto the target

   `?debug=1` outlines every hit area and prints the live input state.
   ========================================================================== */

const BENCH_LEVELS = ["safety", "cpu", "ram", "power"];

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function center(el) {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, rect };
}

/* Part -> action the lesson controller understands. */
const PART_ACTION = {
  power: "power",
  "fan-cable": "fan-cable",
  psu: "psu",
  lever: "lever",
  clips: "clips",
  cooler: "cooler",
  bracelet: "bracelet",
  strap: "strap",
  camera: "camera",
  "clean-cloth": "clean-bench",
  bins: "bins",
  tools: "tools",
  plug: "plug",
  peripheral: "peripheral"
};

/* Parts that must be moved onto a target before they count. */
const DROP_TARGET = {
  cpu: "socket",
  ram: "ram-slot",
  strap: "wrist",
  camera: "monitor",
  bins: "parts-tray",
  "case-screw": "parts-tray"
};

/* Only these need a target. Everything else acts on a single tap; dragging
   them onto a target still works as a shortcut. */
const MOVE_PARTS = new Set(["cpu", "ram", "case-screw"]);

/* Reverse map, so tapping the target a second time also completes the move. */
const TARGET_PART = {
  socket: "cpu",
  "ram-slot": "ram",
  wrist: "strap",
  monitor: "camera",
  "parts-tray": "case-screw"
};

export class Bench2D {
  constructor({ container, theme, settings = {}, audio, callbacks = {} }) {
    this.container = container;
    this.theme = theme;
    this.settings = settings;
    this.audio = audio;
    this.callbacks = callbacks;
    this.level = "safety";
    this.leverOpen = false;
    this.clipsOpen = false;
    this.cpuRotation = 0;
    this.ramRotation = 0;
    this.cpuSeated = false;
    this.ramPlaced = false;
    this.ramSeated = false;
    this.powerState = "off";
    this.seat = null;
    this.seatTimer = null;
    this.bootTimer = null;
    this.screwsRemoved = 0;
    this.disposed = false;
    this.debug = new URLSearchParams(window.location.search).has("debug");
    this.build();
    this.setTheme(theme);
    this.setLevel("safety", { instant: true });
  }

  /* ------------------------------------------------------------------ markup */

  build() {
    const railPart = (part, label, parts, extra = "") => `
      <button class="bench2d-part bench2d-${part}" type="button" data-part="${part}"
        data-parts="${parts}" ${extra} aria-label="${esc(label)}"><span>${esc(label)}</span></button>`;

    this.container.innerHTML = `
      <div class="bench2d" data-bench2d data-debug="${this.debug ? "1" : "0"}">
        <div class="bench2d-bench" data-bench role="application" aria-label="Top-down workbench">
          <div class="bench2d-zone bench2d-monitor" data-part="monitor" data-drop="monitor" data-parts="safety cpu ram power">
            <span class="bench2d-screen" data-screen>Bench session ready</span>
            <span class="bench2d-tag">Monitor</span>
            <button class="bench2d-hit bench2d-port" type="button" data-part="peripheral" data-parts="safety power" aria-label="Monitor cable">CABLE</button>
          </div>

          <div class="bench2d-zone bench2d-case" data-part="case" data-parts="safety cpu ram power">
            <span class="bench2d-tag">Case</span>
            <span class="bench2d-fan" data-fan aria-hidden="true"></span>
            <button class="bench2d-hit bench2d-power" type="button" data-part="power" data-parts="safety power" aria-label="Case power button"></button>
            <button class="bench2d-hit bench2d-fancable" type="button" data-part="fan-cable" data-parts="power" aria-label="CPU fan connector">FAN</button>
            <div class="bench2d-screws" data-screws>
              <button class="bench2d-hit bench2d-screw" type="button" data-part="case-screw" data-drag="case-screw" data-parts="cpu" aria-label="Case-panel screw 1"></button>
              <button class="bench2d-hit bench2d-screw" type="button" data-part="case-screw" data-drag="case-screw" data-parts="cpu" aria-label="Case-panel screw 2"></button>
              <button class="bench2d-hit bench2d-screw" type="button" data-part="case-screw" data-drag="case-screw" data-parts="cpu" aria-label="Case-panel screw 3"></button>
              <button class="bench2d-hit bench2d-screw" type="button" data-part="case-screw" data-drag="case-screw" data-parts="cpu" aria-label="Case-panel screw 4"></button>
            </div>
          </div>

          <div class="bench2d-zone bench2d-board" data-part="board">
            <span class="bench2d-tag">Motherboard</span>
            <button class="bench2d-hit bench2d-socket" type="button" data-part="socket" data-drop="socket" data-parts="cpu" aria-label="CPU socket">
              <span class="bench2d-tri" aria-hidden="true">▴</span>
              <span class="bench2d-paste" data-paste aria-hidden="true"></span>
            </button>
            <button class="bench2d-hit bench2d-clips" type="button" data-part="clips" data-drop="ram-slot" data-parts="ram" aria-label="RAM slots and clips">
              <i></i><i></i><i></i><i></i>
            </button>
            <button class="bench2d-hit bench2d-lever" type="button" data-part="lever" data-drag="lever" data-parts="cpu" aria-label="CPU socket lever"></button>
            <button class="bench2d-hit bench2d-cooler" type="button" data-part="cooler" data-parts="cpu" aria-label="CPU cooler">COOLER</button>
          </div>

          <button class="bench2d-zone bench2d-psu" type="button" data-part="psu" data-parts="power" aria-label="Power supply">PSU</button>

          <div class="bench2d-zone bench2d-wrist" data-part="wrist" data-drop="wrist" data-parts="safety" aria-label="Technician's wrist">
            <span class="bench2d-head" aria-hidden="true"></span>
            <span class="bench2d-body" aria-hidden="true"></span>
            <button class="bench2d-hit bench2d-bracelet" type="button" data-part="bracelet" data-parts="safety" aria-label="Metal bracelet"></button>
            <span class="bench2d-strap-worn" data-worn aria-hidden="true"></span>
          </div>

          <div class="bench2d-zone bench2d-tray" data-part="parts-tray" data-drop="parts-tray" data-parts="cpu" aria-label="Parts tray">
            <span class="bench2d-tag">Parts tray</span>
          </div>

          <div class="bench2d-rail" data-rail>
            ${railPart("clean-cloth", "Cloth", "safety")}
            ${railPart("tools", "Tools", "safety")}
            ${railPart("camera", "Camera", "safety power", 'data-drag="camera"')}
            ${railPart("strap", "Strap", "safety", 'data-drag="strap"')}
            ${railPart("cpu", "CPU", "cpu", 'data-drag="cpu"')}
            ${railPart("ram", "RAM", "ram power", 'data-drag="ram"')}
            ${railPart("bins", "Bins", "safety", 'data-drag="bins"')}
            ${railPart("plug", "Plug", "safety", 'data-drag="plug"')}
          </div>
        </div>
        <p class="bench2d-hint" data-hint>Tap the glowing part. For a CPU or RAM move, tap the part then tap its slot.</p>
        <div class="bench2d-debug" data-debug-panel hidden>
          <strong>PC Lab debug</strong>
          <pre data-debug-text></pre>
        </div>
      </div>
    `;

    this.root = this.container.querySelector("[data-bench2d]");
    this.bench = this.root.querySelector("[data-bench]");
    this.hint = this.root.querySelector("[data-hint]");
    this.screen = this.root.querySelector("[data-screen]");
    this.fan = this.root.querySelector("[data-fan]");
    this.panel = this.root.querySelector("[data-debug-panel]");
    this.panelText = this.root.querySelector("[data-debug-text]");
    this.cpu = this.root.querySelector('[data-part="cpu"]');
    this.ram = this.root.querySelector('[data-part="ram"]');

    this.input = new BenchInput(this);
    this.input.bind(this.root);
    this.renderDebug();
    if (this.debug) this.panel.hidden = false;
  }

  /* ------------------------------------------------------- pointer plumbing */

  partElement(part) {
    if (part === "case-screw") return this.root.querySelector(".bench2d-screw:not(.is-done)");
    return this.root.querySelector(`[data-part="${part}"]`);
  }

  actionFor(part) {
    return PART_ACTION[part] || part;
  }

  canDrag(part) {
    return Boolean(this.callbacks.canDrag?.(part));
  }

  pointerDown(part, event) {
    const el = this.partElement(part);
    if (!el) return;
    this.input.press = { part, el, x: event.clientX, y: event.clientY, moved: 0 };
    this.log(`down ${part}`);
  }

  pointerMove(event) {
    const press = this.input.press;
    if (!press || this.input.dragging) return;
    press.moved = Math.max(press.moved, Math.hypot(event.clientX - press.x, event.clientY - press.y));
    if (press.moved < 8) return;
    if (!DROP_TARGET[press.part]) { this.log(`tap-move ${press.part}`); return; }
    if (!this.canDrag(press.part)) {
      this.callbacks.onBlocked?.(press.part);
      this.input.press = null;
      this.log(`blocked ${press.part}`);
      return;
    }
    this.input.dragging = press;
    press.el.classList.add("is-dragging");
    this.audio?.pick?.();
    this.log(`drag ${press.part}`);
  }

  pointerUp(event) {
    const press = this.input.press;
    this.input.press = null;
    if (!press) return;
    if (this.input.dragging) {
      const drag = this.input.dragging;
      this.input.dragging = null;
      drag.el.classList.remove("is-dragging");
      drag.el.style.removeProperty("--drag-x");
      drag.el.style.removeProperty("--drag-y");
      const zone = this.zoneUnder(event.clientX, event.clientY);
      this.log(`drop ${drag.part} -> ${zone || "nothing"}`);
      this.dropPart(drag.part, zone);
      return;
    }
    if (press.moved >= 10) return;
    this.tap(press.part, press.el);
  }

  pointerCancel(reason) {
    this.input.press = null;
    const drag = this.input.dragging;
    this.input.dragging = null;
    if (drag) {
      drag.el.classList.remove("is-dragging");
      drag.el.style.removeProperty("--drag-x");
      drag.el.style.removeProperty("--drag-y");
    }
    this.log(`cancel ${reason || "pointer"}`);
  }

  zoneUnder(x, y) {
    const hit = document.elementFromPoint(x, y);
    const zone = hit?.closest("[data-drop]");
    return zone && this.root.contains(zone) ? zone.dataset.drop : null;
  }

  /* Only the current move step turns a tap into a tap-tap move. Every other
     tap acts immediately, so a second tap on a part never re-moves it. */
  needsMove(part) {
    if (!DROP_TARGET[part] || !MOVE_PARTS.has(part)) return false;
    const step = this.callbacks.currentStep?.();
    if (!step) return false;
    if (part === "case-screw") return step.action === "remove-screws";
    return step.action === "drop";
  }

  /* One tap-to-act, tap-tap-to-move controller. */
  tap(part, el) {
    const zone = el?.dataset?.drop || null;
    const selected = this.input.selected;

    // Second half of a tap-tap: the tapped element is the held part's target.
    if (selected && zone && TARGET_PART[zone] === selected) {
      this.input.selected = null;
      this.markSelected(null);
      this.dropPart(selected, zone);
      return;
    }

    // Target first, then the part: tapping a target arms its part.
    const wants = TARGET_PART[part];
    if (!selected && wants && this.needsMove(wants)) {
      this.input.selected = wants;
      this.markSelected(wants);
      this.hint.textContent = `Now tap the ${this.targetLabel(wants)} to finish the move.`;
      this.log(`select ${wants}`);
      return;
    }

    if (this.needsMove(part)) {
      if (selected === part) {
        this.input.selected = null;
        this.markSelected(null);
        this.dropPart(part, DROP_TARGET[part]);
        return;
      }
      this.input.selected = part;
      this.markSelected(part);
      this.hint.textContent = `Tap the highlighted ${this.targetLabel(DROP_TARGET[part])} to place it, or drag it across.`;
      this.log(`select ${part}`);
      return;
    }

    this.input.selected = null;
    this.markSelected(null);
    this.fire(part, zone);
  }

  markSelected(part) {
    this.root.querySelectorAll(".is-selected").forEach((node) => node.classList.remove("is-selected"));
    if (!part) return;
    this.partElement(part)?.classList.add("is-selected");
  }

  targetLabel(zone) {
    return {
      socket: "CPU socket", "ram-slot": "RAM slot", wrist: "technician's wrist",
      monitor: "monitor", "parts-tray": "parts tray", cpu: "CPU", ram: "RAM",
      strap: "wrist strap", camera: "camera", "case-screw": "case screw"
    }[zone] || zone;
  }

  fire(part, zone) {
    const step = this.callbacks.currentStep?.();
    const onTarget = step && (step.target === part || (zone && step.target === zone));
    const action = onTarget ? step.action : this.actionFor(part);
    this.audio?.click?.();
    this.callbacks.onClick?.(action);
    this.log(`act ${action}`);
  }

  dropPart(part, zone) {
    const expected = DROP_TARGET[part];
    const valid = Boolean(expected) && zone === expected;
    if (part === "strap" || part === "camera" || part === "bins") {
      if (valid) this.markDone(part);
      this.callbacks.onSafetyDrop?.({ action: PART_ACTION[part], valid });
      this.log(`safety ${part} ${valid ? "ok" : "miss"}`);
      return;
    }
    if (!this.canDrag(part)) {
      this.callbacks.onBlocked?.(part);
      this.log(`blocked ${part}`);
      return;
    }
    if (part === "case-screw") {
      if (valid) {
        const screw = this.partElement("case-screw");
        screw?.classList.add("is-done");
        this.screwsRemoved += 1;
      }
      this.callbacks.onPartDrop?.({ part: "case-screw", valid });
      this.log(`screw ${valid ? "tray" : "miss"} (${this.screwsRemoved})`);
      return;
    }
    this.callbacks.onPartDrop?.({ part, valid, speed: 1, height: 0.05 });
    this.log(`drop ${part} ${valid ? "ok" : "miss"}`);
  }

  /* ------------------------------------------------------------------- state */

  markDone(part) {
    this.root.querySelectorAll(`[data-part="${part}"]`).forEach((node) => node.classList.add("is-done"));
  }

  log(message) {
    this.input?.setLast(message);
    this.renderDebug();
  }

  renderDebug() {
    if (!this.panel || this.panel.hidden) return;
    const selected = this.input?.selected || "-";
    const step = this.callbacks.debugStep?.() || "-";
    this.panelText.textContent = [
      `level   ${this.level}`,
      `step    ${step}`,
      `selected ${selected}`,
      `last    ${this.input?.last || "-"}`,
      `pointer ${this.input?.press ? "down" : "up"}`,
      `targets ${this.root.querySelectorAll("[data-part]:not([hidden])").length}`
    ].join("\n");
  }

  setTheme(theme) {
    this.theme = theme;
    if (!this.root) return;
    const p = theme.palette || {};
    const hex = (value) => `#${Number(value || 0).toString(16).padStart(6, "0")}`;
    this.root.style.setProperty("--bench-bg", hex(p.bg));
    this.root.style.setProperty("--bench-accent", hex(p.accent));
    this.root.style.setProperty("--bench-pcb", hex(p.pcb));
    this.root.style.setProperty("--bench-metal", hex(p.metal));
    this.root.style.setProperty("--bench-case", hex(p.case));
    this.root.dataset.theme = theme.id;
    this.root.dataset.dark = String(Boolean(theme.flags?.dark));
  }

  setSettings(settings) {
    this.settings = settings;
  }

  setLevel(level, { instant = false } = {}) {
    this.level = BENCH_LEVELS.includes(level) ? level : "safety";
    this.leverOpen = false;
    this.clipsOpen = false;
    this.cpuRotation = 0;
    this.ramRotation = 0;
    this.cpuSeated = false;
    this.ramPlaced = false;
    this.ramSeated = false;
    this.screwsRemoved = 0;
    this.powerState = "off";
    this.clearSeat();
    clearTimeout(this.bootTimer);
    if (!this.root) return;

    this.root.dataset.benchLevel = this.level;
    this.cpuRotation = this.level === "cpu" ? 90 : 0;
    this.ramRotation = this.level === "ram" ? 180 : 0;
    if (this.cpu) this.cpu.style.rotate = `${this.cpuRotation}deg`;
    if (this.ram) this.ram.style.rotate = `${this.ramRotation}deg`;
    this.root.classList.toggle("is-instant", Boolean(instant));
    this.root.querySelectorAll(".is-done, .is-hot, .is-selected, .is-open, .is-placed, .is-seated, .is-gone, .is-fixed, .has-paste, .is-ready, .is-hidden")
      .forEach((node) => node.classList.remove("is-done", "is-hot", "is-selected", "is-open", "is-placed", "is-seated", "is-gone", "is-fixed", "has-paste", "is-ready", "is-hidden"));
    this.root.querySelectorAll("[data-part]").forEach((node) => {
      const parts = (node.dataset.parts || "safety cpu ram power").split(/\s+/);
      node.hidden = !parts.includes(this.level);
      node.style.removeProperty("--drag-x");
      node.style.removeProperty("--drag-y");
    });
    if (this.input) {
      this.input.press = null;
      this.input.dragging = null;
      this.input.selected = null;
    }
    this.root.querySelectorAll(".bench2d-chip, .bench2d-stick").forEach((node) => node.remove());
    if (this.screen) {
      this.screen.textContent = "Bench session ready";
      this.screen.classList.remove("is-dark");
    }
    if (this.fan) this.fan.classList.remove("is-spinning");
    this.hint.textContent = "Tap the glowing part. For a CPU or RAM move, tap the part then tap its slot.";
    this.log(`level ${this.level}`);
  }

  focus() { /* the whole flat-lay is always in frame */ }

  highlight(target) {
    this.root.querySelectorAll(".is-hot").forEach((node) => node.classList.remove("is-hot"));
    if (!target) return;
    const el = this.partElement(target) || this.root.querySelector(`[data-drop="${target}"]`);
    el?.classList.add("is-hot");
  }

  rotateSelected() {
    if (this.level === "cpu" && !this.cpuSeated) {
      this.cpuRotation = (this.cpuRotation + 90) % 360;
      this.cpu.style.rotate = `${this.cpuRotation}deg`;
      this.audio?.click?.();
      this.callbacks.onRotate?.({ part: "cpu", aligned: this.cpuRotation === 0 });
    } else if (this.level === "ram" && !this.ramPlaced) {
      this.ramRotation = (this.ramRotation + 180) % 360;
      this.ram.style.rotate = `${this.ramRotation}deg`;
      this.audio?.click?.();
      this.callbacks.onRotate?.({ part: "ram", aligned: this.ramRotation === 0 });
    }
  }

  setLever(open) {
    this.leverOpen = Boolean(open);
    this.root.querySelector('[data-part="lever"]')?.classList.toggle("is-open", this.leverOpen);
    this.audio?.clickSnap?.();
  }

  openCasePanel() {
    this.root.querySelector(".bench2d-case")?.classList.add("is-open");
  }

  applyPaste() {
    this.root.querySelector('[data-part="socket"]')?.classList.add("has-paste");
    this.root.querySelector("[data-paste]")?.classList.add("is-on");
    this.audio?.paste?.();
  }

  showCoolerReady() {
    this.root.querySelector('[data-part="cooler"]')?.classList.add("is-ready");
  }

  mountCooler() {
    this.root.querySelector('[data-part="cooler"]')?.classList.add("is-done");
    this.audio?.snap?.();
  }

  openRamClips() {
    this.clipsOpen = true;
    this.root.querySelector('[data-part="clips"]')?.classList.add("is-open");
    this.audio?.clickSnap?.();
  }

  closeRamClips() {
    this.clipsOpen = false;
    this.root.querySelector('[data-part="clips"]')?.classList.remove("is-open");
    this.audio?.clickSnap?.();
  }

  shutdownSafety() {
    this.powerState = "off";
    if (this.screen) {
      this.screen.textContent = "Powered down";
      this.screen.classList.add("is-dark");
    }
    this.fan?.classList.remove("is-spinning");
    this.audio?.clickSnap?.();
  }

  unplugPower() { this.markDone("plug"); this.audio?.clickSnap?.(); }

  disconnectPeripheral() {
    this.markDone("peripheral");
    this.audio?.clickSnap?.();
  }

  removeBracelet() {
    this.root.querySelector('[data-part="bracelet"]')?.classList.add("is-gone");
    this.audio?.clickSnap?.();
  }

  prepareTools() {
    this.markDone("tools");
    this.audio?.clickSnap?.();
  }

  cleanBench() {
    this.root.querySelector('[data-part="clean-cloth"]')?.classList.add("is-hidden");
    this.audio?.clickSnap?.();
  }

  arrangeBench() {
    this.markDone("tools");
    this.markDone("bins");
    this.audio?.clickSnap?.();
  }

  prepareBins() {
    this.markDone("bins");
    this.audio?.clickSnap?.();
  }

  wearStrap() {
    this.root.querySelector('[data-part="strap"]')?.classList.add("is-gone");
    this.root.querySelector("[data-worn]")?.classList.add("is-on");
    this.root.querySelector('[data-part="bracelet"]')?.classList.add("is-gone");
    this.audio?.clickSnap?.();
  }

  documentConnections() {
    this.markDone("camera");
    if (this.screen) {
      this.screen.textContent = "Connections photographed";
      this.screen.classList.remove("is-dark");
    }
    this.audio?.clickSnap?.();
  }

  checkPsu() {
    this.markDone("psu");
    this.audio?.clickSnap?.();
  }

  checkMonitorCable() {
    this.markDone("peripheral");
    this.audio?.clickSnap?.();
  }

  reseatRamPower() {
    this.ram?.classList.add("is-seated");
    this.audio?.clickSnap?.();
  }

  inspectFanCable() {
    this.root.querySelector('[data-part="fan-cable"]')?.classList.add("is-hot");
    this.audio?.click?.();
  }

  fixFanCable() {
    this.root.querySelector('[data-part="fan-cable"]')?.classList.add("is-fixed");
    this.audio?.snap?.();
  }

  powerOn() {
    this.powerState = "booting";
    if (this.screen) {
      this.screen.textContent = "POST…";
      this.screen.classList.remove("is-dark");
    }
    this.fan?.classList.add("is-spinning");
    clearTimeout(this.bootTimer);
    this.bootTimer = window.setTimeout(() => {
      if (this.powerState !== "booting" || this.disposed) return;
      this.powerState = "on";
      if (this.screen) this.screen.textContent = "TechPro Workstation";
      this.callbacks.onBooted?.();
    }, 1500);
  }

  powerFault() {
    clearTimeout(this.bootTimer);
    this.powerState = "fault";
    if (this.screen) {
      this.screen.textContent = "No signal";
      this.screen.classList.add("is-dark");
    }
    this.fan?.classList.remove("is-spinning");
    this.callbacks.onPowerFault?.();
  }

  seatCpu() {
    this.cpuSeated = true;
    const cpu = this.root.querySelector('[data-part="cpu"]');
    cpu?.classList.add("is-done");
    cpu?.classList.remove("is-selected");
    cpu?.style.removeProperty("rotate");
    const socket = this.root.querySelector('[data-drop="socket"]');
    if (socket && !socket.querySelector(".bench2d-chip")) {
      const chip = document.createElement("span");
      chip.className = "bench2d-chip";
      chip.setAttribute("aria-hidden", "true");
      socket.append(chip);
    }
    this.audio?.snap?.();
  }

  seatRamReady() {
    this.ramPlaced = true;
    const ram = this.root.querySelector('[data-part="ram"]');
    ram?.classList.add("is-done");
    ram?.classList.remove("is-selected");
    ram?.style.removeProperty("rotate");
    const slot = this.root.querySelector('[data-drop="ram-slot"]');
    if (slot && !slot.querySelector(".bench2d-stick")) {
      const stick = document.createElement("span");
      stick.className = "bench2d-stick";
      stick.setAttribute("aria-hidden", "true");
      slot.append(stick);
    }
    this.audio?.drop?.();
  }

  startSeat() {
    if (!this.ramPlaced || this.ramSeated || this.seat) return;
    this.seat = { pressure: 0, balance: 0, elapsed: 0, tiltTime: 0 };
    this.root.querySelector('[data-part="ram"]')?.classList.add("is-seating");
    this.audio?.paste?.();
    this.callbacks.onSeatStart?.();
    this.seatTimer = window.setInterval(() => {
      if (!this.seat || this.disposed) return;
      const dt = 0.05;
      this.seat.elapsed += dt;
      this.seat.pressure = Math.min(1.15, this.seat.pressure + dt * 0.42);
      this.seat.balance += (Math.sin(this.seat.elapsed * 2.6) * 0.38 + Math.sin(this.seat.elapsed * 5.1) * 0.16) * dt;
      this.seat.balance = Math.max(-0.9, Math.min(0.9, this.seat.balance));
      if (Math.abs(this.seat.balance) > 0.44) this.seat.tiltTime += dt;
      else this.seat.tiltTime = Math.max(0, this.seat.tiltTime - dt * 2);
      this.callbacks.onSeatProgress?.({
        pressure: this.seat.pressure,
        balance: this.seat.balance,
        tilt: this.seat.tiltTime
      });
    }, 50);
  }

  nudgeSeat(dx) {
    if (!this.seat) return;
    this.seat.balance = Math.max(-0.9, Math.min(0.9, this.seat.balance - dx * 0.0022));
  }

  finishSeat() {
    if (!this.seat) return;
    const seat = this.seat;
    this.seat = null;
    clearInterval(this.seatTimer);
    this.root.querySelector('[data-part="ram"]')?.classList.remove("is-seating");
    const balanced = Math.abs(seat.balance) < 0.36 && seat.tiltTime < 0.45;
    const pressure = seat.pressure;
    const ok = pressure >= 0.65 && pressure <= 0.9 && balanced;
    if (ok) {
      this.ramSeated = true;
      this.root.querySelector('[data-part="ram"]')?.classList.add("is-seated");
      this.audio?.snap?.();
    } else {
      this.audio?.error?.();
    }
    this.callbacks.onSeatResult?.({ ok, pressure, balanced, overpressure: pressure > 0.9, underpressure: pressure < 0.65 });
  }

  clearSeat() {
    if (this.seatTimer) clearInterval(this.seatTimer);
    this.seatTimer = null;
    this.seat = null;
  }

  reject() {
    this.root.querySelector('[data-part="cpu"]')?.classList.remove("is-seated");
    this.root.querySelector('[data-part="ram"]')?.classList.remove("is-placed");
  }

  dispose() {
    this.disposed = true;
    this.clearSeat();
    clearTimeout(this.bootTimer);
    this.input?.destroy();
    if (this.container) this.container.innerHTML = "";
  }
}

/* ==========================================================================
   One controller for every pointer, touch, mouse and keyboard input.
   ========================================================================== */
class BenchInput {
  constructor(view) {
    this.view = view;
    this.press = null;
    this.dragging = null;
    this.selected = null;
    this.last = "ready";
    this.watchdog = null;
    this.handlers = {
      down: (event) => this.onDown(event),
      move: (event) => this.onMove(event),
      up: (event) => this.onUp(event),
      cancel: (event) => this.onCancel(event),
      cancelAll: () => this.cancelAll("window"),
      visibility: () => { if (document.hidden) this.cancelAll("hidden"); },
      key: (event) => this.onKey(event)
    };
  }

  bind(root) {
    this.root = root;
    root.addEventListener("pointerdown", this.handlers.down);
    root.addEventListener("keydown", this.handlers.key);
    window.addEventListener("pointermove", this.handlers.move, { passive: false });
    window.addEventListener("pointerup", this.handlers.up);
    window.addEventListener("pointercancel", this.handlers.cancel);
    window.addEventListener("blur", this.handlers.cancelAll);
    window.addEventListener("orientationchange", this.handlers.cancelAll);
    document.addEventListener("visibilitychange", this.handlers.visibility);
  }

  setLast(value) {
    this.last = value;
  }

  onDown(event) {
    if (event.button !== undefined && event.button > 0) return;
    const el = event.target.closest?.("[data-part]");
    if (!el || !this.root.contains(el) || el.hidden) return;
    const part = el.dataset.part;
    event.preventDefault();
    try { this.root.setPointerCapture(event.pointerId); } catch { /* capture is optional */ }
    this.view.pointerDown(part, event);
    this.event = event;
    this.view.renderDebug();
    clearTimeout(this.watchdog);
    this.watchdog = window.setTimeout(() => this.cancelAll("watchdog"), 4000);
  }

  onMove(event) {
    if (!this.press) return;
    if (this.dragging) {
      const dx = event.clientX - this.dragging.x;
      const dy = event.clientY - this.dragging.y;
      this.dragging.el.style.setProperty("--drag-x", `${dx}px`);
      this.dragging.el.style.setProperty("--drag-y", `${dy}px`);
      if (event.cancelable) event.preventDefault();
    }
    this.view.pointerMove(event);
    this.view.renderDebug();
  }

  onUp(event) {
    clearTimeout(this.watchdog);
    this.view.pointerUp(event);
    try { this.root.releasePointerCapture(event.pointerId); } catch { /* ignore */ }
    this.event = null;
    this.view.renderDebug();
  }

  onCancel() {
    this.cancelAll("pointercancel");
  }

  cancelAll(reason) {
    clearTimeout(this.watchdog);
    this.press = null;
    this.dragging = null;
    this.view.pointerCancel(reason);
  }

  onKey(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    const el = event.target.closest?.("[data-part]");
    if (!el || el.hidden) return;
    event.preventDefault();
    this.view.tap(el.dataset.part, el);
    this.view.renderDebug();
  }

  destroy() {
    clearTimeout(this.watchdog);
    const root = this.root;
    if (!root) return;
    root.removeEventListener("pointerdown", this.handlers.down);
    root.removeEventListener("keydown", this.handlers.key);
    window.removeEventListener("pointermove", this.handlers.move);
    window.removeEventListener("pointerup", this.handlers.up);
    window.removeEventListener("pointercancel", this.handlers.cancel);
    window.removeEventListener("blur", this.handlers.cancelAll);
    window.removeEventListener("orientationchange", this.handlers.cancelAll);
    document.removeEventListener("visibilitychange", this.handlers.visibility);
  }
}

export { Bench2D as Fallback2D };
export default Bench2D;
