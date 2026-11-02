/* ==========================================================================
   Build the game bundles. The app itself is plain ES modules; the 3D games
   are bundled separately so three.js is loaded only on a game route.
   ========================================================================== */
import { build } from "esbuild";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outdir = path.join(root, "assets/games");
const targets = [
  {
    entry: path.join(root, "src/games/pc-lab/index.js"),
    outfile: path.join(outdir, "pc-lab.js"),
    globalName: "PcLabGame"
  }
];

await mkdir(outdir, { recursive: true });

for (const target of targets) {
  const started = performance.now();
  await build({
    entryPoints: [target.entry],
    outfile: target.outfile,
    bundle: true,
    format: "iife",
    globalName: target.globalName,
    platform: "browser",
    target: ["es2020"],
    minify: true,
    sourcemap: false,
    legalComments: "none",
    logLevel: "warning"
  });
  const info = await stat(target.outfile);
  const kb = (info.size / 1024).toFixed(0);
  console.log(`Built ${path.relative(root, target.outfile)} (${kb} kB) in ${Math.round(performance.now() - started)} ms`);
}
