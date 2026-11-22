/* ==========================================================================
   Interactive catalogue. The order is the suggested learning path.
   ========================================================================== */

export const ACTIVITIES = [
  {
    id: "pretest",
    title: "Pre-Test",
    tagline: "See what you already know",
    description: "Fifteen quick questions from the module. Your score sets a baseline, not a grade.",
    route: "/exam/pretest",
    icon: "exam",
    kind: "quiz",
    minutes: 10,
    goal: "explain",
    xp: 40,
    color: "paper",
    lesson: "computer-system"
  },
  {
    id: "word-hunt",
    title: "Word Hunt",
    tagline: "Search the module vocabulary",
    description: "Find hidden hardware, software, safety, and procedure terms in a seeded word grid.",
    route: "/play/word-hunt",
    icon: "grid",
    kind: "word",
    genre: "Hunt",
    minutes: 4,
    goal: "identify",
    xp: 50,
    color: "mint",
    lesson: "review"
  },
  {
    id: "sort-station",
    title: "Sort Station",
    tagline: "Hardware, system, or application?",
    description: "Send each workstation item to the right bin. The module's Activity 1 as a sorting game.",
    route: "/play/sort-station",
    icon: "layers",
    kind: "sort",
    minutes: 6,
    goal: "software",
    xp: 60,
    color: "mint",
    lesson: "computer-system"
  },
  {
    id: "order-rush",
    title: "Order Rush",
    tagline: "Fix the sequence under time",
    description: "Put six disassembly preparations in the correct order before the clock runs out.",
    route: "/play/order-rush",
    icon: "list",
    kind: "order",
    minutes: 5,
    goal: "safety",
    xp: 70,
    color: "amber",
    lesson: "disassembly"
  },
  {
    id: "software-mission",
    title: "Software Mission",
    tagline: "Pick the right tool",
    description: "Six situations, six software choices. Choose the best tool for each job.",
    route: "/play/software-mission",
    icon: "puzzle",
    kind: "scenario",
    minutes: 7,
    goal: "software",
    xp: 70,
    color: "blue",
    lesson: "application-software"
  },
  {
    id: "spot-mistake",
    title: "Spot the Mistake",
    tagline: "Alex skipped the safety steps",
    description: "Find every unsafe practice in the workstation scene and choose the correct action.",
    route: "/play/spot-mistake",
    icon: "alertTriangle",
    kind: "spot",
    minutes: 8,
    goal: "safety",
    xp: 90,
    color: "red",
    lesson: "disassembly"
  },
  {
    id: "which-computer",
    title: "Which Computer?",
    tagline: "Match the job to the machine",
    description: "Desktop, laptop, tablet, or server? Choose the best fit for each real situation.",
    route: "/play/which-computer",
    icon: "monitor",
    kind: "match",
    minutes: 5,
    goal: "identify",
    xp: 60,
    color: "mint",
    lesson: "types-of-computers"
  },
  {
    id: "anatomy",
    title: "PC Anatomy Explorer",
    tagline: "Tap a part, learn its job",
    description: "Explore external and internal hardware on an interactive diagram, then label a challenge build.",
    route: "/play/anatomy",
    icon: "motherboard",
    kind: "explore",
    minutes: 8,
    goal: "identify",
    xp: 80,
    color: "blue",
    lesson: "internal-hardware"
  },
  {
    id: "software-sorter",
    title: "Software Sorter",
    tagline: "System or application?",
    description: "Sort eighteen programs into system software, application software, and utilities. Then explain your choices.",
    route: "/play/software-sorter",
    icon: "grid",
    kind: "sort",
    minutes: 7,
    goal: "software",
    xp: 80,
    color: "paper",
    lesson: "system-software"
  },
  {
    id: "disassembly",
    title: "Disassembly Mode",
    tagline: "Take the build apart safely",
    description: "The PC Lab in reverse: document, disconnect, and remove ten components in the right order.",
    route: "/play/pc-lab?mode=disassembly",
    icon: "screwdriver",
    kind: "lab",
    minutes: 15,
    goal: "safety",
    xp: 140,
    color: "amber",
    lesson: "disassembly"
  },
  {
    id: "pc-lab",
    title: "PC Lab",
    tagline: "Build the computer",
    description: "The flagship simulator. Case zones, a parts tray, compatibility checks, thermal paste, clips, screws, cable routing, and a first boot.",
    route: "/play/pc-lab",
    icon: "wrench",
    kind: "lab",
    minutes: 20,
    goal: "safety",
    xp: 180,
    color: "red",
    flagship: true,
    lesson: "assembly"
  },
  {
    id: "case-files",
    title: "Case Files",
    tagline: "Two repair stories",
    description: "Andrea's parts list and Carlo's no-display build. Work through each case with a model answer to compare.",
    route: "/play/case-files",
    icon: "file",
    kind: "case",
    minutes: 12,
    goal: "explain",
    xp: 100,
    color: "paper",
    lesson: "assembly"
  },
  {
    id: "flashcards",
    title: "Flashcards + Quick Recap",
    tagline: "Terms that stick",
    description: "Flip through the module's key terms, then answer a rapid recap. Add your own tricky words.",
    route: "/play/flashcards",
    icon: "bookOpen",
    kind: "cards",
    minutes: 8,
    goal: "identify",
    xp: 70,
    color: "mint",
    lesson: "review"
  },
  {
    id: "tech-checkup",
    title: "Tech Check-Up",
    tagline: "Inspect a real computer",
    description: "The module's checklist as an interactive inspection form. Save a computer profile and a technician's recommendation.",
    route: "/play/tech-checkup",
    icon: "shield",
    kind: "check",
    minutes: 10,
    goal: "identify",
    xp: 70,
    color: "blue",
    lesson: "external-hardware"
  },
  {
    id: "word-chain",
    title: "Word Bank Chain",
    tagline: "Ten terms, one chain",
    description: "Complete the module's additional-activity chain by choosing the right term for each definition.",
    route: "/play/word-chain",
    icon: "zap",
    kind: "chain",
    minutes: 6,
    goal: "software",
    xp: 70,
    color: "amber",
    lesson: "review"
  },
  {
    id: "reflection",
    title: "Reflection Journal",
    tagline: "Make it yours",
    description: "Finish the module's reflection prompts. Saved locally and synced when you sign in. Never auto-graded.",
    route: "/play/reflection",
    icon: "edit",
    kind: "journal",
    minutes: 10,
    goal: "explain",
    xp: 50,
    color: "mint",
    lesson: "review"
  },
  {
    id: "final",
    title: "Final Exam",
    tagline: "Fifteen items, one badge",
    description: "The module's post-test with explanations, a timer, and a best-score record. 80% earns Assembly Ready.",
    route: "/exam/final",
    icon: "award",
    kind: "quiz",
    minutes: 20,
    goal: "explain",
    xp: 150,
    color: "red",
    lesson: "review"
  }
];

export const ACTIVITY_BY_ID = Object.fromEntries(ACTIVITIES.map((activity) => [activity.id, activity]));

export function activitiesForGoal(goal) {
  return ACTIVITIES.filter((activity) => activity.goal === goal);
}

export function activityByRoute(pathname) {
  return ACTIVITIES.find((activity) => activity.route.split("?")[0] === pathname);
}
