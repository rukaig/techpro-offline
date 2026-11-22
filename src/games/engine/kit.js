export function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6D2B79F5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(text) {
  let hash = 2166136261;
  for (const char of String(text)) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function seededShuffle(items, seed) {
  const random = mulberry32(typeof seed === "number" ? seed : hashSeed(seed));
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function normalizeWord(value) {
  return String(value).toUpperCase().replace(/[^A-Z]/g, "");
}

export function difficultySettings(level, mode = "standard") {
  const base = mode === "relaxed" ? 1.35 : mode === "challenge" ? 0.72 : 1;
  return {
    time: Math.max(20, Math.round((35 - level * 2) * base)),
    hintCost: mode === "relaxed" ? 2 : mode === "challenge" ? 8 : 5,
    extraSteps: mode === "challenge" ? 2 : 0
  };
}

export function starCount(score, total) {
  const percent = total ? score / total : 0;
  return percent >= 0.92 ? 3 : percent >= 0.72 ? 2 : 1;
}

export function todaySeed(date = new Date()) {
  return hashSeed(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}

export function seedCode(seed) {
  return `TP-${String(seed % 10000).padStart(4, "0")}`;
}
