# TechPro: Complete Standalone OpenCode Prompt

## Setup (2 minutes, before pasting)

1. Put the reference photo in the project: `~/moduless/assets/reference/pc-lab-topdown.jpg` (two motherboards, a power supply with a rainbow cable bundle, flat on gray concrete).
2. Save **this whole file** as `~/moduless/docs/MASTER_PROMPT.md` so future OpenCode sessions can re-read it after a token cutoff.
3. Put your Gemini key in `~/moduless/.env` yourself as `GEMINI_API_KEY=your_key_here`. Never paste it into the chat.
4. Start OpenCode in `~/moduless` and paste everything below the line.

---

## 0. Who you are and what already happened

You are the lead engineer and game designer for **TechPro**, a learning website for students of **Computer Systems Servicing NC II, COC 1, Module 1: Assemble Computer Hardware** (DepEd). You are **continuing work started in another AI session (Copilot) that ran out of budget**. You have no memory of it; everything you need is in the repo and in this prompt. **Verify, do not trust.** Earlier sessions made false claims.

**Source content:** `content/module.md`, images in `content/media/`. If `content/module.md` is missing, extract it from the `.docx` in this folder: `pandoc "<docx>" -t markdown --extract-media=content -o content/module.md`.

**Already built (do not rebuild or break):** Library, Exam, Ranks, Ask assistant (partial, see Phase 0), 9-theme system, companions, study plan, auth, Firestore, PWA, shared game engine, and a Play hub with 16 cards (Pre-Test, PC Lab, Disassembly Mode, Sort Station, Order Rush, Software Mission, Spot the Mistake, Which Computer?, PC Anatomy Explorer, Software Sorter, Tech Check-Up, Case Files, Flashcards + Quick Recap, Word Bank Chain, Reflection Journal, Final Exam).

**Last known state (unverified):** 36 routes: 3 Done, 27 Partial, 6 Placeholder. PC Lab drag and click sometimes does not respond. The Exam page and theme panel have text and layout bugs. The previous `npm run audit` reported "zero overflow" even though these bugs are visible, so the script is incomplete.

### Scope lock and rules
1. **Do not touch** auth, unrelated server routes, or the theme engine unless a proven root cause lives there (tell me first).
2. **No feature code before the audit gate (Step 2).**
3. Never claim something works unless you ran it. Write "not run" when you could not.
4. `npm start` and the Render deployment (`package.json` and `server.js` at the repo root) must keep working after every change.
5. **Never print, log, commit, or echo any API key or `.env` value.** `.env` stays in `.gitignore`.
6. Keep chat replies short. Put detail in `docs/PROGRESS_AUDIT.md`, `docs/PCLAB_BUGFIX.md`, and `docs/BUILD_STATUS.md`.
7. **Run-through rule:** I give one "go", after Step 2. Then work through Phase 0, B, C, D, E in order **without waiting**, committing and updating `docs/BUILD_STATUS.md` after each item. Stop only if budget runs low (finish the current item cleanly, update the status file, say so) or something is truly ambiguous.

## 1. Purpose, pillars, creative frame

**Purpose:** help students learn to assemble computer hardware like a real technician: safely, in the right order, knowing why.

| Job | Home | Style |
|---|---|---|
| Learn it | **Library** | Clean illustrated lessons from the module |
| Practice by doing | **Play** | Real games: build, connect, sort, hunt, repair |
| Prove it | **Exam** | Pre-test and final exam; quiz format lives ONLY here |

**Pillars:**
1. **Learning by doing.** The module's rules (notch alignment, ESD safety, correct order, ventilation, no overtightening, labeled containers, document before disassembling) are *mechanics*. A wrong action makes something physical happen, then the companion explains why in module wording.
2. **Cute, engaging, and formal.**
3. **Everything follows the student's theme** (colors, fonts, motion, sound, illustrations, companion).
4. **Clean and useful.** No text colliding, clipped, or crammed. Smooth on a cheap phone.
5. **Progress that matters.** Stars, best times, XP, badges, and study plan tasks update from real play.

