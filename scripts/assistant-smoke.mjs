#!/usr/bin/env node
// Runs the five Phase 0 assistant questions. Uses the real Gemini API when
// GEMINI_API_KEY is configured; otherwise exercises the exact request,
// streaming, and sanitizing path with a deterministic mock client.
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStreamSanitizer, retrieveKnowledge } = require("../server/assistant-utils.js");
const { SYSTEM_INSTRUCTION } = require("../server/assistant-prompt.js");
const knowledge = require("../knowledge/index.json");

const QUESTIONS = [
  "Why should I unplug the computer before opening the case?",
  "What is the difference between a device driver and firmware?",
  "How do I align a RAM stick in its slot?",
  "Quiz me on RAM with five practice questions.",
  "What does the TechPro module say about ESD safety?"
];

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
const live = process.argv.includes("--live") || Boolean(process.env.GEMINI_API_KEY);

const MOCK_ANSWERS = [
  "Unplugging the computer removes live power before your hands go near the parts. Even when the screen is off, the power supply can hold charge. Shut down properly, switch off the power supply, unplug the cord, then press the power button once to drain leftover power. After that, put on an anti-static wrist strap before touching the motherboard. This follows the TechPro safety steps for preparing to assemble hardware.",
  "A driver is software that tells the operating system how to talk to one specific device, such as a printer. Firmware is software stored on the device itself, such as the BIOS or UEFI chip on the motherboard. The driver can be updated or reinstalled from the operating system. Firmware is updated with a special tool and stays with the hardware. TechPro covers this under software and hardware support.",
  "Open both clips on the RAM slot. Match the notch on the memory stick to the key in the slot, then press both ends down firmly and evenly until the clips click into place. Never force it. If the notch does not line up, flip the stick around and try again. Handle the stick by its edges to avoid touching the gold contacts.",
  "Here are five practice questions. 1. What does RAM stand for? 2. What happens to the data in RAM when the computer loses power? 3. Which is faster for active work, RAM or a hard drive? 4. What does the notch on a RAM stick prevent? 5. Why should you touch the case before handling a RAM stick? Answer them in your own words and I will check them with you.",
  "The TechPro module says to use an anti-static wrist strap, work on a hard and uncluttered surface, and touch the bare metal case before handling parts. Keep components in anti-static bags until you need them. Do not wear loose clothing or jewelry near the work area. Never work on a plugged-in computer. If you are unsure about a safety step, stop and ask your instructor."
];

// Deliberately awkward chunk boundaries, including a split code fence and
// split markdown markers, to prove the stateful sanitizer holds state.
function mockChunks(text, index) {
  const marked = `${text}\n\n**Safety note:** \`check the notch\` before you press.`;
  const shifts = [3, 11, 7, 17, 5];
  const step = shifts[index % shifts.length];
  const chunks = [];
  for (let start = 0; start < marked.length; start += step) {
    chunks.push(marked.slice(start, start + step));
  }
  return chunks;
}

async function answerLive(question) {
  const sources = retrieveKnowledge(question, knowledge);
  const sourceContext = sources.map((source) => `[${source.title}]\n${source.text}`).join("\n\n");
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const stream = await ai.models.generateContentStream({
    model: MODEL,
    contents: [{
      role: "user",
      parts: [{ text: `Question: ${question}\n\nTechPro module sources for this question:\n${sourceContext || "No directly relevant TechPro module source was found."}` }]
    }],
    config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.3, maxOutputTokens: 700 }
  });
  const sanitizer = createStreamSanitizer();
  let text = "";
  for await (const chunk of stream) text += sanitizer.push(chunk.text || "");
  return (text + sanitizer.end()).trim();
}

function answerMock(question, index) {
  const sanitizer = createStreamSanitizer();
  let text = "";
  for (const chunk of mockChunks(MOCK_ANSWERS[index], index)) text += sanitizer.push(chunk);
  return (text + sanitizer.end()).trim();
}

console.log(live ? `LIVE Gemini run (${MODEL})` : "MOCKED Gemini run (no GEMINI_API_KEY in the server environment)");
let failures = 0;
for (const [index, question] of QUESTIONS.entries()) {
  const reply = live ? await answerLive(question) : answerMock(question, index);
  if (!reply || /\*\*|```|^#/m.test(reply)) failures += 1;
  console.log(`\n=== Q${index + 1}: ${question}\n${reply}`);
}
console.log(`\n${failures ? `FAILED: ${failures} reply/replies were empty or leaked markdown.` : "All five replies are non-empty and markdown-free."}`);
process.exitCode = failures ? 1 : 0;
