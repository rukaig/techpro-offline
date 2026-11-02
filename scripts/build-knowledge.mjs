import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modulePath = path.join(root, "content/module.md");
const curatedPath = path.join(root, "knowledge/computers.md");
const outputPath = path.join(root, "knowledge/index.json");
const MAX_CHUNK_LENGTH = 1800;

function routeFor(text) {
  const topic = text.toLowerCase();
  if (/disassembl|electrostatic|wrist strap|safety|cable|screw/.test(topic)) return "disassembly";
  if (/application software|word processor|spreadsheet|presentation software|image-edit/.test(topic)) return "application-software";
  if (/system software|operating system|device driver|utility software/.test(topic)) return "system-software";
  if (/desktop|laptop|tablet|server|type of computer/.test(topic)) return "types-of-computers";
  if (/processor|motherboard|memory|ram|power supply|storage|expansion card|internal component/.test(topic)) return "internal-hardware";
  if (/keyboard|monitor|mouse|printer|speaker|input device|output device/.test(topic)) return "external-hardware";
  return "computer-system";
}

function splitLongParagraph(paragraph) {
  const words = paragraph.split(/\s+/);
  const chunks = [];
  let chunk = "";
  for (const word of words) {
    if (chunk && `${chunk} ${word}`.length > MAX_CHUNK_LENGTH) {
      chunks.push(chunk);
      chunk = "";
    }
    chunk = chunk ? `${chunk} ${word}` : word;
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}

function packParagraphs(paragraphs) {
  const chunks = [];
  let current = "";
  for (const paragraph of paragraphs) {
    for (const part of splitLongParagraph(paragraph)) {
      const combined = current ? `${current}\n\n${part}` : part;
      if (combined.length > MAX_CHUNK_LENGTH && current) {
        chunks.push(current);
        current = part;
      } else {
        current = combined;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function parseCurated(markdown) {
  return markdown.split(/^## /m).slice(1).map((section) => {
    const [title, ...lines] = section.split(/\r?\n/);
    const content = lines.join("\n").trim();
    const id = content.match(/^id:\s*([a-z0-9-]+)\s*$/m)?.[1];
    const lessonId = content.match(/^lesson:\s*([a-z0-9-]+)\s*$/m)?.[1];
    const text = content.replace(/^id:.*\r?\n?/m, "").replace(/^lesson:.*\r?\n?/m, "").trim();
    if (!id || !lessonId || !text) throw new Error(`Invalid curated knowledge section: ${title}`);
    return { id, title: title.trim(), lessonId, route: `/library/${lessonId}`, text, source: "curated" };
  });
}

const [moduleMarkdown, curatedMarkdown] = await Promise.all([
  readFile(modulePath, "utf8"),
  readFile(curatedPath, "utf8")
]);
const lessonStart = moduleMarkdown.search(/^\|\s*Lesson\s+\d+\s*\|/m);
const answerKeyStart = moduleMarkdown.search(/^\|\s*\[\[IMG:[^\]]+\]\]\s*\|\s*Answer Key\s*\|/im);
if (lessonStart < 0 || answerKeyStart <= lessonStart) {
  throw new Error("Could not locate the lesson body and answer-key boundary in content/module.md.");
}

const lessonText = moduleMarkdown.slice(lessonStart, answerKeyStart)
  .replace(/\[\[IMG:[^\]]+\]\]/g, "")
  .replace(/^\s*_{4,}\s*$/gm, "")
  .replace(/^\s*\|[\s:|-]+\|\s*$/gm, "")
  .replace(/\n{3,}/g, "\n\n")
  .trim();
const lessonParagraphs = lessonText.split(/\n\s*\n/)
  .map((paragraph) => paragraph.replace(/^\s*\|+\s*|\s*\|+\s*$/g, "").trim())
  .filter((paragraph) => paragraph.length >= 80);
const moduleChunks = packParagraphs(lessonParagraphs).map((text, index) => {
  const lessonId = routeFor(text);
  return {
    id: `module-${String(index + 1).padStart(3, "0")}`,
    title: `Module source passage ${index + 1}`,
    lessonId,
    route: `/library/${lessonId}`,
    text,
    source: "module"
  };
});
const entries = [...parseCurated(curatedMarkdown), ...moduleChunks];
if (entries.length === 0) throw new Error("Assistant knowledge index is empty.");
await writeFile(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Built ${entries.length} assistant sources: ${moduleChunks.length} module passages and ${entries.length - moduleChunks.length} curated notes.`);
