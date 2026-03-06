import type { Block } from 'payload'
import { linkField } from '../../../fields/link'
import { anchorIdField } from '../../../fields/anchorId'
import { iconField } from '../../../fields/icon'
import { createThemeField } from '../../../fields/theme'

export const FeatureGridBlock: Block = {
  slug: 'FeatureGridBlock',
  interfaceName: 'FeatureGridBlockType',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      admin: {
        description: 'Choose the visual layout for this feature grid.',
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
            {
              type: 'row',
              fields: [
                { name: 'heading', type: 'text', admin: { width: '50%' } },
                { name: 'columns', type: 'number', defaultValue: 3, min: 2, max: 4, admin: { width: '50%' } },
              ],
            },
            { name: 'subheading', type: 'textarea' },
            { name: 'alignment', type: 'select', defaultValue: 'center',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ] 
            },
            {
              name: 'features',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                iconField, // Icon support for each feature
                linkField // Optional link for each feature
              ],
            },
          ],
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
  ],
}