/* ==========================================================================
   Companion voices, theme matches, and unlockable skins.
   ========================================================================== */

export const DEFAULT_COMPANION = "Chip";

export const COMPANION_SKINS = [
  { id: "classic", name: "Chip", note: "A clear, steady guide for the workbench." },
  { id: "bubblegum", name: "Marsh", note: "A soft, reassuring study pal." },
  { id: "candy", name: "Lolli", note: "A bright helper with a quick idea." },
  { id: "neon", name: "Volt", note: "A focused guide from the night lab." },
  { id: "blueprint", name: "Compass", note: "A precise buddy for careful builds." },
  { id: "pixel", name: "Pix", note: "A small arcade coach for big goals." },
  { id: "ember", name: "Lumi", note: "A calm lamp for late-night review." },
  { id: "mint", name: "Minty", note: "A fresh, practical lab partner." },
  { id: "mono", name: "Atlas", note: "A bold, clear guide with no fuss." },
  { id: "rammy", name: "Rammy", note: "A memory module with room to grow.", unlockXp: 800 },
  { id: "fanny", name: "Fanny", note: "A cooling fan who keeps a cool head.", unlockBadge: "first-build" }
];

export const COMPANION_BY_THEME = {
  editorial: "classic",
  marshmallow: "bubblegum",
  candy: "candy",
  neon: "neon",
  blueprint: "blueprint",
  pixel: "pixel",
  lofi: "ember",
  mint: "mint",
  contrast: "mono"
};

export const MOODS = ["idle", "happy", "thinking", "oops", "celebrate", "celebrating", "sleepy", "proud"];

export const LINES = {
  welcome: [
    "Bench is ready. Let's build something that boots.",
    "I checked the screws. All accounted for. Probably.",
    "Pick a lesson, or head straight to the case. I'll follow.",
    "No rush. Good builds are slow builds."
  ],
  lesson: [
    "Read the figure captions too. They hide the good details.",
    "Tap a dotted term if you want the glossary. I won't tell.",
    "If it feels abstract, picture the cable routing. That usually helps.",
    "You can bookmark this lesson and come back after practice."
  ],
  correct: [
    "That's it. Clean connection.",
    "Nicely seated. No force required.",
    "Good call. The module would approve.",
    "Click. That one's locked in.",
    "Textbook. Literally."
  ],
  wrong: [
    "Not quite. Check the orientation before pushing.",
    "That part doesn't belong there. Let's reread the hint.",
    "Easy — power off, breathe, try again.",
    "No damage done. That's what practice mode is for.",
    "Wrong socket, right effort."
  ],
  safety: [
    "Strap on. Static is quiet until it isn't.",
    "Unplug first. Always.",
    "Screws go in the container, not on the table edge.",
    "Hold the connector, not the wire.",
    "Jewellery off. Edges only."
  ],
  paste: [
    "A small dot. The cooler does the spreading.",
    "Too much paste is a cleanup, not a record.",
    "Center it. Even pressure.",
    "That's the sweet spot. Seat the cooler now."
  ],
  ram: [
    "Both clips or it isn't seated.",
    "Press evenly. No rocking.",
    "Listen for the second click.",
    "The notch only fits one way."
  ],
  tighten: [
    "Snug, not crushed.",
    "Cross pattern. Even pressure.",
    "That's tight enough. Stop there.",
    "Overtightening cracks boards. Easy."
  ],
  boot: [
    "Fans spinning, display alive. That's a POST.",
    "One short beep is a good sign.",
    "If the screen stays dark, check the cable before the card.",
    "Boot order, then boot. Patience."
  ],
  complete: [
    "Build complete. I'd power it on twice just to enjoy it.",
    "Look at that. A functional computer system.",
    "Ten steps, no missing screws. Proud of you.",
    "The case is closed and the bench is clean. Go take the exam."
  ],
  streak: [
    "Back again. The bench missed you.",
    "Consistency beats cramming. Earned XP either way.",
    "Another day, another connection."
  ],
  daily: [
    "Daily challenge is up. Small win, real XP.",
    "One challenge a day keeps the exam panic away.",
    "Today's challenge is waiting on the bench."
  ]
};

export function pickLine(bucket, seed = Date.now()) {
  const list = LINES[bucket] || LINES.welcome;
  return list[Math.abs(seed) % list.length];
}

export const COMPANION_ACHIEVEMENTS = [
  "You renamed me. I have a whole identity now.",
  "We finished a build together. I'm keeping the screws.",
  "That exam score made my screen flicker with joy.",
  "I have decided the workbench is my home."
];
