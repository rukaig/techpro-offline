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

export function generateWordSearch({ words, size = 12, seed = 4821 }) {
  const grid = Array.from({ length: size }, () => Array(size).fill(""));
  const random = mulberry32(typeof seed === "number" ? seed : hashSeed(seed));
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const directions = [
    [1, 0], [0, 1], [-1, 0], [0, -1],
    [1, 1], [-1, -1], [1, -1], [-1, 1]
  ];

  const placed = [];
  const normalized = words.map(normalizeWord).filter((word, index, list) => word && list.indexOf(word) === index);
  for (const word of normalized.sort((a, b) => b.length - a.length)) {
    let placedWord = false;
    for (let attempt = 0; attempt < 500 && !placedWord; attempt += 1) {
      const [dx, dy] = directions[Math.floor(random() * directions.length)];
      const x = Math.floor(random() * size);
      const y = Math.floor(random() * size);
      const endX = x + dx * (word.length - 1);
      const endY = y + dy * (word.length - 1);
      if (endX < 0 || endX >= size || endY < 0 || endY >= size) continue;
      let fits = true;
      for (let i = 0; i < word.length; i += 1) {
        const cell = grid[y + dy * i]?.[x + dx * i];
        if (cell && cell !== word[i]) fits = false;
      }
      if (!fits) continue;
      const positions = [];
      for (let i = 0; i < word.length; i += 1) {
        const px = x + dx * i;
        const py = y + dy * i;
        grid[py][px] = word[i];
        positions.push(`${px}:${py}`);
      }
      placed.push({ word, positions });
      placedWord = true;
    }
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!grid[y][x]) grid[y][x] = alphabet[Math.floor(random() * alphabet.length)];
    }
  }
  return { grid, placed };
}
