import type { GlobalConfig } from 'payload'
import { navItemFields } from '../fields/navItem'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true, 
  },
  fields: [
    { name: 'themeOverride', type: 'text', admin: { description: 'Optional DaisyUI theme name for the footer (e.g., "dark" or "neutral")' } },
    {
      name: 'columns',
      type: 'array',
      labels: { singular: 'Column', plural: 'Columns' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'links', type: 'array', fields: navItemFields },
      ]
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          defaultValue: 'twitter',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'GitHub', value: 'github' },
            { label: 'Custom', value: 'custom' },
          ]
        },
        { name: 'url', type: 'text', required: true },
        { name: 'iconOverride', type: 'text', admin: { description: 'Optional Lucide icon name' } },
      ]
    },
    { name: 'legalText', type: 'text', required: true, defaultValue: '© 2026 FierstDev LLC. All rights reserved.' },
    {
      name: 'bottomLinks',
      type: 'array',
      admin: { description: 'Links for Privacy Policy, Terms of Service, etc.' },
      fields: navItemFields,
    }
  ]
}