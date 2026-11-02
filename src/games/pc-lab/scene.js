import * as THREE from "three";
import {
  createBench, createCase, createMotherboard, createCpu, createCooler, createRam,
  createPsu, createMonitor, createKeyboard, createMouse, createCharacter,
  createWristStrap, createCamera, createBins, createPowerStrip, createPlug,
  createPeripheralCable, createToolKit, createFlashlight, createPartsTray,
  makeLabel, makeBootTexture, makePcbTexture, M, markInteractive
} from "./models.js";
import { Tweens, ease } from "../engine/tween.js";
import { FpsGuard, resolveQuality } from "../engine/quality.js";

const PRESETS = {
  overview: { theta: 0.36, phi: 1.04, radius: 9.2, target: [0, 1.65, 0] },
  top: { theta: 0.02, phi: 0.2, radius: 9.6, target: [-1.6, 1.2, 0.2] },
  side: { theta: 1.18, phi: 1.12, radius: 8.4, target: [0.6, 1.6, 0] },
  back: { theta: Math.PI + 0.45, phi: 1.16, radius: 9.4, target: [0.8, 1.7, -0.4] },
  safety: { theta: 0.32, phi: 1.02, radius: 8.8, target: [0, 1.55, 0] },
  cpu: { theta: 0.12, phi: 0.9, radius: 4.5, target: [-1.8, 1.3, 0.25] },
  ram: { theta: 0.14, phi: 0.84, radius: 4.2, target: [-1.7, 1.28, 0.3] },
  power: { theta: 0.82, phi: 1.05, radius: 5.6, target: [2.0, 1.75, -0.3] },
  case: { theta: 0.36, phi: 1.0, radius: 7.8, target: [0.35, 1.5, 0.1] }
};

export class PcScene {
  constructor({
    container,
    theme,
    settings = {},
    audio,
    particles,
    callbacks = {},
    onQuality = null
  }) {
    this.container = container;
    this.theme = theme;
    this.settings = settings;
    this.audio = audio;
    this.particles = particles;
    this.callbacks = callbacks;
    this.onQuality = onQuality;
    this.tweens = new Tweens();
    this.quality = resolveQuality(settings.quality || "auto");
    this.motionReduced = Boolean(theme.flags.reduced);
    this.level = "safety";
    this.step = "";
    this.drag = null;
    this.leverDrag = null;
    this.pointers = new Map();
    this.orbitPointer = null;
    this.pinch = null;
    this.lastTap = 0;
    this.cameraState = { theta: 0.36, phi: 1.04, radius: 9.2 };
    this.cameraTarget = new THREE.Vector3(0, 1.65, 0);
    this.cameraGoal = null;
    this.shake = 0;
    this.time = 0;
    this.powerState = "off";
    this.powerProgress = 0;
    this.faultFixed = false;
    this.safetyPoweredOff = false;
    this.peripheralDisconnected = false;
    this.pasteApplied = false;
    this.qualitySetting = settings.quality || "auto";
    this.leverOpen = false;
    this.clipsOpen = false;
    this.cpuSeated = false;
    this.ramPlaced = false;
    this.ramSeated = false;
    this.seat = null;
    this.highlighted = null;
    this.exploded = false;
    this.xray = false;
    this.edgeMaterials = [];
    this.themeMaterials = [];
    this.home = {};
    this.interactiveObjects = [];
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.lastFrame = performance.now();
    this.fpsGuard = new FpsGuard({
      onDowngrade: (level, fps) => this.downgrade(level, fps)
    });
    this.disposed = false;

    this.build();
    this.bindEvents();
    this.setTheme(theme);
    this.setLevel("safety", { instant: true });
    this.resize();
    this.loop = this.loop.bind(this);
    this.frame = requestAnimationFrame(this.loop);
  }

