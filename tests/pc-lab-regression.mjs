/* ==========================================================================
   PC Lab input regression.

   The bench is 2D DOM (src/games/pc-lab/fallback2d.js), so this test plays the
   real hit areas instead of projecting 3D coordinates. Three levels are played
   end to end with the same input paths a learner uses:

     - single taps for one-action parts
     - tap-tap moves (tap the part, tap its target)
     - pointer drags (press, move, release over the target)
     - the Rotate control on the alignment steps
     - press & hold on the RAM seating step

   It fails loudly if a target is off-screen, under 44 CSS px, covered by other
   chrome, or if the action does not advance the step.

   Usage:
     node tests/pc-lab-regression.mjs [baseUrl] [--runs=1]
   ========================================================================== */
import { chromium } from "playwright";

const args = process.argv.slice(2);
const baseUrl = args.find((value) => !value.startsWith("--")) || process.env.PC_LAB_URL || "http://localhost:3000";
const runsArg = args.find((value) => value.startsWith("--runs="));
const runs = Math.max(1, Number(runsArg?.split("=")[1]) || Number(process.env.PC_LAB_RUNS) || 1);

const cases = [
  { label: "phone-375-touch", viewport: { width: 375, height: 667 }, touch: true },
  { label: "desktop-1280-mouse", viewport: { width: 1280, height: 800 }, touch: false }
];

/* ---------------------------------------------------------------- level plan */

const LEVELS = [
  {
    index: 0,
    id: "safety",
    name: "L0 safety",
    next: "cpu",
    actions: [
      { step: "clean-bench", tap: "clean-cloth", label: "cleaning cloth" },
      { step: "arrange-bench", tap: "tools", label: "toolbox" },
      { step: "power-down", tap: "power", label: "power button" },
      { step: "document", tap: "camera", label: "camera" },
      { step: "unplug", tap: "plug", label: "power plug" },
      { step: "peripherals", tap: "peripheral", label: "monitor cable" },
      { step: "jewelry", tap: "bracelet", label: "bracelet" },
      { step: "strap", tap: "strap", label: "wrist strap", last: true }
    ]
  },
  {
    index: 1,
    id: "cpu",
    name: "L2 CPU",
    next: "ram",
    actions: [
      { step: "remove-screws", move: "case-screw", target: "parts-tray", mode: "tap", label: "case screw 1", holds: 1 },
      { step: "remove-screws", move: "case-screw", target: "parts-tray", mode: "tap", label: "case screw 2", holds: 2 },
      { step: "remove-screws", move: "case-screw", target: "parts-tray", mode: "tap", label: "case screw 3", holds: 3 },
      { step: "remove-screws", move: "case-screw", target: "parts-tray", mode: "drag", label: "case screw 4" },
      { step: "lever-open", tap: "lever", label: "socket lever" },
      { step: "align", rotate: true, label: "Rotate control" },
      { step: "seat", move: "cpu", target: "socket", mode: "tap", label: "CPU into its socket" },
      { step: "lever-close", tap: "lever", label: "socket lever" },
      { step: "paste", tap: "cpu", label: "seated CPU" },
      { step: "cooler", tap: "cooler", label: "CPU cooler", last: true }
    ]
  },
  {
    index: 2,
    id: "ram",
    name: "L4 RAM",
    next: "power",
    actions: [
      { step: "clips-open", tap: "clips", label: "DIMM clips" },
      { step: "align", rotate: true, label: "Rotate control" },
      { step: "place", move: "ram", target: "ram-slot", mode: "drag", label: "RAM into its slot" },
      { step: "press", hold: true, label: "Press & hold" },
      { step: "clips-close", tap: "clips", label: "DIMM clips", last: true }
    ]
  }
];

/* ---------------------------------------------------------------- page utils */

