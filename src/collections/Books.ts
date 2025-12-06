import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Grunnleggende informasjon',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Tittel',
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              label: 'Slug',
              admin: {
                description: 'URL-vennlig versjon av tittelen (eks: harry-potter-de-vises-stein)',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Beskrivelse',
            },
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'authors',
              required: true,
              label: 'Forfatter',
            },
            {
              name: 'genres',
              type: 'relationship',
              relationTo: 'genres',
              hasMany: true,
              label: 'Sjangere',
            },
            {
              name: 'ageRating',
              type: 'select',
              dbName: 'age_rt',
              hasMany: true,
              options: [
                { label: 'Barn (5-13 år)', value: 'barn' },
                { label: 'Ungdom (13-17 år)', value: 'ungdom' },
                { label: 'Voksen (17+ år)', value: 'voksen' },
              ],
              label: 'Aldersgrupper',
              required: true,
              admin: {
                description: 'Velg én eller flere aldersgrupper som passer for boken',
              },
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              min: 0,
              label: 'Pris (NOK)',
            },
            {
              name: 'isbn',
              type: 'text',
              required: true,
              unique: true,
              label: 'ISBN',
            },
            {
              name: 'publishedYear',
              type: 'number',
              label: 'Utgivelsesår',
              min: 1000,
              max: new Date().getFullYear() + 1,
            },
            {
              name: 'stock',
              type: 'number',
              required: true,
              defaultValue: 0,
              min: 0,
              label: 'Antall på lager',
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Forsidebilde',
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              label: 'Fremhevet på forsiden',
            },
          ],
        },
        {
          label: 'Styling',
          admin: {
            description: ' ',
          },
          fields: [
            {
              name: 'titleStyle',
              type: 'group',
              label: 'Tittel Styling',
              fields: [
                {
                  name: 'fontSize',
                  type: 'select',
                  dbName: 'fs',
                  defaultValue: 'large',
                  options: [
                    { label: 'Liten', value: 'small' },
                    { label: 'Normal', value: 'normal' },
                    { label: 'Stor', value: 'large' },
                    { label: 'Ekstra Stor', value: 'xlarge' },
                    { label: 'XXL', value: 'xxlarge' },
                  ],
                },
                {
                  name: 'fontWeight',
                  type: 'select',
                  dbName: 'fw',
                  defaultValue: 'bold',
                  options: [
                    { label: 'Normal', value: 'normal' },
                    { label: 'Halvfet', value: 'semibold' },
                    { label: 'Fet', value: 'bold' },
                  ],
                },
                {
                  name: 'textColor',
                  type: 'text',
                  defaultValue: '#000000',
                  label: 'Tekstfarge (hex, f.eks. #000000)',
                },
                {
                  name: 'textAlign',
                  type: 'select',
                  dbName: 'ta',
                  defaultValue: 'left',
                  options: [
                    { label: 'Venstre', value: 'left' },
                    { label: 'Senter', value: 'center' },
                    { label: 'Høyre', value: 'right' },
                  ],
                },
              ],
            },
            {
              name: 'descriptionStyle',
              type: 'group',
              label: 'Beskrivelse Styling',
              fields: [
                {
                  name: 'fontSize',
                  type: 'select',
                  dbName: 'fs',
                  defaultValue: 'normal',
                  options: [
                    { label: 'Liten', value: 'small' },
                    { label: 'Normal', value: 'normal' },
                    { label: 'Stor', value: 'large' },
                  ],
                },
                {
                  name: 'fontWeight',
                  type: 'select',
                  dbName: 'fw',
                  defaultValue: 'normal',
                  options: [
                    { label: 'Normal', value: 'normal' },
                    { label: 'Halvfet', value: 'semibold' },
                    { label: 'Fet', value: 'bold' },
                  ],
                },
                {
                  name: 'textColor',
                  type: 'text',
                  defaultValue: '#000000',
                  label: 'Tekstfarge (hex)',
                },
                {
                  name: 'textAlign',
                  type: 'select',
                  dbName: 'ta',
                  defaultValue: 'left',
                  options: [
                    { label: 'Venstre', value: 'left' },
                    { label: 'Senter', value: 'center' },
                    { label: 'Høyre', value: 'right' },
                    { label: 'Justert', value: 'justify' },
                  ],
                },
                {
                  name: 'lineHeight',
                  type: 'select',
                  dbName: 'lh',
                  defaultValue: 'normal',
                  options: [
                    { label: 'Tett', value: 'tight' },
                    { label: 'Normal', value: 'normal' },
                    { label: 'Løs', value: 'loose' },
                  ],
                },
              ],
            },
            {
              name: 'coverImageStyle',
              type: 'group',
              label: 'Forsidebilde Styling',
              fields: [
                {
                  name: 'borderRadius',
                  type: 'select',
                  dbName: 'br',
                  defaultValue: 'medium',
                  options: [
                    { label: 'Ingen', value: 'none' },
                    { label: 'Liten', value: 'small' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Stor', value: 'large' },
                    { label: 'Full', value: 'full' },
                  ],
                },
                {
                  name: 'objectFit',
                  type: 'select',
                  dbName: 'of',
                  defaultValue: 'cover',
                  options: [
                    { label: 'Cover', value: 'cover' },
                    { label: 'Contain', value: 'contain' },
                    { label: 'Fill', value: 'fill' },
                  ],
                  label: 'Bildejustering',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
