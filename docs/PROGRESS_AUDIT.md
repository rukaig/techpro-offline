# TechPro progress audit — Step 1 (audit gate)

Date: 2026-11-02. Auditor: this session. Everything below was run in this workspace; anything not run is labelled "not run".

## 1. How this was measured

```sh
npm install                     # already installed, node_modules present
npm test                        # 6/6 assistant tests pass
npm run check                   # content check passes: 14 files, 4 assets, imports
npm run audit:routes            # 72 states (36 routes x 375px and 1280px)
AUDIT_FAST=1 npm run audit       # smoke pass of the extended UI audit
AUDIT_WIDTHS=375 AUDIT_THEMES=editorial AUDIT_ROUTES=/exam,/exam/pretest npm run audit
node tests/pc-lab-regression.mjs # FAILS: reproduces the PC Lab input bug
```

Artifacts:

- `audit/before/routes.json` — every route, both widths, console/page errors, page kind.
- `audit/before/routes-375/*.png`, `audit/before/routes-1280/*.png` — one screenshot per route and width.
- `audit/before/report.json` — UI findings from the extended audit.
- No git repository exists in this workspace (`git status` → "not a git repository"), so nothing was committed and `git log`/`git grep` checks are unavailable.

Tooling added in this step:

- `scripts/route-check.mjs` (`npm run audit:routes`) — route matrix, console capture, screenshots.
- `scripts/ui-audit.mjs` — extended with text padding, joined inline text, icon alignment, flush buttons, small controls, unstyled controls, long lines, bad text, sticky-header gap checks and per-route screenshots. Themes reduced to the requested Editorial / Neon / Contrast with light and dark; `AUDIT_WIDTHS`, `AUDIT_THEMES`, `AUDIT_ROUTES`, `AUDIT_FAST` are supported.

## 2. Route inventory (36 routes, both widths)

All 36 routes returned HTTP 200 and rendered at 375px (touch) and 1280px (mouse). There were **0 console errors, 0 page errors and 0 failed requests** in `audit/before/routes.json`. "Loads" is therefore not a useful differentiator; the table classifies what the page actually does.

| Route | Kind | Loads 375 / 1280 | Console errors | Core mechanic | Engine | Saves progress | Theme + companion | Touch drag | Bugs found |
|---|---|---|---|---|---|---|---|---|---|
| `/` | page | yes / yes | 0 | home dashboard, ranks preview, play cards | no | local | yes / yes | n/a | `.rank-name` name and section run together; rank card has no padding; 0px gap under sticky header |
| `/library` | page | yes / yes | 0 | lesson index | no | reads local | yes / yes | n/a | 0px gap under header |
| `/library/:lesson` (9 lessons) | page | yes / yes | 0 | lesson reading, checklists | no | local | yes / yes | n/a | 0px gap under header; some unpadded cards |
| `/play` | page | yes / yes | 0 | 16-card activity hub | no | reads local | yes / yes | n/a | `.activity-copy` has no CSS, so every card title and tagline render joined on one line ("Sort StationHardware, system, or application?"); cards not game-style |
| `/play/pc-lab` | real game | yes / yes | 0 | 3D bench, safety -> CPU -> RAM -> case -> power | three.js + own bundle | local + Firestore sync | yes / yes | not verified (blocked earlier) | **Step 2 of 8 is unclickable** (see `PCLAB_BUGFIX.md`); bench extends below the 375px viewport |
| `/play/pc-lab?mode=disassembly` | real game | yes / yes | 0 | reverse drill on the same scene | three.js | local + Firestore sync | yes / yes | not verified | Shares the picking bug; not driven past the first steps in this pass |
| `/play/sort-station` | placeholder | yes / yes | 0 | none: generic activity card with "Start" link | no | no | yes | n/a | not a game |
| `/play/order-rush` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/play/software-mission` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/play/spot-mistake` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/play/which-computer` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/play/anatomy` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/play/software-sorter` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/play/case-files` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/play/flashcards` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/play/tech-checkup` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/play/word-chain` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/play/reflection` | placeholder | yes / yes | 0 | none | no | no | yes | n/a | not a game |
| `/exam` | page | yes / yes | 0 | assessment lobby with two cards | no | reads best score | yes / yes | n/a | `.exam-card` has no padding (text 1px from the card edge); "Not taken" and "About 10 minutes" touch with a 0px gap; buttons sit 1px above the card bottom; 0px gap under header |
| `/exam/pretest` | quiz | yes / yes | 0 | 15-item quiz, no timer, explanations | shared quiz renderer | local best score | yes / yes | n/a | intro card has no padding; eyebrow prints "PRE-TEST · PRE-TEST · 15 ITEMS" |
| `/exam/final` | quiz | yes / yes | 0 | 15-item timed quiz, 80% badge | shared quiz renderer | local best score | yes / yes | n/a | same intro-card padding bug |
| `/plan` | page | yes / yes | 0 | study plan, export, reminders | no | local + Firestore | yes / yes | n/a | 0px gap under header |
| `/account` | page | yes / yes | 0 | sign in/up, profile | no | Firestore | yes / yes | n/a | 0px gap under header |
| `/assistant` | partial feature | yes / yes | 0 | SSE chat, history, feedback | server Gemini proxy | Firestore (server-side) | yes / yes | n/a | key not configured; no health endpoint; see Gemini status |
| `/leaderboard` | page | yes / yes | 0 | local standings copy | no | local | yes / yes | n/a | placeholder content |
| `/profile` | page | yes / yes | 0 | static profile copy | no | local | yes / yes | n/a | placeholder content |
| `/teacher` | page | yes / yes | 0 | static teacher copy | no | no | yes | n/a | placeholder content |
| `/about` | page | yes / yes | 0 | credits | no | no | yes | n/a | none |
| `/install` | page | yes / yes | 0 | PWA install copy | no | no | yes | n/a | none |

