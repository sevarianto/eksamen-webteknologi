import type { CollectionConfig } from 'payload'

export const Genres: CollectionConfig = {
  slug: 'genres',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Navn',
    },
    {
      name: 'nameStyle',
      type: 'group',
      label: 'Navn Styling',
      dbName: 'genre_name_sty',
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
          dbName: 'tc',
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
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
    },
    {
      name: 'descriptionStyle',
      type: 'group',
      label: 'Beskrivelse Styling',
      dbName: 'genre_desc_sty',
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
          dbName: 'tc',
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
  ],
}