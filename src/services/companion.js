/* ==========================================================================
   Companion service. UI lives in app/chrome.js.
   ========================================================================== */
import { get, update } from "./store.js";
import { DEFAULT_COMPANION, COMPANION_SKINS, pickLine, LINES } from "../data/companion-lines.js";

const EVENT = "techpro:companion-say";
let lastMessage = "";

function skinDetails(skinId) {
  return COMPANION_SKINS.find((skin) => skin.id === skinId) || COMPANION_SKINS[0];
}

export function isCompanionSkinUnlocked(skinId, state = get()) {
  const skin = skinDetails(skinId);
  if (skin.id !== skinId) return false;
  if (skin.unlockXp && (state.progress.xp || 0) < skin.unlockXp) return false;
  if (skin.unlockBadge && !(Array.isArray(state.progress.badges) && state.progress.badges.includes(skin.unlockBadge))) return false;
  return true;
}

export function companionName() {
  const state = get();
  const name = state.companion?.name;
  return !name || name === "Bit" ? skinDetails(state.settings?.companionSkin).name || DEFAULT_COMPANION : name;
}

export function setCompanionName(name) {
  const fallback = skinDetails(get().settings?.companionSkin).name || DEFAULT_COMPANION;
  const clean = String(name || "").trim().slice(0, 18) || fallback;
  update((draft) => {
    draft.companion.name = clean;
    draft.companion.renamed = clean !== fallback;
  }, { type: "companion-name" });
  return clean;
}

export function setCompanionSkin(skin) {
  const next = skinDetails(skin);
  if (next.id !== skin) throw new RangeError(`Unknown companion skin: ${skin}`);
  if (!isCompanionSkinUnlocked(skin)) throw new Error(`${next.name} is still locked.`);
  const state = get();
  const previous = skinDetails(state.settings?.companionSkin);
  update((draft) => {
    draft.settings.companionSkin = skin;
    if (!draft.companion.renamed || draft.companion.name === previous.name || draft.companion.name === "Bit") {
      draft.companion.name = next.name;
    }
  }, { type: "companion-skin" });
  document.documentElement.dataset.buddy = skin;
}

export function setMood(mood) {
  update((draft) => {
    draft.companion.mood = mood;
  }, { type: "companion-mood" });
}

export function say(messageOrBucket, { mood = null, duration = 6500, force = false } = {}) {
  const resolved = LINES[messageOrBucket] ? pickLine(messageOrBucket) : String(messageOrBucket || "");
  if (!resolved) return;
  if (!force && resolved === lastMessage) return;
  lastMessage = resolved;
  if (mood) setMood(mood);
  const detail = { message: resolved, mood: mood || get().companion?.mood || "happy", duration, name: companionName() };
  window.dispatchEvent(new CustomEvent(EVENT, { detail }));
}

export function cheer() {
  setMood("celebrating");
  say("complete", { mood: "celebrating", duration: 7000 });
}

export function oops(message) {
  setMood("oops");
  say(message || "wrong", { mood: "oops", duration: 4500 });
}

export function onSay(handler) {
  const listener = (event) => handler(event.detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

export function companionState() {
  const skin = get().settings?.companionSkin || "classic";
  return {
    name: companionName(),
    mood: get().companion?.mood || "happy",
    skin
  };
}
