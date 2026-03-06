import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: true, // Auto-generates url, width, height, mimeType, filename, etc.
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