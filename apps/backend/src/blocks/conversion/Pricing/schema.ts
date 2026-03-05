import type { Block } from 'payload'
import { linkField } from '../../../fields/link'
import { anchorIdField } from '../../../fields/anchorId'
import { badgeField } from '../../../fields/badge'
import { createThemeField } from '../../../fields/theme'

export const PricingBlock: Block = {
  slug: 'PricingBlock',
  interfaceName: 'PricingBlockType',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'cards',
      admin: {
        description: 'Choose the visual layout for this pricing section.',
      },
      options: [
        { label: 'Cards', value: 'cards' },
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
              name: 'tiers',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
                    { name: 'price', type: 'text', required: true, admin: { width: '25%' } },
                    { name: 'billingPeriod', type: 'text', admin: { width: '25%', placeholder: '/month' } },
                  ]
                },
                { name: 'description', type: 'textarea' },
                {
                  name: 'features',
                  type: 'array',
                  labels: { singular: 'Feature', plural: 'Features' },
                  fields: [
                    { name: 'feature', type: 'text', required: true }
                  ]
                },
                { name: 'isHighlighted', type: 'checkbox', label: 'Highlight this tier (e.g., "Most Popular")' },
                {
                  ...badgeField,
                  admin: {
                    condition: (_, siblingData) => Boolean(siblingData?.isHighlighted),
                  }
                },
                linkField
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