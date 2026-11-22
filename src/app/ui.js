/* ==========================================================================
   Small UI helpers shared by every page and game.
   ========================================================================== */
import { icon } from "./icons.js";

export function esc(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function on(root, event, selector, handler) {
  const listener = (e) => {
    const target = e.target.closest(selector);
    if (target && root.contains(target)) handler(e, target);
  };
  root.addEventListener(event, listener);
  return () => root.removeEventListener(event, listener);
}

export function debounce(fn, wait = 220) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function initials(name = "Guest") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase() || "G";
}

export function avatarColor(seed = "guest") {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  return `hsl(${hash} 48% 38%)`;
}

export function avatarHtml(profile, size = "") {
  const name = profile?.displayName || "Guest";
  const cls = size ? `avatar ${size}` : "avatar";
  if (profile?.photoURL) {
    return `<span class="${cls}"><img src="${esc(profile.photoURL)}" alt="" width="48" height="48" loading="lazy"></span>`;
  }
  return `<span class="${cls}" style="background:${avatarColor(name)}" aria-hidden="true">${esc(initials(name))}</span>`;
}

export function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export function formatDate(value, opts = {}) {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric", ...opts });
}

export function relativeDay(value) {
  if (!value) return "never";
  const then = new Date(value);
  const now = new Date();
  const diff = Math.floor((now - then) / 86400000);
  if (diff <= 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff < 7) return `${diff} days ago`;
  return formatDate(value);
}

export function plural(count, one, many = `${one}s`) {
  return `${count} ${count === 1 ? one : many}`;
}

export function pct(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

/* ---------- Toasts ------------------------------------------------------ */
function toastStack() {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    stack.setAttribute("role", "status");
    stack.setAttribute("aria-live", "polite");
    document.body.append(stack);
  }
  return stack;
}

export function toast(message, type = "info", ms = 3400) {
  const stack = toastStack();
  const node = document.createElement("div");
  node.className = `toast ${type === "success" ? "toast-success" : type === "error" ? "toast-error" : ""}`;
  const glyph = type === "success" ? "checkCircle" : type === "error" ? "alert" : "info";
  node.innerHTML = `${icon(glyph, 18)}<span>${esc(message)}</span>`;
  stack.append(node);
  setTimeout(() => {
    node.style.opacity = "0";
    node.style.transform = "translateY(8px)";
    setTimeout(() => node.remove(), 220);
  }, ms);
  return node;
}

export function announce(message) {
  let region = document.getElementById("liveAnnouncer");
  if (!region) {
    region = document.createElement("div");
    region.id = "liveAnnouncer";
    region.className = "sr-only";
    region.setAttribute("aria-live", "polite");
    document.body.append(region);
  }
  region.textContent = "";
  setTimeout(() => { region.textContent = message; }, 40);
}

/* ---------- Dialogs ----------------------------------------------------- */
export function modal({
  title,
  body,
  actions = "",
  wide = false,
  sheet = false,
  onMount = null,
  label = "Dialog"
}) {
  const dialog = document.createElement("dialog");
  dialog.className = `modal${wide ? " modal-wide" : ""}${sheet ? " modal-sheet" : ""}`;
  dialog.setAttribute("aria-label", label);
  dialog.innerHTML = `
    <div class="modal-head">
      <h2 id="modalTitle" class="modal-title">${esc(title || "")}</h2>
      <button class="icon-button" type="button" data-close aria-label="Close dialog">${icon("x", 20)}</button>
    </div>
    <div class="modal-body">${body || ""}</div>
    ${actions ? `<div class="modal-foot">${actions}</div>` : ""}
  `;
  document.body.append(dialog);
  const close = () => {
    dialog.close();
    setTimeout(() => dialog.remove(), 180);
  };
  dialog.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) close();
    if (e.target === dialog) close();
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  dialog.showModal();
  document.body.classList.add("no-scroll");
  dialog.addEventListener("close", () => document.body.classList.remove("no-scroll"), { once: true });
  if (onMount) onMount(dialog, close);
  return { dialog, close };
}

export function confirmDialog({ title = "Are you sure?", message, confirmText = "Confirm", danger = false }) {
  return new Promise((resolve) => {
    let settled = false;
    const { dialog, close } = modal({
      title,
      body: `<p>${esc(message || "")}</p>`,
      actions: `<button class="btn btn-ghost" type="button" data-cancel>Cancel</button>
        <button class="btn ${danger ? "btn-danger" : "btn-primary"}" type="button" data-confirm>${esc(confirmText)}</button>`,
      label: title
    });
    dialog.addEventListener("click", (e) => {
      if (e.target.closest("[data-confirm]")) { settled = true; close(); resolve(true); }
      if (e.target.closest("[data-cancel]")) { settled = true; close(); resolve(false); }
    });
    dialog.addEventListener("close", () => { if (!settled) resolve(false); });
  });
}

/* ---------- Live region for game feedback ------------------------------- */
export function feedbackBox(el, { state = "hint", title = "", message = "" } = {}) {
  if (!el) return;
  el.className = `feedback is-visible is-${state}`;
  el.innerHTML = `${icon(state === "correct" ? "checkCircle" : state === "wrong" ? "xCircle" : "lightbulb", 20)}
    <div>${title ? `<strong>${esc(title)}</strong>` : ""}${message || ""}</div>`;
}

/* ---------- CSV / files ------------------------------------------------- */
export function downloadFile(filename, content, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function toCsv(rows) {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const text = String(cell == null ? "" : cell);
          return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
        })
        .join(",")
    )
    .join("\r\n");
}

/* ---------- Loading / empty --------------------------------------------- */
export function loadingBlock(label = "Loading…") {
  return `<div class="loading-block" role="status"><span class="spinner" aria-hidden="true"></span><p>${esc(label)}</p></div>`;
}

export function emptyState({ iconName = "search", title, message, action = "" }) {
  return `<div class="empty-state">${icon(iconName, 38)}<h3>${esc(title)}</h3><p>${esc(message)}</p>${action}</div>`;
}

/* ---------- Reading helpers --------------------------------------------- */
export function setPageTitle(title) {
  const includesBrand = title?.startsWith("TechPro ·") || title?.endsWith("· TechPro");
  document.title = title ? (includesBrand ? title : `${title} · TechPro`) : "TechPro · COC 1 Modules 1 & 2";
  const meta = document.querySelector('meta[name="description"]');
  if (meta && title) meta.setAttribute("content", `${title} — TechPro CSS NC II, Modules 1 and 2: assembly and BIOS/UEFI configuration.`);
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: document.documentElement.dataset.motion === "reduced" ? "auto" : "smooth" });
}

export function focusMain() {
  const main = document.getElementById("main");
  if (main) {
    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
  }
}
