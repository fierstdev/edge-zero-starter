// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { GroupField } from 'payload'

export const badgeField: GroupField = {
  name: 'badge',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: false, admin: { width: '50%' } },
        { 
          name: 'color', 
          type: 'select', 
          defaultValue: 'primary',
          admin: { width: '50%' },
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Accent', value: 'accent' },
            { label: 'Neutral', value: 'neutral' },
            { label: 'Info', value: 'info' },
            { label: 'Success', value: 'success' },
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
          ]
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          admin: { width: '50%' },
          options: [
            { label: 'XS', value: 'xs' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'XL', value: 'xl' },
          ]
        },
        { name: 'isOutline', type: 'checkbox', defaultValue: false, admin: { width: '50%' } },
      ]
    }
  ]
}