import * as THREE from "three";

/* ==========================================================================
   Procedural low-poly hardware. Everything is built from primitives so the
   game has no model downloads and stays inside the draw-call budget.
   ========================================================================== */

export function M(color, role = "", {
  roughness = 0.62,
  metalness = 0.12,
  emissive = 0x000000,
  emissiveIntensity = 0.7,
  transparent = false,
  opacity = 1,
  flatShading = false,
  map = null,
  side = THREE.FrontSide
} = {}) {
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    emissive,
    emissiveIntensity,
    transparent,
    opacity,
    flatShading,
    map,
    side
  });
  material.userData.role = role;
  material.userData.base = {
    roughness, metalness, emissive, emissiveIntensity, transparent, opacity, flatShading
  };
  return material;
}

export function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function cyl(radiusTop, radiusBottom, height, material, x = 0, y = 0, z = 0, segments = 16) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function markInteractive(object, data) {
  object.userData.interactive = data;
  object.traverse((child) => {
    if (child.isMesh) {
      child.userData.interactive = data;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return object;
}

export function makeLabel(text, {
  color = "#fffdf8",
  background = "rgba(20, 20, 24, 0.78)",
  size = 44,
  width = 512,
  height = 128,
  font = "600 44px system-ui, sans-serif"
} = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);
  if (background) {
    ctx.fillStyle = background;
    const radius = 18;
    ctx.beginPath();
    ctx.roundRect(4, 4, width - 8, height - 8, radius);
    ctx.fill();
  }
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2 + 2, width - 36);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(width / height * size / 44, size / 44, 1);
  sprite.userData.label = true;
  return sprite;
}

export function makePcbTexture(palette = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  const base = `#${(palette.pcb || 0x245b46).toString(16).padStart(6, "0")}`;
  const accent = `#${(palette.accent || 0xb3261e).toString(16).padStart(6, "0")}`;
  const metal = `#${(palette.metal || 0xc3c7cd).toString(16).padStart(6, "0")}`;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 1024, 768);

  ctx.strokeStyle = "rgba(190, 220, 190, 0.28)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 90; i += 1) {
    let x = 40 + Math.random() * 940;
    let y = 40 + Math.random() * 680;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const steps = 2 + Math.floor(Math.random() * 4);
    for (let step = 0; step < steps; step += 1) {
      if (Math.random() > 0.5) x += (Math.random() - 0.5) * 150;
      else y += (Math.random() - 0.5) * 130;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = "rgba(230, 210, 150, 0.55)";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  const label = (text, x, y, size = 20, color = "rgba(240, 245, 235, 0.86)") => {
    ctx.fillStyle = color;
    ctx.font = `700 ${size}px monospace`;
    ctx.fillText(text, x, y);
  };
  label("CPU SOCKET", 312, 205, 18);
  label("DIMM A2", 626, 172, 17);
  label("DIMM B2", 626, 222, 17);
  label("PCIE X16", 630, 500, 18);
  label("24-PIN ATX", 850, 330, 15);
  label("CPU_FAN", 270, 330, 15);
  label("SATA", 810, 610, 15);
  label("TECHPRO MAINBOARD", 60, 720, 22, "rgba(245, 250, 240, 0.75)");

  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, 976, 720);

  ctx.strokeStyle = metal;
  ctx.globalAlpha = 0.35;
  for (let i = 0; i < 8; i += 1) {
    ctx.beginPath();
    ctx.arc(90 + i * 120, 700, 7, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 1024, 10);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function makeBootTexture(palette = {}, progress = 0.25) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext("2d");
  const dark = palette.dark;
  ctx.fillStyle = dark ? "#040a17" : "#08131a";
  ctx.fillRect(0, 0, 1024, 576);
  const accent = `#${(palette.accent || 0x25e6ff).toString(16).padStart(6, "0")}`;
  const accent2 = `#${(palette.accent2 || 0x2e5b4f).toString(16).padStart(6, "0")}`;
  ctx.fillStyle = accent;
  ctx.fillRect(64, 64, 14, 64);
  ctx.fillStyle = "#e9f8ff";
  ctx.font = "700 42px system-ui, sans-serif";
  ctx.fillText("TECHPRO BIOS", 100, 108);
  ctx.fillStyle = "rgba(210, 240, 255, 0.7)";
  ctx.font = "500 20px monospace";
  ctx.fillText("Assemble Computer Hardware · COC 1", 100, 144);
  ctx.fillStyle = "rgba(210, 240, 255, 0.82)";
  ctx.font = "500 22px monospace";
  const lines = [
    "CPU ............ TECHPRO PROCESSOR OK",
    "MEMORY ......... 8192 MB OK",
    "STORAGE ........ DETECTED",
    "CPU FAN ........ OK",
    "KEYBOARD ....... DETECTED",
    "MOUSE .......... DETECTED"
  ];
  lines.forEach((line, index) => {
    const shown = progress * lines.length > index;
    if (shown) {
      ctx.fillStyle = index === lines.length - 1 ? accent2 : "rgba(220, 244, 255, 0.86)";
      ctx.fillText(line, 96, 220 + index * 38);
    }
  });
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.strokeRect(72, 186, 880, 260);
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.fillRect(96, 486, 832, 18);
  ctx.fillStyle = accent;
  ctx.fillRect(96, 486, 832 * Math.max(0.04, progress), 18);
  ctx.fillStyle = "rgba(220, 244, 255, 0.7)";
  ctx.font = "500 18px monospace";
  ctx.fillText(progress >= 1 ? "Boot device found. Starting TechPro." : "Checking hardware...", 96, 540);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function createBench(palette) {
  const group = new THREE.Group();
  group.name = "bench";
  const wood = M(palette.bench, "bench", { roughness: 0.82, metalness: 0.02 });
  const top = M(palette.benchTop, "benchTop", { roughness: 0.75, metalness: 0.02 });
  const metal = M(palette.metal, "metal", { roughness: 0.4, metalness: 0.65 });

  const surface = box(9.4, 0.16, 5.2, top, 0, 0.98, 0);
  group.add(surface);
  group.add(box(9.6, 0.08, 5.4, wood, 0, 0.9, 0));
  const legPositions = [[-4.2, -2.2], [4.2, -2.2], [-4.2, 2.2], [4.2, 2.2]];
  legPositions.forEach(([x, z]) => {
    group.add(box(0.16, 0.9, 0.16, metal, x, 0.45, z));
    group.add(box(0.4, 0.06, 0.4, metal, x, 0.03, z));
  });
  group.add(box(9.0, 0.08, 0.08, metal, 0, 0.36, -2.1));
  group.add(box(0.08, 0.08, 4.4, metal, -4.2, 0.36, 0));

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(34, 26), M(palette.bg, "bg", { roughness: 1, metalness: 0 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02;
  floor.receiveShadow = true;
  group.add(floor);

  const wall = new THREE.Mesh(new THREE.PlaneGeometry(34, 14), M(palette.bg, "bg", { roughness: 1, metalness: 0 }));
  wall.position.set(0, 7, -8);
  wall.receiveShadow = true;
  group.add(wall);
  return group;
}

export function createPartsTray(palette) {
  const group = new THREE.Group();
  const trayMat = M(palette.caseTrim, "caseTrim", { roughness: 0.8, metalness: 0.1 });
  const inset = M(palette.bg, "bg", { roughness: 0.9, metalness: 0.02 });
  group.add(box(3.9, 0.09, 2.1, trayMat, 0, 0.035, 0));
  group.add(box(3.72, 0.02, 1.94, inset, 0, 0.085, 0));
  for (let i = 0; i < 5; i += 1) {
    group.add(box(0.6, 0.01, 0.6, M(palette.caseTrim, "caseTrim", { roughness: 0.7 }), -1.4 + i * 0.7, 0.1, 0.55));
  }
  return group;
}

export function createCase(palette) {
  const group = new THREE.Group();
  group.name = "case";
  const caseMat = M(palette.case, "case", { roughness: 0.5, metalness: 0.35 });
  const trim = M(palette.caseTrim, "caseTrim", { roughness: 0.38, metalness: 0.5 });
  const metal = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.78 });
  const dark = M(0x050608, "case", { roughness: 0.85, metalness: 0.1 });
  const accent = M(palette.accent, "accent", {
    roughness: 0.3, metalness: 0.2, emissive: palette.accent, emissiveIntensity: 0.25
  });

  const w = 2.1;
  const h = 3.1;
  const d = 3.3;
  group.add(box(w, 0.1, d, caseMat, 0, 0.05, 0));
  group.add(box(w, 0.1, d, caseMat, 0, h - 0.05, 0));
  group.add(box(0.08, h, d, caseMat, -w / 2, h / 2, 0));
  group.add(box(w, h, 0.08, caseMat, 0, h / 2, -d / 2));
  group.add(box(w, h, 0.06, caseMat, 0, h / 2, d / 2));
  group.add(box(w - 0.14, h - 0.24, 0.04, dark, 0, h / 2, -d / 2 + 0.07));
  group.add(box(0.12, h - 0.16, 0.16, trim, -w / 2 + 0.14, h / 2, d / 2 - 0.06));
  group.add(box(0.12, h - 0.16, 0.16, trim, w / 2 - 0.14, h / 2, d / 2 - 0.06));

  const front = new THREE.Group();
  front.position.set(0, 0, d / 2 + 0.02);
  front.add(box(w - 0.1, h - 0.12, 0.06, trim, 0, h / 2, 0.01));
  for (let i = 0; i < 12; i += 1) {
    front.add(box(w - 0.32, 0.012, 0.02, dark, 0, 0.32 + i * 0.07, 0.055));
  }
  const powerButton = cyl(0.13, 0.13, 0.05, accent, 0.62, h - 0.28, 0.07, 24);
  powerButton.rotation.x = Math.PI / 2;
  powerButton.name = "power-button";
  markInteractive(powerButton, { kind: "click", action: "power" });
  front.add(powerButton);
  const powerHitTarget = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 12),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })
  );
  powerHitTarget.position.set(0.62, h - 0.28, 0.07);
  powerHitTarget.name = "power-button-hit-target";
  markInteractive(powerHitTarget, { kind: "click", action: "power" });
  front.add(powerHitTarget);
  const powerRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.015, 8, 28), metal);
  powerRing.position.set(0.62, h - 0.28, 0.065);
  front.add(powerRing);
  for (let i = 0; i < 3; i += 1) {
    const usb = box(0.14, 0.05, 0.03, dark, 0.28 + i * 0.18, h - 0.28, 0.06);
    front.add(usb);
  }
  const rgb = box(w - 0.5, 0.025, 0.02, accent, 0, h - 0.55, 0.06);
  rgb.name = "rgb-strip";
  front.add(rgb);
  group.add(front);

  // PSU bay
  group.add(box(w - 0.22, 0.06, d - 0.3, trim, 0, 0.32, 0));
  group.add(box(w - 0.5, 0.02, d - 0.5, dark, 0, 0.36, 0));
  // Drive cage
  group.add(box(0.8, 1.05, 1.1, trim, -0.25, 0.95, 0.95));
  for (let i = 0; i < 3; i += 1) {
    group.add(box(0.72, 0.03, 1.0, dark, -0.25, 0.62 + i * 0.25, 0.95));
  }
  // Rear fan
  const fan = new THREE.Group();
  fan.name = "case-fan";
  fan.position.set(0.1, 2.32, -d / 2 + 0.18);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.055, 8, 28), metal);
  fan.add(ring);
  const fanHub = new THREE.Group();
  fanHub.name = "fan-blades";
  fanHub.add(cyl(0.11, 0.11, 0.12, dark, 0, 0, 0, 18));
  for (let i = 0; i < 7; i += 1) {
    const blade = box(0.3, 0.035, 0.12, M(palette.caseTrim, "caseTrim", { roughness: 0.5 }), 0.2, 0, 0);
    blade.rotation.z = (i / 7) * Math.PI * 2;
    blade.position.set(Math.cos((i / 7) * Math.PI * 2) * 0.22, Math.sin((i / 7) * Math.PI * 2) * 0.22, 0);
    fanHub.add(blade);
  }
  fan.add(fanHub);
  fan.rotation.y = Math.PI / 2;
  fan.rotation.z = Math.PI / 2;
  group.add(fan);

  // Motherboard standoffs on the left wall
  const standoffMat = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.8 });
  [[-0.82, 0.8, 0.2], [-0.82, 2.55, 0.2], [-0.82, 0.8, -0.9], [-0.82, 2.55, -0.9], [-0.82, 1.65, -0.2]].forEach(([x, y, z]) => {
    const post = cyl(0.07, 0.07, 0.18, standoffMat, x, y, z, 10);
    post.rotation.z = Math.PI / 2;
    group.add(post);
  });

  // Cable grommets
  for (let i = 0; i < 3; i += 1) {
    const grommet = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.035, 6, 16), dark);
    grommet.position.set(-0.45 + i * 0.35, 0.62, 0.5);
    grommet.rotation.x = Math.PI / 2;
    group.add(grommet);
  }

  // Leaning side panel
  const panel = box(w - 0.1, h - 0.18, 0.05, M(palette.caseTrim, "caseTrim", {
    roughness: 0.2, metalness: 0.6, transparent: true, opacity: 0.32
  }), -1.45, 1.45, 0.2);
  panel.rotation.z = -0.14;
  panel.name = "side-panel";
  group.add(panel);

  group.userData.powerButton = powerButton;
  group.userData.powerHitTarget = powerHitTarget;
  group.userData.fan = fanHub;
  group.userData.rgb = rgb;
  group.userData.panel = panel;
  group.userData.boardMount = new THREE.Object3D();
  group.userData.boardMount.position.set(-0.76, 1.68, 0.1);
  group.add(group.userData.boardMount);
  return group;
}

