// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { Block } from 'payload';
import { iconField, badgeField, anchorIdField, arrayField, checkboxField, groupField, rowField, selectField, textField, textareaField, uploadField } from '../../public/fields';

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
  selectField(
    'variant',
    [
      { label: 'Grid', value: 'grid' },
      { label: 'List', value: 'list' },
      { label: 'Spotlight', value: 'spotlight' },
    ],
    {
      defaultValue: 'grid',
      required: true,
      admin: {
        description: 'Choose the Features layout. Fields below adapt to the selected variant.',
      },
    },
  ),
  badgeField,
  textField('heading', {
    required: true,
  }),
  textareaField('subheading'),
  selectField(
    'columns',
    [
      { label: '2 Columns', value: '2' },
      { label: '3 Columns', value: '3' },
      { label: '4 Columns', value: '4' },
    ],
    {
      defaultValue: '3',
      admin: {
        condition: (_data: Record<string, any> | undefined, siblingData: Record<string, any> | undefined) =>
          siblingData?.variant === 'grid',
      },
    },
  ),
  uploadField('spotlightMedia', 'media', {
    admin: {
      condition: (_data: Record<string, any> | undefined, siblingData: Record<string, any> | undefined) =>
        siblingData?.variant === 'spotlight',
    },
    validate: (value: any, { siblingData }: { siblingData?: Record<string, any> | undefined }) => {
      if ((siblingData?.variant || 'grid') === 'spotlight' && !value) {
        return 'Spotlight media is required for the Spotlight variant.';
      }
      return true;
    },
  }),
  selectField(
    'spotlightMediaPosition',
    [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ],
    {
      defaultValue: 'right',
      admin: {
        condition: (_data: Record<string, any> | undefined, siblingData: Record<string, any> | undefined) =>
          siblingData?.variant === 'spotlight',
      },
    },
  ),
  arrayField(
    'features',
    [
      textField('title', {
        required: true,
      }),
      textareaField('description', {
        required: true,
      }),
      {
        ...iconField,
        name: 'icon',
        label: 'Icon',
      },
      groupField(
        'action',
        [
          rowField([
            textField('label', {
              admin: { width: '50%' },
            }),
            textField('url', {
              admin: { width: '50%' },
            }),
          ]),
          rowField([
            selectField(
              'target',
              [
                { label: 'Same Window (_self)', value: '_self' },
                { label: 'New Tab (_blank)', value: '_blank' },
              ],
              {
                defaultValue: '_self',
                admin: { width: '33%' },
              },
            ),
            selectField(
              'style',
              [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Accent', value: 'accent' },
                { label: 'Neutral', value: 'neutral' },
                { label: 'Ghost', value: 'ghost' },
                { label: 'Outline', value: 'outline' },
                { label: 'Text Link', value: 'link' },
              ],
              {
                defaultValue: 'outline',
                admin: { width: '33%' },
              },
            ),
            selectField(
              'size',
              [
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' },
              ],
              {
                defaultValue: 'sm',
                admin: { width: '33%' },
              },
            ),
          ]),
        ],
        {
          label: 'Optional Action',
          validate: (value: any) => {
            const label = String(value?.label || '').trim();
            const url = String(value?.url || '').trim();
            if ((label && !url) || (!label && url)) {
              return 'Provide both action label and URL, or leave both empty.';
            }
            return true;
          },
        },
      ),
    ],
    {
      required: true,
      labels: {
      singular: 'Feature',
      plural: 'Features',
      },
      validate: (value: any, { siblingData }: { siblingData?: Record<string, any> | undefined }) => {
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
    },
  ),
],
};
