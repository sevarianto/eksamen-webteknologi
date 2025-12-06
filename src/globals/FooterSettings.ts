import type { GlobalConfig } from 'payload'
import { colorOptions, createColorField } from './shared/colorUtils'

export const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  label: 'Footer',
  admin: {
    description: 'Konfigurer footer og kontaktinformasjon',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'previewButton',
      type: 'ui',
      admin: {
        components: {
          Field: '../components/admin/PreviewButton#default',
        },
      },
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
      defaultValue: 'BookDragons',
      label: 'Firmanavn',
      admin: {
        description: 'Navnet på firmaet som vises i footer',
      },
    },
    {
      name: 'companyNameStyle',
      type: 'group',
      dbName: 'ftr_comp_sty',
      label: 'Firmanavn Styling',
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
          type: 'select',
          dbName: 'tc',
          defaultValue: '#ffffff',
          label: 'Tekstfarge',
          options: colorOptions,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Din bokhandel på Østlandet siden 2024',
      label: 'Beskrivelse',
      admin: {
        description: 'Kort beskrivelse av firmaet som vises i footer',
      },
    },
    {
      name: 'descriptionStyle',
      type: 'group',
      dbName: 'ftr_desc_sty',
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
          name: 'textColor',
          type: 'select',
          dbName: 'tc',
          defaultValue: '#ffffff',
          label: 'Tekstfarge',
          options: colorOptions,
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      defaultValue: 'kontakt@bookdragons.no',
      label: 'E-post',
      admin: {
        description: 'Kontakt e-postadresse',
      },
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '12 34 56 78',
      label: 'Telefon',
      admin: {
        description: 'Kontakt telefonnummer',
      },
    },
    {
      name: 'openingHours',
      type: 'textarea',
      defaultValue: 'Man-Fre: 10:00 - 18:00\nLør: 10:00 - 16:00\nSøn: Stengt',
      label: 'Åpningstider',
      admin: {
        description: 'Åpningstider for butikken (én linje per dag)',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      dbName: 'ftr_bg',
      required: true,
      defaultValue: '#111827',
      label: 'Bakgrunnsfarge',
      options: colorOptions,
      admin: {
        description: 'Velg bakgrunnsfarge for footer',
      },
    },
    {
      name: 'backgroundColorOpacity',
      type: 'number',
      dbName: 'ftr_bg_op',
      defaultValue: 100,
      min: 0,
      max: 100,
      label: 'Bakgrunnsfarge Gjennomsiktighet (%)',
      admin: {
        description: '0 = fullstendig gjennomsiktig, 100 = fullstendig ugjennomsiktig',
      },
    },
    {
      name: 'textColor',
      type: 'select',
      dbName: 'txt_col',
      required: true,
      defaultValue: '#ffffff',
      label: 'Tekstfarge',
      options: colorOptions,
      admin: {
        description: 'Velg tekstfarge for footer',
      },
    },
  ],
}

