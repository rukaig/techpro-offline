/* Pure Node unit tests for the offline Ask TechPro helper.
   No DOM, no browser, no network, no build step required. */
import test from "node:test";
import assert from "node:assert/strict";
import { assistantPage, searchOfflineKnowledge } from "../src/pages/assistant.js";

test("RAM query returns RAM-related offline answer", () => {
  const result = searchOfflineKnowledge("RAM");
  assert.ok(result, "a search result object is returned");
  assert.match(result.common?.answer || "", /RAM|Random Access Memory/);
  assert.ok(result.confidence >= 0.55, "RAM should be a strong match");
  assert.ok(result.matchedTerms.includes("ram"));
});

test("gibberish does not produce a primary answer or high confidence", () => {
  const result = searchOfflineKnowledge("qzxwv plokm nbvcx");
  assert.equal(result.common, null);
  assert.equal(result.glossary, null);
  assert.deepEqual(result.sources, []);
  assert.deepEqual(result.matchedTerms, []);
  assert.ok(result.confidence < 0.2, `confidence was ${result.confidence}`);
});

test("synonym 'processor' maps to the authored CPU answer", () => {
  const result = searchOfflineKnowledge("processor");
  assert.ok(result.common, "CPU answer should be the primary answer");
  assert.match(result.common.question, /CPU/);
  assert.ok(result.common.keywords.includes("processor"));
  assert.equal(result.common.lessonId, "internal-hardware");
  assert.ok(result.matchedTerms.includes("cpu"), "processor is canonicalised to cpu");
});

test("lesson query renders contextual lesson explainer markup", () => {
  const query = new URLSearchParams("lesson=internal-hardware");
  const html = assistantPage({ query });
  assert.match(html, /assistant-lesson-card/);
  assert.match(html, /data-assistant-lesson="internal-hardware"/);
  assert.match(html, /assistant-summary/);
  assert.match(html, /Internal Hardware/);
  assert.match(html, /What to remember/);
  assert.match(html, /Key terms from this lesson/);
  assert.match(html, /value="Internal Hardware"/, "search box is prefilled with the lesson title");
  assert.match(html, /href="#\/library\/internal-hardware"/, "links back to the lesson");
  assert.match(html, /href="#\/play\/anatomy"/, "links to a related interactive");
});
