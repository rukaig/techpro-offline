let app;
let auth;
let db;
let activeUser = null;
let authError = null;
let modulesPromise;

function firebaseModules() {
  if (!modulesPromise) {
    modulesPromise = Promise.all([
      import("firebase/app"),
      import("firebase/auth"),
      import("firebase/firestore")
    ]).then(([appSdk, authSdk, firestoreSdk]) => ({ appSdk, authSdk, firestoreSdk }))
      .catch((error) => {
        modulesPromise = null;
        throw new Error("Firebase could not load. Check your internet connection and try again.", { cause: error });
      });
  }
  return modulesPromise;
}

async function firebaseApp() {
  if (app) return app;
  const { appSdk } = await firebaseModules();
  const config = window.__TECHPRO_FIREBASE__;
  if (!config?.apiKey || !config?.projectId) throw new Error("Firebase is not configured for this site.");
  app = appSdk.getApps().find((item) => item.name === "techpro") || appSdk.initializeApp(config, "techpro");
  return app;
}

async function authClient() {
  if (!auth) {
    const [{ authSdk }, clientApp] = await Promise.all([firebaseModules(), firebaseApp()]);
    auth = authSdk.getAuth(clientApp);
  }
  return auth;
}

export async function firestoreClient() {
  if (!db) {
    const [{ firestoreSdk }, clientApp] = await Promise.all([firebaseModules(), firebaseApp()]);
    db = firestoreSdk.getFirestore(clientApp);
  }
  return db;
}

export function getCurrentUser() {
  return activeUser;
}

export function getAuthError() {
  return authError;
}

export function observeAuth(callback) {
  let stopped = false;
  let unsubscribe = () => {};
  Promise.all([firebaseModules(), authClient()]).then(([{ authSdk }, clientAuth]) => {
    if (stopped) return;
    unsubscribe = authSdk.onAuthStateChanged(clientAuth, (user) => {
      activeUser = user;
      authError = null;
      callback(user, null);
    }, (error) => {
      authError = error;
      callback(null, error);
    });
  }).catch((error) => {
    if (stopped) return;
    authError = error;
    callback(null, error);
  });
  return () => {
    stopped = true;
    unsubscribe();
  };
}

export async function registerWithEmail(email, password, displayName) {
  const [{ authSdk }, clientAuth] = await Promise.all([firebaseModules(), authClient()]);
  const result = await authSdk.createUserWithEmailAndPassword(clientAuth, email, password);
  if (displayName) await authSdk.updateProfile(result.user, { displayName });
  activeUser = result.user;
  return result.user;
}

export async function signInWithEmail(email, password) {
  const [{ authSdk }, clientAuth] = await Promise.all([firebaseModules(), authClient()]);
  const result = await authSdk.signInWithEmailAndPassword(clientAuth, email, password);
  activeUser = result.user;
  return result.user;
}

export async function signOutUser() {
  const [{ authSdk }, clientAuth] = await Promise.all([firebaseModules(), authClient()]);
  await authSdk.signOut(clientAuth);
  activeUser = null;
}

export function friendlyAuthError(error) {
  const messages = {
    "auth/email-already-in-use": "That email already has an account. Sign in instead.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/invalid-credential": "The email or password is not correct.",
    "auth/user-not-found": "The email or password is not correct.",
    "auth/wrong-password": "The email or password is not correct.",
    "auth/weak-password": "Use a password with at least six characters.",
    "auth/operation-not-allowed": "Email and password sign-in is not enabled for this Firebase project.",
    "auth/too-many-requests": "Too many sign-in attempts. Wait a little, then try again."
  };
  return messages[error?.code] || error?.message || "We could not sign you in. Please try again.";
}
