import { mountChrome } from "./chrome.js";
import { route, start, setNotFound } from "./router.js";
import { esc } from "./ui.js";
import { homePage, mountHome } from "../pages/home.js";
import { libraryPage, lessonPage, mountLibrary } from "../pages/library.js";
import { playPage, mountPlay } from "../pages/play.js";
import { pcLabPage, mountPcLab } from "../pages/pc-lab.js";
import { examOverviewPage, quizPage } from "../pages/exam.js";
import { planPage, mountPlan } from "../pages/plan.js";
import { accountPage, mountAccount } from "../pages/account.js";
import { assistantPage, mountAssistant } from "../pages/assistant.js";
import { ranksPage, mountRanks } from "../pages/ranks.js";
import { teacherPage, mountTeacher } from "../pages/teacher.js";
import { sharingPage, mountSharing } from "../pages/sharing.js";
import { sortStationPage, mountSortStation } from "../games/sort-station.js";
import { whichComputerPage, mountWhichComputer } from "../games/which-computer.js";
import { softwareMissionPage, mountSoftwareMission } from "../games/software-mission.js";
import { wordChainPage, mountWordChain } from "../games/word-chain.js";
import { wordHuntPage, mountWordHunt } from "../games/word-hunt.js";
import { techWordlePage, mountTechWordle } from "../games/tech-wordle.js";
import { softwareSorterPage, mountSoftwareSorter } from "../games/software-sorter.js";
import { orderRushPage, mountOrderRush } from "../games/order-rush.js";
import { spotMistakePage, mountSpotMistake } from "../games/spot-mistake.js";
import {
  anatomyPage, mountAnatomy,
  techCheckupPage, mountTechCheckup,
  caseFilesPage, mountCaseFiles,
  flashcardsPage, mountFlashcards,
  reflectionPage, mountReflection
} from "../games/module-activities.js";
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
  title: "Profile · TechPro",
  html: accountPage(),
  mount: mountAccount
}));

route("/assistant", ({ query }) => ({
  title: "Ask TechPro · Offline helper",
  html: assistantPage({ query }),
  mount: (root) => mountAssistant(root, { query })
}));

route("/play/:activity", ({ params }) => {
  const activity = ACTIVITY_BY_ID[params.activity];
  if (params.activity === "sort-station") {
    return {
      title: "Sort Station · TechPro",
      html: sortStationPage(),
      mount: mountSortStation
    };
  }
  if (params.activity === "which-computer") {
    return {
      title: "Which Computer? · TechPro",
      html: whichComputerPage(),
      mount: mountWhichComputer
    };
  }
  if (params.activity === "software-mission") {
    return {
      title: "Software Mission · TechPro",
      html: softwareMissionPage(),
      mount: mountSoftwareMission
    };
  }
  if (params.activity === "word-chain") {
    return {
      title: "Word Bank Chain · TechPro",
      html: wordChainPage(),
      mount: mountWordChain
    };
  }
  if (params.activity === "word-hunt") {
    return {
      title: "Word Hunt · TechPro",
      html: wordHuntPage(),
      mount: mountWordHunt
    };
  }
  if (params.activity === "tech-wordle") {
    return {
      title: "Tech Wordle · TechPro",
      html: techWordlePage(),
      mount: mountTechWordle
    };
  }
  if (params.activity === "software-sorter") {
    return {
      title: "Software Sorter · TechPro",
      html: softwareSorterPage(),
      mount: mountSoftwareSorter
    };
  }
  if (params.activity === "order-rush") {
    return {
      title: "Order Rush · TechPro",
      html: orderRushPage(),
      mount: mountOrderRush
    };
  }
  if (params.activity === "spot-mistake") {
    return {
      title: "Spot the Mistake · TechPro",
      html: spotMistakePage(),
      mount: mountSpotMistake
    };
  }
  if (params.activity === "anatomy") {
    return { title: "PC Anatomy Explorer · TechPro", html: anatomyPage(), mount: mountAnatomy };
  }
  if (params.activity === "tech-checkup") {
    return { title: "Tech Check-Up · TechPro", html: techCheckupPage(), mount: mountTechCheckup };
  }
  if (params.activity === "case-files") {
    return { title: "Case Files · TechPro", html: caseFilesPage(), mount: mountCaseFiles };
  }
  if (params.activity === "flashcards") {
    return { title: "Flashcards + Quick Recap · TechPro", html: flashcardsPage(), mount: mountFlashcards };
  }
  if (params.activity === "reflection") {
    return { title: "Reflection Journal · TechPro", html: reflectionPage(), mount: mountReflection };
  }
  if (!activity) {
    return pageShell({
      title: "Activity not found",
      body: `
        <p class="eyebrow">404</p>
        <h1>That activity is not on the bench yet</h1>
        <p class="lede">Try the play hub or the library to find the right challenge.</p>
        <div class="cluster mt-4">
          <a class="btn btn-primary" href="#/play">Open play hub</a>
          <a class="btn btn-ghost" href="#/library">Library</a>
        </div>
      `
    });
  }

  // Defensive fallback only: every activity in the catalogue has a real
  // implementation above. Never render a button that links back to itself.
  return pageShell({
    title: "Interactive not available",
    body: `
      <article class="card card-pad activity-page">
        <p class="eyebrow">Not available on this device</p>
        <h1>${esc(activity?.title || "This interactive")} is not ready yet</h1>
        <p class="lede">Choose another activity from the play hub. All listed interactives work offline.</p>
        <div class="cluster mt-4">
          <a class="btn btn-primary" href="#/play">Open all interactives</a>
          <a class="btn btn-ghost" href="#/">Back home</a>
        </div>
      </article>
    `
  });
});

