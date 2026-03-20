// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { CollectionConfig } from 'payload'
import { hasAdminLevelAccess } from '../access/roles'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  access: {
    read: ({ req: { user } }) => hasAdminLevelAccess(user),
    create: () => true,
    update: ({ req: { user } }) => hasAdminLevelAccess(user),
    delete: ({ req: { user } }) => hasAdminLevelAccess(user),
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['submittedAt', 'name', 'email', 'status', 'variant'],
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.submittedAt) {
          data.submittedAt = new Date().toISOString();
        }
        if (operation === 'create' && !data.status) {
          data.status = 'new';
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'text', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'text', admin: { width: '50%' } },
        { name: 'phone', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        { name: 'variant', type: 'text', admin: { width: '33%' } },
        { name: 'blockId', type: 'text', admin: { width: '33%' } },
        { name: 'consentAccepted', type: 'checkbox', defaultValue: false, admin: { width: '33%' } },
      ],
    },
    {
      name: 'source',
      type: 'group',
      fields: [
        { name: 'pagePath', type: 'text' },
        { name: 'pageUrl', type: 'text' },
        { name: 'referrer', type: 'text' },
        { name: 'userAgent', type: 'textarea' },
      ],
    },
  ],
}
