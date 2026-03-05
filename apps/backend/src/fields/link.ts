import type { Field, GroupField } from 'payload'

// Maps to the ThemeColor + 'outline' | 'link' from atoms.ts
const buttonStyles = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Accent', value: 'accent' },
  { label: 'Neutral', value: 'neutral' },
  { label: 'Ghost', value: 'ghost' },
  { label: 'Outline', value: 'outline' },
  { label: 'Text Link', value: 'link' },
]

export const linkField: GroupField = {
  name: 'link', // This will be the key in the JSON output
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'url', type: 'text', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'target',
          type: 'select',
          defaultValue: '_self',
          options: [
            { label: 'Same Window (_self)', value: '_self' },
            { label: 'New Tab (_blank)', value: '_blank' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: buttonStyles,
          admin: { width: '33%' },
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
          admin: { width: '33%' },
        },
      ],
    },
  ],
}