# PC Lab bug — reproduction and confirmed causes

Date: 2026-11-02. Status: **reproduced, cause confirmed, fix scheduled for Phase C**. The game is still broken; nothing in this file is a claim that it works.

## 1. The user symptom

Sometimes clicking or dragging a part does not respond. On a phone, some parts cannot be tapped at all.

## 2. First correction: the old reproduction was invalid

`docs/PCLAB_BUGFIX.md` previously said the bug was "confirmed" because a script clicked the power button first and the step stayed on `clean-bench`. That test was wrong: at `clean-bench` the required target is the **cleaning cloth** (`src/games/pc-lab/index.js`, safety level step 1). Clicking the power button there is not a valid action, so no advance was expected. The old "confirmed cause" paragraph was an assumption, not evidence. It has been replaced by the work below.

## 3. Reproduction that does fail

```sh
npm start                    # separate shell, port 3000
node tests/pc-lab-regression.mjs
```

The script plays the safety level in module order with plain taps/clicks, at **375x667 touch** and **1280x800 mouse**. Scrolls the bench into view, checks that the target is really on the canvas, taps the target, and requires the step to advance.

Actual output on 2026-11-02:

```text
RUN phone-375-touch 375x667
initial level=safety step=clean-bench
ok   clean-bench: tapped cleaning cloth -> safety/arrange-bench
FAIL step arrange-bench: tapped toolbox at 306,479 but the step stayed on arrange-bench.
     toast="Finish “Set out tools and parts” first."

RUN desktop-1280-mouse 1280x800
initial level=safety step=clean-bench
ok   clean-bench: tapped cleaning cloth -> safety/arrange-bench
FAIL step arrange-bench: tapped toolbox at 721,652 but the step stayed on arrange-bench.
     toast="Finish “Set out tools and parts” first."
```

The toolbox **is** the required target for `arrange-bench`. The game tells the player to finish that same step, then refuses the only action that finishes it. Level 0 is soft-locked at step 2 of 8 on both input types.

## 4. Confirmed cause A — raycast picks invisible outline geometry, and the current target has no priority

Evidence, measured in the live page at 1280px:

- The toolbox (`scene.toolKit`, world position `2.95, 1.08, 1.9`) is visible and marked `kind: "click", action: "tools"`.
- A ray cast at the toolbox's exact screen point returns, in order: six `LineSegments` with no interactive data, then `LineSegments` whose ancestor chain is a **`case-screw`**.
- All four case screws report `visible: false` and still carry `interactive: { kind: "part", part: "case-screw" }`.
- Sampling a 13 x 9 grid of points (180 x 120 CSS px) centred on the visible toolbox returned `case-screw` for **every** sample. The toolbox is not hittable in that rectangle.

Why it happens:

1. `scene.addOutlines()` adds `THREE.LineSegments` to every mesh. Those outline objects stay in the scene graph and are not excluded from picking.
2. `scene.pick()` calls `raycaster.intersectObjects(this.raycastTargets, true)` and walks each hit up to the first ancestor with `userData.interactive`.
3. three.js raycasts ignore `visible: false`, and `Raycaster.params.Line.threshold` defaults to **1 world unit**. The scene is about 7 units deep, so each screw's outline behaves like a thick invisible tube over a large screen area.
4. `pick()` has no "prefer the current step target" rule. The screw wins the depth sort over the toolbox.
5. Because the picked kind is `part`, `onPointerDown()` calls `startDrag()`. `canDrag("case-screw")` is false in the safety level, so `startDrag()` calls `onBlocked()` and returns.
6. `onBlocked()` shows `Finish "<current step>" first.` The click never reaches `onSceneClick()`, so `arrange-bench` can never be completed.

Files: `src/games/pc-lab/scene.js` (`addOutlines`, `pick`, `onPointerDown`, `startDrag`), `src/games/pc-lab/index.js` (`onSceneClick`, `canDrag`, `onBlocked`).

## 5. Confirmed cause B — the bench does not fit a phone viewport

At 375x667 the stage canvas measures `top: 558, left: 9, width: 357, height: 390`. The canvas spans y 558–948, but the viewport ends at 667. Projected part positions in the safety scene were y = 687–851: **outside the visible viewport**. `document.elementFromPoint()` returns `null` there.

So on a phone the bench starts below the fold and its targets are below the screen until the page is scrolled. This matches "sometimes it does not respond" on a phone, and it is a separate cause from A. Files: `src/styles/pclab.css` (`.pclab-game` min-height and stacked layout), `src/pages/pc-lab.js` (frame), `src/games/pc-lab/scene.js` (`resize`).

## 6. Ruled out (tested, not the cause)

- **Overlays intercepting clicks.** At every target point after scrolling, `document.elementFromPoint()` returned `canvas.pc3d-canvas`, not the HUD, objective panel or companion. Overlays already use `pointer-events: none` with `pointer-events: auto` only on controls.
- **Missing `touch-action`.** `.pclab-canvas` already sets `touch-action: none`.
- **Missing pointer capture.** `setPointerCapture` is called for drag, lever and orbit paths, and `pointercancel` is handled.
- **Lost pointerup on fast drags.** Not reproduced; the blocking happens before a drag starts.

