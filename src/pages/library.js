/* ==========================================================================
   Library index and lesson reader.
   ========================================================================== */
import { LESSONS, GOALS, lessonById, neighbours, searchLessons } from "../data/lessons.js";
import { LESSON_CHECKS } from "../data/quiz.js";
import { GLOSSARY, GLOSSARY_BY_ID, glossaryForLesson, searchGlossary } from "../data/glossary.js";
import { ACTIVITIES } from "../data/activities.js";
import { get } from "../services/store.js";
import {
  isLessonRead, isBookmarked, toggleBookmark, markLessonRead, lessonSectionRead,
  getNote, saveNote, markLessonUnread
} from "../services/progress.js";
import { icon, stars } from "../app/icons.js";
import { cardArt } from "../app/art.js";
import { esc, modal, toast, announce } from "../app/ui.js";
import { sound } from "../app/audio.js";
import { confetti } from "../app/confetti.js";
import { say } from "../services/companion.js";

/* --------------------------------------------------------------------------
   Library index
   -------------------------------------------------------------------------- */
export function libraryPage() {
  const state = get();
  const read = LESSONS.filter((lesson) => state.progress.lessons[lesson.id]?.readAt).length;
  const next = LESSONS.find((lesson) => !state.progress.lessons[lesson.id]?.readAt) || LESSONS[0];
  return `<div class="library page-shell">
    <header class="page-head">
      <div>
        <p class="eyebrow">The Library</p>
        <h1>The module, made readable.</h1>
        <p class="lede">Nine lessons from the DepEd COC 1 module. Every figure, safety note, and procedure is here. Anything TechPro added is clearly marked <span class="tag tag-extra">Extra</span>.</p>
      </div>
      <div class="lib-progress-card">
        <span class="library-ring" style="--ring:${Math.round((read / LESSONS.length) * 100)}"><strong>${read}<small>/${LESSONS.length}</small></strong><span>read</span></span>
        <div><p class="eyebrow">Your place</p><strong>${read ? "Keep the thread" : "Start at the beginning"}</strong><p class="tiny faint">${read ? `${LESSONS.length - read} lesson${LESSONS.length - read === 1 ? "" : "s"} left.` : "Lesson 1 takes about seven minutes."}</p></div>
        <a class="btn btn-primary btn-sm" href="/library/${next.id}">${icon("bookOpen", 17)} ${read ? "Continue" : "Start"}</a>
      </div>
    </header>

    <section class="library-tools" aria-label="Search and filter lessons">
      <label class="search-field" for="lessonSearch">
        ${icon("search", 20)}
        <input id="lessonSearch" type="search" placeholder="Search lessons, terms, or procedures…" autocomplete="off" data-lesson-search>
        <kbd class="kbd">/</kbd>
      </label>
      <div class="filter-chips" role="group" aria-label="Filter by learning goal">
        <button class="chip is-active" type="button" data-goal="all">All lessons</button>
        ${Object.entries(GOALS).map(([id, goal]) => `<button class="chip" type="button" data-goal="${id}">${esc(goal.short)}</button>`).join("")}
        <button class="chip chip-bookmark" type="button" data-goal="bookmarks">${icon("bookmark", 15)} Saved</button>
      </div>
      <p class="search-status tiny faint" data-search-status>${LESSONS.length} lessons</p>
    </section>

    <div class="lesson-list" data-lesson-list>
      ${LESSONS.map((lesson) => lessonCard(lesson)).join("")}
    </div>
    <div class="empty-state" data-lesson-empty hidden>${icon("search", 36)}<h3>No lesson fits that search</h3><p>Try a shorter word, or clear the filters. The glossary search below may still find the term.</p></div>

    <section class="section" aria-labelledby="bookmarksTitle">
      <div class="section-head">
        <div><p class="eyebrow">Saved for later</p><h2 id="bookmarksTitle">Your bookmarks</h2></div>
        <p class="section-aside">Mark a lesson from its reader. Bookmarks stay on this device.</p>
      </div>
      <div class="bookmark-strip" data-bookmark-strip>
        ${state.bookmarks.length
          ? state.bookmarks.map((id) => lessonById[id]).filter(Boolean).map((lesson) => `<a class="bookmark-pill" href="/library/${lesson.id}">${icon("bookmarkFill", 15)} ${esc(lesson.title)}</a>`).join("")
          : `<p class="tiny faint">Nothing saved yet. Open a lesson and press <strong>Save</strong>.</p>`}
      </div>
    </section>

    <section class="section glossary-section" aria-labelledby="glossaryTitle">
      <div class="section-head">
        <div><p class="eyebrow">Quick reference</p><h2 id="glossaryTitle">Glossary</h2><p>${GLOSSARY.length} terms, written for SHS learners.</p></div>
        <label class="search-field search-small" for="glossarySearch">${icon("search", 18)}<input id="glossarySearch" type="search" placeholder="Find a term…" data-glossary-search></label>
      </div>
      <div class="glossary-grid" data-glossary-grid>
        ${GLOSSARY.map((entry) => `<button class="glossary-card" type="button" data-term="${entry.id}">
          <strong>${esc(entry.term)}</strong>
          <span>${esc(entry.definition.length > 92 ? `${entry.definition.slice(0, 92).trim()}…` : entry.definition)}</span>
        </button>`).join("")}
      </div>
      <p class="tiny faint mt-3" data-glossary-empty hidden>No matching term. Try “socket”, “driver”, or “paste”.</p>
    </section>

    <section class="section">
      <div class="library-cta card card-pad">
        <div><p class="eyebrow">Finished reading?</p><h2>Put the module on the bench.</h2><p>The interactives use the same terms, the same order, and the same safety rules. Start with a sort, then build the PC.</p></div>
        <div class="cluster"><a class="btn btn-primary" href="/play/sort-station">${icon("layers", 18)} Sort Station</a><a class="btn btn-ghost" href="/play/pc-lab">${icon("wrench", 18)} PC Lab</a></div>
      </div>
    </section>
  </div>`;
}

