import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Ordrenummer',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
      label: 'Kundenavn',
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
      label: 'E-post',
    },
    {
      name: 'customerPhone',
      type: 'text',
      label: 'Telefon',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Varer',
      fields: [
        {
          name: 'book',
          type: 'relationship',
          relationTo: 'books',
          required: true,
          label: 'Bok',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          label: 'Antall',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Pris per stk',
        },
      ],
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
      label: 'Totalt beløp',
    },
    {
      name: 'status',
      type: 'select',
      dbName: 'stat',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Bekreftet', value: 'confirmed' },
        { label: 'Sendt', value: 'shipped' },
        { label: 'Levert', value: 'delivered' },
      ],
      defaultValue: 'pending',
      label: 'Status',
    },
  ],
}