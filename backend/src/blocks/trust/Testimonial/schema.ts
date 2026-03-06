import type { Block } from 'payload'
import { anchorIdField } from '../../../fields/anchorId'
import { createThemeField } from '../../../fields/theme'

export const TestimonialBlock: Block = {
  slug: 'TestimonialBlock',
  interfaceName: 'TestimonialBlockType',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'grid',
      admin: {
        description: 'Choose the visual layout for this block.',
      },
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Slider', value: 'slider' },
        { label: 'Featured', value: 'featured' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'testimonials',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                { name: 'quote', type: 'textarea', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'authorName', type: 'text', required: true, admin: { width: '33%' } },
                    { name: 'authorRole', type: 'text', admin: { width: '33%' } },
                    { name: 'authorCompany', type: 'text', admin: { width: '33%' } },
                  ],
                },
                {
                  name: 'authorImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'rating',
                  type: 'number',
                  min: 1,
                  max: 5,
                  defaultValue: 5,
                },
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