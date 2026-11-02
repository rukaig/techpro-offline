/* ==========================================================================
   Demo leaderboard.
   These are labelled DEMO students, not real classmates. The leaderboard
   always adds the signed-in (or local) player and marks demo rows clearly.
   ========================================================================== */

export const DEMO_PLAYERS = [
  { uid: "demo-1", displayName: "Mika Reyes", section: "11-ABM 1", xp: 2480, rating: 1186, streak: 9, badges: 14, stars: 31, isDemo: true, avatar: "MR", accent: "#b3261e" },
  { uid: "demo-2", displayName: "Jose Dela Cruz", section: "11-STEM 2", xp: 2260, rating: 1154, streak: 6, badges: 12, stars: 28, isDemo: true, avatar: "JD", accent: "#2e5b4f" },
  { uid: "demo-3", displayName: "Angela Santos", section: "11-ABM 1", xp: 1980, rating: 1128, streak: 12, badges: 11, stars: 26, isDemo: true, avatar: "AS", accent: "#7c5410" },
  { uid: "demo-4", displayName: "Rafael Mendoza", section: "12-TVLD 1", xp: 1840, rating: 1110, streak: 4, badges: 10, stars: 24, isDemo: true, avatar: "RM", accent: "#275a78" },
  { uid: "demo-5", displayName: "Trisha Lim", section: "11-STEM 1", xp: 1690, rating: 1092, streak: 3, badges: 9, stars: 22, isDemo: true, avatar: "TL", accent: "#8a1a14" },
  { uid: "demo-6", displayName: "Kian Navarro", section: "12-ICT 1", xp: 1540, rating: 1075, streak: 5, badges: 8, stars: 20, isDemo: true, avatar: "KN", accent: "#2e5b4f" },
  { uid: "demo-7", displayName: "Bea Villanueva", section: "11-ABM 2", xp: 1310, rating: 1051, streak: 2, badges: 7, stars: 18, isDemo: true, avatar: "BV", accent: "#7c5410" },
  { uid: "demo-8", displayName: "Marco Aquino", section: "12-ICT 1", xp: 1180, rating: 1038, streak: 1, badges: 6, stars: 16, isDemo: true, avatar: "MA", accent: "#275a78" },
  { uid: "demo-9", displayName: "Liza Domingo", section: "11-STEM 2", xp: 990, rating: 1021, streak: 0, badges: 5, stars: 14, isDemo: true, avatar: "LD", accent: "#8a1a14" },
  { uid: "demo-10", displayName: "Nico Pascual", section: "12-TVLD 1", xp: 820, rating: 1008, streak: 2, badges: 4, stars: 11, isDemo: true, avatar: "NP", accent: "#2e5b4f" },
  { uid: "demo-11", displayName: "Hannah Cruz", section: "11-ABM 1", xp: 640, rating: 994, streak: 0, badges: 3, stars: 9, isDemo: true, avatar: "HC", accent: "#7c5410" },
  { uid: "demo-12", displayName: "Paolo Garcia", section: "12-ICT 1", xp: 510, rating: 981, streak: 1, badges: 2, stars: 7, isDemo: true, avatar: "PG", accent: "#275a78" }
];

export const DAILY_CHALLENGES = [
  { id: "daily-1", title: "Name the board", prompt: "Which component connects the processor, memory, storage, and expansion cards?", options: ["Power supply", "Motherboard", "Cooling fan", "Case"], answer: 1, explain: "The motherboard is the main circuit board that connects and supports the other components.", xp: 30 },
  { id: "daily-2", title: "Before you open", prompt: "What is the first thing to do before disassembling a desktop?", options: ["Remove the RAM", "Open the case", "Shut down and unplug", "Remove the CPU"], answer: 2, explain: "Shut down properly and disconnect from the power source before anything else.", xp: 30 },
  { id: "daily-3", title: "Temporary workspace", prompt: "Which component clears when you turn off the computer?", options: ["SSD", "RAM", "HDD", "Firmware"], answer: 1, explain: "RAM is temporary working memory. Storage keeps data without power.", xp: 30 },
  { id: "daily-4", title: "Driver check", prompt: "A printer is connected but not recognised. What is most likely missing?", options: ["A device driver", "A web browser", "A spreadsheet", "More RAM"], answer: 0, explain: "The operating system needs a driver to communicate with the printer.", xp: 30 },
  { id: "daily-5", title: "Clip check", prompt: "How many RAM retaining clips should lock when a module is seated?", options: ["One", "Two", "None", "Four"], answer: 1, explain: "Both clips must lock. One open clip means the module is not fully seated.", xp: 30 },
  { id: "daily-6", title: "Paste portion", prompt: "How much thermal paste is usually right?", options: ["A small centered amount", "A thick full layer", "None, ever", "The whole tube"], answer: 0, explain: "A small centered amount is enough; the heat sink pressure spreads it.", xp: 30 },
  { id: "daily-7", title: "Before power", prompt: "Which item is part of the pre-power inspection?", options: ["Check that no cable blocks a fan", "Remove the case", "Install a game", "Unplug the SSD"], answer: 0, explain: "The module's inspection list includes checking that no cable blocks a cooling fan.", xp: 30 }
];

export function dailyChallenge(date = new Date()) {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
  return DAILY_CHALLENGES[day % DAILY_CHALLENGES.length];
}
