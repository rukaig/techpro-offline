import { get, subscribe, update } from "./store.js";
import { firestoreClient, observeAuth } from "./firebase.js";

let started = false;
let activeUid = null;
let stopRemote = null;
let writeQueue = Promise.resolve();

async function planDocument(uid) {
  const [{ doc }, db] = await Promise.all([
    import("firebase/firestore"),
    firestoreClient()
  ]);
  return doc(db, "techpro_users", uid, "plan", "current");
}

function millis(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Date.parse(value) || 0;
  if (value && typeof value.toMillis === "function") return value.toMillis();
  return 0;
}

function applyRemote(uid, remote) {
  if (uid !== activeUid || !remote || typeof remote !== "object") return;
  update((draft) => {
    draft.plan = {
      config: remote.config || null,
      tasks: Array.isArray(remote.tasks) ? remote.tasks : [],
      sessions: Array.isArray(remote.sessions) ? remote.sessions : [],
      reminderDay: remote.reminderDay || null,
      syncUid: uid,
      updatedAt: new Date(millis(remote.updatedAt) || Date.now()).toISOString()
    };
  }, { type: "plan-sync" });
}

function pushLocal(uid) {
  if (get().plan.syncUid !== uid) {
    update((draft) => { draft.plan.syncUid = uid; }, { type: "plan-sync" });
  }
  const plan = get().plan;
  writeQueue = writeQueue.then(async () => {
    const [{ serverTimestamp, setDoc }, reference] = await Promise.all([
      import("firebase/firestore"),
      planDocument(uid)
    ]);
    await setDoc(reference, { ...plan, updatedAt: serverTimestamp() }, { merge: true });
  }).catch((error) => {
    console.error("Could not sync the study plan to Firestore.", error);
  });
  return writeQueue;
}

async function connectUser(user) {
  stopRemote?.();
  stopRemote = null;
  activeUid = user?.uid || null;
  if (!user) return;

  const uid = user.uid;
  try {
    const [{ getDoc, onSnapshot }, reference] = await Promise.all([
      import("firebase/firestore"),
      planDocument(uid)
    ]);
    const snapshot = await getDoc(reference);
    if (uid !== activeUid) return;
    const remote = snapshot.exists() ? snapshot.data() : null;
    const localPlan = get().plan;
    const ownerChanged = Boolean(localPlan.syncUid && localPlan.syncUid !== uid);
    if (remote && (!localPlan.syncUid || ownerChanged || millis(remote.updatedAt) > millis(localPlan.updatedAt))) {
      applyRemote(uid, remote);
    } else if (ownerChanged) {
      update((draft) => {
        draft.plan = { config: null, tasks: [], sessions: [], reminderDay: null, syncUid: uid };
      }, { type: "plan-sync" });
      await pushLocal(uid);
    } else {
      await pushLocal(uid);
    }

    stopRemote = onSnapshot(reference, (next) => {
      if (!next.exists() || uid !== activeUid) return;
      const current = get().plan;
      if (millis(next.data().updatedAt) > millis(current.updatedAt)) applyRemote(uid, next.data());
    }, (error) => console.error("Could not receive Firestore study-plan updates.", error));
  } catch (error) {
    console.error("Could not load the Firestore study plan.", error);
  }
}

export function startPlanSync() {
  if (started) return;
  started = true;
  subscribe((state, meta) => {
    if (!activeUid || meta.type === "plan-sync" || !meta.type?.startsWith("plan-")) return;
    update((draft) => { draft.plan.updatedAt = new Date().toISOString(); }, { type: "plan-sync" });
    pushLocal(activeUid);
  });
  observeAuth((user, error) => {
    if (error) {
      console.error("Firebase authentication could not initialize for plan sync.", error);
      return;
    }
    connectUser(user);
  });
}
