# TechPro Build Status — 100% Offline Conversion

Last updated: 2026-11-22.
Status: **Offline conversion complete; engaging game redesign in progress** (Branch `offline-only`).

## RESUME HERE: Case Files and remaining engagement games

Completed:
- Sort Station: conveyor sorting arcade with five difficulty waves, combo, jam meter, hint, and local progress.
- Which Computer?: swipe-card strategy game for Desktop, Laptop, Tablet, and Server needs.
- Shared module game data: 24 vocabulary terms and 10 sourced facts.
- Shared seeded shuffle, normalization, difficulty, star, and seed-code helpers.
- Phone smoke tests reached results screens for both games with zero console errors.
- Software Mission: customer help-desk service arcade with patience, tips, tool badges, hints, and local XP.
- Word Bank Chain: ten-link puzzle with term bank, wrong-link feedback, hint, and local XP.
- Word Hunt: seeded word search with straight-line placement, found-word tracking, and local XP.
- Tech Wordle: daily seeded guess-the-term game with scored keyboard, clue, and local XP.
- Software Sorter: 18 module-grounded programs dropped into System software, Utility, or Application columns with animated stacking, hints, and local XP.
- Order Rush: six-door escape sequence in the module's safe preparation order with a 90-second clock and local XP.
- Spot the Mistake: six hidden unsafe practices with exact corrections, misclick penalties, hint pulse, and local XP.
- All three interrupted games are now routed in `src/app/main.js`, styled at 375px touch and 1280px mouse, and covered by Playwright tests that play them to their results screens in both `file://` and `http://localhost` modes.
- Fixed a route-cleanup leak in Software Mission: its `setInterval` kept writing to removed DOM after navigation. All timed games now return cleanup functions to the router.

Next:
- Case Files
- Flashcards + Quick Recap
- Tech Check-Up and Reflection Journal
- PC Anatomy Explorer and Disassembly Mode engagement passes

---

## 1. Verified Offline Gate Summary

| Gate / Test Suite | Result | Details |
|---|---|---|
| `npm test` | **PASS (10/10)** | Multi-profile store, migrations, schema validation, DepEd module accuracy |
| `npm run check` | **PASS** | 14 core source files, assets, and module terms verified |
| `npm run check:offline` | **PASS** | 0 remote URLs, 0 cloud keywords, 0 ES modules in dist, 0 runtime fetches |
| `npm run test:offline` | **PASS (8/8)** | Playwright suite covering file:// and http://localhost at 375x667 touch & 1280x800 mouse; 0 console errors, 0 non-local requests |
| `npm run test:pclab` | **PASS** | PC Lab regression gate (L0 safety, L2 CPU, L4 RAM with tap, tap-tap, drag, rotate, hold) |
| `npm run build:offline` | **PASS** | Produces `dist/` and `TechPro-offline.zip` (1.21 MB total) with `README.txt` |
| `npm run audit` | **No runtime errors** | 0 browser errors, 0 contrast failures. The three new games add no overflow, bounds, or horizontal-scroll findings; all game routes still report the same pre-existing `textPadding` notices from the shared game header. |

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
   - Replaced cloud Gemini API with a 100% offline search helper.
   - Grounded on bundled module passages (`knowledge/index.json`), glossary (`src/data/glossary.js`), and authored FAQs.
7. **Offline Sharing & Server (`scripts/server.mjs`, `src/pages/sharing.js`):**
   - Tiny static server using Node.js built-in `http` module (`npm start`).
   - Classroom hotspot mode (`npm start -- --lan`) outputs local Wi-Fi IP for offline LAN sharing.

---

## 3. Removal Verification

The following online/cloud dependencies were completely removed:
- **SDKs & Packages:** `@google/genai`, `firebase`, `firebase-admin`, `dotenv`, `express`, `compression`, `qrcode`.
- **Files Deleted:** `firebase-config.js`, `firebase.json`, `firestore.rules`, `firestore.indexes.json`, `.firebase/`, `.env.example`, `server/`, `tests/assistant.test.js`, `tests/server-assistant.test.js`, `scripts/assistant-smoke.mjs`, `src/services/firebase.js`, `src/services/leaderboard.js`.
- **Shipped Code Check:** Verified with `npm run check:offline` that 0 mentions of `firebase`, `firestore`, `gemini`, `GEMINI_API_KEY`, `googleapis`, `gstatic`, `cdn`, `analytics` exist in `src/` or `dist/`.

---

## 4. Packaging & Artifacts

- Output zip: `TechPro-offline.zip` (~1.20 MB).
- Includes complete `dist/` directory and plain-text `README.txt` with instructions for Option 1 (file://), Option 2 (localhost), and Option 3 (PWA).

---

## 5. Final Continuation Status

- PC Lab regression passes at 375x667 touch and 1280x800 mouse, including L0, L2, and L4.
- Legacy path URLs redirect to hash routes so relative assets and file:// operation remain intact.
- Offline Playwright suite passes in file:// and localhost modes.
- `npm run check:offline` passes with zero remote resources and forbidden dependency mentions in shipped source.
- Current package size is approximately 1.20 MB; `dist/` is approximately 1.8 MB.
