import type { Block } from 'payload';
import { anchorIdField } from '../../fields/anchorId';

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsData',
  labels: {
    singular: 'Stats',
    plural: 'Stats Blocks',
  },
  admin: {
    group: 'Foundation',
  },
  fields: [
  anchorIdField,
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'band',
    required: true,
    options: [
      { label: 'Band', value: 'band' },
      { label: 'Grid', value: 'grid' },
      { label: 'Spotlight', value: 'spotlight' },
    ],
    admin: {
      description: 'Choose the stats presentation style.',
    },
  },
  {
    name: 'heading',
    type: 'text',
  },
  {
    name: 'subheading',
    type: 'textarea',
  },
  {
    name: 'spotlightLabel',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'spotlight',
    },
  },
  {
    name: 'items',
    type: 'array',
    required: true,
    labels: {
      singular: 'Metric',
      plural: 'Metrics',
    },
    validate: (value, { siblingData }) => {
      const count = Array.isArray(value) ? value.length : 0;
      const activeVariant = siblingData?.variant || 'band';

      if (count === 0) {
        return 'Add at least one metric.';
      }

      if (activeVariant === 'spotlight' && count < 2) {
        return 'Spotlight variant works best with at least two metrics.';
      }

      return true;
    },
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
      },
      {
        name: 'value',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        type: 'text',
      },
    ],
  },
],
};
