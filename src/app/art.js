/* ==========================================================================
   Original SVG art: parts, companion, scenes and editorial card illustrations.
   Everything is inline so it follows the active theme tokens.
   ========================================================================== */

const partPaths = {
  cpu: `
    <rect x="26" y="26" width="68" height="68" rx="8" fill="var(--part-body, #2f5d50)"/>
    <rect x="38" y="38" width="44" height="44" rx="5" fill="var(--part-face, #f4efe5)"/>
    <rect x="48" y="48" width="24" height="24" rx="3" fill="var(--part-body, #2f5d50)"/>
    <g stroke="var(--part-body, #2f5d50)" stroke-width="5" stroke-linecap="round">
      <path d="M38 17v9M52 17v9M66 17v9M80 17v9M38 94v9M52 94v9M66 94v9M80 94v9"/>
      <path d="M17 38h9M17 52h9M17 66h9M17 80h9M94 38h9M94 52h9M94 66h9M94 80h9"/>
    </g>
    <path d="M29 29l10 10" stroke="var(--part-accent, #b3261e)" stroke-width="4" stroke-linecap="round"/>`,
  cooler: `
    <rect x="18" y="18" width="84" height="84" rx="7" fill="var(--part-body, #3b4a55)"/>
    <g stroke="var(--part-line, #cdd7dd)" stroke-width="3" opacity=".6">
      <path d="M27 27h66M27 37h66M27 47h66M27 57h66M27 67h66M27 77h66M27 87h66"/>
    </g>
    <circle cx="60" cy="60" r="28" fill="var(--part-face, #f4efe5)" opacity=".92"/>
    <g fill="var(--part-accent, #b3261e)">
      <path d="M60 43c8-5 17 2 12 10-3 5-9 6-12 7z"/>
      <path d="M77 60c5 8-2 17-10 12-5-3-6-9-7-12z"/>
      <path d="M60 77c-8 5-17-2-12-10 3-5 9-6 12-7z"/>
      <path d="M43 60c-5-8 2-17 10-12 5 3 6 9 7 12z"/>
    </g>
    <circle cx="60" cy="60" r="6" fill="var(--part-body, #3b4a55)"/>`,
  ram: `
    <rect x="10" y="38" width="100" height="44" rx="4" fill="var(--part-body, #2e5b4f)"/>
    <rect x="16" y="45" width="88" height="18" rx="2" fill="var(--part-face, #f4efe5)" opacity=".92"/>
    <g fill="var(--part-accent, #b3261e)">
      <rect x="22" y="49" width="8" height="10" rx="1"/><rect x="36" y="49" width="8" height="10" rx="1"/>
      <rect x="50" y="49" width="8" height="10" rx="1"/><rect x="64" y="49" width="8" height="10" rx="1"/>
      <rect x="78" y="49" width="8" height="10" rx="1"/><rect x="92" y="49" width="6" height="10" rx="1"/>
    </g>
    <g stroke="var(--part-line, #c9b58e)" stroke-width="4" stroke-linecap="round">
      <path d="M20 82v10M32 82v10M44 82v10M56 82v10M68 82v10M80 82v10M92 82v10M100 82v10"/>
    </g>
    <rect x="10" y="38" width="5" height="44" fill="var(--part-accent, #b3261e)"/>`,
  motherboard: `
    <rect x="14" y="14" width="92" height="92" rx="5" fill="var(--part-body, #2e5b4f)"/>
    <rect x="23" y="23" width="28" height="28" rx="3" fill="var(--part-face, #f4efe5)" opacity=".9"/>
    <rect x="62" y="23" width="14" height="42" rx="2" fill="var(--part-face, #f4efe5)" opacity=".75"/>
    <rect x="80" y="23" width="14" height="42" rx="2" fill="var(--part-face, #f4efe5)" opacity=".75"/>
    <rect x="23" y="62" width="46" height="9" rx="2" fill="var(--part-face, #f4efe5)" opacity=".7"/>
    <rect x="23" y="78" width="34" height="9" rx="2" fill="var(--part-face, #f4efe5)" opacity=".55"/>
    <g fill="var(--part-accent, #b3261e)">
      <circle cx="30" cy="30" r="4"/><circle cx="86" cy="82" r="3"/><circle cx="98" cy="26" r="3"/>
      <rect x="78" y="78" width="18" height="12" rx="1"/>
    </g>
    <g stroke="var(--part-face, #f4efe5)" stroke-width="2" opacity=".45">
      <path d="M30 52h22v-9M52 30h8M56 16v8M98 50v14h-18M75 90v8"/>
    </g>`,
  psu: `
    <rect x="12" y="30" width="96" height="60" rx="5" fill="var(--part-body, #3b4a55)"/>
    <circle cx="38" cy="60" r="20" fill="var(--part-face, #f4efe5)" opacity=".92"/>
    <circle cx="38" cy="60" r="13" fill="none" stroke="var(--part-body, #3b4a55)" stroke-width="2"/>
    <g fill="var(--part-body, #3b4a55)">
      <path d="M38 47c5-3 11 1 8 7-2 3-6 4-8 5zM51 60c3 5-1 11-7 8-3-2-4-6-5-8zM38 73c-5 3-11-1-8-7 2-3 6-4 8-5zM25 60c-3-5 1-11 7-8 3 2 4 6 5 8z"/>
    </g>
    <path d="M70 48h24M70 58h24M70 68h24" stroke="var(--part-face, #f4efe5)" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    <rect x="64" y="76" width="7" height="8" fill="var(--part-accent, #b3261e)"/><rect x="74" y="76" width="7" height="8" fill="var(--part-face, #f4efe5)"/>
    <rect x="84" y="76" width="7" height="8" fill="var(--part-accent, #b3261e)"/><rect x="94" y="76" width="7" height="8" fill="var(--part-face, #f4efe5)"/>`,
  storage: `
    <rect x="18" y="20" width="84" height="80" rx="5" fill="var(--part-body, #3b4a55)"/>
    <circle cx="60" cy="60" r="30" fill="var(--part-face, #f4efe5)" opacity=".9"/>
    <circle cx="60" cy="60" r="18" fill="none" stroke="var(--part-body, #3b4a55)" stroke-width="2"/>
    <circle cx="60" cy="60" r="5" fill="var(--part-body, #3b4a55)"/>
    <path d="M60 42v18l12 9" stroke="var(--part-accent, #b3261e)" stroke-width="3" stroke-linecap="round" fill="none"/>
    <circle cx="32" cy="30" r="4" fill="var(--part-accent, #b3261e)"/>
    <path d="M26 88h68" stroke="var(--part-face, #f4efe5)" stroke-width="3" opacity=".5"/>`,
  expansion: `
    <rect x="8" y="38" width="104" height="46" rx="3" fill="var(--part-body, #2e5b4f)"/>
    <rect x="16" y="45" width="56" height="24" rx="2" fill="var(--part-face, #f4efe5)" opacity=".88"/>
    <circle cx="44" cy="57" r="8" fill="var(--part-body, #2e5b4f)"/>
    <g stroke="var(--part-line, #c9b58e)" stroke-width="3" stroke-linecap="round">
      <path d="M33 78v7M41 78v7M49 78v7M57 78v7M65 78v7M73 78v7M81 78v7M89 78v7M97 78v7"/>
    </g>
    <rect x="18" y="34" width="60" height="3" fill="var(--part-accent, #b3261e)"/>
    <rect x="88" y="46" width="18" height="8" rx="1" fill="var(--part-accent, #b3261e)"/>`,
  monitor: `
    <rect x="10" y="20" width="100" height="63" rx="4" fill="var(--part-body, #3b4a55)"/>
    <rect x="18" y="28" width="84" height="47" rx="2" fill="var(--part-face, #f4efe5)" opacity=".9"/>
    <path d="M25 36h30M25 43h46M25 50h22" stroke="var(--part-body, #3b4a55)" stroke-width="3" stroke-linecap="round" opacity=".55"/>
    <rect x="42" y="83" width="36" height="8" rx="2" fill="var(--part-body, #3b4a55)"/>
    <path d="M34 98h52" stroke="var(--part-body, #3b4a55)" stroke-width="5" stroke-linecap="round"/>`,
  keyboard: `
    <rect x="6" y="30" width="108" height="58" rx="5" fill="var(--part-body, #3b4a55)"/>
    <g fill="var(--part-face, #f4efe5)" opacity=".9">
      <rect x="14" y="38" width="8" height="8" rx="1"/><rect x="26" y="38" width="8" height="8" rx="1"/><rect x="38" y="38" width="8" height="8" rx="1"/><rect x="50" y="38" width="8" height="8" rx="1"/><rect x="62" y="38" width="8" height="8" rx="1"/><rect x="74" y="38" width="8" height="8" rx="1"/><rect x="86" y="38" width="8" height="8" rx="1"/><rect x="98" y="38" width="8" height="8" rx="1"/>
      <rect x="14" y="50" width="8" height="8" rx="1"/><rect x="26" y="50" width="8" height="8" rx="1"/><rect x="38" y="50" width="8" height="8" rx="1"/><rect x="50" y="50" width="8" height="8" rx="1"/><rect x="62" y="50" width="8" height="8" rx="1"/><rect x="74" y="50" width="8" height="8" rx="1"/><rect x="86" y="50" width="8" height="8" rx="1"/><rect x="98" y="50" width="8" height="8" rx="1"/>
      <rect x="14" y="62" width="8" height="8" rx="1"/><rect x="26" y="62" width="8" height="8" rx="1"/><rect x="38" y="62" width="8" height="8" rx="1"/><rect x="50" y="62" width="8" height="8" rx="1"/><rect x="62" y="62" width="8" height="8" rx="1"/><rect x="74" y="62" width="8" height="8" rx="1"/><rect x="86" y="62" width="8" height="8" rx="1"/><rect x="98" y="62" width="8" height="8" rx="1"/>
      <rect x="26" y="74" width="68" height="7" rx="1"/>
    </g>
    <rect x="14" y="74" width="8" height="7" rx="1" fill="var(--part-accent, #b3261e)"/>`,
  mouse: `
    <rect x="38" y="16" width="44" height="86" rx="22" fill="var(--part-body, #3b4a55)"/>
    <path d="M60 18v32" stroke="var(--part-face, #f4efe5)" stroke-width="3" opacity=".6"/>
    <rect x="54" y="30" width="12" height="6" rx="3" fill="var(--part-accent, #b3261e)"/>
    <ellipse cx="60" cy="62" rx="12" ry="18" fill="var(--part-face, #f4efe5)" opacity=".16"/>`,
  speaker: `
    <rect x="30" y="10" width="60" height="100" rx="5" fill="var(--part-body, #3b4a55)"/>
    <circle cx="60" cy="42" r="16" fill="var(--part-face, #f4efe5)" opacity=".85"/>
    <circle cx="60" cy="42" r="6" fill="var(--part-body, #3b4a55)"/>
    <circle cx="60" cy="78" r="10" fill="var(--part-face, #f4efe5)" opacity=".7"/>
    <circle cx="60" cy="78" r="3" fill="var(--part-body, #3b4a55)"/>`,
  printer: `
    <rect x="16" y="42" width="88" height="42" rx="4" fill="var(--part-body, #3b4a55)"/>
    <rect x="30" y="18" width="60" height="26" rx="2" fill="var(--part-face, #f4efe5)" opacity=".9"/>
    <path d="M30 30h60" stroke="var(--part-body, #3b4a55)" stroke-width="2" opacity=".4"/>
    <rect x="30" y="72" width="60" height="26" rx="2" fill="var(--part-face, #f4efe5)" opacity=".92"/>
    <path d="M38 80h44M38 87h32" stroke="var(--part-body, #3b4a55)" stroke-width="2" opacity=".5"/>
    <circle cx="94" cy="54" r="3" fill="var(--part-accent, #b3261e)"/>`,
  fan: `
    <rect x="16" y="16" width="88" height="88" rx="5" fill="var(--part-body, #3b4a55)"/>
    <circle cx="60" cy="60" r="36" fill="var(--part-face, #f4efe5)" opacity=".12"/>
    <g fill="var(--part-accent, #b3261e)" opacity=".9">
      <path d="M60 38c9-6 20 3 14 13-4 6-10 7-14 9z"/>
      <path d="M82 60c6 9-3 20-13 14-6-4-7-10-9-14z"/>
      <path d="M60 82c-9 6-20-3-14-13 4-6 10-7 14-9z"/>
      <path d="M38 60c-6-9 3-20 13-14 6 4 7 10 9 14z"/>
    </g>
    <circle cx="60" cy="60" r="8" fill="var(--part-body, #3b4a55)"/>
    <g stroke="var(--part-line, #c9b58e)" stroke-width="3" stroke-linecap="round"><path d="M20 106h80"/></g>`,
  thermal: `
    <rect x="30" y="22" width="60" height="88" rx="12" fill="var(--part-body, #e6e0d4)"/>
    <rect x="38" y="16" width="44" height="18" rx="5" fill="var(--part-accent, #b3261e)"/>
    <path d="M60 40v42" stroke="var(--part-body, #3b4a55)" stroke-width="3" opacity=".35"/>
    <path d="M48 58h24M48 68h24" stroke="var(--part-body, #3b4a55)" stroke-width="3" stroke-linecap="round" opacity=".35"/>
    <path d="M52 88c5 6 11 6 16 0" stroke="var(--part-accent, #b3261e)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  strap: `
    <path d="M20 22h58a12 12 0 0 1 0 24H40a12 12 0 0 0 0 24h58" fill="none" stroke="var(--part-body, #3b4a55)" stroke-width="14" stroke-linecap="round"/>
    <rect x="70" y="12" width="38" height="44" rx="8" fill="var(--part-face, #f4efe5)"/>
    <path d="M80 26h18M80 34h12M80 42h18" stroke="var(--part-body, #3b4a55)" stroke-width="3" stroke-linecap="round"/>
    <circle cx="30" cy="34" r="5" fill="var(--part-accent, #b3261e)"/>`,
  screws: `
    <rect x="14" y="36" width="92" height="62" rx="6" fill="var(--part-body, #3b4a55)"/>
    <rect x="22" y="28" width="76" height="14" rx="4" fill="var(--part-accent, #b3261e)"/>
    <g fill="var(--part-face, #f4efe5)">
      <circle cx="38" cy="60" r="7"/><circle cx="60" cy="66" r="7"/><circle cx="82" cy="58" r="7"/><circle cx="50" cy="84" r="7"/><circle cx="74" cy="86" r="7"/>
    </g>
    <g stroke="var(--part-body, #3b4a55)" stroke-width="2.5"><path d="M33 60h10M55 66h10M77 58h10M45 84h10M69 86h10"/></g>`,
  labels: `
    <path d="M28 14h56l18 18v74H28z" fill="var(--part-face, #f4efe5)" stroke="var(--part-body, #3b4a55)" stroke-width="4"/>
    <path d="M84 14v18h18" fill="none" stroke="var(--part-body, #3b4a55)" stroke-width="4"/>
    <g stroke="var(--part-body, #3b4a55)" stroke-width="3" stroke-linecap="round" opacity=".6"><path d="M40 50h40M40 62h40M40 74h26"/></g>
    <circle cx="70" cy="88" r="12" fill="var(--part-accent, #b3261e)"/>
    <path d="m65 88 4 4 7-8" stroke="var(--part-face, #f4efe5)" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  camera: `
    <rect x="12" y="34" width="96" height="60" rx="8" fill="var(--part-body, #3b4a55)"/>
    <path d="M40 34l8-12h24l8 12" fill="var(--part-body, #3b4a55)"/>
    <circle cx="60" cy="64" r="22" fill="var(--part-face, #f4efe5)" opacity=".9"/>
    <circle cx="60" cy="64" r="13" fill="var(--part-body, #3b4a55)"/>
    <circle cx="60" cy="64" r="6" fill="var(--part-accent, #b3261e)"/>
    <rect x="88" y="44" width="10" height="6" rx="2" fill="var(--part-accent, #b3261e)"/>`,
  motherboardChip: `
    <rect x="18" y="18" width="84" height="84" rx="6" fill="var(--part-body, #2e5b4f)"/>
    <rect x="32" y="32" width="34" height="34" rx="3" fill="var(--part-face, #f4efe5)" opacity=".9"/>
    <rect x="74" y="32" width="12" height="42" rx="2" fill="var(--part-face, #f4efe5)" opacity=".7"/>
    <circle cx="28" cy="82" r="5" fill="var(--part-accent, #b3261e)"/>`
};

