/* ==========================================================================
   Local-first state store.
   Everything works without an account. Firestore sync mirrors this document
   when a student signs in (see services/plan-sync.js).
   ========================================================================== */

const KEY = "tp:state:v1";
const VERSION = 1;

const defaults = {
  version: VERSION,
  profile: {
    uid: null,
    displayName: "",
    avatar: "",
    photoURL: "",
    gradeSection: "",
    role: "student",
    school: "",
    createdAt: null
  },
  settings: {
    theme: "editorial",
    mode: "light",
    motion: "full",
    fontscale: "1",
    sound: true,
    haptics: true,
    gameQuality: "auto",
    voiceGuidance: true,
    voiceGender: "girl",
    voiceName: "",
    companionSkin: "classic",
    keepCompanion: false
  },
  companion: {
    name: "Chip",
    mood: "happy",
    renamed: false
  },
  plan: {
    config: null,
    tasks: [],
    sessions: [],
    reminderDay: null,
    syncUid: null
  },
  progress: {
    lessons: {},
    activities: {},
    badges: [],
    xp: 0,
    streak: { count: 0, lastDay: null, best: 0 },
    daily: { date: null, activityId: null, done: false },
    goals: {
      identify: 0,
      software: 0,
      safety: 0,
      explain: 0
    }
  },
  games: {
    pcLab: {
      levels: {},
      campaign: null,
      updatedAt: null
    }
  },
  bookmarks: [],
  notes: {},
  journal: [],
  rating: 1000,
  scores: [],
  teacher: {
    className: "",
    school: ""
  }
};

function clone(value) {
  return typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value));
}

function merge(target, source) {
  if (!source || typeof source !== "object") return target;
  Object.keys(source).forEach((key) => {
    const value = source[key];
    if (value && typeof value === "object" && !Array.isArray(value) && target[key] && typeof target[key] === "object" && !Array.isArray(target[key])) {
      merge(target[key], value);
    } else if (value !== undefined) {
      target[key] = value;
    }
  });
  return target;
}

function migrate(state, source) {
  const companion = source?.companion;
  if (companion && !Object.hasOwn(companion, "renamed") && companion.name && !["Bit", "Chip"].includes(companion.name)) {
    state.companion.renamed = true;
  }
  return state;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return clone(defaults);
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== VERSION) {
      const fresh = clone(defaults);
      merge(fresh, parsed || {});
      fresh.version = VERSION;
      return migrate(fresh, parsed);
    }
    return migrate(merge(clone(defaults), parsed), parsed);
  } catch (error) {
    console.warn("Could not read saved TechPro state; starting fresh.", error);
    return clone(defaults);
  }
}

let state = load();
const listeners = new Set();
let saveTimer = null;

function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Could not save TechPro state", error);
    }
  }, 40);
}

function notify(meta = {}) {
  listeners.forEach((fn) => {
    try { fn(state, meta); } catch (error) { console.error(error); }
  });
}

export function get() {
  return state;
}

export function update(recipe, meta = {}) {
  const draft = clone(state);
  const result = recipe(draft);
  state = result || draft;
  persist();
  notify(meta);
  return state;
}

export function set(patch, meta = {}) {
  return update((draft) => {
    merge(draft, patch);
  }, meta);
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function resetProgress() {
  return update((draft) => {
    draft.progress = clone(defaults.progress);
    draft.bookmarks = [];
    draft.notes = {};
    draft.journal = [];
    draft.scores = [];
    draft.rating = 1000;
  }, { type: "reset" });
}

export function resetAll() {
  state = clone(defaults);
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  notify({ type: "reset-all" });
}

export function exportState() {
  return JSON.stringify(state, null, 2);
}

export function importState(raw) {
  const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!parsed || typeof parsed !== "object") throw new Error("That file does not look like TechPro data.");
  state = migrate(merge(clone(defaults), parsed), parsed);
  state.version = VERSION;
  persist();
  notify({ type: "import" });
  return state;
}

// Keep multiple tabs and the installed app in step.
window.addEventListener("storage", (event) => {
  if (event.key !== KEY || !event.newValue) return;
  try {
    const parsed = JSON.parse(event.newValue);
    state = migrate(merge(clone(defaults), parsed), parsed);
    notify({ type: "external" });
  } catch { /* ignore malformed writes */ }
});

// Merge anything a signed-in account had saved before this browser.
export function mergeRemote(remote) {
  if (!remote || typeof remote !== "object") return get();
  return update((draft) => {
    merge(draft, remote);
    migrate(draft, remote);
    // Never let a remote document erase a name the student typed here.
    if (!remote.profile?.displayName && draft.profile.displayName) {
      draft.profile.displayName = draft.profile.displayName;
    }
  }, { type: "merge-remote" });
}

export { defaults, KEY };
