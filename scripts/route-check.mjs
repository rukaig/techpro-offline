/* ==========================================================================
   Route check: loads every page at phone and desktop widths, records console
   errors, decides whether a page is a real interactive or a placeholder, and
   saves screenshots plus audit/routes.json. Used by the Step 1 audit; it is
   not a replacement for `npm run audit`.
   ========================================================================== */
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outputDir = path.resolve(root, process.env.AUDIT_DIR || "audit/before");
const base = process.env.AUDIT_BASE || "";

const VIEWPORTS = [
  { label: "phone", width: 375, height: 667, touch: true },
  { label: "desktop", width: 1280, height: 800, touch: false }
];

const ROUTES = [
  "/", "/library", "/play", "/plan", "/account", "/assistant", "/exam", "/exam/pretest", "/exam/final",
  "/exam/bios-pretest", "/exam/bios-final",
  "/leaderboard", "/profile", "/teacher", "/about", "/install",
  "/library/computer-system", "/library/types-of-computers", "/library/external-hardware",
  "/library/internal-hardware", "/library/system-software", "/library/application-software",
  "/library/assembly", "/library/disassembly",
  "/library/bios-startup", "/library/bios-setup", "/library/bios-boot",
  "/library/bios-safety", "/library/bios-review",
  "/play/pc-lab", "/play/pc-lab?mode=disassembly",
  "/play/sort-station", "/play/order-rush", "/play/software-mission", "/play/spot-mistake",
  "/play/which-computer", "/play/anatomy", "/play/software-sorter", "/play/case-files",
  "/play/flashcards", "/play/tech-checkup", "/play/word-chain", "/play/reflection",
  "/play/startup-sequence", "/play/bios-setup-lab", "/play/boot-order-builder",
  "/play/config-or-hardware", "/play/bios-flashcards", "/play/bios-case-files"
];

async function unusedPort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

async function waitForServer(url, child) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Server exited with code ${child.exitCode}.`);
    try {
      const response = await fetch(`${url}/api/health`);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  throw new Error("Server did not start within 20 seconds.");
}

function slug(route) {
  return route.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/-+$/, "") || "home";
}

async function inspect(page) {
  return page.evaluate(() => {
    const text = (document.getElementById("main")?.innerText || "").trim();
    const hasCanvas = Boolean(document.querySelector("[data-pclab] canvas, .pc3d-canvas, .fb2d"));
    const placeholder = Boolean(document.querySelector(".activity-page"));
    const quiz = Boolean(document.querySelector(".exam-page, [data-quiz-stage], .quiz-shell"));
    const errorState = /Something went wrong opening this page|Page could not load/.test(text);
    const playButtons = document.querySelectorAll(".pclab-game button, [data-pclab] button").length;
    return {
      title: document.title,
      heading: document.querySelector("h1")?.innerText?.trim() || "",
      hasCanvas, placeholder, quiz, errorState, playButtons,
      mainLength: text.length,
      sample: text.slice(0, 180).replace(/\s+/g, " ")
    };
  });
}

async function run() {
  await mkdir(outputDir, { recursive: true });
  const port = base ? new URL(base).port : await unusedPort();
  const baseUrl = base || `http://127.0.0.1:${port}`;
  let serverProcess = null;
  if (!base) {
    serverProcess = spawn(process.execPath, ["server.js"], {
      cwd: root,
      env: { ...process.env, PORT: String(port) },
      stdio: ["ignore", "pipe", "pipe"]
    });
    serverProcess.stdout.resume();
    serverProcess.stderr.resume();
    await waitForServer(baseUrl, serverProcess);
  }

  const candidates = [process.env.CHROMIUM_PATH, "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome"].filter(Boolean);
  const executablePath = candidates.find((candidate) => existsSync(candidate));
  const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const rows = [];

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      hasTouch: viewport.touch,
      isMobile: viewport.touch,
      deviceScaleFactor: 1,
      serviceWorkers: "block"
    });
    const page = await context.newPage();
    const shotDir = path.join(outputDir, `routes-${viewport.width}`);
    await mkdir(shotDir, { recursive: true });

    for (const route of ROUTES) {
      const consoleErrors = [];
      const pageErrors = [];
      const failedRequests = [];
      const onConsole = (message) => {
        if (message.type() === "error") consoleErrors.push(message.text().slice(0, 300));
      };
      const onPageError = (error) => pageErrors.push(error.message.slice(0, 300));
      const onResponse = (response) => {
        if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url().replace(baseUrl, "")}`);
      };
      page.on("console", onConsole);
      page.on("pageerror", onPageError);
      page.on("response", onResponse);
      const started = Date.now();
      let result;
      try {
        const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.locator("#main > *").first().waitFor({ state: "attached", timeout: 15000 });
        if (route.includes("pc-lab")) {
          await page.waitForTimeout(2600);
          await page.waitForFunction(() => Boolean(
            document.querySelector("[data-pclab] canvas") || document.querySelector("[data-pclab] .fb2d")
          ), null, { timeout: 15000 }).catch(() => {});
        } else {
          await page.waitForTimeout(500);
        }
        result = await inspect(page);
        result.httpStatus = response?.status() ?? 0;
        await page.screenshot({ path: path.join(shotDir, `${slug(route)}.png`), fullPage: false });
      } catch (error) {
        result = { error: error.message.slice(0, 300) };
      }
      page.off("console", onConsole);
      page.off("pageerror", onPageError);
      page.off("response", onResponse);
      rows.push({
        route, viewport: viewport.label, width: viewport.width, ...result,
        ms: Date.now() - started,
        consoleErrors: [...new Set(consoleErrors)],
        pageErrors: [...new Set(pageErrors)],
        failedRequests: [...new Set(failedRequests)]
      });
    }
    await context.close();
  }

  await writeFile(path.join(outputDir, "routes.json"), `${JSON.stringify({ baseUrl, rows }, null, 2)}\n`);
  for (const row of rows) {
    const issues = [...row.consoleErrors, ...row.pageErrors, ...row.failedRequests];
    const kind = row.hasCanvas ? "interactive" : row.quiz ? "quiz" : row.placeholder ? "placeholder" : "static";
    console.log(`${row.width}px ${row.route.padEnd(38)} ${String(kind).padEnd(11)} ${row.errorState ? "ERROR " : ""}${issues.length ? `issues=${issues.length} ` : ""}${row.error || ""}`);
  }
  const failed = rows.filter((row) => row.error || row.errorState || row.consoleErrors.length || row.pageErrors.length);
  console.log(`\n${rows.length} states checked, ${failed.length} with errors. Artifacts: ${outputDir}`);

  await browser.close();
  if (serverProcess && serverProcess.exitCode === null) {
    serverProcess.kill("SIGTERM");
    await new Promise((resolve) => serverProcess.once("exit", resolve));
  }
  if (failed.length) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
