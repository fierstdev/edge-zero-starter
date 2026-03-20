// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { Block } from 'payload';
import { badgeField, anchorIdField } from '../../public/fields';

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsData',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials Blocks',
  },
  admin: {
    group: 'Foundation',
  },
  fields: [
  anchorIdField,
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'grid',
    required: true,
    options: [
      { label: 'Grid', value: 'grid' },
      { label: 'Featured', value: 'featured' },
      { label: 'Stacked', value: 'stacked' },
    ],
    admin: {
      description: 'Choose how testimonials are presented.',
    },
  },
  badgeField,
  {
    name: 'heading',
    type: 'text',
    required: true,
  },
  {
    name: 'subheading',
    type: 'textarea',
  },
  {
    name: 'featuredEyebrow',
    type: 'text',
    admin: {
      condition: (_data: Record<string, any> | undefined, siblingData: Record<string, any> | undefined) =>
        siblingData?.variant === 'featured',
    },
  },
  {
    name: 'testimonials',
    type: 'array',
    required: true,
    labels: {
      singular: 'Testimonial',
      plural: 'Testimonials',
    },
    validate: (value: any) => {
      if (!Array.isArray(value) || value.length === 0) {
        return 'Add at least one testimonial.';
      }
      return true;
    },
    fields: [
      {
        name: 'quote',
        type: 'textarea',
        required: true,
      },
      {
        name: 'authorName',
        type: 'text',
        required: true,
      },
      {
        name: 'authorRole',
        type: 'text',
      },
      {
        name: 'authorCompany',
        type: 'text',
      },
      {
        name: 'authorImage',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'rating',
        type: 'number',
        defaultValue: 5,
        min: 1,
        max: 5,
      },
    ],
  },
],
};
