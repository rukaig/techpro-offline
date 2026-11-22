# TechPro (100% Offline)

TechPro is a 100% offline, zero-network interactive learning application for DepEd Computer Systems Servicing NC II, COC 1: Modules 1 and 2 (Assemble Computer Hardware and BIOS/UEFI Configuration).

Every page, lesson, quiz, and all 26 catalogue activities run anytime with zero internet, including directly from a USB stick on school computers.

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

- **Two-Module Library:** Fourteen DepEd Cavite COC 1 lessons with figures, key notes, and a glossary. Module 1 covers assembly; Module 2 covers BIOS/UEFI configuration.
- **Module 1 Games & Simulators:** PC Lab, Disassembly Mode, Sort Station, Order Rush, Software Mission, Spot the Mistake, Which Computer?, PC Anatomy Explorer, Software Sorter, Tech Check-Up, Case Files, Flashcards + Quick Recap, Word Hunt, Tech Wordle, Word Bank Chain, and Reflection Journal.
- **Module 2 Games & Simulators:** Startup Relay, BIOS Setup Lab, Boot Order Builder, Hardware or Setting?, BIOS Flashcards, and Carlo's Boot Case.
- **Four Exams:** A 15-item pre-test and post-test for each module, with explanations, post-test timers, best-score records, and module badges.
- **Offline Assistant:** Local retrieval across both modules' passages, glossary terms, and authored FAQs — no API keys, models, or network calls.
- **Local Multi-Profile System:** Supports multiple students on shared school PCs with independent XP, stars, badges, and saves.
- **Backup & Restore:** Export clean JSON progress backups to USB and restore on any computer.
- **Teacher View (`#/teacher`):** Import multiple student backup files to view class records and export grade sheets as CSV (with anti-injection sanitization).

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
