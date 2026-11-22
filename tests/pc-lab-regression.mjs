/* ==========================================================================
   PC Lab 3D regression.

   Loads both real PC Lab drills, confirms the 3D bench is mounted, and plays
   every step with the in-game step control at 375x667 touch and 1280x800
   mouse. Also checks result state, back-to-interactives navigation, local-only
   requests, zero console/page errors, and zero horizontal overflow.

   Usage:
     node tests/pc-lab-regression.mjs [baseUrl]
   Default baseUrl: http://localhost:3000
   ========================================================================== */
import { chromium } from "playwright";

const args = process.argv.slice(2);
const baseUrl = (args.find((value) => !value.startsWith("--")) || process.env.PC_LAB_URL || "http://localhost:3000").replace(/\/+$/, "");

const DEVICES = [
  { label: "phone-375-touch", viewport: { width: 375, height: 667 }, touch: true },
  { label: "desktop-1280-mouse", viewport: { width: 1280, height: 800 }, touch: false }
];

const MODES = [
  { key: "build", route: "/play/pc-lab" },
  { key: "disassembly", route: "/play/pc-lab?mode=disassembly" }
];

let failures = 0;

function check(condition, message) {
  if (condition) return true;
  failures += 1;
  console.log(`FAIL ${message}`);
  return false;
}

function localOnly(url) {
  if (/^(data|blob):/i.test(url)) return true;
  if (baseUrl.startsWith("file:")) return url.startsWith("file:");
  try {
    return new URL(url).origin === new URL(baseUrl).origin;
  } catch {
    return false;
  }
}

async function checkOverflow(page, label) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  check(
    metrics.scrollWidth <= metrics.clientWidth,
    `${label}: horizontal overflow (scrollWidth ${metrics.scrollWidth} > clientWidth ${metrics.clientWidth})`
  );
}

async function runMode(browser, device, mode) {
  const label = `${device.label}/${mode.key}`;
  const context = await browser.newContext({
    viewport: device.viewport,
    hasTouch: device.touch,
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const remoteRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  page.on("request", (request) => {
    if (!localOnly(request.url())) remoteRequests.push(request.url());
  });

  try {
    await page.goto(`${baseUrl}#${mode.route}`, { waitUntil: "domcontentloaded" });

    const game = page.locator(".pclab-game[data-pclab]");
    await game.waitFor({ state: "visible", timeout: 20000 });
    check(await game.count() === 1, `${label}: expected one 3D PC Lab game`);
    await page.locator("[data-canvas] canvas, [data-canvas] .fb2d").first()
      .waitFor({ state: "attached", timeout: 20000 });
    check(await page.locator("[data-canvas] canvas.pc3d-canvas").count() >= 1,
      `${label}: 3D renderer canvas is missing`);
    check(await page.locator("[data-objective-title]").isVisible(), `${label}: step objective heading is missing`);
    await checkOverflow(page, `${label} (start)`);

    const stepControl = page.locator("[data-step-action]");
    await stepControl.waitFor({ state: "visible", timeout: 10000 });
    if (device.touch) {
      const height = await stepControl.evaluate((node) => Math.round(node.getBoundingClientRect().height));
      check(height >= 44, `${label}: step control is ${height}px tall on touch`);
    }

    let stepsPlayed = 0;
    let firstStepChecked = false;
    while (stepsPlayed < 80) {
      const result = page.locator("[data-result]");
      if (await result.isVisible().catch(() => false)) {
        const next = result.locator('[data-overlay-action="next"]');
        if (await next.count()) {
          await next.click();
          await page.waitForFunction(() => {
            const overlay = document.querySelector("[data-overlay]");
            const text = (document.querySelector("[data-hud-step]")?.textContent || "").trim();
            return Boolean(overlay?.hidden && /^1 \/ \d+$/.test(text));
          }, null, { timeout: 7000 }).catch(() => {});
          continue;
        }
        break;
      }

      const currentStep = (await page.locator("[data-hud-step]").innerText()).trim();
      if (!firstStepChecked) {
        check(/^1 \/ \d+$/.test(currentStep), `${label}: expected to start at step 1, got "${currentStep}"`);
        firstStepChecked = true;
      }
      await stepControl.scrollIntoViewIfNeeded();
      if (device.touch) await stepControl.tap();
      else await stepControl.click();

      await page.waitForFunction((before) => {
        const visibleResult = document.querySelector("[data-result]");
        if (visibleResult && !visibleResult.closest("[hidden]")) return true;
        const text = (document.querySelector("[data-hud-step]")?.textContent || "").trim();
        return text !== before;
      }, currentStep, { timeout: 12000 }).catch(() => {});

      const resultAppeared = await result.waitFor({ state: "visible", timeout: 2500 })
        .then(() => true)
        .catch(() => false);
      if (resultAppeared) continue;
      const afterStep = (await page.locator("[data-hud-step]").innerText()).trim();
      if (afterStep === currentStep) {
        check(false, `${label}: step ${currentStep} did not advance`);
        break;
      }
      stepsPlayed += 1;
    }

    check(stepsPlayed > 0 && stepsPlayed < 80, `${label}: played ${stepsPlayed} steps`);

    const result = page.locator("[data-result]");
    await result.waitFor({ state: "visible", timeout: 10000 });
    const resultText = await result.innerText();
    check(/xp earned/i.test(resultText), `${label}: result panel has no XP earned stat`);
    check(/stars/i.test(resultText), `${label}: result panel has no Stars stat`);
    check(/correct steps:\s*\d+ of \d+/i.test(resultText), `${label}: result panel has no correct-step count`);
    check(await result.locator("[data-retry]").count() === 1, `${label}: result panel has no Try again action`);
    const backLink = result.getByRole("link", { name: /interactives/i }).first();
    check(await backLink.count() === 1, `${label}: result panel has no Back to interactives action`);
    await backLink.scrollIntoViewIfNeeded();
    if (device.touch) await backLink.tap();
    else await backLink.click();
    await page.locator(".play-hub").waitFor({ state: "visible", timeout: 10000 });
    check((await page.locator(".play-hub").count()) === 1, `${label}: Back did not return to the game hub`);

    await checkOverflow(page, `${label} (result)`);

    check(consoleErrors.length === 0, `${label}: console errors -> ${consoleErrors.join(" | ")}`);
    check(pageErrors.length === 0, `${label}: page errors -> ${pageErrors.join(" | ")}`);
    check(remoteRequests.length === 0, `${label}: remote requests -> ${remoteRequests.join(" | ")}`);
  } catch (error) {
    failures += 1;
    console.log(`FAIL ${label}: unexpected error -> ${error?.message || error}`);
  } finally {
    await context.close();
  }
}

const browser = await chromium.launch({ headless: true });
try {
  for (const device of DEVICES) {
    for (const mode of MODES) {
      await runMode(browser, device, mode);
    }
  }
} finally {
  await browser.close();
}

if (failures) {
  console.log(`PC Lab regression: ${failures} failure(s).`);
  process.exit(1);
}
console.log("PC Lab regression: all checks passed.");
