/* ==========================================================================
   Reusable count-up / countdown timer with accessible announcements.
   ========================================================================== */
import { formatDuration } from "./ui.js";

export class Timer {
  constructor({ seconds = 0, countdown = false, onTick = null, onDone = null, label = "timer" } = {}) {
    this.total = seconds;
    this.remaining = seconds;
    this.elapsed = 0;
    this.countdown = countdown;
    this.onTick = onTick;
    this.onDone = onDone;
    this.label = label;
    this.running = false;
    this.startedAt = 0;
    this.raf = null;
    this.lastWhole = -1;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.startedAt = performance.now();
    const tick = (now) => {
      if (!this.running) return;
      const delta = (now - this.startedAt) / 1000;
      this.startedAt = now;
      if (this.countdown) {
        this.remaining = Math.max(0, this.remaining - delta);
        this.elapsed = this.total - this.remaining;
      } else {
        this.elapsed += delta;
        this.remaining = this.elapsed;
      }
      const whole = Math.floor(this.remaining);
      if (whole !== this.lastWhole) {
        this.lastWhole = whole;
        this.onTick?.(this.display(), this.remaining, this.elapsed);
      }
      if (this.countdown && this.remaining <= 0) {
        this.stop();
        this.onDone?.();
        return;
      }
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
    this.onTick?.(this.display(), this.remaining, this.elapsed);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset(seconds = this.total) {
    this.stop();
    this.total = seconds;
    this.remaining = seconds;
    this.elapsed = 0;
    this.lastWhole = -1;
  }

  display() {
    return this.countdown ? formatDuration(this.remaining) : formatDuration(this.elapsed);
  }
}

export function countdownElement({ id = "timer", seconds = 0, label = "Time remaining" } = {}) {
  return `<div class="timer-pill" id="${id}" role="timer" aria-label="${label}">
    <span class="timer-icon" aria-hidden="true">◷</span>
    <span class="timer-value">${formatDuration(seconds)}</span>
  </div>`;
}
