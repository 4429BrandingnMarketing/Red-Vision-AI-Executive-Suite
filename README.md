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

## Standalone desktop app

The desktop edition uses Electron and runs the Express API locally inside the app. Browser pages do not receive Node.js access.

- `npm run desktop` launches the desktop app for development verification.
- `npm run desktop:dir` creates an unpacked desktop build for the current operating system.
- `npm run desktop:mac` creates an Intel macOS DMG in `release/`.

The GitHub `Desktop Build` workflow creates the Intel DMG manually or whenever a `desktop-v*` tag is pushed. The current build is unsigned; macOS distribution should add Apple Developer ID signing and notarization before public release.

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
