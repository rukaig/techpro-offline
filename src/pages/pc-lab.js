/* ==========================================================================
   PC Lab page — thin wrapper around the self-contained 2D workbench game.
   The router calls mountPcLab(root) with no query, so the mode is read from
   the current hash here and handed to the game module.
   ========================================================================== */
import { pcLabPage as workbenchPage, mountPcLabWorkbench } from "../games/pc-lab-workbench.js";

export function pcLabPage({ query } = {}) {
  return workbenchPage({ query });
}

export function mountPcLab(root) {
  const hash = window.location.hash || "";
  const queryText = hash.includes("?")
    ? hash.slice(hash.indexOf("?"))
    : (window.location.search || "");
  return mountPcLabWorkbench(root, { query: new URLSearchParams(queryText) });
}
