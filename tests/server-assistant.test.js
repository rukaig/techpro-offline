const test = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const path = require("node:path");

const root = path.join(__dirname, "..");

function startServer(port) {
  const child = spawn(process.execPath, ["server.js"], {
    cwd: root,
    env: {
      ...process.env,
      PORT: String(port),
      GEMINI_API_KEY: "",
      GEMINI_MODEL: "gemini-test-model"
    },
    stdio: ["ignore", "pipe", "pipe"]
  });
  const ready = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("server did not start in time")), 10_000);
    child.stdout.on("data", (data) => {
      if (String(data).includes("running at")) {
        clearTimeout(timer);
        resolve();
      }
    });
    child.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`server exited early with code ${code}`));
    });
  });
  return { child, ready };
}

test("server starts without a Gemini key and keeps the assistant safe", async (t) => {
  const port = 4200 + Math.floor(Math.random() * 1500);
  const { child, ready } = startServer(port);
  t.after(() => child.kill("SIGKILL"));
  await ready;
  const base = `http://127.0.0.1:${port}`;

  const health = await fetch(`${base}/api/health`);
  assert.equal(health.status, 200);
  assert.equal((await health.json()).ok, true);

  const assistantHealth = await fetch(`${base}/api/assistant/health`);
  assert.equal(assistantHealth.status, 200);
  assert.deepEqual(await assistantHealth.json(), { configured: false, model: "gemini-test-model" });

  const anonymous = await fetch(`${base}/api/assistant`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: "What is RAM?", conversationId: "conversation_123" })
  });
  assert.equal(anonymous.status, 401);
  assert.ok(!(await anonymous.text()).includes("GEMINI"));

  const history = await fetch(`${base}/api/assistant/history?conversation=conversation_123`);
  assert.equal(history.status, 401);

  const page = await fetch(`${base}/play/pc-lab`);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /<html/i);
});
