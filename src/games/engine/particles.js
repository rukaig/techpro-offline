import * as THREE from "three";

/* ==========================================================================
   Small pooled particle systems: sparks, dust, and confetti. The pool size
   follows the quality setting, and reduced-motion themes get none.
   ========================================================================== */

export class Particles {
  constructor(scene, { scale = 1, palette } = {}) {
    this.scene = scene;
    this.scale = scale;
    this.palette = palette;
    this.max = Math.max(24, Math.round(420 * scale));
    this.items = [];
    this.spark = this.createSystem(0xffffff, 0.075, THREE.AdditiveBlending);
    this.confetti = this.createSystem(0xffffff, 0.14, THREE.NormalBlending);
    this.dust = this.createSystem(0xffffff, 0.035, THREE.NormalBlending);
    this.dustClock = 0;
  }

  createSystem(color, size, blending) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.max * 3);
    const colors = new Float32Array(this.max * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setDrawRange(0, 0);
    const material = new THREE.PointsMaterial({
      size,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending,
      sizeAttenuation: true
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    points.renderOrder = 4;
    this.scene.add(points);
    return { geometry, material, points, positions, colors, count: 0 };
  }

  setPalette(palette) {
    this.palette = palette;
  }

  setScale(scale) {
    this.scale = scale;
  }

  spawn(system, {
    position,
    count = 18,
    color = 0xffffff,
    colors = null,
    speed = 1.2,
    spread = 1,
    gravity = -2.2,
    life = 0.7,
    up = 1
  }) {
    const total = Math.max(1, Math.round(count * this.scale));
    for (let i = 0; i < total; i += 1) {
      if (this.items.length >= this.max) this.items.shift();
      const angle = Math.random() * Math.PI * 2;
      const power = speed * (0.35 + Math.random() * 0.9);
      const chosen = colors ? colors[Math.floor(Math.random() * colors.length)] : color;
      this.items.push({
        system,
        position: new THREE.Vector3(
          position.x + (Math.random() - 0.5) * spread * 0.35,
          position.y + (Math.random() - 0.5) * spread * 0.25,
          position.z + (Math.random() - 0.5) * spread * 0.35
        ),
        velocity: new THREE.Vector3(
          Math.cos(angle) * power * (0.4 + Math.random() * 0.6),
          up * power * (0.35 + Math.random()),
          Math.sin(angle) * power * (0.4 + Math.random() * 0.6)
        ),
        gravity,
        life: life * (0.6 + Math.random() * 0.8),
        maxLife: life,
        color: new THREE.Color(chosen),
        size: 0.6 + Math.random() * 0.8
      });
    }
    this.sync(system);
  }

  sparkBurst(position, color) {
    this.spawn(this.spark, {
      position, count: 22, color: color || this.palette?.accent || 0xffd166,
      speed: 1.9, gravity: -3.6, life: 0.55, spread: 1.4
    });
  }

  dustBurst(position, color) {
    this.spawn(this.dust, {
      position, count: 12, color: color || 0xbfae98,
      speed: 0.35, gravity: -0.15, life: 1.2, spread: 1.8, up: 0.4
    });
  }

  confettiBurst(position, colors) {
    this.spawn(this.confetti, {
      position, count: 80,
      colors: colors || [this.palette?.accent || 0xb3261e, this.palette?.accent2 || 0x2e5b4f, 0xffd166, 0xffffff],
      speed: 2.8, gravity: -2.1, life: 1.8, spread: 2.2, up: 1.6
    });
  }

  ambientDust(bounds = { x: 4, y: 2.2, z: 2.4 }, origin = { x: 0, y: 1.5, z: 0 }) {
    if (!this.scale) return;
    this.dustClock += 1;
    if (this.dustClock % 9 !== 0) return;
    this.spawn(this.dust, {
      position: {
        x: origin.x + (Math.random() - 0.5) * bounds.x,
        y: origin.y + Math.random() * bounds.y,
        z: origin.z + (Math.random() - 0.5) * bounds.z
      },
      count: 1,
      color: this.palette?.accent || 0xd8c7aa,
      speed: 0.06,
      gravity: 0.02,
      life: 3.4,
      spread: 0.4,
      up: 0.2
    });
  }

  sync(system) {
    const live = this.items.filter((item) => item.system === system);
    const positionAttr = system.geometry.getAttribute("position");
    const colorAttr = system.geometry.getAttribute("color");
    live.forEach((item, index) => {
      positionAttr.setXYZ(index, item.position.x, item.position.y, item.position.z);
      const fade = Math.max(0, Math.min(1, item.life / item.maxLife));
      colorAttr.setXYZ(index, item.color.r * fade, item.color.g * fade, item.color.b * fade);
    });
    positionAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
    system.count = live.length;
    system.geometry.setDrawRange(0, live.length);
  }

  update(dt) {
    if (!this.items.length) return;
    const dirty = new Set();
    for (let i = this.items.length - 1; i >= 0; i -= 1) {
      const item = this.items[i];
      item.life -= dt;
      if (item.life <= 0) {
        dirty.add(item.system);
        this.items.splice(i, 1);
        continue;
      }
      item.velocity.y += item.gravity * dt;
      item.position.addScaledVector(item.velocity, dt);
      if (item.position.y < 0.98) {
        item.position.y = 0.98;
        item.velocity.y *= -0.28;
        item.velocity.x *= 0.7;
        item.velocity.z *= 0.7;
      }
      dirty.add(item.system);
    }
    dirty.forEach((system) => this.sync(system));
  }

  dispose() {
    [this.spark, this.confetti, this.dust].forEach((system) => {
      this.scene.remove(system.points);
      system.geometry.dispose();
      system.material.dispose();
    });
    this.items.length = 0;
  }
}
