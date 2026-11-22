# TechPro (100% Offline)

TechPro is a 100% offline, zero-network interactive learning application for DepEd Computer Systems Servicing NC II, COC 1: Assemble Computer Hardware.

Every page, lesson, quiz, and all 14 interactive activities run anytime with zero internet, including directly from a USB stick on school computers.

---

## Three Ways to Run TechPro

### 1. Instant Run (Double-Click index.html)
No server, installation, or internet required:
1. Open the `dist/` directory (or extract `TechPro-offline.zip`).
2. Double-click `index.html`.
3. It opens directly in your web browser (`file://`) and works completely offline!

### 2. Local Server (npm start)
Run a local static server with Node.js built-in `http` module:
```sh
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Classroom Wi-Fi Hotspot Mode
To share across a classroom Wi-Fi router or hotspot with NO internet:
```sh
npm start -- --lan
```
Prints the local network address (e.g. `http://192.168.1.50:3000`) so classmates on the same Wi-Fi can open and use TechPro simultaneously.

### 3. Install as a Desktop App (PWA)
When running locally via `http://localhost:3000`, click **Install TechPro** in your browser's address bar or navigate to **Offline sharing & setup** to install it as a standalone desktop application.

---

## Features

- **The Module Library:** DepEd Cavite COC 1 Module 1 lessons, illustrated figures, and key notes.
- **14 Interactive Games & Simulators:**
  1. PC Lab (Build a desktop step-by-step)
  2. Disassembly Mode (Safe tear-down sequence)
  3. Sort Station (Hardware, system, application sorting)
  4. Order Rush (Disassembly preparations under time)
  5. Software Mission (Scenario software matching)
  6. Spot the Mistake (Unsafe workstation hazards)
  7. Which Computer? (Device matching scenarios)
  8. PC Anatomy Explorer (Component explorer and pinouts)
  9. Software Sorter (Program categorization)
  10. Tech Check-Up (Inspection form and checklist)
  11. Case Files (Troubleshooting repair stories)
  12. Flashcards + Quick Recap (Spaced review)
  13. Word Bank Chain (Vocabulary definitions)
  14. Reflection Journal (Technician takeaways)
- **Two Exams:** Pre-Test baseline (15 items) and Final Exam (15 items) with scoring, timers, and explanations.
- **Local Multi-Profile System:** Supports multiple students on shared school PCs with independent XP, stars, badges, and saves.
- **Backup & Restore:** Export clean JSON progress backups to USB and restore on any computer.
- **Teacher View (`#/teacher`):** Import multiple student backup files to view class records and export grade sheets as CSV (with anti-injection sanitization).
- **Ask TechPro (Offline Helper):** Instant local search across module passages, glossary, and common hardware questions with zero API keys and no models.

---

## Build & Verify

```sh
npm run build              # Builds knowledge, games, and outputs dist/
npm run build:offline      # Creates dist/ and TechPro-offline.zip
npm test                   # Unit tests (store, module accuracy)
npm run check              # Content checks
npm run check:offline      # Strict offline gate (zero remote URLs/keywords)
npm run test:offline       # Full Playwright offline test suite
npm run test:pclab         # PC Lab regression test
```

---

## Packaging

Running `npm run build:offline` packages `dist/` and `README.txt` into a standalone `TechPro-offline.zip` (~1.2 MB), ready to be loaded onto USB drives for school use.