  build() {
    const renderer = new THREE.WebGLRenderer({
      antialias: this.quality.antialias,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = this.quality.shadows;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setPixelRatio(this.quality.dpr);
    renderer.domElement.className = "pc3d-canvas";
    renderer.domElement.setAttribute("aria-label", "3D technician workbench");
    renderer.domElement.tabIndex = 0;
    this.container.appendChild(renderer.domElement);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(this.theme.palette.bg);
    scene.fog = new THREE.Fog(this.theme.palette.fog, 16, 30);
    this.scene = scene;

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    this.camera = camera;

    const hemi = new THREE.HemisphereLight(0xffffff, 0x4b3a2d, 1.2);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff1dc, 2.1);
    key.position.set(-4, 9, 6);
    key.castShadow = this.quality.shadows;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -7;
    key.shadow.camera.right = 7;
    key.shadow.camera.top = 7;
    key.shadow.camera.bottom = -5;
    key.shadow.bias = -0.0006;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xb9dcff, 0.65);
    fill.position.set(7, 4, -4);
    scene.add(fill);
    const rim = new THREE.SpotLight(this.theme.palette.accent, 22, 12, 0.55, 0.5, 1.4);
    rim.position.set(3.5, 6.5, 2.5);
    rim.target.position.set(0.5, 1.2, 0);
    scene.add(rim, rim.target);
    this.lights = { hemi, key, fill, rim };

    this.grid = new THREE.GridHelper(30, 30, this.theme.palette.accent, this.theme.palette.accent);
    this.grid.position.y = 0.005;
    this.grid.material.opacity = 0.16;
    this.grid.material.transparent = true;
    this.grid.visible = Boolean(this.theme.flags.grid);
    scene.add(this.grid);

    this.bench = createBench(this.theme.palette);
    scene.add(this.bench);

    this.cleaningCloth = new THREE.Group();
    this.cleaningCloth.name = "cleaning-cloth";
    const clothMaterial = M(0x35b9d1, "", { roughness: 0.9 });
    const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.035, 0.38), clothMaterial);
    cloth.rotation.y = -0.3;
    this.cleaningCloth.add(cloth);
    const clothFold = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.012, 0.025),
      M(0xb7f2f5, "", { roughness: 0.8 })
    );
    clothFold.position.y = 0.024;
    clothFold.rotation.y = -0.3;
    this.cleaningCloth.add(clothFold);
    const clothHitTarget = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.3, 0.58),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })
    );
    clothHitTarget.position.y = 0.12;
    this.cleaningCloth.add(clothHitTarget);
    this.cleaningCloth.position.set(-3.55, 1.1, 0.95);
    markInteractive(this.cleaningCloth, { kind: "click", action: "clean-bench" });
    scene.add(this.cleaningCloth);

    this.case = createCase(this.theme.palette);
    this.case.position.set(2.35, 1.03, -0.35);
    scene.add(this.case);
    this.caseScrews = Array.from({ length: 4 }, (_, index) => {
      const screw = new THREE.Group();
      const head = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.11, 0.06, 16),
        M(0xd1d7dc, "", { roughness: 0.38, metalness: 0.55 })
      );
      head.rotation.x = Math.PI / 2;
      screw.add(head);
      const slot = new THREE.Mesh(
        new THREE.BoxGeometry(0.105, 0.016, 0.016),
        M(0x293039, "", { roughness: 0.5, metalness: 0.4 })
      );
      slot.position.z = 0.036;
      screw.add(slot);
      const hitTarget = new THREE.Mesh(
        new THREE.SphereGeometry(0.36, 12, 10),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })
      );
      screw.add(hitTarget);
      const x = index % 2 === 0 ? -0.8 : 0.8;
      const y = index < 2 ? 0.45 : 2.45;
      screw.position.set(x, y, 1.77);
      screw.userData.part = "case-screw";
      screw.userData.screwIndex = index;
      markInteractive(screw, { kind: "part", part: "case-screw" });
      this.case.add(screw);
      return screw;
    });
    this.screwTraySlots = this.caseScrews.map((_, index) =>
      new THREE.Vector3(index % 2 === 0 ? -0.37 : 0.07, 1.33, index < 2 ? 1.38 : 1.72)
    );

    this.tray = createPartsTray(this.theme.palette);
    this.tray.position.set(-1.9, 1.05, 0.25);
    scene.add(this.tray);

    this.monitor = createMonitor(this.theme.palette);
    this.monitor.position.set(-3.65, 2.25, -1.55);
    this.monitor.rotation.y = 0.12;
    scene.add(this.monitor);
    this.setMonitorDesktop();

    this.character = createCharacter(this.theme.palette);
    this.character.position.set(-1.1, 1.02, -2.15);
    this.character.rotation.y = 0.08;
    scene.add(this.character);

    this.motherboard = createMotherboard(this.theme.palette);
    this.motherboard.position.set(-1.95, 1.16, 0.22);
    this.motherboard.rotation.y = 0.02;
    scene.add(this.motherboard);

    this.cpu = createCpu(this.theme.palette);
    this.cpu.position.set(-0.55, 1.18, 1.32);
    this.cpu.rotation.y = Math.PI / 2;
    this.cpu.userData.part = "cpu";
    markInteractive(this.cpu, { kind: "part", part: "cpu" });
    scene.add(this.cpu);

    this.ram = createRam(this.theme.palette);
    this.ram.position.set(0.25, 1.18, 1.35);
    this.ram.rotation.y = Math.PI;
    markInteractive(this.ram, { kind: "part", part: "ram" });
    scene.add(this.ram);

    this.cooler = createCooler(this.theme.palette);
    this.cooler.position.set(-0.58, 0.1, -0.38);
    this.cooler.visible = false;
    markInteractive(this.cooler, { kind: "click", action: "cooler" });
    this.motherboard.add(this.cooler);
    markInteractive(this.motherboard.userData.lever, { kind: "lever", action: "lever" });
    markInteractive(this.motherboard.userData.ramSlots, { kind: "click", action: "clips" });
    this.clipHomes = this.motherboard.userData.ramSlots.children
      .filter((child) => child.name === "ram-clip")
      .map((clip) => ({ clip, position: clip.position.clone(), rotation: clip.rotation.clone() }));

    this.psu = createPsu(this.theme.palette);
    this.psu.position.set(2.4, 1.53, -0.6);
    this.psu.visible = false;
    markInteractive(this.psu, { kind: "click", action: "psu" });
    scene.add(this.psu);

    this.keyboard = createKeyboard(this.theme.palette);
    this.keyboard.position.set(-0.2, 1.07, 1.9);
    this.keyboard.rotation.y = -0.08;
    this.keyboard.visible = false;
    scene.add(this.keyboard);

    this.mouse = createMouse(this.theme.palette);
    this.mouse.position.set(1.05, 1.07, 1.95);
    this.mouse.visible = false;
    scene.add(this.mouse);

    this.strap = createWristStrap(this.theme.palette);
    this.strap.position.set(-3.1, 1.14, 1.55);
    markInteractive(this.strap, { kind: "part", part: "strap" });
    scene.add(this.strap);

    this.cameraProp = createCamera(this.theme.palette);
    this.cameraProp.position.set(-2.55, 1.16, 1.6);
    this.cameraProp.rotation.y = -0.4;
    markInteractive(this.cameraProp, { kind: "part", part: "camera" });
    scene.add(this.cameraProp);

    this.bins = createBins(this.theme.palette);
    this.bins.position.set(1.05, 1.06, -1.5);
    this.bins.rotation.y = 0.2;
    this.bins.visible = false;
    markInteractive(this.bins, { kind: "part", part: "bins" });
    scene.add(this.bins);

    this.powerStrip = createPowerStrip(this.theme.palette);
    this.powerStrip.position.set(3.9, 1.07, 1.3);
    this.powerStrip.rotation.y = -0.5;
    scene.add(this.powerStrip);

    this.plug = createPlug(this.theme.palette);
    this.plug.position.set(3.88, 1.16, 1.32);
    this.plug.rotation.y = -0.5;
    markInteractive(this.plug, { kind: "part", part: "plug" });
    scene.add(this.plug);

    this.peripheralCable = createPeripheralCable(this.theme.palette);
    this.peripheralCable.position.set(-3.45, 2.02, -1.42);
    this.peripheralCable.rotation.y = 0.25;
    markInteractive(this.peripheralCable, { kind: "click", action: "peripheral" });
    scene.add(this.peripheralCable);

    this.toolKit = createToolKit(this.theme.palette);
    this.toolKit.position.set(2.95, 1.08, 1.9);
    this.toolKit.rotation.y = -0.2;
    markInteractive(this.toolKit, { kind: "click", action: "tools" });
    scene.add(this.toolKit);

    this.flashlight = createFlashlight(this.theme.palette);
    this.flashlight.position.set(3.25, 1.2, 1.9);
    this.flashlight.rotation.z = -0.8;
    scene.add(this.flashlight);

    this.buildGhosts();
    this.buildFanCable();
    this.buildOutline(this.bench, this.theme.palette);
    this.buildOutline(this.case, this.theme.palette);
    this.buildOutline(this.motherboard, this.theme.palette);
    this.buildOutline(this.cpu, this.theme.palette);
    this.buildOutline(this.ram, this.theme.palette);

    this.home = {
      cpu: this.cpu.position.clone(),
      ram: this.ram.position.clone(),
      strap: this.strap.position.clone(),
      camera: this.cameraProp.position.clone(),
      bins: this.bins.position.clone(),
      plug: this.plug.position.clone()
    };

    this.interactiveObjects = [
      this.cpu, this.ram, this.strap, this.cameraProp, this.bins, this.plug,
      ...this.caseScrews, this.peripheralCable, this.case.userData.powerHitTarget, this.case.userData.powerButton, this.character.userData.bracelet,
      this.motherboard.userData.lever, this.cooler, this.psu, this.toolKit, this.cleaningCloth
    ];
    this.raycastTargets = [
      this.cpu, this.ram, this.strap, this.cameraProp, this.bins, this.plug,
      ...this.caseScrews, this.peripheralCable, this.case.userData.powerHitTarget, this.case.userData.powerButton, this.case,
      this.character.userData.bracelet, this.motherboard.userData.lever,
      this.motherboard.userData.ramSlots, this.cooler, this.psu, this.toolKit,
      this.fanCable.userData.connector, this.cleaningCloth
    ];
  }

  buildGhosts() {
    const makeGhost = (w, h, d, color) => {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.16, depthWrite: false })
      );
      group.add(mesh);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 })
      );
      group.add(edges);
      group.userData.mesh = mesh;
      group.userData.edges = edges;
      group.visible = false;
      this.scene.add(group);
      return group;
    };
    this.ghostCpu = makeGhost(0.58, 0.03, 0.58, this.theme.palette.accent2);
    this.ghostRam = makeGhost(0.14, 0.06, 1.2, this.theme.palette.accent2);
  }

  buildFanCable() {
    const group = new THREE.Group();
    group.name = "fan-cable";
    const metal = M(this.theme.palette.metal, "metal", { roughness: 0.35, metalness: 0.7 });
    const wire = M(0x171b20, "", { roughness: 0.8, metalness: 0.05 });
    const connector = new THREE.Group();
    connector.add(new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.1), M(0xe9e2d2, "", { roughness: 0.7 })));
    for (let i = 0; i < 4; i += 1) {
      connector.add(new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 0.02), metal).translateX(-0.045 + i * 0.03).translateZ(0.055));
    }
    group.add(connector);
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.1, -0.2, 0.05),
      new THREE.Vector3(-0.02, -0.42, 0.18),
      new THREE.Vector3(0.16, -0.5, 0.24)
    ]);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.014, 5, false), wire));
    group.position.set(1.56, 2.8, -0.18);
    group.rotation.y = 0.2;
    markInteractive(connector, { kind: "click", action: "fan-cable" });
    group.userData.connector = connector;
    group.visible = false;
    this.scene.add(group);
    this.fanCable = group;
    this.fanCableHome = group.position.clone();
  }

  buildOutline(root, palette) {
    const color = palette.accent2;
    root.traverse((child) => {
      if (!child.isMesh || child.userData.skipOutline) return;
      if (!child.geometry?.attributes?.position) return;
      try {
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(child.geometry, 28),
          new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 })
        );
        edges.visible = Boolean(this.theme.flags.outline);
        edges.userData.outline = true;
        edges.userData.skipOutline = true;
        child.add(edges);
        this.edgeMaterials.push(edges.material);
      } catch {
        /* some generated geometry may not support edges */
      }
    });
  }

  setMonitorDesktop() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 576;
    const ctx = canvas.getContext("2d");
    const palette = this.theme.palette;
    ctx.fillStyle = "#071018";
    ctx.fillRect(0, 0, 1024, 576);
    ctx.fillStyle = `#${(palette.accent || 0xb3261e).toString(16).padStart(6, "0")}`;
    ctx.fillRect(0, 0, 1024, 10);
    ctx.fillStyle = "rgba(220, 244, 255, 0.86)";
    ctx.font = "700 38px system-ui, sans-serif";
    ctx.fillText("TECHPRO WORKSTATION", 72, 110);
    ctx.font = "500 20px monospace";
    ctx.fillStyle = "rgba(190, 225, 240, 0.62)";
    ctx.fillText("Bench session ready", 74, 152);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(72, 200, 360, 220);
    ctx.fillRect(468, 200, 480, 96);
    ctx.fillRect(468, 324, 480, 96);
    ctx.fillStyle = `#${(palette.accent2 || 0x2e5b4f).toString(16).padStart(6, "0")}`;
    ctx.fillRect(96, 230, 130, 16);
    ctx.fillRect(96, 264, 220, 10);
    ctx.fillRect(96, 286, 170, 10);
    ctx.fillStyle = "rgba(220, 244, 255, 0.5)";
    ctx.fillRect(500, 232, 240, 12);
    ctx.fillRect(500, 258, 160, 10);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.monitor.userData.screenMat.map = texture;
    this.monitor.userData.screenMat.needsUpdate = true;
  }

  setBoot(progress) {
    if (!this.bootTexture) {
      this.bootTexture = makeBootTexture(this.theme.palette, progress);
      this.monitor.userData.screenMat.map = this.bootTexture;
      this.monitor.userData.screenMat.needsUpdate = true;
      return;
    }
    const next = makeBootTexture(this.theme.palette, progress);
    this.monitor.userData.screenMat.map?.dispose?.();
    this.bootTexture = next;
    this.monitor.userData.screenMat.map = next;
    this.monitor.userData.screenMat.needsUpdate = true;
  }

  bindEvents() {
    const el = this.renderer.domElement;
    el.addEventListener("pointerdown", (event) => this.onPointerDown(event));
    el.addEventListener("pointermove", (event) => this.onPointerMove(event));
    el.addEventListener("pointerup", (event) => this.onPointerUp(event));
    el.addEventListener("pointercancel", (event) => this.onPointerCancel(event));
    el.addEventListener("wheel", (event) => this.onWheel(event), { passive: false });
    el.addEventListener("contextmenu", (event) => event.preventDefault());
    el.addEventListener("keydown", (event) => this.onKey(event));
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
  }

  resize() {
    if (!this.renderer || this.disposed) return;
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  onKey(event) {
    if (event.key === "r" || event.key === "R") {
      this.rotateSelected();
    }
    if (event.key === "Escape") this.callbacks.onEscape?.();
    if (event.key === "e" || event.key === "E") this.toggleExploded();
    if (event.key === "x" || event.key === "X") this.toggleXray();
    if ((event.key === "Enter" || event.code === "Space") && this.callbacks.canDrag?.("lever")) {
      event.preventDefault();
      this.callbacks.onClick?.("lever");
    }
  }

  pointerNdc(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return this.pointer;
  }

  pointerDistanceTo(event, target) {
    const projected = target.clone().project(this.camera);
    const rect = this.renderer.domElement.getBoundingClientRect();
    const targetX = rect.left + (projected.x + 1) * rect.width / 2;
    const targetY = rect.top + (1 - projected.y) * rect.height / 2;
    return Math.hypot(event.clientX - targetX, event.clientY - targetY);
  }

  pick(event) {
    this.raycaster.setFromCamera(this.pointerNdc(event), this.camera);
    const lever = this.motherboard.userData.lever;
    if (this.callbacks.canDrag?.("lever")) {
      const leverHits = this.raycaster.intersectObject(lever, true);
      if (leverHits.length) return { object: lever, hit: leverHits[0] };
    }
    for (const part of ["case-screw", "cpu", "ram"]) {
      if (!this.callbacks.canDrag?.(part)) continue;
      const targets = part === "case-screw"
        ? this.caseScrews.filter((screw) => screw.visible && screw.userData.interactive)
        : [part === "cpu" ? this.cpu : this.ram];
      const partHits = this.raycaster.intersectObjects(targets, true);
      if (partHits.length) {
        let object = partHits[0].object;
        while (object && object.userData?.interactive?.part !== part) object = object.parent;
        if (object) return { object, hit: partHits[0] };
      }
    }
    const hits = this.raycaster.intersectObjects(this.raycastTargets, true);
    for (const hit of hits) {
      let object = hit.object;
      while (object) {
        if (object.userData?.interactive) {
          if (object.userData.interactive.part === "case-screw") {
            while (object.parent && object.userData.screwIndex == null) object = object.parent;
          }
          return { object, hit };
        }
        object = object.parent;
      }
    }
    return null;
  }

  onPointerDown(event) {
    if (event.button !== 0 && event.button !== 1 && event.button !== 2) return;
    this.renderer.domElement.focus({ preventScroll: true });
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      this.pinch = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
      };
      this.drag = null;
      this.orbitPointer = null;
      return;
    }

    if (event.button === 2 || event.button === 1) {
      event.preventDefault();
      this.orbitPointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
      this.renderer.domElement.setPointerCapture?.(event.pointerId);
      return;
    }

    const picked = this.pick(event);
    if (picked) {
      const data = picked.object.userData.interactive;
      if (data.kind === "part") {
        if (data.part === "cpu" && this.level === "cpu" && this.cpuSeated) {
          this.audio.click();
          this.callbacks.onClick?.("paste", picked.object);
          return;
        }
        if (data.part === "ram" && this.ramPlaced && !this.ramSeated) {
          this.startSeat();
          return;
        }
        if (this.level === "power" && data.part === "ram") {
          this.audio.click();
          this.callbacks.onClick?.("ram", picked.object);
          return;
        }
        this.startDrag(picked.object, data.part, event);
        return;
      }
      if (data.kind === "lever") {
        this.startLeverDrag(event);
        return;
      }
      if (data.kind === "click") {
        this.audio.click();
        this.callbacks.onClick?.(data.action, picked.object);
        return;
      }
      if (data.kind === "safety") {
        this.audio.click();
        this.callbacks.onClick?.(data.action, picked.object);
        return;
      }
    }
    this.orbitPointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
    this.renderer.domElement.setPointerCapture?.(event.pointerId);
    const now = performance.now();
    if (now - this.lastTap < 320) this.focus("overview");
    this.lastTap = now;
  }

  startDrag(object, part, event) {
    if (this.callbacks.canDrag && !this.callbacks.canDrag(part)) {
      this.callbacks.onBlocked?.(part);
      return;
    }
    this.tweens.stop(object.position);
    if (part === "case-screw") this.scene.attach(object);
    const point = new THREE.Vector3();
    this.raycaster.setFromCamera(this.pointerNdc(event), this.camera);
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      this.camera.getWorldDirection(new THREE.Vector3()),
      object.position
    );
    if (!this.raycaster.ray.intersectPlane(plane, point)) return;
    this.drag = {
      object,
      part,
      pointerId: event.pointerId,
      offset: object.position.clone().sub(point),
      plane,
      lastPoint: point.clone(),
      speed: 0,
      lastTime: performance.now(),
      home: object.position.clone(),
      lift: 0,
      moved: 0,
      lastX: event.clientX,
      lastY: event.clientY
    };
    this.audio.pick();
    this.callbacks.onPick?.(part);
    this.tweens.to(object.scale, { x: 1.08, y: 1.08, z: 1.08 }, { duration: 120, easing: "outBack" });
    this.renderer.domElement.setPointerCapture?.(event.pointerId);
  }

  startLeverDrag(event) {
    if (this.callbacks.canDrag && !this.callbacks.canDrag("lever")) {
      this.callbacks.onBlocked?.("lever");
      return;
    }
    this.leverDrag = {
      pointerId: event.pointerId,
      startY: event.clientY,
      closing: this.leverOpen,
      progress: this.leverOpen ? 1 : 0,
      moved: 0
    };
    event.preventDefault();
    this.renderer.domElement.setPointerCapture?.(event.pointerId);
  }

  onPointerMove(event) {
    if (this.pointers.has(event.pointerId)) {
      this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
    if (this.pinch && this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const delta = this.pinch.distance - distance;
      this.cameraState.radius = THREE.MathUtils.clamp(this.cameraState.radius + delta * 0.012, 3.2, 15);
      this.cameraState.theta -= (mid.x - this.pinch.mid.x) * 0.004;
      this.cameraState.phi = THREE.MathUtils.clamp(this.cameraState.phi - (mid.y - this.pinch.mid.y) * 0.003, 0.16, 1.44);
      this.pinch = { distance, mid };
      return;
    }

    if (this.seat?.holding) {
      const dx = event.clientX - (this.seat.lastX ?? event.clientX);
      this.seat.lastX = event.clientX;
      this.seat.balance -= dx * 0.0022;
      this.seat.balance = THREE.MathUtils.clamp(this.seat.balance, -0.9, 0.9);
      return;
    }

    if (this.leverDrag?.pointerId === event.pointerId) {
      const { startY, closing } = this.leverDrag;
      this.leverDrag.moved = Math.max(this.leverDrag.moved, Math.abs(event.clientY - startY));
      const progress = closing
        ? THREE.MathUtils.clamp(1 - (event.clientY - startY) / 52, 0, 1)
        : THREE.MathUtils.clamp((startY - event.clientY) / 52, 0, 1);
      this.leverDrag.progress = progress;
      this.setLeverProgress(progress);
      return;
    }

    if (this.drag?.pointerId === event.pointerId) {
      const moveX = event.clientX - this.drag.lastX;
      const moveY = event.clientY - this.drag.lastY;
      this.drag.lastX = event.clientX;
      this.drag.lastY = event.clientY;
      this.drag.moved += Math.hypot(moveX, moveY);
      const point = new THREE.Vector3();
      this.raycaster.setFromCamera(this.pointerNdc(event), this.camera);
      if (!this.raycaster.ray.intersectPlane(this.drag.plane, point)) return;
      const next = point.add(this.drag.offset);
      next.x = THREE.MathUtils.clamp(next.x, -4.2, 4.2);
      next.z = THREE.MathUtils.clamp(next.z, -2.2, 2.2);
      next.y = Math.max(1.28, next.y);
      const now = performance.now();
      const dt = Math.max(0.016, (now - this.drag.lastTime) / 1000);
      const delta = next.distanceTo(this.drag.lastPoint);
      this.drag.speed = THREE.MathUtils.lerp(this.drag.speed, delta / dt, 0.35);
      this.drag.lastPoint.copy(next);
      this.drag.lastTime = now;
      this.drag.object.position.copy(next);
      this.updateGhost();
      return;
    }

    if (this.orbitPointer && this.orbitPointer.id === event.pointerId) {
      const dx = event.clientX - this.orbitPointer.x;
      const dy = event.clientY - this.orbitPointer.y;
      this.orbitPointer.x = event.clientX;
      this.orbitPointer.y = event.clientY;
      this.cameraState.theta -= dx * 0.005;
      this.cameraState.phi = THREE.MathUtils.clamp(this.cameraState.phi - dy * 0.004, 0.16, 1.44);
    }
  }

  onPointerUp(event) {
    this.pointers.delete(event.pointerId);
    if (this.pinch && this.pointers.size < 2) this.pinch = null;
    if (this.leverDrag?.pointerId === event.pointerId) {
      const { progress, closing, moved } = this.leverDrag;
      this.leverDrag = null;
      if (moved < 8) {
        this.callbacks.onClick?.("lever");
        return;
      }
      const complete = closing ? progress <= 0.28 : progress >= 0.72;
      if (complete) {
        this.callbacks.onClick?.("lever");
      } else {
        this.setLever(this.leverOpen);
        this.callbacks.onLeverDragIncomplete?.();
      }
      return;
    }
    if (this.seat?.holding) {
      this.finishSeat();
      return;
    }
    if (this.drag?.pointerId === event.pointerId) {
      const drag = this.drag;
      if (drag.moved < 9 && this.level === "safety"
        && ["strap", "bins", "camera", "plug"].includes(drag.part)) {
        this.drag = null;
        this.ghostCpu.visible = false;
        this.ghostRam.visible = false;
        this.tweens.to(drag.object.scale, { x: 1, y: 1, z: 1 }, { duration: 140, easing: "outBack" });
        this.returnHome(drag.object, drag.home);
        this.audio.click();
        this.callbacks.onClick?.(drag.part, drag.object);
        return;
      }
      this.dropDrag(event);
      return;
    }
    if (this.orbitPointer?.id === event.pointerId) this.orbitPointer = null;
  }

  onPointerCancel(event) {
    this.pointers.delete(event.pointerId);
    if (this.pinch && this.pointers.size < 2) this.pinch = null;
    if (this.leverDrag?.pointerId === event.pointerId) {
      this.leverDrag = null;
      this.setLever(this.leverOpen);
    }
    if (this.drag?.pointerId === event.pointerId) {
      const { object, home } = this.drag;
      this.drag = null;
      this.ghostCpu.visible = false;
      this.ghostRam.visible = false;
      this.tweens.stop(object.position);
      this.tweens.to(object.scale, { x: 1, y: 1, z: 1 }, { duration: 120 });
      this.returnHome(object, home);
    }
    if (this.seat?.holding) {
      this.seat = null;
      this.callbacks.onSeatCancel?.();
    }
    if (this.orbitPointer?.id === event.pointerId) this.orbitPointer = null;
  }

  onWheel(event) {
    event.preventDefault();
    this.cameraState.radius = THREE.MathUtils.clamp(this.cameraState.radius + event.deltaY * 0.004, 3.2, 15);
  }

  updateGhost() {
    if (!this.drag) return;
    const { part, object } = this.drag;
    this.ghostCpu.visible = false;
    this.ghostRam.visible = false;
    if (part === "cpu") {
      const socketWorld = this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone());
      const aligned = this.cpuOrientationValid();
      this.ghostCpu.visible = true;
      this.ghostCpu.position.set(socketWorld.x, socketWorld.y + 0.03, socketWorld.z);
      this.ghostCpu.rotation.y = object.rotation.y;
      this.setGhostColor(this.ghostCpu, aligned ? this.theme.palette.accent2 : 0xc0392b);
      this.callbacks.onGhost?.(aligned);
    }
    if (part === "ram") {
      const slotWorld = this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());
      const aligned = this.ramOrientationValid();
      this.ghostRam.visible = true;
      this.ghostRam.position.copy(slotWorld);
      this.ghostRam.rotation.y = object.rotation.y;
      this.setGhostColor(this.ghostRam, aligned ? this.theme.palette.accent2 : 0xc0392b);
      this.callbacks.onGhost?.(aligned);
    }
  }

  setGhostColor(ghost, color) {
    ghost.userData.mesh.material.color.setHex(color);
    ghost.userData.edges.material.color.setHex(color);
  }

  dropDrag(event) {
    const drag = this.drag;
    this.drag = null;
    this.ghostCpu.visible = false;
    this.ghostRam.visible = false;
    this.tweens.stop(drag.object.position);
    this.tweens.to(drag.object.scale, { x: 1, y: 1, z: 1 }, { duration: 140, easing: "outBack" });
    const { part, object } = drag;

    if (part === "case-screw") {
      const index = object.userData.screwIndex;
      const target = this.screwTraySlots[index];
      if (!target) {
        this.returnHome(object, drag.home);
        this.callbacks.onPartDrop?.({ part, valid: false, screwIndex: index });
        return;
      }
      if (drag.moved < 9) {
        this.returnHome(object, drag.home);
        return;
      }
      const projected = target.clone().project(this.camera);
      const rect = this.renderer.domElement.getBoundingClientRect();
      const targetX = rect.left + (projected.x + 1) * rect.width / 2;
      const targetY = rect.top + (1 - projected.y) * rect.height / 2;
      const valid = Math.hypot(event.clientX - targetX, event.clientY - targetY) < Math.max(100, Math.min(140, rect.width * 0.2));
      if (valid) {
        object.position.copy(target);
        object.userData.interactive = null;
        object.traverse((child) => { child.userData.interactive = null; });
        this.audio.clickSnap();
        this.particles.sparkBurst(target, this.theme.palette.metal);
      } else {
        this.returnHome(object, drag.home);
      }
      this.callbacks.onPartDrop?.({ part, valid, screwIndex: index });
      return;
    }

    if (part === "cpu") {
      const socketWorld = this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone());
      const distance = this.pointerDistanceTo(event, socketWorld);
      const rect = this.renderer.domElement.getBoundingClientRect();
      const snapRadius = Math.max(56, Math.min(84, rect.width * 0.16));
      const valid = this.cpuOrientationValid();
      if (distance < snapRadius) {
        if (!this.leverOpen) {
          this.reject(object, "lever");
          this.callbacks.onPartDrop?.({ part, valid: false, reason: "lever", speed: drag.speed, height: 0 });
          return;
        }
        if (!valid) {
          this.reject(object, "orientation");
          this.callbacks.onPartDrop?.({ part, valid: false, reason: "orientation", speed: drag.speed, height: 0 });
          return;
        }
        this.audio.drop();
        this.callbacks.onPartDrop?.({ part, valid: true, speed: drag.speed, height: 0 });
        return;
      }
    }

    if (part === "ram") {
      const slotWorld = this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());
      const distance = this.pointerDistanceTo(event, slotWorld);
      const rect = this.renderer.domElement.getBoundingClientRect();
      const snapRadius = Math.max(56, Math.min(84, rect.width * 0.16));
      if (distance < snapRadius) {
        if (!this.ramOrientationValid()) {
          this.reject(object, "orientation");
          this.callbacks.onPartDrop?.({ part, valid: false, reason: "orientation", speed: drag.speed });
          return;
        }
        this.audio.drop();
        this.callbacks.onPartDrop?.({ part, valid: true, speed: drag.speed });
        return;
      }
    }

    if (part === "bracelet") {
      const target = this.tray.localToWorld(new THREE.Vector3(-0.6, 0.25, 1.1));
      const valid = this.pointerDistanceTo(event, target) < this.dropRadius();
      this.callbacks.onSafetyDrop?.({ action: "bracelet", valid });
      if (valid) {
        this.character.userData.bracelet.visible = false;
        this.audio.clickSnap();
        this.particles.dustBurst(object.position, this.theme.palette.metal);
        object.visible = false;
      } else {
        this.reject(object, "target");
      }
      return;
    }

    if (part === "strap") {
      const target = this.character.localToWorld(new THREE.Vector3(-0.43, 1.16, 0.03));
      const valid = this.pointerDistanceTo(event, target) < this.dropRadius();
      this.callbacks.onSafetyDrop?.({ action: "strap", valid });
      if (valid) {
        this.character.userData.wornStrap.visible = true;
        this.audio.clickSnap();
        this.particles.sparkBurst(target, this.theme.palette.accent);
        object.visible = false;
      } else {
        this.reject(object, "target");
      }
      return;
    }

    if (part === "camera") {
      const target = this.peripheralCable.getWorldPosition(new THREE.Vector3());
      const valid = this.pointerDistanceTo(event, target) < this.dropRadius();
      this.callbacks.onSafetyDrop?.({ action: "camera", valid });
      if (valid) {
        this.callbacks.onFlash?.();
        this.audio.clickSnap();
        this.tweens.to(object.position, this.home.camera, { duration: 360, easing: "outCubic" });
      } else {
        this.reject(object, "target");
      }
      return;
    }

    if (part === "bins") {
      const target = new THREE.Vector3(1.0, 1.07, 1.9);
      const valid = this.pointerDistanceTo(event, target) < this.dropRadius();
      this.callbacks.onSafetyDrop?.({ action: "bins", valid });
      if (valid) {
        this.audio.clickSnap();
        this.tweens.to(object.position, { x: 1.0, y: 1.07, z: 1.9 }, { duration: 360, easing: "outCubic" });
        this.tweens.to(object.rotation, { y: 0 }, { duration: 300 });
      } else {
        this.reject(object, "target");
      }
      return;
    }

    if (part === "plug") {
      const away = this.pointerDistanceTo(event, this.powerStrip.position) > this.dropRadius();
      this.callbacks.onSafetyDrop?.({ action: "plug", valid: away });
      if (away) {
        this.audio.clickSnap();
        this.callbacks.onUnplugged?.();
      } else {
        this.reject(object, "target");
      }
      return;
    }

    this.returnHome(object, drag.home);
  }

  reject(object, reason) {
    this.audio.error();
    this.shake = this.motionReduced ? 0 : 0.18;
    this.callbacks.onReject?.(reason);
    this.tweens.to(object.position, { y: object.position.y + 0.14 }, { duration: 100, easing: "outQuad" });
    this.tweens.to(object.position, { y: Math.max(1.2, object.position.y) }, { duration: 240, delay: 100, easing: "outElastic" });
    this.tweens.to(object.rotation, { z: 0.18 }, { duration: 90, easing: "outQuad" });
    this.tweens.to(object.rotation, { z: 0 }, { duration: 260, delay: 90, easing: "outElastic" });
    this.particles.sparkBurst(object.position, 0xffb347);
    if (object.userData.part) this.returnHome(object, this.home[object.userData.part] || object.position.clone());
  }

  returnHome(object, home) {
    this.tweens.to(object.position, { x: home.x, y: home.y, z: home.z }, { duration: 360, easing: "outCubic" });
  }

  dropRadius() {
    const width = this.renderer.domElement.getBoundingClientRect().width;
    return Math.max(96, Math.min(150, width * 0.2));
  }

  rotateSelected() {
    if (this.level === "cpu" && !this.cpuSeated) {
      this.cpu.rotation.y += Math.PI / 2;
      this.audio.click();
      this.tweens.to(this.cpu.scale, { x: 1.12, y: 1.12, z: 1.12 }, { duration: 80, easing: "outQuad" });
      this.tweens.to(this.cpu.scale, { x: 1, y: 1, z: 1 }, { duration: 180, delay: 80, easing: "outBack" });
      this.callbacks.onRotate?.({ part: "cpu", aligned: this.cpuOrientationValid() });
    } else if (this.level === "ram" && !this.ramPlaced) {
      this.ram.rotation.y += Math.PI;
      this.audio.click();
      this.tweens.to(this.ram.scale, { x: 1.12, y: 1.12, z: 1.12 }, { duration: 80 });
      this.tweens.to(this.ram.scale, { x: 1, y: 1, z: 1 }, { duration: 180, delay: 80, easing: "outBack" });
      this.callbacks.onRotate?.({ part: "ram", aligned: this.ramOrientationValid() });
    }
  }

  cpuOrientationValid() {
    const normalized = ((this.cpu.rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    return normalized < 0.08 || normalized > Math.PI * 2 - 0.08;
  }

  ramOrientationValid() {
    const normalized = ((this.ram.rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    return normalized < 0.08 || normalized > Math.PI * 2 - 0.08;
  }

  setLever(open) {
    this.leverOpen = Boolean(open);
    const lever = this.motherboard.userData.lever;
    this.tweens.to(lever.rotation, { x: open ? -0.7 : 0 }, { duration: 260, easing: "outCubic" });
    this.tweens.to(lever.position, { y: open ? 0.13 : 0.05 }, { duration: 260, easing: "outCubic" });
    this.audio.clickSnap();
    this.particles.sparkBurst(lever.getWorldPosition(new THREE.Vector3()), this.theme.palette.metal);
  }

  setLeverProgress(progress) {
    const lever = this.motherboard.userData.lever;
    lever.rotation.x = -0.7 * progress;
    lever.position.y = 0.05 + 0.08 * progress;
  }

  openCasePanel() {
    this.tweens.to(this.case.userData.panel.position, { x: -1.95 }, { duration: 420, easing: "outCubic" });
  }

  shutdownSafety() {
    this.safetyPoweredOff = true;
    this.powerState = "off";
    this.case.userData.rgb.material.emissiveIntensity = 0.05;
    this.monitor.userData.screenMat.map = null;
    this.monitor.userData.screenMat.color.setHex(0x05080b);
    this.monitor.userData.screenMat.needsUpdate = true;
    this.monitor.userData.led.material.color.setHex(0x3b2a24);
    this.audio.clickSnap();
    this.particles.dustBurst(this.case.userData.powerButton.getWorldPosition(new THREE.Vector3()), this.theme.palette.metal);
    this.callbacks.onShutdown?.();
  }

  cleanBench() {
    const cloth = this.cleaningCloth;
    this.audio.clickSnap();
    this.particles.dustBurst(cloth.position, this.theme.palette.accent2);
    this.tweens.to(cloth.position, { x: -2.05 }, {
      duration: 380,
      easing: "inOutCubic",
      onComplete: () => {
        cloth.visible = false;
      }
    });
  }

  arrangeBench() {
    const binsTarget = new THREE.Vector3(1.0, 1.07, 1.9);
    this.tray.visible = true;
    this.tray.position.set(-1.9, 1.05, 0.25);
    this.bins.visible = true;
    this.audio.clickSnap();
    this.particles.sparkBurst(binsTarget, this.theme.palette.accent2);
    this.tweens.to(this.bins.position, { x: binsTarget.x, y: binsTarget.y, z: binsTarget.z }, {
      duration: 420,
      easing: "outCubic"
    });
    this.tweens.to(this.bins.rotation, { y: 0 }, { duration: 320 });
    this.tweens.to(this.toolKit.rotation, { y: this.toolKit.rotation.y + 0.35 }, { duration: 260, easing: "outCubic" });
  }

  disconnectPeripheral() {
    this.peripheralDisconnected = true;
    this.audio.clickSnap();
    this.tweens.to(this.peripheralCable.rotation, { z: -0.5, y: 0.75 }, { duration: 280, easing: "outCubic" });
    this.particles.dustBurst(this.peripheralCable.getWorldPosition(new THREE.Vector3()), this.theme.palette.metal);
    this.callbacks.onPeripheralDisconnected?.();
  }

  unplugPower() {
    this.audio.clickSnap();
    this.tweens.to(this.plug.position, { x: 5.15, y: 1.16, z: 2.3 }, { duration: 420, easing: "outCubic" });
    this.tweens.to(this.plug.rotation, { y: 0.8, z: 0.25 }, { duration: 360, easing: "outCubic" });
    this.particles.dustBurst(this.plug.getWorldPosition(new THREE.Vector3()), this.theme.palette.metal);
    this.callbacks.onUnplugged?.();
  }

  openRamClips() {
    if (this.clipsOpen) return;
    this.clipsOpen = true;
    this.motherboard.userData.ramSlots.children
      .filter((child) => child.name === "ram-clip")
      .forEach((clip) => {
        const direction = clip.position.z < -0.2 ? -1 : 1;
        this.tweens.to(clip.rotation, { x: direction * 0.55 }, { duration: 220, easing: "outBack" });
        this.tweens.to(clip.position, { z: clip.position.z + direction * 0.06 }, { duration: 220, easing: "outBack" });
      });
    this.audio.clickSnap();
    this.callbacks.onClipsOpen?.();
  }

  closeRamClips() {
    if (!this.clipsOpen) return;
    this.clipsOpen = false;
    this.motherboard.userData.ramSlots.children
      .filter((child) => child.name === "ram-clip")
      .forEach((clip) => {
        const direction = clip.position.z < -0.2 ? -1 : 1;
        this.tweens.to(clip.rotation, { x: 0 }, { duration: 220, easing: "outCubic" });
        this.tweens.to(clip.position, { z: clip.position.z - direction * 0.06 }, { duration: 220, easing: "outCubic" });
      });
    this.audio.clickSnap();
    this.callbacks.onClipsClosed?.();
  }

  removeBracelet() {
    const bracelet = this.character.userData.bracelet;
    if (!bracelet.visible) return;
    this.audio.clickSnap();
    this.particles.dustBurst(bracelet.getWorldPosition(new THREE.Vector3()), this.theme.palette.metal);
    this.tweens.to(bracelet.scale, { x: 0.1, y: 0.1, z: 0.1 }, {
      duration: 260,
      easing: "inQuad",
      onComplete: () => { bracelet.visible = false; }
    });
    this.callbacks.onJewelryRemoved?.();
  }

  prepareBins() {
    const target = new THREE.Vector3(1.0, 1.07, 1.9);
    this.audio.clickSnap();
    this.tweens.to(this.bins.position, { x: target.x, y: target.y, z: target.z }, { duration: 420, easing: "outCubic" });
    this.tweens.to(this.bins.rotation, { y: 0 }, { duration: 320 });
    this.particles.sparkBurst(target, this.theme.palette.accent2);
    this.callbacks.onBinsReady?.();
  }

  wearStrap() {
    const strap = this.strap;
    if (!strap.visible) return;
    this.character.userData.wornStrap.visible = true;
    this.character.userData.bracelet.visible = false;
    this.audio.clickSnap();
    this.particles.sparkBurst(this.character.userData.wornStrap.getWorldPosition(new THREE.Vector3()), this.theme.palette.accent);
    this.tweens.to(strap.scale, { x: 0.1, y: 0.1, z: 0.1 }, {
      duration: 240,
      easing: "inQuad",
      onComplete: () => { strap.visible = false; }
    });
    this.callbacks.onStrapWorn?.();
  }

  documentConnections() {
    this.audio.clickSnap();
    this.particles.sparkBurst(this.peripheralCable.getWorldPosition(new THREE.Vector3()), this.theme.palette.accent2);
    this.callbacks.onDocumented?.();
    this.callbacks.onFlash?.();
  }

  applyPaste() {
    this.pasteApplied = true;
    if (!this.pasteBlob) {
      const blob = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.11, 0.018, 18),
        M(0xc9c3b8, "", { roughness: 0.55, metalness: 0.1 })
      );
      blob.position.set(0, 0.07, 0);
      blob.userData.skipOutline = true;
      this.cpu.add(blob);
      this.pasteBlob = blob;
    }
    this.pasteBlob.visible = true;
    this.pasteBlob.scale.setScalar(0.1);
    this.tweens.to(this.pasteBlob.scale, { x: 1, y: 1, z: 1 }, { duration: 320, easing: "outBack" });
    this.audio.paste();
    this.callbacks.onPasteApplied?.();
  }

  showCoolerReady() {
    if (this.cpuSeated) {
      this.cooler.visible = true;
      const socket = this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone());
      const seatY = socket.y + 0.11;
      this.cooler.position.set(socket.x, seatY + 1, socket.z);
      this.cooler.scale.set(1, 1, 1);
      this.tweens.to(this.cooler.position, { y: seatY }, { duration: 460, easing: "outCubic" });
      this.audio.whoosh();
      this.callbacks.onCoolerReady?.();
    }
  }

  mountCooler() {
    if (!this.cooler.visible) return;
    const socket = this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone());
    this.tweens.stop(this.cooler.position);
    this.cooler.position.set(socket.x, socket.y + 0.11, socket.z);
    this.audio.snap();
    this.particles.sparkBurst(this.cooler.getWorldPosition(new THREE.Vector3()), this.theme.palette.accent);
    this.callbacks.onCoolerMounted?.();
  }

  reseatRamPower() {
    this.audio.clickSnap();
    const slot = this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());
    this.tweens.stop(this.ram.position);
    this.ram.position.copy(slot);
    this.particles.sparkBurst(this.ram.getWorldPosition(new THREE.Vector3()), this.theme.palette.accent2);
    this.callbacks.onRamReseated?.();
  }

  checkPsu() {
    this.audio.clickSnap();
    this.particles.sparkBurst(this.psu.getWorldPosition(new THREE.Vector3()), this.theme.palette.accent);
    this.tweens.to(this.psu.scale, { x: 1.04, y: 1.04, z: 1.04 }, { duration: 140 });
    this.tweens.to(this.psu.scale, { x: 1, y: 1, z: 1 }, { duration: 220, delay: 140, easing: "outBack" });
    this.callbacks.onPsuChecked?.();
  }

  checkMonitorCable() {
    this.audio.clickSnap();
    this.particles.sparkBurst(this.peripheralCable.getWorldPosition(new THREE.Vector3()), this.theme.palette.metal);
    this.tweens.to(this.peripheralCable.rotation, { z: 0, y: 0.25 }, { duration: 320, easing: "outCubic" });
    this.callbacks.onMonitorCableChecked?.();
  }

  seatCpu({ gentle = true } = {}) {
    this.cpuSeated = true;
    const socket = this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone());
    this.tweens.stop(this.cpu.position);
    this.tweens.stop(this.cpu.rotation);
    this.cpu.position.set(socket.x, socket.y + 0.03, socket.z);
    this.cpu.rotation.set(0, 0, 0);
    this.audio.snap();
    this.particles.dustBurst(socket, this.theme.palette.metal);
    this.callbacks.onCpuSeated?.(gentle);
  }

  seatRamReady() {
    this.ramPlaced = true;
    const slot = this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());
    this.tweens.stop(this.ram.position);
    this.tweens.stop(this.ram.rotation);
    this.tweens.to(this.ram.position, { x: slot.x, y: slot.y + 0.1, z: slot.z }, { duration: 340, easing: "outCubic" });
    this.tweens.to(this.ram.rotation, { y: 0 }, { duration: 260, easing: "outCubic" });
    this.audio.drop();
    this.callbacks.onRamPlaced?.();
  }

  startSeat() {
    if (this.seat) return;
    this.seat = { holding: true, pressure: 0, balance: 0, elapsed: 0, tiltTime: 0, lastX: null };
    this.audio.paste();
    this.callbacks.onSeatStart?.();
  }

  nudgeSeat(dx) {
    if (!this.seat) return;
    this.seat.balance = THREE.MathUtils.clamp(this.seat.balance - dx * 0.0022, -0.9, 0.9);
  }

  finishSeat() {
    if (!this.seat) return;
    const seat = this.seat;
    this.seat = null;
    const balanced = Math.abs(seat.balance) < 0.36 && seat.tiltTime < 0.45;
    const pressure = seat.pressure;
    const ok = pressure >= 0.65 && pressure <= 0.9 && balanced;
    if (ok) {
      this.completeRam();
    } else {
      this.failRam({ pressure, balanced });
    }
    this.callbacks.onSeatResult?.({ ok, pressure, balanced, overpressure: pressure > 0.9, underpressure: pressure < 0.65 });
  }

  completeRam() {
    this.ramSeated = true;
    const slot = this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());
    this.tweens.stop(this.ram.position);
    this.tweens.stop(this.ram.rotation);
    this.ram.position.copy(slot);
    this.ram.rotation.set(0, 0, 0);
    this.audio.snap();
    this.particles.sparkBurst(slot, this.theme.palette.accent2);
    this.callbacks.onRamSeated?.();
  }

  failRam({ pressure, balanced }) {
    this.ramPlaced = true;
    this.audio.error();
    this.shake = this.motionReduced ? 0 : 0.2;
    const slot = this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());
    this.tweens.to(this.ram.position, { x: slot.x, y: slot.y + 0.14, z: slot.z }, { duration: 360, easing: "outCubic" });
    this.tweens.to(this.ram.rotation, { z: 0 }, { duration: 200 });
    this.particles.sparkBurst(this.ram.position, 0xffb347);
    this.callbacks.onRamFailed?.({ pressure, balanced });
  }

  setRamSeatVisual(pressure, balance) {
    if (!this.ramPlaced) return;
    this.ram.rotation.z = balance * 0.26;
    const slot = this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());
    this.ram.position.y = slot.y + 0.1 - pressure * 0.1;
  }

  mountBoardInCase() {
    const mount = this.case.userData.boardMount;
    const world = mount.getWorldPosition(new THREE.Vector3());
    this.tweens.to(this.motherboard.position, { x: world.x, y: world.y, z: world.z }, { duration: 900, easing: "inOutCubic" });
    this.tweens.to(this.motherboard.rotation, { x: 0, y: 0, z: -Math.PI / 2 }, { duration: 900, easing: "inOutCubic" });
    this.tweens.to(this.motherboard.scale, { x: 0.82, y: 0.82, z: 0.82 }, { duration: 900, easing: "inOutCubic" });
    this.psu.visible = true;
    this.fanCable.visible = true;
    this.tweens.delay(0.95, () => {
      const slot = this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());
      if (this.level === "power") this.ram.position.copy(slot);
      this.callbacks.onBoardMounted?.();
    });
  }

  setPowerState(state) {
    this.powerState = state;
    const on = state === "on" || state === "booting";
    this.case.userData.rgb.material.emissiveIntensity = on ? 1.8 : 0.12;
    this.monitor.userData.led.material.color.setHex(on ? this.theme.palette.accent : 0x3b2a24);
    if (state === "off" || state === "fault") {
      this.monitor.userData.screenMat.map = null;
      this.monitor.userData.screenMat.color.setHex(0x05080b);
      this.monitor.userData.screenMat.needsUpdate = true;
    }
    if (on) {
      this.bootProgress = 0;
      this.setBoot(0.04);
      this.audio.fan();
    }
  }

  powerOn() {
    this.powerState = "booting";
    this.powerProgress = 0;
    this.setPowerState("booting");
    this.callbacks.onPowerOn?.();
  }

  bootStep(dt) {
    if (this.powerState !== "booting") return;
    this.powerProgress = Math.min(1, this.powerProgress + dt * 0.55);
    if (this.powerProgress < 0.98) {
      if (!this.lastBootDraw || this.time - this.lastBootDraw > 0.14) {
        this.lastBootDraw = this.time;
        this.setBoot(this.powerProgress);
      }
    } else {
      this.powerState = "on";
      this.setBoot(1);
      this.callbacks.onBooted?.();
    }
  }

  powerFault() {
    this.powerState = "fault";
    this.setPowerState("fault");
    this.shake = this.motionReduced ? 0 : 0.3;
    this.callbacks.onPowerFault?.();
  }

  fixFanCable() {
    this.faultFixed = true;
    this.audio.snap();
    this.particles.sparkBurst(this.fanCable.position, this.theme.palette.accent);
    this.tweens.to(this.fanCable.position, { x: 1.57, y: 2.73, z: -0.18 }, { duration: 320, easing: "outBack" });
    this.callbacks.onFaultFixed?.();
  }

  inspectFanCable() {
    this.audio.click();
    this.particles.dustBurst(this.fanCable.userData.connector.getWorldPosition(new THREE.Vector3()), this.theme.palette.metal);
    this.callbacks.onFanInspected?.();
  }

  setLevel(level, { instant = false } = {}) {
    this.tweens.clear();
    this.level = level;
    this.ghostCpu.visible = false;
    this.ghostRam.visible = false;
    this.drag = null;
    this.leverDrag = null;
    this.seat = null;
    this.ramPlaced = false;
    this.ramSeated = false;
    this.cpuSeated = false;
    this.faultFixed = false;
    this.safetyPoweredOff = false;
    this.peripheralDisconnected = false;
    this.pasteApplied = false;
    this.powerState = "off";
    this.fanCable.visible = false;
    this.fanCable.position.copy(this.fanCableHome);
    this.psu.visible = false;
    this.psu.scale.set(1, 1, 1);
    this.keyboard.visible = false;
    this.mouse.visible = false;
    this.cooler.visible = false;
    this.cooler.position.set(-0.58, 0.1, -0.38);
    this.cooler.scale.set(1, 1, 1);
    this.motherboard.visible = true;
    this.motherboard.position.set(-1.95, 1.16, 0.22);
    this.motherboard.rotation.set(0, 0.02, 0);
    this.motherboard.scale.set(1, 1, 1);
    this.cpu.visible = true;
    this.cpu.position.copy(this.home.cpu);
    this.cpu.rotation.set(0, -Math.PI / 2, 0);
    this.ram.visible = true;
    this.ram.position.copy(this.home.ram);
    this.ram.rotation.set(0, Math.PI, 0);
    this.strap.visible = true;
    this.strap.position.copy(this.home.strap);
    this.strap.scale.set(1, 1, 1);
    this.cameraProp.visible = true;
    this.cameraProp.position.copy(this.home.camera);
    this.bins.visible = false;
    this.bins.position.copy(this.home.bins);
    this.plug.visible = true;
    this.plug.position.copy(this.home.plug);
    this.character.visible = true;
    this.character.userData.bracelet.visible = true;
    this.character.userData.bracelet.scale.set(1, 1, 1);
    this.character.userData.wornStrap.visible = false;
    this.peripheralCable.visible = true;
    this.peripheralCable.rotation.set(0, 0.25, 0);
    this.powerStrip.visible = true;
    this.tray.visible = true;
    this.toolKit.rotation.y = -0.2;
    this.toolKit.scale.set(1, 1, 1);
    this.case.userData.panel.position.x = -1.45;
    this.cleaningCloth.visible = level === "safety";
    this.cleaningCloth.position.set(-3.55, 1.1, 0.95);
    this.cleaningCloth.scale.set(1, 1, 1);
    this.tray.visible = level !== "safety";
    this.caseScrews.forEach((screw, index) => {
      const x = index % 2 === 0 ? -0.8 : 0.8;
      const y = index < 2 ? 0.45 : 2.45;
      this.case.add(screw);
      screw.position.set(x, y, 1.77);
      screw.rotation.set(0, 0, 0);
      screw.scale.set(1, 1, 1);
      screw.visible = level === "cpu";
      screw.userData.interactive = { kind: "part", part: "case-screw" };
      screw.traverse((child) => { child.userData.interactive = screw.userData.interactive; });
    });
    this.exploded = false;
    this.leverOpen = false;
    this.clipsOpen = false;
    this.clipHomes?.forEach(({ clip, position, rotation }) => {
      clip.position.copy(position);
      clip.rotation.copy(rotation);
    });
    this.motherboard.userData.lever.rotation.set(0, 0, 0);
    this.motherboard.userData.lever.position.set(0.32, 0.05, -0.38);
    this.case.userData.rgb.material.emissiveIntensity = 0.12;
    this.monitor.userData.screenMat.map = null;
    this.monitor.userData.screenMat.color.setHex(0x05080b);
    this.monitor.userData.screenMat.needsUpdate = true;
    this.monitor.userData.led.material.color.setHex(this.theme.palette.accent);
    if (this.pasteBlob) this.pasteBlob.visible = false;
    if (this.highlightRing) this.highlightRing.visible = false;

    if (level === "safety") {
      this.tray.visible = false;
      this.motherboard.visible = false;
      this.cpu.visible = false;
      this.ram.visible = false;
      this.strap.visible = true;
      this.cameraProp.visible = true;
      this.bins.visible = false;
      this.bins.position.set(3.95, 1.06, 0.8);
      this.bins.rotation.set(0, 0.2, 0);
      this.powerState = "on";
      this.case.userData.rgb.material.emissiveIntensity = 1.4;
      this.setMonitorDesktop();
      this.monitor.userData.screenMat.color.setHex(0xffffff);
      this.monitor.userData.screenMat.needsUpdate = true;
      this.monitor.userData.led.material.color.setHex(this.theme.palette.accent);
      this.focus("safety", instant);
    } else if (level === "cpu") {
      this.character.userData.wornStrap.visible = true;
      this.character.userData.bracelet.visible = false;
      this.bins.visible = true;
      this.bins.position.set(0.2, 1.07, 1.55);
      this.bins.rotation.set(0, 0, 0);
      this.cpu.rotation.y = -Math.PI / 2;
      this.cooler.visible = false;
      this.ram.visible = false;
      this.psu.visible = false;
      this.keyboard.visible = false;
      this.mouse.visible = false;
      this.peripheralCable.visible = false;
      this.powerStrip.visible = false;
      this.plug.visible = false;
      this.strap.visible = false;
      this.cameraProp.visible = false;
      this.focus("cpu", instant);
    } else if (level === "ram") {
      this.character.userData.wornStrap.visible = true;
      this.character.userData.bracelet.visible = false;
      this.bins.visible = false;
      this.cpu.visible = false;
      this.cooler.visible = true;
      this.cooler.position.set(-0.58, 0.1, -0.38);
      this.cpuSeated = true;
      this.ram.rotation.y = Math.PI;
      this.peripheralCable.visible = false;
      this.powerStrip.visible = false;
      this.plug.visible = false;
      this.strap.visible = false;
      this.cameraProp.visible = false;
      this.focus("ram", instant);
    } else if (level === "power") {
      this.tray.visible = false;
      this.character.visible = false;
      this.strap.visible = false;
      this.cameraProp.visible = false;
      this.bins.visible = false;
      this.peripheralCable.visible = true;
      this.powerStrip.visible = false;
      this.plug.visible = false;
      this.cpu.visible = false;
      this.ram.visible = true;
      this.ram.position.set(0.61, 1.9, -0.18);
      this.ram.rotation.set(0, 0, 0);
      this.cooler.visible = true;
      this.cooler.position.set(-0.58, 0.1, -0.38);
      this.psu.visible = true;
      this.keyboard.visible = true;
      this.mouse.visible = true;
      this.fanCable.visible = true;
      this.fanCable.position.copy(this.fanCableHome);
      this.mountBoardInCase();
      this.focus("power", instant);
    }
    this.callbacks.onLevelRender?.(level);
  }

  focus(preset, instant = false) {
    const next = PRESETS[preset] || PRESETS.overview;
    this.cameraGoal = next;
    if (instant) {
      this.cameraState.theta = next.theta;
      this.cameraState.phi = next.phi;
      this.cameraState.radius = next.radius;
      this.cameraTarget.set(...next.target);
      return;
    }
    this.audio.whoosh();
    const duration = this.motionReduced ? 1 : 680;
    this.tweens.to(this.cameraState, {
      theta: next.theta, phi: next.phi, radius: next.radius
    }, { duration, easing: "inOutCubic" });
    this.tweens.to(this.cameraTarget, {
      x: next.target[0], y: next.target[1], z: next.target[2]
    }, { duration, easing: "inOutCubic" });
  }

  toggleExploded() {
    this.exploded = !this.exploded;
    const offset = this.exploded ? 0.55 : 0;
    this.tweens.to(this.case.userData.panel.position, { x: -1.45 - offset * 0.9 }, { duration: 420, easing: "outCubic" });
    this.tweens.to(this.motherboard.position, {
      x: this.motherboard.position.x + (this.exploded ? 0.35 : -0.35)
    }, { duration: 420, easing: "outCubic" });
    this.callbacks.onExploded?.(this.exploded);
  }

  toggleXray() {
    this.xray = !this.xray;
    this.motherboard.userData.labels.forEach((label) => { label.visible = this.xray; });
    this.case.traverse((child) => {
      if (child.isMesh && child.material && ["case", "caseTrim"].includes(child.material.userData.role)) {
        child.material.transparent = this.xray;
        child.material.opacity = this.xray ? 0.22 : 1;
        child.material.needsUpdate = true;
      }
    });
    this.callbacks.onXray?.(this.xray);
  }

  highlight(target) {
    if (!target) {
      if (this.highlightRing) this.highlightRing.visible = false;
      this.highlighted = null;
      return;
    }
    if (!this.highlightRing) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.34, 0.025, 8, 36),
        new THREE.MeshBasicMaterial({ color: this.theme.palette.accent, transparent: true, opacity: 0.9, depthWrite: false })
      );
      ring.renderOrder = 6;
      this.scene.add(ring);
      this.highlightRing = ring;
    }
    const object = this.findTargetObject(target);
    if (!object) return;
    this.highlighted = object;
    this.highlightRing.visible = true;
    this.highlightRing.material.color.setHex(this.theme.palette.accent);
  }

  findTargetObject(target) {
    const map = {
      power: this.case.userData.powerHitTarget,
      "power-button": this.case.userData.powerHitTarget,
      "clean-cloth": this.cleaningCloth,
      "case-screw": this.caseScrews.find((screw) => screw.visible && screw.userData.interactive),
      plug: this.plug,
      peripheral: this.peripheralCable,
      bracelet: this.character.userData.bracelet,
      strap: this.strap,
      bins: this.bins,
      camera: this.cameraProp,
      lever: this.motherboard.userData.lever,
      clips: this.motherboard.userData.ramSlots,
      "ram-clips": this.motherboard.userData.ramSlots,
      cpu: this.cpu,
      ram: this.ram,
      cooler: this.cooler,
      psu: this.psu,
      tools: this.toolKit,
      "monitor-cable": this.peripheralCable,
      "fan-cable": this.fanCable.userData.connector,
      socket: this.motherboard.userData.socket,
      "ram-slot": this.motherboard.userData.ramSlots
    };
    return map[target] || null;
  }

  setTheme(theme) {
    this.theme = theme;
    const p = theme.palette;
    if (this.scene) {
      this.scene.background.setHex(p.bg);
      this.scene.fog.color.setHex(p.fog);
      this.renderer.toneMappingExposure = theme.id === "neon" ? 1.2 : theme.id === "contrast" ? 1.4 : 1.05;
      this.lights.hemi.color.setHex(theme.flags.dark ? 0x9bc7ff : 0xffffff);
      this.lights.hemi.groundColor.setHex(theme.id === "lofi" ? 0x3a2418 : 0x4b3a2d);
      this.lights.key.color.setHex(theme.id === "lofi" ? 0xffc88a : theme.id === "neon" ? 0xbff6ff : 0xfff1dc);
      this.lights.key.intensity = theme.flags.dark ? 1.5 : 2.1;
      this.lights.fill.color.setHex(theme.id === "neon" ? 0xff4fd8 : 0xb9dcff);
      this.lights.rim.color.setHex(p.accent);
      this.grid.visible = Boolean(theme.flags.grid);
      this.grid.material.color.setHex(p.accent);
      this.grid.material.opacity = theme.id === "neon" ? 0.28 : 0.16;
      this.scene.traverse((child) => {
        if (!child.isMesh && !child.isSprite) return;
        const material = child.material;
        if (!material || Array.isArray(material)) return;
        const role = material.userData?.role;
        if (!role) return;
        if (role === "pcb") {
          if (this.motherboard?.userData) {
            this.motherboard.userData.pcbTexture?.dispose?.();
            const next = makePcbTexture(p);
            this.motherboard.userData.pcbTexture = next;
            material.map = next;
          }
          material.color.setHex(0xffffff);
          material.needsUpdate = true;
          return;
        }
        const value = p[role];
        if (typeof value !== "number") return;
        material.color.setHex(value);
        if (theme.flags.emissive && ["accent", "accent2", "caseTrim"].includes(role)) {
          material.emissive.setHex(value);
          material.emissiveIntensity = role === "accent" ? 1.1 : 0.45;
        } else if (material.emissive) {
          material.emissive.setHex(role === "accent" ? p.accent : 0x000000);
          material.emissiveIntensity = role === "accent" ? 0.18 : 0;
        }
        if (theme.id === "contrast") {
          material.roughness = 1;
          material.metalness = 0;
        }
        material.needsUpdate = true;
      });
      this.edgeMaterials.forEach((material) => {
        material.color.setHex(theme.id === "blueprint" ? 0xbfe6ff : theme.id === "neon" ? p.accent : theme.id === "contrast" ? 0xffffff : p.accent2);
        material.opacity = theme.id === "blueprint" ? 0.75 : 0.4;
      });
      this.setEdgeVisibility(theme.flags.outline);
      if (this.container) {
        this.container.classList.toggle("is-pixel", theme.id === "pixel");
        this.container.classList.toggle("is-blueprint", theme.id === "blueprint");
        this.container.classList.toggle("is-contrast", theme.id === "contrast");
        this.container.classList.toggle("is-neon", theme.id === "neon");
      }
      this.motionReduced = Boolean(theme.flags.reduced);
      if (!this.fpsGuard.level) {
        this.quality = resolveQuality(this.qualitySetting || "auto");
        this.applyQuality();
      }
      if (this.level === "safety" && this.powerState !== "off") {
        this.setMonitorDesktop();
        this.monitor.userData.screenMat.color.setHex(0xffffff);
        this.monitor.userData.screenMat.needsUpdate = true;
      } else if (this.powerState === "booting" || this.powerState === "on") {
        this.setBoot(this.powerProgress || 1);
      }
    }
  }

  setEdgeVisibility(visible) {
    this.scene.traverse((child) => {
      if (child.userData?.outline) child.visible = visible;
    });
  }

  applyQuality() {
    if (!this.renderer) return;
    const theme = this.theme;
    let dpr = this.quality.dpr;
    if (theme.id === "pixel") dpr = Math.min(dpr, 0.7);
    if (this.quality.tier === "low") dpr = Math.min(dpr, 1);
    this.renderer.setPixelRatio(dpr);
    this.renderer.shadowMap.enabled = this.quality.shadows && Boolean(theme.flags.shadows);
    this.lights.key.castShadow = this.renderer.shadowMap.enabled;
    this.particles?.setScale(this.quality.particles);
    this.resize();
    this.onQuality?.(this.quality, this.fpsGuard.fps);
  }

  downgrade(level, fps) {
    if (level === 1) {
      this.renderer.setPixelRatio(Math.min(1, this.quality.dpr));
      this.renderer.shadowMap.enabled = false;
      this.lights.key.castShadow = false;
      this.particles?.setScale(0.55);
    } else {
      this.renderer.setPixelRatio(0.8);
      this.particles?.setScale(0.25);
      this.motionReduced = true;
    }
    this.onQuality?.({
      ...this.quality,
      tier: "auto · light",
      label: "Auto · light",
      dpr: this.renderer.getPixelRatio(),
      shadows: false,
      particles: this.particles?.scale || 0.25
    }, fps);
  }

  setSettings(settings) {
    const previousQuality = this.qualitySetting;
    this.settings = settings;
    this.qualitySetting = settings.quality || "auto";
    this.audio?.setEnabled(settings.sound !== false);
    if (this.qualitySetting !== previousQuality) {
      this.fpsGuard.reset();
      this.quality = resolveQuality(this.qualitySetting);
      this.applyQuality();
    }
    this.motionReduced = settings.motion === "reduced" || Boolean(this.theme.flags.reduced);
  }

  updateCamera(dt) {
    const state = this.cameraState;
    const target = this.cameraTarget;
    const sinPhi = Math.sin(state.phi);
    const portraitScale = THREE.MathUtils.clamp(1.2 / this.camera.aspect, 1, 1.65);
    const radius = state.radius * portraitScale;
    const x = target.x + radius * sinPhi * Math.sin(state.theta);
    const y = target.y + radius * Math.cos(state.phi);
    const z = target.z + radius * sinPhi * Math.cos(state.theta);
    this.camera.position.set(x, y, z);
    if (this.shake > 0.001) {
      const amount = this.shake;
      this.camera.position.x += (Math.random() - 0.5) * amount;
      this.camera.position.y += (Math.random() - 0.5) * amount;
      this.camera.position.z += (Math.random() - 0.5) * amount;
      this.shake *= Math.pow(0.02, dt);
      if (this.shake < 0.001) this.shake = 0;
    }
    this.camera.lookAt(target);
  }

  updateSeat(dt) {
    if (!this.seat) return;
    this.seat.elapsed += dt;
    this.seat.pressure = Math.min(1.15, this.seat.pressure + dt * 0.42);
    const wobble = Math.sin(this.seat.elapsed * 2.6) * 0.38 + Math.sin(this.seat.elapsed * 5.1) * 0.16;
    this.seat.balance += wobble * dt;
    this.seat.balance = THREE.MathUtils.clamp(this.seat.balance, -0.9, 0.9);
    if (Math.abs(this.seat.balance) > 0.44) this.seat.tiltTime += dt;
    else this.seat.tiltTime = Math.max(0, this.seat.tiltTime - dt * 2);
    this.setRamSeatVisual(this.seat.pressure, this.seat.balance);
    this.callbacks.onSeatProgress?.({
      pressure: this.seat.pressure,
      balance: this.seat.balance,
      tilt: this.seat.tiltTime
    });
  }

  updateFan(dt) {
    const on = this.powerState === "on" || this.powerState === "booting" || (this.level === "safety" && this.powerState === "off" && !this.safetyPoweredOff);
    if (on) {
      this.case.userData.fan.rotation.z += dt * 9;
      if (this.cooler.visible) this.cooler.userData.fan.rotation.y += dt * 12;
    }
    if (this.level === "power" && this.powerState === "fault") {
      this.case.userData.fan.rotation.z = 0;
    }
    if (this.powerState === "booting" || this.powerState === "on") {
      this.case.userData.rgb.material.emissiveIntensity = 1.2 + Math.sin(this.time * 2.4) * 0.3;
    }
  }

  updateHighlight() {
    if (!this.highlightRing?.visible || !this.highlighted) return;
    const world = this.highlighted.getWorldPosition(new THREE.Vector3());
    this.highlightRing.position.copy(world);
    this.highlightRing.quaternion.copy(this.camera.quaternion);
    const pulse = 1 + Math.sin(this.time * 5) * 0.16;
    this.highlightRing.scale.setScalar(pulse);
    this.highlightRing.material.opacity = 0.55 + Math.sin(this.time * 5) * 0.25;
  }

  loop() {
    if (this.disposed) return;
    this.frame = requestAnimationFrame(this.loop);
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.lastFrame) / 1000);
    this.lastFrame = now;
    this.time += dt;
    this.tweens.update(dt);
    this.updateCamera(dt);
    this.updateSeat(dt);
    this.updateFan(dt);
    this.bootStep(dt);
    this.updateHighlight();
    this.particles?.update(dt);
    if (this.theme.id === "lofi" || this.theme.id === "marshmallow" || this.theme.id === "candy") {
      this.particles?.ambientDust();
    }
    if (this.fpsGuard.update(dt) < 42) {
      this.renderer.setPixelRatio(Math.min(this.renderer.getPixelRatio(), 1));
    }
    this.renderer.render(this.scene, this.camera);
  }

  getStats() {
    return {
      calls: this.renderer.info.render.calls,
      triangles: this.renderer.info.render.triangles,
      fps: this.fpsGuard.fps,
      dpr: this.renderer.getPixelRatio()
    };
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.resizeObserver?.disconnect();
    this.tweens.clear();
    this.particles?.dispose();
    this.scene?.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          material.map?.dispose?.();
          material.dispose?.();
        });
      }
    });
    this.renderer?.dispose();
    this.renderer?.domElement?.remove();
  }
}
