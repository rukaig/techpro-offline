/* ==========================================================================
   Appearance settings: writes data attributes the CSS already understands.
   ========================================================================== */
import { get, update } from "./store.js";
import { COMPANION_BY_THEME, COMPANION_SKINS } from "../data/companion-lines.js";

export const THEMES = [
  { id: "editorial", name: "Formal Editorial", note: "Warm paper, red rule, quiet confidence. The default.", swatch: ["#b3261e", "#f2eee5", "#2b1d16"] },
  { id: "marshmallow", name: "Marshmallow World", note: "Soft rose, rounded cards, gentle study energy.", swatch: ["#d95f86", "#fdf1f4", "#4a3340"] },
  { id: "candy", name: "Candy Pop", note: "Bright pink and electric blue. Loud on purpose.", swatch: ["#d6006f", "#fff2fa", "#007f9e"] },
  { id: "neon", name: "Cyber Neon", note: "Dark lab, cyan traces, pink warnings.", swatch: ["#25e6ff", "#040a17", "#ff3bd4"] },
  { id: "blueprint", name: "Blueprint Technician", note: "Drafting-grid blue with amber measurements.", swatch: ["#ffd166", "#0d3358", "#eaf5ff"] },
  { id: "pixel", name: "Retro Pixel Arcade", note: "Chunky pixels, hard shadows, arcade gold.", swatch: ["#ffcd75", "#141625", "#38b764"] },
  { id: "lofi", name: "Lo-fi Study Night", note: "Warm lamp light for late-night review.", swatch: ["#e8a86b", "#211b17", "#9db8a2"] },
  { id: "mint", name: "Mint Lab", note: "Clean clinical mint. Projector friendly.", swatch: ["#0f766e", "#f5fcfa", "#0e7490"] },
  { id: "contrast", name: "High Contrast", note: "Pure black and white, Atkinson type, no animation.", swatch: ["#ffe600", "#000000", "#ffffff"] }
];

const DARK_FIRST = ["neon", "blueprint", "pixel", "lofi", "contrast"];
const DARK_COLORS = {
  editorial: "#2b1d16", marshmallow: "#ffe1e9", candy: "#8a0a58", neon: "#040a17",
  blueprint: "#0d3358", pixel: "#141625", lofi: "#211b17", mint: "#0f3d39", contrast: "#000000"
};
const LIGHT_COLORS = {
  editorial: "#f2eee5", marshmallow: "#fdf1f4", candy: "#fff2fa", neon: "#eefbff",
  blueprint: "#eef6fd", pixel: "#f7f0dc", lofi: "#f8f0e4", mint: "#f5fcfa", contrast: "#ffffff"
};

export function isDarkFirst(theme) {
  return DARK_FIRST.includes(theme);
}

export function resolveMode(mode, theme) {
  if (mode === "system") {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (mode === "dark" || mode === "light") return mode;
  return isDarkFirst(theme) ? "dark" : "light";
}

export function applySettings() {
  const { settings } = get();
  const root = document.documentElement;
  const mode = resolveMode(settings.mode, settings.theme);
  root.dataset.theme = settings.theme;
  root.dataset.mode = mode;
  root.dataset.modeChoice = settings.mode;
  root.dataset.motion = settings.motion;
  root.dataset.fontscale = settings.fontscale;
  const color = (mode === "dark" ? DARK_COLORS : LIGHT_COLORS)[settings.theme] || LIGHT_COLORS.editorial;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", color);
  try {
    localStorage.setItem("tp:theme", settings.theme);
    localStorage.setItem("tp:mode", settings.mode);
    localStorage.setItem("tp:motion", settings.motion);
    localStorage.setItem("tp:fontscale", settings.fontscale);
  } catch { /* storage may be blocked */ }
}

export function setTheme(theme) {
  const root = document.documentElement;
  const canAnimate = root.dataset.motion !== "reduced" && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (canAnimate) root.dataset.themeTransition = "true";
  update((draft) => {
    draft.settings.theme = theme;
    // A theme with a strong native mode starts there, unless the student has
    // an explicit light/dark/system choice already recorded for it.
    draft.settings.mode = isDarkFirst(theme) ? "dark" : "light";
    if (!draft.settings.keepCompanion) {
      const currentSkin = COMPANION_SKINS.find((skin) => skin.id === draft.settings.companionSkin);
      const nextSkinId = COMPANION_BY_THEME[theme] || COMPANION_BY_THEME.editorial;
      const nextSkin = COMPANION_SKINS.find((skin) => skin.id === nextSkinId);
      if (nextSkin) {
        if (!draft.companion.renamed || draft.companion.name === "Bit" || draft.companion.name === currentSkin?.name) {
          draft.companion.name = nextSkin.name;
        }
        draft.settings.companionSkin = nextSkin.id;
      }
    }
  }, { type: "settings" });
  applySettings();
  if (canAnimate) window.setTimeout(() => { delete root.dataset.themeTransition; }, 300);
}

export function setMode(mode) {
  update((draft) => { draft.settings.mode = mode; }, { type: "settings" });
  applySettings();
}

export function setMotion(motion) {
  update((draft) => { draft.settings.motion = motion; }, { type: "settings" });
  applySettings();
}

export function setFontScale(scale) {
  update((draft) => { draft.settings.fontscale = scale; }, { type: "settings" });
  applySettings();
}

export function talkEnabled() {
  return get().settings.sound !== false;
}

export function themeName(id) {
  return THEMES.find((theme) => theme.id === id)?.name || "Formal Editorial";
}