export function partArt(id, { size = 64, className = "" } = {}) {
  const path = partPaths[id] || partPaths.motherboardChip;
  return `<svg class="part-art ${className}" width="${size}" height="${size}" viewBox="0 0 120 120" role="img" aria-hidden="true" focusable="false">${path}</svg>`;
}

/* --------------------------------------------------------------------------
   Companion: a friendly little processor with moods.
   -------------------------------------------------------------------------- */
const companionPalettes = {
  classic: ["#d7e5df", "#496e61", "#f7fbf9", "#2f7159", "#d88b87"],
  bubblegum: ["#f3bfd0", "#9d5572", "#fff5f8", "#cc5b88", "#df829d"],
  candy: ["#ffacd2", "#a52b70", "#fff8fc", "#007f9e", "#ee6f9e"],
  neon: ["#102b3b", "#25e6ff", "#07111d", "#36f1da", "#fa68d7"],
  blueprint: ["#174d79", "#ffd166", "#e7f5ff", "#f2ae45", "#8cc9ed"],
  pixel: ["#33334b", "#ffcd75", "#171827", "#38b764", "#ed8d65"],
  ember: ["#513f36", "#e8a86b", "#211b17", "#e2a36a", "#c8785d"],
  mint: ["#bce9da", "#287a70", "#f3fffb", "#0f766e", "#ee8d92"],
  mono: ["#000000", "#ffe600", "#000000", "#ffe600", "#ffffff"],
  rammy: ["#d5e0f7", "#5368a2", "#f5f7ff", "#7288cb", "#e48aa0"],
  fanny: ["#ffd7bc", "#a85836", "#fff8f1", "#e27b3d", "#e98a85"]
};

