import type { Block } from 'payload'
import { linkField } from '../../../fields/link'
import { anchorIdField } from '../../../fields/anchorId'
import { iconField } from '../../../fields/icon'
import { createThemeField } from '../../../fields/theme'

export const ServicesBlock: Block = {
  slug: 'ServicesBlock',
  interfaceName: 'ServicesBlockType',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'list',
      admin: {
        description: 'Choose the visual layout for this services section.',
      },
      options: [
        { label: 'List', value: 'list' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'subheading', type: 'textarea' },
            {
              name: 'services',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
                    { name: 'price', type: 'text', admin: { width: '50%' } },
                  ]
                },
                { name: 'description', type: 'textarea', required: true },
                iconField,
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  ...linkField,
                  name: 'link', 
                }
              ]
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
    },
  ]
}