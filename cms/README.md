# Edge Zero: Backend (Payload CMS)

This is the content management and data orchestration hub for the Edge Zero platform. Built on **Payload CMS v3** and Next.js, it operates as a headless API that feeds the starter frontend and is designed to run locally on SQLite or on Cloudflare with D1 and R2 bindings.

## Architecture

* **Database Engine**: Uses local SQLite for non-Cloudflare development and switches to `@payloadcms/db-d1-sqlite` when a D1 binding is present.
* **The Collections**: The primary entrypoint for authors is the `Pages` collection, which stores dynamic hierarchies of content blocks.
* **The Blocks**: All visual elements are defined as modular blocks within `src/blocks`.
* **Media Storage**: When an R2 binding is available, media uploads are routed to Cloudflare R2 via Payload's storage adapter.

## Core Development Rules

### 1. The `dbName` Override
SQLite imposes a hard limit of 63 characters on internal table and column names. Payload automatically synthesizes table names based on field depth and paths. Because our block architecture involves varying depth, you MUST explicitly define the `dbName` field on all complex blocks and nested array/group fields.
Example: `dbName: 'blk_testimonial'`

### 2. The Types Bridge
The backend schemas must perfectly reflect the interfaces defined in `packages/types`. If you add a new field, you must:
1. Update `packages/types/src/blocks.ts`
2. Update the Payload schema.
3. Run `pnpm generate:types` from this directory to synchronize `src/payload-types.ts`.

## Available Scripts

- `pnpm dev`: Starts the local development server at `localhost:3000` using the default local SQLite workflow.
- `pnpm dev:cf`: Starts the local development server at `localhost:3000` and injects Cloudflare bindings from `wrangler.jsonc`.
- `pnpm db:local`: Verifies the local D1 binding via Wrangler.
- `pnpm db:persist`: Starts Wrangler with a persistent local Cloudflare state directory.
- `pnpm generate:types`: Extracts the TypeScript definitions from your active Payload schemas. Use this purely to synchronize the environment after schema changes.

## Environment

- `PAYLOAD_SECRET`: Required for all environments.
- `PAYLOAD_LIVE_PREVIEW_URL`: The frontend URL used by Payload live preview. Defaults to `http://localhost:4321`.
- `DATABASE_URI`: Local SQLite fallback when no D1 binding is present.