async function readState(page) {
  return page.evaluate(() => {
    const game = window.__pcLab;
    if (!game) return null;
    return {
      level: game.currentLevel()?.id,
      step: game.currentStep()?.id,
      strikes: game.strikes,
      screws: game.removedCaseScrews,
      selected: game.view?.input?.selected || null,
      overlayNext: (() => {
        const overlay = game.root.querySelector("[data-overlay]");
        return Boolean(overlay && !overlay.hidden && overlay.querySelector('[data-overlay-action="next"]'));
      })(),
      toast: (game.root.querySelector("[data-toast]")?.textContent || "").trim().slice(0, 160)
    };
  });
}

async function locate(page, spec) {
  return page.evaluate((spec) => {
    const bench = document.querySelector("[data-bench2d]");
    if (!bench) return null;
    let el = null;
    if (spec.button) el = document.querySelector(spec.button);
    else if (spec.drop) el = bench.querySelector(`[data-drop="${spec.drop}"]`);
    else if (spec.part === "case-screw") el = bench.querySelector(".bench2d-screw:not(.is-done)");
    else if (spec.part) el = bench.querySelector(`[data-part="${spec.part}"]`);
    if (!el) return null;
    // Centre the target in the viewport first: a tap that lands under the
    // sticky header or the bottom navigation is not a real tap.
    if (!spec.noScroll) {
      const frame = document.querySelector(".pclab-frame");
      if (frame) { frame.scrollTop = 0; frame.scrollLeft = 0; }
      const box = el.getBoundingClientRect();
      const absoluteTop = box.top + window.scrollY;
      window.scrollTo({ top: Math.max(0, absoluteTop - (window.innerHeight - box.height) / 2), behavior: "instant" });
    }
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const top = document.elementFromPoint(x, y);
    return {
      x,
      y,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      hidden: Boolean(el.hidden),
      inViewport: x >= 0 && y >= 0 && x <= window.innerWidth && y <= window.innerHeight,
      uncovered: Boolean(top && el.contains(top)),
      coveredBy: top && !el.contains(top)
        ? `${top.tagName.toLowerCase()}${top.className ? "." + String(top.className).split(" ").filter(Boolean).join(".") : ""}`
        : null,
      visible: getComputedStyle(el).visibility !== "hidden" && getComputedStyle(el).display !== "none"
    };
  }, spec);
}

/* The game sits inside .pclab-frame { overflow: hidden }, so scrollIntoView
   can scroll the frame itself instead of the page. Reset the frame and move
   the window explicitly. */
async function frameBench(page) {
  await page.evaluate(() => {
    const stage = document.querySelector(".pclab-stage");
    const frame = document.querySelector(".pclab-frame");
    if (!stage) return;
    if (frame) { frame.scrollTop = 0; frame.scrollLeft = 0; }
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
    const rect = stage.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    window.scrollTo({ top: Math.max(0, absoluteTop - (window.innerHeight - rect.height) / 2), behavior: "instant" });
  });
  await page.waitForTimeout(140);
}

async function scrollToElement(page, spec) {
  await page.evaluate((spec) => {
    const frame = document.querySelector(".pclab-frame");
    if (frame) { frame.scrollTop = 0; frame.scrollLeft = 0; }
    const el = spec.button ? document.querySelector(spec.button) : null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    window.scrollTo({ top: Math.max(0, absoluteTop - (window.innerHeight - rect.height) / 2), behavior: "instant" });
  }, spec);
  await page.waitForTimeout(120);
}

async function tapPoint(page, run, point) {
  if (run.touch) await page.touchscreen.tap(point.x, point.y);
  else await page.mouse.click(point.x, point.y);
}

/* Drag is driven by pointer events; Playwright cannot synthesise a multi-step
   touch drag, and the bench reads pointer events for touch and mouse alike. */
async function dragPoint(page, from, to) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  for (let stepIndex = 1; stepIndex <= 10; stepIndex += 1) {
    await page.mouse.move(
      from.x + ((to.x - from.x) * stepIndex) / 10,
      from.y + ((to.y - from.y) * stepIndex) / 10
    );
    await page.waitForTimeout(16);
  }
  await page.mouse.up();
}

