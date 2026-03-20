// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { GlobalConfig } from 'payload'
import { createThemeField } from '../fields/theme'

export const Theme: GlobalConfig = {
  slug: 'theme',
  access: {
    read: () => true,
  },
  label: 'Theme Settings',
  fields: [
    createThemeField({
      name: 'defaultTheme',
      required: true,
      defaultValue: 'edgezero-light',
      admin: {
        description: 'The fallback DaisyUI theme for the entire website.',
      }
    }),
    {
      name: 'fonts',
      type: 'group',
      fields: [
        { name: 'sans', type: 'text', required: true, defaultValue: 'Inter', admin: { description: 'Google Font name for standard text.' } },
        { name: 'heading', type: 'text', required: true, defaultValue: 'Playfair Display', admin: { description: 'Google Font name for headings.' } },
      ],
    },
    {
      name: 'structure',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'radiusBox', type: 'text', required: true, defaultValue: '1rem', admin: { width: '33%' } },
            { name: 'radiusField', type: 'text', required: true, defaultValue: '0.25rem', admin: { width: '33%' } },
            { name: 'radiusSelector', type: 'text', required: true, defaultValue: '1rem', admin: { width: '33%' } },
          ]
        },
        {
          type: 'row',
          fields: [
            { name: 'borderSize', type: 'text', required: true, defaultValue: '1px', admin: { width: '33%' } },
            { name: 'depth', type: 'select', defaultValue: '1', options: [{ label: 'Flat (0)', value: '0' }, { label: 'Shadowed (1)', value: '1' }], admin: { width: '33%' } },
            { name: 'noise', type: 'select', defaultValue: '0', options: [{ label: 'Clean (0)', value: '0' }, { label: 'Textured (1)', value: '1' }], admin: { width: '33%' } },
          ]
        },
      ],
    },
  ],
}
