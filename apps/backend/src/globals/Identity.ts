import type { GlobalConfig } from 'payload'

export const Identity: GlobalConfig = {
  slug: 'identity',
  access: {
    read: () => true,
  },
  label: 'Site Identity',
  fields: [
    { name: 'siteName', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'logoLight', type: 'upload', relationTo: 'media', admin: { width: '33%' } },
        { name: 'logoDark', type: 'upload', relationTo: 'media', admin: { width: '33%' } },
        { name: 'favicon', type: 'upload', relationTo: 'media', admin: { width: '33%' } },
      ],
    },
  ],
}