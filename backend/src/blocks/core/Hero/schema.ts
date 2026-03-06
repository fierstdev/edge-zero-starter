import type { Block } from 'payload'
import { linkField } from '../../../fields/link'
import { anchorIdField } from '../../../fields/anchorId'
import { badgeField } from '../../../fields/badge'
import { createThemeField } from '../../../fields/theme'

export const HeroBlock: Block = {
  slug: 'HeroBlock',
  interfaceName: 'HeroBlockType',
  fields: [
    // 1. THE VARIANT CONTROLLER (Always visible at the top)
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      admin: {
        description: 'Choose the visual layout for this hero section.',
      },
      options: [
        { label: 'Standard (Text Centered)', value: 'standard' },
        { label: 'Split (Text + Side Media)', value: 'split' },
        { label: 'Cinematic (Full Background Media)', value: 'cinematic' },
      ],
    },

    // 2. THE TABS UI (Hides the wall of inputs from the client)
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            badgeField,
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'textarea' },
            {
              name: 'actions',
              type: 'array',
              labels: { singular: 'Action', plural: 'Actions' },
              fields: [linkField],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              admin: {
                // CONDITIONAL LOGIC: Only show this field if the variant requires media
                condition: (_, siblingData) => 
                  siblingData?.variant === 'split' || siblingData?.variant === 'cinematic',
              },
            },
            {
              name: 'mediaPosition',
              type: 'select',
              defaultValue: 'right',
              options: [
                { label: 'Media on Left', value: 'left' },
                { label: 'Media on Right', value: 'right' },
              ],
              admin: {
                // CONDITIONAL LOGIC: Only show this if they chose the 'split' variant
                condition: (_, siblingData) => siblingData?.variant === 'split',
              },
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