function fail(message) {
  console.log(`FAIL ${message}`);
  return 1;
}

/* ------------------------------------------------------------------- actions */

async function performAction(page, run, action) {
  if (action.rotate) {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const button = await locate(page, { button: "[data-rotate]" });
      if (!button || !button.visible) return fail(`${action.label}: Rotate control is not visible.`);
      if (button.width < 40 || button.height < 40) return fail(`${action.label}: Rotate control is ${button.width}x${button.height}, under 40px.`);
      await tapPoint(page, run, button);
      await page.waitForTimeout(220);
      const state = await readState(page);
      if (process.env.PC_LAB_DEBUG) console.log(`    rotate ${attempt}: at=${Math.round(button.x)},${Math.round(button.y)} covered=${button.coveredBy} -> step=${state.step} toast="${state.toast}"`);
      if (state.step !== action.step || state.overlayNext) return 0;
    }
    return fail(`${action.label}: rotating never aligned the part.`);
  }

  if (action.hold) {
    const button = await locate(page, { button: "[data-hold]" });
    if (!button || !button.visible) {
      const dbg = await page.evaluate(() => {
        const el = document.querySelector("[data-hold]");
        if (!el) return { missing: true, step: window.__pcLab.currentStep()?.id };
        const cs = getComputedStyle(el);
        return { step: window.__pcLab.currentStep()?.id, hidden: el.hidden, display: cs.display, visibility: cs.visibility, parent: el.parentElement?.className };
      });
      return fail(`${action.label}: Press & hold control is not visible (${JSON.stringify(dbg)}).`);
    }
    if (button.width < 40 || button.height < 40) return fail(`${action.label}: Press & hold control is ${button.width}x${button.height}, under 40px.`);
    await page.mouse.move(button.x, button.y);
    await page.mouse.down();
    await page.waitForTimeout(1750);
    await page.mouse.move(button.x - 6, button.y);
    await page.mouse.move(button.x + 6, button.y);
    await page.mouse.up();
    return 0;
  }

  if (!action.rotate && !action.hold) await frameBench(page);
  const source = await locate(page, { part: action.move || action.tap, noScroll: true });
  if (!source) return fail(`${action.step}: ${action.label} is not in the DOM.`);
  if (source.hidden || !source.visible) return fail(`${action.step}: ${action.label} is hidden at this level.`);
  if (source.width < 44 || source.height < 44) {
    return fail(`${action.step}: ${action.label} hit area is ${source.width}x${source.height}, under 44px.`);
  }
  if (!source.inViewport) {
    return fail(`${action.step}: ${action.label} at ${Math.round(source.x)},${Math.round(source.y)} is outside the viewport.`);
  }
  if (!source.uncovered) {
    return fail(`${action.step}: ${action.label} at ${Math.round(source.x)},${Math.round(source.y)} (${source.width}x${source.height}) is covered by ${source.coveredBy} before the tap.`);
  }

  if (!action.move) {
    await tapPoint(page, run, source);
    return 0;
  }

  const target = await locate(page, { drop: action.target, noScroll: true });
  if (!target) return fail(`${action.step}: drop target "${action.target}" is not in the DOM.`);
  if (!target.inViewport) return fail(`${action.step}: drop target "${action.target}" is outside the viewport.`);

  if (action.mode === "drag") {
    await dragPoint(page, source, target);
    if (process.env.PC_LAB_DEBUG) {
      await page.waitForTimeout(200);
      console.log(`    drag last=${await page.evaluate(() => window.__pcLab.view.input.last)}`);
    }
    return 0;
  }

  await tapPoint(page, run, source);
  await page.waitForTimeout(120);
  const armed = await readState(page);
  if (armed.selected !== action.move && !armed.overlayNext) {
    return fail(`${action.step}: tapping ${action.label} did not arm the move (selected=${armed.selected}).`);
  }
  await tapPoint(page, run, target);
  return 0;
}

