// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import { anchorIdField } from './anchorId'
import { badgeField } from './badge'
import { linkField } from './link'
import { rowField, textField, textareaField, uploadField } from './ez'
import type { Field, UploadField } from 'payload'

type FieldConfig = Record<string, any>

export function sectionHeadingFields(config: {
  headingName?: string
  subheadingName?: string
  headingRequired?: boolean
} = {}): Field[] {
  const {
    headingName = 'heading',
    subheadingName = 'subheading',
    headingRequired = true,
  } = config

  return [
    textField(headingName, { required: headingRequired }),
    textareaField(subheadingName),
  ]
}

export function ctaActionRowField(config: {
  primaryName?: string
  secondaryName?: string
  primaryRequired?: boolean
} = {}): Field {
  const {
    primaryName = 'primaryAction',
    secondaryName = 'secondaryAction',
    primaryRequired = true,
  } = config

  return rowField([
    {
      ...linkField,
      name: primaryName,
      label: 'Primary Action',
      required: primaryRequired,
    },
    {
      ...linkField,
      name: secondaryName,
      label: 'Secondary Action',
    },
  ])
}

export function mediaFieldWithOptionalAlt(config: {
  mediaName?: string
  relationTo?: UploadField['relationTo']
  mediaRequired?: boolean
  mediaConfig?: FieldConfig
  includeAltText?: boolean
  altFieldName?: string
  altLabel?: string
  altFieldConfig?: FieldConfig
} = {}): Field[] {
  const {
    mediaName = 'media',
    relationTo = 'media',
    mediaRequired = false,
    mediaConfig = {},
    includeAltText = false,
    altFieldName = 'mediaAlt',
    altLabel = 'Image alt text',
    altFieldConfig = {},
  } = config

  const fields: Field[] = [
    uploadField(mediaName, relationTo, {
      required: mediaRequired,
      ...mediaConfig,
    }),
  ]

  if (includeAltText) {
    fields.push(
      textField(altFieldName, {
        label: altLabel,
        ...altFieldConfig,
      }),
    )
  }

  return fields
}

export function sectionScaffoldFields(config: {
  includeAnchor?: boolean
  includeBadge?: boolean
  headingRequired?: boolean
} = {}): Field[] {
  const {
    includeAnchor = true,
    includeBadge = false,
    headingRequired = true,
  } = config

  return [
    ...(includeAnchor ? [anchorIdField] : []),
    ...(includeBadge ? [badgeField] : []),
    ...sectionHeadingFields({ headingRequired }),
  ]
}