const companionSilhouettes = {
  classic: `<g class="buddy-pins" stroke="var(--buddy-line)" stroke-width="5" stroke-linecap="round">
      <path d="M48 34V18M72 34V18M96 34V18M120 34V18M48 142v-16M72 142v-16M96 142v-16M120 142v-16"/>
      <path d="M30 56H14M30 80H14M30 104H14M150 56h16M150 80h16M150 104h16"/>
    </g>
    <rect x="28" y="32" width="124" height="112" rx="30" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="5"/>
    <rect x="40" y="44" width="100" height="88" rx="22" fill="var(--buddy-screen)"/>`,
  bubblegum: `<path d="M44 123c-17-8-18-32-3-43-10-19 6-39 25-37 11-22 42-19 49-1 22-4 38 18 27 37 18 17 7 43-12 47-8 17-34 20-44 7-14 12-36 8-42-10Z" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="6"/>
    <ellipse cx="90" cy="87" rx="48" ry="38" fill="var(--buddy-screen)"/>`,
  candy: `<path d="M84 117v31q0 8 8 8t8-8v-31" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="5"/>
    <circle cx="90" cy="78" r="61" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="6"/>
    <circle cx="90" cy="78" r="45" fill="var(--buddy-screen)"/>
    <path d="M39 48q15-24 34-27M119 24q21 8 29 28" fill="none" stroke="var(--buddy-accent)" stroke-width="7" stroke-linecap="round"/>`,
  neon: `<path d="m48 28 82 0 29 29-8 53-32 31H55l-31-31-8-53z" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="6" stroke-linejoin="round"/>
    <rect x="39" y="49" width="102" height="62" rx="20" fill="var(--buddy-screen)" stroke="var(--buddy-accent)" stroke-width="4"/>
    <path d="M65 27V12m50 15V12M65 12h50" fill="none" stroke="var(--buddy-accent)" stroke-width="5" stroke-linecap="round"/>`,
  blueprint: `<path d="m53 104-18 44M91 102v48M128 104l18 44" fill="none" stroke="var(--buddy-line)" stroke-width="8" stroke-linecap="round"/>
    <circle cx="90" cy="76" r="57" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="6"/>
    <circle cx="90" cy="76" r="43" fill="var(--buddy-screen)" stroke="var(--buddy-accent)" stroke-width="3"/>
    <path d="M90 28v12M42 76h12M126 76h12M90 112v12" stroke="var(--buddy-accent)" stroke-width="3"/>`,
  pixel: `<path d="M48 25h24v10h36V25h24v20h11v18h10v37h-10v20h-18v12H65v-10H47v-12H34V97H23V61h13V45h12z" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="6" stroke-linejoin="miter"/>
    <path d="M49 48h82v67H49z" fill="var(--buddy-screen)"/>
    <rect x="63" y="21" width="10" height="10" fill="var(--buddy-accent)"/><rect x="112" y="128" width="10" height="10" fill="var(--buddy-accent)"/>`,
  ember: `<path d="m40 47 20-27h60l20 27-9 58H49z" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="6" stroke-linejoin="round"/>
    <path d="M50 49h80v52H50z" fill="var(--buddy-screen)"/>
    <path d="M86 106h10v29H76v8h42v-8H96v-29M65 146h64" fill="none" stroke="var(--buddy-line)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M82 15q8-11 16 0M63 27l-8-8M117 27l8-8" fill="none" stroke="var(--buddy-accent)" stroke-width="4" stroke-linecap="round"/>`,
  mint: `<path d="M45 31h90l-8 96q-2 17-18 17H71q-16 0-18-17z" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="6"/>
    <path d="M53 88h74l-4 40q-2 10-13 10H70q-11 0-13-10z" fill="var(--buddy-screen)"/>
    <path d="M88 31V16m0 12C63 10 54 28 58 45c16 0 25-9 30-17Zm3 1c24-24 39-10 33 8-16 5-27 1-33-8Z" fill="var(--buddy-accent)" stroke="var(--buddy-line)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M58 88h64" stroke="var(--buddy-accent)" stroke-width="4"/>`,
  mono: `<path d="M51 23h78l24 24v68l-24 24H51l-24-24V47z" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="8" stroke-linejoin="bevel"/>
    <path d="M48 47h84v68H48z" fill="var(--buddy-screen)" stroke="var(--buddy-line)" stroke-width="4"/>
    <path d="M40 39h12m76 0h12M40 123h12m76 0h12" stroke="var(--buddy-accent)" stroke-width="5"/>`,
  rammy: `<rect x="15" y="37" width="150" height="86" rx="14" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="6"/>
    <rect x="37" y="48" width="106" height="64" rx="8" fill="var(--buddy-screen)"/>
    <path d="M27 123v17m18-17v17m18-17v17m18-17v17m18-17v17m18-17v17m18-17v17m18-17v17" stroke="var(--buddy-accent)" stroke-width="5"/>
    <path d="M25 29h25m45 0h54" stroke="var(--buddy-line)" stroke-width="5" stroke-linecap="round"/>`,
  fanny: `<circle cx="90" cy="82" r="62" fill="var(--buddy-body)" stroke="var(--buddy-line)" stroke-width="6"/>
    <circle cx="90" cy="82" r="47" fill="var(--buddy-screen)"/>
    <path d="M88 76c-21-26-5-40 8-29 9 8 7 20 1 32 28-17 39 1 24 11-9 6-20 1-29-4 14 29-4 37-12 21-5-9 0-19 7-27-30 13-38-6-21-13 9-4 19 2 27 9Z" fill="var(--buddy-accent)" opacity=".55"/>
    <circle cx="90" cy="82" r="10" fill="var(--buddy-line)"/>
    <path d="M90 20V12m-50 26-7-6m100 6 7-6" stroke="var(--buddy-line)" stroke-width="5" stroke-linecap="round"/>`
};

