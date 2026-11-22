# TechPro Offline Architecture & Reference

TechPro is a 100% offline educational web application designed for DepEd Computer Systems Servicing NC II (Assemble Computer Hardware). It requires zero network connectivity, no server, no user accounts, no CDN, and no external API keys.

---

## 1. Run Modes

TechPro is engineered to run in three distinct operational environments:

### Mode A: Double-Click (file://)
- **Target Audience:** School computers, computer laboratory PCs without internet, and direct execution from a USB stick.
- **How to Run:** Extract `TechPro-offline.zip` or open the `dist/` directory and double-click `index.html`.
- **Mechanism:** The application loads entirely via relative paths (`./assets/...`). Scripts are bundled as a classic IIFE (`app.js`) to prevent browser file:// CORS/ES-module restrictions.

### Mode B: Local Static Server (http://localhost)
- **Target Audience:** Single-device local usage or classroom Wi-Fi hotspots.
- **How to Run:**
  ```sh
  npm start
  ```
  Runs a lightweight static server using Node.js built-in `http` module on port 3000 (`http://localhost:3000`).
- **Classroom Hotspot Mode:**
  ```sh
  npm start -- --lan
  ```
  Detects and outputs the local IPv4 Wi-Fi address (e.g. `http://192.168.1.50:3000`) so all students connected to the teacher's offline hotspot can load and use TechPro simultaneously.

### Mode C: Installed Desktop PWA
- **Target Audience:** Students and teachers wanting a dedicated standalone desktop app icon.
- **How to Run:** Open `http://localhost:3000` in Chrome/Edge/Brave and click **Install TechPro** in the address bar. The service worker precaches all assets, allowing the app to open standalone with zero internet.

---

## 2. Storage Layer & Multi-Profile Architecture

Replaces cloud Firebase/Firestore with local-first, multi-tier durable storage:
- **Primary Cache:** Synchronous in-memory JavaScript state for instantaneous UI rendering and zero layout flash.
- **Durable Store:** Synchronously mirrored to `localStorage` (inside try/catch blocks).
- **Secondary Backup:** Asynchronously mirrored to `IndexedDB` (`techpro_db` / `kv` store).
- **In-Memory Fallback:** If storage access is blocked by strict browser sandboxing under `file://`, the store safely falls back to in-memory mode and alerts the user to download backups after milestones.
- **Persistence:** Requests `navigator.storage.persist()` when available.

### Multi-Profile Support (Shared Laboratory Computers)
- Designed for shared school PCs where multiple students take turns.
- Each profile has a unique local ID (`prof_<timestamp>_<rand>`), display name, avatar, and independent progress (XP, stars, exam scores, bookmarks, journal, and PC Lab saves).
- Profile switcher and manager available in **Profile on this device** (`#/account`).
- Profiles are local and not password-protected.

### Backup, Restore & Teacher View
- **Student Backup:** Learners can export a versioned, sanitized JSON file (`Download backup`) to save to a USB stick.
- **Student Restore:** Learners can import any previously saved TechPro backup file.
- **Teacher View (`#/teacher`):** Teachers can import multiple student backup JSON files simultaneously. The view aggregates class progress, stars, exam percentages, and allows exporting a clean grade sheet as a sanitized CSV (neutralizing formula injection characters `=+-@`).

---

## 3. Offline Helper (Ask TechPro)

Replaces cloud Gemini AI assistant:
- **Zero API Keys & Zero Network:** No models, no streaming server endpoints, no upstream timeouts.
- **Knowledge Base:** Compiles module content passages (`knowledge/index.json`), complete glossary definitions (`src/data/glossary.js`), and pre-authored technical FAQs directly into the client bundle.
- **Search Scoring:** Uses local tokenization and scoring (`retrieveKnowledge`) to match questions with relevant module sections and links learners directly to corresponding library lessons and practice benches.

---

## 4. Routing Architecture

- **Hash Routing:** Replaces server-dependent path routes (`/play/pc-lab`) with hash routes (`#/play/pc-lab`).
- **Seamless Interception:** All internal `<a href="...">` links are intercepted by the router and rewritten into hash navigation without reloading the page.
- **HTTP Server Redirect:** If accessed on a web server at a traditional path like `http://localhost:3000/library`, the router automatically redirects to `http://localhost:3000/#/library`.

---

## 5. Self-Hosted Font Licenses

All typography is self-hosted locally under `dist/assets/fonts/`:
1. **Roboto Condensed:** Apache License 2.0 (Google Fonts / Christian Robertson)
2. **Source Serif 4:** SIL Open Font License 1.1 (Frank Grießhammer / Adobe)
3. **Nunito:** SIL Open Font License 1.1 (Vernon Adams)
4. **Baloo 2:** SIL Open Font License 1.1 (Ek Type)
5. **JetBrains Mono:** SIL Open Font License 1.1 (JetBrains)
6. **Press Start 2P:** SIL Open Font License 1.1 (CodeMan38)
7. **Atkinson Hyperlegible:** SIL Open Font License 1.1 (Braille Institute)

---

## 6. Verification Gates

1. `npm run check:offline`: Scans `dist/` and `src/` to guarantee zero non-local URLs, zero cloud keywords, zero ES module imports in dist, and zero runtime data fetches.
2. `npm run test:offline`: Automated Playwright test suite blocking all external network and testing all routes and interactions across phone and desktop viewports under both `file://` and `http://localhost`.
3. `npm test`: Node.js test runner verifying store migrations, multi-profile operations, and DepEd module accuracy.
