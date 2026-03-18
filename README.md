# Edge Zero

Edge Zero is a starter-first monorepo for building Cloudflare-native sites with **Payload CMS**, **Astro**, **D1**, and **R2**.

The official scaffold lives in:

- `starter/cms`: the canonical headless CMS
- `starter/www`: the canonical frontend
- `packages/types`: the shared contracts
- `pro/*`: optional commercial extensions layered on top of the starter

## Getting Started

```bash
pnpm install
cp starter/cms/.env.example starter/cms/.env
cp starter/www/.env.example starter/www/.env
pnpm dev:cms
pnpm dev:www
```

- CMS admin: `http://localhost:3000/admin`
- Frontend: `http://localhost:4321`

## Architecture

Edge Zero is organized around a control-plane / data-plane split:

1. `packages/*` contains the neutral shared contract layer used across the repo.
2. `platform/*` contains the control-plane tooling, dashboard, CLI, compiler, and API.
3. `starter/*` is the productized scaffold that every generated Edge Zero project should start from.
4. `pro/*` extends the starter with licensed blocks and features.

`starter/www` talks to `starter/cms` over HTTP, which keeps the generated project shape aligned with real deployment on Cloudflare.

## Cloudflare Path

The starter scaffold is designed to work like this:

- Local fallback: SQLite for the CMS
- Cloudflare runtime: D1 for structured data and R2 for uploaded media
- Astro frontend: deployed with the Cloudflare adapter

## Core Rule

If a feature is meant to exist in every Edge Zero project, it should be implemented in `starter/*` first. Dogfooding sites should be generated from that scaffold and extended from there.
