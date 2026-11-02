import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:3000/play/pc-lab";
const width = Number(process.env.W || 1280);
const height = Number(process.env.H || 900);
const shot = process.env.SHOT || "/tmp/opencode/pclab-desktop.png";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 1,
  hasTouch: width < 500,
  isMobile: width < 500
});
const page = await context.newPage();
const logs = [];
page.on("console", (m) => logs.push(`[console.${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}\n${e.stack || ""}`));
page.on("requestfailed", (r) => logs.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`));

await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);

const info = await page.evaluate(() => {
  const stage = document.querySelector("[data-pclab-mount]");
  const canvas = stage?.querySelector("canvas");
  return {
    hasBundle: !!window.PcLabGame,
    hasCanvas: !!canvas,
    canvasSize: canvas ? { w: canvas.clientWidth, h: canvas.clientHeight } : null,
    frameClass: document.querySelector("[data-pclab-frame]")?.className,
    loadingGone: !document.querySelector("[data-pclab-loading]"),
    text: stage?.innerText?.slice(0, 600),
    overlays: [...document.querySelectorAll("[data-pclab-mount] [class*='overlay'], [data-pclab-mount] [class*='pclab-']")].slice(0, 12).map(n => `${n.tagName}.${n.className}`),
    bodyOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
});
console.log(JSON.stringify(info, null, 2));
console.log("--- logs ---");
console.log(logs.join("\n") || "(none)");

await page.screenshot({ path: shot, fullPage: false });
await browser.close();
