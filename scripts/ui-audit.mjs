import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outputDir = path.resolve(root, process.env.AUDIT_DIR || "audit/before");
const widths = process.env.AUDIT_WIDTHS
  ? process.env.AUDIT_WIDTHS.split(",").map(Number).filter(Boolean)
  : [320, 375, 414, 768, 1024, 1440];
const themes = process.env.AUDIT_THEMES
  ? process.env.AUDIT_THEMES.split(",").map((value) => value.trim()).filter(Boolean)
  : ["editorial", "neon", "contrast"];
const modes = ["light", "dark"];
const routeSeeds = ["/", "/library", "/play", "/exam", "/exam/pretest", "/exam/final", "/play/pc-lab",
  "/plan", "/account", "/assistant", "/leaderboard", "/profile", "/teacher", "/about", "/install"];
const fast = process.env.AUDIT_FAST === "1";
const matrix = fast
  ? { widths: [320], themes: ["editorial"], modes: ["light"] }
  : { widths, themes, modes };
const findings = [];
const runtimeErrors = [];
let serverProcess;
let browser;

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
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Local server exited with code ${child.exitCode}.`);
    try {
      const response = await fetch(`${url}/api/health`);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  throw new Error("Local server did not become ready within 15 seconds.");
}

async function discoverRoutes(page, baseUrl) {
  const routes = new Set(routeSeeds);
  const checked = new Set();
  const queue = [...routeSeeds];

  while (queue.length && checked.size < 100) {
    const route = queue.shift();
    if (checked.has(route)) continue;
    checked.add(route);
    await page.goto(new URL(route, baseUrl).href, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(80);
    const links = await page.locator("a[href]").evaluateAll((anchors, origin) => anchors
      .map((anchor) => {
        const url = new URL(anchor.href, origin);
        if (url.origin !== origin || url.pathname.startsWith("/api/") || /\.[a-z0-9]{2,6}$/i.test(url.pathname)) return null;
        return url.pathname.replace(/\/$/, "") || "/";
      })
      .filter(Boolean), new URL(baseUrl).origin);
    for (const link of links) {
      if (routes.has(link)) continue;
      routes.add(link);
      queue.push(link);
    }
  }
  if (queue.length) throw new Error("Route discovery exceeded 100 linked pages.");
  return [...routes].sort();
}

async function inspect(page, metadata) {
  const results = await page.evaluate(() => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden" && element.getClientRects().length > 0;
    };
    const selectorFor = (element) => {
      const classes = typeof element.className === "string" ? element.className.trim().split(/\s+/).filter(Boolean).slice(0, 3) : [];
      return `${element.tagName.toLowerCase()}${classes.map((name) => `.${name}`).join("")}`;
    };
    const overflow = [];
    const bounds = [];
    for (const element of document.querySelectorAll("body *")) {
      if (!visible(element) || element.closest(".sr-only")) continue;
      const rect = element.getBoundingClientRect();
      if (element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 1) {
        overflow.push({
          selector: selectorFor(element),
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
          text: (element.innerText || "").trim().slice(0, 100)
        });
      }
      const parent = element.parentElement;
      if (!parent || !visible(parent)) continue;
      if (getComputedStyle(element).display.startsWith("inline") || (rect.width === 0 && rect.height === 0)) continue;
      const parentRect = parent.getBoundingClientRect();
      const parentStyle = getComputedStyle(parent);
      const clipped = [parentStyle.overflow, parentStyle.overflowX, parentStyle.overflowY].some((value) => ["hidden", "clip", "auto", "scroll"].includes(value));
      if (!clipped && (rect.left < parentRect.left - 1 || rect.right > parentRect.right + 1 || rect.top < parentRect.top - 1 || rect.bottom > parentRect.bottom + 1)) {
        bounds.push({
          selector: selectorFor(element),
          parent: selectorFor(parent),
          child: [Math.round(rect.left), Math.round(rect.top), Math.round(rect.right), Math.round(rect.bottom)],
          parentBounds: [Math.round(parentRect.left), Math.round(parentRect.top), Math.round(parentRect.right), Math.round(parentRect.bottom)]
        });
      }
    }

    const rgb = (color) => {
      const match = color.match(/rgba?\(([^)]+)\)/i);
      if (!match) return null;
      const values = match[1].split(/[,/ ]+/).filter(Boolean).map(Number);
      return values.length >= 3 ? [values[0], values[1], values[2], values[3] ?? 1] : null;
    };
    const luminance = ([r, g, b]) => {
      const channels = [r, g, b].map((value) => {
        const normalized = value / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const contrastFailures = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.nodeValue.trim();
      const element = node.parentElement;
      if (!text || !element || element.closest("script,style,noscript,[aria-hidden='true']") || !visible(element)) continue;
      let backgroundElement = element;
      let background = null;
      const activeSegment = element.closest(".segmented button.is-active");
      if (activeSegment) {
        background = rgb(getComputedStyle(activeSegment.parentElement, "::before").backgroundColor);
      }
      while (backgroundElement) {
        if (background && background[3] >= 0.99) break;
        background = rgb(getComputedStyle(backgroundElement).backgroundColor);
        if (background && background[3] >= 0.99) break;
        backgroundElement = backgroundElement.parentElement;
      }
      if (!background || !backgroundElement) continue;
      const foreground = rgb(getComputedStyle(element).color);
      if (!foreground || foreground[3] < 0.99) continue;
      const first = luminance(foreground);
      const second = luminance(background);
      const ratio = (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
      const style = getComputedStyle(element);
      const large = Number.parseFloat(style.fontSize) >= 24 || (Number.parseFloat(style.fontSize) >= 18.66 && Number(style.fontWeight) >= 700);
      const minimum = large ? 3 : 4.5;
      if (ratio + 0.01 < minimum) {
        contrastFailures.push({
          selector: selectorFor(element),
          text: text.slice(0, 100),
          ratio: Number(ratio.toFixed(2)),
          minimum,
          color: style.color,
          background: getComputedStyle(backgroundElement).backgroundColor
        });
      }
    }

    /* ---- structural text checks (added in Step 1; these catch the real bugs
       the old audit missed: unpadded cards, joined inline text, misaligned
       icons, buttons flush with a card bottom, tiny controls, content pinned
       under the sticky header, and raw text such as NaN or undefined). ---- */
    const styleOf = (element) => getComputedStyle(element);
    const hasSurface = (element) => {
      const style = styleOf(element);
      const radius = Number.parseFloat(style.borderTopLeftRadius) || 0;
      const borderSides = ["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"]
        .filter((key) => Number.parseFloat(style[key]) > 0).length;
      const shadow = style.boxShadow !== "none";
      return radius > 0 || borderSides >= 3 || shadow;
    };
    const inlineLevel = (element) => {
      const display = styleOf(element).display;
      return display.startsWith("inline") || display === "contents" || element.tagName === "SVG";
    };
    const visibleRect = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 1 && rect.height > 1 ? rect : null;
    };

    const textPadding = [];
    const joinedInline = [];
    const iconAlignment = [];
    const flushButtons = [];
    const smallControls = [];
    const rawControls = [];
    const longLines = [];
    const badText = [];

    const textLeaves = [];
    const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (textWalker.nextNode()) {
      const node = textWalker.currentNode;
      const value = node.nodeValue.trim();
      const element = node.parentElement;
      if (!value || !element || element.closest("script,style,noscript,[aria-hidden='true']") || !visible(element)) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      const rect = range.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) continue;
      textLeaves.push({ element, text: value, rect });
      if (/(^|\s)(NaN|undefined|null)(\s|$)/.test(value)) {
        badText.push({ selector: selectorFor(element), text: value.slice(0, 100) });
      }
      const style = styleOf(element);
      const chars = Math.round(rect.width / Math.max(4, Number.parseFloat(style.fontSize) * 0.5));
      if (value.length > 120 && chars > 82) {
        longLines.push({ selector: selectorFor(element), chars, text: value.slice(0, 80) });
      }
    }

    // Text sitting within 8px of the nearest visible surface edge (no padding).
    for (const leaf of textLeaves) {
      let surface = leaf.element;
      let guard = 0;
      while (surface && guard < 8) {
        if (!inlineLevel(surface) && surface.clientWidth >= 140 && hasSurface(surface)) break;
        surface = surface.parentElement;
        guard += 1;
      }
      if (!surface || surface === leaf.element) continue;
      if (surface.closest(".sr-only, .pclab-game, canvas")) continue;
      const bounds = surface.getBoundingClientRect();
      const distance = Math.min(
        leaf.rect.left - bounds.left,
        bounds.right - leaf.rect.right,
        leaf.rect.top - bounds.top,
        bounds.bottom - leaf.rect.bottom
      );
      if (distance < 0) continue;
      if (distance < 8) {
        textPadding.push({
          selector: selectorFor(leaf.element), surface: selectorFor(surface),
          distance: Math.round(distance), padding: styleOf(surface).padding, text: leaf.text.slice(0, 80)
        });
      }
    }

    // Adjacent inline siblings with no gap and no separator.
    for (const parent of document.querySelectorAll("body *")) {
      let previous = null;
      let separator = true;
      for (const node of parent.childNodes) {
        if (node.nodeType === 3) {
          if (node.nodeValue.length > 0) separator = true;
          continue;
        }
        if (node.nodeType !== 1) { previous = null; separator = true; continue; }
        if (node.closest?.("svg") || node.tagName === "svg") { previous = null; separator = true; continue; }
        const rect = visibleRect(node);
        if (!rect || !inlineLevel(node)) { previous = null; separator = true; continue; }
        if (previous && !separator && previous.rect
          && Math.abs(rect.top - previous.rect.top) < Math.max(rect.height, previous.rect.height) * 0.6) {
          const gap = rect.left - previous.rect.right;
          if (gap > -2 && gap < 2.5) {
            joinedInline.push({
              parent: selectorFor(parent), first: selectorFor(previous.element), second: selectorFor(node),
              gap: Number(gap.toFixed(1)), text: `${previous.element.textContent.trim().slice(0, 40)} + ${node.textContent.trim().slice(0, 40)}`
            });
          }
        }
        previous = { element: node, rect };
        separator = false;
      }
    }

    // Icon not vertically centered with its label.
    for (const element of document.querySelectorAll("button, a, .pill, .stat, .meta, li, .badge, .btn")) {
      const svg = element.querySelector(":scope > svg, :scope > .icon, :scope > span > svg");
      if (!svg || !visible(element)) continue;
      const svgRect = svg.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      if (elementRect.height > Math.max(64, svgRect.height * 3)) continue;
      const textNode = [...element.childNodes].find((node) => node.nodeType === 3 && node.nodeValue.trim());
      if (!textNode) continue;
      const range = document.createRange();
      range.selectNodeContents(textNode);
      const textRect = range.getBoundingClientRect();
      if (!textRect.height) continue;
      const lineHeight = Number.parseFloat(styleOf(element).lineHeight) || 0;
      if (lineHeight && textRect.height > lineHeight * 1.6) continue;
      const delta = Math.abs((svgRect.top + svgRect.bottom) / 2 - (textRect.top + textRect.bottom) / 2);
      if (delta > 2.5) iconAlignment.push({ selector: selectorFor(element), delta: Number(delta.toFixed(1)), text: element.textContent.trim().slice(0, 60) });
    }

    // Buttons flush against a surface's bottom edge.
    for (const control of document.querySelectorAll("a.btn, button.btn, .btn")) {
      const rect = visibleRect(control);
      if (!rect) continue;
      let surface = control.parentElement;
      let guard = 0;
      while (surface && guard < 6 && (!hasSurface(surface) || inlineLevel(surface))) { surface = surface.parentElement; guard += 1; }
      if (!surface || guard >= 6) continue;
      const bounds = surface.getBoundingClientRect();
      if (bounds.width < 160) continue;
      const bottomGap = bounds.bottom - rect.bottom;
      const paddingBottom = Number.parseFloat(styleOf(surface).paddingBottom) || 0;
      if (bottomGap >= 0 && bottomGap < 4 && paddingBottom < 8) {
        flushButtons.push({ selector: selectorFor(control), surface: selectorFor(surface), bottomGap: Math.round(bottomGap) });
      }
    }

    // Small and unstyled controls.
    for (const control of document.querySelectorAll("button, a.btn, .btn, select, input:not([type=hidden]), textarea, [role=button]")) {
      if (!visible(control) || control.closest(".sr-only")) continue;
      const rect = control.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) continue;
      const label = (control.innerText || control.getAttribute("aria-label") || control.name || control.tagName).trim().slice(0, 60);
      if (rect.height < 40) smallControls.push({ selector: selectorFor(control), height: Math.round(rect.height), label });
      const isNative = ["BUTTON", "SELECT", "INPUT", "TEXTAREA"].includes(control.tagName);
      if (isNative && !control.className && !control.getAttribute("role")) rawControls.push({ selector: selectorFor(control), label });
    }

    // Content crowded under a sticky or fixed header.
    let headerBottom = 0;
    let headerSelector = "";
    for (const element of document.querySelectorAll("header, .site-head, [data-site-head]")) {
      const style = styleOf(element);
      if (!["sticky", "fixed"].includes(style.position)) continue;
      const rect = element.getBoundingClientRect();
      if (rect.height < 20 || rect.width < 240) continue;
      if (rect.bottom > headerBottom) { headerBottom = rect.bottom; headerSelector = selectorFor(element); }
    }
    const mainFirst = document.querySelector("#main > *");
    let underHeader = null;
    if (mainFirst && headerBottom) {
      const gap = mainFirst.getBoundingClientRect().top - headerBottom;
      if (gap < 8) underHeader = { selector: selectorFor(mainFirst), header: headerSelector, gap: Math.round(gap) };
    }

    return {
      horizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      overflow,
      bounds,
      contrastFailures,
      textPadding,
      joinedInline,
      iconAlignment,
      flushButtons,
      smallControls,
      rawControls,
      longLines,
      badText,
      underHeader
    };
  });
  findings.push({ ...metadata, ...results });
}

async function navigateClientRoute(page, route) {
  await page.evaluate((target) => new Promise((resolve, reject) => {
    const url = new URL(target, location.href);
    const main = document.getElementById("main");
    const observer = new MutationObserver(() => {
      if (document.body.dataset.route !== url.pathname || !main.children.length) return;
      observer.disconnect();
      clearTimeout(timeout);
      resolve();
    });
    const timeout = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Route did not render: ${url.pathname}`));
    }, 10000);
    observer.observe(main, { childList: true, subtree: true });
    history.pushState({ audit: true }, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }), route);
}