function lessonCard(lesson) {
  const state = get();
  const read = Boolean(state.progress.lessons[lesson.id]?.readAt);
  const saved = state.bookmarks.includes(lesson.id);
  const checks = LESSON_CHECKS[lesson.id]?.length || 0;
  return `<article class="lesson-row ${read ? "is-read" : ""}" data-lesson-card data-goal="${lesson.goal}" data-id="${lesson.id}" data-search="${esc(`${lesson.title} ${lesson.summary} ${lesson.kicker} ${lesson.keyTerms.join(" ")}`)}">
    <a class="lesson-row-main" href="/library/${lesson.id}">
      <span class="lesson-index">${String(lesson.number).padStart(2, "0")}</span>
      <span class="lesson-row-copy">
        <span class="eyebrow">${esc(lesson.kicker)}</span>
        <strong>${esc(lesson.title)}</strong>
        <span class="lesson-summary">${esc(lesson.summary)}</span>
        <span class="lesson-tags">${lesson.keyTerms.slice(0, 4).map((term) => `<span class="tag">${esc(term)}</span>`).join("")}${checks ? `<span class="tag tag-accent">${checks} check${checks === 1 ? "" : "s"}</span>` : ""}</span>
      </span>
      <span class="lesson-row-side">
        <span class="lesson-time">${icon("clock", 15)} ${lesson.minutes} min</span>
        <span class="lesson-state">${read ? `${icon("checkCircle", 17)} Read` : `${icon("arrowRight", 16)} Open`}</span>
      </span>
    </a>
    <button class="icon-button bookmark-button ${saved ? "is-saved" : ""}" type="button" data-bookmark="${lesson.id}" aria-pressed="${saved}" aria-label="${saved ? "Remove bookmark" : "Bookmark"} ${esc(lesson.title)}">${icon(saved ? "bookmarkFill" : "bookmark", 18)}</button>
  </article>`;
}

