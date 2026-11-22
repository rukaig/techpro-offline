/* ==========================================================================
   Badges. Conditions are evaluated by services/progress.js.
   ========================================================================== */

export const BADGES = [
  { id: "first-step", name: "First Step", icon: "sparkle", description: "Open your first lesson in the Library.", hint: "Read any lesson." },
  { id: "bookworm", name: "Bookworm", icon: "bookOpen", description: "Mark all fourteen lessons across both modules as read.", hint: "Finish the whole library." },
  { id: "sorter", name: "Bin Boss", icon: "layers", description: "Finish Sort Station with at least 80% accuracy.", hint: "Classify the workstation items." },
  { id: "sequence", name: "Sequence Keeper", icon: "list", description: "Complete Order Rush with a perfect order.", hint: "Fix the six preparation steps." },
  { id: "toolsmith", name: "Toolsmith", icon: "puzzle", description: "Answer all six Software Mission situations correctly.", hint: "Pick the right tool every time." },
  { id: "eagle-eye", name: "Eagle Eye", icon: "eye", description: "Find all six unsafe practices in Spot the Mistake.", hint: "Inspect Alex's bench carefully." },
  { id: "anatomist", name: "Anatomist", icon: "motherboard", description: "Label every part in PC Anatomy Explorer.", hint: "Explore the diagram, then take the label challenge." },
  { id: "first-build", name: "First Build", icon: "wrench", description: "Complete a guided PC Lab build.", hint: "Finish the ten-step guided build." },
  { id: "clean-build", name: "Clean Build", icon: "award", description: "Earn three stars in a PC Lab build on Practice or Challenge.", hint: "Accuracy above 92% with very few strikes." },
  { id: "teardown", name: "Teardown Pro", icon: "screwdriver", description: "Complete Disassembly Mode.", hint: "Take the build apart in the correct order." },
  { id: "case-closed", name: "Case Closed", icon: "file", description: "Finish both Case Files situations.", hint: "Solve Andrea's and Carlo's cases." },
  { id: "recall", name: "Quick Recall", icon: "brain", description: "Finish the flashcard deck and the quick recap.", hint: "Review every term." },
  { id: "inspector", name: "Inspector", icon: "shield", description: "Complete a Tech Check-Up inspection.", hint: "Record a computer's components and recommendation." },
  { id: "wordchain", name: "Chain Reaction", icon: "zap", description: "Complete the ten-term Word Bank Chain.", hint: "Use each term once." },
  { id: "reflective", name: "Reflective", icon: "edit", description: "Write and save a reflection entry.", hint: "Answer at least one reflection prompt." },
  { id: "assembly-ready", name: "Assembly Ready", icon: "graduation", description: "Score 80% or higher on the Module 1 Final Exam.", hint: "Review, then take the post-test." },
  { id: "perfect-exam", name: "Perfect Post-Test", icon: "starFill", description: "Score 100% on the Module 1 Final Exam.", hint: "Every item correct." },
  { id: "bios-ready", name: "BIOS Ready", icon: "settings", description: "Score 80% or higher on the Module 2 BIOS/UEFI Post-Test.", hint: "Learn the startup path, then take the post-test." },
  { id: "perfect-bios", name: "Firmware Perfect", icon: "starFill", description: "Score 100% on the Module 2 BIOS/UEFI Post-Test.", hint: "Every firmware item correct." },
  { id: "three-day", name: "Warm Bench", icon: "flame", description: "Practise on three different days.", hint: "A short streak counts." },
  { id: "week-streak", name: "Week of Wires", icon: "calendar", description: "Keep a seven-day learning streak.", hint: "One activity a day." },
  { id: "goal-getter", name: "Goal Getter", icon: "target", description: "Reach 80% mastery in all four learning goals.", hint: "Read and practise across every goal." },
  { id: "daily", name: "Daily Spark", icon: "sun", description: "Complete a daily challenge.", hint: "Open the Daily Challenge on Home." },
  { id: "helper", name: "Bench Buddy", icon: "heart", description: "Rename your companion and finish an activity together.", hint: "Make your study buddy yours." }
];

export const BADGE_BY_ID = Object.fromEntries(BADGES.map((badge) => [badge.id, badge]));

export const LEVELS = [
  { level: 1, title: "Bench Rookie", xp: 0 },
  { level: 2, title: "Cable Finder", xp: 120 },
  { level: 3, title: "Part Picker", xp: 300 },
  { level: 4, title: "Static Slayer", xp: 560 },
  { level: 5, title: "Socket Sitter", xp: 900 },
  { level: 6, title: "Thermal Artist", xp: 1320 },
  { level: 7, title: "Cable Whisperer", xp: 1840 },
  { level: 8, title: "POST Master", xp: 2460 },
  { level: 9, title: "Build Captain", xp: 3200 },
  { level: 10, title: "COC 1 Graduate", xp: 4100 }
];

export function levelForXp(xp) {
  let current = LEVELS[0];
  let next = null;
  for (const entry of LEVELS) {
    if (xp >= entry.xp) current = entry;
    else { next = entry; break; }
  }
  const span = next ? next.xp - current.xp : 1;
  const into = xp - current.xp;
  return {
    ...current,
    next,
    progress: next ? Math.min(100, Math.round((into / span) * 100)) : 100,
    toNext: next ? Math.max(0, next.xp - xp) : 0
  };
}
