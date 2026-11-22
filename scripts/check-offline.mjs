#!/usr/bin/env node
/* ==========================================================================
   Offline Build Verification Gate
   Verifies:
   1. Zero non-local origin URLs used as a resource in src/ or dist/
   2. Zero mentions of firebase, firestore, gemini, GEMINI_API_KEY,
      googleapis, gstatic, cdn, analytics in src/ or dist/
   3. Zero type="module" or ES import/export statements in dist/
   4. Zero fetch() calls to relative data files (.json)
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const srcDir = path.join(root, "src");

if (!fs.existsSync(distDir)) {
  console.error("Error: dist/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

const failures = [];

function walk(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

const FORBIDDEN_WORDS = [
  "firebase",
  "firestore",
  "gemini",
  "GEMINI_API_KEY",
  "googleapis",
  "gstatic",
  "cdn",
  "analytics"
];

const checkDirs = [srcDir, distDir];

for (const dir of checkDirs) {
  const files = walk(dir);
  for (const file of files) {
    if (/\.(woff2|woff|png|jpg|jpeg|webp|ico)$/i.test(file)) continue;

    const rel = path.relative(root, file);
    const content = fs.readFileSync(file, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      const lower = line.toLowerCase();

      // Check forbidden words (case-insensitive unless GEMINI_API_KEY)
      for (const word of FORBIDDEN_WORDS) {
        const regex = new RegExp(`\\b${word}\\b`, "i");
        if (regex.test(line)) {
          failures.push(`[FORBIDDEN_KEYWORD] ${rel}:${lineNum} mentions "${word}": ${line.trim().slice(0, 100)}`);
        }
      }

      // Check resource URLs (script, link, img, @import, fetch, WebSocket)
      if (/(?:src|href)=["']https?:\/\//i.test(line) ||
          /@import\s+(?:url\()?["']?https?:\/\//i.test(line) ||
          /\bfetch\s*\(\s*["']https?:\/\//i.test(line) ||
          /\bnew\s+WebSocket\s*\(\s*["']wss?:\/\//i.test(line)) {
        // Check if allowed (e.g. SVG namespace http://www.w3.org/2000/svg)
        if (!line.includes("http://www.w3.org/2000/svg")) {
          failures.push(`[REMOTE_RESOURCE_URL] ${rel}:${lineNum} uses remote resource URL: ${line.trim().slice(0, 100)}`);
        }
      }

      // Check fetch of local JSON files (should be bundled/inlined)
      if (/\bfetch\s*\(\s*["'][^"']+\.json["']\s*\)/i.test(line)) {
        failures.push(`[FETCH_DATA_FILE] ${rel}:${lineNum} uses fetch() for data file: ${line.trim().slice(0, 100)}`);
      }
    });

    // Check dist files for ES modules (type="module", import ... from, export default)
    if (file.startsWith(distDir) && (file.endsWith(".html") || file.endsWith(".js"))) {
      if (/type=["']module["']/i.test(content)) {
        failures.push(`[ES_MODULE_IN_DIST] ${rel} contains type="module"`);
      }
      if (file.endsWith(".js") && !file.endsWith("sw.js")) {
        // Disallow top-level ES module import / export syntax in shipped dist/ JS
        if (/^\s*import\s+[^;]+from\s+["'][^"']+["']/m.test(content)) {
          failures.push(`[ES_IMPORT_IN_DIST] ${rel} contains ES import statements`);
        }
        if (/^\s*export\s+(?:default|const|let|function|class)/m.test(content)) {
          failures.push(`[ES_EXPORT_IN_DIST] ${rel} contains ES export statements`);
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`\n❌ check:offline FAILED with ${failures.length} violation(s):\n`);
  failures.forEach((f) => console.error(`  - ${f}`));
  console.error("");
  process.exit(1);
} else {
  console.log("\n✅ check:offline PASSED: 0 remote URLs, 0 forbidden keywords, 0 ES modules in dist, 0 runtime fetches.\n");
  process.exit(0);
}
