import type { Block } from 'payload';
import { anchorIdField } from '../../fields/anchorId';
import { badgeField } from '../../fields/badge';
import { iconField } from '../../fields/icon';

export const Features: Block = {
  slug: 'features',
  interfaceName: 'FeaturesData',
  labels: {
    singular: 'Features',
    plural: 'Features Blocks',
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
      { label: 'List', value: 'list' },
      { label: 'Spotlight', value: 'spotlight' },
    ],
    admin: {
      description: 'Choose the Features layout. Fields below adapt to the selected variant.',
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
    name: 'columns',
    type: 'select',
    defaultValue: '3',
    options: [
      { label: '2 Columns', value: '2' },
      { label: '3 Columns', value: '3' },
      { label: '4 Columns', value: '4' },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'grid',
    },
  },
  {
    name: 'spotlightMedia',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'spotlight',
    },
    validate: (value, { siblingData }) => {
      if ((siblingData?.variant || 'grid') === 'spotlight' && !value) {
        return 'Spotlight media is required for the Spotlight variant.';
      }
      return true;
    },
  },
  {
    name: 'spotlightMediaPosition',
    type: 'select',
    defaultValue: 'right',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'spotlight',
    },
  },
  {
    name: 'features',
    type: 'array',
    required: true,
    labels: {
      singular: 'Feature',
      plural: 'Features',
    },
    validate: (value, { siblingData }) => {
      const total = Array.isArray(value) ? value.length : 0;
      const activeVariant = siblingData?.variant || 'grid';

      if (total === 0) {
        return 'Add at least one feature.';
      }

      if (activeVariant === 'spotlight' && total < 2) {
        return 'Spotlight variant works best with at least two features.';
      }

      return true;
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        type: 'textarea',
        required: true,
      },
      {
        ...iconField,
        name: 'icon',
        label: 'Icon',
      },
      {
        name: 'action',
        type: 'group',
        label: 'Optional Action',
        validate: (value) => {
          const label = String(value?.label || '').trim();
          const url = String(value?.url || '').trim();
          if ((label && !url) || (!label && url)) {
            return 'Provide both action label and URL, or leave both empty.';
          }
          return true;
        },
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'label',
                type: 'text',
                admin: { width: '50%' },
              },
              {
                name: 'url',
                type: 'text',
                admin: { width: '50%' },
              },
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
                admin: { width: '33%' },
              },
              {
                name: 'style',
                type: 'select',
                defaultValue: 'outline',
                options: [
                  { label: 'Primary', value: 'primary' },
                  { label: 'Secondary', value: 'secondary' },
                  { label: 'Accent', value: 'accent' },
                  { label: 'Neutral', value: 'neutral' },
                  { label: 'Ghost', value: 'ghost' },
                  { label: 'Outline', value: 'outline' },
                  { label: 'Text Link', value: 'link' },
                ],
                admin: { width: '33%' },
              },
              {
                name: 'size',
                type: 'select',
                defaultValue: 'sm',
                options: [
                  { label: 'Small', value: 'sm' },
                  { label: 'Medium', value: 'md' },
                  { label: 'Large', value: 'lg' },
                ],
                admin: { width: '33%' },
              },
            ],
          },
        ],
      },
    ],
  },
],
};
