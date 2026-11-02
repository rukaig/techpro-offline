# TechPro

TechPro is a local-first learning site for Computer Systems Servicing NC II, COC 1: Assemble Computer Hardware.

## Run locally

Use Node.js 20 or newer. From the project folder:

```sh
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Do not open `index.html` from the file manager; the page needs to be served over HTTP. Set `PORT` to use a different port.

For automatic server restarts during development, run `npm run dev`.

## Validate

```sh
npm test
npm run check
npm run audit
```

The UI audit starts its own temporary server, crawls linked routes, and checks the requested viewport, theme, and light/dark combinations. It writes screenshots and a detailed JSON report to `audit/`. The command needs Chromium. Set `CHROMIUM_PATH` if it is not installed at a standard system location. `AUDIT_FAST=1 npm run audit` runs a single 320px Editorial-light sample for quick checks.

## Study plan

Open `/plan` from the home page or footer to create a dated study schedule. Tasks, manual completion, focus sessions, and review tasks are saved locally and remain available offline. The planner supports printable views, `.ics` calendar export, and optional browser notifications when the site is open. After signing in, plan changes sync through the Firebase client SDK and Firestore owner rules; Firebase Admin credentials are not required for plan sync.

When a learner signs in at `/account`, the plan syncs to their private Firestore document at `techpro_users/{uid}/plan/current`. Signing up uses Firebase Email/Password; enable that provider in Firebase Console under Authentication. The existing public Firebase web-app configuration is in `firebase-config.js`. Deploy the rules in `firestore.rules` so each learner can access only their own profile, progress, and plan.

## TechPro assistant

Open `/assistant` and sign in to ask questions grounded in the curated TechPro module knowledge. Responses stream from the server and link to relevant lessons. Conversation history and feedback are stored in Firestore under the signed-in user's `techpro_assistant/{uid}` namespace; client access to that collection is denied by the rules. Requests require a Firebase ID token verified by Firebase Admin. Limits default to 20 messages per learner per 10 minutes plus a global cap of 300 per minute, all configurable in `.env` (`ASSISTANT_RATE_LIMIT`, `ASSISTANT_RATE_WINDOW_MINUTES`, `ASSISTANT_GLOBAL_LIMIT`). Requests time out after 30 seconds (`ASSISTANT_TIMEOUT_MS`). `GET /api/assistant/health` reports `{ configured, model }` without exposing the key.

The knowledge builder chunks the supplied lesson text in `content/module.md` before its answer-key section and combines those passages with curated notes in `knowledge/computers.md`. It writes `knowledge/index.json` and runs automatically before start, development, and test commands. To rebuild it explicitly:

```sh
npm run build:knowledge
```

Gemini is optional. Without a `GEMINI_API_KEY`, the assistant shows an explicit unavailable message. The default model is `gemini-3.5-flash-lite`, chosen from the [official model catalog](https://ai.google.dev/gemini-api/docs/models) as the fastest, lowest-cost option recommended for new projects; override it with `GEMINI_MODEL` (for example `gemini-3.8-flash`) if needed. Add the values from `.env.example` to a local `.env` file or configure them in Render. For Firebase Admin, set either `FIREBASE_SERVICE_ACCOUNT_JSON` to the service-account JSON value or `GOOGLE_APPLICATION_CREDENTIALS` to a private credential-file path, along with `FIREBASE_PROJECT_ID`. Never commit service-account credentials or the Gemini key. The public Firebase web config is not a server secret.

## Environment

The server reads `PORT`; Render supplies this automatically. See `.env.example` for server configuration. Firebase web configuration lives in `firebase-config.js` and is public client configuration, not a server secret. Keep private keys and credentials in environment variables and out of client-side files.

## Deploy

Deploy the project to Render as a Node web service with `npm install` as the build command and `npm start` as the start command. Render provides the listening port through `PORT`.

For Firebase Hosting, install the Firebase CLI, authenticate, then deploy the configured hosting and Firestore resources:

```sh
firebase deploy --only hosting,firestore:rules,firestore:indexes
```
