import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const moduleText = fs.readFileSync(path.join(root, "content/module.md"), "utf8").toLowerCase();
const vocab = JSON.parse(fs.readFileSync(path.join(root, "src/games/data/vocab.json"), "utf8"));
const facts = JSON.parse(fs.readFileSync(path.join(root, "src/games/data/facts.json"), "utf8"));
const activityData = JSON.parse(fs.readFileSync(path.join(root, "src/games/data/activity-data.json"), "utf8"));

test("every vocab term appears in module text", () => {
  for (const item of vocab) assert.ok(moduleText.includes(item.term.toLowerCase()), item.term);
});

test("every game data record has a module source", () => {
  for (const item of [...vocab, ...facts]) assert.equal(item.source, "content/module.md");
});

test("vocab terms are unique and normalized", () => {
  const names = vocab.map((item) => item.term.toLowerCase());
  assert.equal(new Set(names).size, names.length);
  for (const item of vocab) assert.equal(item.term, item.term.trim());
});

test("sort station has the module activity ten items", () => {
  assert.equal(activityData.sortItems.length, 10);
  assert.equal(new Set(activityData.sortItems.map((item) => item.name)).size, 10);
});

test("software mission has six unique module tools", () => {
  assert.equal(activityData.softwareSituations.length, 6);
  assert.equal(new Set(activityData.softwareSituations.map((item) => item.answer)).size, 6);
});

test("which computer includes exactly four module types", () => {
  assert.deepEqual(activityData.computerTypes, ["Desktop", "Laptop", "Tablet", "Server"]);
});
