// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { GlobalConfig } from 'payload'
import { navItemFields } from '../fields/navItem'
import { linkField } from '../fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'isSticky', type: 'checkbox', defaultValue: true },
    { name: 'themeOverride', type: 'text', admin: { description: 'Optional DaisyUI theme name for the header (e.g., "dark")' } },
    {
      name: 'navigation',
      type: 'array',
      fields: navItemFields,
    },
    {
      ...linkField,
      name: 'callToAction',
      label: 'Header Call to Action Button',
    },
  ],
}