/* ==========================================================================
   Game audio. Synthesised, theme-aware, no downloads. Every cue is optional
   and respects the site's sound switch.
   ========================================================================== */

const SCALES = {
  editorial: [261.63, 329.63, 392.0, 523.25],
  marshmallow: [293.66, 369.99, 440.0, 587.33],
  candy: [329.63, 415.3, 493.88, 659.25],
  neon: [220.0, 277.18, 329.63, 440.0],
  blueprint: [246.94, 311.13, 369.99, 493.88],
  pixel: [261.63, 329.63, 392.0, 523.25],
  lofi: [196.0, 246.94, 293.66, 392.0],
  mint: [293.66, 349.23, 440.0, 587.33],
  contrast: [261.63, 392.0, 523.25, 783.99]
};

const WAVE = {
  editorial: "triangle", marshmallow: "sine", candy: "sine", neon: "sawtooth",
  blueprint: "square", pixel: "square", lofi: "sine", mint: "triangle", contrast: "square"
};

export class GameAudio {
  constructor({ theme = "editorial", enabled = true } = {}) {
    this.theme = theme;
    this.enabled = enabled;
    this.context = null;
    this.master = null;
  }

  setTheme(theme) { this.theme = theme; }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
    if (!this.enabled && this.context) this.context.suspend?.();
    if (this.enabled && this.context) this.context.resume?.();
  }

  ensure() {
    if (!this.enabled) return null;
    if (!this.context) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      this.context = new Ctx();
      this.master = this.context.createGain();
      this.master.gain.value = 0.7;
      this.master.connect(this.context.destination);
    }
    if (this.context.state === "suspended") this.context.resume();
    return this.context;
  }

  note(frequency, duration = 0.1, { type = null, gain = 0.05, delay = 0, slide = 0 } = {}) {
    const ctx = this.ensure();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    const start = ctx.currentTime + delay;
    osc.type = type || WAVE[this.theme] || "triangle";
    osc.frequency.setValueAtTime(Math.max(40, frequency), start);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, frequency + slide), start + duration);
    amp.gain.setValueAtTime(0.0001, start);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), start + 0.012);
    amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(amp).connect(this.master);
    osc.start(start);
    osc.stop(start + duration + 0.03);
  }

  noise(duration = 0.18, { gain = 0.05, delay = 0, highpass = 900 } = {}) {
    const ctx = this.ensure();
    if (!ctx) return;
    const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = highpass;
    const amp = ctx.createGain();
    amp.gain.value = gain;
    source.connect(filter).connect(amp).connect(this.master);
    source.start(ctx.currentTime + delay);
  }

  chord(notes, { duration = 0.14, gap = 0.1, gain = 0.04 } = {}) {
    notes.forEach((note, index) => this.note(note, duration, { delay: index * gap, gain }));
  }

  click() { this.note(SCALES[this.theme][0] * 1.5, 0.045, { gain: 0.025, type: "square" }); }
  hover() { this.note(SCALES[this.theme][1] * 2, 0.035, { gain: 0.012 }); }
  pick() { this.note(SCALES[this.theme][1], 0.07, { gain: 0.03 }); }
  drop() { this.note(SCALES[this.theme][0], 0.08, { gain: 0.035, type: "triangle" }); }
  snap() {
    this.noise(0.05, { gain: 0.05, highpass: 1800 });
    this.note(SCALES[this.theme][2], 0.1, { gain: 0.045, type: "triangle" });
    this.note(SCALES[this.theme][3], 0.16, { gain: 0.03, delay: 0.05 });
  }
  clickSnap() {
    this.noise(0.035, { gain: 0.06, highpass: 2500 });
    this.note(SCALES[this.theme][3], 0.07, { gain: 0.04, type: "square" });
  }
  error() {
    this.note(110, 0.2, { type: "sawtooth", gain: 0.04, slide: -30 });
    this.note(82, 0.24, { type: "sawtooth", gain: 0.03, delay: 0.1 });
  }
  spark() {
    this.noise(0.22, { gain: 0.07, highpass: 2200 });
    this.note(1200, 0.1, { type: "sawtooth", gain: 0.025, slide: -600 });
  }
  crunch() {
    this.noise(0.24, { gain: 0.08, highpass: 400 });
    this.note(70, 0.3, { type: "sawtooth", gain: 0.05, slide: -25 });
  }
  paste() {
    this.noise(0.3, { gain: 0.03, highpass: 300 });
    this.note(SCALES[this.theme][1], 0.3, { gain: 0.02, slide: 60 });
  }
  boot() {
    const scale = SCALES[this.theme];
    [0, 1, 2, 3].forEach((index) => this.note(scale[index], 0.22, { gain: 0.04, delay: index * 0.12 }));
    this.note(scale[0] / 2, 0.9, { gain: 0.03, type: "sine", delay: 0.1 });
  }
  fan() {
    this.noise(0.8, { gain: 0.018, highpass: 200 });
  }
  star(index = 0) {
    const scale = SCALES[this.theme];
    this.note(scale[Math.min(3, index)] * 2, 0.18, { gain: 0.04, type: "sine" });
  }
  success() {
    const scale = SCALES[this.theme];
    [0, 1, 2, 3, 2, 3].forEach((index, step) => {
      this.note(scale[index] * (step > 2 ? 1.5 : 1), 0.22, { gain: 0.035, delay: step * 0.1 });
    });
  }
  fail() {
    [0, 1, 0].forEach((index, step) => {
      this.note(SCALES[this.theme][index] / 2, 0.3, { type: "sawtooth", gain: 0.03, delay: step * 0.16 });
    });
  }
  tick() { this.note(640, 0.03, { gain: 0.01, type: "square" }); }
  whoosh() { this.noise(0.25, { gain: 0.025, highpass: 500 }); }
}

export function vibrate(pattern = 18, enabled = true) {
  if (!enabled) return;
  try { navigator.vibrate?.(pattern); } catch { /* unsupported */ }
}
