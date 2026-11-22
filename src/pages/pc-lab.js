/* ==========================================================================
   PC Lab page. The 3D game is built separately into /assets/games/pc-lab.js
   so three.js never loads on the Library, Exam, or Home routes.
   ========================================================================== */
import { ACTIVITY_BY_ID } from "../data/activities.js";
import { companionArt } from "../app/art.js";
import { activityHero } from "../app/game-kit.js";
import { icon } from "../app/icons.js";
import { get, set } from "../services/store.js";
import { applySettings, setTheme } from "../services/settings.js";
import { companionName, say } from "../services/companion.js";
import {
  completedLevels,
  savePcLabCampaign,
  savePcLabLevel
} from "../services/game-progress.js";

const BUNDLE_URL = "./assets/games/pc-lab.js";
let bundlePromise = null;

function loadGameBundle({ force = false } = {}) {
  if (!force && window.PcLabGame) return Promise.resolve(window.PcLabGame);
  if (bundlePromise) return bundlePromise;
  if (force) {
    document.querySelectorAll("script[data-pc-lab-bundle]").forEach((node) => node.remove());
    try { delete window.PcLabGame; } catch { window.PcLabGame = undefined; }
  }
  bundlePromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = BUNDLE_URL;
    script.async = true;
    script.dataset.pcLabBundle = "true";
    script.onload = () => {
      bundlePromise = null;
      if (window.PcLabGame?.start) resolve(window.PcLabGame);
      else reject(new Error("The PC Lab bundle loaded without a game entry point."));
    };
    script.onerror = () => {
      bundlePromise = null;
      script.remove();
      reject(new Error("The PC Lab bundle could not be downloaded."));
    };
    document.head.append(script);
  });
  return bundlePromise;
}

function gameSettings() {
  const settings = get().settings;
  return {
    quality: settings.gameQuality || "auto",
    sound: settings.sound !== false,
    haptics: settings.haptics !== false,
    voiceGuidance: settings.voiceGuidance !== false,
    voiceGender: settings.voiceGender === "boy" ? "boy" : "girl",
    voiceName: settings.voiceName || "",
    motion: settings.motion === "reduced" ? "reduced" : "full"
  };
}

function errorMarkup() {
  return `<div class="pclab-load-error" role="alert">
    <span class="pclab-load-icon">${icon("alertTriangle", 28)}</span>
    <div>
      <p class="eyebrow">Bench offline</p>
      <h2>The 3D bench could not load.</h2>
      <p>Confirm the local app files are present, then try again. The rest of TechPro keeps working.</p>
    </div>
    <button class="btn btn-primary btn-sm" type="button" data-pclab-retry>${icon("refresh", 17)} Try again</button>
  </div>`;
}

export function pcLabPage({ query }) {
  const mode = query?.get("mode") === "disassembly" ? "disassembly" : "build";
  const activity = ACTIVITY_BY_ID[mode === "disassembly" ? "disassembly" : "pc-lab"];
  const intro = mode === "disassembly"
    ? "Reverse the bench safely. Make the machine dead, remove the hazards, document every connection, then work the fault checks in module order."
    : "Clean and arrange the workbench, prepare for safe work, then install the processor and memory before diagnosing Carlo's no-display build.";
  const otherMode = mode === "disassembly"
    ? { href: "/play/pc-lab", label: "Build mode" }
    : { href: "/play/pc-lab?mode=disassembly", label: "Reverse drill" };

  return `
    <div class="pclab-page">
      ${activityHero(activity, {
        eyebrow: mode === "disassembly" ? "Reverse drill" : "Physical simulator",
        intro,
        back: "/play",
        backLabel: "All interactives",
        actions: `<a class="btn btn-ghost btn-sm" href="${otherMode.href}">${icon("refresh", 17)} ${otherMode.label}</a>
          <button class="btn btn-ghost btn-sm" type="button" data-pclab-fullscreen aria-pressed="false">${icon("external", 17)} Full screen</button>
          <span class="pclab-fullscreen-status" data-pclab-fullscreen-status role="status" aria-live="polite"></span>`,
        meta: `<span class="pill">${icon("gamepad", 15)} L0 · L2 · L4 · Fault</span>
          <span class="pill">${icon("target", 15)} Drag, rotate, press</span>`
      })}

      <section class="pclab-frame" data-pclab-frame aria-label="PC Lab game">
        <div class="pclab-loading" data-pclab-loading>
          <span class="pclab-spinner" aria-hidden="true"></span>
          <p>Unpacking the workbench…</p>
        </div>
        <div class="pclab-mount" data-pclab-mount></div>
      </section>

      <p class="pclab-footnote">
        <span>${icon("lightbulb", 16)} Tip: tap parts for actions, drag the screws and socket lever as guided, or right-drag to rotate the view. Use the camera button to reframe the bench.</span>
        <a href="/library/assembly">Review the assembly lesson ${icon("arrowRight", 15)}</a>
      </p>
    </div>
  `;
}

