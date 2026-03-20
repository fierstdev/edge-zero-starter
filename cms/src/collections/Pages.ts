// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { CollectionConfig } from 'payload'
import { EdgeZeroBlocks } from '../blocks/generated/index';
import { hasAdminLevelAccess, isEditorOnly } from '../access/roles'

function mergeBlocksBySlug(blocks: any[]) {
  const blockMap = new Map<string, any>();

  blocks.forEach((block) => {
    blockMap.set(block.slug, block);
  });

  return Array.from(blockMap.values());
}

const pageBlocks = mergeBlocksBySlug([...EdgeZeroBlocks]);

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
    create: ({ req: { user } }) => hasAdminLevelAccess(user),
    update: ({ req: { user } }) => !!user, // Both admin and editor can update (hook restricts editors)
    delete: ({ req: { user } }) => hasAdminLevelAccess(user),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    // --- 1. CORE PAGE DATA ---
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal reference title for this page (e.g., "Home Page").',
      }
    },
    
    // --- 2. THE PAGE BUILDER ---
    {
      name: 'blocks',
      type: 'blocks',
      required: true,
      blocks: pageBlocks,
      hooks: {
        beforeChange: [
          ({ req, originalDoc, value }) => {
            const isEditor = isEditorOnly(req.user);
            
            // If the user is just an editor and updating an existing doc
            if (isEditor && originalDoc?.blocks) {
              const incomingBlocks = value || [];
              const originalBlocks = originalDoc.blocks;

              if (incomingBlocks.length !== originalBlocks.length) {
                // Return original structure seamlessly with a possible toast error in client
                throw new Error("Editors are not permitted to add or remove blocks.");
              }

              for (let i = 0; i < incomingBlocks.length; i++) {
                if (incomingBlocks[i].blockType !== originalBlocks[i].blockType) {
                   throw new Error("Editors are not permitted to reorder or replace blocks.");
                }
              }
            }
            return value;
          }
        ]
      }
    },

    // --- 3. SIDEBAR: ROUTING & SEO ---
    // Moving these to the sidebar keeps the main editing window focused on content
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'The URL path. Use "home" for the root index (/).',
        condition: (data, siblingData, { user }) => hasAdminLevelAccess(user),
      },
    },
    {
      name: 'seo',
      type: 'group',
      admin: {
        position: 'sidebar',
        condition: (data, siblingData, { user }) => hasAdminLevelAccess(user),
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'The title tag shown in search engines and browser tabs.',
          }
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'The meta description shown in search engine results.',
          }
        }
      ]
    }
  ],
}
