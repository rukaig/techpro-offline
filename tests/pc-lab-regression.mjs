/* ==========================================================================
   PC Lab input regression (Step 1 reproduction, Step 7 fix target).

   Plays the whole safety level with plain taps/clicks, one required target at
   a time, at 375x667 touch and 1280x800 mouse. A tap must advance the step.
   The test fails loudly on the first target that refuses the action and prints
   the game's own toast, the element under the pointer, and the current step.

   Run: node tests/pc-lab-regression.mjs [baseUrl]
   ========================================================================== */
import { chromium } from "playwright";

const baseUrl = process.argv[2] || process.env.PC_LAB_URL || "http://localhost:3000";
const cases = [
  { label: "phone-375-touch", viewport: { width: 375, height: 667 }, touch: true },
  { label: "desktop-1280-mouse", viewport: { width: 1280, height: 800 }, touch: false }
];

// Safety level order from src/games/pc-lab/index.js.
const SAFETY_TARGETS = [
  { step: "clean-bench", object: "cleaningCloth", label: "cleaning cloth" },
  { step: "arrange-bench", object: "toolKit", label: "toolbox" },
  { step: "power-down", object: "case", sub: "powerButton", label: "power button" },
  { step: "document", object: "cameraProp", label: "camera" },
  { step: "unplug", object: "plug", label: "power plug" },
  { step: "peripherals", object: "peripheralCable", label: "monitor cable" },
  { step: "jewelry", object: "character", sub: "bracelet", label: "bracelet" },
  { step: "strap", object: "strap", label: "wrist strap" }
];

async function project(page, object, sub) {
  return page.evaluate(({ object, sub }) => {
    const scene = window.__pcLab?.scene;
    if (!scene) return null;
    const target = sub ? scene[object]?.userData?.[sub] : scene[object];
    if (!target) return null;
    const point = new target.position.constructor();
    target.getWorldPosition(point);
    point.project(scene.camera);
    const rect = scene.renderer.domElement.getBoundingClientRect();
    const x = rect.left + (point.x * 0.5 + 0.5) * rect.width;
    const y = rect.top + (-point.y * 0.5 + 0.5) * rect.height;
    const top = document.elementFromPoint(x, y);
    return {
      x, y,
      inViewport: x >= 0 && y >= 0 && x <= window.innerWidth && y <= window.innerHeight,
      onCanvas: top === scene.renderer.domElement,
      top: top ? `${top.tagName.toLowerCase()}${top.className ? `.${String(top.className).split(" ")[0]}` : ""}` : "none"
    };
  }, { object, sub });
}

async function readState(page) {
  return page.evaluate(() => {
    const game = window.__pcLab;
    if (!game) return null;
    return {
      level: game.currentLevel()?.id,
      step: game.currentStep()?.id,
      strikes: game.strikes,
      toast: [...game.root.querySelectorAll("[data-toast]")].map((node) => node.textContent.trim()).join(" | ").slice(0, 160)
    };
  });
}

let failures = 0;
for (const run of cases) {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
  });
  const context = await browser.newContext({
    viewport: run.viewport,
    hasTouch: run.touch,
    isMobile: run.touch,
    deviceScaleFactor: run.touch ? 3 : 1,
    serviceWorkers: "block"
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });

  console.log(`\nRUN ${run.label} ${run.viewport.width}x${run.viewport.height}`);
  await page.goto(`${baseUrl}/play/pc-lab?debug=1`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForFunction(() => Boolean(window.__pcLab?.scene?.renderer), null, { timeout: 25000 });
  await page.evaluate(() => document.querySelector("canvas")?.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(1200);

  let state = await readState(page);
  console.log(`initial level=${state.level} step=${state.step}`);
  if (state.step !== "clean-bench") {
    console.log(`SKIP: saved progress started at ${state.step}, resetting to safety level.`);
    await page.evaluate(() => window.__pcLab.startLevel(0, { instant: true, silent: true }));
    await page.waitForTimeout(900);
    state = await readState(page);
  }

  for (const target of SAFETY_TARGETS) {
    state = await readState(page);
    if (state.level !== "safety") break;
    const point = await project(page, target.object, target.sub);
    if (!point) {
      console.log(`FAIL step ${target.step}: could not locate ${target.label} in the scene.`);
      failures += 1;
      break;
    }
    if (!point.inViewport) {
      console.log(`FAIL step ${target.step}: ${target.label} projects to ${Math.round(point.x)},${Math.round(point.y)}, outside the ${run.viewport.width}x${run.viewport.height} viewport.`);
      failures += 1;
      break;
    }
    if (!point.onCanvas) {
      console.log(`FAIL step ${target.step}: ${target.label} is covered by ${point.top} before the tap.`);
      failures += 1;
      break;
    }
    if (run.touch) await page.touchscreen.tap(point.x, point.y);
    else await page.mouse.click(point.x, point.y);
    await page.waitForTimeout(1000);
    const after = await readState(page);
    if (after.level === "safety" && after.step === state.step) {
      console.log(`FAIL step ${target.step}: tapped ${target.label} at ${Math.round(point.x)},${Math.round(point.y)} but the step stayed on ${after.step}. toast="${after.toast}"`);
      failures += 1;
      break;
    }
    console.log(`ok   ${target.step}: tapped ${target.label} -> ${after.level}/${after.step}`);
  }

  state = await readState(page);
  if (state.level === "safety" && state.step === "strap") {
    console.log("note: safety level did not complete.");
  }
  if (errors.length) {
    console.log(`browser errors: ${[...new Set(errors)].join(" | ")}`);
    failures += 1;
  }
  await browser.close();
}

console.log(failures ? `\nPC Lab regression: ${failures} failing check(s).` : "\nPC Lab regression: passed.");
if (failures) process.exitCode = 1;
