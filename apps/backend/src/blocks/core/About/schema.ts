import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { anchorIdField } from '../../../fields/anchorId'
import { createThemeField } from '../../../fields/theme'

export const AboutBlock: Block = {
  slug: 'AboutBlock',
  interfaceName: 'AboutBlockType',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      admin: {
        description: 'Choose the visual layout for this about section.',
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
            { name: 'content', type: 'richText', editor: lexicalEditor(), required: true },
          ]
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'An optional image to display next to the about block content.',
              }
            },
            {
              name: 'mediaPosition',
              type: 'select',
              defaultValue: 'right',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.media),
              }
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
  ],
}
