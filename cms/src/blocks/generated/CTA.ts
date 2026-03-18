import type { Block } from 'payload';
import { anchorIdField } from '../../fields/anchorId';
import { badgeField } from '../../fields/badge';
import { linkField } from '../../fields/link';

export const CTA: Block = {
  slug: 'cta',
  interfaceName: 'CTAData',
  labels: {
    singular: 'CTA',
    plural: 'CTA Blocks',
  },
  admin: {
    group: 'Foundation',
  },
  fields: [
  anchorIdField,
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'banner',
    required: true,
    options: [
      { label: 'Banner', value: 'banner' },
      { label: 'Card', value: 'card' },
      { label: 'Split Panel', value: 'split-panel' },
    ],
    admin: {
      description: 'Choose CTA presentation. Field visibility updates to match this layout.',
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
    type: 'row',
    fields: [
      {
        ...linkField,
        name: 'primaryAction',
        label: 'Primary Action',
        required: true,
      },
      {
        ...linkField,
        name: 'secondaryAction',
        label: 'Secondary Action',
      },
    ],
  },
  {
    name: 'finePrint',
    type: 'text',
    admin: {
      condition: (_, siblingData) => ['banner', 'card'].includes(siblingData?.variant),
    },
  },
  {
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'banner',
    },
  },
  {
    name: 'panelTitle',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'split-panel',
    },
  },
  {
    name: 'panelItems',
    type: 'array',
    labels: {
      singular: 'Panel Item',
      plural: 'Panel Items',
    },
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'split-panel',
    },
    validate: (value, { siblingData }) => {
      if ((siblingData?.variant || 'banner') === 'split-panel' && (!Array.isArray(value) || value.length === 0)) {
        return 'At least one panel item is required for Split Panel variant.';
      }
      return true;
    },
    fields: [
      {
        name: 'item',
        type: 'text',
        required: true,
      },
    ],
  },
],
};
