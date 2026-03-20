// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { Field } from 'payload'

export const navItemFields: Field[] = [
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
        admin: { width: '50%' },
      },
      { name: 'iconName', type: 'text', admin: { width: '50%', description: 'Optional Lucide icon name' } },
    ],
  },
  {
    name: 'children',
    type: 'array',
    labels: { singular: 'Sub-link', plural: 'Sub-links' },
    admin: { description: 'Add nested links to create a dropdown menu.' },
    fields: [
      {
        type: 'row',
        fields: [
          { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
          { name: 'url', type: 'text', required: true, admin: { width: '50%' } },
        ],
      },
    ],
  },
]