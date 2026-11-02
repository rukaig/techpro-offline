# AGENTS.md — TechPro working rules

TechPro is a learning site for DepEd CSS NC II, COC 1, Module 1: Assemble Computer Hardware.
It is a local-first static client (`index.html`, `src/`) served by `server.js` with optional Firebase and Gemini features.
The full product spec lives in `docs/MASTER_PROMPT.md`; read it before any phase B–E work. If it is missing, stop and ask for it instead of guessing.

## Scope lock

- Do not touch auth, server routes, the theme engine, or unrelated games unless a proven root cause lives there. State the evidence and get approval first.
- Never claim something works unless you actually ran it and saw the result.
- `npm start` and the Render deploy must keep working. Keep `package.json` and `server.js` at the repo root and do not change the start command.
- Verify before trusting: previous session notes, README claims, and audit passes are claims, not facts.
- Keep changes consistent with the existing structure, naming, and style. Prefer the smallest change that fixes the proven cause.

## Secrets

- Never print, log, echo, commit, or paste any API key, service-account JSON, or `.env` value.
- `.env` must stay in `.gitignore`. Only placeholders belong in `.env.example`.
- The Gemini key is read only on the server from `process.env.GEMINI_API_KEY`.
- Never ask the user to paste a key into chat. If one is pasted anyway, do not repeat it; tell the user to rotate it.

## Run and verify

```sh
npm start                 # builds knowledge + games, serves on :3000
npm test                  # node:test unit tests
npm run check             # content checks
npm run audit             # UI audit (Chromium required)
npm run audit:routes      # every route at 375/1280 + screenshots
AUDIT_FAST=1 npm run audit
node tests/pc-lab-regression.mjs
```

Playwright browsers are installed under `~/.cache/ms-playwright`; `/usr/bin/chromium` also exists.
Every UI item must be checked at **375px touch** and **1280px mouse**, plus the relevant theme modes.

## Working protocol

1. One item at a time. Reproduce the bug before fixing it.
2. Run the relevant tests and the UI audit after each item. Fix regressions before moving on.
3. Commit with a clear message (if the workspace is a git repo).
4. Update `docs/BUILD_STATUS.md` after each item so another AI can resume from that file alone.
5. Record confirmed causes in `docs/PCLAB_BUGFIX.md` and audit findings in `docs/PROGRESS_AUDIT.md`.
6. Keep chat replies short; put detail in docs.

## Current status source of truth

`docs/BUILD_STATUS.md` is the resume point. Read it first, then verify its claims against the running app.
