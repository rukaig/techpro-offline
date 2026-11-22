import {
  get, update, list, createProfile, switchProfile, deleteProfile,
  exportState, importState
} from "../services/store.js";
import { esc, toast, confirmDialog, downloadFile } from "../app/ui.js";
import { icon, stars } from "../app/icons.js";
import { companionArt } from "../app/art.js";
import { applySettings } from "../services/settings.js";

const AVATAR_OPTIONS = [
  { id: "chip", label: "Chip", color: "var(--accent)" },
  { id: "wrench", label: "Wrench", color: "#2563eb" },
  { id: "bolt", label: "Bolt", color: "#9a4f00" },
  { id: "cpu", label: "CPU", color: "#047857" },
  { id: "screen", label: "Monitor", color: "#7c3aed" },
  { id: "spark", label: "Spark", color: "#db2777" }
];

export function accountPage() {
  const state = get();
  const profile = state.profile;
  const profiles = list();

  return `<div class="page-shell section account-page">
    <header class="page-head">
      <div>
        <p class="eyebrow">Local device profile</p>
        <h1>Profiles on this device</h1>
        <p class="lede">TechPro stores all progress directly on this computer. No server, no password, and no internet required. Multiple learners can use this computer with separate profiles.</p>
      </div>
      <div class="account-head-art" aria-hidden="true">${companionArt("happy", { size: 90 })}</div>
    </header>

    <div class="profile-grid-layout">
      <!-- Active Profile Card -->
      <section class="card card-pad account-card">
        <div class="section-head tight">
          <div>
            <p class="eyebrow">Active profile</p>
            <h2>${esc(profile.displayName || "Learner")}</h2>
          </div>
          <span class="tag tag-accent">Current</span>
        </div>

        <form class="account-form" data-profile-form>
          <label>
            Display name
            <input class="input" name="displayName" type="text" maxlength="40" value="${esc(profile.displayName || "")}" placeholder="Enter your name or nickname" required>
          </label>

          <label>
            Avatar color / icon
            <div class="avatar-picker" role="radiogroup" aria-label="Avatar choice">
              ${AVATAR_OPTIONS.map((opt) => `
                <label class="avatar-choice">
                  <input type="radio" name="avatar" value="${opt.id}" ${profile.avatar === opt.id || (!profile.avatar && opt.id === "chip") ? "checked" : ""}>
                  <span class="avatar-swatch" style="background:${opt.color}">${esc(opt.label.slice(0, 2))}</span>
                  <span class="tiny">${esc(opt.label)}</span>
                </label>
              `).join("")}
            </div>
          </label>

          <div class="cluster-2col">
            <label>
              Grade &amp; section <span class="tiny faint">(optional)</span>
              <input class="input" name="gradeSection" type="text" maxlength="30" value="${esc(profile.gradeSection || "")}" placeholder="e.g. 11-ICT A">
            </label>
            <label>
              School <span class="tiny faint">(optional)</span>
              <input class="input" name="school" type="text" maxlength="60" value="${esc(profile.school || "")}" placeholder="e.g. SDO Cavite">
            </label>
          </div>

          <button class="btn btn-primary" type="submit">${icon("check", 18)} Save profile details</button>
        </form>

        <p class="account-note">Profiles are stored only on this computer and browser. They are not password-protected.</p>
      </section>

      <!-- All Profiles on this Device -->
      <section class="card card-pad profiles-list-card">
        <div class="section-head tight">
          <div>
            <p class="eyebrow">Shared computer</p>
            <h2>Switch profile</h2>
          </div>
          <button class="btn btn-ghost btn-sm" type="button" data-new-profile>${icon("plus", 16)} Add learner</button>
        </div>

        <div class="device-profiles-list">
          ${profiles.map((p) => `
            <div class="device-profile-item ${p.isActive ? "is-active" : ""}">
              <div class="profile-item-info">
                <span class="avatar" style="background:var(--accent)">${esc((p.displayName || "L").slice(0, 2).toUpperCase())}</span>
                <div>
                  <strong>${esc(p.displayName || "Unnamed learner")}</strong>
                  <div class="tiny faint">
                    <span>${(p.xp || 0).toLocaleString()} XP</span> · 
                    <span>${p.stars || 0} ★</span>
                    ${p.isActive ? " · <em>Active now</em>" : ""}
                  </div>
                </div>
              </div>
              <div class="cluster">
                ${!p.isActive ? `<button class="btn btn-soft btn-sm" type="button" data-switch-to="${esc(p.id)}">Switch</button>` : ""}
                ${profiles.length > 1 ? `<button class="btn btn-ghost btn-sm text-danger" type="button" data-delete-profile="${esc(p.id)}" aria-label="Delete profile ${esc(p.displayName || "")}">${icon("trash", 16)}</button>` : ""}
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Backup & Restore -->
      <section class="card card-pad backup-card">
        <div class="section-head tight">
          <div>
            <p class="eyebrow">Move your progress</p>
            <h2>Backup &amp; restore</h2>
          </div>
        </div>
        <p>Save your progress to a file to take to another computer or hand in to your teacher on a USB drive.</p>
        <div class="cluster mt-3">
          <button class="btn btn-soft" type="button" data-download-backup>${icon("download", 18)} Download backup</button>
          <label class="btn btn-ghost" style="cursor:pointer">
            ${icon("upload", 18)} Restore from file
            <input type="file" accept=".json,application/json" data-restore-file hidden>
          </label>
        </div>
      </section>
    </div>
  </div>`;
}

export function mountAccount(root) {
  // Save profile changes
  const form = root.querySelector("[data-profile-form]");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const displayName = String(data.get("displayName") || "").trim();
    const avatar = String(data.get("avatar") || "chip");
    const gradeSection = String(data.get("gradeSection") || "").trim();
    const school = String(data.get("school") || "").trim();

    update((draft) => {
      draft.profile.displayName = displayName;
      draft.profile.avatar = avatar;
      draft.profile.gradeSection = gradeSection;
      draft.profile.school = school;
    }, { type: "profile-saved" });

    toast("Profile details saved.", "success");
  });

  // Switch profile
  root.querySelectorAll("[data-switch-to]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.switchTo;
      if (switchProfile(targetId)) {
        applySettings(get().settings);
        toast("Switched learner profile.", "success");
        // Re-render
        root.innerHTML = accountPage();
        mountAccount(root);
      }
    });
  });

  // Delete profile
  root.querySelectorAll("[data-delete-profile]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.deleteProfile;
      confirmDialog({
        title: "Delete this learner profile?",
        message: "All progress, XP, and badges for this profile on this computer will be permanently deleted. If you need it later, download a backup first.",
        confirmLabel: "Delete profile",
        onConfirm: () => {
          try {
            deleteProfile(targetId);
            toast("Profile removed.", "success");
            root.innerHTML = accountPage();
            mountAccount(root);
          } catch (err) {
            toast(err.message, "danger");
          }
        }
      });
    });
  });

  // Add new profile
  root.querySelector("[data-new-profile]")?.addEventListener("click", () => {
    const name = window.prompt("Enter new learner name or nickname:");
    if (!name || !name.trim()) return;
    createProfile({ displayName: name.trim() });
    toast(`Welcome, ${name.trim()}! Created new profile.`, "success");
    root.innerHTML = accountPage();
    mountAccount(root);
  });

  // Download backup
  root.querySelector("[data-download-backup]")?.addEventListener("click", () => {
    const state = get();
    const json = exportState();
    const cleanName = (state.profile.displayName || "learner").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const filename = `techpro-backup-${cleanName}-${new Date().toISOString().slice(0, 10)}.json`;
    downloadFile(filename, json, "application/json");
    toast("Backup downloaded! Keep it safe.", "success");
  });

  // Restore from file
  const restoreInput = root.querySelector("[data-restore-file]");
  restoreInput?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        importState(text);
        applySettings(get().settings);
        toast("Progress successfully restored!", "success");
        root.innerHTML = accountPage();
        mountAccount(root);
      } catch (err) {
        toast(`Could not restore: ${err.message}`, "danger");
      }
    };
    reader.readAsText(file);
    restoreInput.value = "";
  });
}