export function createMotherboard(palette, { small = false } = {}) {
  const group = new THREE.Group();
  group.name = "motherboard";
  const scale = small ? 0.82 : 1;
  const boardW = 2.55 * scale;
  const boardD = 1.95 * scale;
  const pcbTexture = makePcbTexture(palette);
  const pcb = M(0xffffff, "pcb", { roughness: 0.7, metalness: 0.15, map: pcbTexture });
  const board = box(boardW, 0.075, boardD, pcb, 0, 0, 0);
  board.name = "pcb";
  group.add(board);
  group.userData.pcbTexture = pcbTexture;

  const dark = M(0x11151a, "", { roughness: 0.6, metalness: 0.2 });
  const metal = M(palette.metal, "metal", { roughness: 0.28, metalness: 0.85 });
  const accent = M(palette.accent, "accent", { roughness: 0.45, metalness: 0.25 });
  const cream = M(0xe9e2d2, "", { roughness: 0.75, metalness: 0.05 });

  // CPU socket
  const socket = new THREE.Group();
  socket.name = "cpu-socket";
  socket.position.set(-0.58 * scale, 0.055, -0.38 * scale);
  socket.add(box(0.58 * scale, 0.07, 0.58 * scale, dark, 0, 0, 0));
  const pinField = new THREE.Mesh(
    new THREE.PlaneGeometry(0.42 * scale, 0.42 * scale),
    M(0x8d6b2f, "", { roughness: 0.35, metalness: 0.8 })
  );
  pinField.rotation.x = -Math.PI / 2;
  pinField.position.y = 0.038;
  socket.add(pinField);
  const socketMark = new THREE.Mesh(new THREE.CircleGeometry(0.045 * scale, 3), accent);
  socketMark.rotation.x = -Math.PI / 2;
  socketMark.position.set(-0.19 * scale, 0.04, -0.19 * scale);
  socketMark.rotation.z = Math.PI;
  socket.add(socketMark);
  const lever = new THREE.Group();
  lever.name = "cpu-lever";
  lever.position.set(0.32 * scale, 0.05, -0.38 * scale);
  const leverBar = cyl(0.018, 0.018, 0.48 * scale, metal, 0, 0.06, 0, 8);
  leverBar.rotation.z = Math.PI / 2;
  lever.add(leverBar);
  const leverArm = box(0.02, 0.02, 0.28 * scale, metal, 0.22 * scale, 0.06, 0.12 * scale);
  lever.add(leverArm);
  const leverHitTarget = new THREE.Mesh(
    new THREE.SphereGeometry(0.56 * scale, 16, 12),
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      colorWrite: false,
      side: THREE.DoubleSide
    })
  );
  leverHitTarget.position.set(0.22 * scale, 0.08, 0.12 * scale);
  leverHitTarget.name = "cpu-lever-hit-target";
  lever.add(leverHitTarget);
  lever.userData.closed = true;
  markInteractive(lever, { kind: "lever" });
  socket.add(lever);
  group.add(socket);
  group.userData.socket = socket;
  group.userData.lever = lever;
  group.userData.socketPosition = new THREE.Vector3(-0.58 * scale, 0.11, -0.38 * scale);

  // RAM slots
  const ramSlots = new THREE.Group();
  ramSlots.name = "ram-slots";
  for (let i = 0; i < 4; i += 1) {
    const slot = box(0.06, 0.055, 1.12 * scale, i === 1 || i === 3 ? accent : dark, 0.5 * scale + i * 0.11, 0.06, -0.18 * scale);
    slot.name = i === 1 ? "ram-slot-a2" : `ram-slot-${i}`;
    ramSlots.add(slot);
    const clipA = box(0.075, 0.09, 0.11, cream, 0.5 * scale + i * 0.11, 0.08, -0.78 * scale);
    clipA.name = "ram-clip";
    ramSlots.add(clipA);
    const clipB = box(0.075, 0.09, 0.11, cream, 0.5 * scale + i * 0.11, 0.08, 0.42 * scale);
    clipB.name = "ram-clip";
    ramSlots.add(clipB);
  }
  group.add(ramSlots);
  group.userData.ramSlots = ramSlots;
  group.userData.ramSlotPosition = new THREE.Vector3(0.61 * scale, 0.12, -0.18 * scale);

  // PCIe slot
  group.add(box(1.35 * scale, 0.05, 0.08, accent, 0.42 * scale, 0.06, 0.68 * scale));
  group.add(box(0.82 * scale, 0.05, 0.07, dark, 0.42 * scale, 0.06, 0.86 * scale));

  // Chipset heatsink
  const chip = box(0.42 * scale, 0.13, 0.42 * scale, metal, 0.5 * scale, 0.12, 0.24 * scale);
  for (let i = 0; i < 5; i += 1) chip.add(box(0.36 * scale, 0.02, 0.02, dark, 0, 0.07, -0.16 + i * 0.08));
  group.add(chip);

  // Capacitors
  for (let i = 0; i < 8; i += 1) {
    const cap = cyl(0.055 * scale, 0.055 * scale, 0.16 * scale, dark, -0.92 * scale + (i % 4) * 0.16, 0.11, -0.05 + Math.floor(i / 4) * 0.24, 10);
    cap.add(cyl(0.05 * scale, 0.05 * scale, 0.01 * scale, metal, 0, 0.085, 0, 10));
    group.add(cap);
  }

  // 24-pin and fan header
  group.add(box(0.14 * scale, 0.12, 0.44 * scale, cream, 1.08 * scale, 0.1, -0.18 * scale));
  const fanHeader = box(0.13 * scale, 0.06, 0.18 * scale, cream, -0.2 * scale, 0.08, -0.78 * scale);
  fanHeader.name = "cpu-fan-header";
  group.add(fanHeader);
  group.userData.fanHeader = fanHeader;

  // Screw holes
  const holes = [[-1.12, -0.82], [1.12, -0.82], [-1.12, 0.82], [1.12, 0.82], [0.2, 0.82]];
  holes.forEach(([x, z]) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.012, 6, 18), metal);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x * scale, 0.045, z * scale);
    group.add(ring);
  });

  // Front-panel header and SATA
  group.add(box(0.26 * scale, 0.06, 0.1 * scale, cream, -0.9 * scale, 0.07, 0.72 * scale));
  group.add(box(0.34 * scale, 0.05, 0.12 * scale, dark, 1.0 * scale, 0.07, 0.72 * scale));

  // X-ray labels
  const labels = [
    ["CPU SOCKET", -0.58 * scale, 0.25, -0.38 * scale],
    ["RAM A2", 0.61 * scale, 0.25, -0.18 * scale],
    ["PCIE X16", 0.42 * scale, 0.2, 0.68 * scale],
    ["CPU_FAN", -0.2 * scale, 0.22, -0.78 * scale],
    ["24-PIN", 1.08 * scale, 0.26, -0.18 * scale]
  ];
  group.userData.labels = labels.map(([text, x, y, z]) => {
    const sprite = makeLabel(text, { size: 26, width: 420, height: 96 });
    sprite.position.set(x, y, z);
    sprite.visible = false;
    group.add(sprite);
    return sprite;
  });

  return group;
}

