import { observeAuth } from "../services/firebase.js";
import { get } from "../services/store.js";
import { companionArt } from "../app/art.js";
import { companionName } from "../services/companion.js";
import { LESSONS } from "../data/lessons.js";
import { esc } from "../app/ui.js";

const MAX_QUESTION_LENGTH = 2000;
const SUGGESTED_PROMPTS = [
  { label: "Explain the CPU", prompt: "Explain the CPU like I am 10." },
  { label: "Quiz me on RAM", prompt: "Quiz me on RAM with five practice questions.", action: "quiz" },
  { label: "Driver or firmware?", prompt: "What is the difference between a device driver and firmware?" },
  { label: "Why unplug first?", prompt: "Why should I unplug a computer before opening the case?" },
  { label: "Check my study plan", prompt: "Check my study plan and suggest a few optional improvements.", action: "study-plan" }
];

export function assistantPage() {
  return `<div class="page-shell section assistant-page">
    <div class="assistant-intro">
      <p class="eyebrow">TechPro assistant</p>
      <h1>Ask about your module</h1>
      <p class="lede">A study helper grounded in the TechPro lessons. Answers stream as they are generated. Check the linked lesson and ask your instructor when a safety step is uncertain.</p>
    </div>
    <section class="card assistant-card" data-assistant-root aria-live="polite"><p class="card-pad">Checking your sign-in…</p></section>
  </div>`;
}

function createConversationId() {
  return crypto.randomUUID().replaceAll("-", "");
}

function makeMessage(message, index, state, onFeedback) {
  const article = document.createElement("article");
  article.className = `assistant-message ${message.role === "user" ? "is-user" : "is-assistant"}`;
  const who = document.createElement("p");
  who.className = "assistant-message-label";
  if (message.role === "user") {
    who.textContent = "You";
  } else {
    const avatar = document.createElement("span");
    avatar.className = "assistant-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.innerHTML = companionArt(message.pending ? "thinking" : "happy", { size: 28 });
    const name = document.createElement("span");
    name.textContent = companionName();
    who.append(avatar, name);
  }
  const body = document.createElement("p");
  body.className = "assistant-message-text";
  body.textContent = message.text || "";
  article.append(who, body);

  if (message.role === "model" && Array.isArray(message.sources) && message.sources.length) {
    const sources = document.createElement("div");
    sources.className = "assistant-sources";
    const label = document.createElement("span");
    label.textContent = "From the module:";
    sources.append(label);
    message.sources.forEach((source) => {
      if (!source || typeof source.title !== "string" || typeof source.route !== "string" || !source.route.startsWith("/library/")) return;
      const link = document.createElement("a");
      link.href = source.route;
      link.textContent = source.title;
      sources.append(link);
    });
    article.append(sources);
  }

  if (message.role === "model" && message.text) {
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "assistant-copy";
    copyButton.textContent = "Copy response";
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(message.text);
        copyButton.textContent = "Copied";
      } catch (error) {
        console.warn("Could not copy the assistant response.", error);
        copyButton.textContent = "Select text to copy";
      }
    });
    article.append(copyButton);
  }

  if (message.role === "model" && Number.isInteger(index) && !state.streaming && !message.pending) {
    const feedback = document.createElement("div");
    feedback.className = "assistant-feedback";
    const label = document.createElement("span");
    label.textContent = message.feedback ? "Thanks for your feedback." : "Was this helpful?";
    feedback.append(label);
    if (!message.feedback) {
      for (const [rating, text] of [["helpful", "Yes"], ["not-helpful", "Not yet"]]) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = text;
        button.addEventListener("click", () => onFeedback(index, rating, button));
        feedback.append(button);
      }
    }
    article.append(feedback);
  }
  return article;
}

