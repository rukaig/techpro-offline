/* ==========================================================================
   Theme bridge for the games. Reads the live TechPro theme tokens and turns
   them into a small palette + behaviour flags the 3D and 2D renderers share.
   ========================================================================== */

export const THEME_IDS = [
  "editorial", "marshmallow", "candy", "neon", "blueprint",
  "pixel", "lofi", "mint", "contrast"
];

const BASE = {
  editorial: {
    bg: 0xe8e1d5, fog: 0xe8e1d5, bench: 0x6f4d36, benchTop: 0x9a7654,
    case: 0x2a2b2f, caseTrim: 0x45464d, metal: 0xc3c7cd, pcb: 0x245b46,
    accent: 0xb3261e, accent2: 0x2e5b4f, text: 0xf7f0e5, dark: false,
    flags: { particles: true, shadows: true, outline: false, grid: false, pixel: false, toon: false, glass: false, warm: true }
  },
  marshmallow: {
    bg: 0xfdf1f4, fog: 0xfdf1f4, bench: 0xc792a4, benchTop: 0xf6c7d6,
    case: 0x6d5363, caseTrim: 0xa98294, metal: 0xe9d8df, pcb: 0x6f9f8e,
    accent: 0xd95f86, accent2: 0x3f9b83, text: 0x4a3340, dark: false,
    flags: { particles: true, shadows: true, outline: false, grid: false, pixel: false, toon: true, glass: false, warm: false }
  },
  candy: {
    bg: 0xffe3f3, fog: 0xffe3f3, bench: 0xd44b93, benchTop: 0xffa8d2,
    case: 0x5a2147, caseTrim: 0xb0006e, metal: 0xffd9ee, pcb: 0x008a78,
    accent: 0xd6006f, accent2: 0x007f9e, text: 0x351229, dark: false,
    flags: { particles: true, shadows: true, outline: false, grid: false, pixel: false, toon: false, glass: true, warm: false }
  },
  neon: {
    bg: 0x040a17, fog: 0x040a17, bench: 0x0d1930, benchTop: 0x132645,
    case: 0x071022, caseTrim: 0x1a3c63, metal: 0x8fe8ff, pcb: 0x0a3a4c,
    accent: 0x25e6ff, accent2: 0xff3bd4, text: 0xd9f4ff, dark: true,
    flags: { particles: true, shadows: false, outline: true, grid: true, pixel: false, toon: false, glass: true, warm: false, emissive: true }
  },
  blueprint: {
    bg: 0x0d3358, fog: 0x0d3358, bench: 0x123f69, benchTop: 0x1a527f,
    case: 0x0b2a4a, caseTrim: 0x9fc8e8, metal: 0xd9efff, pcb: 0x15527d,
    accent: 0xffd166, accent2: 0x8fd3ff, text: 0xeaf5ff, dark: true,
    flags: { particles: false, shadows: false, outline: true, grid: true, pixel: false, toon: false, glass: false, warm: false, wireframe: true }
  },
  pixel: {
    bg: 0x141625, fog: 0x141625, bench: 0x4c3a2f, benchTop: 0x7a5b42,
    case: 0x20233a, caseTrim: 0x4f567d, metal: 0xb8c2d8, pcb: 0x246b4f,
    accent: 0xffcd75, accent2: 0x38b764, text: 0xf7f0dc, dark: true,
    flags: { particles: true, shadows: false, outline: false, grid: false, pixel: true, toon: false, glass: false, warm: false }
  },
  lofi: {
    bg: 0x211b17, fog: 0x211b17, bench: 0x4a3425, benchTop: 0x7d5b3d,
    case: 0x2a2320, caseTrim: 0x4c3d34, metal: 0xcbb9a4, pcb: 0x3d5b4b,
    accent: 0xe8a86b, accent2: 0x9db8a2, text: 0xf8f0e4, dark: true,
    flags: { particles: true, shadows: true, outline: false, grid: false, pixel: false, toon: false, glass: false, warm: true }
  },
  mint: {
    bg: 0xf5fcfa, fog: 0xf5fcfa, bench: 0x8bbcb4, benchTop: 0xc7ebe3,
    case: 0x3d6b67, caseTrim: 0x8ab8b2, metal: 0xd9f2ee, pcb: 0x2b8f80,
    accent: 0x0f766e, accent2: 0x0e7490, text: 0x0f3d39, dark: false,
    flags: { particles: true, shadows: true, outline: false, grid: false, pixel: false, toon: false, glass: true, warm: false }
  },
  contrast: {
    bg: 0x000000, fog: 0x000000, bench: 0x111111, benchTop: 0x222222,
    case: 0x000000, caseTrim: 0xffffff, metal: 0xffffff, pcb: 0x000000,
    accent: 0xffe600, accent2: 0xffffff, text: 0xffffff, dark: true,
    flags: { particles: false, shadows: false, outline: true, grid: false, pixel: false, toon: false, glass: false, warm: false, flat: true }
  }
};