async function run() {  await mkdir(outputDir, { recursive: true });
  const port = await unusedPort();
  const baseUrl = `http://127.0.0.1:${port}`;
  serverProcess = spawn(process.execPath, ["server.js"], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"]
  });
  let serverOutput = "";
  serverProcess.stdout.setEncoding("utf8").on("data", (chunk) => { serverOutput += chunk; });
  serverProcess.stderr.setEncoding("utf8").on("data", (chunk) => { serverOutput += chunk; });
  await waitForServer(baseUrl, serverProcess);

  const candidates = [process.env.CHROMIUM_PATH, "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome"].filter(Boolean);
  const executablePath = candidates.find((candidate) => existsSync(candidate));
  browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) runtimeErrors.push(`${response.status()} ${response.url()}`);
  });
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("Failed to load resource")) runtimeErrors.push(message.text());
  });
  await page.addInitScript(() => {
    const saved = sessionStorage.getItem("tp:ui-audit-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      localStorage.setItem("tp:state:v1", JSON.stringify({ version: 1, settings }));
    }
  });

  const routes = process.env.AUDIT_ROUTES
    ? process.env.AUDIT_ROUTES.split(",").map((value) => value.trim()).filter(Boolean)
    : await discoverRoutes(page, baseUrl);
  console.log(`Discovered ${routes.length} linked routes: ${routes.join(", ")}`);
  const runMatrix = [];
  for (const width of matrix.widths) {
    for (const theme of matrix.themes) {
      for (const mode of matrix.modes) runMatrix.push({ width, theme, mode });
    }
  }
  console.log(`Checking ${routes.length * runMatrix.length} route states${fast ? " (fast sample)" : ""}.`);

  for (const { width, theme, mode } of runMatrix) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.evaluate((settings) => sessionStorage.setItem("tp:ui-audit-settings", JSON.stringify(settings)), {
      theme,
      mode,
      motion: "full",
      fontscale: "1",
      sound: false
    });
    await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.locator("#main > *").first().waitFor({ state: "attached", timeout: 10000 });
    for (const route of routes) {
      if (await page.evaluate(() => location.pathname) !== route) await navigateClientRoute(page, route);
      const metadata = { route, width, theme, mode, surface: "page" };
      await inspect(page, metadata);
      if ((width === 375 || width === 1440) && theme === "editorial" && mode === "light") {
        const name = `${theme}-${mode}-${width}${route.replace(/^\//, "-").replace(/[^a-z0-9-]+/gi, "-") || "-home"}.png`;
        await page.screenshot({ path: path.join(outputDir, name), fullPage: false });
      }
      if (route !== "/") continue;
      const settingsButton = page.locator("button[aria-label='Open display and accessibility settings']");
      if (!(await settingsButton.count())) throw new Error("Could not find the display settings button on the home page.");
      await settingsButton.click();
      await page.locator("dialog.modal[open]").waitFor({ state: "visible", timeout: 5000 });
      await page.waitForTimeout(50);
      await inspect(page, { ...metadata, surface: "settings" });
      const screenshotName = `${theme}-${mode}-${width}.png`;
      await page.screenshot({ path: path.join(outputDir, screenshotName), fullPage: false });
      await page.locator("dialog.modal[open] [data-close]").click();
      await page.locator("dialog.modal[open]").waitFor({ state: "detached", timeout: 5000 });
    }
  }

    const totals = findings.reduce((summary, item) => {
    summary.states += 1;
    summary.horizontalScroll += Number(item.horizontalScroll);
    summary.overflow += item.overflow.length;
    summary.bounds += item.bounds.length;
    summary.contrast += item.contrastFailures.length;
    summary.textPadding += item.textPadding.length;
    summary.joinedInline += item.joinedInline.length;
    summary.iconAlignment += item.iconAlignment.length;
    summary.flushButtons += item.flushButtons.length;
    summary.smallControls += item.smallControls.length;
    summary.rawControls += item.rawControls.length;
    summary.longLines += item.longLines.length;
    summary.badText += item.badText.length;
    summary.underHeader += Number(Boolean(item.underHeader));
    return summary;
  }, {
    states: 0, horizontalScroll: 0, overflow: 0, bounds: 0, contrast: 0, textPadding: 0, joinedInline: 0,
    iconAlignment: 0, flushButtons: 0, smallControls: 0, rawControls: 0, longLines: 0, badText: 0, underHeader: 0
  });
  const report = { baseUrl, routes, matrix: runMatrix, totals, runtimeErrors: [...new Set(runtimeErrors)], findings };
  await writeFile(path.join(outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Audit report written to ${path.join(outputDir, "report.json")}`);
  console.log(`Totals: ${JSON.stringify(totals)}; browser errors: ${report.runtimeErrors.length}.`);
  const brokenStates = findings.filter((item) => item.horizontalScroll || item.overflow.length || item.bounds.length
    || item.contrastFailures.length || item.textPadding.length || item.joinedInline.length || item.iconAlignment.length
    || item.flushButtons.length || item.smallControls.length || item.rawControls.length || item.longLines.length
    || item.badText.length || item.underHeader);
  if (brokenStates.length || runtimeErrors.length) {
    for (const item of brokenStates) {
      console.log(`[${item.route} ${item.width}px ${item.theme}/${item.mode} ${item.surface}] ${item.horizontalScroll ? `horizontal scroll (${item.documentWidth}px)` : ""}${item.underHeader ? ` content ${item.underHeader.gap}px under ${item.underHeader.header}` : ""}`);
      for (const issue of item.overflow) console.log(`  overflow ${issue.selector}: ${issue.scrollWidth}/${issue.clientWidth} ${issue.text}`);
      for (const issue of item.bounds) console.log(`  bounds ${issue.selector} outside ${issue.parent}`);
      for (const issue of item.contrastFailures) console.log(`  contrast ${issue.ratio}:1 < ${issue.minimum}:1 ${issue.selector} "${issue.text}"`);
      for (const issue of item.textPadding.slice(0, 12)) console.log(`  padding ${issue.selector} within ${issue.distance}px of ${issue.surface} (padding ${issue.padding}) "${issue.text}"`);
      for (const issue of item.joinedInline.slice(0, 12)) console.log(`  joined ${issue.parent}: ${issue.first} + ${issue.second} gap ${issue.gap}px "${issue.text}"`);
      for (const issue of item.iconAlignment.slice(0, 12)) console.log(`  icon ${issue.selector} off-center ${issue.delta}px "${issue.text}"`);
      for (const issue of item.flushButtons.slice(0, 12)) console.log(`  flush ${issue.selector} ${issue.bottomGap}px from ${issue.surface} bottom`);
      for (const issue of item.smallControls.slice(0, 12)) console.log(`  small control ${issue.selector} ${issue.height}px "${issue.label}"`);
      for (const issue of item.rawControls.slice(0, 12)) console.log(`  unstyled ${issue.selector} "${issue.label}"`);
      for (const issue of item.longLines.slice(0, 12)) console.log(`  long line ${issue.chars}ch ${issue.selector} "${issue.text}"`);
      for (const issue of item.badText.slice(0, 12)) console.log(`  bad text ${issue.selector} "${issue.text}"`);
    }
    for (const error of [...new Set(runtimeErrors)]) console.error(`Browser error: ${error}`);
    process.exitCode = 1;
  } else {
    console.log("UI audit passed with no overflow, spacing, alignment, contrast, or browser errors.");
  }

  await context.close();
}

try {
  await run();
} catch (error) {
  console.error(error);
  if (serverProcess?.exitCode !== null && serverProcess?.exitCode !== undefined) {
    console.error(serverOutput);
  }
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (serverProcess && serverProcess.exitCode === null) {
    serverProcess.kill("SIGTERM");
    await new Promise((resolve) => serverProcess.once("exit", resolve));
  }
}
