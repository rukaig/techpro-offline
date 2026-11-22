import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { LESSONS, MODULES, lessonsForModule } from "../src/data/lessons.js";
import { ACTIVITIES } from "../src/data/activities.js";
import { GLOSSARY } from "../src/data/glossary.js";
import { PRETEST, POSTTEST, M2_PRETEST, M2_POSTTEST, LESSON_CHECKS } from "../src/data/quiz.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const moduleMd = fs.readFileSync(path.join(root, "content/module.md"), "utf8");
const module2Md = fs.readFileSync(path.join(root, "content/module2.md"), "utf8");

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

test("all 26 catalogue activities are defined and have valid metadata", () => {
  assert.equal(ACTIVITIES.length, 26, `Expected 26 activities, got ${ACTIVITIES.length}`);
  const requiredIds = [
    "pretest", "tech-wordle", "word-hunt", "pc-lab", "disassembly", "sort-station", "order-rush",
    "software-mission", "spot-mistake", "which-computer", "anatomy",
    "software-sorter", "case-files", "flashcards", "tech-checkup", "word-chain", "reflection", "final",
    "bios-pre", "startup-sequence", "bios-setup-lab", "boot-order-builder",
    "config-or-hardware", "bios-flashcards", "bios-case-files", "bios-final"
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

test("Module 2 source and lessons cover the BIOS/UEFI competencies", () => {
  assert.deepEqual(MODULES.map((module) => module.id), ["module1", "module2"]);
  const topics = [
    "BIOS/UEFI Configuration",
    "functions of BIOS and UEFI",
    "Access and navigate the setup utility safely",
    "Verify detected hardware",
    "Configure system date, time, and boot order",
    "Save or discard changes correctly",
    "POST",
    "Carlo"
  ];
  for (const topic of topics) {
    assert.ok(module2Md.includes(topic), `Module 2 source must mention ${topic}`);
  }

  const module2Lessons = lessonsForModule("module2");
  assert.equal(module2Lessons.length, 5);
  assert.deepEqual(module2Lessons.map((lesson) => lesson.id), [
    "bios-startup", "bios-setup", "bios-boot", "bios-safety", "bios-review"
  ]);
  for (const lesson of module2Lessons) {
    assert.equal(lesson.moduleId, "module2");
    assert.ok(LESSON_CHECKS[lesson.id]?.length >= 2, `${lesson.id} must have a quick check`);
  }
});

test("Module 2 has its own 15-item exams matching the document answer keys", () => {
  assert.equal(M2_PRETEST.items.length, 15);
  assert.equal(M2_POSTTEST.items.length, 15);
  assert.equal(M2_PRETEST.activityId, "bios-pre");
  assert.equal(M2_POSTTEST.activityId, "bios-final");
  const letters = (bank) => bank.items.map((item) => "ABCD"[item.answer]).join("");
  assert.equal(letters(M2_PRETEST), "ABCBAAACACADABC");
  assert.equal(letters(M2_POSTTEST), "CADBACBADAAABAC");
});

test("Module 2 glossary terms point to Module 2 lessons", () => {
  const ids = ["bios", "uefi", "firmware", "post", "setup-utility", "boot-order", "boot-device", "cmos-battery", "save-changes", "discard-changes"];
  for (const id of ids) {
    const entry = GLOSSARY.find((item) => item.id === id);
    assert.ok(entry, `Glossary must include ${id}`);
    assert.equal(entry.moduleId || lessonsForModule("module2").some((lesson) => lesson.id === entry.lesson), true);
    assert.ok(entry.lesson.startsWith("bios-"), `${id} should link to a Module 2 lesson`);
  }
});