async function playLevel(page, run, level) {
  let failures = 0;
  await page.evaluate((index) => window.__pcLab?.startLevel(index, { instant: true, silent: true }), level.index);
  await page.waitForTimeout(250);

  let state = await readState(page);
  if (process.env.PC_LAB_DEBUG) console.log(`  · start ${level.name}: level=${state.level} index=${await page.evaluate(() => window.__pcLab.levelIndex)} step=${state.step}`);
  if (state.level !== level.id) {
    return fail(`reset ${level.name}: expected ${level.id}, got ${state.level}/${state.step}.`);
  }

  for (const action of level.actions) {
    state = await readState(page);
    if (state.level !== level.id) break;
    if (state.step !== action.step && !state.overlayNext) {
      return failures + fail(`order ${level.name}: expected ${action.step}, got ${state.step}.`);
    }
    if (process.env.PC_LAB_DEBUG) console.log(`  · ${level.name} action ${action.label}: step=${state.step} selected=${state.selected}`);
    failures += await performAction(page, run, action);
    if (failures) return failures;
    await page.waitForTimeout(action.hold ? 300 : 220);

    const after = await readState(page);
    if (action.holds) {
      if (after.screws !== action.holds) {
        return failures + fail(`${action.step}: ${action.label} did not reach the tray (${after.screws} of ${action.holds}). toast="${after.toast}"`);
      }
      continue;
    }
    const advanced = after.step !== action.step || after.overlayNext || after.level !== level.id;
    if (!advanced) {
      return failures + fail(`${action.step}: ${action.label} did not advance. toast="${after.toast}"`);
    }
  }

  state = await readState(page);
  if (state.overlayNext) {
    await page.waitForTimeout(420);
    await page.evaluate(() => document.querySelector('[data-overlay-action="next"]')?.click());
    await page.waitForTimeout(350);
    const advanced = await readState(page);
    if (process.env.PC_LAB_DEBUG) console.log(`  · ${level.name} overlay -> level=${advanced.level} index=${await page.evaluate(() => window.__pcLab.levelIndex)}`);
    if (advanced.level !== level.next) {
      return failures + fail(`${level.name}: completion overlay did not advance to ${level.next} (still ${advanced.level}).`);
    }
    return failures;
  }
  if (state.level === level.id) {
    return failures + fail(`${level.name}: still on ${state.step} after the last action.`);
  }
  return failures;
}

/* ----------------------------------------------------------------------- run */

let totalFailures = 0;
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

  console.log(`\nRUN ${run.label} ${run.viewport.width}x${run.viewport.height} (${runs} pass${runs > 1 ? "es" : ""})`);
  await page.goto(`${baseUrl}/play/pc-lab?debug=1`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForFunction(() => Boolean(window.__pcLab?.view?.bench), null, { timeout: 25000 });
  await page.evaluate(() => document.querySelector(".pclab-stage")?.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(400);

  for (let pass = 0; pass < runs; pass += 1) {
    for (const level of LEVELS) {
      totalFailures += await playLevel(page, run, level);
    }
  }
  if (!totalFailures && runs) {
    console.log(`ok   ${run.label}: ${LEVELS.map((level) => level.name).join(", ")} completed with tap, tap-tap, drag, rotate and hold.`);
  }

  if (errors.length) {
    console.log(`browser errors: ${[...new Set(errors)].join(" | ")}`);
    totalFailures += 1;
  }
  await browser.close();
}

console.log(totalFailures
  ? `\nPC Lab regression: ${totalFailures} failing check(s).`
  : `\nPC Lab regression: passed (${runs} pass${runs > 1 ? "es" : ""} per device, 3 levels).`);
if (totalFailures) process.exitCode = 1;
