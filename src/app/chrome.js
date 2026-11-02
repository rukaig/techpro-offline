/* ==========================================================================
   App chrome: header, navigation, settings drawer, install cards, companion.
   ========================================================================== */
import { icon } from "./icons.js";
import { brandMark, companionArt } from "./art.js";
import { get, subscribe, update } from "../services/store.js";
import { levelForXp } from "../data/badges.js";
import {
  THEMES, setTheme, setMode, setMotion, setFontScale, applySettings, resolveMode, isDarkFirst
} from "../services/settings.js";
import { companionName, setCompanionName, setCompanionSkin, isCompanionSkinUnlocked, say, onSay } from "../services/companion.js";
import { COMPANION_SKINS } from "../data/companion-lines.js";
import { toast, modal, esc, confirmDialog } from "./ui.js";
import { navigate } from "./router.js";
import { resetAll, exportState, importState } from "../services/store.js";
import { downloadFile } from "./ui.js";

const NAV = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/library", label: "Library", icon: "bookOpen" },
  { href: "/play", label: "Play", icon: "gamepad" },
  { href: "/exam", label: "Exam", icon: "exam" },
  { href: "/leaderboard", label: "Ranks", icon: "trophy" },
  { href: "/assistant", label: "Ask", icon: "sparkles" }
];

const MOBILE_NAV = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/library", label: "Library", icon: "bookOpen" },
  { href: "/play", label: "Play", icon: "gamepad" },
  { href: "/leaderboard", label: "Ranks", icon: "trophy" },
  { href: "/profile", label: "Profile", icon: "user" }
];

let unsubProgress = null;
let unsubSay = null;
let deferredInstall = null;

export function setInstallPrompt(event) {
  deferredInstall = event;
  document.querySelectorAll("[data-install-prompt]").forEach((button) => { button.hidden = false; });
}

export function canInstall() {
  return Boolean(deferredInstall);
}

export async function promptInstall() {
  if (!deferredInstall) {
    navigate("/install");
    return;
  }
  deferredInstall.prompt();
  const choice = await deferredInstall.userChoice;
  deferredInstall = null;
  if (choice.outcome === "accepted") toast("TechPro is installing. Check your home screen.", "success");
  else toast("No problem. You can install later from this page.");
}

function navLink(item, cls = "") {
  return `<a class="nav-link ${cls}" href="${item.href}" data-nav="${item.href}">
    ${icon(item.icon, 18)}<span>${item.label}</span>
  </a>`;
}

