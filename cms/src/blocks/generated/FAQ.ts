import type { Block } from 'payload';
import { anchorIdField } from '../../fields/anchorId';

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
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'accordion',
    required: true,
    options: [
      { label: 'Accordion', value: 'accordion' },
      { label: 'List', value: 'list' },
      { label: 'Two Column', value: 'two-column' },
    ],
    admin: {
      description: 'Choose FAQ layout.',
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
    name: 'allowMultipleOpen',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      condition: (_, siblingData) => siblingData?.variant === 'accordion',
      description: 'Enable to allow multiple expanded items at once in accordion mode.',
    },
  },
  {
    name: 'items',
    type: 'array',
    required: true,
    labels: {
      singular: 'FAQ Item',
      plural: 'FAQ Items',
    },
    validate: (value, { siblingData }) => {
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
    fields: [
      {
        name: 'question',
        type: 'text',
        required: true,
      },
      {
        name: 'answer',
        type: 'textarea',
        required: true,
      },
      {
        name: 'isOpenByDefault',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  },
],
};
