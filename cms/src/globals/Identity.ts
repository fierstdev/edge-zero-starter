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
    {
      name: 'logoSize',
      type: 'select',
      defaultValue: 'md',
      admin: {
        description: 'Choose the size of the text logo',
      },
      options: [
        { label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
  ],
}
