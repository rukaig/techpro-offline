import { get, update } from "../services/store.js";
import {
  friendlyAuthError, observeAuth, registerWithEmail, signInWithEmail, signOutUser
} from "../services/firebase.js";
import { esc } from "../app/ui.js";

export function accountPage() {
  return `<div class="page-shell section account-page">
    <p class="eyebrow">TechPro account</p>
    <h1>Keep your learning in sync</h1>
    <p class="lede">Sign in to sync your study plan across devices and use the TechPro assistant. Your learning activities remain available without an account.</p>
    <section class="card card-pad account-card" data-account-card aria-live="polite">
      <p>Checking your account…</p>
    </section>
  </div>`;
}

export function mountAccount(root) {
  let mode = "signin";
  let activeUser = null;
  let authMessage = "";
  let authMessageIsError = false;
  let authUnavailable = false;

  const render = () => {
    const card = root.querySelector("[data-account-card]");
    if (!card) return;
    if (activeUser) {
      const email = esc(activeUser.email || "Email not available");
      const name = esc(activeUser.displayName || activeUser.email?.split("@")[0] || "TechPro learner");
      card.innerHTML = `
        <p class="eyebrow">Signed in</p>
        <h2>Welcome, ${name}</h2>
        <p class="account-email">${email}</p>
        <p>Your study plan syncs privately to your account when Firestore is enabled for this project.</p>
        <p class="account-message${authMessageIsError ? " is-error" : ""}" data-account-message role="status">${esc(authMessage || "You are signed in.")}</p>
        <button class="btn btn-ghost mt-3" type="button" data-sign-out>Sign out</button>
      `;
      card.querySelector("[data-sign-out]")?.addEventListener("click", async () => {
        const button = card.querySelector("[data-sign-out]");
        button.disabled = true;
        try {
          await signOutUser();
          authMessage = "You are signed out. Your saved work remains on this device.";
          authMessageIsError = false;
        } catch (error) {
          authMessage = friendlyAuthError(error);
          authMessageIsError = true;
          button.disabled = false;
          render();
        }
      });
      return;
    }

    const unavailableMessage = authUnavailable
      ? `<p class="account-message is-error" role="alert">${esc(authMessage)}</p>`
      : "";
    card.innerHTML = `
      <div class="account-heading">
        <div><p class="eyebrow">${mode === "signin" ? "Welcome back" : "Create your account"}</p>
          <h2>${mode === "signin" ? "Sign in to TechPro" : "Join TechPro"}</h2></div>
      </div>
      ${unavailableMessage}
      <form class="account-form" data-auth-form>
        ${mode === "register" ? `<label>Display name <span class="text-muted">(optional)</span><input name="displayName" type="text" maxlength="60" autocomplete="name"></label>` : ""}
        <label>Email address<input name="email" type="email" maxlength="254" autocomplete="email" required></label>
        <label>Password<input name="password" type="password" minlength="6" maxlength="128" autocomplete="${mode === "signin" ? "current-password" : "new-password"}" required></label>
        <button class="btn btn-primary" type="submit" ${authUnavailable ? "disabled" : ""}>${mode === "signin" ? "Sign in" : "Create account"}</button>
      </form>
      <p class="account-message${authMessageIsError ? " is-error" : ""}" data-account-message role="status">${esc(authMessage)}</p>
      <button class="btn btn-ghost account-mode" type="button" data-switch-mode ${authUnavailable ? "disabled" : ""}>
        ${mode === "signin" ? "New to TechPro? Create an account" : "Already have an account? Sign in"}
      </button>
      <p class="account-note">Your account is used only for your TechPro learning data. Never share your password with a classmate.</p>
    `;
    card.querySelector("[data-switch-mode]")?.addEventListener("click", () => {
      mode = mode === "signin" ? "register" : "signin";
      authMessage = "";
      authMessageIsError = false;
      render();
    });
    card.querySelector("[data-auth-form]")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      authMessage = "";
      authMessageIsError = false;
      try {
        const email = String(data.get("email") || "").trim();
        const password = String(data.get("password") || "");
        const user = mode === "register"
          ? await registerWithEmail(email, password, String(data.get("displayName") || "").trim())
          : await signInWithEmail(email, password);
        update((draft) => {
          draft.profile.uid = user.uid;
          draft.profile.email = user.email || "";
          draft.profile.displayName = user.displayName || user.email?.split("@")[0] || "";
        }, { type: "profile-auth" });
        authMessage = "";
      } catch (error) {
        authMessage = friendlyAuthError(error);
        authMessageIsError = true;
        button.disabled = false;
        render();
      }
    });
  };

  const stop = observeAuth((user, error) => {
    activeUser = user;
    authUnavailable = Boolean(error);
    if (error) {
      authMessage = friendlyAuthError(error);
      authMessageIsError = true;
    } else {
      authMessage = "";
      authMessageIsError = false;
      if (user) {
        update((draft) => {
          draft.profile.uid = user.uid;
          draft.profile.email = user.email || "";
          draft.profile.displayName = user.displayName || user.email?.split("@")[0] || "";
        }, { type: "profile-auth" });
      } else if (get().profile.uid) {
        update((draft) => {
          draft.profile.uid = null;
          draft.profile.email = "";
          draft.profile.displayName = "";
        }, { type: "profile-auth" });
      }
    }
    render();
  });
  render();
  return stop;
}
