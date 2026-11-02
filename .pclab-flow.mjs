import { chromium } from "playwright";

const BASE = process.env.URL || "http://localhost:3000/play/pc-lab?debug=1";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const logs = [];
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(`[console] ${m.text()}`); });
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}\n${e.stack || ""}`));

const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
}

async function wait(ms) { await page.waitForTimeout(ms); }

async function project(key) {
  return page.evaluate((key) => {
    const game = window.__pcLab;
    const scene = game?.scene;
    if (!scene) return null;
    const map = {
      power: scene.case.userData.powerButton,
      plug: scene.plug,
      peripheral: scene.peripheralCable,
      bracelet: scene.character.userData.bracelet,
      tools: scene.toolKit,
      bins: scene.bins,
      strap: scene.strap,
      camera: scene.cameraProp,
      lever: scene.motherboard.userData.lever,
      clips: scene.motherboard.userData.ramSlots,
      cpu: scene.cpu,
      ram: scene.ram,
      cooler: scene.cooler,
      psu: scene.psu,
      monitor: scene.peripheralCable,
      "fan-cable": scene.fanCable.userData.connector,
      socket: scene.motherboard.userData.socket,
      "ram-slot": scene.motherboard.userData.ramSlots
    };
    const obj = map[key];
    if (!obj) return null;
    const p = obj.getWorldPosition(obj.position.clone()).project(scene.camera);
    const rect = scene.renderer.domElement.getBoundingClientRect();
    return {
      x: rect.left + (p.x * 0.5 + 0.5) * rect.width,
      y: rect.top + (-p.y * 0.5 + 0.5) * rect.height,
      visible: obj.visible && p.z < 1
    };
  }, key);
}

async function clickKey(key) {
  const p = await project(key);
  if (!p) throw new Error(`No projected point for ${key}`);
  await page.mouse.click(p.x, p.y);
  return p;
}

async function dragKey(fromKey, toKey, { steps = 28, delay = 16 } = {}) {
  const from = await project(fromKey);
  const to = await project(toKey);
  if (!from || !to) throw new Error(`Missing projection ${fromKey} -> ${toKey}`);
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await wait(80);
  for (let i = 1; i <= steps; i += 1) {
    const t = i / steps;
    await page.mouse.move(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
    await wait(delay);
  }
  await wait(180);
  await page.mouse.up();
  return { from, to };
}

async function state() {
  return page.evaluate(() => {
    const g = window.__pcLab;
    return {
      level: g?.currentLevel()?.id,
      step: g?.stepIndex,
      stepId: g?.currentStep()?.id,
      score: g?.score,
      strikes: g?.strikes,
      overlay: !!g?.overlayOpen,
      overlayText: g?.overlay?.innerText?.slice(0, 220) || "",
      companion: g?.root?.querySelector("[data-companion-name]")?.textContent || "",
      objective: g?.root?.querySelector("[data-objective-title]")?.textContent || "",
      toast: g?.toastEl?.hidden ? "" : g?.toastEl?.textContent
    };
  });
}

await page.goto(BASE, { waitUntil: "networkidle", timeout: 45000 });
await wait(2200);
check("game booted", await page.evaluate(() => !!window.__pcLab && !!window.__pcLab.scene));
check("companion name", (await state()).companion === "Chip", (await state()).companion);

/* ---------------- Safety level ---------------- */
await wait(500);
for (const [stepId, key] of [
  ["power-down", "power"],
  ["unplug", "plug"],
  ["peripherals", "peripheral"],
  ["jewelry", "bracelet"],
  ["tools", "tools"],
  ["bins", "bins"],
  ["strap", "strap"],
  ["document", "camera"]
]) {
  const before = await state();
  if (before.stepId !== stepId) check(`safety order at ${stepId}`, false, `saw ${before.stepId}`);
  await clickKey(key);
  await wait(450);
  const after = await state();
  check(`safety ${stepId}`, after.stepId !== stepId || after.overlay, `now ${after.stepId ?? "done"} overlay=${after.overlay}`);
}
await wait(500);
let s = await state();
check("safety level complete", s.overlay && /Level complete/.test(s.overlayText), s.overlayText.replace(/\n/g, " | "));
await page.screenshot({ path: "/tmp/opencode/pclab-safety-complete.png" });

// Next -> CPU
await page.click("[data-overlay-action='next']");
await wait(1100);

/* ---------------- CPU level ---------------- */
s = await state();
check("cpu level started", s.level === "cpu" && s.stepId === "lever-open", `${s.level}/${s.stepId}`);
await clickKey("lever");
await wait(500);
s = await state();
check("cpu lever open", s.stepId === "align", s.stepId);
await page.click("[data-rotate]");
await wait(500);
s = await state();
check("cpu rotated aligned", s.stepId === "seat", s.stepId);
const cpuOrient = await page.evaluate(() => window.__pcLab.scene.cpuOrientationValid());
check("cpu orientation valid", cpuOrient === true, String(cpuOrient));
await dragKey("cpu", "socket");
await wait(700);
s = await state();
check("cpu seated", s.stepId === "lever-close", s.stepId);
await clickKey("lever");
await wait(500);
s = await state();
check("cpu lever closed", s.stepId === "paste", s.stepId);
await clickKey("cpu");
await wait(700);
s = await state();
check("cpu paste applied", s.stepId === "cooler", s.stepId);
await clickKey("cooler");
await wait(700);
s = await state();
check("cpu level complete", s.overlay && /Level complete/.test(s.overlayText), s.overlayText.replace(/\n/g, " | "));
await page.screenshot({ path: "/tmp/opencode/pclab-cpu-complete.png" });

// Next -> RAM
await page.click("[data-overlay-action='next']");
await wait(1100);

/* ---------------- RAM level ---------------- */
s = await state();
check("ram level started", s.level === "ram" && s.stepId === "clips-open", `${s.level}/${s.stepId}`);
await clickKey("clips");
await wait(500);
s = await state();
check("ram clips open", s.stepId === "align", s.stepId);
await page.click("[data-rotate]");
await wait(500);
s = await state();
check("ram rotated aligned", s.stepId === "place", s.stepId);
await dragKey("ram", "ram-slot");
await wait(700);
s = await state();
check("ram placed", s.stepId === "press", s.stepId);

// Press and hold on the button, release around 0.72 pressure.
const hold = page.locator("[data-hold]");
await hold.scrollIntoViewIfNeeded();
const box = await hold.boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.mouse.down();
await wait(1750);
const seatNow = await page.evaluate(() => {
  const seat = window.__pcLab?.scene?.seat;
  return seat ? { pressure: seat.pressure, balance: seat.balance, tilt: seat.tiltTime } : null;
});
await page.mouse.up();
await wait(900);
s = await state();
check("ram seated", s.stepId === "clips-close", `seat=${JSON.stringify(seatNow)} step=${s.stepId} toast=${s.toast}`);
await clickKey("clips");
await wait(700);
s = await state();
check("ram level complete", s.overlay && /Level complete/.test(s.overlayText), s.overlayText.replace(/\n/g, " | "));
await page.screenshot({ path: "/tmp/opencode/pclab-ram-complete.png" });

// Next -> Fault
await page.click("[data-overlay-action='next']");
await wait(1300);

/* ---------------- Fault level ---------------- */
s = await state();
check("fault level started", s.level === "power" && s.stepId === "power-on", `${s.level}/${s.stepId}`);
await clickKey("power");
await wait(1600);
s = await state();
check("fault symptom", s.stepId === "fan", s.stepId);
await clickKey("fan-cable");
await wait(500);
s = await state();
check("fault fan inspected", s.stepId === "psu", s.stepId);
await clickKey("psu");
await wait(500);
s = await state();
check("fault psu checked", s.stepId === "display", s.stepId);
await clickKey("monitor");
await wait(500);
s = await state();
check("fault display checked", s.stepId === "ram", s.stepId);
await clickKey("ram");
await wait(500);
s = await state();
check("fault ram reseated", s.stepId === "fix", s.stepId);
await clickKey("fan-cable");
await wait(500);
s = await state();
check("fault fan fixed", s.stepId === "boot", s.stepId);
await clickKey("power");
await wait(3000);
s = await state();
check("fault booted + campaign", s.overlay && /Campaign complete/.test(s.overlayText), s.overlayText.replace(/\n/g, " | "));
await page.screenshot({ path: "/tmp/opencode/pclab-fault-complete.png" });

/* ---------------- Settings / theme / quality ---------------- */
await page.click("[data-overlay-action='select']");
await wait(400);
await page.click("[data-overlay-action='close']");
await wait(300);
await page.click("[data-settings-open]");
await wait(300);
check("settings open", await page.locator("[data-settings]").isVisible());
await page.click("[data-theme-next]");
await wait(700);
const themeId = await page.evaluate(() => window.__pcLab?.theme?.id);
check("theme changed", Boolean(themeId), themeId);
await page.selectOption("[data-setting='quality']", "low");
await wait(900);
const quality = await page.evaluate(() => ({ q: window.__pcLab?.scene?.quality?.level, label: window.__pcLab?.qualityEl?.textContent }));
check("quality low applied", quality.q === "low" || /low/i.test(quality.label || ""), JSON.stringify(quality));
await page.screenshot({ path: "/tmp/opencode/pclab-settings.png" });

console.log("\n--- errors ---");
console.log(errors.length ? errors.join("\n") : "(none)");
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) console.log("FAILED:", failed.map((f) => f.name).join(", "));
await browser.close();
process.exit(failed.length || errors.length ? 1 : 0);