const ROLE = {
  bg: "bg", fog: "fog", bench: "bench", benchTop: "benchTop",
  case: "case", caseTrim: "caseTrim", metal: "metal", pcb: "pcb",
  accent: "accent", accent2: "accent2", text: "text"
};

export function parseColor(value, fallback) {
  if (typeof value === "number") return value;
  const text = String(value || "").trim();
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
  if (hex) {
    const raw = hex[1].length === 3
      ? hex[1].split("").map((c) => c + c).join("")
      : hex[1];
    return parseInt(raw, 16);
  }
  const rgb = /^rgba?\(([^)]+)\)/i.exec(text);
  if (rgb) {
    const [r, g, b] = rgb[1].split(",").map((part) => Number.parseFloat(part.trim()));
    if ([r, g, b].every(Number.isFinite)) return (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b);
  }
  return fallback;
}

export function readTheme() {
  const root = document.documentElement;
  const id = THEME_IDS.includes(root.dataset.theme) ? root.dataset.theme : "editorial";
  const mode = root.dataset.mode === "dark" ? "dark" : "light";
  const base = BASE[id] || BASE.editorial;
  const styles = getComputedStyle(root);
  const css = (name) => styles.getPropertyValue(name);
  const palette = { ...base };
  palette.accent = parseColor(css("--accent"), base.accent);
  palette.accent2 = parseColor(css("--accent-2"), base.accent2);
  palette.text = parseColor(css("--text"), base.text);
  const flags = {
    ...base.flags,
    reduced: root.dataset.motion === "reduced"
      || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      || false,
    dark: mode === "dark" || base.dark
  };
  if (flags.reduced) {
    flags.particles = false;
    flags.shadows = false;
  }
  if (id === "contrast") {
    flags.particles = false;
    flags.shadows = false;
    flags.outline = true;
  }
  return {
    id,
    mode,
    palette,
    flags,
    css: {
      accent: css("--accent").trim(),
      accent2: css("--accent-2").trim(),
      text: css("--text").trim(),
      surface: css("--surface").trim(),
      line: css("--line").trim()
    }
  };
}

export function themeRole(name) {
  return ROLE[name] || name;
}

export function observeTheme(callback) {
  let frame = 0;
  const fire = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => callback(readTheme()));
  };
  const observer = new MutationObserver(fire);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-mode", "data-motion"]
  });
  const media = window.matchMedia?.("(prefers-color-scheme: dark)");
  media?.addEventListener?.("change", fire);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    media?.removeEventListener?.("change", fire);
  };
}

export function applyCssThemeVars(root) {
  const theme = readTheme();
  root.style.setProperty("--game-accent", theme.css.accent);
  root.style.setProperty("--game-accent-2", theme.css.accent2);
  root.style.setProperty("--game-text", theme.css.text);
  root.dataset.gameTheme = theme.id;
  return theme;
}
