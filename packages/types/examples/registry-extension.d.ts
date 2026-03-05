/**
 * To add a custom block or unlock Pro blocks in your Edge Zero project,
 * you use TypeScript Declaration Merging to extend the BlockRegistry.
 * 
 * Create a file like `src/types/edge-zero.d.ts` in your front-end repository:
 */

import '@edge-zero/types';

interface MyCustomHeroBlock {
  blockType: 'MyCustomHeroBlock';
  id: string;
  customHeadline: string;
}

// 1. We declare the module to augment it
declare module '@edge-zero/types' {
  
  // 2. We inject our custom block into the registry definition
  interface BlockRegistry {
    MyCustomHeroBlock: MyCustomHeroBlock;
  }
}

// 3. Now, anywhere your app imports `PageBlock` or `BlockType`, 
// TypeScript will automatically include 'MyCustomHeroBlock' in the Unions!
