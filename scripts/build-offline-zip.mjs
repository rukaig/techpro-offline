import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const zipPath = path.join(root, "TechPro-offline.zip");

// Ensure dist is built
console.log("-> Building dist/...");
execSync("node scripts/build.mjs", { cwd: root, stdio: "inherit" });

// Write README.txt into dist
const readmeContent = `========================================================================
TechPro: Assemble Computer Hardware (100% Offline Educational App)
DepEd CSS NC II · COC 1 · Module 1
========================================================================

HOW TO RUN TECHPRO:

OPTION 1: Instant Run (Double-Click index.html)
- Recommended for USB flash drives and school computers without internet.
- Simply open this folder and double-click "index.html".
- It runs directly in your browser using file:// protocol.
- Zero server, zero internet, zero installation needed.
- All 14 interactive games, PC Lab, disassembly, lessons, and exams work!

OPTION 2: Local Server (npm start)
- If Node.js is installed on your machine:
    npm start
  Then open http://localhost:3000 in your browser.
- Classroom Hotspot Mode:
    npm start -- --lan
  Prints your local Wi-Fi IP address so other learners on the same hotspot
  can open and use TechPro simultaneously without internet.

OPTION 3: Install as a Desktop App (PWA)
- When running via Option 2 at http://localhost:3000, click the "Install" icon
  in the browser address bar (or go to "Offline sharing & setup" in the app).
- TechPro installs as a standalone desktop app that launches from your app menu.

========================================================================
STUDENT PROFILES & BACKUPS:
- All stars, XP, badges, study plans, and lab records are saved directly
  on this computer.
- Multiple learners can use the same computer with separate profiles.
- To take your progress home or hand it in to your teacher:
  1. Open the profile page (User icon in top bar).
  2. Click "Download backup" to save your progress file (.json).
  3. On any computer, click "Restore from file" to continue where you left off.
  4. Teachers can import multiple student backup files in "Teacher view" to
     view class summaries and export grades as a CSV spreadsheet.
========================================================================
`;

fs.writeFileSync(path.join(distDir, "README.txt"), readmeContent, "utf8");
fs.writeFileSync(path.join(root, "README.txt"), readmeContent, "utf8");

// Remove existing zip if present
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

// Create zip using system zip command
console.log("-> Creating TechPro-offline.zip...");
execSync(`zip -r -q "${zipPath}" dist/ README.txt`, { cwd: root, stdio: "inherit" });

const zipStat = fs.statSync(zipPath);
console.log(`\nPackaged TechPro-offline.zip successfully! (${(zipStat.size / (1024 * 1024)).toFixed(2)} MB)`);
