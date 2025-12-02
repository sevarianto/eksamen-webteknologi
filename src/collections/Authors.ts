import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
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
      label: 'Navn',
    },
    {
      name: 'nameStyle',
      type: 'group',
      label: 'Navn Styling',
      dbName: 'auth_name_sty',
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
      admin: {
        description: 'URL-vennlig versjon (eks: jo-nesbo)',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografi',
    },
    {
      name: 'bioStyle',
      type: 'group',
      label: 'Biografi Styling',
      dbName: 'auth_bio_sty',
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
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'photoStyle',
      type: 'group',
      label: 'Foto Styling',
      dbName: 'auth_photo_sty',
      fields: [
        {
          name: 'borderRadius',
          type: 'select',
          dbName: 'br',
          defaultValue: 'full',
          options: [
            { label: 'Ingen', value: 'none' },
            { label: 'Liten', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Stor', value: 'large' },
            { label: 'Full (rund)', value: 'full' },
          ],
        },
        {
          name: 'opacity',
          type: 'number',
          dbName: 'op',
          defaultValue: 100,
          min: 0,
          max: 100,
          label: 'Gjennomsiktighet (%)',
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
    {
      name: 'birthYear',
      type: 'number',
      label: 'Fødselsår',
      min: 1000,
      max: new Date().getFullYear(),
    },
    {
      name: 'nationality',
      type: 'text',
      label: 'Nasjonalitet',
    },
  ],
}