route("/exam", () => ({
  title: "Assessment · TechPro",
  html: examOverviewPage(),
  mount: (root) => {
    root.querySelectorAll("a[href^='/exam/'], a[href^='#/exam/']").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === "/exam" || href === "#/exam") return;
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
      <div class="cluster mt-4"><a class="btn btn-primary" href="#/exam">Back to assessment</a></div>
    `
  });
});

route("/leaderboard", ({ query }) => ({
  title: "Ranks · TechPro",
  html: ranksPage({ query }),
  mount: mountRanks
}));

route("/profile", () => ({
  title: "Profile · TechPro",
  html: accountPage(),
  mount: mountAccount
}));

route("/teacher", () => ({
  title: "Teacher view · TechPro",
  html: teacherPage(),
  mount: mountTeacher
}));

route("/about", () => pageShell({
  title: "About & references · TechPro",
  body: `
    <div class="profile-shell">
      <h1>About &amp; references</h1>
      <p class="lede">TechPro follows the DepEd SDO Cavite module for Computer Systems Servicing NC II: Assemble Computer Hardware.</p>
      <div class="profile-grid">
        <article class="card card-pad"><h2>Credit</h2><p>Module: Yvan Marco A. Reyes</p><p>Schools Division Office of Cavite</p><p>Technical Vocational Livelihood · CSS NC II · COC 1</p></article>
        <article class="card card-pad"><h2>Offline First</h2><p>TechPro is a 100% offline educational app. All lessons, 14 interactive activities, simulation games, and exams run locally with zero network calls and no server required.</p></article>
      </div>
    </div>
  `
}));

route("/install", () => ({
  title: "Offline sharing & install · TechPro",
  html: sharingPage(),
  mount: mountSharing
}));

route("/share", () => ({
  title: "Offline sharing & install · TechPro",
  html: sharingPage(),
  mount: mountSharing
}));

setNotFound(() => pageShell({
  title: "Page not found",
  body: `
    <p class="eyebrow">404</p>
    <h1>That bench is empty</h1>
    <p class="lede">The page you asked for does not exist. Head back to the library or the PC Lab.</p>
    <div class="cluster mt-4">
      <a class="btn btn-primary" href="#/library">Open the library</a>
      <a class="btn btn-ghost" href="#/">Back home</a>
    </div>
  `
}));

mountChrome();
start();
