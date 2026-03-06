import type { Block } from 'payload'
import { iconField } from '../../../fields/icon'
import { anchorIdField } from '../../../fields/anchorId'
import { createThemeField } from '../../../fields/theme'

export const ValuePropositionBlock: Block = {
  slug: 'ValuePropositionBlock',
  dbName: 'val_prop_blk',
  interfaceName: 'ValuePropositionBlockType',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      admin: {
        description: 'Choose the visual layout for this value proposition section.',
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
              name: 'propositions',
              type: 'array',
              dbName: 'props',
              required: true,
              minRows: 1,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                iconField,
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
    }
  ]
}
