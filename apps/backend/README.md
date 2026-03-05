# Edge Zero: Backend (Payload CMS)

This is the content management and data orchestration hub for the Edge Zero platform. Built on **Payload CMS v3** and Next.js, it operates purely as a headless API that feeds the frontend.

## Architecture

* **Database Engine**: Uses `@payloadcms/db-sqlite` configured for `libSQL`.
* **The Collections**: The primary entrypoint for authors is the `Pages` collection, which stores dynamic hierarchies of content blocks.
* **The Blocks**: All visual elements are defined as modular blocks within `src/blocks`.

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

- `pnpm dev`: Starts the local development server and SQLite database at `localhost:3000`.
- `pnpm generate:types`: Extracts the TypeScript definitions from your active Payload schemas. Use this purely to synchronize the environment after schema changes.
