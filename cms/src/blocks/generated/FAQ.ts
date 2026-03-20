// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { Block } from 'payload';
import { anchorIdField, arrayField, checkboxField, groupField, rowField, selectField, textField, textareaField, uploadField } from '../../public/fields';

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQData',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ Blocks',
  },
  admin: {
    group: 'Foundation',
  },
  fields: [
  anchorIdField,
  selectField(
    'variant',
    [
      { label: 'Accordion', value: 'accordion' },
      { label: 'List', value: 'list' },
      { label: 'Two Column', value: 'two-column' },
    ],
    {
      defaultValue: 'accordion',
      required: true,
      admin: {
      description: 'Choose FAQ layout.',
      },
    },
  ),
  textField('heading', {
    required: true,
  }),
  textareaField('subheading'),
  checkboxField('allowMultipleOpen', {
    defaultValue: false,
    admin: {
      condition: (_data: Record<string, any> | undefined, siblingData: Record<string, any> | undefined) =>
        siblingData?.variant === 'accordion',
      description: 'Enable to allow multiple expanded items at once in accordion mode.',
    },
  }),
  arrayField(
    'items',
    [
      textField('question', {
        required: true,
      }),
      textareaField('answer', {
        required: true,
      }),
      checkboxField('isOpenByDefault', {
        defaultValue: false,
      }),
    ],
    {
      required: true,
      labels: {
      singular: 'FAQ Item',
      plural: 'FAQ Items',
      },
      validate: (value: any, { siblingData }: { siblingData?: Record<string, any> | undefined }) => {
        const count = Array.isArray(value) ? value.length : 0;
        const activeVariant = siblingData?.variant || 'accordion';

        if (count === 0) {
          return 'Add at least one FAQ item.';
        }

        if (activeVariant === 'two-column' && count < 4) {
          return 'Two Column FAQ works best with at least four items.';
        }

        return true;
      },
    },
  ),
],
};
