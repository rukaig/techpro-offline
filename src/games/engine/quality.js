/* ==========================================================================
   Device quality manager. Auto starts conservative on phones, watches FPS,
   and steps down pixel ratio, shadows and particles when frames drop.
   ========================================================================== */

export function deviceTier() {
  const memory = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (memory <= 2 || cores <= 2) return "low";
  if (mobile && (memory <= 4 || cores <= 4)) return "low";
  if (mobile) return "medium";
  return "high";
}

export function resolveQuality(setting = "auto") {
  const tier = deviceTier();
  if (setting === "low") {
    return { tier: "low", dpr: 1, shadows: false, particles: 0.45, antialias: false, label: "Low" };
  }
  if (setting === "high") {
    return { tier: "high", dpr: Math.min(2, window.devicePixelRatio || 1), shadows: true, particles: 1, antialias: true, label: "High" };
  }
  if (tier === "low") {
    return { tier: "low", dpr: 1, shadows: false, particles: 0.5, antialias: false, label: "Auto · light" };
  }
  if (tier === "medium") {
    return { tier: "medium", dpr: Math.min(1.5, window.devicePixelRatio || 1), shadows: false, particles: 0.8, antialias: true, label: "Auto · balanced" };
  }
  return { tier: "high", dpr: Math.min(2, window.devicePixelRatio || 1), shadows: true, particles: 1, antialias: true, label: "Auto · full" };
}

export class FpsGuard {
  constructor({ onDowngrade } = {}) {
    this.onDowngrade = onDowngrade;
    this.frames = 0;
    this.elapsed = 0;
    this.lowWindows = 0;
    this.fps = 60;
    this.enabled = true;
    this.level = 0;
  }

  reset() {
    this.frames = 0;
    this.elapsed = 0;
    this.lowWindows = 0;
    this.level = 0;
  }

  update(dt) {
    if (!this.enabled) return this.fps;
    this.frames += 1;
    this.elapsed += dt;
    if (this.elapsed < 1) return this.fps;
    this.fps = Math.round(this.frames / this.elapsed);
    this.frames = 0;
    this.elapsed = 0;
    if (this.fps < 42) this.lowWindows += 1;
    else this.lowWindows = Math.max(0, this.lowWindows - 1);
    if (this.lowWindows >= 3 && this.level < 2) {
      this.level += 1;
      this.lowWindows = 0;
      this.onDowngrade?.(this.level, this.fps);
    }
    return this.fps;
  }
}

export function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext
      && (canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}
