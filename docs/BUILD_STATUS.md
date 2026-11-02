# TechPro build status

Last updated: 2026-11-02 (Step 1 audit gate complete, waiting for the single "go").

## Resume here

1. Read `AGENTS.md`, then this file, then `docs/PROGRESS_AUDIT.md` and `docs/PCLAB_BUGFIX.md`.
2. Verify the claims: `npm start`, open the routes, run `node tests/pc-lab-regression.mjs`.
3. Next work after "go": Phase 0 (Gemini), then Phase B (UI repair), C (PC Lab rebuild), D (games), E (polish).

## Done and verified this session

- Step 1 audit gate:
  - 36 routes loaded at 375px and 1280px: 0 console errors, 0 page errors, 0 failed requests (`audit/before/routes.json`).
  - Real vs placeholder split established: 2 done quizzes, 4 partial real features, 12 placeholder games, 18 static pages.
  - PC Lab input bug reproduced with a real failing test (`node tests/pc-lab-regression.mjs`) on touch and mouse.
  - Root causes confirmed and recorded in `docs/PCLAB_BUGFIX.md` (invisible outline raycast blocking the toolbox; phone bench below the fold).
  - UI audit extended (`npm run audit`) to catch missing padding, joined inline text, icon misalignment, flush buttons, small/unstyled controls, long lines, bad text and sticky-header gaps; now reports the exam page defects instead of "zero".
  - Route checker added (`npm run audit:routes`) with screenshots and JSON.
  - Gemini assistant inspected read-only; status and gaps listed in `docs/PROGRESS_AUDIT.md` section 6.
- `npm test` 6/6 pass; `npm run check` passes; `npm start` still serves on :3000.

## Known broken (do not pretend otherwise)

- PC Lab safety level is blocked at step 2 (`arrange-bench`) because the toolbox tap is swallowed by invisible geometry. `tests/pc-lab-regression.mjs` fails by design until Phase C.
- Twelve `/play/*` routes are placeholder cards, not games.
- Exam lobby and exam intro cards have no padding, joined meta text and flush buttons.
- Play hub card titles and taglines run together because `.activity-copy` has no CSS; `.rank-name` has the same problem on the home page.
- Theme panel reported bug was not reproduced at 320/375/768/1440 in Editorial light/dark; re-check all themes in Phase B.
- Gemini is not configured: no `.env` in this workspace, no `GET /api/assistant/health`, no real call has been made. No key is stored in the repo or client.
- No git repository in this workspace, so no commits exist.

## Environment and secrets

- `.env` does not exist here. `.env.example` documents `GEMINI_API_KEY`, `GEMINI_MODEL`, `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT_JSON`, `GOOGLE_APPLICATION_CREDENTIALS`.
- The Gemini key must be placed in `.env` by the owner (or in Render's Environment tab). Never paste it into chat, code, docs, tests, or git. If a key is pasted anywhere, rotate it.
- Server-side only: `server.js` reads `process.env.GEMINI_API_KEY`.

## How to test

```sh
npm start                                  # builds knowledge + games, serves :3000
npm test                                   # assistant unit tests
npm run check                              # content check
npm run audit:routes                       # 36 routes x 375/1280, screenshots + audit/before/routes.json
AUDIT_FAST=1 npm run audit                 # quick UI audit smoke
AUDIT_WIDTHS=375,1440 AUDIT_THEMES=editorial,neon,contrast npm run audit
node tests/pc-lab-regression.mjs           # currently FAILS: the PC Lab bug
```

Useful audit env vars: `AUDIT_WIDTHS`, `AUDIT_THEMES`, `AUDIT_ROUTES`, `AUDIT_DIR`, `AUDIT_FAST`, `CHROMIUM_PATH`.

## Next item after the "go"

Phase 0.1 — assistant health endpoint + verified model id, then the rest of Phase 0 in the order of `docs/MASTER_PROMPT.md`. The master prompt file referenced by `AGENTS.md` is not present in this workspace (`docs/MASTER_PROMPT.md` is missing); the prompt text supplied in chat is the working copy. Create `docs/MASTER_PROMPT.md` before Phase B so future sessions can resume from it.

## Deployment note

`package.json` and `server.js` stay at the repo root; start command remains `npm start`. `prestart` builds knowledge and games. Render supplies `PORT`. Nothing in this step changed the start command or added dependencies.
