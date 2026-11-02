/* ==========================================================================
   Tiny tween manager. Keeps the game bundle small and lets the 3D scene
   animate parts without a framework.
   ========================================================================== */

const easings = {
  linear: (t) => t,
  inQuad: (t) => t * t,
  outQuad: (t) => 1 - (1 - t) * (1 - t),
  inOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  outElastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

export const ease = easings;

class Tween {
  constructor(object, to, {
    duration = 400,
    delay = 0,
    easing = "outCubic",
    onUpdate = null,
    onComplete = null,
    loop = false
  } = {}) {
    this.object = object;
    this.from = {};
    this.to = {};
    Object.keys(to).forEach((key) => {
      this.from[key] = readValue(object, key);
      this.to[key] = to[key];
    });
    this.duration = Math.max(0.001, duration / 1000);
    this.delay = Math.max(0, delay / 1000);
    this.easing = typeof easing === "function" ? easing : easings[easing] || easings.outCubic;
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;
    this.loop = loop;
    this.elapsed = 0;
    this.done = false;
  }

  tick(dt) {
    if (this.done) return;
    this.elapsed += dt;
    if (this.elapsed < this.delay) return;
    const local = Math.min(1, (this.elapsed - this.delay) / this.duration);
    const value = this.easing(local);
    Object.keys(this.to).forEach((key) => {
      const a = this.from[key];
      const b = this.to[key];
      if (typeof b === "number" && typeof a === "number") {
        writeValue(this.object, key, a + (b - a) * value);
      } else if (Array.isArray(b)) {
        writeValue(this.object, key, b.map((entry, index) => {
          const base = Array.isArray(a) ? a[index] : 0;
          return typeof entry === "number" ? base + (entry - base) * value : entry;
        }));
      } else if (value >= 1) {
        writeValue(this.object, key, b);
      }
    });
    this.onUpdate?.(value, this.object);
    if (local >= 1) {
      if (this.loop) {
        this.elapsed = this.delay;
        this.from = {};
        Object.keys(this.to).forEach((key) => { this.from[key] = readValue(this.object, key); });
      } else {
        this.done = true;
        this.onComplete?.();
      }
    }
  }

  cancel() {
    this.done = true;
  }
}

function readValue(object, key) {
  const value = object[key];
  if (value && typeof value === "object" && "x" in value && "y" in value && "z" in value) {
    return [value.x, value.y, value.z];
  }
  return value;
}

function writeValue(object, key, value) {
  if (Array.isArray(value)) {
    if (object[key] && typeof object[key].set === "function") object[key].set(value[0], value[1], value[2]);
    else object[key] = { x: value[0], y: value[1], z: value[2] };
  } else {
    object[key] = value;
  }
}

export class Tweens {
  constructor() {
    this.active = new Set();
  }

  add(object, to, options) {
    const tween = new Tween(object, to, options);
    this.active.add(tween);
    return tween;
  }

  to(object, to, options) {
    return this.add(object, to, options);
  }

  delay(seconds, callback) {
    const holder = { value: 0 };
    return this.add(holder, { value: 1 }, {
      duration: seconds * 1000,
      easing: "linear",
      onComplete: callback
    });
  }

  stop(object) {
    this.active.forEach((tween) => {
      if (tween.object !== object) return;
      tween.cancel();
      this.active.delete(tween);
    });
  }

  update(dt) {
    this.active.forEach((tween) => {
      tween.tick(dt);
      if (tween.done) this.active.delete(tween);
    });
  }

  clear() {
    this.active.forEach((tween) => tween.cancel());
    this.active.clear();
  }
}
