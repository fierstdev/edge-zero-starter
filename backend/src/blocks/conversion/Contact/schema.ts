import type { Block } from 'payload'
import { anchorIdField } from '../../../fields/anchorId'
import { createThemeField } from '../../../fields/theme'

export const ContactBlock: Block = {
  slug: 'ContactBlock',
  interfaceName: 'ContactBlockType',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      admin: {
        description: 'Choose the visual layout for this contact section.',
      },
      options: [
        { label: 'Standard', value: 'standard' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'textarea' },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'text', admin: { width: '33%' } },
                { name: 'phone', type: 'text', admin: { width: '33%' } },
                { name: 'address', type: 'textarea', admin: { width: '33%', rows: 2 } },
              ]
            },
            { 
              name: 'showForm', 
              type: 'checkbox', 
              defaultValue: true,
              admin: { description: 'Toggle the standard contact form visibility.' }
            }
          ]
        },
        {
          label: 'Design Overrides',
          fields: [
            anchorIdField,
            createThemeField({
              name: 'themeOverride',
              admin: {
                description: 'Optional DaisyUI theme specifically for this section.',
              },
            }),
          ],
        },
      ],
    }
  ]
}