export function createCpu(palette) {
  const group = new THREE.Group();
  group.name = "cpu";
  const green = M(0x2e5b50, "", { roughness: 0.5, metalness: 0.2 });
  const silver = M(0xd8dde5, "metal", { roughness: 0.22, metalness: 0.9 });
  const gold = M(0xd6a74a, "", { roughness: 0.3, metalness: 0.85 });
  const accent = M(palette.accent, "accent", { roughness: 0.4, metalness: 0.3 });

  const body = box(0.52, 0.07, 0.52, green, 0, 0, 0);
  group.add(body);
  group.add(box(0.38, 0.025, 0.38, silver, 0, 0.047, 0));
  group.add(box(0.32, 0.012, 0.32, M(0x9ca3ad, "metal", { roughness: 0.2, metalness: 0.9 }), 0, 0.065, 0));

  // Gold pin field on the underside.
  const pinGeometry = new THREE.BoxGeometry(0.012, 0.008, 0.012);
  const pins = new THREE.InstancedMesh(pinGeometry, gold, 14 * 14);
  const matrix = new THREE.Matrix4();
  let index = 0;
  for (let x = 0; x < 14; x += 1) {
    for (let z = 0; z < 14; z += 1) {
      matrix.makeTranslation(-0.21 + x * 0.032, -0.04, -0.21 + z * 0.032);
      pins.setMatrixAt(index, matrix);
      index += 1;
    }
  }
  pins.instanceMatrix.needsUpdate = true;
  group.add(pins);

  // Corner triangle. This is the alignment key the student rotates.
  const tri = new THREE.Mesh(new THREE.CircleGeometry(0.045, 3), accent);
  tri.rotation.x = -Math.PI / 2;
  tri.rotation.z = Math.PI;
  tri.position.set(-0.19, 0.041, -0.19);
  group.add(tri);
  const notch = box(0.06, 0.02, 0.06, accent, -0.24, 0.04, -0.24);
  group.add(notch);
  const hitTarget = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.24, 0.82),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false, side: THREE.DoubleSide })
  );
  hitTarget.name = "cpu-hit-target";
  group.add(hitTarget);

  group.userData.part = "cpu";
  group.userData.triangle = tri;
  return group;
}