export function mountPcLab(root) {
  const hash = window.location.hash || "";
  const queryStr = hash.includes("?")
    ? hash.slice(hash.indexOf("?") + 1)
    : (window.location.search || "").replace(/^\?/, "");
  const params = new URLSearchParams(queryStr);
  const mode = params.get("mode") === "disassembly" ? "disassembly" : "build";
  const mount = root.querySelector("[data-pclab-mount]");
  const frame = root.querySelector("[data-pclab-frame]");
  const gameRoot = () => mount?.querySelector("[data-pclab]");
  const loading = root.querySelector("[data-pclab-loading]");
  const fullscreenButtons = () => root.querySelectorAll("[data-pclab-fullscreen], [data-game-fullscreen]");
  const fullscreenStatus = root.querySelector("[data-pclab-fullscreen-status]");
  let game = null;
  let cancelled = false;

  function syncFullscreen() {
    const active = document.fullscreenElement === gameRoot();
    fullscreenButtons().forEach((button) => {
      button.setAttribute("aria-pressed", String(active));
      if (button.matches("[data-pclab-fullscreen]")) {
        button.innerHTML = `${icon("external", 17)} ${active ? "Exit full screen" : "Full screen"}`;
      } else {
        button.setAttribute("aria-label", active ? "Exit fullscreen" : "Enter fullscreen");
        button.title = active ? "Exit fullscreen" : "Enter fullscreen";
      }
    });
    if (fullscreenStatus) fullscreenStatus.textContent = "";
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement === gameRoot()) {
        await document.exitFullscreen();
      } else if (gameRoot()?.requestFullscreen) {
        await gameRoot().requestFullscreen();
      } else if (fullscreenStatus) {
        fullscreenStatus.textContent = "Fullscreen is not supported in this browser.";
      }
    } catch (error) {
      console.error("PC Lab fullscreen could not be changed.", error);
      if (fullscreenStatus) fullscreenStatus.textContent = "Fullscreen could not be changed. Use your browser's fullscreen controls.";
    }
  }
  root.querySelector("[data-pclab-fullscreen]")?.addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", syncFullscreen);

  function startGame(bundle) {
    if (cancelled || !mount) return;
    try {
      game = bundle.start({
        mount,
        mode,
        debug: params.has("debug"),
        completed: completedLevels(),
        settings: gameSettings(),
        companion: { name: companionName() },
        companionName: companionName(),
        companionArt,
        onSaveLevel: (result) => savePcLabLevel(result),
        onCampaignComplete: (campaign) => savePcLabCampaign(campaign, mode),
        onSettingsChange: (patch) => {
          const current = get().settings;
          set({
            settings: {
              sound: patch.sound ?? current.sound,
              haptics: patch.haptics ?? current.haptics,
              voiceGuidance: patch.voiceGuidance ?? current.voiceGuidance,
              voiceGender: patch.voiceGender ?? current.voiceGender,
              voiceName: patch.voiceName ?? current.voiceName,
              gameQuality: patch.quality ?? current.gameQuality,
              motion: patch.motion ?? current.motion
            }
          }, { type: "settings" });
          if (patch.motion) applySettings();
        },
        onThemeChange: (theme) => setTheme(theme),
        onToggleFullscreen: () => toggleFullscreen(),
        onCompanionSay: (line, mood) => say(line, { mood, duration: 4200 })
      });
      frame?.classList.add("is-ready");
      loading?.remove();
    } catch (error) {
      console.error("PC Lab could not start.", error);
      showError(error);
    }
  }

  function showError(error) {
    if (cancelled) return;
    console.warn("PC Lab unavailable:", error);
    frame?.classList.remove("is-ready");
    mount.innerHTML = errorMarkup();
    mount.querySelector("[data-pclab-retry]")?.addEventListener("click", () => {
      mount.innerHTML = `<div class="pclab-loading"><span class="pclab-spinner" aria-hidden="true"></span><p>Retrying the bench…</p></div>`;
      loadGameBundle({ force: true }).then(startGame).catch(showError);
    });
  }

  loadGameBundle().then(startGame).catch(showError);

  return () => {
    cancelled = true;
    document.removeEventListener("fullscreenchange", syncFullscreen);
    root.querySelector("[data-pclab-fullscreen]")?.removeEventListener("click", toggleFullscreen);
    try { game?.destroy?.(); } catch (error) { console.warn("PC Lab cleanup failed.", error); }
    game = null;
  };
}
