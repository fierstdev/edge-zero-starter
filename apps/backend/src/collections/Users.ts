import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true,
  },
  fields: [
    // Store the GitHub installation ID so we can act on behalf of the user
    {
      name: 'githubInstallationId',
      type: 'number',
    },
  ],
}
