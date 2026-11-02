require("dotenv").config();

const path = require("path");
const express = require("express");
const compression = require("compression");
const QRCode = require("qrcode");
const { GoogleGenAI } = require("@google/genai");
const {
  sanitizePrompt, isValidConversationId, retrieveKnowledge,
  createStreamSanitizer, createRateLimiter
} = require("./server/assistant-utils.js");
const { SYSTEM_INSTRUCTION } = require("./server/assistant-prompt.js");
const assistantKnowledge = require("./knowledge/index.json");

const app = express();
const port = Number(process.env.PORT) || 3000;
const root = __dirname;
const MAX_HISTORY_MESSAGES = 24;
const DEFAULT_ASSISTANT_MODEL = "gemini-3.5-flash-lite";
const ASSISTANT_MODEL = (process.env.GEMINI_MODEL || DEFAULT_ASSISTANT_MODEL).trim();
const ASSISTANT_TIMEOUT_MS = Math.max(5_000, Number(process.env.ASSISTANT_TIMEOUT_MS) || 30_000);
const RATE_LIMIT = Math.max(1, Number(process.env.ASSISTANT_RATE_LIMIT) || 20);
const RATE_WINDOW_MS = Math.max(1, Number(process.env.ASSISTANT_RATE_WINDOW_MINUTES) || 10) * 60_000;
const GLOBAL_RATE_LIMIT = Math.max(1, Number(process.env.ASSISTANT_GLOBAL_LIMIT) || 300);
const globalAssistantLimiter = createRateLimiter({ limit: GLOBAL_RATE_LIMIT, windowMs: 60_000 });
const userAssistantLimiter = createRateLimiter({ limit: RATE_LIMIT, windowMs: RATE_WINDOW_MS });
let adminServices;

app.disable("x-powered-by");
app.use(compression());
app.use(express.json({ limit: "8kb" }));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  if (req.path.startsWith("/assets/fonts/")) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  }
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, app: "TechPro COC 1", time: new Date().toISOString() });
});

app.get("/api/assistant/health", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.json({ configured: Boolean(process.env.GEMINI_API_KEY), model: ASSISTANT_MODEL });
});

function getAdminServices() {
  if (adminServices) return adminServices;
  const { applicationDefault, cert, getApps, initializeApp } = require("firebase-admin/app");
  const { getAuth } = require("firebase-admin/auth");
  const { getFirestore, FieldValue } = require("firebase-admin/firestore");
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT;
  let credential = applicationDefault();
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    let serviceAccount;
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    } catch (error) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON must contain valid JSON.", { cause: error });
    }
    credential = cert(serviceAccount);
  }
  const appOptions = { credential };
  if (projectId) appOptions.projectId = projectId;
  const firebaseApp = getApps().find((item) => item.name === "techpro-server")
    || initializeApp(appOptions, "techpro-server");
  adminServices = {
    auth: getAuth(firebaseApp),
    db: getFirestore(firebaseApp),
    FieldValue
  };
  return adminServices;
}

function requireFirebaseUser(req, res, next) {
  const authorization = req.get("authorization") || "";
  const tokenMatch = /^Bearer ([^\s]+)$/.exec(authorization);
  if (!tokenMatch || tokenMatch[1].length > 8192) {
    res.status(401).json({ error: "Sign in to use the assistant." });
    return;
  }
  try {
    const services = getAdminServices();
    services.auth.verifyIdToken(tokenMatch[1], true).then((decoded) => {
      req.firebaseUser = decoded;
      next();
    }).catch((error) => {
      if (["app/invalid-credential", "auth/invalid-credential"].includes(error.code)) {
        console.error("Firebase Admin credentials are unavailable or invalid.", error);
        res.status(503).json({ error: "Firebase Admin credentials are not configured correctly on this server." });
        return;
      }
      console.warn("Firebase ID token verification failed.", error.code || error.message);
      res.status(401).json({ error: "Your session could not be verified. Sign in again." });
    });
  } catch (error) {
    console.error("Firebase Admin could not initialize.", error);
    res.status(503).json({ error: "Cloud features are not configured on this server yet." });
  }
}

function assistantRateLimit(req, res, next) {
  const userResult = userAssistantLimiter.consume(`${req.firebaseUser.uid}:${req.ip}`);
  if (!userResult.allowed) {
    res.setHeader("Retry-After", String(userResult.retryAfterSeconds));
    res.status(429).json({
      error: `You have asked ${RATE_LIMIT} questions in a short time. Please wait about ${Math.ceil(userResult.retryAfterSeconds / 60)} minute${userResult.retryAfterSeconds > 60 ? "s" : ""} and try again.`
    });
    return;
  }
  const globalResult = globalAssistantLimiter.consume("all-learners");
  if (!globalResult.allowed) {
    res.setHeader("Retry-After", String(globalResult.retryAfterSeconds));
    res.status(429).json({ error: "The assistant is very busy right now. Please try again in a minute." });
    return;
  }
  next();
}

