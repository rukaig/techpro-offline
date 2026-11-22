/* ==========================================================================
   Ranks — ranks the local profiles on this device.
   No server, no cloud sync. Same look and feel as the leaderboard.
   ========================================================================== */
import { get, list } from "../services/store.js";
import { icon, stars as starIcons } from "../app/icons.js";
import { companionArt } from "../app/art.js";
import { esc } from "../app/ui.js";

export function ranksPage({ query } = {}) {
  const currentTab = query?.get("tab") || "xp";
  const profiles = list();

  // Sort profiles according to chosen tab
  const ranked = [...profiles].map((p) => {
    return {
      ...p,
      xp: p.xp || 0,
      stars: p.stars || 0
    };
  });

  if (currentTab === "stars") {
    ranked.sort((a, b) => b.stars - a.stars || b.xp - a.xp);
  } else {
    ranked.sort((a, b) => b.xp - a.xp || b.stars - a.stars);
  }

  return `<div class="page-shell section ranks-page">
    <header class="page-head">
      <div>
        <p class="eyebrow">Local standouts</p>
        <h1>Ranks on this device</h1>
        <p class="lede">Compare progress, XP, and stars across learner profiles on this computer.</p>
        <p class="tiny faint mt-1" role="note">Ranks include only profiles on this device.</p>
      </div>
      <div class="ranks-head-art" aria-hidden="true">${companionArt("happy", { size: 90 })}</div>
    </header>

    <div class="ranks-tabs cluster" role="tablist" aria-label="Ranking criteria">
      <a class="chip ${currentTab === "xp" ? "is-active" : ""}" href="#/leaderboard?tab=xp" role="tab" aria-selected="${currentTab === "xp"}">Rank by XP</a>
      <a class="chip ${currentTab === "stars" ? "is-active" : ""}" href="#/leaderboard?tab=stars" role="tab" aria-selected="${currentTab === "stars"}">Rank by Stars</a>
    </div>

    <section class="card ranks-table-card mt-3">
      <div class="table-responsive">
        <table class="ranks-table" style="width:100%;border-collapse:collapse;text-align:left">
          <thead>
            <tr style="border-bottom:1px solid var(--line);background:var(--surface-2)">
              <th style="padding:0.8rem 1rem">Rank</th>
              <th style="padding:0.8rem 1rem">Learner</th>
              <th style="padding:0.8rem 1rem">XP</th>
              <th style="padding:0.8rem 1rem">Stars</th>
              <th style="padding:0.8rem 1rem">Status</th>
            </tr>
          </thead>
          <tbody>
            ${ranked.map((p, idx) => `
              <tr class="${p.isActive ? "is-you-row" : ""}" style="border-bottom:1px solid var(--line);${p.isActive ? "background:var(--surface-2);font-weight:bold" : ""}">
                <td style="padding:0.8rem 1rem">
                  <span class="rank-pos">${idx === 0 ? "🥇 1" : idx === 1 ? "🥈 2" : idx === 2 ? "🥉 3" : `#${idx + 1}`}</span>
                </td>
                <td style="padding:0.8rem 1rem">
                  <div class="cluster-sm" style="display:inline-flex;align-items:center;gap:0.5rem">
                    <span class="avatar avatar-sm" style="background:var(--accent);color:#fff;border-radius:50%;width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;font-size:0.8rem">
                      ${esc((p.displayName || "L").slice(0, 2).toUpperCase())}
                    </span>
                    <span>${esc(p.displayName || "Learner")}</span>
                  </div>
                </td>
                <td style="padding:0.8rem 1rem">${(p.xp || 0).toLocaleString()} XP</td>
                <td style="padding:0.8rem 1rem">${p.stars || 0} ★</td>
                <td style="padding:0.8rem 1rem">
                  ${p.isActive ? '<span class="tag tag-accent">Active</span>' : '<span class="tiny faint">Saved</span>'}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    <div class="card card-pad mt-3">
      <p class="eyebrow">Shared computer?</p>
      <p>Have multiple students taking turns on this machine? You can add and switch learner profiles anytime.</p>
      <div class="cluster mt-2">
        <a class="btn btn-ghost btn-sm" href="#/account">${icon("user", 16)} Manage local profiles</a>
        <a class="btn btn-ghost btn-sm" href="#/teacher">${icon("users", 16)} Teacher class summary</a>
      </div>
    </div>
  </div>`;
}

export function mountRanks(root) {}
