/* ==========================================================================
   Teacher view — offline classroom tracking without a server.
   Teachers can import student backup files (e.g. from USB sticks), inspect
   completion tables, and export class summaries as safe CSVs.
   ========================================================================== */
import { esc, toast, downloadFile } from "../app/ui.js";
import { icon } from "../app/icons.js";
import { companionArt } from "../app/art.js";

let importedStudents = [];

function sanitizeForCsv(value) {
  let str = String(value ?? "").trim();
  // Prevent CSV injection: if cell starts with =, +, -, @, prepend a single quote
  if (/^[=+\-@]/.test(str)) {
    str = `'${str}`;
  }
  // Escape quotes
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function teacherPage() {
  return `<div class="page-shell section teacher-page">
    <header class="page-head">
      <div>
        <p class="eyebrow">Offline classroom tracking</p>
        <h1>Teacher class summary</h1>
        <p class="lede">Collect student backup files via USB stick or local sharing and import them here. Inspect class scores, activities completed, and export grade sheets as CSV.</p>
        <p class="tiny faint" role="note">No student data leaves this device. All records stay private in your browser.</p>
      </div>
      <div class="teacher-head-art" aria-hidden="true">${companionArt("happy", { size: 90 })}</div>
    </header>

    <div class="card card-pad teacher-controls-card">
      <div class="cluster" style="justify-content:space-between;align-items:center">
        <label class="btn btn-primary" style="cursor:pointer">
          ${icon("upload", 18)} Import student backups (.json)
          <input type="file" multiple accept=".json,application/json" data-teacher-files hidden>
        </label>
        <div class="cluster">
          <button class="btn btn-soft" type="button" data-export-csv ${importedStudents.length === 0 ? "disabled" : ""}>
            ${icon("download", 18)} Export class summary as CSV
          </button>
          <button class="btn btn-ghost btn-sm text-danger" type="button" data-clear-students ${importedStudents.length === 0 ? "disabled" : ""}>
            Clear records
          </button>
        </div>
      </div>
      <p class="tiny faint mt-2">Tip: Select multiple student JSON files at once using Ctrl+Click or Cmd+Click.</p>
    </div>

    <section class="card teacher-table-card mt-3">
      <div class="section-head card-pad tight">
        <div>
          <p class="eyebrow">Class records</p>
          <h2 data-student-count>${importedStudents.length} student record${importedStudents.length === 1 ? "" : "s"} loaded</h2>
        </div>
      </div>

      <div class="table-responsive">
        <table class="teacher-table" style="width:100%;border-collapse:collapse;text-align:left">
          <thead>
            <tr style="border-bottom:1px solid var(--line);background:var(--surface-2)">
              <th style="padding:0.75rem 1rem">Student name</th>
              <th style="padding:0.75rem 1rem">Grade &amp; Section</th>
              <th style="padding:0.75rem 1rem">XP</th>
              <th style="padding:0.75rem 1rem">Stars</th>
              <th style="padding:0.75rem 1rem">Exam Best</th>
              <th style="padding:0.75rem 1rem">Games Done</th>
              <th style="padding:0.75rem 1rem">Last Played</th>
            </tr>
          </thead>
          <tbody data-student-rows>
            ${renderRows()}
          </tbody>
        </table>
      </div>
    </section>
  </div>`;
}

function renderRows() {
  if (importedStudents.length === 0) {
    return `<tr><td colspan="7" style="padding:2rem;text-align:center;color:var(--text-muted)">
      No student backups imported yet. Click "Import student backups" to load student progress files.
    </td></tr>`;
  }

  return importedStudents.map((s) => `
    <tr style="border-bottom:1px solid var(--line)">
      <td style="padding:0.75rem 1rem;font-weight:600">${esc(s.name)}</td>
      <td style="padding:0.75rem 1rem">${esc(s.gradeSection || "—")}</td>
      <td style="padding:0.75rem 1rem">${s.xp.toLocaleString()} XP</td>
      <td style="padding:0.75rem 1rem">${s.stars} ★</td>
      <td style="padding:0.75rem 1rem">${s.examBest ? `${s.examBest}%` : "—"}</td>
      <td style="padding:0.75rem 1rem">${s.gamesDone}</td>
      <td style="padding:0.75rem 1rem" class="tiny faint">${esc(s.lastPlayed || "—")}</td>
    </tr>
  `).join("");
}

export function mountTeacher(root) {
  const fileInput = root.querySelector("[data-teacher-files]");
  const countEl = root.querySelector("[data-student-count]");
  const tbody = root.querySelector("[data-student-rows]");
  const csvBtn = root.querySelector("[data-export-csv]");
  const clearBtn = root.querySelector("[data-clear-students]");

  fileInput?.addEventListener("change", async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    let importedCount = 0;
    for (const file of files) {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const state = parsed.state || parsed;

        // Calculate fields
        const profile = state.profile || {};
        const progress = state.progress || {};
        const acts = progress.activities || {};

        let totalStars = 0;
        let gamesDone = 0;
        Object.values(acts).forEach((a) => {
          totalStars += (a.stars || 0);
          if (a.completed || (a.attempts || 0) > 0) gamesDone += 1;
        });

        // Exam best
        let examBest = 0;
        if (acts.final?.bestPercent) examBest = acts.final.bestPercent;
        else if (acts.pretest?.bestPercent) examBest = acts.pretest.bestPercent;

        // Last played date
        let lastPlayed = "";
        if (profile.lastActive) {
          lastPlayed = new Date(profile.lastActive).toLocaleDateString();
        } else if (parsed.exportedAt) {
          lastPlayed = new Date(parsed.exportedAt).toLocaleDateString();
        }

        const name = String(profile.displayName || file.name.replace(/\.json$/i, "")).slice(0, 50);

        // Add or update student record
        const existingIdx = importedStudents.findIndex((x) => x.name === name);
        const record = {
          name,
          gradeSection: String(profile.gradeSection || "").slice(0, 30),
          school: String(profile.school || "").slice(0, 60),
          xp: progress.xp || 0,
          stars: totalStars,
          examBest,
          gamesDone,
          lastPlayed
        };

        if (existingIdx >= 0) {
          importedStudents[existingIdx] = record;
        } else {
          importedStudents.push(record);
        }
        importedCount += 1;
      } catch (err) {
        console.warn(`Could not parse student file ${file.name}:`, err);
      }
    }

    if (importedCount > 0) {
      toast(`Successfully imported ${importedCount} student file${importedCount === 1 ? "" : "s"}.`, "success");
      if (countEl) countEl.textContent = `${importedStudents.length} student record${importedStudents.length === 1 ? "" : "s"} loaded`;
      if (tbody) tbody.innerHTML = renderRows();
      if (csvBtn) csvBtn.disabled = false;
      if (clearBtn) clearBtn.disabled = false;
    } else {
      toast("No valid TechPro student files could be imported.", "danger");
    }
    fileInput.value = "";
  });

  csvBtn?.addEventListener("click", () => {
    if (importedStudents.length === 0) return;

    const headers = ["Student Name", "Grade & Section", "School", "XP", "Stars", "Exam Best %", "Games Done", "Last Played"];
    const rows = importedStudents.map((s) => [
      sanitizeForCsv(s.name),
      sanitizeForCsv(s.gradeSection),
      sanitizeForCsv(s.school),
      sanitizeForCsv(s.xp),
      sanitizeForCsv(s.stars),
      sanitizeForCsv(s.examBest),
      sanitizeForCsv(s.gamesDone),
      sanitizeForCsv(s.lastPlayed)
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(","))
    ].join("\r\n");

    const dateStr = new Date().toISOString().slice(0, 10);
    downloadFile(`class-summary-${dateStr}.csv`, csvContent, "text/csv;charset=utf-8");
    toast("Class summary CSV downloaded.", "success");
  });

  clearBtn?.addEventListener("click", () => {
    importedStudents = [];
    if (countEl) countEl.textContent = "0 student records loaded";
    if (tbody) tbody.innerHTML = renderRows();
    if (csvBtn) csvBtn.disabled = true;
    if (clearBtn) clearBtn.disabled = true;
    toast("Records cleared.", "info");
  });
}