export function mountLibrary(root) {
  const search = root.querySelector("[data-lesson-search]");
  const status = root.querySelector("[data-search-status]");
  const cards = Array.from(root.querySelectorAll("[data-lesson-card]"));
  const empty = root.querySelector("[data-lesson-empty]");
  let goal = "all";

  function apply() {
    const query = (search?.value || "").trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const matchesGoal = goal === "all"
        || card.dataset.goal === goal
        || (goal === "bookmarks" && get().bookmarks.includes(card.dataset.id));
      const matchesQuery = !query || card.dataset.search.toLowerCase().includes(query);
      const visible = matchesGoal && matchesQuery;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (status) status.textContent = `${shown} lesson${shown === 1 ? "" : "s"}${query ? ` for “${search.value.trim()}”` : ""}`;
    if (empty) empty.hidden = shown !== 0;
  }

  search?.addEventListener("input", apply);
  root.querySelectorAll("[data-goal]").forEach((button) => {
    button.addEventListener("click", () => {
      goal = button.dataset.goal;
      root.querySelectorAll("[data-goal]").forEach((el) => el.classList.toggle("is-active", el === button));
      apply();
    });
  });
  root.querySelectorAll("[data-bookmark]").forEach((button) => {
    button.addEventListener("click", () => {
      const saved = toggleBookmark(button.dataset.bookmark);
      button.classList.toggle("is-saved", saved);
      button.setAttribute("aria-pressed", String(saved));
      button.setAttribute("aria-label", `${saved ? "Remove bookmark" : "Bookmark"} ${lessonById[button.dataset.bookmark]?.title || ""}`);
      button.innerHTML = icon(saved ? "bookmarkFill" : "bookmark", 18);
      toast(saved ? "Bookmark saved." : "Bookmark removed.", "success", 1800);
      refreshBookmarkStrip(root);
    });
  });

  // Keyboard "/" focuses search, like a documentation site.
  const onKey = (event) => {
    if (event.key === "/" && !/input|textarea|select/i.test(document.activeElement?.tagName || "")) {
      event.preventDefault();
      search?.focus();
    }
  };
  document.addEventListener("keydown", onKey);

  // Glossary cards and search.
  const glossarySearch = root.querySelector("[data-glossary-search]");
  const glossaryCards = Array.from(root.querySelectorAll("[data-term]"));
  const glossaryEmpty = root.querySelector("[data-glossary-empty]");
  glossarySearch?.addEventListener("input", () => {
    const q = glossarySearch.value.trim().toLowerCase();
    let shown = 0;
    glossaryCards.forEach((card) => {
      const entry = GLOSSARY_BY_ID[card.dataset.term];
      const visible = !q || `${entry.term} ${entry.definition}`.toLowerCase().includes(q);
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (glossaryEmpty) glossaryEmpty.hidden = shown !== 0;
  });
  root.querySelectorAll("[data-term]").forEach((button) => {
    button.addEventListener("click", () => openGlossary(button.dataset.term));
  });

  apply();
  return () => document.removeEventListener("keydown", onKey);
}

function refreshBookmarkStrip(root) {
  const strip = root.querySelector("[data-bookmark-strip]");
  if (!strip) return;
  const ids = get().bookmarks;
  strip.innerHTML = ids.length
    ? ids.map((id) => lessonById[id]).filter(Boolean).map((lesson) => `<a class="bookmark-pill" href="/library/${lesson.id}">${icon("bookmarkFill", 15)} ${esc(lesson.title)}</a>`).join("")
    : `<p class="tiny faint">Nothing saved yet. Open a lesson and press <strong>Save</strong>.</p>`;
}

/* --------------------------------------------------------------------------
   Lesson reader
   -------------------------------------------------------------------------- */
export function lessonPage({ params }) {
  const lesson = lessonById[params.lesson];
  if (!lesson) {
    return {
      title: "Lesson not found",
      html: `<div class="page-shell section"><p class="eyebrow">404</p><h1>That lesson is not on the shelf</h1><p class="lede">The Library has nine lessons. This is not one of them.</p><div class="cluster mt-4"><a class="btn btn-primary" href="/library">Open the Library</a></div></div>`
    };
  }
  const read = isLessonRead(lesson.id);
  const saved = isBookmarked(lesson.id);
  const previous = neighbours(lesson.id).previous;
  const next = neighbours(lesson.id).next;
  const checks = LESSON_CHECKS[lesson.id] || [];
  const related = ACTIVITIES.filter((activity) => activity.lesson === lesson.id).slice(0, 3);
  const glossary = glossaryForLesson(lesson.id).slice(0, 8);
  const note = getNote(lesson.id);

  return {
    title: lesson.title,
    html: `<div class="lesson-page page-shell">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/library">Library</a><span>${icon("chevronRight", 14)}</span><span aria-current="page">${esc(lesson.title)}</span></nav>
      <header class="lesson-head">
        <div class="lesson-head-copy">
          <p class="eyebrow">${esc(lesson.kicker)} · Lesson ${lesson.number}</p>
          <h1>${esc(lesson.title)}</h1>
          <p class="lede">${esc(lesson.summary)}</p>
          <div class="game-meta">
            <span class="pill">${icon("clock", 15)} ${lesson.minutes} min read</span>
            <span class="pill">${icon("target", 15)} ${esc(GOALS[lesson.goal]?.name || "Learning goal")}</span>
            ${read ? `<span class="pill pill-success">${icon("checkCircle", 15)} Read</span>` : `<span class="pill pill-soft">Not marked read</span>`}
          </div>
          <div class="cluster mt-4">
            <button class="btn ${read ? "btn-ghost" : "btn-primary"}" type="button" data-mark-read>${icon(read ? "checkCircle" : "check", 18)} ${read ? "Marked as read" : "Mark lesson read"}</button>
            <button class="btn btn-ghost ${saved ? "is-saved" : ""}" type="button" data-bookmark-lesson aria-pressed="${saved}">${icon(saved ? "bookmarkFill" : "bookmark", 18)} ${saved ? "Saved" : "Save"}</button>
            <button class="btn btn-ghost" type="button" data-open-glossary>${icon("bookOpen", 18)} Glossary</button>
            <a class="btn btn-soft" href="/assistant?lesson=${encodeURIComponent(lesson.id)}">${icon("sparkles", 18)} Explain this lesson</a>
          </div>
        </div>
        <aside class="lesson-objectives" aria-labelledby="objectivesTitle">
          <p class="eyebrow">By the end</p>
          <h2 id="objectivesTitle">You can</h2>
          <ul class="tick-list">${lesson.objectives.map((objective) => `<li>${icon("check", 16)} <span>${esc(objective)}</span></li>`).join("")}</ul>
          <div class="objective-mini">${icon("lightbulb", 18)} <span>${esc(lesson.keyTerms.slice(0, 3).map((id) => id.replace(/-/g, " ")).join(", "))}</span></div>
        </aside>
      </header>

      <div class="reader-layout">
        <aside class="reader-toc" aria-label="On this page">
          <p class="eyebrow">On this page</p>
          <ol data-toc>
            ${lesson.sections.map((section, index) => `<li><a href="#${section.id}" data-toc-link="${section.id}"><span>${String(index + 1).padStart(2, "0")}</span>${esc(section.title)}</a></li>`).join("")}
            ${checks.length ? `<li><a href="#lesson-check" data-toc-link="lesson-check"><span>${String(lesson.sections.length + 1).padStart(2, "0")}</span>Quick check</a></li>` : ""}
            <li><a href="#lesson-notes" data-toc-link="lesson-notes"><span>${String(lesson.sections.length + (checks.length ? 2 : 1)).padStart(2, "0")}</span>Your notes</a></li>
          </ol>
          <div class="toc-progress">
            <span class="tiny faint">Reading progress</span>
            <div class="progress thin"><span data-read-progress style="width:${read ? 100 : 0}%"></span></div>
          </div>
          <div class="toc-terms">
            <p class="eyebrow">Key terms</p>
            <div class="term-cloud">${lesson.keyTerms.map((id) => GLOSSARY_BY_ID[id] ? `<button class="glossary-term" type="button" data-term="${id}">${esc(GLOSSARY_BY_ID[id].term)}</button>` : "").join("")}</div>
          </div>
        </aside>

        <article class="reader">
          ${lesson.sections.map((section, index) => `<section class="reader-section" id="${section.id}" data-section="${section.id}">
            <div class="section-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
            <h2>${esc(section.title)}</h2>
            ${section.html}
          </section>`).join("")}

          ${checks.length ? `<section class="reader-section reader-check" id="lesson-check" data-section="lesson-check">
            <div class="section-number" aria-hidden="true">${icon("brain", 22)}</div>
            <h2>Quick check</h2>
            <p class="section-intro">Two questions written by TechPro from this lesson. They are practice, not a grade.</p>
            <div class="check-list" data-lesson-check>
              ${checks.map((item, qIndex) => `<fieldset class="check-question" data-question="${qIndex}">
                <legend><span class="q-number">${qIndex + 1}</span>${esc(item.prompt)}</legend>
                <div class="option-grid">
                  ${item.options.map((option, oIndex) => `<button class="option-button" type="button" data-answer="${oIndex}"><span class="option-letter">${String.fromCharCode(65 + oIndex)}</span><span>${esc(option)}</span></button>`).join("")}
                </div>
              </fieldset>`).join("")}
            </div>
            <div class="feedback" role="status" aria-live="polite" data-check-feedback></div>
            <button class="btn btn-soft mt-3" type="button" data-check-submit>${icon("checkCircle", 18)} Check my answers</button>
          </section>` : ""}

          <section class="reader-section reader-notes" id="lesson-notes" data-section="lesson-notes">
            <div class="section-number" aria-hidden="true">${icon("edit", 22)}</div>
            <h2>Your notes</h2>
            <p class="section-intro">Write the idea you want to keep. Notes save as you type and stay on this device (and sync if you sign in).</p>
            <label class="sr-only" for="lessonNote">Notes for ${esc(lesson.title)}</label>
            <textarea class="textarea notes-area" id="lessonNote" rows="5" data-lesson-note placeholder="One thing I want to remember from this lesson…">${esc(note)}</textarea>
            <p class="tiny faint" data-note-status>Saved locally.</p>
          </section>

          ${glossary.length ? `<section class="reader-section reader-recap" aria-labelledby="recapTitle">
            <div class="section-number" aria-hidden="true">${icon("bookOpen", 22)}</div>
            <h2 id="recapTitle">Words from this lesson</h2>
            <div class="glossary-grid compact">${glossary.map((entry) => `<button class="glossary-card" type="button" data-term="${entry.id}"><strong>${esc(entry.term)}</strong><span>${esc(entry.definition.length > 80 ? `${entry.definition.slice(0, 80).trim()}…` : entry.definition)}</span></button>`).join("")}</div>
          </section>` : ""}

          <footer class="reader-foot">
            <div class="next-lesson-nav">
              ${previous ? `<a class="next-lesson is-prev" href="/library/${previous.id}"><span>${icon("arrowLeft", 18)} Previous</span><strong>${esc(previous.title)}</strong></a>` : `<span></span>`}
              ${next ? `<a class="next-lesson" href="/library/${next.id}"><span>Next ${icon("arrowRight", 18)}</span><strong>${esc(next.title)}</strong></a>` : `<a class="next-lesson" href="/exam/final"><span>Finish ${icon("arrowRight", 18)}</span><strong>Take the Final Exam</strong></a>`}
            </div>
            <div class="reader-foot-row">
              <button class="btn ${read ? "btn-ghost" : "btn-soft"}" type="button" data-mark-read>${icon(read ? "checkCircle" : "check", 18)} ${read ? "Read" : "Mark read"}</button>
              <a class="btn btn-ghost" href="/library">${icon("bookOpen", 18)} All lessons</a>
            </div>
          </footer>
        </article>
      </div>

      ${related.length ? `<section class="section related-section" aria-labelledby="relatedTitle">
        <div class="section-head"><div><p class="eyebrow">Practise this lesson</p><h2 id="relatedTitle">Take it to the bench</h2></div></div>
        <div class="related-grid">${related.map((activity) => `<a class="related-card" href="${activity.route}"><span class="mini-icon color-${activity.color}">${icon(activity.icon, 22)}</span><span><strong>${esc(activity.title)}</strong><small>${esc(activity.tagline)}</small></span>${icon("arrowRight", 18)}</a>`).join("")}</div>
      </section>` : ""}
    </div>`,
    mount(rootEl) {
      return mountLesson(rootEl, lesson, checks);
    }
  };
}

function mountLesson(root, lesson, checks) {
  const cleanups = [];
  const markButtons = root.querySelectorAll("[data-mark-read]");
  const bookmarkButton = root.querySelector("[data-bookmark-lesson]");

  const paintRead = () => {
    const read = isLessonRead(lesson.id);
    markButtons.forEach((button) => {
      button.innerHTML = `${icon(read ? "checkCircle" : "check", 18)} ${read ? (button.closest(".reader-foot") ? "Read" : "Marked as read") : "Mark lesson read"}`;
      button.classList.toggle("btn-primary", !read && !button.closest(".reader-foot"));
      button.classList.toggle("btn-ghost", read || Boolean(button.closest(".reader-foot")));
    });
    const bar = root.querySelector("[data-read-progress]");
    if (bar) bar.style.width = read ? "100%" : "0%";
  };

  markButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (isLessonRead(lesson.id)) {
        markLessonUnread(lesson.id);
        toast("Marked unread. You can finish it again.", "info");
        paintRead();
        return;
      }
      const result = markLessonRead(lesson.id);
      sound.correct();
      confetti({ count: 50, duration: 1200 });
      say("lesson", { mood: "proud", force: true });
      toast("Lesson marked read. +15 XP", "success");
      if (result.badges?.length) {
        toast(`New badge: ${result.badges[0].name}`, "success", 5000);
      }
      paintRead();
      announce("Lesson marked as read.");
    });
  });

  bookmarkButton?.addEventListener("click", () => {
    const saved = toggleBookmark(lesson.id);
    bookmarkButton.classList.toggle("is-saved", saved);
    bookmarkButton.setAttribute("aria-pressed", String(saved));
    bookmarkButton.innerHTML = `${icon(saved ? "bookmarkFill" : "bookmark", 18)} ${saved ? "Saved" : "Save"}`;
    toast(saved ? "Lesson saved." : "Bookmark removed.", "success", 1800);
  });

  root.querySelector("[data-open-glossary]")?.addEventListener("click", () => openGlossaryPicker(lesson));
  root.querySelectorAll("[data-term]").forEach((button) => {
    button.addEventListener("click", () => openGlossary(button.dataset.term));
  });

  // Notes: debounce save, show saved state.
  const note = root.querySelector("[data-lesson-note]");
  const status = root.querySelector("[data-note-status]");
  let noteTimer = null;
  note?.addEventListener("input", () => {
    if (status) status.textContent = "Saving…";
    clearTimeout(noteTimer);
    noteTimer = setTimeout(() => {
      saveNote(lesson.id, note.value);
      if (status) status.textContent = "Saved locally.";
    }, 500);
  });
  cleanups.push(() => clearTimeout(noteTimer));

  // Quick check.
  const checkRoot = root.querySelector("[data-lesson-check]");
  if (checkRoot && checks.length) {
    const chosen = {};
    checkRoot.querySelectorAll("[data-question]").forEach((field, index) => {
      field.querySelectorAll("[data-answer]").forEach((button) => {
        button.addEventListener("click", () => {
          chosen[index] = Number(button.dataset.answer);
          field.querySelectorAll("[data-answer]").forEach((el) => el.classList.toggle("is-chosen", el === button));
          sound.click();
        });
      });
    });
    root.querySelector("[data-check-submit]")?.addEventListener("click", () => {
      const feedback = root.querySelector("[data-check-feedback]");
      if (Object.keys(chosen).length < checks.length) {
        feedback.className = "feedback is-visible is-hint";
        feedback.innerHTML = `${icon("info", 20)}<div><strong>Answer both items first</strong><span>Then check your answers.</span></div>`;
        return;
      }
      let correct = 0;
      checkRoot.querySelectorAll("[data-question]").forEach((field, index) => {
        const item = checks[index];
        const picked = chosen[index];
        const ok = picked === item.answer;
        if (ok) correct += 1;
        field.querySelectorAll("[data-answer]").forEach((button) => {
          const value = Number(button.dataset.answer);
          button.classList.toggle("is-correct", value === item.answer);
          button.classList.toggle("is-wrong", value === picked && !ok);
          button.disabled = true;
        });
      });
      const percent = Math.round((correct / checks.length) * 100);
      feedback.className = `feedback is-visible ${percent === 100 ? "is-correct" : "is-hint"}`;
      feedback.innerHTML = `${icon(percent === 100 ? "checkCircle" : "lightbulb", 20)}<div><strong>${correct} of ${checks.length} correct</strong><span>${checks.map((item, i) => `${i + 1}. ${item.explain}`).join(" ")}</span></div>`;
      if (percent === 100) {
        sound.correct();
        confetti({ count: 36, duration: 1100 });
      } else sound.wrong();
    });
  }

  // TOC tracking + reading progress.
  const tocLinks = Array.from(root.querySelectorAll("[data-toc-link]"));
  const sections = tocLinks.map((link) => document.getElementById(link.dataset.tocLink)).filter(Boolean);
  let seen = new Set();
  const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      seen.add(entry.target.id);
      tocLinks.forEach((link) => {
        const active = link.dataset.tocLink === entry.target.id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
      const bar = root.querySelector("[data-read-progress]");
      if (bar) bar.style.width = `${Math.min(100, Math.round((seen.size / Math.max(1, sections.length)) * 100))}%`;
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0.1 }) : null;
  if (observer) {
    sections.forEach((section) => observer.observe(section));
    cleanups.push(() => observer.disconnect());
  }

  return () => cleanups.forEach((fn) => fn());
}