export function mountChrome() {
  const shell = document.getElementById("app");
  const profile = get().profile;
  const settings = get().settings;
  if (document.documentElement.dataset.buddy == null) {
    document.documentElement.dataset.buddy = settings.companionSkin || "classic";
  }

  shell.innerHTML = `
    <div class="app-frame">
      <header class="site-head" id="siteHead">
        <div class="page-shell head-inner">
          <a class="brand" href="/" aria-label="TechPro home">
            <span class="brand-mark">${brandMark(38)}</span>
            <span class="brand-type">
              <span class="brand-name">TechPro</span>
              <span class="brand-sub">CSS NC II · COC 1</span>
            </span>
          </a>
          <nav class="desktop-nav" aria-label="Primary">
            ${NAV.map((item) => navLink(item)).join("")}
          </nav>
          <div class="head-actions">
            <a class="xp-chip" href="/profile" aria-label="Your level and XP">
              <span class="xp-level" data-level>1</span>
              <span class="xp-label"><span data-level-title>Bench Rookie</span><span class="xp-sub"><b data-xp>0</b> XP</span></span>
            </a>
            <button class="icon-button theme-quick" type="button" data-theme-toggle aria-label="Switch light or dark mode" title="Light / dark">
              ${icon(settings.mode === "dark" || (settings.mode === "system" && resolveMode("system") === "dark") ? "sun" : "moon", 19)}
            </button>
            <button class="icon-button" type="button" data-open-settings aria-label="Open display and accessibility settings" title="Settings">
              ${icon("settings", 19)}
            </button>
            <a class="avatar-link" href="/account" aria-label="Sign in or manage your account">
              ${profile.displayName ? `<span class="avatar" data-account-avatar style="background:${profile.avatar || "var(--accent)"}">${esc(profile.displayName.slice(0, 2).toUpperCase())}</span>` : `<span class="avatar avatar-guest" data-account-avatar>${icon("user", 18)}</span>`}
            </a>
          </div>
        </div>
        <div class="route-progress" aria-hidden="true"></div>
      </header>

      <main id="main" tabindex="-1"></main>

      <footer class="site-foot">
        <div class="page-shell foot-grid">
          <div class="foot-brand">
            <a class="brand" href="/" aria-label="TechPro home">
              <span class="brand-mark">${brandMark(34)}</span>
              <span class="brand-type"><span class="brand-name">TechPro</span><span class="brand-sub">Assemble Computer Hardware</span></span>
            </a>
            <p>A learning space for the DepEd Computer Systems Servicing NC II module. Read the module, then practise on the bench.</p>
            <p class="foot-credit">Module by Yvan Marco A. Reyes · Schools Division Office of Cavite · First Edition, 2026</p>
          </div>
          <nav class="foot-col" aria-label="Learn">
            <h3>Learn</h3>
            <a href="/library">Library</a>
            <a href="/play">Interactives</a>
            <a href="/assistant">TechPro assistant</a>
            <a href="/play/pc-lab">PC Lab</a>
            <a href="/exam/final">Final Exam</a>
          </nav>
          <nav class="foot-col" aria-label="Progress">
            <h3>Progress</h3>
            <a href="/leaderboard">Leaderboard</a>
            <a href="/plan">Study plan</a>
            <a href="/profile">My profile</a>
            <a href="/account">Sign in / account</a>
            <a href="/teacher">Teacher view</a>
            <a href="/install">Install app</a>
          </nav>
          <nav class="foot-col" aria-label="About">
            <h3>About</h3>
            <a href="/about">About &amp; references</a>
            <a href="/about#credits">Module credit</a>
            <a href="/about#privacy">Privacy</a>
            <a href="/about#accessibility">Accessibility</a>
          </nav>
        </div>
        <div class="page-shell foot-bottom">
          <span>Built for learners and teachers. Works offline after your first visit.</span>
          <span class="foot-status"><span class="dot dot-live" aria-hidden="true"></span> <span data-net-status>Online</span></span>
        </div>
      </footer>

      <nav class="bottom-nav" aria-label="Quick navigation">
        ${MOBILE_NAV.map((item) => navLink(item, "bottom-link")).join("")}
      </nav>

      <div class="buddy-dock" id="buddyDock" hidden>
        <div class="buddy-bubble" id="buddyBubble" role="status" aria-live="polite">
          <button class="buddy-bubble-close" type="button" data-buddy-close aria-label="Dismiss message">${icon("x", 14)}</button>
          <span class="buddy-name" data-buddy-name>Bit</span>
          <span class="buddy-text" data-buddy-text></span>
        </div>
        <button class="buddy-button" type="button" data-buddy-open aria-label="Open companion panel">
          <span class="buddy-art-wrap" data-buddy-art>${companionArt(get().companion.mood || "happy", { size: 58 })}</span>
          <span class="buddy-dot" aria-hidden="true"></span>
        </button>
      </div>
      <a class="assistant-float" href="/assistant" aria-label="Ask the TechPro assistant" title="Ask TechPro">
        <span data-assistant-float-art aria-hidden="true">${companionArt("thinking", { size: 38 })}</span>
      </a>
    </div>
  `;

  bindChrome();
  document.documentElement.toggleAttribute("data-tab-hidden", document.hidden);
  document.addEventListener("visibilitychange", () => {
    document.documentElement.toggleAttribute("data-tab-hidden", document.hidden);
  });
  window.addEventListener("techpro:routechange", (event) => {
    updateChrome(event.detail.pathname);
  });
  updateChrome(location.pathname);
  refreshProgress();

  unsubProgress?.();
  unsubProgress = subscribe(() => refreshProgress());

  unsubSay?.();
  unsubSay = onSay(({ message, mood, duration, name }) => showBuddyMessage(message, duration, name, mood));
}

