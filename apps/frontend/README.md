# Edge Zero: Frontend (Astro + DaisyUI)

This is the static presentation layer of the Edge Zero platform. Constructed with **Astro**, **Tailwind CSS v4**, and **DaisyUI v5**, it receives pure JSON blocks from the Payload CMS and paints the UI at lightning speed.

## Architecture

* **The Router Map**: `src/pages/[...slug].astro` is the singular dynamic routing endpoint. It intercepts all incoming URIs, fetches the `Page` from the Payload API via the slug, and steps through the `ComponentRegistry` array.
* **The Blocks**: Every visual component matching a Payload Schema lives inside `src/components/blocks`. If the Component Registry encounters a `HeroBlock` object from the CMS, it renders `<HeroBlock />`.
* **The Theming Protocol**: DaisyUI is baked directly into `src/styles/global.css`. Theme overrides are applied individually to components using the `data-theme` HTML attribute based on instructions passed down from Payload CMS block overrides.

## The Data Pipeline

1. **Client Request Endpoint**: `[...slug].astro`
2. **Fetch Logic**: Queries `http://127.0.0.1:3000/api/pages` with `depth=2` to ensure rich media/assets are fully populated up-front.
3. **Typing**: Exclusively relies on models inside `packages/types/src/blocks.ts` to guarantee runtime synchronization. Never reinvent local interfaces for core block dependencies.

## Key Developer Scripts
- `pnpm dev`: Boots the local hot-reloading Astro server on `localhost:4321`.
- `pnpm build`: Freezes down all static pages using the Astro SSG compiler. (If deployed to Cloudflare Pages, SSR takes over).
