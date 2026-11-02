const MAX_PROMPT_LENGTH = 2000;
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g;

function sanitizePrompt(value) {
  if (typeof value !== "string") throw new TypeError("Enter a question before sending.");
  const prompt = value.normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .replace(/\t/g, " ")
    .replace(CONTROL_CHARACTERS, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!prompt) throw new TypeError("Enter a question before sending.");
  return prompt.slice(0, MAX_PROMPT_LENGTH);
}

function isValidConversationId(value) {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{8,64}$/.test(value);
}

function retrieveKnowledge(query, entries, limit = 4) {
  if (typeof query !== "string" || !Array.isArray(entries)) return [];
  const words = (value) => String(value ?? "").toLowerCase().match(/[\p{L}\p{N}]{2,}/gu) || [];
  const stopWords = new Set(["about", "after", "also", "and", "are", "before", "can", "does", "for", "from", "how", "into", "its", "need", "should", "that", "the", "their", "then", "this", "what", "when", "where", "which", "with", "would", "your"]);
  const queryWords = [...new Set(words(query).filter((word) => !stopWords.has(word)))];
  if (!queryWords.length) return [];
  const minimumScore = queryWords.length > 1 ? 2 : 1;

  return entries.map((entry) => {
    const title = String(entry?.title ?? "");
    const text = String(entry?.text ?? "");
    const titleWords = new Set(words(title));
    const contentWords = new Set(words(`${title} ${text}`));
    const score = queryWords.reduce((sum, word) => sum + (titleWords.has(word) ? 3 : contentWords.has(word) ? 1 : 0), 0);
    return { entry, score };
  }).filter(({ score }) => score >= minimumScore)
    .sort((a, b) => b.score - a.score || String(a.entry?.title ?? "").localeCompare(String(b.entry?.title ?? "")))
    .slice(0, limit)
    .map(({ entry }) => entry);
}

function sanitizeAssistantText(value) {
  if (typeof value !== "string") return "";
  const protectedParts = [];
  const protect = (text) => {
    const index = protectedParts.push(text) - 1;
    return `\uE000${index}\uE001`;
  };
  let text = value.normalize("NFKC").replace(/\r\n?/g, "\n").replace(/\t/g, " ");
  text = text.replace(/```[^\n]*\n?([\s\S]*?)```/g, (_, code) => protect(code.trimEnd()));
  text = text.replace(/`([^`\n]+)`/g, (_, code) => protect(code));
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, "$1: $2");
  text = text.replace(/\b(?:https?:\/\/|www\.)[^\s<>]+/gi, (url) => protect(url));
  text = text.replace(/^\s{0,3}#{1,6}\s+/gm, "");
  text = text.replace(/^\s{0,3}>\s?/gm, "");
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*$/gm, "");
  text = text.replace(/(\*\*|__|~~)([\s\S]+?)\1/g, "$2");
  text = text.replace(/(?<![\p{L}\p{N}])([*_])([^*_\n]+)\1(?![\p{L}\p{N}])/gu, "$2");
  text = text.replace(/“([^”\n]+)”/g, "$1").replace(/"([^"\n]+)"/g, "$1");
  text = text.replace(/‘([^’\n]+)’/g, "$1")
    .replace(/(?<![\p{L}\p{N}])'([^'\n]+)'(?![\p{L}\p{N}])/gu, "$1");
  text = text.replace(/[()[\]{}]/g, "");
  text = text.replace(/([!?.,])\1{1,}/g, "$1");
  text = text.replace(/[*_~`]/g, "");
  text = text.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, "");
  text = text.replace(/\n{3,}/g, "\n\n").trim();
  return text.replace(/\uE000(\d+)\uE001/g, (_, index) => protectedParts[Number(index)] || "");
}

module.exports = {
  sanitizePrompt, sanitizeAssistantText, isValidConversationId, retrieveKnowledge, MAX_PROMPT_LENGTH
};
