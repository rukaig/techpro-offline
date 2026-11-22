import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "src/games/data");
fs.mkdirSync(dataDir, { recursive: true });
const moduleText = fs.readFileSync(path.join(root, "content/module.md"), "utf8").toLowerCase();
const vocabPath = path.join(dataDir, "vocab.json");
const factsPath = path.join(dataDir, "facts.json");

const vocab = JSON.parse(fs.readFileSync(vocabPath, "utf8"));
for (const item of vocab) {
  if (!item.source || item.source !== "content/module.md") throw new Error(`Missing source for ${item.term}`);
  if (!moduleText.includes(item.term.toLowerCase())) throw new Error(`Vocab term missing from module: ${item.term}`);
}

const facts = JSON.parse(fs.readFileSync(factsPath, "utf8"));
for (const item of facts) {
  if (!item.source || item.source !== "content/module.md") throw new Error("Fact missing source");
}

const activityData = JSON.parse(fs.readFileSync(path.join(dataDir, "activity-data.json"), "utf8"));
for (const item of [...activityData.sortItems, ...activityData.softwareSituations]) {
  if (!item.source || item.source !== "content/module.md") throw new Error(`Activity data missing source: ${item.name || item.need}`);
}

console.log(`Built game data: ${vocab.length} vocab terms, ${facts.length} facts`);