/* --------------------------------------------------------------------------
   Glossary dialogs
   -------------------------------------------------------------------------- */
export function openGlossary(termId) {
  const entry = GLOSSARY_BY_ID[termId];
  if (!entry) return;
  const lesson = lessonById[entry.lesson];
  modal({
    title: entry.term,
    label: `Glossary: ${entry.term}`,
    body: `<div class="glossary-modal">
      <p class="eyebrow">Glossary</p>
      <p class="glossary-definition">${esc(entry.definition)}</p>
      ${lesson ? `<a class="btn btn-soft mt-4" href="/library/${lesson.id}">${icon("bookOpen", 17)} Read “${esc(lesson.title)}”</a>` : ""}
    </div>`,
    actions: `<button class="btn btn-ghost" type="button" data-close>Close</button>`
  });
}

function openGlossaryPicker(lesson) {
  const terms = glossaryForLesson(lesson.id);
  modal({
    title: "Glossary",
    label: "Glossary for this lesson",
    wide: true,
    body: `<div class="glossary-grid compact">${terms.map((entry) => `<button class="glossary-card" type="button" data-term="${entry.id}"><strong>${esc(entry.term)}</strong><span>${esc(entry.definition)}</span></button>`).join("")}</div>`,
    actions: `<button class="btn btn-ghost" type="button" data-close>Close</button>`,
    onMount(root, close) {
      root.querySelectorAll("[data-term]").forEach((button) => {
        button.addEventListener("click", () => {
          close();
          setTimeout(() => openGlossary(button.dataset.term), 160);
        });
      });
    }
  });
}
