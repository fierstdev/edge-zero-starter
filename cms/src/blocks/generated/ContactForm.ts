import type { Block } from 'payload';
import { anchorIdField } from '../../fields/anchorId';
import { badgeField } from '../../fields/badge';

export const ContactForm: Block = {
  slug: 'contact-form',
  interfaceName: 'ContactFormData',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Form Blocks',
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
      { label: 'Card', value: 'card' },
      { label: 'Minimal', value: 'minimal' },
    ],
    admin: {
      description: 'Choose contact form layout.',
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
    name: 'showContactDetails',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      condition: (_, siblingData) => siblingData?.variant !== 'minimal',
    },
  },
  {
    name: 'detailsHeading',
    type: 'text',
    defaultValue: 'Contact details',
    admin: {
      condition: (_, siblingData) => siblingData?.variant !== 'minimal' && siblingData?.showContactDetails !== false,
    },
  },
  {
    name: 'emailLabel',
    type: 'text',
    defaultValue: 'Email',
    admin: {
      condition: (_, siblingData) => siblingData?.variant !== 'minimal' && siblingData?.showContactDetails !== false,
    },
  },
  {
    name: 'email',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.variant !== 'minimal' && siblingData?.showContactDetails !== false,
    },
  },
  {
    name: 'phoneLabel',
    type: 'text',
    defaultValue: 'Phone',
    admin: {
      condition: (_, siblingData) => siblingData?.variant !== 'minimal' && siblingData?.showContactDetails !== false,
    },
  },
  {
    name: 'phone',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.variant !== 'minimal' && siblingData?.showContactDetails !== false,
    },
  },
  {
    name: 'addressLabel',
    type: 'text',
    defaultValue: 'Address',
    admin: {
      condition: (_, siblingData) => siblingData?.variant !== 'minimal' && siblingData?.showContactDetails !== false,
    },
  },
  {
    name: 'address',
    type: 'textarea',
    admin: {
      condition: (_, siblingData) => siblingData?.variant !== 'minimal' && siblingData?.showContactDetails !== false,
    },
  },
  {
    name: 'formTitle',
    type: 'text',
    defaultValue: 'Send a message',
    required: true,
  },
  {
    name: 'nameLabel',
    type: 'text',
    defaultValue: 'Name',
    required: true,
  },
  {
    name: 'emailFieldLabel',
    type: 'text',
    defaultValue: 'Email',
    required: true,
  },
  {
    name: 'messageLabel',
    type: 'text',
    defaultValue: 'Message',
    required: true,
  },
  {
    name: 'includeCompanyField',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'companyFieldLabel',
    type: 'text',
    defaultValue: 'Company',
    admin: {
      condition: (_, siblingData) => siblingData?.includeCompanyField === true,
    },
  },
  {
    name: 'includePhoneField',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'phoneFieldLabel',
    type: 'text',
    defaultValue: 'Phone',
    admin: {
      condition: (_, siblingData) => siblingData?.includePhoneField === true,
    },
  },
  {
    name: 'includeSubjectField',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'subjectFieldLabel',
    type: 'text',
    defaultValue: 'Subject',
    admin: {
      condition: (_, siblingData) => siblingData?.includeSubjectField === true,
    },
  },
  {
    name: 'submitLabel',
    type: 'text',
    defaultValue: 'Send Message',
    required: true,
  },
  {
    name: 'consentText',
    type: 'text',
  },
  {
    name: 'successMessage',
    type: 'text',
    defaultValue: 'Thanks! We received your message and will follow up soon.',
    required: true,
  },
  {
    name: 'errorMessage',
    type: 'text',
    defaultValue: 'Sorry, something went wrong. Please try again.',
    required: true,
  },
  {
    name: 'endpoint',
    type: 'text',
    defaultValue: '/api/contact-form',
    required: true,
    admin: {
      description: 'Advanced: endpoint that handles form submissions.',
    },
  },
],
};