export function createCooler(palette) {
  const group = new THREE.Group();
  group.name = "cooler";
  const metal = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.82 });
  const dark = M(0x1d232a, "", { roughness: 0.55, metalness: 0.25 });
  const accent = M(palette.accent, "accent", { roughness: 0.4, metalness: 0.3 });
  group.add(box(0.52, 0.05, 0.52, metal, 0, 0.02, 0));
  for (let i = 0; i < 4; i += 1) {
    const pipe = cyl(0.025, 0.025, 0.5, metal, -0.18 + i * 0.12, 0.28, 0.18, 8);
    group.add(pipe);
  }
  const finGeometry = new THREE.BoxGeometry(0.68, 0.015, 0.52);
  const fins = new THREE.InstancedMesh(finGeometry, metal, 16);
  const matrix = new THREE.Matrix4();
  for (let i = 0; i < 16; i += 1) {
    matrix.makeTranslation(0, 0.1 + i * 0.026, -0.02);
    fins.setMatrixAt(i, matrix);
  }
  fins.instanceMatrix.needsUpdate = true;
  group.add(fins);
  const shroud = new THREE.Group();
  shroud.position.set(0, 0.58, 0);
  shroud.add(cyl(0.3, 0.3, 0.06, dark, 0, 0, 0, 20));
  const fanBlades = new THREE.Group();
  fanBlades.name = "cooler-fan";
  for (let i = 0; i < 9; i += 1) {
    const blade = box(0.22, 0.02, 0.09, accent, 0.13, 0.04, 0);
    blade.rotation.y = (i / 9) * Math.PI * 2;
    blade.position.set(Math.cos((i / 9) * Math.PI * 2) * 0.15, 0.05, Math.sin((i / 9) * Math.PI * 2) * 0.15);
    fanBlades.add(blade);
  }
  shroud.add(fanBlades);
  group.add(shroud);
  group.userData.fan = fanBlades;
  group.userData.part = "cooler";
  return group;
}

