// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { Field } from 'payload'

export const anchorIdField: Field = {
  name: 'anchorId',
  type: 'text',
  admin: {
    description: 'Optional. Define a unique ID for this block to enable deep-linking (e.g., entering "services" here allows linking to "#services"). Do not include the # symbol.',
  },
}
