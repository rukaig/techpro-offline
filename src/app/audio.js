/* ==========================================================================
   Small, optional WebAudio cues. No files, no network, no autoplay.
   The sound toggle lives in Settings. Every cue also has a visible label in
   the UI so nothing depends on hearing it.
   ========================================================================== */
import { get } from "../services/store.js";

let context = null;

function enabled() {
  return get().settings.sound !== false;
}

function audioContext() {
  if (!context) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    context = new Ctx();
  }
  if (context.state === "suspended") context.resume();
  return context;
}

function note(frequency, duration = 0.12, { type = "sine", gain = 0.045, delay = 0 } = {}) {
  if (!enabled()) return;
  const ctx = audioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  const start = ctx.currentTime + delay;
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(gain, start + 0.015);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(amp).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export const sound = {
  click() { note(420, 0.05, { type: "triangle", gain: 0.025 }); },
  correct() {
    note(523.25, 0.1, { gain: 0.04 });
    note(659.25, 0.12, { gain: 0.035, delay: 0.08 });
    note(783.99, 0.16, { gain: 0.03, delay: 0.16 });
  },
  wrong() {
    note(196, 0.16, { type: "sawtooth", gain: 0.025 });
    note(155.56, 0.2, { type: "sawtooth", gain: 0.02, delay: 0.12 });
  },
  place() { note(320, 0.08, { type: "square", gain: 0.02 }); },
  star() {
    note(880, 0.1, { gain: 0.03 });
    note(1174.66, 0.14, { gain: 0.025, delay: 0.1 });
  },
  tick() { note(640, 0.035, { type: "square", gain: 0.012 }); },
  finish() {
    note(523.25, 0.14, { gain: 0.04 });
    note(659.25, 0.14, { gain: 0.04, delay: 0.13 });
    note(783.99, 0.18, { gain: 0.04, delay: 0.26 });
    note(1046.5, 0.28, { gain: 0.035, delay: 0.42 });
  }
};

export function vibrate(pattern = 18) {
  if (!enabled()) return;
  try { navigator.vibrate?.(pattern); } catch { /* not supported */ }
}