Counts for the Step 2 summary:

- **Done: 2** — `/exam/pretest`, `/exam/final` (quiz engine works; layout defects listed).
- **Partial: 4** — `/play/pc-lab`, `/play/pc-lab?mode=disassembly` (real 3D game, blocked at safety step 2), `/exam` (lobby, layout defects), `/assistant` (built, unconfigured).
- **Placeholder: 12** — the twelve `/play/*` routes listed above.
- **Page/static: 18** — home, library, lessons, play hub, plan, account, leaderboard, profile, teacher, about, install.
- Total 36. The older "3 Done / 27 Partial / 6 Placeholder" claim does not match the router or the live pages.

## 3. Shared game engine and how a new interactive is registered

- The only real game lives in `src/games/pc-lab/` (`index.js` controller and state machine, `scene.js` three.js scene and pointer handling, `models.js` part meshes, `fallback2d.js` DOM fallback).
- It is bundled by `scripts/build-games.mjs` into `assets/games/pc-lab.js` and loaded on demand by `src/pages/pc-lab.js`.
- The Play hub is generated from `src/data/activities.js` and rendered by `src/pages/play.js`; every non-PC-Lab route falls through `route("/play/:activity")` in `src/app/main.js`, which renders a static card.
- There is **no general game shell** for the other 12 activities: no shared scene, input controller, timer or scoring hook is registered for them. `src/app/game-kit.js` only supplies the activity hero, toasts and small UI helpers.
- There is no documented "register a new interactive" path. Phase C creates it (input controller + pure step data); Phase D reuses it.

## 4. Building UI findings, grouped by root cause (one shared fix each)

Measured with the extended audit; examples are from `audit/before/report.json`.

1. **Component CSS is missing for classes the pages already use.** `.exam-card`, `.exam-best`, `.exam-hub`, `.activity-copy`, `.rank-name` have no rule in `src/styles/`. Audit evidence: `padding h2 within 1px of article.exam-card.card (padding 0px)`, `joined div.exam-best: strong + span gap 0px "Not taken + About 10 minutes"`, `joined span: strong + small gap 0px "Sort Station + Hardware, system, or application?"`. Shared fix: add these classes to `src/styles/components.css` with the spacing tokens.
2. **No page-start rhythm under the sticky header.** Every route reports `content 0px under header.site-head`; `.site-head` is sticky and `#main` starts at its exact bottom. Shared fix: one `page-shell` top offset plus `scroll-margin-top` on anchored sections.
3. **Cards without padding.** `.exam-card`, `.exam-intro`, `.rank-preview` render text 0–1px from the border. Shared fix: one padded card component/class used by all of them.
4. **Joined inline text where two labels sit side by side.** Exam `Not takenAbout 10 minutes`, home `Mika Reyes11-ABM 1`, footer `TechProFirst Edition`, play cards `Sort StationHardware, system, or application?`. Shared fix: the missing component classes from item 1; where the pairing is intentional (rank name + section), use a flex row with `gap`.
5. **Buttons flush against a card bottom.** Exam start buttons are 1px from the card bottom (`flush a.btn.btn-primary.btn-block 1px from article.exam-card.card bottom`). Shared fix: card content uses `display:grid; gap` with padding instead of a button as the last edge-to-edge child.
6. **Small and inconsistent controls.** Segmented Light/Dark/System buttons are 36px high; icon buttons are 38px; "Ask" is 34px. Shared fix: one control height token (>= 40px, 44px on touch) and one segmented component.
7. **Icons not centered with their labels.** Text links and some list items are off by up to 21.5px when the icon is a separate block next to wrapped text. Shared fix: an `icon + label` alignment helper (`display:inline-flex; align-items:center; gap`).
8. **No blocking of `NaN`/`undefined`.** No occurrences found on the audited routes today (`badText: 0`); keep the check as a guard.