export function companionArt(mood = "happy", { size = 140, className = "", skin } = {}) {
  const activeSkin = skin || document.documentElement.dataset.buddy || "classic";
  const [body, line, screen, accent, blush] = companionPalettes[activeSkin] || companionPalettes.classic;
  const style = `--buddy-body:${body};--buddy-line:${line};--buddy-screen:${screen};--buddy-face:${line};--buddy-accent:${accent};--buddy-blush:${blush}`;
  const eyes = {
    happy: `<circle cx="58" cy="72" r="7" fill="var(--buddy-face)"/><circle cx="102" cy="72" r="7" fill="var(--buddy-face)"/>`,
    thinking: `<circle cx="58" cy="72" r="6" fill="var(--buddy-face)"/><path d="M96 70h12" stroke="var(--buddy-face)" stroke-width="5" stroke-linecap="round"/>`,
    oops: `<path d="m51 65 14 14M65 65l-14 14M95 65l14 14M109 65l-14 14" stroke="var(--buddy-face)" stroke-width="5" stroke-linecap="round"/>`,
    celebrating: `<path d="m58 62 4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="var(--buddy-face)"/><path d="m102 62 4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="var(--buddy-face)"/>`,
    sleepy: `<path d="M49 72q9 9 18 0M93 72q9 9 18 0" stroke="var(--buddy-face)" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    proud: `<path d="M49 74q9-9 18 0M93 74q9-9 18 0" stroke="var(--buddy-face)" stroke-width="5" fill="none" stroke-linecap="round"/>`
  };
  const mouth = {
    happy: `<path d="M66 92q14 13 28 0" stroke="var(--buddy-face)" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    thinking: `<path d="M72 94h14" stroke="var(--buddy-face)" stroke-width="5" stroke-linecap="round"/>`,
    oops: `<path d="M66 98q7-8 14 0t14 0" stroke="var(--buddy-face)" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    celebrating: `<path d="M66 92q14 18 28 0z" fill="var(--buddy-face)"/>`,
    sleepy: `<path d="M72 95q8 5 16 0" stroke="var(--buddy-face)" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    proud: `<path d="M66 92q14 14 28 0" stroke="var(--buddy-face)" stroke-width="5" fill="none" stroke-linecap="round"/>`
  };
  const extras = mood === "thinking"
    ? `<circle cx="132" cy="36" r="5" fill="var(--buddy-line)"/><circle cx="145" cy="24" r="7" fill="var(--buddy-line)"/><circle cx="160" cy="10" r="10" fill="var(--buddy-line)"/>`
    : mood === "celebrating"
      ? `<path d="M24 28l4 10 10 2-8 7 2 10-8-5-9 5 2-10-7-7 10-2zM150 52l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="var(--buddy-accent)"/>`
      : mood === "oops"
        ? `<path d="M148 58c0 8-6 12-10 15 0-8 3-14 10-15z" fill="var(--buddy-accent)" opacity=".8"/>`
        : "";
  return `<svg class="companion-art companion-${mood} ${className}" style="${style}" width="${size}" height="${size}" viewBox="0 0 180 160" role="img" aria-label="TechPro study companion feeling ${mood}" focusable="false">
    ${companionSilhouettes[activeSkin] || companionSilhouettes.classic}
    <circle cx="42" cy="112" r="7" fill="var(--buddy-blush)" opacity=".7"/>
    <circle cx="138" cy="112" r="7" fill="var(--buddy-blush)" opacity=".7"/>
    ${eyes[mood] || eyes.happy}
    ${mouth[mood] || mouth.happy}
    <circle cx="43" cy="52" r="4" fill="var(--buddy-accent)"/>
    ${extras}
  </svg>`;
}

export function brandMark(size = 34) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <rect width="64" height="64" rx="13" fill="var(--ink)"/>
    <rect width="7" height="64" fill="var(--accent)"/>
    <rect x="17" y="17" width="32" height="32" rx="7" fill="var(--surface)"/>
    <rect x="23" y="24" width="20" height="18" rx="4" fill="var(--ink)"/>
    <circle cx="29" cy="32" r="2" fill="var(--surface)"/><circle cx="37" cy="32" r="2" fill="var(--surface)"/>
    <path d="M29 38q3 3 6 0" stroke="var(--surface)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </svg>`;
}

/* --------------------------------------------------------------------------
   Editorial card illustrations (no photographs required).
   -------------------------------------------------------------------------- */
