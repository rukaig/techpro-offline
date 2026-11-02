/* ==========================================================================
   PC Lab 2D compatibility bench.
   A DOM version of the same physical lesson for phones, school tablets and
   browsers without WebGL. It keeps the same actions, drag targets and
   press-and-hold seating check as the 3D scene.
   ========================================================================== */

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function rectCenter(el) {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, rect };
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export class Fallback2D {
  constructor({ container, theme, settings = {}, audio, callbacks = {} }) {
    this.container = container;
    this.theme = theme;
    this.settings = settings;
    this.audio = audio;
    this.callbacks = callbacks;
    this.level = "safety";
    this.leverOpen = false;
    this.clipsOpen = false;
    this.cpuRotation = 270;
    this.ramRotation = 180;
    this.cpuSeated = false;
    this.ramPlaced = false;
    this.ramSeated = false;
    this.powerState = "off";
    this.seat = null;
    this.seatTimer = null;
    this.bootTimer = null;
    this.drag = null;
    this.suppressClick = false;
    this.disposed = false;
    this.build();
    this.setTheme(theme);
    this.setLevel("safety", { instant: true });
  }

  build() {
    this.container.innerHTML = `
      <div class="fb2d" data-fb2d>
        <div class="fb2d-bench" data-bench>
          <div class="fb2d-monitor" data-target="monitor">
            <div class="fb2d-screen" data-screen><span>Bench session ready</span></div>
            <span class="fb2d-caption">Monitor</span>
          </div>

          <div class="fb2d-case" data-target="case">
            <span class="fb2d-case-label">CASE</span>
            <button class="fb2d-power" type="button" data-part="power" aria-label="Case power button"></button>
            <button class="fb2d-screw fb2d-screw-a" type="button" data-drag="case-screw" data-part="case-screw" aria-label="Case-panel screw 1"></button>
            <button class="fb2d-screw fb2d-screw-b" type="button" data-drag="case-screw" data-part="case-screw" aria-label="Case-panel screw 2"></button>
            <button class="fb2d-screw fb2d-screw-c" type="button" data-drag="case-screw" data-part="case-screw" aria-label="Case-panel screw 3"></button>
            <button class="fb2d-screw fb2d-screw-d" type="button" data-drag="case-screw" data-part="case-screw" aria-label="Case-panel screw 4"></button>
            <span class="fb2d-fan" data-fan aria-hidden="true">✳</span>
            <div class="fb2d-fan-cable" data-part="fan-cable" data-target="fan-cable" role="button" tabindex="0" aria-label="Fan cable connector">FAN</div>
          </div>
          <div class="fb2d-parts-tray" data-parts-tray aria-label="Parts tray">PARTS TRAY</div>

          <div class="fb2d-board" data-target="board">
            <span class="fb2d-board-label">MOTHERBOARD</span>
            <div class="fb2d-socket" data-target="socket">
              <span class="fb2d-triangle">▴</span>
            </div>
            <div class="fb2d-ram-slots" data-part="clips" data-target="ram-slot" role="button" tabindex="0" aria-label="RAM slots and clips">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="fb2d-lever" data-part="lever" role="button" tabindex="0" aria-label="CPU socket lever"></div>
            <div class="fb2d-cooler" data-part="cooler" role="button" tabindex="0" aria-label="CPU cooler">COOLER</div>
          </div>

          <div class="fb2d-psu" data-part="psu" role="button" tabindex="0" aria-label="Power supply">PSU</div>

          <div class="fb2d-character" data-target="wrist">
            <span class="fb2d-head"></span>
            <span class="fb2d-body"></span>
            <span class="fb2d-bracelet" data-part="bracelet" role="button" tabindex="0" aria-label="Metal bracelet"></span>
            <span class="fb2d-worn-strap" data-worn-strap aria-hidden="true"></span>
          </div>

          <button class="fb2d-part fb2d-cpu" type="button" data-drag="cpu" data-part="cpu" aria-label="CPU">CPU</button>
          <button class="fb2d-part fb2d-ram" type="button" data-drag="ram" data-part="ram" aria-label="RAM module">RAM</button>

          <button class="fb2d-part fb2d-strap" type="button" data-drag="strap" data-part="strap" aria-label="Antistatic wrist strap">STRAP</button>
          <button class="fb2d-part fb2d-camera" type="button" data-drag="camera" data-part="camera" aria-label="Reference camera">CAM</button>
          <button class="fb2d-part fb2d-cloth" type="button" data-part="clean-cloth" aria-label="Blue cleaning cloth">WIPE</button>
          <button class="fb2d-part fb2d-tools" type="button" data-part="tools" aria-label="Tool kit">TOOLS</button>
          <button class="fb2d-part fb2d-bins" type="button" data-drag="bins" data-part="bins" aria-label="Parts bins">BINS</button>
          <div class="fb2d-strip" data-strip>
            <span class="fb2d-plug" data-drag="plug" data-part="plug" role="button" tabindex="0" aria-label="Power plug">PLUG</span>
          </div>

          <p class="fb2d-note" data-note>Tap or drag the highlighted part.</p>
        </div>
      </div>
    `;
    this.root = this.container.querySelector("[data-fb2d]");
    this.bench = this.root.querySelector("[data-bench]");
    this.note = this.root.querySelector("[data-note]");
    this.screen = this.root.querySelector("[data-screen]");
    this.fan = this.root.querySelector("[data-fan]");
    this.cpu = this.root.querySelector('[data-part="cpu"]');
    this.ram = this.root.querySelector('[data-part="ram"]');
    this.cpuHome = null;
    this.ramHome = null;

    this.root.addEventListener("click", (event) => this.onClick(event));
    this.root.addEventListener("pointerdown", (event) => this.onPointerDown(event));
    this.root.addEventListener("pointermove", (event) => this.onPointerMove(event));
    this.root.addEventListener("pointerup", (event) => this.onPointerUp(event));
    this.root.addEventListener("pointercancel", (event) => this.onPointerUp(event));
    this.root.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        const part = event.target.closest("[data-part]");
        if (part) {
          event.preventDefault();
          this.callbacks.onClick?.(this.actionFor(part.dataset.part));
        }
      }
    });
    this.root.querySelector("[data-parts-tray]").hidden = level === "safety";
    requestAnimationFrame(() => {
      this.cpuHome = { x: this.cpu.offsetLeft, y: this.cpu.offsetTop };
      this.ramHome = { x: this.ram.offsetLeft, y: this.ram.offsetTop };
    });
  }

  actionFor(part) {
    return {
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
      plug: "plug"
    }[part] || part;
  }

  onClick(event) {
    if (this.disposed) return;
    if (this.suppressClick) {
      this.suppressClick = false;
      return;
    }
    const part = event.target.closest("[data-part]");
    if (!part) return;
    if (part.dataset.drag) {
      const dragPart = part.dataset.drag;
      if (dragPart === "plug") {
        this.callbacks.onClick?.("plug");
        return;
      }
      if (dragPart === "case-screw") {
        if (!this.callbacks.canDrag?.(dragPart)) {
          this.callbacks.onBlocked?.(dragPart);
          return;
        }
        part.classList.add("is-done");
        this.root.querySelector("[data-parts-tray]").append(part);
        this.callbacks.onPartDrop?.({ part: dragPart, valid: true });
        return;
      }
      if (!this.callbacks.canDrag?.(dragPart)) {
        this.callbacks.onBlocked?.(dragPart);
        return;
      }
      return;
    }
    if (part.dataset.part === "ram" && this.ramPlaced && !this.ramSeated) {
      this.startSeat();
      return;
    }
    this.audio?.click();
    this.callbacks.onClick?.(this.actionFor(part.dataset.part));
  }

  onPointerDown(event) {
    if (this.disposed) return;
    const part = event.target.closest("[data-drag], [data-part=\"lever\"]");
    if (!part) return;
    const dragPart = part.dataset.drag || part.dataset.part;
    if (!this.callbacks.canDrag?.(dragPart)) {
      this.callbacks.onBlocked?.(dragPart);
      return;
    }
    event.preventDefault();
    const center = rectCenter(part);
    this.drag = {
      part,
      dragPart,
      closing: dragPart === "lever" && this.leverOpen,
      startX: event.clientX,
      startY: event.clientY,
      moved: 0,
      home: { left: part.offsetLeft, top: part.offsetTop },
      center
    };
    part.setPointerCapture?.(event.pointerId);
    part.classList.add("is-dragging");
    this.audio?.pick();
    this.callbacks.onPick?.(dragPart);
  }

  onPointerMove(event) {
    if (!this.drag) return;
    const dx = event.clientX - this.drag.startX;
    const dy = event.clientY - this.drag.startY;
    this.drag.moved = Math.max(this.drag.moved, Math.hypot(dx, dy));
    this.drag.part.style.transform = `translate(${dx}px, ${dy}px)`;
    this.drag.part.style.zIndex = "30";
    if (this.drag.dragPart === "lever") {
      const progress = this.drag.closing
        ? Math.max(0, Math.min(1, 1 - dy / 52))
        : Math.max(0, Math.min(1, -dy / 52));
      this.drag.progress = progress;
      this.drag.part.style.transform = `translate(${dx}px, ${dy}px) rotate(${-8 + progress * 26}deg)`;
    }
  }

  onPointerUp(event) {
    if (!this.drag) return;
    const drag = this.drag;
    this.drag = null;
    const center = rectCenter(drag.part);
    this.suppressClick = drag.dragPart === "lever"
      || drag.dragPart === "case-screw"
      || drag.dragPart === "plug"
      || drag.moved >= 8;
    if (this.suppressClick) window.setTimeout(() => { this.suppressClick = false; }, 0);
    drag.part.classList.remove("is-dragging");
    drag.part.style.transform = "";
    drag.part.style.zIndex = "";
    if (drag.dragPart === "lever") {
      if (drag.moved < 8) {
        this.callbacks.onClick?.("lever");
        return;
      }
      const complete = drag.closing ? drag.progress <= 0.28 : drag.progress >= 0.72;
      if (complete) this.callbacks.onClick?.("lever");
      else this.callbacks.onLeverDragIncomplete?.();
      return;
    }
    if (drag.moved < 8) {
      if (drag.dragPart === "plug") this.callbacks.onClick?.("plug");
      return;
    }
    if (drag.dragPart === "cpu") {
      const socket = rectCenter(this.root.querySelector('[data-target="socket"]'));
      const near = distance(center, socket) < this.dropRadius();
      if (!near) {
        this.resetPart(drag.part, drag.home);
        this.callbacks.onPartDrop?.({ part: "cpu", valid: false, reason: "target", speed: 1 });
        return;
      }
      if (!this.leverOpen) {
        this.resetPart(drag.part, drag.home);
        this.callbacks.onPartDrop?.({ part: "cpu", valid: false, reason: "lever", speed: 1 });
        return;
      }
      if (this.cpuRotation % 360 !== 0) {
        this.resetPart(drag.part, drag.home);
        this.callbacks.onPartDrop?.({ part: "cpu", valid: false, reason: "orientation", speed: 1 });
        return;
      }
      this.callbacks.onPartDrop?.({ part: "cpu", valid: true, speed: 1, height: 0.1 });
      return;
    }
    if (drag.dragPart === "ram") {
      const slot = rectCenter(this.root.querySelector('[data-target="ram-slot"]'));
      const near = distance(center, slot) < this.dropRadius();
      if (!near) {
        this.resetPart(drag.part, drag.home);
        this.callbacks.onPartDrop?.({ part: "ram", valid: false, reason: "target", speed: 1 });
        return;
      }
      if (!this.clipsOpen) {
        this.resetPart(drag.part, drag.home);
        this.callbacks.onPartDrop?.({ part: "ram", valid: false, reason: "clips", speed: 1 });
        return;
      }
      if (this.ramRotation % 360 !== 0) {
        this.resetPart(drag.part, drag.home);
        this.callbacks.onPartDrop?.({ part: "ram", valid: false, reason: "orientation", speed: 1 });
        return;
      }
      this.callbacks.onPartDrop?.({ part: "ram", valid: true, speed: 1 });
      return;
    }
    if (drag.dragPart === "case-screw") {
      const tray = rectCenter(this.root.querySelector("[data-parts-tray]"));
      const valid = distance(center, tray) < this.dropRadius();
      if (valid) {
        drag.part.classList.add("is-done");
        this.root.querySelector("[data-parts-tray]").append(drag.part);
      } else {
        this.resetPart(drag.part, drag.home);
      }
      this.callbacks.onPartDrop?.({ part: "case-screw", valid });
      return;
    }
    if (drag.dragPart === "strap") {
      const wrist = rectCenter(this.root.querySelector('[data-target="wrist"]'));
      const valid = distance(center, wrist) < this.dropRadius();
      this.resetPart(drag.part, drag.home);
      this.callbacks.onSafetyDrop?.({ action: "strap", valid });
      return;
    }
    if (drag.dragPart === "bins") {
      const valid = true;
      this.resetPart(drag.part, drag.home);
      this.callbacks.onSafetyDrop?.({ action: "bins", valid });
      return;
    }
    if (drag.dragPart === "camera") {
      const monitor = rectCenter(this.root.querySelector('[data-target="monitor"]'));
      const valid = distance(center, monitor) < this.dropRadius();
      this.resetPart(drag.part, drag.home);
      this.callbacks.onSafetyDrop?.({ action: "camera", valid });
      return;
    }
    this.resetPart(drag.part, drag.home);
  }

  resetPart(part, home) {
    part.style.left = `${home.left}px`;
    part.style.top = `${home.top}px`;
    part.style.transform = "";
  }

  dropRadius() {
    return Math.max(130, Math.min(190, this.root.getBoundingClientRect().width * 0.22));
  }

  setTheme(theme) {
    this.theme = theme;
    if (!this.root) return;
    const p = theme.palette;
    const hex = (value) => `#${(value || 0).toString(16).padStart(6, "0")}`;
    this.root.style.setProperty("--fb-bg", hex(p.bg));
    this.root.style.setProperty("--fb-surface", theme.css.surface || "#fffdf8");
    this.root.style.setProperty("--fb-accent", hex(p.accent));
    this.root.style.setProperty("--fb-accent-2", hex(p.accent2));
    this.root.style.setProperty("--fb-case", hex(p.case));
    this.root.style.setProperty("--fb-metal", hex(p.metal));
    this.root.style.setProperty("--fb-pcb", hex(p.pcb));
    this.root.dataset.theme = theme.id;
    this.root.dataset.dark = String(Boolean(theme.flags.dark));
  }

  setSettings(settings) {
    this.settings = settings;
  }

  setLevel(level, { instant = false } = {}) {
    this.level = level;
    this.leverOpen = false;
    this.clipsOpen = false;
    this.cpuRotation = 270;
    this.ramRotation = 180;
    this.cpuSeated = false;
    this.ramPlaced = false;
    this.ramSeated = false;
    this.powerState = "off";
    this.clearSeat();
    clearTimeout(this.bootTimer);
    if (!this.root) return;
    this.root.dataset.level = level;
    this.root.classList.toggle("is-instant", Boolean(instant));
    this.root.querySelectorAll("[data-part], [data-target]").forEach((el) => {
      el.classList.remove("is-active", "is-done", "is-hot", "is-fixed");
    });
    this.root.querySelector("[data-worn-strap]").classList.remove("is-on");
    this.root.querySelector('[data-part="bracelet"]').classList.remove("is-gone");
    this.root.querySelector('[data-part="strap"]').classList.remove("is-gone");
    this.root.querySelector('[data-part="bins"]').classList.remove("is-done");
    this.root.querySelector('[data-part="camera"]').classList.remove("is-done");
    this.root.querySelector('[data-part="tools"]').classList.remove("is-done");
    this.root.querySelector('[data-part="bins"]').classList.toggle("is-hidden", level === "safety");
    this.root.querySelector('[data-part="clean-cloth"]').classList.remove("is-hidden", "is-hot");
    this.root.querySelector('[data-part="plug"]').classList.remove("is-done");
    this.root.querySelector('[data-part="fan-cable"]').classList.remove("is-fixed");
    this.root.querySelector('[data-part="cooler"]').classList.remove("is-done");
    this.root.querySelector('[data-part="psu"]').classList.remove("is-done");
    this.root.querySelector('[data-part="clips"]').classList.remove("is-open");
    this.root.querySelector('[data-part="lever"]').classList.remove("is-open");
    const casePanel = this.root.querySelector(".fb2d-case");
    this.root.querySelectorAll(".fb2d-screw").forEach((screw) => {
      casePanel.append(screw);
      screw.classList.remove("is-done");
      screw.style.left = "";
      screw.style.top = "";
      screw.style.transform = "";
      screw.style.zIndex = "";
      screw.hidden = level !== "cpu";
    });
    casePanel.classList.remove("is-open");
    this.cpu.classList.remove("is-hidden", "is-seated");
    this.ram.classList.remove("is-hidden", "is-seated", "is-placed");
    this.cpu.style.left = "";
    this.cpu.style.top = "";
    this.ram.style.left = "";
    this.ram.style.top = "";
    this.cpu.style.transform = "";
    this.ram.style.transform = "";
    this.cpu.style.rotate = "";
    this.ram.style.rotate = "";
    this.screen.textContent = level === "safety" ? "Bench session ready" : "No signal";
    this.screen.classList.toggle("is-dark", level !== "safety");
    this.fan.classList.remove("is-spinning");
    this.note.textContent = "Follow the highlighted instruction. Click or drag the named item.";

    if (level === "cpu") {
      this.cpu.classList.remove("is-hidden");
      this.ram.classList.add("is-hidden");
      this.root.querySelector('[data-part="cooler"]').classList.add("is-hidden");
    } else if (level === "ram") {
      this.cpu.classList.add("is-hidden");
      this.ram.classList.remove("is-hidden");
      this.root.querySelector('[data-part="cooler"]').classList.add("is-done");
    } else if (level === "power") {
      this.cpu.classList.add("is-hidden");
      this.ram.classList.remove("is-hidden");
      this.ram.classList.add("is-placed");
      this.ramSeated = true;
      this.root.querySelector('[data-part="cooler"]').classList.add("is-done");
      this.root.querySelector('[data-part="fan-cable"]').classList.remove("is-hidden");
    }
  }

  focus() { /* camera presets are a 3D affordance */ }

  highlight(target) {
    this.root.querySelectorAll(".is-hot").forEach((el) => el.classList.remove("is-hot"));
    if (!target) return;
    const el = target === "case-screw"
      ? this.root.querySelector(".fb2d-screw:not(.is-done)")
      : this.root.querySelector(`[data-part="${target}"]`)
        || this.root.querySelector(`[data-target="${target}"]`);
    el?.classList.add("is-hot");
  }

  rotateSelected() {
    if (this.level === "cpu" && !this.cpuSeated) {
      this.cpuRotation = (this.cpuRotation + 90) % 360;
      this.cpu.style.rotate = `${this.cpuRotation}deg`;
      this.audio?.click();
      this.callbacks.onRotate?.({ part: "cpu", aligned: this.cpuRotation === 0 });
    } else if (this.level === "ram" && !this.ramPlaced) {
      this.ramRotation = (this.ramRotation + 180) % 360;
      this.ram.style.rotate = `${this.ramRotation}deg`;
      this.audio?.click();
      this.callbacks.onRotate?.({ part: "ram", aligned: this.ramRotation === 0 });
    }
  }

  setLever(open) {
    this.leverOpen = Boolean(open);
    this.root.querySelector('[data-part="lever"]').classList.toggle("is-open", this.leverOpen);
    this.audio?.clickSnap();
  }

  openCasePanel() {
    this.root.querySelector(".fb2d-case")?.classList.add("is-open");
  }

  applyPaste() {
    this.cpu.classList.add("has-paste");
    this.audio?.paste();
  }

  showCoolerReady() {
    const cooler = this.root.querySelector('[data-part="cooler"]');
    cooler.classList.remove("is-hidden");
    cooler.classList.add("is-ready");
  }

  mountCooler() {
    const cooler = this.root.querySelector('[data-part="cooler"]');
    cooler.classList.add("is-done");
    this.audio?.snap();
  }

  openRamClips() {
    this.clipsOpen = true;
    this.root.querySelector('[data-part="clips"]').classList.add("is-open");
    this.audio?.clickSnap();
  }

  closeRamClips() {
    this.clipsOpen = false;
    this.root.querySelector('[data-part="clips"]').classList.remove("is-open");
    this.audio?.clickSnap();
  }

  shutdownSafety() {
    this.powerState = "off";
    this.screen.textContent = "Powered down";
    this.screen.classList.add("is-dark");
    this.fan.classList.remove("is-spinning");
    this.audio?.clickSnap();
  }

  unplugPower() {
    this.root.querySelector('[data-part="plug"]').classList.add("is-done");
    this.audio?.clickSnap();
  }

  disconnectPeripheral() {
    this.root.querySelector('[data-part="camera"]').classList.add("is-done");
    this.audio?.clickSnap();
  }

  removeBracelet() {
    this.root.querySelector('[data-part="bracelet"]').classList.add("is-gone");
    this.audio?.clickSnap();
  }

  prepareTools() {
    this.root.querySelector('[data-part="tools"]').classList.add("is-done");
    this.audio?.clickSnap();
  }

  cleanBench() {
    this.root.querySelector('[data-part="clean-cloth"]').classList.add("is-hidden");
    this.audio?.clickSnap();
  }

  arrangeBench() {
    this.root.querySelector('[data-part="tools"]').classList.add("is-done");
    const bins = this.root.querySelector('[data-part="bins"]');
    bins.classList.remove("is-hidden");
    bins.classList.add("is-done");
    this.root.querySelector("[data-parts-tray]").hidden = false;
    this.audio?.clickSnap();
  }

  prepareBins() {
    this.root.querySelector('[data-part="bins"]').classList.add("is-done");
    this.audio?.clickSnap();
  }

  wearStrap() {
    this.root.querySelector('[data-part="strap"]').classList.add("is-gone");
    this.root.querySelector("[data-worn-strap]").classList.add("is-on");
    this.root.querySelector('[data-part="bracelet"]').classList.add("is-gone");
    this.audio?.clickSnap();
  }

  documentConnections() {
    this.root.querySelector('[data-part="camera"]').classList.add("is-done");
    this.screen.textContent = "Connections photographed";
    this.screen.classList.remove("is-dark");
    this.audio?.clickSnap();
  }

  checkPsu() {
    this.root.querySelector('[data-part="psu"]').classList.add("is-done");
    this.audio?.clickSnap();
  }

  checkMonitorCable() {
    this.root.querySelector('[data-part="camera"]').classList.add("is-done");
    this.audio?.clickSnap();
  }

  reseatRamPower() {
    this.ram.classList.add("is-seated");
    this.audio?.clickSnap();
  }

  inspectFanCable() {
    this.root.querySelector('[data-part="fan-cable"]').classList.add("is-hot");
    this.audio?.click();
  }

  fixFanCable() {
    this.root.querySelector('[data-part="fan-cable"]').classList.add("is-fixed");
    this.audio?.snap();
  }

  powerOn() {
    this.powerState = "booting";
    this.screen.textContent = "POST…";
    this.screen.classList.remove("is-dark");
    this.fan.classList.add("is-spinning");
    clearTimeout(this.bootTimer);
    this.bootTimer = setTimeout(() => {
      if (this.powerState !== "booting") return;
      this.powerState = "on";
      this.screen.textContent = "TechPro Workstation";
      this.callbacks.onBooted?.();
    }, 1500);
  }

  powerFault() {
    clearTimeout(this.bootTimer);
    this.powerState = "fault";
    this.screen.textContent = "No signal";
    this.screen.classList.add("is-dark");
    this.fan.classList.remove("is-spinning");
    this.callbacks.onPowerFault?.();
  }

  seatCpu() {
    this.cpuSeated = true;
    this.cpu.classList.add("is-seated");
    this.audio?.snap();
  }

  seatRamReady() {
    this.ramPlaced = true;
    this.ram.classList.add("is-placed");
    this.audio?.drop();
  }

  startSeat() {
    if (!this.ramPlaced || this.ramSeated || this.seat) return;
    this.seat = { pressure: 0, balance: 0, elapsed: 0, tiltTime: 0 };
    this.ram.classList.add("is-seating");
    this.audio?.paste();
    this.callbacks.onSeatStart?.();
    this.seatTimer = setInterval(() => {
      if (!this.seat) return;
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
    this.ram.classList.remove("is-seating");
    const balanced = Math.abs(seat.balance) < 0.36 && seat.tiltTime < 0.45;
    const pressure = seat.pressure;
    const ok = pressure >= 0.65 && pressure <= 0.9 && balanced;
    if (ok) {
      this.ramSeated = true;
      this.ram.classList.add("is-seated");
      this.audio?.snap();
    } else {
      this.audio?.error();
    }
    this.callbacks.onSeatResult?.({
      ok, pressure, balanced,
      overpressure: pressure > 0.9,
      underpressure: pressure < 0.65
    });
  }

  clearSeat() {
    if (this.seatTimer) clearInterval(this.seatTimer);
    this.seatTimer = null;
    this.seat = null;
  }

  reject() {
    this.cpu.classList.remove("is-seated");
    this.ram.classList.remove("is-placed");
  }

  dispose() {
    this.disposed = true;
    this.clearSeat();
    clearTimeout(this.bootTimer);
    if (this.container) this.container.innerHTML = "";
  }
}
