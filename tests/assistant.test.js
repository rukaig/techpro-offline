const test = require("node:test");
const assert = require("node:assert/strict");
const knowledge = require("../knowledge/index.json");
const {
  sanitizePrompt, sanitizeAssistantText, isValidConversationId, retrieveKnowledge, MAX_PROMPT_LENGTH
} = require("../server/assistant-utils.js");

test("sanitizes prompt whitespace, controls, and excessive length", () => {
  assert.equal(sanitizePrompt("  What is\u0000 RAM?\n"), "What is RAM?");
  assert.equal(sanitizePrompt("x".repeat(MAX_PROMPT_LENGTH + 20)).length, MAX_PROMPT_LENGTH);
  assert.throws(() => sanitizePrompt(" \u0000 "), /Enter a question/);
  assert.throws(() => sanitizePrompt(null), /Enter a question/);
});

test("accepts only bounded safe conversation identifiers", () => {
  assert.equal(isValidConversationId("conversation_123"), true);
  assert.equal(isValidConversationId("../../private"), false);
  assert.equal(isValidConversationId("short"), false);
  assert.equal(isValidConversationId("x".repeat(65)), false);
});

test("retrieves relevant module sources and returns no unrelated fallback", () => {
  const moduleSources = knowledge.filter((entry) => entry.source === "module");
  assert.ok(moduleSources.length > 0);
  assert.ok(moduleSources.every((entry) => !/Answer Key|What I KnowB/.test(entry.text)));
  const results = retrieveKnowledge("How do I protect RAM from static electricity?", knowledge);
  assert.ok(results.some((entry) => entry.id === "safety"));
  assert.deepEqual(retrieveKnowledge("Tell me about space travel", knowledge), []);
});

test("sanitizes markdown while preserving code, filenames, units, and URLs", () => {
  const response = `## **Check the build**
- Run \`node server.js\` and review \`setup_file.js\`.
The system has 8 GB RAM. Visit https://example.com/a?size=8GB.
~~Avoid~~ forcing a part!!!`;
  assert.equal(sanitizeAssistantText(response), [
    "Check the build",
    "Run node server.js and review setup_file.js.",
    "The system has 8 GB RAM. Visit https://example.com/a?size=8GB.",
    "Avoid forcing a part!"
  ].join("\n"));
});

test("keeps fenced code and natural contractions intact", () => {
  const response = "Don't force the RAM.\n```js\nconst memory_size = 8 * 1024;\nconsole.log('8 GB');\n```\nRead https://example.com/part_(a).";
  assert.equal(sanitizeAssistantText(response), [
    "Don't force the RAM.",
    "const memory_size = 8 * 1024;",
    "console.log('8 GB');",
    "Read https://example.com/part_(a)."
  ].join("\n"));
});

test("normalizes tabs, carriage returns, and extra whitespace", () => {
  assert.equal(sanitizePrompt("  What\tis\r\nRAM?\u0000  "), "What is RAM?");
  assert.equal(sanitizeAssistantText("**Bold**\tand\n\n_italic_\r\n"), [
    "Bold and",
    "",
    "italic"
  ].join("\n"));
});
