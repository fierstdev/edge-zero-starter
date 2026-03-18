# Edge Zero: Frontend (Astro + DaisyUI)

This is the static presentation layer of the Edge Zero platform. Constructed with **Astro**, **Tailwind CSS v4**, and **DaisyUI v5**, it receives pure JSON blocks from the Payload CMS over HTTP and paints the UI at lightning speed.

## Architecture

* **The Router Map**: `src/pages/[...slug].astro` is the singular dynamic routing endpoint. It intercepts all incoming URIs, fetches the `Page` from the starter CMS REST API via the slug, and steps through the generated block map.
* **The Blocks**: The compiled block renderers live in `src/components/blocks/generated`. If the block renderer encounters a `hero-split` or `AboutBlock` payload shape from the CMS, it resolves the right generated Astro component automatically.
* **The Theming Protocol**: DaisyUI is baked directly into `src/styles/global.css`. Theme overrides are applied individually to components using the `data-theme` HTML attribute based on instructions passed down from Payload CMS block overrides.

## The Data Pipeline

1. **Client Request Endpoint**: `[...slug].astro`
2. **Fetch Logic**: Queries `${PUBLIC_CMS_URL}/api/pages` with `depth=2` to ensure rich media/assets are fully populated up-front.
3. **Typing**: Exclusively relies on models inside `packages/types/src/blocks.ts` to guarantee runtime synchronization. Never reinvent local interfaces for core block dependencies.

## Key Developer Scripts
- `pnpm dev`: Boots the local hot-reloading Astro server on `localhost:4321`.
- `pnpm build`: Freezes down all static pages using the Astro SSG compiler. (If deployed to Cloudflare Pages, SSR takes over).

## Environment

- `PUBLIC_CMS_URL`: Base URL for the starter CMS API. Defaults to `http://localhost:3000`.
- `PUBLIC_CMS_GLOBAL_CACHE_TTL_MS`: In-memory cache TTL (ms) for global CMS docs (`theme`, `header`, etc). Set to `0` for immediate updates on refresh.

## Optional Contact Form Email Notifications

The `POST /api/contact-form` route can optionally email each submission to one or more client inboxes using Resend.

- Set `CONTACT_FORM_RESEND_API_KEY` (or `RESEND_API_KEY`) with a valid Resend API key.
- Set `CONTACT_FORM_NOTIFY_TO` to one or more recipient addresses (comma-separated).
- Optionally set `CONTACT_FORM_NOTIFY_FROM` (defaults to `onboarding@resend.dev`).
- Optionally set `CONTACT_FORM_REPLY_TO_SUBMITTER=false` to disable setting `reply_to` to the submitter email.

When notification variables are not configured, form submissions still work and are saved to Payload (`form-submissions`) with no email sent.
