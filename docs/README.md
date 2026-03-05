# Edge Zero Documentation

Welcome to **Edge Zero**, the high-performance, open-source boilerplate engineered for the modern web. Built specifically for independent creators, agencies, and full-stack tinkerers, Edge Zero bridges the gap between lightning-fast frontend delivery and an effortless, decoupled backend content experience.

## The Architecture
Edge Zero relies on a modular, three-tier monorepo architecture:
1. **`packages/types`**: The single source of truth for the entire platform. The TypeScript definitions in `blocks.ts` dictate exactly how the CMS behaves and what the frontend expects.
2. **`apps/backend` (Payload CMS)**: A headless content management powerhouse running on Node.js/Next.js. It dynamically generates an admin UI based on the schemas and serves JSON via a robust REST API.
3. **`apps/frontend` (Astro)**: The presentation layer. It fetches the block JSON from Payload and routes the data to pre-built, DaisyUI-themed `.astro` components via the dynamic URL router.

## 1. Installation & Setup

Edge Zero uses `pnpm` workspaces. Ensure you have Node.js and `pnpm` installed on your machine.

### Cloning & Dependencies
```bash
git clone https://github.com/fierstdev/edge-zero-starter.git
cd edge-zero-starter
pnpm install
```

### Environment Variables
Configure your environment variables by copying the example files in both the frontend and backend:
```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

### Initializing the Local SQLite Database
Edge Zero uses `libSQL` (SQLite) out-of-the-box for instantaneous local development without Docker or Postgres overhead. The `CREATE INDEX` errors you might see on your very first run are normal Payload CMS migrations.
```bash
# Start both development servers simultaneously
pnpm dev
```
- **Astro Frontend**: `http://localhost:4321`
- **Payload Backend**: `http://localhost:3000/admin` (You will be prompted to create your first admin user).

## 2. Frontend (Astro + DaisyUI)

The frontend is a completely static, component-driven architecture.

### The Dynamic Router (`[...slug].astro`)
The magic of Edge Zero lives in `apps/frontend/src/pages/[...slug].astro`. 
When a user visits `/about-us`, the Astro router queries Payload's REST API for a `Page` with the slug `about-us`. 
Payload returns an array of `blocks`. The router then matches the `blockType` string from Payload to the `ComponentRegistry` map, seamlessly rendering the appropriate Astro component.

### CSS Injection and DaisyUI
Edge Zero utilizes Tailwind v4 and DaisyUI v5. The core styling and theme configuration lives in `apps/frontend/src/styles/global.css`.

Instead of enforcing a single theme, Edge Zero allows CMS authors to assign specific DaisyUI themes to individual blocks using the **Theme Override** dropdown in the Payload Admin UI. The selected theme string is injected directly into a `data-theme` attribute on the wrapping `<section>` tag within the component.

## 3. Backend (Payload CMS)

The backend is where you construct the data layer of your application.

### Creating New Blocks
When you build a new block for Edge Zero (e.g., `TeamProfileBlock`), your schema MUST adhere to the SQLite 63-character table name limit. Payload automatically generates SQL table names based on field names and path nesting. Deeply nested block fields will often exceed this limit.

**Crucial Override Step**: You must explicitly set the `dbName` property at the block level and on deeply nested array/group fields within `apps/backend/src/blocks/[TaxonomyCategory]/[BlockName]/schema.ts`.
```typescript
export const TeamProfileBlock: Block = {
  slug: 'TeamProfileBlock',
  interfaceName: 'TeamProfileBlockType',
  dbName: 'blk_team_profile', // <-- CRITICAL: Forces a short, safe table name
  fields: [
    // ...
  ]
}
```

## 4. The Type Bridge

The frontend and backend must remain in perfect phase alignment. If you add a new field to a Payload block schema, the Astro frontend needs to know about it.

Edge Zero automates this using Payload's type generator. Run the following command from the root to extract the TypeScript interfaces from your live Payload schemas and push them directly into the frontend's awareness:
```bash
pnpm --filter backend generate:types
```

## 5. Deployment

Edge Zero is designed for serverless scalability.

- **Astro Frontend**: Deploy to **Cloudflare Pages**. Update your adapter in `astro.config.mjs` to target Cloudflare, and connect your GitHub repository directly to Pages for automated SSR deployments.
- **Payload Backend**: Deploy to **Cloudflare Workers** using the D1 database adapter. Ensure your `payload.config.ts` is configured to use `@payloadcms/db-sqlite` pointing to your D1 bindings.