export function createRam(palette) {
  const group = new THREE.Group();
  group.name = "ram";
  const pcb = M(0x1d3f35, "", { roughness: 0.6, metalness: 0.15 });
  const black = M(0x101419, "", { roughness: 0.55, metalness: 0.2 });
  const gold = M(0xd6a74a, "", { roughness: 0.3, metalness: 0.9 });
  const accent = M(palette.accent, "accent", { roughness: 0.45, metalness: 0.3 });
  const label = M(0xe8e2d6, "", { roughness: 0.8, metalness: 0.05 });

  group.add(box(1.28, 0.055, 0.32, pcb, 0, 0, 0));
  for (let i = 0; i < 8; i += 1) {
    group.add(box(0.11, 0.035, 0.17, black, -0.53 + i * 0.15, 0.045, 0));
  }
  group.add(box(0.6, 0.004, 0.2, label, -0.12, 0.066, 0));
  group.add(box(1.28, 0.02, 0.05, gold, 0, -0.038, 0.1));
  group.add(box(0.5, 0.02, 0.04, accent, 0.32, -0.038, 0.1));
  const hitTarget = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 0.2, 0.48),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false, side: THREE.DoubleSide })
  );
  hitTarget.name = "ram-hit-target";
  group.add(hitTarget);
  // Offset notch. It only fits one way.
  group.add(box(0.09, 0.08, 0.33, accent, -0.18, 0, 0));
  group.userData.part = "ram";
  group.userData.notch = -0.18;
  return group;
}