export function cardArt(kind = "build", { className = "" } = {}) {
  const frame = (inner, label) => `<svg class="card-art-svg ${className}" viewBox="0 0 600 420" role="img" aria-label="${label}" focusable="false" preserveAspectRatio="xMidYMid slice">
    <rect width="600" height="420" fill="var(--art-bg, var(--surface-2))"/>
    ${inner}
  </svg>`;
  const art = {
    types: `
      <rect x="46" y="116" width="210" height="144" rx="8" fill="var(--art-ink, var(--ink))"/>
      <rect x="60" y="130" width="182" height="104" rx="3" fill="var(--art-paper, var(--surface))"/>
      <path d="M118 260h66M151 260v26M114 300h74" stroke="var(--art-ink, var(--ink))" stroke-width="8" stroke-linecap="round"/>
      <rect x="300" y="156" width="236" height="70" rx="8" fill="var(--art-accent, var(--accent))"/>
      <rect x="316" y="170" width="204" height="42" rx="3" fill="var(--art-paper, var(--surface))" opacity=".9"/>
      <rect x="286" y="226" width="264" height="16" rx="5" fill="var(--art-ink, var(--ink))"/>
      <rect x="300" y="286" width="96" height="50" rx="5" fill="var(--art-ink, var(--ink))" opacity=".8"/>
      <rect x="410" y="272" width="56" height="64" rx="8" fill="none" stroke="var(--art-ink, var(--ink))" stroke-width="5"/>
      <circle cx="438" cy="332" r="8" fill="var(--art-accent, var(--accent))"/>
      <path d="M505 118v44M483 140h44" stroke="var(--art-accent, var(--accent))" stroke-width="5" stroke-linecap="round"/>`,
    parts: `
      <rect x="118" y="92" width="364" height="236" rx="12" fill="var(--art-ink, var(--ink))" opacity=".92"/>
      <rect x="144" y="118" width="312" height="184" rx="5" fill="none" stroke="var(--art-paper, var(--surface))" stroke-width="3" opacity=".5"/>
      <rect x="172" y="146" width="76" height="76" rx="8" fill="var(--art-paper, var(--surface))"/>
      <rect x="188" y="162" width="44" height="44" rx="5" fill="var(--art-accent, var(--accent))"/>
      <rect x="276" y="146" width="26" height="110" rx="5" fill="var(--art-paper, var(--surface))" opacity=".85"/>
      <rect x="318" y="146" width="26" height="110" rx="5" fill="var(--art-paper, var(--surface))" opacity=".85"/>
      <rect x="172" y="248" width="150" height="20" rx="5" fill="var(--art-accent, var(--accent))"/>
      <rect x="172" y="278" width="96" height="14" rx="4" fill="var(--art-paper, var(--surface))" opacity=".5"/>
      <circle cx="408" cy="276" r="30" fill="var(--art-accent, var(--accent))"/>
      <circle cx="408" cy="276" r="12" fill="var(--art-ink, var(--ink))"/>
      <path d="M70 70h40M90 50v40M492 342h40M512 322v40" stroke="var(--art-accent, var(--accent))" stroke-width="4" stroke-linecap="round"/>`,
    software: `
      <rect x="94" y="86" width="300" height="220" rx="12" fill="var(--art-paper, var(--surface))" stroke="var(--art-ink, var(--ink))" stroke-width="6"/>
      <rect x="94" y="86" width="300" height="46" rx="12" fill="var(--art-ink, var(--ink))"/>
      <circle cx="122" cy="109" r="7" fill="var(--art-accent, var(--accent))"/><circle cx="146" cy="109" r="7" fill="var(--art-paper, var(--surface))" opacity=".6"/><circle cx="170" cy="109" r="7" fill="var(--art-paper, var(--surface))" opacity=".3"/>
      <rect x="124" y="160" width="116" height="16" rx="5" fill="var(--art-ink, var(--ink))" opacity=".8"/>
      <rect x="124" y="190" width="210" height="11" rx="4" fill="var(--art-ink, var(--ink))" opacity=".28"/>
      <rect x="124" y="212" width="170" height="11" rx="4" fill="var(--art-ink, var(--ink))" opacity=".28"/>
      <rect x="124" y="250" width="86" height="30" rx="15" fill="var(--art-accent, var(--accent))"/>
      <rect x="338" y="150" width="168" height="130" rx="12" fill="var(--art-bg, var(--surface-2))" stroke="var(--art-accent, var(--accent))" stroke-width="5"/>
      <path d="M372 186h98M372 208h68M372 230h84M372 252h48" stroke="var(--art-ink, var(--ink))" stroke-width="7" stroke-linecap="round" opacity=".55"/>
      <path d="M452 330l22-22 14 14-22 22h-14z" fill="var(--art-accent, var(--accent))"/>`,
    safety: `
      <path d="M300 62l124 38v94c0 78-52 130-124 154-72-24-124-76-124-154V100z" fill="var(--art-ink, var(--ink))"/>
      <path d="M300 94l94 28v70c0 58-38 98-94 118-56-20-94-60-94-118v-70z" fill="var(--art-paper, var(--surface))" opacity=".14"/>
      <path d="m256 208 32 32 64-72" stroke="var(--art-accent, var(--accent))" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M72 90v60M42 120h60" stroke="var(--art-accent, var(--accent))" stroke-width="5" stroke-linecap="round"/>
      <path d="M512 318v56M484 346h56" stroke="var(--art-accent, var(--accent))" stroke-width="5" stroke-linecap="round"/>`,
    build: `
      <rect x="176" y="82" width="220" height="280" rx="8" fill="var(--art-ink, var(--ink))"/>
      <rect x="198" y="104" width="176" height="226" rx="3" fill="var(--art-paper, var(--surface))" opacity=".13"/>
      <rect x="220" y="130" width="78" height="78" rx="7" fill="var(--art-paper, var(--surface))"/>
      <rect x="234" y="144" width="50" height="50" rx="4" fill="var(--art-accent, var(--accent))"/>
      <rect x="316" y="130" width="20" height="94" rx="4" fill="var(--art-paper, var(--surface))" opacity=".7"/>
      <rect x="344" y="130" width="20" height="94" rx="4" fill="var(--art-paper, var(--surface))" opacity=".7"/>
      <circle cx="256" cy="256" r="24" fill="none" stroke="var(--art-paper, var(--surface))" stroke-width="7"/>
      <path d="M256 240v16l12 8" stroke="var(--art-paper, var(--surface))" stroke-width="5" stroke-linecap="round"/>
      <path d="M220 320h100" stroke="var(--art-accent, var(--accent))" stroke-width="8" stroke-linecap="round"/>
      <path d="M430 212l64-64 22 22-64 64h-22z" fill="var(--art-accent, var(--accent))"/>
      <path d="M474 118l22-22 22 22-22 22z" fill="var(--art-paper, var(--surface))" stroke="var(--art-ink, var(--ink))" stroke-width="4"/>
      <path d="M90 320h72M126 284v72" stroke="var(--art-accent, var(--accent))" stroke-width="5" stroke-linecap="round"/>`,
    exam: `
      <rect x="146" y="66" width="308" height="300" rx="8" fill="var(--art-paper, var(--surface))" stroke="var(--art-ink, var(--ink))" stroke-width="6"/>
      <path d="M400 66v78h-78" fill="var(--art-bg, var(--surface-2))" stroke="var(--art-ink, var(--ink))" stroke-width="6"/>
      <path d="M196 150h130M196 186h180M196 222h150M196 258h120" stroke="var(--art-ink, var(--ink))" stroke-width="9" stroke-linecap="round" opacity=".38"/>
      <circle cx="392" cy="300" r="56" fill="var(--art-accent, var(--accent))"/>
      <path d="m366 300 18 18 34-40" stroke="var(--art-paper, var(--surface))" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M76 110v58M47 139h58" stroke="var(--art-accent, var(--accent))" stroke-width="5" stroke-linecap="round"/>`,
    remember: `
      <rect x="132" y="112" width="196" height="220" rx="6" fill="var(--art-paper, var(--surface))" stroke="var(--art-ink, var(--ink))" stroke-width="6" transform="rotate(-6 230 222)"/>
      <rect x="206" y="92" width="206" height="236" rx="6" fill="var(--art-bg, var(--surface-2))" stroke="var(--art-ink, var(--ink))" stroke-width="6" transform="rotate(4 309 210)"/>
      <path d="M252 150h108M266 186h124M252 222h96M270 258h110" stroke="var(--art-accent, var(--accent))" stroke-width="7" stroke-linecap="round" opacity=".72"/>
      <circle cx="450" cy="118" r="34" fill="var(--art-accent, var(--accent))"/>
      <path d="m434 118 12 12 22-26" stroke="var(--art-paper, var(--surface))" stroke-width="8" fill="none" stroke-linecap="round"/>`,
    casefile: `
      <path d="M132 126h122l22 30h192v192H132z" fill="var(--art-ink, var(--ink))"/>
      <path d="M132 170h336v178H132z" fill="var(--art-paper, var(--surface))" opacity=".16"/>
      <circle cx="410" cy="270" r="58" fill="none" stroke="var(--art-accent, var(--accent))" stroke-width="12"/>
      <path d="m452 314 46 46" stroke="var(--art-accent, var(--accent))" stroke-width="16" stroke-linecap="round"/>
      <path d="M196 220h150M196 252h108M196 284h132" stroke="var(--art-paper, var(--surface))" stroke-width="8" stroke-linecap="round" opacity=".55"/>`
  };
  const labels = {
    types: "Illustration of desktop, laptop and tablet computers",
    parts: "Illustration of a computer case with internal parts",
    software: "Illustration of application windows",
    safety: "Illustration of a safety shield",
    build: "Illustration of a PC build and screwdriver",
    exam: "Illustration of a marked exam paper",
    remember: "Illustration of summary notes",
    casefile: "Illustration of a case file and magnifying glass"
  };
  return frame(art[kind] || art.build, labels[kind] || "TechPro illustration");
}

