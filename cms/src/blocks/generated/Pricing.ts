// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { Block } from 'payload';
import { linkField, badgeField, anchorIdField } from '../../public/fields';

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'PricingData',
  labels: {
    singular: 'Pricing',
    plural: 'Pricing Blocks',
  },
  admin: {
    group: 'Foundation',
  },
  fields: [
  anchorIdField,
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'cards',
    required: true,
    options: [
      { label: 'Cards', value: 'cards' },
      { label: 'Comparison', value: 'comparison' },
      { label: 'Compact', value: 'compact' },
    ],
    admin: {
      description: 'Choose pricing presentation. The section adapts to this variant.',
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
    name: 'billingNote',
    type: 'text',
  },
  {
    name: 'comparisonFootnote',
    type: 'text',
    admin: {
      condition: (_data: Record<string, any> | undefined, siblingData: Record<string, any> | undefined) =>
        siblingData?.variant === 'comparison',
    },
  },
  {
    name: 'compactEyebrow',
    type: 'text',
    admin: {
      condition: (_data: Record<string, any> | undefined, siblingData: Record<string, any> | undefined) =>
        siblingData?.variant === 'compact',
    },
  },
  {
    name: 'plans',
    type: 'array',
    required: true,
    labels: {
      singular: 'Plan',
      plural: 'Plans',
    },
    validate: (value: any, { siblingData }: { siblingData?: Record<string, any> | undefined }) => {
      const planCount = Array.isArray(value) ? value.length : 0;
      const activeVariant = siblingData?.variant || 'cards';

      if (planCount === 0) {
        return 'Add at least one plan.';
      }

      if (activeVariant === 'comparison' && planCount < 2) {
        return 'Comparison variant requires at least two plans.';
      }

      return true;
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'price',
        type: 'text',
        required: true,
      },
      {
        name: 'billingPeriod',
        type: 'text',
      },
      {
        name: 'description',
        type: 'textarea',
      },
      {
        name: 'planBadge',
        type: 'text',
      },
      {
        name: 'isHighlighted',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        name: 'features',
        type: 'array',
        required: true,
        labels: {
          singular: 'Feature',
          plural: 'Features',
        },
        fields: [
          {
            name: 'item',
            type: 'text',
            required: true,
          },
          {
            name: 'included',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              description: 'Use this to mark excluded items in Comparison mode.',
            },
          },
        ],
      },
      {
        ...linkField,
        name: 'action',
        label: 'Plan Action',
        required: true,
      },
    ],
  },
],
};
