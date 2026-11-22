import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const distAssets = path.join(distDir, "assets");

console.log("Building TechPro 100% Offline...");

// Step 1: Build knowledge index
console.log("-> Building knowledge index...");
execSync("node scripts/build-knowledge.mjs", { cwd: root, stdio: "inherit" });

// Step 1b: Verify shared game data
console.log("-> Checking game data...");
execSync("node scripts/build-game-data.mjs", { cwd: root, stdio: "inherit" });

// Step 2: Build PC Lab game bundle
console.log("-> Building games...");
execSync("node scripts/build-games.mjs", { cwd: root, stdio: "inherit" });

// Step 3: Clean and recreate dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(distAssets, { recursive: true });
fs.mkdirSync(path.join(distAssets, "fonts"), { recursive: true });
fs.mkdirSync(path.join(distAssets, "module"), { recursive: true });
fs.mkdirSync(path.join(distAssets, "games"), { recursive: true });

// Step 4: Bundle app.js via esbuild as classic IIFE
console.log("-> Bundling app.js (IIFE)...");
await build({
  entryPoints: [path.join(root, "src/app/main.js")],
  outfile: path.join(distDir, "app.js"),
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  minify: true,
  sourcemap: false,
  legalComments: "none",
  logLevel: "warning"
});

// Step 5: Bundle and copy CSS
console.log("-> Bundling CSS styles...");
const cssFiles = [
  "src/styles/tokens.css",
  "src/styles/base.css",
  "src/styles/components.css",
  "src/styles/shell.css",
  "src/styles/home.css",
  "src/styles/library.css",
  "src/styles/games.css",
  "src/styles/exam.css",
  "src/styles/pclab.css",
  "src/styles/profile.css",
  "src/styles/plan.css",
  "src/styles/account.css",
  "src/styles/assistant.css"
];

let bundledCss = "";
for (const rel of cssFiles) {
  const full = path.join(root, rel);
  if (fs.existsSync(full)) {
    bundledCss += `\n/* ${rel} */\n` + fs.readFileSync(full, "utf8");
  }
}

// Read fonts.css and adapt font urls to point to ./fonts/...
let fontsCss = fs.readFileSync(path.join(root, "assets/fonts/fonts.css"), "utf8");
fontsCss = fontsCss.replace(/url\(["']?(\.\/)?roboto/g, 'url("./fonts/roboto')
                   .replace(/url\(["']?(\.\/)?source-serif/g, 'url("./fonts/source-serif')
                   .replace(/url\(["']?(\.\/)?nunito/g, 'url("./fonts/nunito')
                   .replace(/url\(["']?(\.\/)?baloo2/g, 'url("./fonts/baloo2')
                   .replace(/url\(["']?(\.\/)?jetbrains-mono/g, 'url("./fonts/jetbrains-mono')
                   .replace(/url\(["']?(\.\/)?press-start/g, 'url("./fonts/press-start')
                   .replace(/url\(["']?(\.\/)?atkinson/g, 'url("./fonts/atkinson');

bundledCss = fontsCss + "\n" + bundledCss;
fs.writeFileSync(path.join(distAssets, "styles.css"), bundledCss, "utf8");

// Step 6: Copy assets
console.log("-> Copying fonts, module media, and game bundles...");
fs.cpSync(path.join(root, "assets/fonts"), path.join(distAssets, "fonts"), { recursive: true });
fs.cpSync(path.join(root, "assets/module"), path.join(distAssets, "module"), { recursive: true });
fs.cpSync(path.join(root, "assets/games"), path.join(distAssets, "games"), { recursive: true });

// Copy icons and svg
const iconFiles = [
  "techpro-mark.svg",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
  "icon-maskable-192.png",
  "icon-maskable-512.png"
];
for (const icon of iconFiles) {
  const src = path.join(root, "assets", icon);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distAssets, icon));
  }
}

// Step 7: Web manifest
const manifestContent = fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8");
fs.writeFileSync(path.join(distDir, "manifest.webmanifest"), manifestContent, "utf8");

// Step 8: Read theme-boot script
const themeBootJs = fs.readFileSync(path.join(root, "src/app/theme-boot.js"), "utf8");

// Step 9: Generate dist/index.html
console.log("-> Generating dist/index.html...");
const indexHtml = `<!doctype html>
<html lang="en" data-theme="editorial" data-mode="light" data-motion="full">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
  <meta name="description" content="TechPro Computer Systems Servicing NC II — an offline learning space for Modules 1 and 2. Read assembly and BIOS/UEFI lessons, build a PC, configure setup, and practise safely.">
  <meta name="theme-color" content="#2b1d16">
  <meta name="color-scheme" content="light dark">
  <title>TechPro · COC 1 Modules 1 &amp; 2</title>
  <link rel="manifest" href="./manifest.webmanifest">
  <link rel="icon" href="./assets/techpro-mark.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="./assets/icon-192.png">
  <link rel="stylesheet" href="./assets/styles.css">
  <script>${themeBootJs}</script>
</head>
<body>
  <div id="ambientLayer" class="ambient-layer" aria-hidden="true"></div>
  <a class="skip-link" href="#main">Skip to main content</a>
  <div id="offlineBanner" class="offline-banner" hidden>Offline mode: everything is on this device.</div>
  <div id="app">
    <div class="boot-screen" aria-label="Loading TechPro">
      <span class="boot-chip" aria-hidden="true"></span>
      <p>Warming up the workbench…</p>
      <noscript><p class="boot-noscript">TechPro needs JavaScript. Please enable it, or ask your teacher for help.</p></noscript>
    </div>
  </div>
  <script src="./app.js"></script>
  <script>
    if (location.protocol.startsWith("http") && "serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("./sw.js").catch(function () {});
      });
    }
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, "index.html"), indexHtml, "utf8");
fs.writeFileSync(path.join(distDir, "404.html"), indexHtml, "utf8");

// Step 10: Generate Service Worker
console.log("-> Generating service worker...");
const swFiles = [
  "./",
  "./index.html",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/styles.css",
  "./assets/techpro-mark.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/games/pc-lab.js"
];

// Add fonts
for (const f of fs.readdirSync(path.join(distAssets, "fonts"))) {
  swFiles.push(`./assets/fonts/${f}`);
}
// Add module media
for (const m of fs.readdirSync(path.join(distAssets, "module"))) {
  swFiles.push(`./assets/module/${m}`);
}

const swJs = `const CACHE_NAME = "techpro-v3-offline";
const PRECACHE_URLS = ${JSON.stringify(swFiles, null, 2)};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => caches.match("./index.html"));
    })
  );
});
`;
fs.writeFileSync(path.join(distDir, "sw.js"), swJs, "utf8");

// Report size
const appJsStat = fs.statSync(path.join(distDir, "app.js"));
const stylesStat = fs.statSync(path.join(distAssets, "styles.css"));
console.log(`\nBuild complete!`);
console.log(`- dist/app.js: ${(appJsStat.size / 1024).toFixed(1)} kB`);
console.log(`- dist/assets/styles.css: ${(stylesStat.size / 1024).toFixed(1)} kB`);
console.log(`- dist/ is ready for offline execution.\n`);