**Creative frame: the Apprentice Technician Academy.** The student is an apprentice at the TechPro Workshop. The XP title they already see ("Bench Rookie") becomes a rank ladder: Bench Rookie, Parts Hand, Careful Assembler, Cable Master, TechPro. The Play hub becomes a **workshop floor map** with stations: **Receiving Dock** (inspect, sort), **Safety Office** (rules, hazards), **Assembly Bay** (PC Lab), **Software Desk** (help desk), **Diagnostics Corner** (repairs), **Study Nook** (flashcards, journal). Stations unlock with stars (locked ones show a silhouette and the requirement). A daily **job order** from the supervisor gives a small themed challenge for bonus XP. Keep the card grid as an accessible alternative ("Map view / List view").

## 2. Work plan overview

| Step / Phase | What | Waits for me? |
|---|---|---|
| **Step 1** | Create `AGENTS.md`; finish the audit the last AI skipped; reproduce the PC Lab bug; fix the audit script; check Gemini status | no |
| **Step 2** | Report (6 lines) and **STOP** | **yes, one "go"** |
| **Phase 0** | Gemini assistant configuration | no |
| **Phase B** | UI repair pass | no |
| **Phase C** | PC Lab rebuilt as 2D top-down flat-lay + Disassembly | no |
| **Phase D** | Remaining games, one at a time | no |
| **Phase E** | Polish and verification | no |

## 3. STEP 1: AGENTS.md and the audit (no feature code)

### 3.1 Create `AGENTS.md` at the repo root
So every future session inherits the rules. Keep it concise: project purpose in 3 lines and the pointer to `docs/MASTER_PROMPT.md`; the scope lock and secrets rules from section 0; how to run (`npm start`, `npm test`, `npm run audit`, Playwright commands); the working protocol (one item at a time, test at 375px and 1280px, commit clearly, update `docs/BUILD_STATUS.md` so another AI can resume from it alone); short chat replies.

### 3.2 Per-route validation
`git status`, `git log --oneline -30`, tree of `src/`, `scripts/`, `assets/`, `content/` (skip `node_modules`). Read `package.json`, `server.js`, `firestore.rules`, existing `docs/`. Find the **shared game engine** (drag and drop, game shell, timer, XP, sound, companion, theme hooks) and the **Play hub card data**; document exactly how to register a new interactive with a minimal example from the finished one.

`npm install`, `npm start`. Test **every** `/play/*` route and `/exam` at **375px (touch)** and **1280px (mouse)**. In `docs/PROGRESS_AUDIT.md` give every route its own row: loads or not, console errors, **real game vs quiz vs placeholder**, core mechanic, uses the engine?, saves stars/XP and updates the hub card?, follows theme and companion?, touch drag works without scrolling the page?, bugs, files. Replace "27 Partial" with specific reasons; name the 6 Placeholders and the 3 Done.

### 3.3 Reproduce the PC Lab failure (do not just guess)
Symptom: **sometimes when I click or drag a part (what I must place or remove), it does not respond.** Write a Playwright test (mouse and touch emulation, 375px and 1280px) that drags and taps parts and **show it failing**. In `docs/PCLAB_BUGFIX.md` record each confirmed root cause with evidence. Check at least:
- HTML5 drag and drop (`dragstart/dragover/drop`), which fails on touch; must be Pointer Events.
- Missing `touch-action: none`, so the browser steals the gesture (and fires `pointercancel`).
- No `setPointerCapture`, so fast drags lose `pointerup` and parts stick to the cursor.
- Listeners on the part instead of `window`, or never removed; double handlers.
- A transparent overlay (HUD, companion panel, bottom sheet, tooltip, effects layer, the drag ghost itself) **intercepting clicks**; check `z-index` and `pointer-events`.
- Hit areas too small or tied to artwork instead of generous invisible hit shapes.
- Coordinate mismatch after resize, scroll, zoom, `devicePixelRatio`, CSS transforms, or SVG `viewBox` scaling.
- State machine bugs: stuck in "dragging" or "animating" after a cancelled drag, error, or fast second tap; animations or strikes blocking input.
- Handlers firing before the scene is ready; re-renders destroying the element mid-drag.
- `pointercancel`, `lostpointercapture`, window `blur`, `visibilitychange` unhandled.
If you cannot reproduce it, say so and list what you tried.

