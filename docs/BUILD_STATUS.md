# TechPro build status

Last updated: 2026-11-03. Phase 0 committed (`2fddd12`). Phase B and Phase C
are implemented and verified locally; the commit is the next step, then Phase D.

Read this file first, then `docs/PROGRESS_AUDIT.md` (findings) and
`docs/PCLAB_BUGFIX.md` (PC Lab causes and the fix). Anything below marked
**verified** was run in this workspace, not assumed.

## Resume here

1. `npm start` (port 3000), then run the gates:
   ```sh
   npm test                                   # 13/13 assistant + lab unit tests
   npm run check                              # content check
   node tests/pc-lab-regression.mjs           # 3 levels x 2 devices
   node tests/pc-lab-regression.mjs --runs=30 # input stability loop
   npm run audit                              # must exit 0
   ```
2. Then Phase D: build the 12 placeholder games one at a time (list below),
   updating this file after each one.
3. Phase E (polish, Lighthouse, offline, Render) comes last.

## Phase 0 — Gemini assistant (commit `2fddd12`) — done

- `GET /api/assistant/health` returns `{ configured, model }`; the model id is
  verified against the current Google model catalog, not copied from README.
- Default model `gemini-3.5-flash-lite`, overridable with `GEMINI_MODEL`.
- Rate limits are configurable (per-user bucket and a global cap) with a
  correct window; 429 messages stay friendly.
- 30s upstream timeout plus SSE heartbeat so a hung stream cannot look alive.
- `createStreamSanitizer()` is stateful across chunk boundaries (a tag or URL
  split between two deltas is still removed); covered by split-chunk tests.
- `scripts/assistant-smoke.mjs` runs 5 real questions with `--live`.
- Gate: `npm test` 13/13 pass.
- **Blocked:** no `.env` / `GEMINI_API_KEY` in this workspace, so the live
  5-question run has not been made. Mock run completed and was shown. When a
  key exists: `node scripts/assistant-smoke.mjs --live`.

## Phase B — UI repair — done, awaiting the audit gate

- New `src/styles/exam.css` (linked from `index.html`) for exam hub/cards/best
  score/results/review; no inline styling left in those views.
- `.exam-card`, `.exam-best`, `.exam-hub`, `.activity-copy`, `.rank-name`,
  header-under-`.site-head` content, and sub-minimum touch targets reworked
  with the shared Card/Button/Badge/spacing tokens.
- Badge variants, 44px minimum controls (exam tabs, quiz/review actions,
  library filters, `.xp-chip` at 52px), and stop the activity copy from
  touching its container edge.
- `scripts/ui-audit.mjs` now skips sr-only leaves and `.pclab-frame` surfaces
  (their text belongs to the game canvas, not the page layout).
- Gate: `npm run audit` must exit 0 — see "Open gate" below.

## Phase C — PC Lab rebuild — done and verified

- The PC Lab is a **2D top-down flat-lay** bench (`src/games/pc-lab/fallback2d.js`,
  `Bench2D`). `scene.js`, WebGL and `Particles` are no longer imported, so the
  old raycast bug cannot fire.
- One pointer controller (`BenchInput`) handles every input: tap to act,
  tap-tap or drag to move, pointer capture, 4s watchdog, cancel on
  blur/visibility/orientation change, `Enter`/`Space` on a focused part.
- Every part is a DOM hit area of at least 44 CSS px; `?debug=1` outlines them
  and prints level/step/selection/last action.
- Nothing is off-screen at 375x667: bench rows clear the sticky bottom nav and
  the stage is 560px tall. Measured after framing: 13/13 visible parts are
  in-viewport, uncovered, and >=44px.
- Desktop: the objective card sits in the right column (not over the bench);
  the game is capped at `clamp(560px, 78vh, 820px)` so every control is
  reachable without scrolling the page.
- Causes 1–7 and the harness gotchas (smooth scrolling, `.pclab-frame`
  overflow, stale overlay buttons) are recorded in `docs/PCLAB_BUGFIX.md`.
- Gate (**verified**): `node tests/pc-lab-regression.mjs` passes L0 safety,
  L2 CPU and L4 RAM with tap, tap-tap, drag, Rotate and press & hold on both
  375x667 touch and 1280x800 mouse. `--runs=30` stability loop: 30 passes per
  device.

## Open gate

`npm run audit` has not been run since the Phase B/C edits. It must exit 0
before Phase D starts. Previously failing items that were addressed:
`smallControls` (PC Lab tabs/icons and `.xp-chip` at 44px+), `textPadding`
(sr-only and `.pclab-frame` skipped), and the exam/activity spacing rules.

## Phase D — 12 placeholder games (next)

Each one is a real, playable game (no "coming soon"), built one at a time with
a no-text test, and this file updated after each:

1. `sort-station`
2. `order-rush`
3. `software-mission`
4. `spot-mistake`
5. `which-computer`
6. `anatomy`
7. `software-sorter`
8. `case-files`
9. `flashcards`
10. `tech-checkup`
11. `word-chain`
12. `reflection`

## Phase E — polish

Lighthouse, offline behaviour, Render deploy, final copy pass, and a full
audit across the theme matrix.

## Commands

```sh
npm start                                  # builds knowledge + games, serves :3000
npm test                                   # unit tests
npm run check                               # content check
npm run audit:routes                       # 36 routes x 375/1280, screenshots
AUDIT_FAST=1 npm run audit                 # quick UI audit smoke
node tests/pc-lab-regression.mjs           # PC Lab gate
node scripts/assistant-smoke.mjs --live    # 5 real Gemini questions (needs key)
```

Audit env vars: `AUDIT_WIDTHS`, `AUDIT_THEMES`, `AUDIT_ROUTES`, `AUDIT_DIR`,
`AUDIT_FAST`, `CHROMIUM_PATH`.

## Notes

- `docs/MASTER_PROMPT.md` is the product spec; read it before Phase B–E work.
- `assets/reference/pc-lab-topdown.jpg` is still missing. The 2D bench art is
  CSS, so the game works, but the reference image the spec asks for does not
  exist yet.
- `package.json` and `server.js` stay at the repo root; the start command is
  still `npm start`; no new dependencies were added.
