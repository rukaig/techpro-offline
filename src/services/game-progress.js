/* ==========================================================================
   PC Lab progress: per-level bests stay on this device, and a signed-in
   student's bench record mirrors into techpro_progress/{uid}. The campaign
   itself is recorded as one official activity (pc-lab or disassembly), so XP
   and badges are awarded once per finished four-bench run rather than four
   times for the same lesson.
   ========================================================================== */
import { get, update, subscribe } from "./store.js";
import { recordActivity } from "./progress.js";
import { ACTIVITY_BY_ID } from "../data/activities.js";
import { firestoreClient, observeAuth } from "./firebase.js";

const COLLECTION = "techpro_progress";
const GAME_KEY = "pcLab";
let started = false;
let activeUid = null;
let stopRemote = null;
let writeQueue = Promise.resolve();

function emptyPcLab() {
  return { levels: {}, campaign: null, updatedAt: null };
}

function millis(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Date.parse(value) || 0;
  if (value && typeof value.toMillis === "function") return value.toMillis();
  return 0;
}

function pcLabState(state = get()) {
  const game = state.games?.[GAME_KEY];
  return {
    levels: game?.levels && typeof game.levels === "object" ? game.levels : {},
    campaign: game?.campaign || null,
    updatedAt: game?.updatedAt || null
  };
}

/** Shape the game controller expects: { levelId: { score, stars, time } }. */
export function completedLevels() {
  const levels = pcLabState().levels;
  return Object.fromEntries(Object.entries(levels).map(([id, entry]) => [
    id,
    {
      score: entry.bestScore ?? entry.score ?? 0,
      stars: entry.stars ?? 0,
      time: entry.bestTime ?? entry.time ?? 0
    }
  ]));
}

export function pcLabProgress() {
  return pcLabState();
}

export function savePcLabLevel(result) {
  if (!result?.level) return get();
  return update((draft) => {
    const current = draft.games?.[GAME_KEY] || emptyPcLab();
    const previous = current.levels?.[result.level] || {};
    current.levels = current.levels || {};
    current.levels[result.level] = {
      bestScore: Math.max(previous.bestScore || 0, result.score || 0),
      stars: Math.max(previous.stars || 0, result.stars || 0),
      bestTime: previous.bestTime ? Math.min(previous.bestTime, result.time || previous.bestTime) : (result.time || 0),
      attempts: (previous.attempts || 0) + 1,
      lastAt: result.at || new Date().toISOString()
    };
    current.updatedAt = new Date().toISOString();
    draft.games = { ...(draft.games || {}), [GAME_KEY]: current };
  }, { type: "game", game: GAME_KEY });
}

function mergeCampaign(previous, next) {
  if (!previous) return next;
  if (!next) return previous;
  return {
    ...previous,
    ...next,
    score: Math.max(previous.score || 0, next.score || 0),
    stars: Math.max(previous.stars || 0, next.stars || 0),
    accuracy: Math.max(previous.accuracy || 0, next.accuracy || 0),
    attempts: (previous.attempts || 0) + 1,
    at: next.at || previous.at
  };
}

/**
 * Record the finished campaign. Returns the recordActivity result so the game
 * can show earned XP and new badges in its result panel.
 */