### 3.4 Fix the audit script
Extend `scripts/ui-audit.mjs` (keep `npm run audit`) so it visits all routes at 320, 375, 414, 768, 1024, 1440 px in Formal Editorial, Cyber Neon, and High Contrast (light and dark), saves screenshots to `audit/before/`, and flags: overflow and horizontal scroll, contrast (WCAG AA), **plus the missing checks**: text within 8px of its container edge (missing padding), adjacent inline elements with no gap or separator, icons not vertically centered with their label, buttons flush against the container bottom, and content hidden under the sticky header. Known bugs it **must** catch:
- **Exam page:** cards with no inner padding so text touches the borders; label, icon, heading jammed together; tiny misaligned check icons; uneven row gaps; "Not taken" and "About 10 minutes" running together; inconsistent buttons (plain link vs full-width yellow bar flush at the card bottom); long text lines; content crowded under the sticky header.
- **Theme panel:** theme name and description on one line, spilling out of the button; tiny default Light/Dark/System buttons.
- **Everywhere:** raw default buttons, `NaN` or `undefined` on screen, clipped card bottoms, lines wider than about 75 characters, Play hub section labels colliding with the sticky filter chips.
If the script reports zero for `/exam`, it is still wrong. List findings **grouped by root cause with one shared fix each**.

### 3.5 Gemini status (read-only)
Inspect `server/assistant-utils.js`, `/api/assistant` in `server.js`, `tests/assistant.test.js`, the Ask page, and the knowledge build scripts. Add a short status section to `docs/PROGRESS_AUDIT.md`: what exists, what works, what is missing versus Phase 0.

## 4. STEP 2: Report and STOP

Give a **6-line summary**: counts (Done / Partial / Placeholder / Missing), top 3 findings, the confirmed PC Lab cause, and Gemini status. Then **stop and wait for my single "go."** After "go," run Phases 0, B, C, D, E in order without further approval.

## 5. PHASE 0: Gemini assistant configuration

The assistant ("Ask") exists in part. Make it **fully configured, secure, grounded, and verified**. Extend what works; do not rewrite it. Do not touch auth or unrelated server code.

### 5.1 Key and environment
- The key is read **only on the server** from `process.env.GEMINI_API_KEY`. It must never appear in client bundles, HTML, logs, errors, or git.
- Add or update `.env.example` with placeholders: `GEMINI_API_KEY=`, `GEMINI_MODEL=`, plus any rate-limit or origin settings. Confirm `.env` is in `.gitignore`. Load `.env` locally (for example `dotenv`) without breaking Render, where variables come from the dashboard.
- Document in `README.md`: how to set the key locally and on Render (Environment tab), and that it is never committed.
- If the key is missing, the server still starts normally; `/api/assistant` returns a friendly "assistant is resting" response (HTTP 503, safe message); the Ask page shows a themed, kind empty state; the rest of the site is unaffected.
- Add `GET /api/assistant/health` returning `{ configured: true|false, model: "<name>" }` **without** exposing the key.

### 5.2 Model and SDK (verify, do not guess)
Before wiring, **check the official Google Gemini API documentation** (use web access if available) for the **current model identifiers and recommended SDK or REST usage**. Choose a fast, low-cost model suited to a student chat assistant, make it the default for `GEMINI_MODEL`, overridable by env. Record the doc page and chosen model in `docs/BUILD_STATUS.md`. If the installed SDK is deprecated, tell me what you will change before replacing it.

### 5.3 Endpoint behavior (`POST /api/assistant`)
- Requires a valid **Firebase ID token** (`Authorization: Bearer ...`), verified server-side with the method already used in this project (add `firebase-admin` only if nothing exists, and tell me which credentials it needs; do not invent credentials).
- Validate input: message length limit, conversation id format (reuse `sanitizePrompt` and `isValidConversationId`), history trimmed to the last N turns.
- **Rate limit** per user (default 20 messages per 10 minutes, configurable) plus a modest global cap; friendly 429 messages.
- **Streaming** via Server-Sent Events; handle client disconnects, timeouts, and upstream errors with themed friendly messages (offline, rate limit, key missing, upstream failure).
- Save conversation history per user in Firestore with a Clear button; update `firestore.rules` so users read and write only their own history. Store thumbs up/down feedback.