/* --------------------------------------------------------------------------
   PC Lab case scene. Zones are HTML buttons positioned over this drawing.
   -------------------------------------------------------------------------- */
export function caseScene({ mode = "assembly" } = {}) {
  return `<svg class="case-svg" viewBox="0 0 1000 720" role="img" aria-label="An open desktop computer case on a workbench" focusable="false">
    <defs>
      <linearGradient id="caseMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="var(--case-light, #4a5660)"/>
        <stop offset="1" stop-color="var(--case-dark, #262e34)"/>
      </linearGradient>
      <linearGradient id="trayMetal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--case-inner, #33404a)"/>
        <stop offset="1" stop-color="var(--case-inner-deep, #20282e)"/>
      </linearGradient>
      <pattern id="vent" width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="6" cy="6" r="2.2" fill="var(--case-vent, #131a1e)" opacity=".7"/>
      </pattern>
    </defs>
    <rect width="1000" height="720" fill="none"/>
    <ellipse cx="500" cy="672" rx="410" ry="30" fill="var(--ink)" opacity=".13"/>
    <path d="M140 646h740" stroke="var(--line-strong)" stroke-width="3" opacity=".5"/>
    <g>
      <path d="M214 74h604a18 18 0 0 1 18 18v516a18 18 0 0 1-18 18H214a18 18 0 0 1-18-18V92a18 18 0 0 1 18-18z" fill="url(#caseMetal)" stroke="var(--case-edge, #131a1e)" stroke-width="6"/>
      <path d="M240 98h552v488H240z" fill="url(#trayMetal)" stroke="var(--case-edge, #131a1e)" stroke-width="4"/>
      <path d="M240 98h552v18H240z" fill="var(--case-edge, #131a1e)" opacity=".4"/>
      <g fill="none" stroke="var(--case-line, #8a9aa5)" stroke-width="2.5" opacity=".45">
        <path d="M256 116v452M776 116v452"/>
        <path d="M240 500h552"/>
      </g>
      <!-- drive cage -->
      <g>
        <rect x="652" y="120" width="132" height="214" rx="4" fill="var(--case-cage, #28323a)" stroke="var(--case-edge, #131a1e)" stroke-width="3"/>
        <rect x="664" y="132" width="108" height="52" rx="3" fill="var(--case-slot, #171e23)" stroke="var(--case-line, #8a9aa5)" stroke-width="1.5" opacity=".8"/>
        <rect x="664" y="194" width="108" height="52" rx="3" fill="var(--case-slot, #171e23)" stroke="var(--case-line, #8a9aa5)" stroke-width="1.5" opacity=".8"/>
        <rect x="664" y="256" width="108" height="52" rx="3" fill="var(--case-slot, #171e23)" stroke="var(--case-line, #8a9aa5)" stroke-width="1.5" opacity=".8"/>
        <circle cx="704" cy="158" r="3" fill="var(--case-line, #8a9aa5)"/><circle cx="704" cy="220" r="3" fill="var(--case-line, #8a9aa5)"/><circle cx="704" cy="282" r="3" fill="var(--case-line, #8a9aa5)"/>
      </g>
      <!-- motherboard tray area -->
      <rect x="274" y="138" width="356" height="330" rx="8" fill="var(--case-board, #1b2a24)" stroke="var(--case-line, #8a9aa5)" stroke-width="2" opacity=".9"/>
      <g fill="var(--case-hole, #0d1216)" stroke="var(--case-line, #8a9aa5)" stroke-width="2">
        <circle cx="300" cy="164" r="7"/><circle cx="604" cy="164" r="7"/><circle cx="300" cy="442" r="7"/><circle cx="604" cy="442" r="7"/><circle cx="452" cy="164" r="7"/><circle cx="452" cy="442" r="7"/>
      </g>
      <!-- PSU bay -->
      <rect x="274" y="514" width="208" height="72" rx="4" fill="var(--case-bay, #222b31)" stroke="var(--case-edge, #131a1e)" stroke-width="3"/>
      <rect x="286" y="526" width="184" height="48" rx="2" fill="url(#vent)" opacity=".55"/>
      <!-- expansion slots -->
      <g fill="var(--case-slot, #171e23)" stroke="var(--case-line, #8a9aa5)" stroke-width="1.5" opacity=".9">
        <rect x="274" y="476" width="356" height="14" rx="2"/>
        <rect x="274" y="494" width="356" height="14" rx="2"/>
      </g>
      <!-- front panel -->
      <rect x="782" y="520" width="28" height="64" rx="3" fill="var(--case-slot, #171e23)" stroke="var(--case-line, #8a9aa5)" stroke-width="1.5"/>
      <circle cx="796" cy="540" r="5" fill="var(--accent)"/>
      <circle cx="796" cy="562" r="3" fill="var(--case-line, #8a9aa5)"/>
      <!-- side panel leaning on the right -->
      ${mode === "assembly" ? `<g opacity=".92"><rect x="840" y="112" width="72" height="426" rx="6" fill="url(#caseMetal)" stroke="var(--case-edge, #131a1e)" stroke-width="5" transform="rotate(6 876 325)"/><rect x="854" y="140" width="44" height="120" rx="3" fill="url(#vent)" opacity=".6" transform="rotate(6 876 325)"/></g>` : ""}
    </g>
    <g class="case-labels" font-family="var(--font-mono)" font-size="13" fill="var(--case-label, #b8c7d1)" opacity=".75">
      <text x="286" y="128">CPU / BOARD TRAY</text>
      <text x="662" y="352">DRIVE BAYS</text>
      <text x="286" y="606">PSU BAY</text>
      <text x="500" y="690" text-anchor="middle">WORKBENCH · ANTI-STATIC MAT</text>
    </g>
  </svg>`;
}