## 7. Test assets to keep

- `tests/pc-lab-regression.mjs` — the failing repro above. It must pass after the fix, unchanged, on both viewports. It also checks viewport containment and that the target is not covered before tapping.
- Playwright is installed; Chromium is at `/usr/bin/chromium` and under `~/.cache/ms-playwright`.

## 8. Fix target (Phase C)

1. Replace the `pick()` path with geometry hit shapes for the current target plus generous hit areas, exclude outline/edge objects and invisible parts from picking, and prefer the active step target.
2. Never treat a tap on a non-draggable part as a blocked drag on pointerdown; resolve the pick to an action on pointerup so tap-tap works for every part.
3. Constrain the phone bench to the viewport (or provide a fitted camera) so every target is reachable without scrolling.
4. Add the explicit state machine, watchdog, reset/undo/"show me", and the 30-run loop from the master prompt; keep the regression script as the gate.

---

# Phase C resolution (2026-11-03)

Status: **fixed and verified**. `node tests/pc-lab-regression.mjs` plays L0 safety, L2 CPU and L4 RAM end to end with tap, tap-tap, drag, Rotate and press & hold at 375x667 touch and 1280x800 mouse.

## What changed

`src/games/pc-lab/fallback2d.js` is now the only renderer: a 2D top-down flat-lay bench (`Bench2D`, still exported as `Fallback2D`). `scene.js`, `engine/particles.js` and `supportsWebGL` are no longer imported by the game, so the raycast path that caused cause A cannot run at all. Every part is a real DOM element (`[data-part]`) with a hit area of at least 48 CSS px, and one `BenchInput` controller owns every pointer:

- tap once to act on a part
- tap the part, then tap its target (tap-tap), or drag the part onto it
- pointer capture, window-level `pointerup`, a 4s watchdog, and cancel on blur / `visibilitychange` / `orientationchange`
- `Enter` / `Space` on a focused part runs the same tap path
- `?debug=1` outlines every hit area and prints level, step, selection, last action and pointer state

## Causes found and fixed in this pass (beyond A and B)

1. **`[data-level]` collision.** `Bench2D` set `data-level="safety"` on its root while the game shell also uses `[data-level]` for level tabs. `src/app/chrome.js` `refreshProgress()` writes the player's XP level into **every** `[data-level]` element, so the bench container was repeatedly replaced with the text `1` and the bench disappeared. Renamed to `data-bench-level`; never reuse `data-level` inside a component.
2. **Objective card covered the bench.** At >1040px the step card was an overlay pinned to the bottom-left of the stage, and its Hint / Why / Voice buttons sit on `pointer-events: auto`. Tapping the plug at 1280x800 hit `div.pclab-controls`. The card is now in normal flow: the right column on desktop, below the stage at ≤1040px. `pointer-events` no longer blocks anything.
3. **Sticky bottom navigation covered the last bench row on phones.** At 375x667 the plug sat under `a.nav-link.bottom-link`. The bench now reserves the navigation height (`.bench2d` bottom padding) and the phone stage is 560px tall, which is exactly what the 6-row bench needs; measured: after framing, all 13 visible parts are inside the viewport, uncovered, and ≥44px.
4. **Tap-tap moved parts on the wrong step.** `DROP_TARGET` made the CPU a "move" part on every CPU step, so tapping the seated CPU re-armed a move instead of applying thermal paste. Move semantics now apply only when the current step actually needs a move (`drop` / `remove-screws`); every other tap fires the step action directly.
5. **Drop resolution read `data-part`, not `data-drop`.** The RAM slot is `data-part="clips" data-drop="ram-slot"`, so releasing the RAM on it never matched. Drops now resolve `data-drop` first, and a drag makes the dragged element `pointer-events: none` so `elementFromPoint` reaches the target underneath.
6. **Overlay click-through.** On touch, the tap that completes the last step synthesised a click on the level-complete button that appeared under the finger, skipping a level. Overlay actions are ignored for 350 ms after the overlay opens.
7. **Alignment had no starting offset.** The 2D bench reset the CPU and RAM to 0°, so the "align the triangle/notch" steps were already solved. CPU starts at 90° and RAM at 180° on their levels, and seated parts now render on the board (`.bench2d-chip`, `.bench2d-stick`).

## Test harness facts worth keeping

- `html { scroll-behavior: smooth }`: a test must scroll with `behavior: "instant"`, or it measures mid-animation.
- `.pclab-frame` is `overflow: hidden`, so `scrollIntoView` can scroll the frame instead of the page. The regression resets `frame.scrollTop` and scrolls the window by absolute position.
- `.pclab-overlay` hides with the `hidden` attribute but keeps its inner HTML; `querySelector('[data-overlay-action]')` finds stale buttons. Check `overlay.hidden` before treating an action as live.

## Gate

```sh
node tests/pc-lab-regression.mjs            # 3 levels x 2 devices
node tests/pc-lab-regression.mjs --runs=30  # input stability loop
```

Both must exit 0 before the PC Lab counts as done.