export function createPsu(palette) {
  const group = new THREE.Group();
  group.name = "psu";
  const shell = M(0x24282f, "", { roughness: 0.55, metalness: 0.45 });
  const metal = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.85 });
  const accent = M(palette.accent, "accent", { roughness: 0.4, metalness: 0.3 });
  group.add(box(1.55, 0.95, 1.25, shell, 0, 0, 0));
  const grille = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.025, 8, 26), metal);
  grille.rotation.x = Math.PI / 2;
  grille.position.set(0.1, 0.49, 0);
  group.add(grille);
  for (let i = 0; i < 8; i += 1) {
    const spoke = box(0.7, 0.018, 0.018, metal, 0.1, 0.49, 0);
    spoke.rotation.y = (i / 8) * Math.PI;
    group.add(spoke);
  }
  group.add(cyl(0.12, 0.12, 0.05, metal, 0.1, 0.5, 0, 16));
  for (let i = 0; i < 4; i += 1) {
    group.add(box(0.18, 0.05, 0.1, i % 2 ? accent : metal, 0.35 + i * 0.14, 0.02, 0.68));
  }
  group.userData.part = "psu";
  return group;
}

export function createMonitor(palette) {
  const group = new THREE.Group();
  group.name = "monitor";
  const shell = M(palette.case, "case", { roughness: 0.45, metalness: 0.35 });
  const metal = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.8 });
  const screenMat = new THREE.MeshBasicMaterial({ color: 0x0a1116 });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.4), screenMat);
  screen.position.set(0, 0.3, 0.055);
  group.add(screen);
  group.add(box(2.7, 1.62, 0.12, shell, 0, 0.3, 0));
  group.add(box(0.18, 0.62, 0.18, metal, 0, -0.58, -0.04));
  group.add(box(1.1, 0.06, 0.65, metal, 0, -0.9, 0.05));
  const led = new THREE.Mesh(new THREE.CircleGeometry(0.025, 12), new THREE.MeshBasicMaterial({ color: palette.accent }));
  led.position.set(1.15, -0.45, 0.07);
  group.add(led);
  group.userData.screen = screen;
  group.userData.screenMat = screenMat;
  group.userData.led = led;
  return group;
}

export function createKeyboard(palette) {
  const group = new THREE.Group();
  const shell = M(palette.case, "case", { roughness: 0.5, metalness: 0.25 });
  const key = M(0xd9d4c8, "", { roughness: 0.8, metalness: 0.02 });
  group.add(box(1.7, 0.07, 0.55, shell, 0, 0, 0));
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 14; c += 1) {
      group.add(box(0.085, 0.025, 0.075, key, -0.72 + c * 0.11, 0.05, -0.18 + r * 0.1));
    }
  }
  group.add(box(0.65, 0.025, 0.075, key, 0, 0.05, 0.22));
  return group;
}

export function createMouse(palette) {
  const group = new THREE.Group();
  const shell = M(palette.case, "case", { roughness: 0.45, metalness: 0.3 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.22, 4, 10), shell);
  body.rotation.x = Math.PI / 2;
  body.scale.set(1, 0.6, 1);
  body.position.y = 0.06;
  body.castShadow = true;
  group.add(body);
  group.add(box(0.025, 0.02, 0.12, M(0x11151a, "", { roughness: 0.5 }), 0, 0.12, -0.05));
  return group;
}

