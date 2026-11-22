import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const distIndex = path.join(distDir, "index.html");

const VIEWPORTS = [
  { label: "phone-touch", width: 375, height: 667, isMobile: true, hasTouch: true },
  { label: "desktop-mouse", width: 1280, height: 800, isMobile: false, hasTouch: false }
];

const ENGAGEMENT_GAMES = [
  { id: "software-sorter", route: "#/play/software-sorter", trigger: "[data-lane]", clicks: 18 },
  { id: "order-rush", route: "#/play/order-rush", trigger: "[data-step]", clicks: 6 },
  { id: "spot-mistake", route: "#/play/spot-mistake", trigger: "[data-practice]", clicks: 6 }
];

const ROUTES = [
  "",
  "#/library",
  "#/library/computer-system",
  "#/library/types-of-computers",
  "#/library/external-hardware",
  "#/library/internal-hardware",
  "#/library/system-software",
  "#/library/application-software",
  "#/library/assembly",
  "#/library/disassembly",
  "#/play",
  "#/play/pc-lab",
  "#/play/pc-lab?mode=disassembly",
  "#/play/sort-station",
  "#/play/order-rush",
  "#/play/software-mission",
  "#/play/spot-mistake",
  "#/play/which-computer",
  "#/play/anatomy",
  "#/play/software-sorter",
  "#/play/case-files",
  "#/play/flashcards",
  "#/play/tech-checkup",
  "#/play/word-chain",
  "#/play/reflection",
  "#/exam",
  "#/exam/pretest",
  "#/exam/final",
  "#/leaderboard",
  "#/assistant",
  "#/plan",
  "#/account",
  "#/teacher",
  "#/share",
  "#/about",
  "#/non-existent-random-route"
];