function conversationRef(uid, id) {
  return getAdminServices().db.collection("techpro_assistant").doc(uid)
    .collection("conversations").doc(id);
}

function validatedConversationId(value, res) {
  if (isValidConversationId(value)) return value;
  res.status(400).json({ error: "That conversation could not be found. Start a new chat." });
  return null;
}

app.get("/api/assistant/history", requireFirebaseUser, async (req, res) => {
  const conversationId = validatedConversationId(req.query.conversation, res);
  if (!conversationId) return;
  try {
    const snapshot = await conversationRef(req.firebaseUser.uid, conversationId).get();
    const messages = snapshot.exists && Array.isArray(snapshot.data().messages)
      ? snapshot.data().messages.slice(-MAX_HISTORY_MESSAGES)
      : [];
    res.json({ messages });
  } catch (error) {
    console.error("Could not load assistant conversation.", error);
    res.status(503).json({ error: "Conversation history is temporarily unavailable." });
  }
});

app.delete("/api/assistant/history", requireFirebaseUser, async (req, res) => {
  const conversationId = validatedConversationId(req.query.conversation, res);
  if (!conversationId) return;
  try {
    await conversationRef(req.firebaseUser.uid, conversationId).delete();
    res.status(204).end();
  } catch (error) {
    console.error("Could not delete assistant conversation.", error);
    res.status(503).json({ error: "Conversation history could not be deleted." });
  }
});

app.post("/api/assistant/feedback", requireFirebaseUser, async (req, res) => {
  const { conversationId, messageIndex, rating } = req.body || {};
  if (!isValidConversationId(conversationId) || !Number.isInteger(messageIndex)
    || messageIndex < 0 || messageIndex >= MAX_HISTORY_MESSAGES || !["helpful", "not-helpful"].includes(rating)) {
    res.status(400).json({ error: "That feedback could not be saved." });
    return;
  }
  try {
    const ref = conversationRef(req.firebaseUser.uid, conversationId);
    const snapshot = await ref.get();
    const messages = snapshot.exists && Array.isArray(snapshot.data().messages) ? snapshot.data().messages : [];
    const message = messages[messageIndex];
    if (!message || message.role !== "model") {
      res.status(404).json({ error: "That assistant response is no longer available." });
      return;
    }
    messages[messageIndex] = { ...message, feedback: rating };
    await ref.set({ messages, updatedAt: getAdminServices().FieldValue.serverTimestamp() }, { merge: true });
    res.status(204).end();
  } catch (error) {
    console.error("Could not save assistant feedback.", error);
    res.status(503).json({ error: "Feedback could not be saved right now." });
  }
});

