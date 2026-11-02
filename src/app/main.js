import { mountChrome } from "./chrome.js";
import { route, start, setNotFound } from "./router.js";
import { homePage, mountHome } from "../pages/home.js";
import { libraryPage, lessonPage, mountLibrary } from "../pages/library.js";
import { playPage, mountPlay } from "../pages/play.js";
import { pcLabPage, mountPcLab } from "../pages/pc-lab.js";
import { examOverviewPage, quizPage } from "../pages/exam.js";
import { planPage, mountPlan } from "../pages/plan.js";
import { accountPage, mountAccount } from "../pages/account.js";
import { assistantPage, mountAssistant } from "../pages/assistant.js";
import { startPlanSync } from "../services/plan-sync.js";
import { startGameSync } from "../services/game-progress.js";
import { PRETEST, POSTTEST } from "../data/quiz.js";
import { ACTIVITY_BY_ID } from "../data/activities.js";

function pageShell({ title, body, mount = null }) {
  return {
    title,
    html: `<div class="page-shell section">${body}</div>`,
    mount
  };
}

route("/", () => ({
  title: "TechPro · Assemble Computer Hardware",
  html: homePage(),
  mount: mountHome
}));

route("/library", () => ({
  title: "Library · TechPro",
  html: libraryPage(),
  mount: mountLibrary
}));

route("/library/:lesson", ({ params }) => lessonPage({ params }));

route("/play", () => ({
  title: "Play · TechPro",
  html: playPage(),
  mount: mountPlay
}));

route("/play/pc-lab", ({ query }) => ({
  title: "PC Lab · TechPro",
  html: pcLabPage({ query }),
  mount: mountPcLab
}));

route("/plan", () => ({
  title: "Study Plan · TechPro",
  html: planPage(),
  mount: mountPlan
}));

route("/account", () => ({
  title: "Account · TechPro",
  html: accountPage(),
  mount: mountAccount
}));

route("/assistant", () => ({
  title: "TechPro assistant · TechPro",
  html: assistantPage(),
  mount: mountAssistant
}));

route("/play/:activity", ({ params }) => {
  const activity = ACTIVITY_BY_ID[params.activity];
  if (!activity) {
    return pageShell({
      title: "Activity not found",
      body: `
        <p class="eyebrow">404</p>
        <h1>That activity is not on the bench yet</h1>
        <p class="lede">Try the play hub or the library to find the right challenge.</p>
        <div class="cluster mt-4">
          <a class="btn btn-primary" href="/play">Open play hub</a>
          <a class="btn btn-ghost" href="/library">Library</a>
        </div>
      `
    });
  }

  return pageShell({
    title: `${activity.title} · TechPro`,
    body: `
      <article class="card card-pad activity-page">
        <p class="eyebrow">Interactive</p>
        <h1>${activity.title}</h1>
        <p class="lede">${activity.description}</p>
        <div class="cluster mt-4">
          <a class="btn btn-primary" href="${activity.route}">Start ${activity.title}</a>
          <a class="btn btn-ghost" href="/play">Back to play</a>
        </div>
      </article>
    `
  });
});

route("/exam", () => ({
  title: "Assessment · TechPro",
  html: examOverviewPage(),
  mount: (root) => {
    root.querySelectorAll("a[href^='/exam/']").forEach((link) => {
      if (link.getAttribute("href") === "/exam") return;
      link.setAttribute("data-keep", "true");
    });
  }
}));

route("/exam/:bank", ({ params }) => {
  const bank = params.bank === "pretest" ? PRETEST : params.bank === "final" ? POSTTEST : null;
  if (bank) return quizPage({ bank });
  return pageShell({
    title: "Assessment not found",
    body: `
      <p class="eyebrow">404</p>
      <h1>That exam is not available</h1>
      <p class="lede">Choose the pre-test or final exam from the assessment hub.</p>
      <div class="cluster mt-4"><a class="btn btn-primary" href="/exam">Back to assessment</a></div>
    `
  });
});

route("/leaderboard", () => pageShell({
  title: "Leaderboard · TechPro",
  body: `
    <div class="profile-shell">
      <h1>Leaderboard</h1>
      <p class="lede">Local progress and class standings are tracked on this device. Sign in later to sync with cloud data.</p>
      <div class="profile-grid">
        <article class="card card-pad"><h2>Top bench</h2><ul class="tick-list"><li>Bench Rookie · 0 XP</li><li>Lab Leader · 1,200 XP</li><li>Guide Tech · 2,500 XP</li></ul></article>
        <article class="card card-pad"><h2>Class progress</h2><p>Scores appear here after students complete library reads and activities.</p></article>
      </div>
    </div>
  `
}));

route("/profile", () => pageShell({
  title: "Profile · TechPro",
  body: `
    <div class="profile-shell">
      <h1>My profile</h1>
      <p class="lede">The student profile saves progress, notes, bookmarks, and a technician recommendation for later review.</p>
      <div class="profile-grid">
        <article class="card card-pad"><h2>Bench card</h2><p>Username: Guest learner</p><p>XP: 0</p><p>Rating: 1000</p></article>
        <article class="card card-pad"><h2>Saved work</h2><p>Bookmarks, checklists, reflection journal, and completed lessons stay on this device.</p></article>
      </div>
    </div>
  `
}));

route("/teacher", () => pageShell({
  title: "Teacher view · TechPro",
  body: `
    <div class="profile-shell">
      <h1>Teacher view</h1>
      <p class="lede">This page is designed for classroom tracking, exported records, and quick check-ins.</p>
      <div class="profile-grid">
        <article class="card card-pad"><h2>Class overview</h2><p>Review completion, time-on-task, and badge status in this classroom view.</p></article>
        <article class="card card-pad"><h2>Export</h2><p>Use the export option inside the app to save progress in CSV or JSON format.</p></article>
      </div>
    </div>
  `
}));

route("/about", () => pageShell({
  title: "About & references · TechPro",
  body: `
    <div class="profile-shell">
      <h1>About &amp; references</h1>
      <p class="lede">TechPro follows the DepEd SDO Cavite module for Computer Systems Servicing NC II: Assemble Computer Hardware.</p>
      <div class="profile-grid">
        <article class="card card-pad"><h2>Credit</h2><p>Module: Yvan Marco A. Reyes</p><p>Schools Division Office of Cavite</p><p>Technop CSS NC II · COC 1</p></article>
        <article class="card card-pad"><h2>References</h2><p>Module text, learning objectives, and safety guidance are the source of truth for this site.</p></article>
      </div>
    </div>
  `
}));

route("/install", () => pageShell({
  title: "Install TechPro · TechPro",
  body: `
    <div class="profile-shell">
      <h1>Install TechPro</h1>
      <p class="lede">Install the site as a PWA for offline class access and faster loading on school devices.</p>
      <div class="cluster mt-4">
        <a class="btn btn-primary" href="/library">Browse the library</a>
        <a class="btn btn-ghost" href="/">Home</a>
      </div>
    </div>
  `
}));

setNotFound(() => pageShell({
  title: "Page not found",
  body: `
    <p class="eyebrow">404</p>
    <h1>That bench is empty</h1>
    <p class="lede">The page you asked for does not exist. Head back to the library or the PC Lab.</p>
    <div class="cluster mt-4">
      <a class="btn btn-primary" href="/library">Open the library</a>
      <a class="btn btn-ghost" href="/">Back home</a>
    </div>
  `
}));

mountChrome();
startPlanSync();
startGameSync();
start();