export function createCharacter(palette) {
  const group = new THREE.Group();
  group.name = "technician";
  const skin = M(0xd6a37a, "", { roughness: 0.75 });
  const shirt = M(palette.accent2, "accent2", { roughness: 0.7 });
  const pants = M(0x2b3340, "", { roughness: 0.8 });
  const hair = M(0x241a16, "", { roughness: 0.9 });
  const metal = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.8 });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.75, 4, 12), shirt);
  body.position.y = 1.28;
  body.castShadow = true;
  group.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.23, 18, 14), skin);
  head.position.y = 1.95;
  head.castShadow = true;
  group.add(head);
  const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.235, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.48), hair);
  hairCap.position.y = 2.02;
  group.add(hairCap);
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1b1714 });
  [-0.08, 0.08].forEach((x) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), eyeMat);
    eye.position.set(x, 1.98, 0.205);
    group.add(eye);
  });

  const arm = (x, side) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(x, 1.62, 0);
    const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.42, 4, 8), shirt);
    upper.position.y = -0.22;
    shoulder.add(upper);
    const forearm = new THREE.Group();
    forearm.position.y = -0.48;
    const armMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.065, 0.36, 4, 8), skin);
    armMesh.position.y = -0.18;
    forearm.add(armMesh);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), skin);
    hand.position.y = -0.4;
    forearm.add(hand);
    shoulder.add(forearm);
    group.add(shoulder);
    return { shoulder, forearm, hand, side };
  };
  const left = arm(-0.34, "left");
  const right = arm(0.34, "right");
  left.shoulder.rotation.z = 0.18;
  right.shoulder.rotation.z = -0.18;
  left.forearm.rotation.x = -0.2;
  right.forearm.rotation.x = -0.2;

  const leg = (x) => {
    const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.66, 4, 8), pants);
    mesh.position.set(x, 0.48, 0);
    mesh.castShadow = true;
    group.add(mesh);
    const shoe = box(0.18, 0.08, 0.3, M(0x171b20, "", { roughness: 0.7 }), x, 0.08, 0.06);
    group.add(shoe);
  };
  leg(-0.14);
  leg(0.14);

  // Metal bracelet. This is a draggable safety hazard.
  const bracelet = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.018, 8, 24), metal);
  bracelet.position.set(0.43, 1.16, 0.03);
  bracelet.rotation.x = Math.PI / 2;
  bracelet.name = "bracelet";
  markInteractive(bracelet, { kind: "safety", action: "bracelet" });
  group.add(bracelet);

  // Wrist strap band. Hidden until worn.
  const strap = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.02, 8, 24), M(palette.accent, "accent", { roughness: 0.6 }));
  strap.position.set(-0.43, 1.16, 0.03);
  strap.rotation.x = Math.PI / 2;
  strap.name = "worn-strap";
  strap.visible = false;
  group.add(strap);

  group.userData.bracelet = bracelet;
  group.userData.wornStrap = strap;
  group.userData.leftHand = left.hand;
  group.userData.rightHand = right.hand;
  return group;
}

export function createWristStrap(palette) {
  const group = new THREE.Group();
  group.name = "wrist-strap";
  const band = M(palette.accent, "accent", { roughness: 0.65, metalness: 0.05 });
  const metal = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.8 });
  const strap = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.035, 8, 24), band);
  strap.rotation.x = Math.PI / 2;
  group.add(strap);
  group.add(box(0.08, 0.04, 0.12, metal, 0.15, 0.02, 0));
  const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.16, 0.02, 0),
    new THREE.Vector3(0.35, 0.02, 0.1),
    new THREE.Vector3(0.55, 0.02, 0.05),
    new THREE.Vector3(0.72, 0.02, -0.1)
  ]), 14, 0.012, 6, false), metal);
  group.add(cable);
  group.userData.part = "strap";
  return group;
}

export function createCamera(palette) {
  const group = new THREE.Group();
  group.name = "reference-camera";
  const bodyMat = M(0x24282f, "", { roughness: 0.55, metalness: 0.35 });
  const metal = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.8 });
  group.add(box(0.34, 0.22, 0.18, bodyMat, 0, 0, 0));
  const lens = cyl(0.09, 0.09, 0.1, metal, 0, 0, 0.14, 18);
  lens.rotation.x = Math.PI / 2;
  group.add(lens);
  group.add(box(0.1, 0.05, 0.05, M(palette.accent, "accent", { roughness: 0.4 }), 0.09, 0.13, 0));
  group.userData.part = "camera";
  return group;
}

export function createBins(palette) {
  const group = new THREE.Group();
  group.name = "parts-bins";
  const binMat = M(palette.accent2, "accent2", { roughness: 0.7 });
  const labelMat = M(0xf1eadc, "", { roughness: 0.85 });
  [-0.35, 0.35].forEach((x, index) => {
    const bin = box(0.58, 0.3, 0.46, binMat, x, 0.15, 0);
    group.add(bin);
    group.add(box(0.42, 0.16, 0.01, labelMat, x, 0.17, 0.235));
    const text = makeLabel(index === 0 ? "SCREWS" : "CABLES", { size: 18, width: 300, height: 80, background: null, color: "#2a231c" });
    text.position.set(x, 0.2, 0.25);
    text.scale.set(0.22, 0.06, 1);
    group.add(text);
  });
  group.userData.part = "bins";
  return group;
}

