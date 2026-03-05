import type { GroupField } from 'payload'

export const iconField: GroupField = {
  name: 'icon',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lucide',
      options: [
        { label: 'Lucide Icon Name', value: 'lucide' },
        { label: 'Raw SVG String', value: 'svg-string' },
        { label: 'Image URL', value: 'image' },
      ],
      admin: { width: '50%' }
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      admin: { 
        width: '50%',
        description: 'Enter the Lucide icon name, paste raw SVG, or provide an image URL based on the type selected.'
      }
    }
  ]
}