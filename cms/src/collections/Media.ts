import type { CollectionConfig } from 'payload'
import { hasAdminLevelAccess } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => hasAdminLevelAccess(user),
  },
  upload: {
    // Auto-generates url, width, height, mimeType, filename, etc.
    adminThumbnail: 'thumbnail',
    formatOptions: {
      format: 'webp',
      options: {
        quality: 82,
      },
    },
    resizeOptions: {
      width: 2400,
      withoutEnlargement: true,
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 320,
        crop: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 72,
          },
        },
      },
      {
        name: 'logo',
        width: 320,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 78,
          },
        },
      },
      {
        name: 'avatar',
        width: 160,
        height: 160,
        crop: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 76,
          },
        },
      },
      {
        name: 'card',
        width: 960,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 78,
          },
        },
      },
      {
        name: 'feature',
        width: 1280,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'hero',
        width: 1920,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 82,
          },
        },
      },
    ],
  },
  fields: [
    {
      name: 'altText', // Mapped to match atoms.ts perfectly
      type: 'text',
      required: true,
      admin: {
        description: 'Screen reader text. Crucial for SEO and Accessibility.',
      }
    },
    {
      name: 'blurhash',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional base64 blurhash string for instant loading states.',
      }
    },
    {
      type: 'row',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'focalPointX',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Object-position X percentage (0-100)',
          }
        },
        {
          name: 'focalPointY',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Object-position Y percentage (0-100)',
          }
        },
      ]
    }
  ],
}