Theme panel: the audit inspected the settings dialog at 320/375/768/1440 in Editorial light and dark. It did **not** reproduce the reported "theme name and description on one line, spilling out of the button": `.theme-option` currently uses a grid card with 0.55rem padding and stacked name/description, and the audit found no padding or joined-text failure there. What it does flag is the 36px segmented control and the 38px close/icon buttons. I will re-check the theme panel against every theme in Phase B before claiming it fixed.

## 5. PC Lab bug: what is actually broken

Full detail and evidence in `docs/PCLAB_BUGFIX.md`. Summary:

- The previous regression script clicked the **power button while the required step was clean-bench**, so its "stall" was a bad test, and the "confirmed cause" recorded here earlier was not correct. Corrected.
- Real, reproducible failure: tapping the cleaning cloth advances to `arrange-bench`; tapping the **toolbox** then does nothing and the game toasts `Finish "Set out tools and parts" first.` The toolbox is the required target, so the safety level cannot progress. Reproduced at 375px touch and 1280px mouse (`node tests/pc-lab-regression.mjs`).
- Cause: the raycast picks invisible case-screw outline geometry that covers the toolbox on screen (three.js line raycasting uses a 1-world-unit threshold; the outline `LineSegments` and hidden screws stay in the raycast list), and `pick()` does not prefer the current step's target. The click is treated as a blocked drag, so `onSceneClick` never runs.
- Secondary: on a 375x667 phone the bench canvas starts at y=558 and is 390px tall, so several targets project below the viewport until the page is scrolled.

## 6. Gemini assistant status (read-only inspection)

What exists and works in code:

- `dotenv` loads `.env` at the top of `server.js`; Render env vars keep working. `.env` is in `.gitignore`; `.env.example` has `GEMINI_API_KEY`, `GEMINI_MODEL`, Firebase admin settings.
- The key is read only in `server.js` (`process.env.GEMINI_API_KEY`) and never sent to the client (`grep` over `src/`, `assets/`, HTML finds no key or key name).
- `POST /api/assistant` requires a Firebase ID token (`firebase-admin`), validates with `sanitizePrompt` and `isValidConversationId`, trims history to the last 10 turns, streams SSE (`sources`, `delta`, `done`, `error`), stores history and thumbs feedback in `techpro_assistant/{uid}/conversations/{id}`, and returns friendly 503/429/502 messages.
- `GET/DELETE /api/assistant/history` and `POST /api/assistant/feedback` exist. Firestore rules deny all client access to `techpro_assistant`; the server is the only writer.
- Knowledge: `npm run build:knowledge` reliably builds 22 sources (12 module passages + 10 curated notes) from `content/module.md` and `knowledge/computers.md`; `retrieveKnowledge` ranks them; unit tests pass.
- Client: `/assistant` renders companion avatar, suggested prompts, sources, feedback buttons, clear history and an offline message; it follows the theme.

Gaps versus Phase 0 (not fixed yet):

- No `GET /api/assistant/health` (`{ configured, model }`).
- Rate limit is 10 per minute per user+IP, hard-coded; no configurable 20/10-min bucket and no global cap.
- No request timeout/keep-alive for the upstream stream; abort is only checked between chunks.
- The sanitizer runs per line, not statefully across streamed chunk boundaries; no split-chunk tests.
- The system instruction does not mention the active companion's voice, module-versus-extra labelling, exam-attempt lockout beyond a generic line, or "Read more" links.
- Not implemented: "Explain this lesson", in-game "Stuck? hint", copy button.
- Model id `gemini-3.8-flash` is a claim in `README.md`/`.env.example`; it has not been verified against the current Google model catalog in this session.
- No real call was made: there is no `.env` in this workspace. Everything above was verified by reading code and running the unit tests, not by generating a reply.

## 7. What Step 1 did not run

- Full multi-theme audit (the full matrix across 9 old themes) — replaced by Editorial/Neon/Contrast as requested; only Editorial was exercised end to end in this pass.
- Real Gemini generation (no key in `.env`).
- PC Lab drag interactions after the safety level, and disassembly mode, because the safety level is blocked at step 2.
- Pinch-zoom, 80–200% browser zoom, devicePixelRatio 2/3, keyboard-only play — deferred to the Phase C test plan.
- Lighthouse, offline caching, Render deployment — Phase E.
