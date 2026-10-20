# Red Vision AI Executive Suite

The primary Red Vision application: a React/Vite client with an Express API and server-side Gemini integration.

## Status

This repository is in production-hardening. It is suitable for controlled development and staging, not an unrestricted public launch. Several dashboard modules are demonstrations or mock integrations and must be labeled until their external services are connected.

## Local setup

1. Install Node.js 22.
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Hermes executive office

Hermes is the single orchestrator. The division executives in the app supply specialist context; they are not separate live models unless Hermes delegates to agents configured in its profile. The local app sends missions to the Hermes Agent API and shows the run stream and tool activity returned by Hermes.

Enable and secure Hermes's API server in its own configuration before using missions. Red Vision defaults to `http://127.0.0.1:8642`, reads the API bearer key from `~/.hermes/.env` (`API_SERVER_KEY`), and accepts `HERMES_API_URL` / `HERMES_API_KEY` as server-side overrides. See the [Hermes API server guide](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/api-server.md) for enabling the service. Keep the API bound to localhost for a local desktop setup; the key has access to Hermes tools and must never be exposed in browser code. The status indicator only reports connected after the API responds.

The Hermes integration requires a locally running Red Vision server (the standalone desktop app provides this). A hosted Red Vision deployment cannot access a user's local Hermes service; it needs a separately secured Hermes endpoint reachable by that server.

## Standalone desktop app

The desktop edition uses Electron and runs the Express API locally inside the app. Browser pages do not receive Node.js access.

- `npm run desktop` launches the desktop app for development verification.
- `npm run desktop:dir` creates an unpacked desktop build for the current operating system.
- `npm run desktop:mac` creates an Intel macOS DMG in `release/`.

The GitHub `Desktop Build` workflow creates the Intel DMG manually, on `main`, on this feature branch, or whenever a `desktop-v*` tag is pushed. It uploads the unsigned installer as `red-vision-mac-intel`. As with prior builds, macOS Gatekeeper may show an unidentified-developer warning; this build does not require a paid Apple Developer membership.

## Required release gate

Every pull request must pass:

- TypeScript checking
- Production client and server build
- Secret scanning and dependency review in repository settings
- Manual verification that mock modules are not presented as live integrations

## Production requirements

Before public launch, add identity-based authentication and authorization, persistent project storage, durable media storage, background jobs for long-running generation, centralized logs, error monitoring, and usage/cost quotas. Place the service behind a TLS reverse proxy and restrict `/api` access to authenticated users.

The server currently adds baseline security headers, limits JSON requests to 10 MB, applies a per-IP API rate limit, and exposes `/health` for uptime checks. These controls reduce risk but do not replace authentication.

## Package manager

npm is the canonical package manager. Use `package-lock.json` and `npm ci` in automation.

## Environment

See `.env.example`. Never commit `.env`, `.env.local`, API keys, access tokens, or customer content.

## Honest feature labeling

The YouTube console, developer integrations, client activity, social proof, and any other locally seeded data must be labeled `Demo` until backed by authenticated provider APIs and persistent data.

Installer builds from `repair/production-hardening` are unsigned test releases intended for internal validation.

Desktop installers are generated automatically from validated commits on `main`.
