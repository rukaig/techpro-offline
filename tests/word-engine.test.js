import test from "node:test";
import assert from "node:assert/strict";
import { generateWordSearch, normalizeWord, seededShuffle, todaySeed, seedCode } from "../src/games/engine/kit.js";

test("word search placement is seeded and deterministic", () => {
  const a = generateWordSearch({ words: ["MOTHERBOARD", "PROCESSOR", "MEMORY"], size: 10, seed: 4821 });
  const b = generateWordSearch({ words: ["MOTHERBOARD", "PROCESSOR", "MEMORY"], size: 10, seed: 4821 });
  assert.deepEqual(a.grid, b.grid);
  assert.ok(a.placed.length > 0);
});

test("word search places all words in solvable straight positions", () => {
  const words = ["RAM", "CPU", "MEMORY", "SOFTWARE", "SAFETY"];
  const puzzle = generateWordSearch({ words, size: 12, seed: 12345 });
  assert.equal(puzzle.placed.length, words.length);
  for (const item of puzzle.placed) {
    assert.equal(item.positions.length, item.word.length);
  }
});

test("normalization uses uppercase letters only", () => {
  assert.equal(normalizeWord("Antistatic-wrist strap"), "ANTISTATICWRISTSTRAP");
});

test("seeded shuffle and daily seed are deterministic", () => {
  const items = ["a", "b", "c", "d"];
  assert.deepEqual(seededShuffle(items, 99), seededShuffle(items, 99));
  assert.equal(todaySeed(new Date(2026, 10, 22)), todaySeed(new Date(2026, 10, 22)));
  assert.match(seedCode(4821), /^TP-\d{4}$/);
});