/* --------------------------------------------------------------------------
   Spot-the-Mistake workstation scene.
   -------------------------------------------------------------------------- */
export function workstationScene() {
  return `<svg class="scene-svg" viewBox="0 0 1000 660" role="img" aria-label="Alex's workstation: a computer still plugged in, an open case, screws on the table edge, a metal bracelet, RAM held by its gold contacts, and no notes or photos." focusable="false">
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--scene-wall, #f0e7d8)"/><stop offset="1" stop-color="var(--scene-wall-2, #e4d7c3)"/></linearGradient>
      <linearGradient id="desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--scene-desk, #b98a5e)"/><stop offset="1" stop-color="var(--scene-desk-2, #986b44)"/></linearGradient>
    </defs>
    <rect width="1000" height="660" fill="url(#wall)"/>
    <path d="M0 470h1000v190H0z" fill="url(#desk)"/>
    <path d="M0 470h1000v14H0z" fill="var(--ink)" opacity=".18"/>
    <!-- outlet -->
    <rect x="782" y="208" width="92" height="118" rx="8" fill="var(--scene-outlet, #efe9dc)" stroke="var(--ink)" stroke-width="4"/>
    <circle cx="812" cy="246" r="7" fill="var(--ink)"/><circle cx="844" cy="246" r="7" fill="var(--ink)"/>
    <circle cx="812" cy="286" r="7" fill="var(--ink)"/><circle cx="844" cy="286" r="7" fill="var(--ink)"/>
    <path d="M810 326c-8 54-80 42-118 54" stroke="var(--ink)" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M692 380l-18 18 22 14" stroke="var(--ink)" stroke-width="7" fill="none" stroke-linecap="round"/>
    <!-- desk items: screws on edge -->
    <g fill="var(--scene-metal, #aab4bc)" stroke="var(--ink)" stroke-width="2">
      <circle cx="656" cy="520" r="8"/><circle cx="682" cy="532" r="8"/><circle cx="638" cy="544" r="8"/><circle cx="704" cy="548" r="8"/>
    </g>
    <path d="M620 500h110" stroke="var(--ink)" stroke-width="3" stroke-dasharray="6 8" opacity=".4"/>
    <!-- monitor on left, dark -->
    <rect x="92" y="184" width="248" height="158" rx="8" fill="var(--ink)"/>
    <rect x="108" y="200" width="216" height="126" rx="3" fill="var(--scene-screen, #1a2a33)"/>
    <path d="M196 342h40M216 342v40M176 382h80" stroke="var(--ink)" stroke-width="9" stroke-linecap="round"/>
    <!-- open computer case -->
    <g transform="translate(360 196)">
      <path d="M34 0h252a12 12 0 0 1 12 12v278a12 12 0 0 1-12 12H34a12 12 0 0 1-12-12V12A12 12 0 0 1 34 0z" fill="var(--scene-case, #39444c)" stroke="var(--ink)" stroke-width="5"/>
      <rect x="36" y="18" width="240" height="260" rx="4" fill="var(--scene-case-inner, #202a30)"/>
      <rect x="54" y="34" width="160" height="138" rx="4" fill="var(--scene-board, #294438)" stroke="var(--scene-metal, #aab4bc)" stroke-width="2"/>
      <rect x="226" y="34" width="40" height="112" rx="3" fill="var(--scene-metal, #aab4bc)" opacity=".6"/>
      <rect x="54" y="190" width="96" height="18" rx="2" fill="var(--scene-metal, #aab4bc)" opacity=".6"/>
      <rect x="54" y="218" width="150" height="22" rx="2" fill="var(--scene-metal, #aab4bc)" opacity=".3"/>
      <circle cx="90" cy="76" r="18" fill="none" stroke="var(--scene-metal, #aab4bc)" stroke-width="5"/>
      <path d="M78 64l24 24M102 64L78 88" stroke="var(--scene-metal, #aab4bc)" stroke-width="3"/>
      <rect x="238" y="172" width="28" height="72" rx="3" fill="var(--scene-accent, #b3261e)" opacity=".7"/>
      <path d="M246 172v72" stroke="var(--ink)" stroke-width="2" opacity=".4"/>
    </g>
    <!-- technician -->
    <g transform="translate(720 262)">
      <circle cx="48" cy="46" r="34" fill="var(--scene-skin, #d7a177)"/>
      <path d="M18 42a32 32 0 0 1 60-10c-18 4-38 4-60 10z" fill="var(--scene-hair, #2b201a)"/>
      <rect x="20" y="84" width="62" height="120" rx="19" fill="var(--scene-shirt, #4c6b86)"/>
      <path d="M30 96 4 178M74 96l34 60" stroke="var(--scene-shirt, #4c6b86)" stroke-width="22" stroke-linecap="round"/>
      <path d="M0 184l18 18M92 158l30 8" stroke="var(--scene-skin, #d7a177)" stroke-width="15" stroke-linecap="round"/>
      <!-- metal bracelet -->
      <rect x="26" y="172" width="30" height="12" rx="5" fill="var(--scene-metal, #aab4bc)" stroke="var(--ink)" stroke-width="2"/>
      <!-- RAM held by gold contacts -->
      <g transform="translate(-42 150) rotate(-14)">
        <rect width="98" height="34" rx="3" fill="var(--scene-board, #294438)"/>
        <rect x="14" y="7" width="70" height="12" fill="var(--scene-metal, #aab4bc)" opacity=".7"/>
        <g stroke="var(--scene-gold, #d6a72f)" stroke-width="3"><path d="M18 30v6M28 30v6M38 30v6M48 30v6M58 30v6M68 30v6M78 30v6M88 30v6"/></g>
      </g>
    </g>
    <!-- no photo/notes: empty desk space with a faint missing mark -->
    <g opacity=".45">
      <rect x="560" y="424" width="132" height="84" rx="4" fill="none" stroke="var(--ink)" stroke-width="3" stroke-dasharray="8 9"/>
      <path d="M598 456h56M598 474h38" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 9"/>
    </g>
    <!-- dust / ESD sparks -->
    <path d="M664 300l8 18 18 8-18 8-8 18-8-18-18-8 18-8z" fill="var(--scene-accent, #b3261e)" opacity=".6"/>
    <path d="M146 152l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill="var(--scene-accent, #b3261e)" opacity=".35"/>
  </svg>`;
}