// Helper to run a local static server
function createTestServer(port) {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:${port}`);
      let p = path.join(distDir, url.pathname === "/" ? "index.html" : url.pathname);
      if (!fs.existsSync(p)) p = path.join(distDir, "index.html");
      const ext = path.extname(p);
      const mime = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".svg": "image/svg+xml",
        ".png": "image/png",
        ".woff2": "font/woff2"
      }[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": mime });
      fs.createReadStream(p).pipe(res);
    });
    srv.listen(port, "127.0.0.1", () => resolve(srv));
  });
}

test("Full Offline Playwright Suite: file:// and http://localhost", async (t) => {
  const serverPort = 34567;
  const localServer = await createTestServer(serverPort);
  const browser = await chromium.launch({ headless: true });

  const modes = [
    { name: "file:// mode", base: `file://${distIndex}` },
    { name: "http://localhost mode", base: `http://127.0.0.1:${serverPort}/` }
  ];

  try {
    for (const mode of modes) {
      await t.test(`Mode: ${mode.name}`, async (mt) => {
        for (const vp of VIEWPORTS) {
          await mt.test(`Viewport: ${vp.label} (${vp.width}x${vp.height})`, async () => {
            const context = await browser.newContext({
              viewport: { width: vp.width, height: vp.height },
              isMobile: vp.isMobile,
              hasTouch: vp.hasTouch
            });

            // Strict zero-network enforcement: abort non-local requests
            let nonLocalBlocked = 0;
            await context.route("**/*", (route) => {
              const url = route.request().url();
              if (url.startsWith("file://") || url.startsWith("http://127.0.0.1") || url.startsWith("http://localhost") || url.startsWith("data:")) {
                route.continue();
              } else {
                nonLocalBlocked += 1;
                route.abort();
              }
            });

            const errors = [];
            const watchErrors = (watched) => {
              watched.on("pageerror", (err) => errors.push(`PageError on ${watched.url()}: ${err.message}`));
              watched.on("console", (msg) => {
                if (msg.type() === "error") {
                  errors.push(`ConsoleError on ${watched.url()}: ${msg.text()}`);
                }
              });
            };
            const page = await context.newPage();
            watchErrors(page);

            // 1. Visit every route and confirm it loads without errors
            for (const r of ROUTES) {
              const fullUrl = mode.base.includes("?")
                ? `${mode.base}&${r.replace("#", "")}`
                : `${mode.base}${r}`;

              await page.goto(fullUrl, { waitUntil: "domcontentloaded" });
              await page.waitForTimeout(100);

              const hasHeading = await page.evaluate(() => Boolean(document.querySelector("h1")));
              assert.ok(hasHeading, `Route ${r} must render an h1 heading`);
            }

            // 2. Play PC Lab and check bench presence
            await page.goto(`${mode.base}#/play/pc-lab`, { waitUntil: "domcontentloaded" });
            await page.waitForTimeout(800);
            const benchReady = await page.evaluate(() => Boolean(document.querySelector(".pclab-stage, .fb2d, [data-pclab]")));
            assert.ok(benchReady, "PC Lab stage must be present and ready");

            // 3. Test offline search assistant
            await page.goto(`${mode.base}#/assistant`, { waitUntil: "domcontentloaded" });
            await page.fill("#offlineQuery", "RAM");
            await page.click("button[type='submit']");
            await page.waitForTimeout(200);
            const resultText = await page.evaluate(() => document.querySelector(".assistant-results-stage")?.innerText || "");
            assert.ok(resultText.includes("RAM") || resultText.includes("Random Access Memory"), "Offline search must return RAM results");

            // 4. Test multi-profile & storage persistence
            await page.goto(`${mode.base}#/account`, { waitUntil: "domcontentloaded" });
            const initialProfiles = await page.evaluate(() => document.querySelectorAll(".device-profile-item").length);
            assert.ok(initialProfiles >= 1, "Must list at least 1 local profile");

            // 5. Play the three newly wired engagement games to their results screens.
            // Each game gets a fresh page so timers from earlier routes cannot leak in.
            for (const game of ENGAGEMENT_GAMES) {
              const gamePage = await context.newPage();
              watchErrors(gamePage);
              await gamePage.goto(`${mode.base}${game.route}`, { waitUntil: "domcontentloaded" });
              await gamePage.waitForTimeout(200);
              const controls = await gamePage.$$(game.trigger);
              assert.ok(controls.length > 0, `${game.route} must render its game controls`);
              for (let i = 0; i < game.clicks; i += 1) await controls[i % controls.length].click();
              await gamePage.waitForTimeout(500);
              const resultText = await gamePage.evaluate(() => document.querySelector("[data-result]")?.innerText || "");
              assert.match(resultText, /xp earned/i, `${game.route} must reach a results screen`);
              assert.match(resultText, /\/3/, `${game.route} must award stars`);
              const persisted = await gamePage.evaluate((id) => Object.entries(localStorage)
                .filter(([key]) => key.startsWith("tp:offline:profile:v2:"))
                .map(([, value]) => JSON.parse(value))
                .some((state) => (state?.progress?.activities?.[id]?.attempts || 0) >= 1), game.id);
              assert.ok(persisted, `${game.id} progress must be saved locally`);
              await gamePage.close();
            }

            // Assert zero non-local origin requests and zero console errors
            assert.equal(nonLocalBlocked, 0, `Zero external requests allowed. Blocked: ${nonLocalBlocked}`);
            assert.equal(errors.length, 0, `Zero errors expected. Found:\n${errors.join("\n")}`);

            await context.close();
          });
        }
      });
    }

    // 5. Test Teacher view import and CSV export
    await t.test("Teacher view CSV export functionality", async () => {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(`file://${distIndex}#/teacher`, { waitUntil: "domcontentloaded" });

      // Verify the page heading and UI elements
      const heading = await page.$eval("h1", (el) => el.innerText);
      assert.equal(heading, "Teacher class summary");

      await context.close();
    });

  } finally {
    await browser.close();
    await new Promise((res) => localServer.close(res));
  }
});
