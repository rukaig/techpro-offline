# TechPro Build Status — 100% Offline Conversion

Last updated: 2026-11-22.
Status: **Offline conversion and interactive rebuild complete** (Branch `offline-only`).

## Interactive coverage

All 26 catalogue activities in `src/data/activities.js` now resolve to a real, playable interactive across two modules. The Play hub groups, module filters, and counts come from that same catalogue, so no card can link to a placeholder or back to itself.

- Module 1 drills: Pre-test, Post-test, Sort Station, Order Rush, Software Mission, Spot the Mistake, Which Computer?, Software Sorter, Word Chain, Word Hunt, Tech Wordle, PC Anatomy Explorer, Tech Check-Up, Case Files, Flashcards + Quick Recap, Reflection Journal, and PC Lab.
- Module 2 activities (`src/games/module2-activities.js`): Startup Relay, BIOS Setup Lab, Boot Order Builder, Hardware or Setting?, BIOS Flashcards, and Carlo's Boot Case.
- Module 2 exams: `bios-pretest` and `bios-final` use their own 15-item banks, answer keys, XP, and badges.
- PC Lab (`src/games/pc-lab-workbench.js`): a self-contained 2D workbench with a 10-step guided build and a real 10-step disassembly drill. The old dead 3D/camera/quality controls are gone; feedback explains every correct and incorrect action.
- Shared game shell styling (`.game-head`, `.best-card`, `.game-bar`, result panel, `.study-*`, and `.setup-*`) now lives in `games.css`, so every interactive has the same spacing, back bar, and result layout.
- Navigation: Library, Play, and Exams have module selectors; lesson Previous/Next stays inside its module; result-panel next steps and exam links stay module-aware; hash navigation no longer mounts a view twice.

---

## 1. Verified Offline Gate Summary

| Gate / Test Suite | Result | Details |
|---|---|---|
| `npm test` | **PASS (42/42)** | Store, module accuracy, assistant retrieval, route integrity, offline browser suite, and all game unit tests |
| `npm run check` | **PASS** | 15 required files, assets, and both modules' terms verified |
| `npm run check:offline` | **PASS** | 0 remote URLs, 0 cloud keywords, 0 ES modules in dist, 0 runtime fetches |
| `npm run test:offline` | **PASS (8/8)** | Playwright suite covering file:// and http://localhost at 375x667 touch & 1280x800 mouse; 0 console errors, 0 non-local requests |
| `npm run test:pclab` | **PASS** | PC Lab build + disassembly regression at 375px touch and 1280px mouse, including 44px action targets, local result state, and no horizontal overflow |
| `npm run audit:routes` | **PASS (98/98)** | Every route opens at 375px touch and 1280px mouse with no runtime errors |
| `npm run build:offline` | **PASS** | Produces `dist/` and `TechPro-offline.zip` (1.25 MB total) with `README.txt` |
| `npm run audit` | **PASS** | 1,872 route states: 0 horizontal scroll, 0 overflow, 0 bounds, 0 spacing/contrast/alignment findings, 0 browser errors |

---

## 2. Architecture & Replacements (Zero Network at Runtime)

1. **Static Build Output (`dist/`):**
   - Self-contained application bundled into `dist/` using `esbuild`.
   - Browser entry point is a classic IIFE script (`app.js`), loaded via `<script src="./app.js">`. Zero runtime ES `import` or `type="module"`, enabling flawless execution when double-clicking `index.html` under `file://`.
2. **Hash Routing:**
   - Routes rewritten from path format to hash format (`#/library`, `#/play/pc-lab`, `#/exam`).
   - Deep links, browser history, back/forward, and in-page anchor jumps work with zero server rewrites.
3. **Storage Layer (`src/services/store.js`):**
   - Synchronous in-memory state backed by `localStorage` and `IndexedDB`.
   - In-memory fallback if storage access is restricted under `file://` sandboxing, with calm user notifications.
   - Multi-profile management on shared classroom computers (`list`, `createProfile`, `switchProfile`, `deleteProfile`).
   - Backup download and restore via sanitized JSON.
4. **Local Device Ranks (`src/pages/ranks.js`):**
   - Replaced global leaderboard with local ranks comparing learners on this device by XP and stars.
5. **Teacher View (`src/pages/teacher.js`):**
   - Allows importing multiple student backup JSON files simultaneously.
   - Summarizes student names, sections, XP, stars, exam best scores, and games completed.
   - Exports safe class summary CSVs (neutralizing formula injection characters `=+-@`).
6. **Ask TechPro Offline Helper (`src/pages/assistant.js`):**
   - Replaced cloud Gemini API with a 100% offline search helper; no keys, no fetch, no cloud service.
   - Grounded on bundled module passages (`knowledge/index.json`), glossary (`src/data/glossary.js`), and authored FAQs.
   - Uses tokenization, stopwords, synonyms, light stemming, and weighted scoring, then labels results by confidence instead of inventing an answer.
   - `?lesson=<id>` opens a contextual explainer with lesson summary, glossary terms, key points, and links to related activities.
7. **Offline Sharing & Server (`scripts/server.mjs`, `src/pages/sharing.js`):**
   - Tiny static server using Node.js built-in `http` module (`npm start`).
   - Classroom hotspot mode (`npm start -- --lan`) outputs local Wi-Fi IP for offline LAN sharing.

---

## 3. Removal Verification

The following online/cloud dependencies were completely removed:
- **SDKs & Packages:** `@google/genai`, `firebase`, `firebase-admin`, `dotenv`, `express`, `compression`, `qrcode`.
- **Files Deleted:** `firebase-config.js`, `firebase.json`, `firestore.rules`, `firestore.indexes.json`, `.firebase/`, `.env.example`, `server/`, `tests/server-assistant.test.js`, `scripts/assistant-smoke.mjs`, `src/services/firebase.js`, `src/services/leaderboard.js`.
- `tests/assistant.test.js` was reintroduced as a pure-Node test for offline retrieval; it does not call a service or model.
- **Shipped Code Check:** Verified with `npm run check:offline` that 0 mentions of `firebase`, `firestore`, `gemini`, `GEMINI_API_KEY`, `googleapis`, `gstatic`, `cdn`, `analytics` exist in `src/` or `dist/`.

---

## 4. Packaging & Artifacts

- Output zip: `TechPro-offline.zip` (~1.25 MB).
- Includes complete `dist/` directory and plain-text `README.txt` with instructions for Option 1 (file://), Option 2 (localhost), and Option 3 (PWA).

---

## 5. Final Continuation Status

- PC Lab regression passes at 375px touch and 1280px mouse for both the 10-step build and 10-step disassembly modes.
- All 26 Play activities are playable; route integrity tests reject missing handlers, duplicate hub cards, and self-looping start buttons.
- Legacy path URLs redirect to hash routes so relative assets and file:// operation remain intact.
- Offline Playwright suite passes in file:// and localhost modes at 375x667 touch and 1280x800 mouse.
- UI audit passes all 1,872 route states with zero overflow, spacing, contrast, alignment, or browser-error findings.
- `npm run check:offline` passes with zero remote resources and forbidden dependency mentions in shipped source.
- Current package size is approximately 1.25 MB.
