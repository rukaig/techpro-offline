/* ==========================================================================
   TechPro offline-first store.
   Zero network. Synchronous in-memory state backed by localStorage and IndexedDB,
   with multi-profile support and fallback to in-memory mode.
   ========================================================================== */

const VERSION = 2;
const KEY_PREFIX = "tp:offline:";
const PROFILES_KEY = `${KEY_PREFIX}profiles:v2`;
const ACTIVE_PROFILE_KEY = `${KEY_PREFIX}active:v2`;
const PROFILE_DATA_PREFIX = `${KEY_PREFIX}profile:v2:`;
const LEGACY_V1_KEY = "tp:state:v1";

export const defaults = {
  version: VERSION,
  profile: {
    id: "default",
    displayName: "",
    avatar: "chip",
    gradeSection: "",
    role: "student",
    school: "",
    createdAt: null,
    lastActive: null
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

let inMemoryOnly = false;
let memoryStorage = {};
const listeners = new Set();
let saveTimer = null;

function clone(value) {
  if (typeof structuredClone === "function") {
    try { return structuredClone(value); } catch { /* fallback */ }
  }
  return JSON.parse(JSON.stringify(value));
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

function rawGet(key) {
  try {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key);
    }
  } catch {
    inMemoryOnly = true;
  }
  return memoryStorage[key] || null;
}

function rawSet(key, value) {
  let stored = false;
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
      stored = true;
    }
  } catch {
    inMemoryOnly = true;
  }
  memoryStorage[key] = value;
  // Also queue IndexedDB write
  idbPut(key, value);
  return stored;
}

function rawRemove(key) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  } catch {
    inMemoryOnly = true;
  }
  delete memoryStorage[key];
  idbDelete(key);
}

// Minimal IndexedDB helper (async background persistence)
let dbPromise = null;
function getDB() {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  if (!dbPromise) {
    dbPromise = new Promise((resolve) => {
      try {
        const req = indexedDB.open("techpro_db", 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains("kv")) {
            db.createObjectStore("kv");
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }
  return dbPromise;
}

async function idbPut(key, value) {
  try {
    const db = await getDB();
    if (!db) return;
    const tx = db.transaction("kv", "readwrite");
    tx.objectStore("kv").put(value, key);
  } catch { /* ignore idb errors */ }
}

async function idbDelete(key) {
  try {
    const db = await getDB();
    if (!db) return;
    const tx = db.transaction("kv", "readwrite");
    tx.objectStore("kv").delete(key);
  } catch { /* ignore idb errors */ }
}

// Request persistent storage if supported
if (typeof navigator !== "undefined" && navigator.storage?.persist) {
  navigator.storage.persist().catch(() => {});
}

// Profiles helper
function loadProfilesList() {
  const raw = rawGet(PROFILES_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch { /* fallback */ }
  }
  // Check migration from v1
  const v1Raw = rawGet(LEGACY_V1_KEY);
  if (v1Raw) {
    try {
      const v1 = JSON.parse(v1Raw);
      const migratedProfile = {
        id: "default",
        displayName: v1?.profile?.displayName || "Student",
        avatar: v1?.profile?.avatar || "chip",
        createdAt: v1?.profile?.createdAt || Date.now(),
        lastActive: Date.now()
      };
      rawSet(PROFILES_KEY, JSON.stringify([migratedProfile]));
      rawSet(ACTIVE_PROFILE_KEY, "default");
      const v2State = clone(defaults);
      merge(v2State, v1);
      v2State.version = VERSION;
      v2State.profile.id = "default";
      v2State.profile.displayName = migratedProfile.displayName;
      v2State.profile.avatar = migratedProfile.avatar;
      rawSet(`${PROFILE_DATA_PREFIX}default`, JSON.stringify(v2State));
      return [migratedProfile];
    } catch { /* fallback */ }
  }

  // Create initial default profile
  const initialProfile = {
    id: "default",
    displayName: "",
    avatar: "chip",
    createdAt: Date.now(),
    lastActive: Date.now()
  };
  rawSet(PROFILES_KEY, JSON.stringify([initialProfile]));
  rawSet(ACTIVE_PROFILE_KEY, "default");
  return [initialProfile];
}

function getActiveId() {
  let activeId = rawGet(ACTIVE_PROFILE_KEY);
  const profiles = loadProfilesList();
  if (!activeId || !profiles.some((p) => p.id === activeId)) {
    activeId = profiles[0].id;
    rawSet(ACTIVE_PROFILE_KEY, activeId);
  }
  return activeId;
}

function loadProfileState(profileId) {
  const raw = rawGet(`${PROFILE_DATA_PREFIX}${profileId}`);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const state = clone(defaults);
      merge(state, parsed);
      state.version = VERSION;
      state.profile.id = profileId;
      return state;
    } catch { /* fallback */ }
  }
  const fresh = clone(defaults);
  fresh.profile.id = profileId;
  fresh.profile.createdAt = Date.now();
  fresh.profile.lastActive = Date.now();
  return fresh;
}

let activeProfileId = getActiveId();
let currentState = loadProfileState(activeProfileId);

function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      currentState.profile.lastActive = Date.now();
      const serialized = JSON.stringify(currentState);
      rawSet(`${PROFILE_DATA_PREFIX}${activeProfileId}`, serialized);

      // Update profiles list with latest name, avatar, xp, stars
      const profiles = loadProfilesList();
      const idx = profiles.findIndex((p) => p.id === activeProfileId);
      if (idx >= 0) {
        profiles[idx].displayName = currentState.profile.displayName || "";
        profiles[idx].avatar = currentState.profile.avatar || "chip";
        profiles[idx].lastActive = currentState.profile.lastActive;
        profiles[idx].xp = currentState.progress?.xp || 0;
        let totalStars = 0;
        const acts = currentState.progress?.activities || {};
        Object.values(acts).forEach((act) => {
          totalStars += (act.stars || 0);
        });
        profiles[idx].stars = totalStars;
        rawSet(PROFILES_KEY, JSON.stringify(profiles));
      }
    } catch (error) {
      inMemoryOnly = true;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("techpro:storage-warning", {
          detail: { message: "Progress cannot be saved in this browser mode. Use Download backup." }
        }));
      }
    }
  }, 40);
}

