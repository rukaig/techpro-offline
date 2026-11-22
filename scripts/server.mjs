import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

function getLanIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

const server = http.createServer((req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Health endpoint for smoke checks / test scripts
  if (pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true, app: "TechPro Offline", offline: true, time: new Date().toISOString() }));
    return;
  }

  // Determine root directory to serve from (dist preferred, fallback to repo root)
  const baseDir = fs.existsSync(distDir) ? distDir : root;
  let filePath = path.join(baseDir, pathname === "/" ? "index.html" : pathname);

  // Legacy path routes must become hash routes so relative assets still resolve
  // from the app root under localhost and from file://.
  if (pathname !== "/" && !fs.existsSync(filePath)) {
    res.writeHead(302, {
      Location: `/#${pathname}${parsedUrl.search}`,
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.end("Redirecting to offline hash route");
    return;
  }

  // Security: prevent directory traversal
  if (!filePath.startsWith(baseDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  // If path is a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  // If file doesn't exist, fallback to index.html for SPA routes
  if (!fs.existsSync(filePath)) {
    filePath = path.join(baseDir, "index.html");
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found. Run `npm run build` first.");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, host, () => {
  const isLan = process.argv.includes("--lan");
  const lanIp = getLanIp();

  console.log(`\n  TechPro (100% Offline) is ready on port ${port}:`);
  console.log(`  - Local:    http://localhost:${port}/`);
  if (isLan && lanIp) {
    console.log(`  - Network:  http://${lanIp}:${port}/  (Share with students on same Wi-Fi)`);
  } else if (!isLan && lanIp) {
    console.log(`  - Classroom mode: run with npm start -- --lan to show hotspot address`);
  }
  console.log(`  - File mode: open dist/index.html directly (no server needed)\n`);
});