export function updateChrome(pathname) {
  const clean = pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = link.dataset.nav;
    const active = href === "/" ? clean === "/" : clean === href || clean.startsWith(`${href}/`);
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const head = document.getElementById("siteHead");
  if (head) head.classList.toggle("is-scrolled", window.scrollY > 12);
}

function refreshProgress() {
  const state = get();
  const level = levelForXp(state.progress.xp || 0);
  document.querySelectorAll("[data-level]").forEach((el) => { el.textContent = level.level; });
  document.querySelectorAll("[data-level-title]").forEach((el) => { el.textContent = level.title; });
  document.querySelectorAll("[data-xp]").forEach((el) => { el.textContent = (state.progress.xp || 0).toLocaleString("en-PH"); });
  const accountAvatar = document.querySelector("[data-account-avatar]");
  if (accountAvatar) {
    if (state.profile.displayName) {
      accountAvatar.classList.remove("avatar-guest");
      accountAvatar.textContent = state.profile.displayName.slice(0, 2).toUpperCase();
    } else {
      accountAvatar.classList.add("avatar-guest");
      accountAvatar.style.removeProperty("background");
      accountAvatar.innerHTML = icon("user", 18);
    }
  }
  document.documentElement.dataset.buddy = state.settings.companionSkin || "classic";
  const buddyName = companionName();
  document.querySelectorAll("[data-buddy-name]").forEach((el) => { el.textContent = buddyName; });
  document.querySelectorAll("[data-companion-label]").forEach((el) => { el.textContent = buddyName; });
  const art = document.querySelector("[data-buddy-art]");
  if (art) art.innerHTML = companionArt(state.companion.mood || "happy", { size: 58 });
  const assistantArt = document.querySelector("[data-assistant-float-art]");
  if (assistantArt) assistantArt.innerHTML = companionArt("thinking", { size: 38 });
  const themeIcon = document.querySelector("[data-theme-toggle]");
  if (themeIcon) {
    const isDark = resolveMode(state.settings.mode, state.settings.theme) === "dark";
    themeIcon.innerHTML = icon(isDark ? "sun" : "moon", 19);
  }
  const toggle = document.querySelector("[data-buddy-toggle]");
  if (toggle) toggle.setAttribute("aria-pressed", String(!document.getElementById("buddyDock")?.hidden));
}

function bindChrome() {
  window.addEventListener("scroll", () => {
    document.getElementById("siteHead")?.classList.toggle("is-scrolled", window.scrollY > 12);
  }, { passive: true });

  document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
    const state = get();
    const current = resolveMode(state.settings.mode, state.settings.theme);
    setMode(current === "dark" ? "light" : "dark");
    toast(`${current === "dark" ? "Light" : "Dark"} mode on.`, "success", 1800);
  });

  document.querySelectorAll("[data-open-settings]").forEach((button) => {
    button.addEventListener("click", openSettings);
  });

  document.querySelector("[data-buddy-open]")?.addEventListener("click", openCompanion);
  document.querySelector("[data-buddy-close]")?.addEventListener("click", () => {
    document.getElementById("buddyBubble")?.classList.remove("is-visible");
  });

  updateNetStatus();
  window.addEventListener("online", updateNetStatus);
  window.addEventListener("offline", updateNetStatus);
}

function updateNetStatus() {
  const online = navigator.onLine !== false;
  const banner = document.getElementById("offlineBanner");
  if (banner) banner.hidden = online;
  const label = document.querySelector("[data-net-status]");
  if (label) label.textContent = online ? "Online" : "Offline";
}

let buddyTimer = null;
function showBuddyMessage(message, duration = 6500, name = companionName(), mood = "happy") {
  const dock = document.getElementById("buddyDock");
  const bubble = document.getElementById("buddyBubble");
  if (!dock || !bubble) return;
  const art = document.querySelector("[data-buddy-art]");
  if (art) art.innerHTML = companionArt(mood, { size: 58 });
  const text = bubble.querySelector("[data-buddy-text]");
  const nameEl = bubble.querySelector("[data-buddy-name]");
  if (text) text.textContent = message;
  if (nameEl) nameEl.textContent = name;
  dock.hidden = false;
  bubble.classList.add("is-visible");
  clearTimeout(buddyTimer);
  buddyTimer = setTimeout(() => bubble.classList.remove("is-visible"), duration);
}

