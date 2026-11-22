# AGENTS.md — TechPro Working Rules (100% Offline)

TechPro is an offline-first learning application for DepEd CSS NC II, COC 1, Module 1: Assemble Computer Hardware.
It runs completely standalone without internet, servers, accounts, or external APIs.

---

## 1. Non-Negotiable Rule: Zero Network at Runtime

- **No external network calls:** The application must never make requests to non-local origins.
- **No cloud dependencies:** No Firebase, no Firestore, no Gemini API, no Google APIs, no CDNs, no Google Fonts, no analytics.
- **Three run modes must always work:**
  1. `file://dist/index.html` (double-clicking from file manager / USB stick)
  2. `http://localhost:3000` via `npm start` (local Node.js http server)
  3. Installed PWA on desktop
- **Build output:** Self-contained in `dist/`, packaged into `TechPro-offline.zip`.
- **Classic scripts:** Shipped browser code in `dist/` is bundled as an IIFE classic script (`app.js`). No runtime ES `import` or `type="module"` in shipped files.
- **Hash routing:** All routes use `#/<path>` so direct links and navigation work under `file://`.
- **Secrets rule:** Never store, commit, or prompt for any API keys or `.env` files.

---

## 2. Removal List (Preserved Offline Replacements)

- **Firebase Auth & Firestore:** Replaced by local multi-profile store (`src/services/store.js`) backed by `localStorage` + `IndexedDB` with fallback to in-memory mode.
- **Gemini Assistant:** Replaced by local search helper (`src/pages/assistant.js`) searching bundled module passages (`knowledge/index.json`), glossary (`src/data/glossary.js`), and authored technical FAQs.
- **Global Leaderboard:** Replaced by local device ranks (`src/pages/ranks.js`) comparing profiles on this device.
- **Cloud Teacher Sync:** Replaced by offline Class Summary (`src/pages/teacher.js`) allowing teachers to import student backup JSONs and export sanitized CSVs.
- **Server:** Express replaced by built-in Node `http` static server (`scripts/server.mjs`).

---

## 3. Run and Verify

```sh
npm run build              # Builds knowledge, games, bundles app.js and CSS into dist/
npm run build:offline      # Builds dist/ and packages TechPro-offline.zip with README.txt
npm start                  # Starts lightweight local server on http://localhost:3000
npm start -- --lan         # Starts classroom hotspot mode and prints local Wi-Fi IP
npm test                   # Runs unit tests (store, module accuracy)
npm run check              # Checks required content files and module terms
npm run check:offline      # Verifies 0 remote URLs, 0 cloud keywords, 0 ES modules in dist
npm run test:offline       # Playwright offline suite (file:// and localhost viewports)
npm run test:pclab         # PC Lab regression test
```

---

## 4. Working Protocol

1. Verify before trusting: Run tests and checks rather than assuming previous claims.
2. Verify every UI item at **375px touch** and **1280px mouse**.
3. Zero console errors and zero non-local origin requests across all routes.
4. Keep chat replies concise; document architecture and technical details in `docs/OFFLINE.md` and `docs/BUILD_STATUS.md`.
