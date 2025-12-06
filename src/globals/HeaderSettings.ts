import type { GlobalConfig } from 'payload'
import { colorOptions } from './shared/colorUtils'

export const HeaderSettings: GlobalConfig = {
  slug: 'header-settings',
  label: 'Header / Navigasjon',
  admin: {
    description: 'Konfigurer header og navigasjonsbar',
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
      name: 'backgroundType',
      type: 'select',
      required: true,
      defaultValue: 'solid',
      label: 'Bakgrunnstype',
      options: [
        { label: 'Solid farge', value: 'solid' },
        { label: 'Gradient', value: 'gradient' },
      ],
      admin: {
        description: 'Velg om header skal ha solid farge eller gradient',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      dbName: 'hdr_bg',
      required: true,
      defaultValue: '#6b7280',
      label: 'Bakgrunnsfarge',
      options: colorOptions,
      admin: {
        description: 'Velg bakgrunnsfarge for header',
        condition: (data, siblingData) => siblingData?.backgroundType === 'solid',
      },
    },
    {
      name: 'backgroundColorOpacity',
      type: 'number',
      defaultValue: 100,
      min: 0,
      max: 100,
      label: 'Bakgrunnsfarge Gjennomsiktighet (%)',
      admin: {
        description: '0 = fullstendig gjennomsiktig, 100 = fullstendig ugjennomsiktig',
        condition: (data, siblingData) => siblingData?.backgroundType === 'solid',
      },
    },
    {
      name: 'gradientColor1',
      type: 'select',
      dbName: 'grad_c1',
      defaultValue: '#6b7280',
      label: 'Gradient Farge 1',
      options: colorOptions,
      admin: {
        description: 'Velg første farge i gradienten',
        condition: (data, siblingData) => siblingData?.backgroundType === 'gradient',
      },
    },
    {
      name: 'gradientColor2',
      type: 'select',
      dbName: 'grad_c2',
      defaultValue: '#374151',
      label: 'Gradient Farge 2',
      options: colorOptions,
      admin: {
        description: 'Velg andre farge i gradienten',
        condition: (data, siblingData) => siblingData?.backgroundType === 'gradient',
      },
    },
    {
      name: 'gradientAngle',
      type: 'number',
      defaultValue: 135,
      label: 'Gradient Vinkel',
      admin: {
        description: 'Vinkel for gradient (0-360 grader)',
        condition: (data, siblingData) => siblingData?.backgroundType === 'gradient',
      },
      min: 0,
      max: 360,
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
        description: 'Velg tekstfarge fra listen',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Last opp logo for header (kun logo)',
      },
    },
    {
      name: 'logoSettings',
      type: 'group',
      label: 'Logo Innstillinger',
      fields: [
        {
          name: 'shape',
          type: 'select',
          defaultValue: 'rectangle',
          label: 'Form',
          options: [
            { label: 'Rektangel', value: 'rectangle' },
            { label: 'Avrundet', value: 'rounded' },
            { label: 'Sirkel', value: 'circle' },
          ],
          admin: {
            description: 'Velg form for logoen',
          },
        },
      ],
    },
    {
      name: 'sticky',
      type: 'checkbox',
      defaultValue: true,
      label: 'Sticky header (følger med når du scroller)',
      admin: {
        description: 'Hvis aktivert, vil header følge med når du scroller ned på siden',
      },
    },
    {
      name: 'showCartIcon',
      type: 'checkbox',
      defaultValue: true,
      label: 'Vis handlekurv-ikon',
      admin: {
        description: 'Hvis aktivert, vises handlekurv-ikonet i header',
      },
    },
  ],
}