export function openCompanion() {
  const state = get();
  const body = `
    <div class="companion-panel">
      <div class="companion-stage">
        <div class="companion-float" data-companion-preview>${companionArt(state.companion.mood || "happy", { size: 152 })}</div>
        <p class="companion-quote" data-companion-quote>“${esc(companionName())} at your service. I mostly supervise.”</p>
      </div>
      <div class="stack-sm">
        <label class="field" for="companionName">
          <span class="field-label">Companion name</span>
          <input class="input" id="companionName" maxlength="18" value="${esc(companionName())}" autocomplete="off">
          <span class="field-hint">Up to 18 characters. Press Save when you are happy.</span>
        </label>
        <fieldset>
          <legend class="field-label">Skin</legend>
          <div class="skin-grid">
            ${COMPANION_SKINS.map((skin) => {
              const unlocked = isCompanionSkinUnlocked(skin.id, state);
              const requirement = skin.unlockXp ? `Unlock at ${skin.unlockXp} XP` : skin.unlockBadge ? "Unlock with First Build" : skin.note;
              return `<button class="skin-option${skin.id === state.settings.companionSkin ? " is-active" : ""}" type="button" data-skin="${skin.id}" aria-pressed="${skin.id === state.settings.companionSkin}" ${unlocked ? "" : "disabled"}>
              <span class="skin-dot skin-${skin.id}" aria-hidden="true"></span>
              <span><strong>${skin.name}</strong><small>${requirement}</small></span>
            </button>`;
            }).join("")}
          </div>
        </fieldset>
        <label class="setting-toggle">
          <span class="setting-toggle-copy"><strong>Keep my companion when theme changes</strong><small>Otherwise the companion follows the theme.</small></span>
          <span class="switch-wrap"><input class="setting-switch" type="checkbox" role="switch" data-keep-companion ${state.settings.keepCompanion ? "checked" : ""}><span class="switch-track" aria-hidden="true"></span></span>
        </label>
        <div class="cluster">
          <button class="btn btn-primary" type="button" data-save-companion>Save companion</button>
          <button class="btn btn-ghost" type="button" data-companion-talk>Say hello</button>
        </div>
        <p class="tiny faint">Your companion is a study buddy, not a chatbot. Everything they say is written into the app and works offline.</p>
      </div>
    </div>
  `;
  const { dialog, close } = modal({
    title: "Your companion",
    body,
    label: "Companion settings",
    onMount(root) {
      root.querySelector("[data-companion-talk]")?.addEventListener("click", () => {
        say("welcome", { mood: "happy", force: true });
        root.querySelector("[data-companion-quote]").textContent = "“Bench is ready. Let's build something that boots.”";
      });
      root.querySelectorAll("[data-skin]").forEach((button) => {
        button.addEventListener("click", () => {
          setCompanionSkin(button.dataset.skin);
          root.querySelectorAll("[data-skin]").forEach((el) => {
            el.classList.toggle("is-active", el === button);
            el.setAttribute("aria-pressed", String(el === button));
          });
          root.querySelector("#companionName").value = companionName();
          root.querySelector("[data-companion-preview]").innerHTML = companionArt(get().companion.mood || "happy", { size: 152 });
        });
      });
      root.querySelector("[data-keep-companion]")?.addEventListener("change", (event) => {
        update((draft) => { draft.settings.keepCompanion = event.target.checked; }, { type: "settings" });
      });
      root.querySelector("[data-save-companion]")?.addEventListener("click", () => {
        const value = root.querySelector("#companionName").value;
        const name = setCompanionName(value);
        toast(`${name} is ready.`, "success");
        say(`${name}, reporting for duty.`, { mood: "proud", force: true });
        close();
      });
    }
  });
  return dialog;
}

