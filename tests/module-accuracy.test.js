import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { LESSONS } from "../src/data/lessons.js";
import { ACTIVITIES } from "../src/data/activities.js";
import { GLOSSARY } from "../src/data/glossary.js";
import { PRETEST, POSTTEST } from "../src/data/quiz.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const moduleMd = fs.readFileSync(path.join(root, "content/module.md"), "utf8");

test("module markdown contains expected core topics and lessons", () => {
  assert.ok(moduleMd.includes("Computer Systems Servicing"));
  assert.ok(moduleMd.includes("Assemble Computer Hardware"));
  assert.ok(moduleMd.includes("Lesson 1"));
  assert.ok(moduleMd.includes("Power Supply Unit"));
  assert.ok(moduleMd.includes("Motherboard"));
  assert.ok(moduleMd.includes("Central Processing Unit"));
});

test("all lessons map to verified module content", () => {
  assert.ok(LESSONS.length >= 8);
  for (const lesson of LESSONS) {
    assert.ok(lesson.id, "Lesson must have an id");
    assert.ok(lesson.title, "Lesson must have a title");
    assert.ok(lesson.sections && lesson.sections.length > 0, `Lesson ${lesson.id} must have sections`);
  }
});

test("all 14 interactive activities are defined and have valid metadata", () => {
  assert.ok(ACTIVITIES.length >= 14, `Expected at least 14 activities, got ${ACTIVITIES.length}`);
  const requiredIds = [
    "pretest", "pc-lab", "disassembly", "sort-station", "order-rush",
    "software-mission", "spot-mistake", "which-computer", "anatomy",
    "software-sorter", "case-files", "flashcards", "tech-checkup", "word-chain", "reflection"
  ];
  for (const id of requiredIds) {
    const act = ACTIVITIES.find((a) => a.id === id);
    assert.ok(act, `Activity ${id} must exist in catalogue`);
    assert.ok(act.title, `Activity ${id} must have title`);
    assert.ok(act.xp > 0, `Activity ${id} must award XP`);
    assert.ok(act.route, `Activity ${id} must have route`);
  }
});

test("pretest and posttest contain 15 items matching module specifications", () => {
  assert.equal(PRETEST.items.length, 15, "Pretest must contain 15 questions");
  assert.equal(POSTTEST.items.length, 15, "Posttest must contain 15 questions");

  for (const item of PRETEST.items) {
    assert.ok(item.prompt, "Question must have prompt text");
    assert.ok(Array.isArray(item.options) && item.options.length >= 3, "Question must have options");
    assert.ok(Number.isInteger(item.answer), "Question must have answer index");
    assert.ok(item.explain, "Question must have explanation");
  }

  for (const item of POSTTEST.items) {
    assert.ok(item.prompt, "Question must have prompt text");
    assert.ok(Array.isArray(item.options) && item.options.length >= 3, "Question must have options");
    assert.ok(Number.isInteger(item.answer), "Question must have answer index");
    assert.ok(item.explain, "Question must have explanation");
  }
});

test("glossary terms are present in content", () => {
  assert.ok(GLOSSARY.length >= 25);
  for (const g of GLOSSARY) {
    assert.ok(g.term);
    assert.ok(g.definition);
    assert.ok(g.lesson);
  }
});
