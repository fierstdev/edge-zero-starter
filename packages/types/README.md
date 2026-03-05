# Edge Zero: The Type Bridge (`@edge-zero/types`)

This package is the absolute, immutable source of truth for the entire Edge Zero monorepo. It establishes the bridge between the headless **Payload CMS (apps/backend)** and the static visual presentation layer in **Astro (apps/frontend)**.

## The Architecture

Because the backend and frontend exist in entirely separate applications, relying on localized interfaces leads to rapid schema desynchronization. If the frontend expects `subtitle` but the backend updates its model to `subheading`, the application breaks.

By lifting **ALL** block and data definitions into this isolated TypeScript package, we guarantee:
1. **Frontend Safety**: The Astro components import `import type { HeroBlock } from '@edge-zero/types';`. If the Payload structure changes, the Astro compiler immediately throws a type error during the build phase preventing massive production breakages.
2. **Backend Safety**: When building new schemas in Payload CMS, developers write `export const HeroBlock: Block = { interfaceName: 'HeroBlockType' ... }`. The Payload Schema *must* mirror the properties defined in `src/blocks`.

## Master Export: `blocks.ts`

Any time you build a new Block in Edge Zero, you MUST define it in `src/blocks.ts` first, before generating the Payload Schema or Astro component.
It must also be appended to the master union type `PageBlock` so that the Astro Router knows how to iterate over it reliably.

## Usage

This package doesn't deploy or run logic. It is purely consumed.
```typescript
import type { PageBlueprint, PageBlock } from '@edge-zero/types';
```