/* --------------------------------------------------------------------------
   PC Anatomy Explorer scene.
   -------------------------------------------------------------------------- */
export function anatomyScene() {
  return `<svg class="scene-svg" viewBox="0 0 1000 660" role="img" aria-label="An exploded desktop computer diagram with monitor, keyboard, mouse, speakers, printer and tower components" focusable="false">
    <defs>
      <pattern id="anatGrid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0v28" fill="none" stroke="var(--line)" stroke-width="1" opacity=".45"/></pattern>
    </defs>
    <rect width="1000" height="660" fill="url(#anatGrid)" opacity=".6"/>
    <!-- monitor -->
    <rect x="60" y="96" width="280" height="180" rx="10" fill="var(--ink)"/>
    <rect x="76" y="112" width="248" height="148" rx="3" fill="var(--surface)" opacity=".9"/>
    <path d="M174 276h52M200 276v42M152 318h96" stroke="var(--ink)" stroke-width="10" stroke-linecap="round"/>
    <path d="M100 142h92M100 166h150M100 190h120M100 214h72" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" opacity=".45"/>
    <!-- keyboard -->
    <rect x="58" y="390" width="280" height="82" rx="9" fill="var(--ink)"/>
    <g fill="var(--surface)" opacity=".85">
      <rect x="74" y="404" width="18" height="14" rx="2"/><rect x="98" y="404" width="18" height="14" rx="2"/><rect x="122" y="404" width="18" height="14" rx="2"/><rect x="146" y="404" width="18" height="14" rx="2"/><rect x="170" y="404" width="18" height="14" rx="2"/><rect x="194" y="404" width="18" height="14" rx="2"/><rect x="218" y="404" width="18" height="14" rx="2"/><rect x="242" y="404" width="18" height="14" rx="2"/><rect x="266" y="404" width="18" height="14" rx="2"/><rect x="290" y="404" width="34" height="14" rx="2"/>
      <rect x="74" y="426" width="18" height="14" rx="2"/><rect x="98" y="426" width="18" height="14" rx="2"/><rect x="122" y="426" width="18" height="14" rx="2"/><rect x="146" y="426" width="18" height="14" rx="2"/><rect x="170" y="426" width="18" height="14" rx="2"/><rect x="194" y="426" width="18" height="14" rx="2"/><rect x="218" y="426" width="18" height="14" rx="2"/><rect x="242" y="426" width="18" height="14" rx="2"/><rect x="266" y="426" width="18" height="14" rx="2"/><rect x="290" y="426" width="34" height="14" rx="2"/>
      <rect x="100" y="448" width="196" height="10" rx="2"/>
    </g>
    <!-- mouse -->
    <rect x="372" y="412" width="62" height="94" rx="31" fill="var(--ink)"/>
    <path d="M403 414v34" stroke="var(--surface)" stroke-width="4" opacity=".6"/>
    <rect x="396" y="430" width="14" height="8" rx="4" fill="var(--accent)"/>
    <!-- speakers -->
    <rect x="58" y="508" width="72" height="118" rx="8" fill="var(--ink)"/>
    <circle cx="94" cy="548" r="20" fill="var(--surface)" opacity=".8"/><circle cx="94" cy="548" r="7" fill="var(--ink)"/>
    <circle cx="94" cy="596" r="13" fill="var(--surface)" opacity=".55"/><circle cx="94" cy="596" r="4" fill="var(--ink)"/>
    <!-- printer -->
    <rect x="700" y="470" width="236" height="104" rx="8" fill="var(--ink)"/>
    <rect x="730" y="434" width="158" height="46" rx="4" fill="var(--surface)" opacity=".9"/>
    <rect x="742" y="520" width="152" height="40" rx="3" fill="var(--surface)" opacity=".85"/>
    <path d="M760 534h116M760 546h84" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" opacity=".5"/>
    <!-- tower -->
    <rect x="560" y="86" width="330" height="342" rx="10" fill="var(--ink)"/>
    <rect x="578" y="104" width="294" height="306" rx="4" fill="var(--surface)" opacity=".1"/>
    <rect x="598" y="124" width="168" height="176" rx="4" fill="var(--surface)" opacity=".18" stroke="var(--surface)" stroke-width="2"/>
    <rect x="620" y="146" width="58" height="58" rx="5" fill="var(--surface)" opacity=".85"/>
    <rect x="632" y="158" width="34" height="34" rx="3" fill="var(--accent)"/>
    <rect x="698" y="146" width="18" height="88" rx="3" fill="var(--surface)" opacity=".7"/>
    <rect x="724" y="146" width="18" height="88" rx="3" fill="var(--surface)" opacity=".7"/>
    <rect x="620" y="232" width="90" height="14" rx="3" fill="var(--accent)" opacity=".7"/>
    <rect x="620" y="256" width="64" height="10" rx="3" fill="var(--surface)" opacity=".4"/>
    <circle cx="668" cy="242" r="36" fill="none" stroke="var(--surface)" stroke-width="9" opacity=".55"/>
    <path d="M668 226v14l10 7" stroke="var(--surface)" stroke-width="5" stroke-linecap="round"/>
    <rect x="596" y="322" width="212" height="24" rx="3" fill="var(--surface)" opacity=".3"/>
    <rect x="596" y="354" width="120" height="44" rx="4" fill="var(--surface)" opacity=".2"/>
    <rect x="742" y="312" width="110" height="92" rx="4" fill="var(--surface)" opacity=".18"/>
    <!-- callout dots -->
    <g fill="var(--accent)">
      <circle cx="200" cy="186" r="7"/><circle cx="200" cy="430" r="7"/><circle cx="403" cy="454" r="7"/><circle cx="94" cy="566" r="7"/><circle cx="818" cy="520" r="7"/>
      <circle cx="649" cy="175" r="7"/><circle cx="712" cy="190" r="7"/><circle cx="50" cy="50" r="0"/>
    </g>
  </svg>`;
}

/* --------------------------------------------------------------------------
   Small decorative pieces
   -------------------------------------------------------------------------- */
export function spoolArt() {
  return `<svg viewBox="0 0 300 160" aria-hidden="true" class="spool-art" focusable="false">
    <path d="M28 128c32-56 72-84 122-84s90 28 122 84" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 10"/>
    <circle cx="150" cy="120" r="22" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/>
    <circle cx="150" cy="120" r="7" fill="var(--accent)"/>
  </svg>`;
}

export const PART_ART_IDS = Object.keys(partPaths);