export function mountAssistant(root) {
  const container = root.querySelector("[data-assistant-root]");
  const requestedLesson = new URLSearchParams(location.search).get("lesson");
  const contextLesson = LESSONS.find((lesson) => lesson.id === requestedLesson) || null;
  const state = {
    user: null, conversationId: "", messages: [], streaming: false, error: "", notice: "",
    contextId: contextLesson?.id || "", pendingAction: ""
  };
  let mounted = true;

  const render = () => {
    if (!mounted || !container) return;
    if (!state.user) {
      container.innerHTML = `
        <div class="card-pad assistant-locked">
          <h2>Sign in to start a conversation</h2>
          <p>Sign-in keeps your chat history private to your TechPro account.</p>
          ${state.error ? `<p class="assistant-status is-error" role="alert">${esc(state.error)}</p>` : ""}
          <a class="btn btn-primary mt-3" href="/account">Sign in or create an account</a>
        </div>`;
      return;
    }
    container.innerHTML = `
      <div class="assistant-toolbar">
        <div><span class="assistant-signed-in">Signed in as ${esc(state.user.email || "TechPro learner")}</span>
          ${contextLesson ? `<span class="assistant-context">Lesson context: ${esc(contextLesson.title)}</span>` : ""}
          <p class="assistant-status${state.error ? " is-error" : ""}" data-assistant-status role="status" aria-live="polite">${esc(state.error || state.notice)}</p></div>
        <button class="btn btn-ghost" type="button" data-new-chat ${state.streaming ? "disabled" : ""}>New chat</button>
      </div>
      <div class="assistant-log" data-assistant-log aria-label="Conversation"></div>
      <div class="assistant-suggestions"><span>Try asking</span>${SUGGESTED_PROMPTS.map((item, index) => `<button type="button" data-suggestion="${index}" ${state.streaming ? "disabled" : ""}>${esc(item.label)}</button>`).join("")}</div>
      <form class="assistant-form" data-assistant-form>
        <label for="assistant-question">Your question</label>
        <textarea id="assistant-question" name="question" maxlength="${MAX_QUESTION_LENGTH}" rows="3" placeholder="For example: Why should I label cables before disassembly?" required ${state.streaming ? "disabled" : ""}></textarea>
        <div class="assistant-form-actions"><span>Up to ${MAX_QUESTION_LENGTH} characters · Do not include passwords or private information.</span>
          <button class="btn btn-primary" type="submit" ${state.streaming ? "disabled" : ""}>${state.streaming ? "Thinking…" : "Ask"}</button></div>
      </form>
      <p class="assistant-disclaimer">AI can make mistakes. Use the linked lesson as your reference. Follow your instructor and manufacturer safety instructions.</p>
    `;
    const log = container.querySelector("[data-assistant-log]");
    state.messages.forEach((message, index) => log.append(makeMessage(message, message.saved ? index : null, state, sendFeedback)));
    log.scrollTop = log.scrollHeight;
    container.querySelector("[data-new-chat]")?.addEventListener("click", newChat);
    container.querySelector("[data-assistant-form]")?.addEventListener("submit", sendQuestion);
    container.querySelectorAll("[data-suggestion]").forEach((button) => {
      button.addEventListener("click", () => {
        const prompt = SUGGESTED_PROMPTS[Number(button.dataset.suggestion)];
        const textarea = container.querySelector("[name='question']");
        if (!prompt || !textarea) return;
        textarea.value = prompt.prompt;
        state.pendingAction = prompt.action || "";
        textarea.focus();
      });
    });
  };

  const userToken = async () => {
    if (!state.user) throw new Error("Sign in again to continue.");
    return state.user.getIdToken();
  };

  const apiRequest = async (url, options = {}) => {
    const token = await userToken();
    const response = await fetch(url, {
      ...options,
      headers: { Authorization: `Bearer ${token}`, ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers }
    });
    if (!response.ok) {
      let payload = {};
      try { payload = await response.json(); } catch { /* a streaming response may not be JSON */ }
      throw new Error(payload.error || `The request failed (${response.status}).`);
    }
    return response;
  };

  const loadHistory = async () => {
    const response = await apiRequest(`/api/assistant/history?conversation=${encodeURIComponent(state.conversationId)}`);
    const payload = await response.json();
    state.messages = Array.isArray(payload.messages)
      ? payload.messages.map((message) => ({ ...message, saved: true }))
      : [];
    state.error = "";
    render();
  };

  async function sendFeedback(index, rating, button) {
    button.disabled = true;
    try {
      await apiRequest("/api/assistant/feedback", {
        method: "POST",
        body: JSON.stringify({ conversationId: state.conversationId, messageIndex: index, rating })
      });
      if (state.messages[index]) state.messages[index].feedback = rating;
      state.error = "";
    } catch (error) {
      state.error = error.message;
    }
    render();
  }

  async function newChat() {
    const oldId = state.conversationId;
    try {
      await apiRequest(`/api/assistant/history?conversation=${encodeURIComponent(oldId)}`, { method: "DELETE" });
      state.conversationId = createConversationId();
      localStorage.setItem(`tp:assistant:conversation:${state.user.uid}`, state.conversationId);
      state.messages = [];
      state.error = "";
      state.notice = "Started a new conversation.";
    } catch (error) {
      state.error = error.message;
    }
    render();
  }

  async function sendQuestion(event) {
    event.preventDefault();
    if (state.streaming || !navigator.onLine) {
      state.error = navigator.onLine ? "" : "The assistant needs an internet connection. Your saved study plan remains available offline.";
      render();
      return;
    }
    const form = event.currentTarget;
    const question = String(new FormData(form).get("question") || "").trim();
    if (!question) return;

    state.messages.push({ role: "user", text: question });
    const responseMessage = { role: "model", text: "", sources: [], pending: true };
    state.messages.push(responseMessage);
    state.streaming = true;
    state.error = "";
    state.notice = "Generating a module-grounded answer…";
    const action = state.pendingAction;
    state.pendingAction = "";
    const plan = get().plan;
    const tasks = Array.isArray(plan.tasks) ? plan.tasks : [];
    const planSummary = {
      completed: tasks.filter((task) => task.completed).length,
      total: tasks.length,
      minutes: (Array.isArray(plan.sessions) ? plan.sessions : [])
        .reduce((sum, session) => sum + (Number(session.minutes) || 0), 0)
    };
    render();

    try {
      const response = await apiRequest("/api/assistant", {
        method: "POST",
        body: JSON.stringify({
          message: question,
          conversationId: state.conversationId,
          contextId: state.contextId,
          action,
          ...(action === "study-plan" ? { planSummary } : {})
        })
      });
      if (!response.body) throw new Error("Streaming is unavailable in this browser.");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let eventName = "";
      let dataLines = [];
      const handleEvent = async () => {
        const data = dataLines.join("\n");
        dataLines = [];
        if (eventName === "sources") {
          try { responseMessage.sources = JSON.parse(data); } catch { throw new Error("The assistant returned invalid source data."); }
        } else if (eventName === "delta") {
          try { responseMessage.text += JSON.parse(data); } catch { throw new Error("The assistant returned invalid response data."); }
        } else if (eventName === "error") {
          let payload = {};
          try { payload = JSON.parse(data); } catch { /* the server provides a safe generic message */ }
          throw new Error(payload.error || "The assistant could not finish that response.");
        }
        if (eventName !== "done") {
          state.notice = responseMessage.text ? "Answer is streaming…" : "Finding the right lesson…";
          render();
        }
        eventName = "";
      };

      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
        const blocks = buffer.split(/\r?\n\r?\n/);
        buffer = blocks.pop() || "";
        for (const block of blocks) {
          for (const line of block.split(/\r?\n/)) {
            if (line.startsWith("event:")) eventName = line.slice(6).trim();
            else if (line.startsWith("data:")) dataLines.push(line.slice(5).trimStart());
          }
          await handleEvent();
        }
        if (done) break;
      }
      responseMessage.pending = false;
      await loadHistory();
      state.notice = "";
    } catch (error) {
      responseMessage.pending = false;
      state.error = error.message || "The assistant could not finish that response.";
      state.notice = "";
      render();
    } finally {
      state.streaming = false;
      render();
    }
  }

  const stop = observeAuth(async (user, error) => {
    state.user = user;
    state.error = error ? error.message : "";
    if (!user) {
      state.conversationId = "";
      state.messages = [];
      render();
      return;
    }
    try {
      const key = `tp:assistant:conversation:${user.uid}`;
      state.conversationId = localStorage.getItem(key) || createConversationId();
      localStorage.setItem(key, state.conversationId);
      await loadHistory();
    } catch (loadError) {
      state.error = loadError.message || "Conversation history could not be loaded.";
      render();
    }
  });
  render();
  return () => {
    mounted = false;
    stop();
  };
}
