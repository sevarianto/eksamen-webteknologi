import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      dbName: 'avatar_id',
      label: 'Profilbilde',
      admin: {
        description: 'Last opp et profilbilde for admin-brukeren',
      },
    },
  ],
}