function notify(meta = {}) {
  listeners.forEach((fn) => {
    try { fn(currentState, meta); } catch (error) { console.error(error); }
  });
}

// --------------------------------------------------------------------------
// Public Store API (as required by Section 3.5 & 5.1)
// --------------------------------------------------------------------------

export function get(key) {
  if (typeof key === "string") {
    return currentState[key];
  }
  return currentState;
}

export function set(keyOrPatch, value, meta = {}) {
  if (typeof keyOrPatch === "string") {
    currentState[keyOrPatch] = value;
  } else if (keyOrPatch && typeof keyOrPatch === "object") {
    merge(currentState, keyOrPatch);
  }
  persist();
  notify(meta);
  return currentState;
}

export function remove(key, meta = {}) {
  if (typeof key === "string") {
    if (Object.hasOwn(defaults, key)) {
      currentState[key] = clone(defaults[key]);
    } else {
      delete currentState[key];
    }
    persist();
    notify(meta);
  }
  return currentState;
}

export function update(recipe, meta = {}) {
  const draft = clone(currentState);
  const result = recipe(draft);
  currentState = result || draft;
  persist();
  notify(meta);
  return currentState;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function list() {
  const profiles = loadProfilesList();
  return profiles.map((p) => {
    // If it's active profile, pull live values
    if (p.id === activeProfileId) {
      let liveStars = 0;
      Object.values(currentState.progress?.activities || {}).forEach((act) => {
        liveStars += (act.stars || 0);
      });
      return {
        ...p,
        displayName: currentState.profile.displayName || "Learner",
        avatar: currentState.profile.avatar || "chip",
        xp: currentState.progress?.xp || 0,
        stars: liveStars,
        isActive: true
      };
    }
    // Pull saved profile state to count stars & xp if needed
    try {
      const raw = rawGet(`${PROFILE_DATA_PREFIX}${p.id}`);
      if (raw) {
        const s = JSON.parse(raw);
        let sStars = 0;
        Object.values(s.progress?.activities || {}).forEach((act) => { sStars += (act.stars || 0); });
        return {
          ...p,
          displayName: s.profile?.displayName || p.displayName || "Learner",
          avatar: s.profile?.avatar || p.avatar || "chip",
          xp: s.progress?.xp || 0,
          stars: sStars,
          isActive: false
        };
      }
    } catch { /* ignore */ }
    return { ...p, isActive: false };
  });
}

export function getActiveProfileId() {
  return activeProfileId;
}

export function createProfile({ displayName = "", avatar = "chip", school = "", gradeSection = "" } = {}) {
  const id = `prof_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const newProfileMeta = {
    id,
    displayName: String(displayName).trim(),
    avatar: avatar || "chip",
    createdAt: Date.now(),
    lastActive: Date.now()
  };
  const profiles = loadProfilesList();
  profiles.push(newProfileMeta);
  rawSet(PROFILES_KEY, JSON.stringify(profiles));

  // Initialize profile data
  const freshState = clone(defaults);
  freshState.profile.id = id;
  freshState.profile.displayName = newProfileMeta.displayName;
  freshState.profile.avatar = newProfileMeta.avatar;
  freshState.profile.school = school;
  freshState.profile.gradeSection = gradeSection;
  freshState.profile.createdAt = newProfileMeta.createdAt;
  freshState.profile.lastActive = newProfileMeta.lastActive;
  rawSet(`${PROFILE_DATA_PREFIX}${id}`, JSON.stringify(freshState));

  // Switch to new profile
  switchProfile(id);
  return freshState;
}

export function switchProfile(id) {
  const profiles = loadProfilesList();
  const target = profiles.find((p) => p.id === id);
  if (!target) return false;

  // Save current profile before switching
  if (currentState && activeProfileId) {
    try {
      rawSet(`${PROFILE_DATA_PREFIX}${activeProfileId}`, JSON.stringify(currentState));
    } catch { /* ignore */ }
  }

  activeProfileId = id;
  rawSet(ACTIVE_PROFILE_KEY, id);
  currentState = loadProfileState(id);
  notify({ type: "profile-switch", profileId: id });
  return true;
}

export function deleteProfile(id) {
  let profiles = loadProfilesList();
  if (profiles.length <= 1) {
    throw new Error("Cannot delete the only profile. Create another profile first.");
  }
  profiles = profiles.filter((p) => p.id !== id);
  rawSet(PROFILES_KEY, JSON.stringify(profiles));
  rawRemove(`${PROFILE_DATA_PREFIX}${id}`);

  if (activeProfileId === id) {
    switchProfile(profiles[0].id);
  } else {
    notify({ type: "profile-deleted", profileId: id });
  }
  return true;
}

export function exportState(profileId = activeProfileId) {
  let dataToExport = currentState;
  if (profileId !== activeProfileId) {
    dataToExport = loadProfileState(profileId);
  }
  const payload = {
    app: "TechPro",
    schemaVersion: VERSION,
    exportedAt: new Date().toISOString(),
    profile: {
      id: dataToExport.profile.id,
      displayName: dataToExport.profile.displayName || "Student",
      avatar: dataToExport.profile.avatar || "chip"
    },
    state: dataToExport
  };
  return JSON.stringify(payload, null, 2);
}

export const exportProfile = exportState;

export function importState(raw) {
  let parsed;
  try {
    parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    throw new Error("The selected file is not valid JSON.");
  }
  if (!parsed || typeof parsed !== "object") {
    throw new Error("The backup file does not contain valid TechPro data.");
  }

  // Handle both exported wrapper format and direct state format
  let stateToImport = parsed.state || parsed;
  if (typeof stateToImport !== "object") {
    throw new Error("The backup file does not contain readable TechPro state.");
  }

  // Strictly validate schema version
  const schemaVer = parsed.schemaVersion || stateToImport.version;
  if (schemaVer && schemaVer > VERSION) {
    throw new Error(`This backup requires TechPro version ${schemaVer} or higher.`);
  }

  // Validate or normalize fields
  const cleanState = clone(defaults);
  merge(cleanState, stateToImport);
  cleanState.version = VERSION;

  // Sanitize displayName to prevent HTML injection in rendered templates
  if (cleanState.profile) {
    cleanState.profile.displayName = String(cleanState.profile.displayName || "").slice(0, 60);
    cleanState.profile.school = String(cleanState.profile.school || "").slice(0, 80);
    cleanState.profile.gradeSection = String(cleanState.profile.gradeSection || "").slice(0, 40);
  }

  // Set as current profile state
  currentState = cleanState;
  persist();
  notify({ type: "import" });
  return currentState;
}

export function clearAll() {
  const profiles = loadProfilesList();
  profiles.forEach((p) => {
    rawRemove(`${PROFILE_DATA_PREFIX}${p.id}`);
  });
  rawRemove(PROFILES_KEY);
  rawRemove(ACTIVE_PROFILE_KEY);
  rawRemove(LEGACY_V1_KEY);
  memoryStorage = {};
  activeProfileId = "default";
  currentState = clone(defaults);
  rawSet(PROFILES_KEY, JSON.stringify([{ id: "default", displayName: "", avatar: "chip", createdAt: Date.now(), lastActive: Date.now() }]));
  rawSet(ACTIVE_PROFILE_KEY, "default");
  notify({ type: "reset-all" });
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
  clearAll();
}

export function isStoragePersisted() {
  return !inMemoryOnly;
}

export function mergeRemote(remote) {
  if (!remote || typeof remote !== "object") return get();
  return update((draft) => {
    merge(draft, remote);
  }, { type: "merge-remote" });
}

// Storage sync across tabs
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === ACTIVE_PROFILE_KEY && event.newValue) {
      if (event.newValue !== activeProfileId) {
        activeProfileId = event.newValue;
        currentState = loadProfileState(activeProfileId);
        notify({ type: "external-switch" });
      }
    } else if (event.key === `${PROFILE_DATA_PREFIX}${activeProfileId}` && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue);
        currentState = clone(defaults);
        merge(currentState, parsed);
        notify({ type: "external-update" });
      } catch { /* ignore malformed external writes */ }
    }
  });
}

export const KEY = LEGACY_V1_KEY;
