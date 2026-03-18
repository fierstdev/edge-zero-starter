import type { Block } from 'payload';
import { anchorIdField } from '../../fields/anchorId';
import { badgeField } from '../../fields/badge';
import { linkField } from '../../fields/link';

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroData',
  labels: {
    singular: 'Hero',
    plural: 'Hero Blocks',
  },
  admin: {
    group: 'Foundation',
  },
  fields: [
  anchorIdField,
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'split',
    required: true,
    options: [
      { label: 'Split', value: 'split' },
      { label: 'Centered', value: 'centered' },
      { label: 'Cinematic', value: 'cinematic' },
      { label: 'Diagonal Split', value: 'diagonal-split' },
    ],
    admin: {
      description: 'Choose a hero layout. Field visibility below adapts to the selected variant.',
    },
  },
  badgeField,
  {
    name: 'headline',
    type: 'text',
    required: true,
  },
  {
    name: 'subheading',
    type: 'textarea',
    required: true,
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
    name: 'highlights',
    type: 'array',
    labels: {
      singular: 'Highlight',
      plural: 'Highlights',
    },
    admin: {
      condition: (_, siblingData) => ['split', 'diagonal-split', 'cinematic'].includes(siblingData?.variant),
    },
    fields: [
      {
        name: 'value',
        type: 'text',
        required: true,
      },
      {
        name: 'label',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => ['split', 'diagonal-split'].includes(siblingData?.variant),
    },
    validate: (value, { siblingData }) => {
      const activeVariant = siblingData?.variant || 'split';
      if (['split', 'diagonal-split'].includes(activeVariant) && !value) {
        return 'Media is required for Split and Diagonal Split variants.';
      }
      return true;
    },
  },
  {
    name: 'mediaPosition',
    type: 'select',
    defaultValue: 'right',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'split',
    },
  },
  {
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'cinematic',
    },
    validate: (value, { siblingData }) => {
      if ((siblingData?.variant || 'split') === 'cinematic' && !value) {
        return 'Background image is required for the Cinematic variant.';
      }
      return true;
    },
  },
  {
    name: 'panelEyebrow',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'cinematic',
    },
  },
  {
    name: 'panelStatusText',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'cinematic',
    },
  },
  {
    name: 'cinematicToneMode',
    type: 'select',
    defaultValue: 'auto',
    options: [
      { label: 'Auto Detect', value: 'auto' },
      { label: 'Light Text', value: 'light' },
      { label: 'Dark Text', value: 'dark' },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'cinematic',
      description:
        'Auto detects image brightness behind the content area. Use manual tone when art direction requires it.',
    },
  },
  {
    name: 'diagonalAccentLabel',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'diagonal-split',
    },
  },
],
};
