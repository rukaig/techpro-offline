import test from "node:test";
import assert from "node:assert/strict";
import {
  get, set, remove, list, update, createProfile, switchProfile, deleteProfile,
  exportState, importState, clearAll, defaults
} from "../src/services/store.js";

test("store get() returns full state and get(key) returns state section", () => {
  const state = get();
  assert.ok(state);
  assert.equal(state.version, 2);
  assert.ok(state.settings);

  const settings = get("settings");
  assert.equal(settings.theme, "editorial");
});

test("store update() and set() modify state", () => {
  set({ settings: { theme: "blueprint" } });
  assert.equal(get("settings").theme, "blueprint");

  update((draft) => {
    draft.progress.xp = 250;
  });
  assert.equal(get("progress").xp, 250);
});

test("store remove() resets top-level section to defaults", () => {
  set({ settings: { theme: "cyber" } });
  remove("settings");
  assert.equal(get("settings").theme, "editorial");
});

test("multi-profile support: create, list, switch, delete", () => {
  const initialList = list();
  assert.ok(initialList.length >= 1);

  createProfile({ displayName: "Student A", avatar: "spark" });
  assert.equal(get().profile.displayName, "Student A");

  createProfile({ displayName: "Student B", avatar: "wrench" });
  assert.equal(get().profile.displayName, "Student B");

  const profiles = list();
  assert.ok(profiles.length >= 2);
  const studentA = profiles.find((p) => p.displayName === "Student A");
  const studentB = profiles.find((p) => p.displayName === "Student B");
  assert.ok(studentA);
  assert.ok(studentB);

  // Switch to Student A
  switchProfile(studentA.id);
  assert.equal(get().profile.displayName, "Student A");

  // Delete Student B
  deleteProfile(studentB.id);
  const remaining = list();
  assert.ok(!remaining.some((p) => p.id === studentB.id));
});

test("export and import validate schema and restore state", () => {
  set({ progress: { xp: 500 } });
  const exportedJson = exportState();
  const parsed = JSON.parse(exportedJson);
  assert.equal(parsed.app, "TechPro");
  assert.equal(parsed.schemaVersion, 2);
  assert.equal(parsed.state.progress.xp, 500);

  // Reset and verify import
  set({ progress: { xp: 0 } });
  assert.equal(get("progress").xp, 0);

  importState(exportedJson);
  assert.equal(get("progress").xp, 500);

  // Reject higher schema version
  assert.throws(() => {
    importState(JSON.stringify({ schemaVersion: 999, state: {} }));
  });
});
