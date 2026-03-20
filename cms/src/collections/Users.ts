// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type { CollectionConfig } from 'payload'
import { hasAdminLevelAccess } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create') {
          // If this is the very first user created in the database, make them an owner
          const usersCount = await req.payload.find({
            collection: 'users',
            limit: 1,
          });

          if (usersCount.totalDocs === 0) {
            data.roles = ['owner'];
          }
        }
        return data;
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (hasAdminLevelAccess(user)) return true;
      if (user) return { id: { equals: user.id } };
      return false;
    },
    create: ({ req: { user } }) => hasAdminLevelAccess(user),
    update: ({ req: { user } }) => {
      if (hasAdminLevelAccess(user)) return true;
      if (user) return { id: { equals: user.id } };
      return false;
    },
    delete: ({ req: { user } }) => hasAdminLevelAccess(user),
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: ['owner', 'admin', 'editor'],
      access: {
        create: ({ req: { user } }) => hasAdminLevelAccess(user),
        update: ({ req: { user } }) => hasAdminLevelAccess(user),
      },
      admin: {
        position: 'sidebar',
      }
    },
  ],
}
