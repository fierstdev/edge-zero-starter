import type { Block } from 'payload';
import { anchorIdField } from '../../fields/anchorId';

export const Logos: Block = {
  slug: 'logos',
  interfaceName: 'LogosData',
  labels: {
    singular: 'Logos',
    plural: 'Logos Blocks',
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
      { label: 'Strip', value: 'strip' },
      { label: 'Monochrome', value: 'monochrome' },
    ],
    admin: {
      description: 'Choose logo layout. Available options adapt to the selected variant.',
    },
  },
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
    name: 'columns',
    type: 'select',
    defaultValue: '6',
    options: [
      { label: '3 Columns', value: '3' },
      { label: '4 Columns', value: '4' },
      { label: '5 Columns', value: '5' },
      { label: '6 Columns', value: '6' },
    ],
    admin: {
      condition: (_, siblingData) => ['grid', 'monochrome'].includes(siblingData?.variant),
    },
  },
  {
    name: 'stripItemWidth',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'strip',
    },
  },
  {
    name: 'logos',
    type: 'array',
    required: true,
    labels: {
      singular: 'Logo',
      plural: 'Logos',
    },
    validate: (value) => {
      if (!Array.isArray(value) || value.length === 0) {
        return 'Add at least one logo.';
      }
      return true;
    },
    fields: [
      {
        name: 'media',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
      {
        name: 'url',
        type: 'text',
      },
    ],
  },
],
};
