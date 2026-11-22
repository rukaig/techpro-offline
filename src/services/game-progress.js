/* ==========================================================================
   PC Lab progress: per-level bests and campaigns stay on this device.
   Persisted per profile in store.js. Zero network.
   ========================================================================== */
import { get, update } from "./store.js";
import { recordActivity } from "./progress.js";
import { ACTIVITY_BY_ID } from "../data/activities.js";

const GAME_KEY = "pcLab";

function emptyPcLab() {
  return { levels: {}, campaign: null, updatedAt: null };
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
    levels: Array.isArray(campaign.levels) ? campaign.levels : [],
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

export function startGameSync() {
  // Offline mode: all PC Lab progress is saved directly in store.js
}
