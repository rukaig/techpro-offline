/* ==========================================================================
   Offline Sharing & Installation — TechPro.
   Zero network. Explains the three ways to run:
   1. Double-click index.html (file://)
   2. Local server (http://localhost:3000)
   3. Install as offline PWA
   ========================================================================== */
import { icon } from "../app/icons.js";
import { companionArt } from "../app/art.js";
import { promptInstall, canInstall } from "../app/chrome.js";

export function sharingPage() {
  return `<div class="page-shell section sharing-page">
    <header class="page-head">
      <div>
        <p class="eyebrow">Zero network · 100% offline</p>
        <h1>Offline sharing &amp; setup</h1>
        <p class="lede">TechPro is built to run anywhere without internet, including directly from a USB stick on school computers.</p>
      </div>
      <div class="sharing-head-art" aria-hidden="true">${companionArt("happy", { size: 90 })}</div>
    </header>

    <div class="profile-grid-layout mt-3">
      <!-- Option 1: File / USB -->
      <section class="card card-pad">
        <div class="section-head tight">
          <div>
            <p class="eyebrow">Option 1 · Instant</p>
            <h2>Double-click index.html</h2>
          </div>
          <span class="tag tag-success">No install</span>
        </div>
        <p>Copy the <code>TechPro-offline</code> folder or extract the zip onto any computer or USB flash drive.</p>
        <ol class="stack-sm mt-3" style="padding-left:1.2rem;line-height:1.6">
          <li>Open the folder in your file manager.</li>
          <li>Double-click <code>index.html</code>.</li>
          <li>It opens immediately in your web browser. Everything works, including every activity in both modules, the library, and all four exams!</li>
        </ol>
      </section>

      <!-- Option 2: Local Server & Classroom LAN -->
      <section class="card card-pad">
        <div class="section-head tight">
          <div>
            <p class="eyebrow">Option 2 · Classroom LAN</p>
            <h2>Local server (npm start)</h2>
          </div>
          <span class="tag">Local network</span>
        </div>
        <p>Run a local static server using Node.js for a whole classroom on the same Wi-Fi hotspot (no internet required):</p>
        <div class="mt-2" style="padding:0.75rem 1rem;background:var(--surface-2);border-radius:0.5rem;font-family:var(--font-mono);font-size:0.9rem">
          <code>npm start</code>
        </div>
        <p class="mt-2 tiny faint">To share across a local hotspot: <code>npm start -- --lan</code> prints the local IP address for classmates.</p>
      </section>

      <!-- Option 3: Install PWA -->
      <section class="card card-pad">
        <div class="section-head tight">
          <div>
            <p class="eyebrow">Option 3 · App icon</p>
            <h2>Install as desktop app</h2>
          </div>
          <span class="tag tag-accent">PWA</span>
        </div>
        <p>When running from <code>http://localhost:3000</code>, you can install TechPro so it opens in its own window with an app icon on your desktop.</p>
        <div class="mt-3">
          <button class="btn btn-primary" type="button" data-install-trigger ${canInstall() ? "" : "disabled"}>
            ${icon("download", 18)} Install TechPro
          </button>
          <span class="tiny faint ml-2">${canInstall() ? "Ready to install" : "Available when running via local server"}</span>
        </div>
      </section>
    </div>
  </div>`;
}

export function mountSharing(root) {
  root.querySelector("[data-install-trigger]")?.addEventListener("click", () => {
    promptInstall();
  });
}
