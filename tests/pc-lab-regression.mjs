/* ==========================================================================
   PC Lab workbench regression.

   Plays both drills end to end with the same input a learner uses: one tap
   per ordered step. Checks the 2D stage, the action targets (height on a
   phone), the result panel with XP/stars, and horizontal overflow.

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

/* Stable data-action ids from src/games/pc-lab-workbench.js, in order. */
const MODES = [
  {
    key: "build",
    route: "/play/pc-lab",
    actions: [
      "b-prepare", "b-standoffs", "b-motherboard", "b-cpu", "b-cooler",
      "b-ram", "b-gpu", "b-cables", "b-check", "b-post"
    ]
  },
  {
    key: "disassembly",
    route: "/play/pc-lab?mode=disassembly",
    actions: [
      "d-safe", "d-document", "d-peripherals", "d-unplug", "d-panel",
      "d-gpu", "d-ram", "d-cooler", "d-cpu", "d-psu"
    ]
  }
];

let failures = 0;

function check(condition, message) {
  if (condition) return true;
  failures += 1;
  console.log(`FAIL ${message}`);
  return false;
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
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(String(error)));

  try {
    await page.goto(`${baseUrl}#${mode.route}`, { waitUntil: "domcontentloaded" });

    const stage = page.locator(".pclab-stage");
    await stage.waitFor({ state: "visible", timeout: 15000 });
    check(await stage.count() >= 1, `${label}: .pclab-stage is missing`);
    check(await page.locator("[data-pclab]").count() >= 1, `${label}: [data-pclab] is missing`);
    check(await page.locator(".pclab-slot").count() === 10, `${label}: expected 10 case slots`);
    check(await page.locator("[data-step-item]").count() === 10, `${label}: expected 10 step-list items`);
    await checkOverflow(page, `${label} (start)`);

    const status = (await page.locator("[data-step-status]").innerText()).trim();
    check(status === "Step 1 of 10", `${label}: expected "Step 1 of 10", got "${status}"`);

    for (let i = 0; i < mode.actions.length; i += 1) {
      const actionId = mode.actions[i];
      const button = page.locator(`[data-action="${actionId}"]`);
      await button.waitFor({ state: "visible", timeout: 10000 });
      check(await button.count() === 1, `${label}: action ${actionId} is not unique`);

      if (device.touch) {
        const heights = await page.locator("[data-action]").evaluateAll((nodes) =>
          nodes.map((node) => Math.round(node.getBoundingClientRect().height))
        );
        const short = heights.filter((height) => height < 44);
        check(
          short.length === 0,
          `${label}: action buttons below 44px at step ${i + 1} (heights: ${heights.join(", ")})`
        );
      }

      await button.scrollIntoViewIfNeeded();
      if (device.touch) await button.tap();
      else await button.click();

      // The game briefly explains each correct action before advancing.
      // Waiting for the state change keeps the test reliable on slow devices.
      const nextStep = `Step ${i + 2} of 10`;
      await page.waitForFunction(
        (expected) => {
          if (document.querySelector("[data-result]")) return true;
          return (document.querySelector("[data-step-status]")?.textContent || "").trim() === expected;
        },
        nextStep,
        { timeout: 5000 }
      );
    }

    const result = page.locator("[data-result]");
    await result.waitFor({ state: "visible", timeout: 10000 });
    const resultText = await result.innerText();
    check(/xp earned/i.test(resultText), `${label}: result panel has no XP earned stat`);
    check(/stars/i.test(resultText), `${label}: result panel has no Stars stat`);
    check(/10 of /.test(resultText), `${label}: result panel has no correct-step count`);
    check(await result.locator("[data-retry]").count() === 1, `${label}: result panel has no Try again action`);
    check(await result.getByRole("link", { name: /all interactives/i }).count() >= 1, `${label}: result panel has no All interactives action`);
    await checkOverflow(page, `${label} (result)`);

    check(pageErrors.length === 0, `${label}: page errors -> ${pageErrors.join(" | ")}`);
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
