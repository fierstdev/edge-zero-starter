# Edge Zero Starter

Edge Zero Starter is the public scaffold for building Cloudflare-native sites with Payload CMS and Astro.

## Included Workspaces

- `cms`: Payload CMS app for content, media, globals, and page blocks
- `types`: neutral type facade (`@edge-zero/cms-types`) re-exporting generated CMS contracts
- `www`: Astro frontend that renders pages from CMS content
- `blocks`: `.ez.astro` source blocks used to generate CMS + WWW block artifacts

## Quick Start

```bash
pnpm install
cp cms/.env.example cms/.env
cp www/.env.example www/.env
pnpm --filter @edge-zero/cms dev
pnpm --filter @edge-zero/www dev
```

- CMS admin: `http://localhost:3000/admin`
- Frontend: `http://localhost:4321`

## Standalone + Self-Hostable

This starter is intentionally standalone. It does not require private `platform/`, `pro/`, or `packages/` workspaces from the Edge Zero monorepo.

A baseline production smoke can be run with:

```bash
pnpm install
cp cms/.env.example cms/.env
cp www/.env.example www/.env
pnpm --filter @edge-zero/cms generate:types
pnpm --filter @edge-zero/cms build
pnpm --filter @edge-zero/www build
```

You can then self-host:

- `cms` on your own Node runtime or Cloudflare-compatible setup.
- `www` on Cloudflare Pages or any platform that supports Astro server output.

## Notes

- Treat generated block files as build artifacts; edit source files in `blocks/`.
- Local development uses SQLite by default. Cloudflare D1/R2 are used in cloud environments.
- Licensing files for this starter are included at the root: `LICENSE`, `NOTICE`, `THIRD_PARTY_NOTICES.md`, and `CONTRIBUTING.md`.