export function savePcLabCampaign(campaign, mode = "build") {
  const activityId = mode === "disassembly" ? "disassembly" : "pc-lab";
  const activity = ACTIVITY_BY_ID[activityId] || ACTIVITY_BY_ID["pc-lab"];
  const summary = {
    score: campaign.score || 0,
    total: campaign.total || 4000,
    accuracy: campaign.accuracy ?? 0,
    stars: campaign.stars || 1,
    timeSeconds: campaign.timeSeconds || 0,
    levels: campaign.levels || [],
    mode,
    at: new Date().toISOString()
  };
  update((draft) => {
    const current = draft.games?.[GAME_KEY] || emptyPcLab();
    current.campaign = mergeCampaign(current.campaign, summary);
    current.updatedAt = new Date().toISOString();
    draft.games = { ...(draft.games || {}), [GAME_KEY]: current };
  }, { type: "game", game: GAME_KEY });

  return recordActivity({
    id: activity.id,
    score: summary.score,
    total: summary.total,
    accuracy: summary.accuracy,
    stars: summary.stars,
    xp: activity.xp,
    meta: {
      mode,
      levels: summary.levels.map((level) => level.level || level.id).filter(Boolean)
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Firestore mirror                                                           */
/* -------------------------------------------------------------------------- */

async function progressRef(uid) {
  const [{ doc }, db] = await Promise.all([
    import("firebase/firestore"),
    firestoreClient()
  ]);
  return doc(db, COLLECTION, uid);
}

function mergeRemotePcLab(remote) {
  if (!remote || typeof remote !== "object") return;
  update((draft) => {
    const local = draft.games?.[GAME_KEY] || emptyPcLab();
    if (millis(remote.updatedAt) <= millis(local.updatedAt)) return;
    const levels = { ...(local.levels || {}) };
    for (const [id, entry] of Object.entries(remote.levels || {})) {
      const previous = levels[id] || {};
      levels[id] = {
        bestScore: Math.max(previous.bestScore || 0, entry.bestScore || entry.score || 0),
        stars: Math.max(previous.stars || 0, entry.stars || 0),
        bestTime: previous.bestTime && entry.bestTime ? Math.min(previous.bestTime, entry.bestTime) : (previous.bestTime || entry.bestTime || 0),
        attempts: Math.max(previous.attempts || 0, entry.attempts || 0),
        lastAt: entry.lastAt || previous.lastAt || null
      };
    }
    draft.games = {
      ...(draft.games || {}),
      [GAME_KEY]: {
        levels,
        campaign: mergeCampaign(local.campaign, remote.campaign),
        updatedAt: new Date(millis(remote.updatedAt) || Date.now()).toISOString()
      }
    };
  }, { type: "game-sync", game: GAME_KEY });
}

function pushPcLab(uid) {
  const pcLab = pcLabState();
  writeQueue = writeQueue.then(async () => {
    const [{ serverTimestamp, setDoc }, reference] = await Promise.all([
      import("firebase/firestore"),
      progressRef(uid)
    ]);
    await setDoc(reference, {
      games: { [GAME_KEY]: pcLab },
      updatedAt: serverTimestamp()
    }, { merge: true });
  }).catch((error) => {
    console.error("Could not sync PC Lab progress to Firestore.", error);
  });
  return writeQueue;
}

async function connectUser(user) {
  stopRemote?.();
  stopRemote = null;
  activeUid = user?.uid || null;
  if (!user) return;
  const uid = user.uid;
  try {
    const [{ getDoc, onSnapshot }, reference] = await Promise.all([
      import("firebase/firestore"),
      progressRef(uid)
    ]);
    const snapshot = await getDoc(reference);
    if (uid !== activeUid) return;
    const remote = snapshot.exists() ? snapshot.data() : null;
    if (remote?.games?.[GAME_KEY]) mergeRemotePcLab(remote.games[GAME_KEY]);
    await pushPcLab(uid);
    stopRemote = onSnapshot(reference, (next) => {
      if (!next.exists() || uid !== activeUid) return;
      const incoming = next.data()?.games?.[GAME_KEY];
      if (incoming) mergeRemotePcLab(incoming);
    }, (error) => console.error("Could not receive Firestore PC Lab updates.", error));
  } catch (error) {
    console.error("Could not load PC Lab progress from Firestore.", error);
  }
}

export function startGameSync() {
  if (started) return;
  started = true;
  subscribe((state, meta) => {
    if (!activeUid || meta.type === "game-sync" || meta.type !== "game") return;
    pushPcLab(activeUid);
  });
  observeAuth((user, error) => {
    if (error) {
      console.error("Firebase authentication could not initialize for game sync.", error);
      return;
    }
    connectUser(user);
  });
}

export { emptyPcLab };