export function createPowerStrip(palette) {
  const group = new THREE.Group();
  group.name = "power-strip";
  const body = M(0xe9e5dc, "", { roughness: 0.7, metalness: 0.05 });
  const dark = M(0x1c2126, "", { roughness: 0.6, metalness: 0.2 });
  group.add(box(1.1, 0.12, 0.36, body, 0, 0, 0));
  for (let i = 0; i < 3; i += 1) {
    group.add(box(0.18, 0.02, 0.12, dark, -0.35 + i * 0.35, 0.065, 0));
  }
  group.add(box(0.3, 0.02, 0.05, M(0xff4d4d, "", { roughness: 0.5 }), 0.42, 0.07, 0));
  return group;
}

export function createPlug(palette) {
  const group = new THREE.Group();
  group.name = "power-plug";
  const body = M(0xe9e5dc, "", { roughness: 0.65, metalness: 0.05 });
  const metal = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.8 });
  group.add(box(0.24, 0.18, 0.14, body, 0, 0, 0));
  group.add(box(0.04, 0.06, 0.12, metal, -0.06, 0.13, 0));
  group.add(box(0.04, 0.06, 0.12, metal, 0.06, 0.13, 0));
  const cableCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.02, -0.07),
    new THREE.Vector3(0.2, -0.1, -0.4),
    new THREE.Vector3(0.6, -0.18, -0.8),
    new THREE.Vector3(1.1, -0.2, -1.0)
  ]);
  const cable = new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 18, 0.022, 6, false), M(0x181b1f, "", { roughness: 0.8 }));
  group.add(cable);
  group.userData.part = "plug";
  return group;
}

export function createPeripheralCable(palette) {
  const group = new THREE.Group();
  group.name = "peripheral-cable";
  const metal = M(palette.metal, "metal", { roughness: 0.35, metalness: 0.75 });
  const body = M(0x22272e, "", { roughness: 0.6, metalness: 0.2 });
  group.add(box(0.26, 0.11, 0.08, body, 0, 0, 0));
  group.add(box(0.1, 0.07, 0.02, metal, 0, 0, 0.05));
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, -0.04),
    new THREE.Vector3(-0.2, -0.1, -0.2),
    new THREE.Vector3(-0.45, -0.18, -0.4),
    new THREE.Vector3(-0.8, -0.2, -0.5)
  ]);
  group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 14, 0.018, 6, false), M(0x181b1f, "", { roughness: 0.8 })));
  group.userData.part = "peripheral";
  return group;
}

export function createToolKit(palette) {
  const group = new THREE.Group();
  group.name = "tool-kit";
  const metal = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.8 });
  const handle = M(palette.accent, "accent", { roughness: 0.6 });
  const driver = new THREE.Group();
  driver.position.set(-0.2, 0.08, 0);
  driver.add(cyl(0.035, 0.035, 0.3, handle, 0, 0, 0, 10));
  const shaft = cyl(0.012, 0.012, 0.32, metal, 0, 0.3, 0, 8);
  driver.add(shaft);
  driver.rotation.z = 0.5;
  group.add(driver);
  const paste = cyl(0.06, 0.06, 0.22, M(0xd9d2c2, "", { roughness: 0.7 }), 0.18, 0.11, 0.02, 12);
  paste.add(cyl(0.04, 0.04, 0.04, M(palette.accent, "accent", { roughness: 0.5 }), 0, 0.13, 0, 10));
  group.add(paste);
  for (let i = 0; i < 3; i += 1) {
    const tie = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.01, 6, 16), M(0x22262b, "", { roughness: 0.7 }));
    tie.rotation.x = Math.PI / 2;
    tie.position.set(0.36 + i * 0.09, 0.02, 0.1);
    group.add(tie);
  }
  return group;
}

export function createFlashlight(palette) {
  const group = new THREE.Group();
  const metal = M(palette.metal, "metal", { roughness: 0.25, metalness: 0.9 });
  const dark = M(0x171b20, "", { roughness: 0.6, metalness: 0.3 });
  group.add(cyl(0.07, 0.09, 0.38, dark, 0, 0, 0, 14));
  group.add(cyl(0.11, 0.08, 0.12, metal, 0, 0.24, 0, 14));
  const beam = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.2, 18, 1, true), new THREE.MeshBasicMaterial({
    color: palette.accent, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false
  }));
  beam.position.y = 0.9;
  beam.rotation.x = Math.PI;
  group.add(beam);
  return group;
}

export function createScrew(palette) {
  const metal = M(palette.metal, "metal", { roughness: 0.3, metalness: 0.9 });
  const group = new THREE.Group();
  const head = cyl(0.035, 0.035, 0.025, metal, 0, 0, 0, 12);
  group.add(head);
  group.add(cyl(0.014, 0.014, 0.09, metal, 0, -0.055, 0, 8));
  return group;
}
