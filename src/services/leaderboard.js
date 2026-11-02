/* ==========================================================================
   Leaderboard data. Local + demo by default; Firestore when signed in.
   ========================================================================== */
import { DEMO_PLAYERS } from "../data/leaderboard-seed.js";
import { get } from "./store.js";

export function localPlayer() {
  const state = get();
  const activities = state.progress.activities || {};
  const stars = Object.values(activities).reduce((sum, record) => sum + (record.stars || 0), 0);
  return {
    uid: "local",
    displayName: state.profile.displayName || "You (guest)",
    section: state.profile.gradeSection || "This device",
    xp: state.progress.xp || 0,
    rating: state.rating || 1000,
    streak: state.progress.streak?.count || 0,
    badges: (state.progress.badges || []).length,
    stars,
    isYou: true,
    isDemo: false,
    accent: state.profile.avatar || "#b3261e",
    activities
  };
}

export function demoPlayers() {
  return DEMO_PLAYERS.map((player) => ({ ...player, isDemo: true }));
}

export async function fetchRemotePlayers() {
  return [];
}

export async function fetchPlayer(uid) {
  if (!uid || uid === "local") return localPlayer();
  const demo = DEMO_PLAYERS.find((player) => player.uid === uid);
  if (demo) {
    const activities = {};
    return { ...demo, isDemo: true, activities };
  }
  return null;
}

export function mergePlayers(local, demos, remote = []) {
  const byId = new Map();
  [...demos, ...remote].forEach((player) => byId.set(player.uid, player));
  byId.set("local", local);
  return Array.from(byId.values());
}