export function openSettings() {
  const state = get();
  const mode = state.settings.mode;
  const body = `
    <div class="settings-panel">
      <section aria-labelledby="themeHeading">
        <div class="settings-head"><h3 id="themeHeading">Theme</h3><span class="tiny faint">${THEMES.length} looks, same layout</span></div>
        <div class="theme-grid" role="radiogroup" aria-label="Theme">
          ${THEMES.map((theme) => `<button class="theme-option${theme.id === state.settings.theme ? " is-active" : ""}" type="button" role="radio" aria-checked="${theme.id === state.settings.theme}" data-theme="${theme.id}">
            <span class="theme-swatch" style="--sw1:${theme.swatch[0]};--sw2:${theme.swatch[1]};--sw3:${theme.swatch[2]}" aria-hidden="true">
              <span class="theme-preview-bar"></span>
              <span class="theme-preview-card"></span>
              <span class="theme-preview-button"></span>
              <span class="theme-preview-dot"></span>
            </span>
            <span class="theme-copy">
              <strong class="theme-name">${theme.name}</strong>
              <small class="theme-description">${theme.note}</small>
            </span>
            <span class="theme-check" aria-hidden="true">${icon("check", 14)}</span>
          </button>`).join("")}
        </div>
      </section>
      <section aria-labelledby="modeHeading">
        <div class="settings-head"><h3 id="modeHeading">Light or dark</h3></div>
        <div class="segmented" role="radiogroup" aria-label="Colour mode" style="--segment-index:${{ light: 0, dark: 1, system: 2 }[mode] ?? 0}">
          ${[
            ["light", "sun", "Light"],
            ["dark", "moon", "Dark"],
            ["system", "monitor", "System"]
          ].map(([choice, symbol, label]) => `<button type="button" role="radio" aria-checked="${mode === choice}" class="${mode === choice ? "is-active" : ""}" data-mode="${choice}">${icon(symbol, 16)}<span>${label}</span></button>`).join("")}
        </div>
        <p class="field-hint">Dark-first themes start dark. You can override them here.</p>
      </section>
      <section aria-labelledby="textHeading">
        <div class="settings-head"><h3 id="textHeading">Text size</h3><span class="tiny faint" data-font-label>${Math.round(Number(state.settings.fontscale) * 100)}%</span></div>
        <input class="range settings-range" type="range" min="0.9" max="1.2" step="0.1" value="${state.settings.fontscale}" data-fontscale aria-label="Text size" style="--range-fill:${Math.max(0, Math.min(100, (Number(state.settings.fontscale) - 0.9) / 0.3 * 100))}%">
        <div class="range-preview"><span class="tiny faint">Small</span><span class="font-preview" data-font-preview style="font-size:${Number(state.settings.fontscale)}rem">Aa</span><span class="tiny faint">Large</span></div>
      </section>
      <section aria-labelledby="motionHeading">
        <div class="settings-head"><h3 id="motionHeading">Motion &amp; sound</h3></div>
        <label class="setting-toggle"><span class="setting-toggle-copy"><strong>Use animations</strong><small>Turn off for a calmer screen. Reduced-motion users always get the calm version.</small></span><span class="switch-wrap"><input class="setting-switch" type="checkbox" role="switch" data-motion-toggle ${state.settings.motion === "full" ? "checked" : ""}><span class="switch-track" aria-hidden="true"></span></span></label>
        <label class="setting-toggle"><span class="setting-toggle-copy"><strong>Sound cues</strong><small>Short tones for correct and incorrect answers. Every cue also has a visible label.</small></span><span class="switch-wrap"><input class="setting-switch" type="checkbox" role="switch" data-sound-toggle ${state.settings.sound !== false ? "checked" : ""}><span class="switch-track" aria-hidden="true"></span></span></label>
      </section>
      <section aria-labelledby="installHeading">
        <div class="settings-head"><h3 id="installHeading">Install &amp; data</h3></div>
        <div class="settings-actions">
          <button class="btn btn-soft" type="button" data-install-prompt ${canInstall() ? "" : "hidden"}>${icon("install", 18)} Install app</button>
          <a class="btn btn-ghost" href="/install">${icon("qr", 18)} Install page &amp; QR</a>
          <button class="btn btn-ghost" type="button" data-export>Export my data</button>
          <label class="btn btn-ghost" for="importFile">Import data</label>
          <input id="importFile" type="file" accept="application/json" hidden data-import>
        </div>
        <p class="field-hint mt-3">Your progress is saved on this device first. Signing in adds cloud sync between devices.</p>
      </section>
      <section aria-labelledby="dangerHeading">
        <div class="settings-head"><h3 id="dangerHeading">Reset</h3></div>
        <button class="btn btn-ghost" type="button" data-reset>Reset all progress</button>
      </section>
    </div>
  `;
  const { dialog, close } = modal({
    title: "Display & accessibility",
    body,
    wide: true,
    label: "Display and accessibility settings",
    onMount(root) {
      root.querySelectorAll("[data-theme]").forEach((button) => {
        button.addEventListener("click", () => {
          setTheme(button.dataset.theme);
          root.querySelectorAll("[data-theme]").forEach((el) => {
            const active = el === button;
            el.classList.toggle("is-active", active);
            el.setAttribute("aria-checked", String(active));
          });
          toast(`${THEMES.find((theme) => theme.id === button.dataset.theme)?.name} applied.`, "success", 1800);
        });
      });
      root.querySelectorAll("[data-mode]").forEach((button) => {
        button.addEventListener("click", () => {
          setMode(button.dataset.mode);
          root.querySelector(".segmented")?.style.setProperty("--segment-index", String({ light: 0, dark: 1, system: 2 }[button.dataset.mode] ?? 0));
          root.querySelectorAll("[data-mode]").forEach((el) => {
            el.classList.toggle("is-active", el === button);
            el.setAttribute("aria-checked", String(el === button));
          });
          refreshProgress();
        });
      });
      root.querySelector("[data-fontscale]")?.addEventListener("input", (event) => {
        setFontScale(event.target.value);
        const scale = Number(event.target.value);
        root.querySelector("[data-font-label]").textContent = `${Math.round(scale * 100)}%`;
        root.querySelector("[data-font-preview]").style.fontSize = `${scale}rem`;
        event.target.style.setProperty("--range-fill", `${((scale - 0.9) / 0.3) * 100}%`);
      });
      root.querySelector("[data-motion-toggle]")?.addEventListener("change", (event) => {
        setMotion(event.target.checked ? "full" : "reduced");
      });
      root.querySelector("[data-sound-toggle]")?.addEventListener("change", (event) => {
        const next = get();
        import("../services/store.js").then(({ update }) => {
          update((draft) => { draft.settings.sound = event.target.checked; }, { type: "settings" });
        });
      });
      root.querySelector("[data-install-prompt]")?.addEventListener("click", () => promptInstall());
      root.querySelector("[data-export]")?.addEventListener("click", () => {
        downloadFile("techpro-progress.json", exportState(), "application/json");
        toast("Progress exported.", "success");
      });
      root.querySelector("[data-import]")?.addEventListener("change", async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
          const text = await file.text();
          await confirmDialog({ title: "Import saved data?", message: "This replaces the progress currently saved in this browser.", confirmText: "Import" });
          importState(text);
          applySettings();
          refreshProgress();
          toast("Progress imported. Reloading…", "success");
          setTimeout(() => window.location.reload(), 900);
        } catch (error) {
          toast(error.message || "That file could not be imported.", "error");
        }
      });
      root.querySelector("[data-reset]")?.addEventListener("click", async () => {
        const yes = await confirmDialog({ title: "Reset everything?", message: "Lessons, scores, XP, badges, journal entries, and settings on this device will be cleared. Cloud data is not deleted.", confirmText: "Reset this device", danger: true });
        if (!yes) return;
        resetAll();
        window.location.href = "/";
      });
    }
  });
  return dialog;
}

export function showInstallCard() {
  return `<div class="install-card">
    <div class="install-copy">
      <p class="eyebrow">Install TechPro</p>
      <h2>Keep the bench on your home screen</h2>
      <p>Install once and the library, games, and your saved progress open offline. No app store, no account required.</p>
      <div class="cluster">
        <button class="btn btn-primary" type="button" data-install-prompt ${canInstall() ? "" : "hidden"}>${icon("install", 18)} Install now</button>
        <a class="btn btn-ghost" href="/install">${icon("qr", 18)} Show QR code</a>
      </div>
    </div>
    <div class="install-art" aria-hidden="true">${brandMark(100)}</div>
  </div>`;
}
