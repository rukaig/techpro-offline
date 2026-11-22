import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ACTIVITIES } from "../src/data/activities.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const mainSource = read("src/app/main.js");
const playSource = read("src/pages/play.js");
const assistantSource = read("src/pages/assistant.js");
const pcLabSource = read("src/pages/pc-lab.js");

const idList = (source) => {
  const found = [];
  for (const match of source.matchAll(/params\.activity === "([^"]+)"/g)) found.push(match[1]);
  return found;
};

test("every catalogue activity has a real route handler", () => {
  const handled = new Set(idList(mainSource));
  // These use dedicated routes instead of the /play/:activity handler.
  handled.add("pc-lab");
  handled.add("disassembly");
  handled.add("pretest");
  handled.add("final");

  const missing = ACTIVITIES.filter((activity) => !handled.has(activity.id));
  assert.deepEqual(missing.map((activity) => activity.id), [], `Unrouted activities: ${missing.map((a) => a.title).join(", ")}`);
});

test("the play hub shows every catalogue activity exactly once", () => {
  const groupBlock = playSource.slice(playSource.indexOf("const GROUPS"), playSource.indexOf("const CONTROLS"));
  const grouped = [...groupBlock.matchAll(/"([a-z-]+)"/g)].map((match) => match[1])
    .filter((id) => ACTIVITIES.some((activity) => activity.id === id));
  const catalogue = ACTIVITIES.map((activity) => activity.id);
  assert.equal(new Set(grouped).size, grouped.length, "An activity is listed twice in the play hub");
  assert.deepEqual([...grouped].sort(), [...catalogue].sort());
});

test("no interactive can render a Start link that points back to itself", () => {
  assert.doesNotMatch(mainSource, /href="#\$\{activity\.route\}"[^>]*>Start/);
  assert.doesNotMatch(mainSource, /<a[^>]+href="#\$\{activity\.route\}/);
});

test("assistant stays offline and accepts lesson context", () => {
  assert.doesNotMatch(assistantSource, /\bfetch\s*\(/);
  assert.doesNotMatch(assistantSource, /api[_-]?key|gemini|openai|firebase/i);
  assert.match(assistantSource, /query\.get\(["']lesson["']\)/);
});

test("PC Lab is a self-contained simulation with no dead 3D controls", () => {
  assert.doesNotMatch(pcLabSource, /BUNDLE_URL|right-drag|3D bench|check the connection|three\.js/i);
  assert.match(pcLabSource, /pc-lab-workbench/);
});
