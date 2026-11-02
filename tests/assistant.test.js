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

const { createStreamSanitizer, createRateLimiter } = require("../server/assistant-utils.js");

const collapse = (text) => String(text).replace(/\s+/g, " ").trim();

test("stream sanitizer matches non-stream sanitizing at every split point", () => {
  const input = [
    "## **Set out your tools**",
    "- Use an anti-static wrist strap, then unplug the power cord.",
    "The board has 8 GB of RAM and a 512 GB SSD.",
    "",
    "Read https://example.com/parts_manual for the labeled diagram."
  ].join("\n");
  const expected = collapse(sanitizeAssistantText(input));
  for (let split = 0; split <= input.length; split += 1) {
    const sanitizer = createStreamSanitizer();
    let output = sanitizer.push(input.slice(0, split));
    output += sanitizer.push(input.slice(split));
    output += sanitizer.end();
    assert.equal(collapse(output), expected, `split at ${split}`);
  }
});

test("stream sanitizer keeps fenced code intact when a fence splits mid-token", () => {
  const chunks = ["```js\nconst memory", "_size = 8 * 1024;\n", "console.log('8 GB');\n``", "`\nDone."];
  const sanitizer = createStreamSanitizer();
  const output = chunks.map((chunk) => sanitizer.push(chunk)).join("") + sanitizer.end();
  assert.match(output, /const memory_size = 8 \* 1024;/);
  assert.match(output, /console\.log\('8 GB'\);/);
  assert.match(output, /Done\./);
  assert.doesNotMatch(output, /```/);
});

test("stream sanitizer never leaks split markdown markers", () => {
  const input = "**Bold** and _italic_ and `code` and [link](https://example.com/a_(b)) then ~~gone~~.";
  for (let split = 0; split <= input.length; split += 1) {
    const sanitizer = createStreamSanitizer();
    const output = sanitizer.push(input.slice(0, split)) + sanitizer.push(input.slice(split)) + sanitizer.end();
    assert.doesNotMatch(output, /\*\*|~~|`|```/, `split at ${split}: ${output}`);
    assert.match(output, /Bold/, `split at ${split}`);
  }
});

test("stream sanitizer handles CRLF split across chunks", () => {
  const sanitizer = createStreamSanitizer();
  const output = sanitizer.push("First line\r") + sanitizer.push("\nSecond line\r\nThird") + sanitizer.end();
  assert.equal(collapse(output), "First line Second line Third");
});

test("rate limiter enforces a 20-per-10-minute window per learner", () => {
  let clock = 1_000_000;
  const limiter = createRateLimiter({ limit: 20, windowMs: 10 * 60_000, now: () => clock });
  for (let index = 0; index < 20; index += 1) {
    assert.equal(limiter.consume("learner-a").allowed, true, `attempt ${index + 1}`);
  }
  const blocked = limiter.consume("learner-a");
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 600);
  assert.equal(limiter.consume("learner-b").allowed, true, "other learners keep their own bucket");

  clock += 9 * 60_000;
  assert.equal(limiter.consume("learner-a").allowed, false, "still inside the window");
  clock += 60_001;
  assert.equal(limiter.consume("learner-a").allowed, true, "window rolls over");
});

test("rate limiter reports the remaining window on the retry header", () => {
  let clock = 0;
  const limiter = createRateLimiter({ limit: 2, windowMs: 60_000, now: () => clock });
  limiter.consume("k");
  clock += 20_000;
  limiter.consume("k");
  const blocked = limiter.consume("k");
  assert.equal(blocked.retryAfterSeconds, 40);
});
