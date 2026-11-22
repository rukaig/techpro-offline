import { ACTIVITY_BY_ID } from "../data/activities.js";
import { activityHero, finishGame, bindResultPanel } from "../app/game-kit.js";
import { sound, vibrate } from "../app/audio.js";
import { seededShuffle, todaySeed } from "./engine/kit.js";

// Every entry is grounded in the module's software section (system software,
// utility software, firmware and application software).
const PROGRAMS = [
  ["Operating system", "System software", "Manages the computer's major resources and provides the interface for programs."],
  ["Device driver", "System software", "Lets the operating system communicate with a hardware device."],
  ["Firmware", "System software", "Low-level instructions stored inside a hardware device."],
  ["BIOS", "System software", "Firmware that starts the computer during boot."],
  ["UEFI", "System software", "Modern firmware used during computer startup."],
  ["Windows 11", "System software", "The module's example of an operating system."],
  ["Antivirus utility", "Utility", "Helps protect and maintain the computer."],
  ["Storage management tool", "Utility", "Helps manage drives and stored files."],
  ["Backup utility", "Utility", "Copies files to protect stored work."],
  ["File compression tool", "Utility", "Reduces file size for storage or transfer."],
  ["System diagnostic program", "Utility", "Checks the computer for problems."],
  ["Disk cleanup utility", "Utility", "Removes unnecessary files to free storage."],
  ["Word processor", "Application", "Creates and edits documents."],
  ["Spreadsheet", "Application", "Organizes numbers and calculations."],
  ["Presentation software", "Application", "Creates visual slides for presentations."],
  ["Web browser", "Application", "Displays pages and gives access to websites."],
  ["Graphics software", "Application", "Creates and edits images."],
  ["Multimedia software", "Application", "Plays or edits audio and video."]
];

const LANES = ["System software", "Utility", "Application"];

export function softwareSorterPage() {
  const activity = ACTIVITY_BY_ID["software-sorter"];
  const hero = activityHero(activity, {
    eyebrow: "Puzzle - Falling blocks",
    intro: "Steer each falling program into the right software column before the stack fills."
  });
  return hero + [
    "<section class=\"engagement-game sorter-game\" data-sorter-game>",
    "<div class=\"game-toolbar\">",
    `<span class="pill">Program <strong data-progress>1 / ${PROGRAMS.length}</strong></span>`,
    "<span class=\"pill\">Lines <strong data-lines>0</strong></span>",
    "<button class=\"icon-button\" type=\"button\" data-sorter-hint>Hint</button>",
    "</div>",
    "<div class=\"falling-zone\">",
    "<div class=\"falling-block\" data-falling-block tabindex=\"0\"></div>",
    "<div class=\"falling-lanes\">",
    LANES.map((name) => `<button class="falling-lane" type="button" data-lane="${name}"><strong>${name}</strong><span class="lane-stack" data-stack="${name}"></span></button>`).join(""),
    "</div>",
    "</div>",
    "<p class=\"game-feedback\" data-feedback role=\"status\">Choose a column for the falling program.</p>",
    "</section>"
  ].join("");
}

export function mountSoftwareSorter(root) {
  const activity = ACTIVITY_BY_ID["software-sorter"];
  const game = root.querySelector("[data-sorter-game]");
  const block = root.querySelector("[data-falling-block]");
  const feedback = root.querySelector("[data-feedback]");
  const progress = root.querySelector("[data-progress]");
  const linesLabel = root.querySelector("[data-lines]");
  const queue = seededShuffle(PROGRAMS, todaySeed());
  let index = 0;
  let score = 0;
  let lines = 0;
  let mistakes = 0;

  function show() {
    if (index >= queue.length) return finish();
    block.textContent = queue[index][0];
    progress.textContent = `${index + 1} / ${queue.length}`;
  }

  function replayClass(className) {
    block.classList.remove(className);
    void block.offsetWidth;
    block.classList.add(className);
  }

  function stackTile(lane, label, correct) {
    const tile = document.createElement("span");
    tile.className = "stack-tile " + (correct ? "is-good" : "is-junk");
    tile.textContent = correct ? label : "?";
    lane.querySelector(".lane-stack").appendChild(tile);
  }

  function finish() {
    const percent = Math.round((score / queue.length) * 100);
    game.innerHTML = finishGame({
      activity,
      score,
      total: queue.length,
      accuracy: percent,
      meta: { mode: "daily", mistakes },
      detail: "<div class=\"learned-list\"><p><strong>What you learned</strong></p><p>System software manages hardware, utilities maintain or protect it, and applications perform user tasks. Firmware such as BIOS and UEFI sits between hardware and the operating system.</p></div>"
    });
    bindResultPanel(game, () => window.location.reload());
  }

  root.querySelectorAll("[data-lane]").forEach((lane) => lane.addEventListener("click", () => {
    if (index >= queue.length) return;
    const item = queue[index];
    if (item[1] === lane.dataset.lane) {
      score += 1;
      lines += 1;
      stackTile(lane, item[0], true);
      lane.classList.add("is-cleared");
      setTimeout(() => lane.classList.remove("is-cleared"), 260);
      block.classList.remove("is-wrong");
      replayClass("is-dropping");
      feedback.textContent = item[0] + ": " + item[2];
      sound.correct();
      vibrate(12);
    } else {
      mistakes += 1;
      stackTile(lane, item[0], false);
      block.classList.remove("is-dropping");
      replayClass("is-wrong");
      feedback.textContent = "Wrong column. " + item[0] + " is " + item[1] + ". " + item[2];
      sound.wrong();
      vibrate(24);
    }
    linesLabel.textContent = String(lines);
    index += 1;
    show();
  }));

  root.querySelector("[data-sorter-hint]").addEventListener("click", () => {
    if (index < queue.length) {
      feedback.textContent = "Hint: " + queue[index][1] + " - " + queue[index][2];
    }
  });

  show();
}