### 5.4 Grounding (the assistant "knows" the module)
This is **grounding, not fine-tuning**. Verify `scripts/build-knowledge.mjs` (or equivalent) splits `content/module.md` into clean chunks and merges a curated `knowledge/computers.md` of accurate extra info (hardware, software, ESD and safety, compatibility, troubleshooting basics, glossary) into `knowledge/index.json`; create or complete missing pieces; add `npm run build:knowledge` and run it as part of the build. At query time retrieve the top relevant chunks (existing `retrieveKnowledge` is acceptable; improve only if tests show poor retrieval).

**System instruction:** prefer the module; label outside knowledge as extra; if unsure, say so and point to the right lesson or game; stay on topic (computers, the module, study help, the site); decline unrelated or unsafe requests politely; no personal data requests; **never reveal answers during an active exam attempt** (explaining concepts and reviewing answers after submission is fine); Grade 11 to 12 reading level; friendly and formal, in the voice of the student's active companion. Replies may end with a "Read more" link to the matching Library lesson or game.

### 5.5 Plain-text style rules (strict)
Replies must be plain, clean text: **no asterisks or markdown symbols** (`* ** # ## ``` _ ~ >`), no symbol bullets (use short sentences or naturally written numbered lines like `1.`), **no unnecessary quotation marks, parentheses, or brackets**, no emojis unless the student uses them first, short paragraphs, simple words. Put the rules in the **system instruction** AND enforce them with the **server-side sanitizer** (`sanitizeAssistantText`) on every reply.

**Close the streaming gap:** a pair such as `**` can arrive split across two streamed chunks and slip through a per-chunk sanitizer. Implement a **stateful streaming sanitizer** (buffer the trailing partial token or use a rolling window) and add unit tests where `**`, `__`, backticks, and quotes are split across chunk boundaries. Preserve numbers, units (8 GB), file names, URLs, and code-like text exactly. Keep the existing 6 tests passing.

### 5.6 Ask page and floating button
Themed chat UI with the active companion as avatar (thinking while streaming), typing indicator, copy button, thumbs up/down, clear history. Suggested prompts: Explain the CPU like I am 10, What is the difference between a driver and firmware, Why unplug before opening the case, Help me plan my study week. Quick actions: **Explain this lesson** (current Library lesson as context), **Quiz me** (5 plain-text questions, the student answers, the assistant checks), **Stuck? Ask for a hint** inside PC Lab and games (sends step context, returns a plain-text hint, never full answers for exam items). Works at 375px with no overflow, follows the theme, honors Reduce motion, shows a friendly offline message.

### 5.7 Verify
Unit tests for the sanitizer (including split-chunk cases), retrieval, prompt validation, rate limiting, and the missing-key path. With the key present in `.env`, run a **real local call**: ask 5 test questions (a module question, an out-of-scope question, an exam-answer request, a request for markdown formatting, a long question) and show me the **plain-text replies** and the health endpoint output. Confirm no key appears in logs, network responses, the client bundle, or git (`git grep` and a bundle scan). If the key is not present, finish everything else, test with a mocked Gemini client, and tell me exactly which step is waiting. **Do not ask me to paste the key in chat.**

## 6. PHASE B: UI repair pass

- Fix root causes with shared **Card, Button, Badge, List, Stat row** components and tokens: spacing scale (`--space-1..8`), clamp-based type scale, `min-width: 0`, `overflow-wrap: anywhere`, `scroll-margin-top` for the sticky header, reading width about 70ch, an icon + text alignment helper, `box-sizing: border-box`, no fixed heights on text containers.
- **Theme panel:** responsive grid of theme cards (1/2/3 columns), each with a live mini-preview swatch, name on its own line, description below, equal heights, selected state with check badge and accent glow. Light/Dark/System as a segmented control. Styled text-size slider with a live preview. Motion and sound as proper switches with helper text. Sticky header, focus trap, Esc to close.
- **Exam lobby:** two tidy cards (Pre-Test, Final Exam), proper padding, a clean stat row (items, time, best score, status) with separators, consistent buttons, results history.
- **Play hub:** rewrite card copy so each describes a **game** ("Race the belt", "Hunt the hazards"), not a quiz; build the workshop **map view** plus list view; cards show stars and best score once played.
- Re-run `npm run audit`, save `audit/after/`, and require **zero overflow, zero text touching container edges, zero adjacent-text collisions** before moving on. Commit.

## 7. PHASE C: PC Lab rebuilt as a 2D top-down flat-lay (the flagship)

Route `/play/pc-lab`, plus Disassembly Mode in the same scene. If the current renderer is the cause of the failures, rebuild the view in **SVG (2D)**; reuse existing step data and module content. The input architecture in 7.4 is required either way.

### 7.1 Look (match the reference photo)
- **Camera:** straight top-down, no perspective. A bench fills the screen: default **gray concrete** surface with soft contact shadows under every part. Under other themes the surface re-skins (blueprint grid, candy tablecloth, neon grid, wood desk, cutting mat) while part shapes stay recognizable.
- **Parts as detailed flat vector art:**
  - **Motherboard A (red PCB):** CPU socket with lever, two long RAM slots with clips, PCI-Express and PCI slots, chipset heat sink, capacitors, rear I/O ports on the left edge, 24-pin power connector, CPU_FAN header, front-panel header, SATA ports, screw holes.
  - **Motherboard B (blue PCB):** different layout with a **fan and heat sink** shown beside it; a second level for replay (same rules, different layout).
  - **CPU** (gold pins on the underside with a flip control, corner triangle notch, heat spreader), **RAM stick** (chips, gold contacts, offset notch), **heat sink and fan** with a thermal paste tube, **storage drive** with data and power connectors, **expansion card** with bracket and gold edge.
  - **PSU:** metal box with a big fan grille, IEC power inlet, switch, and the **rainbow cable bundle** with different connector shapes (24-pin, CPU 4/8-pin, SATA power, Molex, fan).
  - **Open case (top-down tray):** standoffs, drive bay, PSU bay, vents, expansion slot covers; the board is lowered into it.
- Clean and slightly stylized (not photoreal), crisp at any size, cute but formal. Pick-up lift with shadow, small bounce on drop.

### 7.2 Layout
- **Desktop:** bench in the center, parts tray along the left or bottom, companion panel on the right, HUD (step tracker, timer, strikes, score) on top.
- **Phone (375px portrait):** bench fills the width; the parts tray is a **bottom drawer** that never covers the target; the companion is a collapsible speech bubble; thumb-friendly controls.
- **Zoom and pan** for small slots: two-finger pinch/pan (or wheel and middle-drag) **only inside the bench**, plus **Zoom to target** and **Fit** buttons. Hit-testing stays correct while zoomed. The rest of the site keeps no-pinch-zoom.

### 7.3 Stages (follow the module's order exactly; read "Basic Computer Assembly Procedure" and the disassembly procedure in `content/module.md`)
0. **Prep the bench (safety):** drag the antistatic strap to the technician's wrist, remove the metal bracelet, unplug the power cord icon, set out labeled containers, tap the camera to photograph connections. Skipping or reordering costs a strike with a companion explanation.
1. **Inspect and match:** drag good parts to OK; flag bad or incompatible ones (bent pins, wrong RAM type) to the reject bin.
2. **Processor:** open the socket lever, rotate the CPU in 90 degree steps until the **gold triangle matches the socket mark**, lower it gently (hold-to-lower; slamming bends pins and costs a strike), close the lever.
3. **Cooling:** hold to squeeze a **pea-sized thermal paste dot** (meter), place the heat sink, tighten four screws **in cross order**, drag the fan cable to **CPU_FAN**.
4. **Memory:** open clips, align the notch, **press with a pressure gauge** until both ends go down evenly, clips snap shut.
5. **Case stage:** lower the board onto standoffs (holes must align); screws via **hold-to-turn torque ring** (green zone; overtightening cracks the PCB art and costs points); place the PSU with its fan facing a vent (blocked vent shows a heat warning); install storage in the drive bay; insert the expansion card in the correct slot and screw its bracket (touching the gold contacts triggers a static zap penalty).
6. **Cable Connect:** drag **rope-like cables** (SVG bezier with sag) from the PSU bundle to matching ports. **Connector shape must match the port** (shape-coded plus color-coded for color-blind safety). Wrong port: springs back with a spark. Optional cable-tie tidy-up for bonus points.
7. **Close and power on:** rear-panel flat view; plug in monitor, keyboard, mouse, speakers; **power cord last**; press power. Success: spinning fans, theme-accent LEDs, boot screen, confetti, stars. If something was missed (for example the unplugged fan cable from Carlo's case): show symptoms (fan not spinning, no display) and a **troubleshoot mode** where tapping suspects and reseating fixes it.

**Disassembly Mode:** the reverse, following the module's steps. Parts come out only in a valid order (blocked parts shake and the companion names what is in the way). Screws go into **labeled containers**; a screw dropped on the bench edge rolls off and is lost. Pull cables by the connector.

**Modes:** Guided (next target glows, no timer), Practice (hints cost points), Challenge (timed, no hints, leaderboard for fastest clean build). Stars: 3 = no strikes and under par time, 2 = two or fewer strikes, 1 = completed.

### 7.4 Input architecture (non-negotiable; this is the fix)
Build **one** input controller for the whole bench. No ad-hoc per-part listeners.
1. **Pointer Events only.** One `pointerdown` on the bench root; `pointermove`, `pointerup`, `pointercancel` on `window` during a drag, removed on end. `setPointerCapture` on the active target; handle `lostpointercapture`.
2. `touch-action: none`, `user-select: none`, `-webkit-user-drag: none`, `-webkit-touch-callout: none` on the bench. Prevent default only inside the bench so the page still scrolls elsewhere.
3. **Hit-testing by geometry:** every part and slot has an invisible, generous hit shape (minimum **48 CSS px** after zoom), separate from the artwork, with a clear z-order. Overlays (HUD, companion, tooltips, effects, drag ghost) are `pointer-events: none` unless they are real buttons.
4. **Two ways to do every action so the game can never be blocked:** (a) drag the part to a glowing slot, snap within a radius; (b) **tap-tap**: tap a part (it lifts and highlights), then tap the glowing target. Also keyboard: Tab to select, Enter to place, arrows or R to rotate.
5. **Explicit state machine** (`idle, selected, dragging, placing, animating, locked`) with allowed transitions and one source of truth, plus a **watchdog**: if `dragging` or `animating` lasts too long, or on `pointercancel`, window `blur`, `visibilitychange`, orientation change, or a thrown error, **reset to `idle` and return the held part to its last valid position**. Animations never block input for more than a moment; new input cancels or queues.
6. **Never soft-lock:** every stage has **Reset step**, **Undo**, and **"Stuck? Show me"** (companion highlights the next target and what blocks it). Strikes never end a run without a retry offer.
7. **Coordinates:** convert pointer positions on every event using `getScreenCTM().inverse()` (SVG) or the bounding rect and current zoom; recompute on resize and orientation change. Test at browser zoom 80% to 200% and `devicePixelRatio` 1, 2, 3.
8. **Debug mode** `?debug=1`: draws hit shapes and snap radii, shows state, pointer id, last 20 events, and highlights the element under the pointer.
9. Keep game logic (steps, rules, scoring, module feedback) as **pure data and functions**, separate from rendering, so it can be unit-tested.

### 7.5 Game feel (never at the cost of responsiveness)
Pick-up lift and shadow, snap click, bench-group shake on errors, particles (sparks, confetti), per-theme sounds with mute, `navigator.vibrate` on snap and error. Animations cancel instantly when the player acts. Respect Reduce motion. The active companion explains each part when picked up, reacts to mistakes with module wording, and has a Why? button.

### 7.6 PC Lab tests (required)
- Playwright tests `tests/pclab.spec.*` at **375x667 touch** and **1280x800 mouse**: drag each major part to its slot; tap-tap each action; wrong slot and wrong order give the reaction **and the game stays responsive** (perform a correct action right after); interrupt a drag (`pointercancel`, blur, rotate viewport) and assert reset to `idle`; rapid double-taps, fast drags, drags leaving the canvas, releases outside the window; full assemble then full disassemble.
- Unit tests for step rules and scoring.
- A script that runs each stage **30 times** to catch intermittent failures; report the pass rate (target 100%).
- After the first working slice (bench plus CPU plus RAM with drag, tap-tap, and debug mode), tell me the URL and 3 to 5 exact things to try on my phone, then keep going.

## 8. PHASE D: Build the remaining interactives, one at a time

Reuse the engine and the input architecture from 7.4. Every game is a **real game**: a core verb (drag, rotate, press, connect, aim, run), real-time feedback, a fail state, an improvement path (stars, time, score), and replay value. Pre-Test and Final Exam stay in Exam and are linked from the hub. Build in this order:

| # | Game | Station | Core verb and creative mechanic | Module source |
|---|---|---|---|---|
| 1 | **Sort Station** | Receiving Dock | Conveyor belt: flick items (motherboard, Windows 11, keyboard, Microsoft Word, device driver, monitor, Google Chrome, RAM, antivirus utility, mouse) into Hardware, System Software, or Application Software chutes before the belt jams; combo meter and a robot-arm power-up | Activity 1 |
| 2 | **Order Rush** | Safety Office | Escape-room style: act out the safe shutdown and prep steps in the right order in a small lab scene; doors and a danger meter respond to wrong order; a technician character performs the locked-in sequence | Activity 2 |
| 3 | **Software Mission** | Software Desk | Help desk tycoon: customers arrive with comic problem bubbles (Marco's report, Lea's presentation, printer not talking, operating system, online tutorial, lab protection); drag the right tool badge (OS, driver, antivirus, word processor, presentation software, web browser; each used once) before patience runs out; shifts get harder, tips upgrade your counter | Activity 3 |
| 4 | **Spot the Mistake** | Safety Office | Hazard hunter: scan Alex's workstation with a flashlight; find PC still plugged in, case opened without shutdown, screws at the table edge, metal bracelet, bare hands on RAM contacts, no photo or labels; then **fix each in the scene**; shock-risk meter drops as you fix | Activity 4 |
| 5 | **Which Computer?** | Receiving Dock | Customer cart: roll past the shelf and grab the right type (desktop, laptop, tablet, server) for each need before the day ends, with budget and portability sliders | Types of computers |
| 6 | **PC Anatomy Explorer** | Receiving Dock | Zoom and tour an exploded PC (external and internal parts), then a **Data Courier** run guiding a data packet from keyboard through CPU, RAM, and storage to the monitor, dodging bugs; each zone teaches its part | Parts and functions |
| 7 | **Software Sorter** | Software Desk | Clean-up robot: separate system software, application software, and utilities on a scrolling shelf (18 programs); wrong picks break its routine | System vs application |
| 8 | **Tech Check-Up** | Diagnostics Corner | Scanner game: sweep a virtual computer to find present components and software; builds a Computer Profile card and a Technician's Recommendation as a repair ticket completed through scene actions; exportable image | What I Can Do |
| 9 | **Case Files** | Diagnostics Corner | Detective: Andrea's parts-list build and Carlo's no-fan, no-display case; use flashlight and test tools, reseat parts, find the real cause; random faults on replay | Let's Work This Out |
| 10 | **Flashcards + Quick Recap** | Study Nook | Card battle: swipe cards; known terms charge your attack, "again" cards return to the deck; spaced repetition saved to profile | Let's Remember |
| 11 | **Word Bank Chain** | Study Nook | Chain-building puzzle: drop the right term into each link; correct links lock with a clang, wrong ones slip and the chain sags; complete the 10-link chain | Additional activities |
| 12 | **Reflection Journal** | Study Nook | Cozy journal desk: sentence starters become sticky notes to place and decorate; never graded; saved privately | Reflection |
| 13 | **Extras if budget allows** | Safety Office / Assembly Bay | **ESD Defender** (keep static in check while handling parts), **Heat Defense** (fans and heat sinks vs heat waves), **Port Plug Puzzle** (connect cables without crossing), **Build Duel** (Elo race against a ghost; reuse the Elo system from the chess leaderboard) | Safety, cooling, ports |

**Tech:** 2D games use the existing engine with SVG or Canvas (or Phaser if the engine already uses it); any 3D scene uses `three` with low-poly procedural models and a 2D fallback. Pointer Events only. Do not add libraries without telling me why.

**Per-game definition of done (all required):**
- [ ] **No-text test:** with all text hidden it is still understandable and fun. If not, it is a quiz in disguise; redo it.
- [ ] Content, rules, and order match `content/module.md`. A wrong action produces an in-scene reaction (bounce, shake, spark) plus a short companion explanation in module wording.
- [ ] Tutorial by doing in the first 30 seconds; 3 to 8 levels with a difficulty curve; 3-star goals; results screen with a one-paragraph recap; replay.
- [ ] Works with touch at 375px (dragging never scrolls the page), with mouse on desktop, with keyboard fallback where reasonable, and has the tap-tap alternative.
- [ ] Follows the active theme (tokens, motion, sound, illustrations), shows the active companion, honors Reduce motion and sound toggles, never relies on color alone.
- [ ] Saves stars, best score or time, and XP to Firestore; the hub card updates; the study plan task auto-completes.
- [ ] No console errors; `npm run audit` clean for its pages; a Playwright smoke test that plays it to the results screen.
- [ ] Registered in the hub with game-style copy, estimated time, and station.

## 9. PHASE E: Final polish and verification

- Run all tests, `npm run audit`, and a Lighthouse pass (accessibility 90 or higher, PWA installable). Fix regressions.
- Confirm offline play for cached games, the Library, and the Exam; Ask shows a friendly offline message.
- Confirm Render deploy readiness (`npm start`, env vars documented in `README.md`).
- Final report in `docs/BUILD_STATUS.md`: every route, status, how to test, known issues, next steps.

## 10. Global acceptance checklist

- [ ] `AGENTS.md`, `docs/PROGRESS_AUDIT.md`, `docs/PCLAB_BUGFIX.md`, and `docs/BUILD_STATUS.md` exist and are honest.
- [ ] `npm run audit` catches missing padding, joined text, misaligned icons, flush buttons, and content under the sticky header, and now reports **zero** across routes, 6 widths, 3+ themes, light and dark.
- [ ] Theme panel, Exam lobby, and Play hub fixed (card grid, segmented control, padded cards, consistent buttons, map and list views).
- [ ] PC Lab bug reproduced by a failing test, then fixed; PC Lab is a 2D top-down flat-lay matching the reference photo; drag and tap-tap both work; no overlay blocks input; it cannot soft-lock; the 30-run loop passes 100%; full assemble and disassemble complete on a 375px phone and on desktop.
- [ ] Gemini assistant: key server-side only, health endpoint, SSE streaming, rate limiting, grounded answers, plain-text replies verified through a real call, streaming sanitizer tested with split chunks, friendly error states, Firestore rules updated, no key leaks.
- [ ] Every Play game is a real game that passes the no-text test and the per-game checklist; all re-skin live for all 9 themes without losing progress.
- [ ] Progress, stars, XP, badges, and study plan integration work; leaderboard receives Challenge scores.
- [ ] `npm start` and the Render deployment still work.

## 11. Working protocol (token-safe)

1. After Step 2, wait for my single "go." Then run Phases 0, B, C, D, E in order without waiting.
2. **One item at a time.** Finish it, run it at 375px and 1280px, fix it, run tests and `npm run audit`, commit (`feat(play): <name>` or `fix(ui): <area>`), then update `docs/BUILD_STATUS.md` (status, files, how to test, known issues, next step) so another AI can resume from that file alone.
3. Prefer fewer finished items over many half-done. If low on budget, finish the current item, update the status file, and say so.
4. Do not add libraries without telling me why. If the module is ambiguous, choose the safest reading, note it in `docs/BUILD_STATUS.md`, and mention it in chat. Never invent module content. Never mark anything done that you did not run.

## 12. Your first reply (exactly this)

1. One sentence confirming the scope lock, the secrets rule, and the run-through rule.
2. Create `AGENTS.md`.
3. Run **Step 1** (3.2 to 3.5), then give the **6-line summary** from Step 2 and **stop and wait for my "go."** Do not write feature code yet.