app.post("/api/assistant", requireFirebaseUser, assistantRateLimit, async (req, res) => {
  let question;
  try {
    question = sanitizePrompt(req.body?.message ?? req.body?.question);
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  const conversationId = validatedConversationId(req.body?.conversationId, res);
  if (!conversationId) return;
  if (!process.env.GEMINI_API_KEY) {
    res.status(503).json({ error: "The TechPro assistant is not configured on this server yet. Your plan and saved work still work offline." });
    return;
  }

  const ref = conversationRef(req.firebaseUser.uid, conversationId);
  let assistantAbort = null;
  try {
    const snapshot = await ref.get();
    const previousMessages = snapshot.exists && Array.isArray(snapshot.data().messages)
      ? snapshot.data().messages.filter((message) => ["user", "model"].includes(message.role)
        && typeof message.text === "string").slice(-10)
      : [];
    const contextId = typeof req.body?.contextId === "string" && /^[a-z0-9-]{1,60}$/.test(req.body.contextId)
      ? req.body.contextId
      : "";
    const action = ["quiz", "study-plan"].includes(req.body?.action) ? req.body.action : "";
    const suppliedPlan = req.body?.planSummary;
    const planSummary = action === "study-plan"
      && Number.isInteger(suppliedPlan?.completed) && suppliedPlan.completed >= 0
      && Number.isInteger(suppliedPlan?.total) && suppliedPlan.total >= suppliedPlan.completed && suppliedPlan.total <= 200
      && Number.isInteger(suppliedPlan?.minutes) && suppliedPlan.minutes >= 0 && suppliedPlan.minutes <= 100_000
      ? `The learner's local study plan shows ${suppliedPlan.completed} of ${suppliedPlan.total} tasks complete and ${suppliedPlan.minutes} minutes logged. Treat this as user-provided progress, offer optional suggestions, and do not change the plan.`
      : "";
    const matchedSources = retrieveKnowledge(question, assistantKnowledge);
    const contextualSource = contextId
      ? assistantKnowledge.find((entry) => entry.lessonId === contextId)
      : null;
    const sources = [...new Map([
      ...(contextualSource ? [contextualSource] : []),
      ...matchedSources
    ].map((source) => [source.id, source])).values()].slice(0, 4);
    const sourceContext = sources.map((source) => `[${source.title}]\n${source.text}`).join("\n\n");
    const contents = previousMessages.map((message) => ({
      role: message.role,
      parts: [{ text: message.text.slice(0, 2000) }]
    }));
    contents.push({
      role: "user",
      parts: [{
        text: `Question: ${question}\n\n${planSummary ? `${planSummary}\n\n` : ""}TechPro module sources for this question:\n${sourceContext || "No directly relevant TechPro module source was found."}`
      }]
    });

    res.status(200);
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();
    res.write(`event: sources\ndata: ${JSON.stringify(sources.map(({ id, title, route }) => ({ id, title, route })))}\n\n`);

    const controller = new AbortController();
    assistantAbort = controller;
    const timeout = setTimeout(() => controller.abort(new Error("Assistant request timed out.")), ASSISTANT_TIMEOUT_MS);
    const abortOnDisconnect = () => {
      if (!res.writableEnded) controller.abort(new Error("Client disconnected."));
    };
    res.on("close", abortOnDisconnect);
    // Keep intermediaries from closing an idle SSE connection.
    const heartbeat = setInterval(() => {
      if (!res.writableEnded) res.write(": ping\n\n");
    }, 15_000);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const stream = await ai.models.generateContentStream({
        model: ASSISTANT_MODEL,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
          maxOutputTokens: 700,
          abortSignal: controller.signal
        }
      });
      let answer = "";
      const sanitizer = createStreamSanitizer();
      const sendAnswerText = (value) => {
        if (!value) return;
        answer += value;
        if (!res.writableEnded) res.write(`event: delta\ndata: ${JSON.stringify(value)}\n\n`);
      };
      for await (const chunk of stream) {
        if (controller.signal.aborted) break;
        sendAnswerText(sanitizer.push(chunk.text || ""));
      }
      if (controller.signal.aborted) {
        throw controller.signal.reason instanceof Error ? controller.signal.reason : new Error("Assistant request aborted.");
      }
      sendAnswerText(sanitizer.end());
      if (!answer.trim()) throw new Error("The assistant returned an empty response.");

      const timestamp = Date.now();
      const messages = [...previousMessages,
        { role: "user", text: question, createdAt: timestamp },
        { role: "model", text: answer, sources: sources.map(({ id, title, route }) => ({ id, title, route })), feedback: null, createdAt: timestamp }
      ].slice(-MAX_HISTORY_MESSAGES);
      await ref.set({ messages, updatedAt: getAdminServices().FieldValue.serverTimestamp() }, { merge: true });
      res.write("event: done\ndata: {}\n\n");
      res.end();
    } finally {
      clearTimeout(timeout);
      clearInterval(heartbeat);
      res.off("close", abortOnDisconnect);
    }
  } catch (error) {
    console.error("Gemini assistant request failed.", error);
    const timedOut = Boolean(assistantAbort?.signal.aborted) && /timed out/i.test(String(error?.message || ""));
    const message = timedOut
      ? "The assistant took too long to answer. Please ask a shorter question and try again."
      : "The assistant could not finish that response. Please try again.";
    if (res.headersSent) {
      if (!res.writableEnded) {
        res.write(`event: error\ndata: ${JSON.stringify({ error: message })}\n\n`);
        res.end();
      }
    } else {
      res.status(502).json({ error: "The assistant is temporarily unavailable. Please try again." });
    }
  }
});

app.get("/favicon.ico", (req, res) => {
  res.redirect(302, "/assets/techpro-mark.svg");
});

app.get("/api/qr", async (req, res) => {
  const fallback = `${req.protocol}://${req.get("host")}/`;
  const raw = String(req.query.url || fallback).slice(0, 500);
  let target = fallback;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") target = parsed.toString();
  } catch {
    /* keep the safe fallback */
  }
  try {
    const svg = await QRCode.toString(target, {
      type: "svg",
      margin: 1,
      width: 320,
      color: { dark: "#241a14", light: "#fffdf8" },
      errorCorrectionLevel: "M"
    });
    res.type("image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(svg);
  } catch (error) {
    res.status(500).json({ error: "Could not create the QR code." });
  }
});

app.use(
  express.static(root, {
    extensions: ["html"],
    setHeaders(res, filePath) {
      if (filePath.endsWith("sw.js") || filePath.endsWith("index.html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    }
  })
);

// Client-side routes: /library/parts, /play/pc-lab, /leaderboard/:uid, ...
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  if (path.extname(req.path)) return next();
  res.sendFile(path.join(root, "index.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(root, "404.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`TechPro COC 1 running at http://localhost:${port}`);
});
