import type { GlobalConfig } from 'payload'
import { colorOptions, createColorField } from './shared/colorUtils'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    // GENERAL
    {
      name: 'general',
      type: 'group',
      label: 'Generelle Innstillinger',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
          defaultValue: 'BookDragons',
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Favicon (valgfritt)',
        },
        {
          name: 'pageBackgroundType',
          type: 'select',
          dbName: 'page_bg_type',
          defaultValue: 'solid',
          label: 'Side Bakgrunn Type',
          options: [
            { label: 'Solid Farge', value: 'solid' },
            { label: 'Gradient', value: 'gradient' },
          ],
        },
        ...createColorField('pageBackgroundColor', 'Side Bakgrunnsfarge', '#ffffff', false, 'page_bg'),
        {
          name: 'pageGradientColor1',
          type: 'select',
          dbName: 'page_grad_c1',
          defaultValue: '#ffffff',
          label: 'Gradient Farge 1',
          options: colorOptions,
          admin: {
            condition: (data, siblingData) => siblingData?.pageBackgroundType === 'gradient',
          },
        },
        {
          name: 'pageGradientColor2',
          type: 'select',
          dbName: 'page_grad_c2',
          defaultValue: '#f3f4f6',
          label: 'Gradient Farge 2',
          options: colorOptions,
          admin: {
            condition: (data, siblingData) => siblingData?.pageBackgroundType === 'gradient',
          },
        },
        {
          name: 'pageGradientAngle',
          type: 'number',
          dbName: 'page_grad_ang',
          defaultValue: 135,
          label: 'Gradient Vinkel (grader)',
          admin: {
            condition: (data, siblingData) => siblingData?.pageBackgroundType === 'gradient',
            description: 'Vinkel for gradient (0-360 grader)',
          },
          min: 0,
          max: 360,
        },
      ],
    },

    {
      name: 'previewButton',
      type: 'ui',
      admin: {
        components: {
          Field: '../components/admin/PreviewButton#default',
        },
      },
    },
    // HOME PAGE SECTIONS (ARRAY)
    {
      name: 'homeSections',
      type: 'array',
      label: 'Hjemmeside Seksjoner',
      admin: {
        description: 'Legg til seksjoner som vises på hjemmesiden i rekkefølge',
      },
      fields: [
        {
          name: 'sectionType',
          type: 'select',
          dbName: 'sec_type',
          required: true,
          options: [
            { label: 'Hero Banner', value: 'hero' },
            { label: 'Fremhevede Bøker', value: 'featured' },
            { label: 'Kategorier', value: 'categories' },
            { label: 'Tekstseksjon', value: 'text' },
            { label: 'Bilde Banner', value: 'banner' },
          ],
        },
        {
          name: 'visible',
          type: 'checkbox',
          defaultValue: true,
          label: 'Vis denne seksjonen',
        },

        // HERO SETTINGS
        {
          name: 'hero',
          type: 'group',
          label: 'Hero Innstillinger',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'hero',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Velkommen til BookDragons',
            },
            {
              name: 'titleStyle',
              type: 'group',
              dbName: 'hero_title_sty',
              label: 'Tittel Styling',
              fields: [
                {
                  name: 'fontSize',
                  type: 'select',
                  dbName: 'fs',
                  defaultValue: 'xlarge',
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
                  type: 'select',
                  dbName: 'tc',
                  defaultValue: '#ffffff',
                  label: 'Tekstfarge',
                  options: colorOptions,
                },
                {
                  name: 'textAlign',
                  type: 'select',
                  dbName: 'ta',
                  defaultValue: 'center',
                  options: [
                    { label: 'Venstre', value: 'left' },
                    { label: 'Senter', value: 'center' },
                    { label: 'Høyre', value: 'right' },
                  ],
                },
              ],
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue: 'Din bokhandel på Østlandet med stort utvalg av bøker',
            },
            {
              name: 'subtitleStyle',
              type: 'group',
              dbName: 'hero_sub_sty',
              label: 'Undertittel Styling',
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
                    { label: 'Ekstra Stor', value: 'xlarge' },
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
                  type: 'select',
                  dbName: 'tc',
                  defaultValue: '#ffffff',
                  label: 'Tekstfarge',
                  options: colorOptions,
                },
                {
                  name: 'textAlign',
                  type: 'select',
                  dbName: 'ta',
                  defaultValue: 'center',
                  options: [
                    { label: 'Venstre', value: 'left' },
                    { label: 'Senter', value: 'center' },
                    { label: 'Høyre', value: 'right' },
                  ],
                },
              ],
            },
            {
              name: 'buttonText',
              type: 'text',
              defaultValue: 'Se alle bøker',
            },
            {
              name: 'buttonStyle',
              type: 'group',
              dbName: 'hero_btn_sty',
              label: 'Knapp Styling',
              fields: [
                ...createColorField(
                  'backgroundColor',
                  'Bakgrunnsfarge',
                  '#10b981',
                  false,
                  'hero_btn',
                ),
                {
                  name: 'textColor',
                  type: 'select',
                  dbName: 'tc',
                  defaultValue: '#ffffff',
                  label: 'Tekstfarge',
                  options: colorOptions,
                },
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
                  name: 'padding',
                  type: 'select',
                  dbName: 'pad',
                  defaultValue: 'medium',
                  options: [
                    { label: 'Liten', value: 'small' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Stor', value: 'large' },
                  ],
                },
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
              ],
            },
            {
              name: 'buttonLink',
              type: 'text',
              defaultValue: '/boker',
            },
            {
              name: 'backgroundType',
              type: 'select',
              dbName: 'bg_type',
              required: true,
              defaultValue: 'gradient',
              options: [
                { label: 'Gradient', value: 'gradient' },
                { label: 'Bilde', value: 'image' },
                { label: 'Video', value: 'video' },
              ],
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, siblingData) => siblingData?.backgroundType === 'image',
              },
            },
            {
              name: 'backgroundVideo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data, siblingData) => siblingData?.backgroundType === 'video',
                description: 'Last opp video (MP4 anbefales)',
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
              name: 'height',
              type: 'select',
              dbName: 'h',
              required: true,
              defaultValue: 'normal',
              options: [
                { label: 'Lav (400px)', value: 'short' },
                { label: 'Normal (600px)', value: 'normal' },
                { label: 'Høy (800px)', value: 'tall' },
                { label: 'Full skjerm', value: 'full' },
              ],
            },
            {
              name: 'textAlign',
              type: 'select',
              dbName: 'ta',
              defaultValue: 'center',
              options: [
                { label: 'Venstre', value: 'left' },
                { label: 'Senter', value: 'center' },
                { label: 'Høyre', value: 'right' },
              ],
            },
            {
              name: 'padding',
              type: 'select',
              dbName: 'pad',
              defaultValue: 'medium',
              options: [
                { label: 'Ingen', value: 'none' },
                { label: 'Liten', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Stor', value: 'large' },
              ],
              label: 'Padding',
            },
          ],
        },

        // FEATURED BOOKS SETTINGS
        {
          name: 'featured',
          type: 'group',
          label: 'Fremhevede Bøker Innstillinger',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'featured',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Fremhevede bøker',
            },
            {
              name: 'titleStyle',
              type: 'group',
              dbName: 'feat_title_sty',
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
                  defaultValue: '#000000',
                  label: 'Tekstfarge',
                  options: colorOptions,
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
              name: 'limit',
              type: 'number',
              defaultValue: 3,
              min: 1,
              max: 12,
            },
            ...createColorField('backgroundColor', 'Bakgrunnsfarge', '#ffffff', false, 'feat'),
            {
              name: 'sectionPadding',
              type: 'select',
              dbName: 'sec_pad',
              defaultValue: 'medium',
              options: [
                { label: 'Ingen', value: 'none' },
                { label: 'Liten', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Stor', value: 'large' },
              ],
              label: 'Seksjon Padding',
            },
          ],
        },

        // CATEGORIES SETTINGS
        {
          name: 'categories',
          type: 'group',
          label: 'Kategorier Innstillinger',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'categories',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Utforsk etter kategori',
            },
            {
              name: 'titleStyle',
              type: 'group',
              dbName: 'cat_title_sty',
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
                  defaultValue: '#000000',
                  label: 'Tekstfarge',
                  options: colorOptions,
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
            ...createColorField('backgroundColor', 'Bakgrunnsfarge', '#f3f4f6', false, 'cat'),
            {
              name: 'sectionPadding',
              type: 'select',
              dbName: 'sec_pad',
              defaultValue: 'medium',
              options: [
                { label: 'Ingen', value: 'none' },
                { label: 'Liten', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Stor', value: 'large' },
              ],
              label: 'Seksjon Padding',
            },
          ],
        },

        // TEXT SECTION
        {
          name: 'textSection',
          type: 'group',
          label: 'Tekstseksjon Innstillinger',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'text',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'titleStyle',
              type: 'group',
              dbName: 'txt_title_sty',
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
                  defaultValue: '#000000',
                  label: 'Tekstfarge',
                  options: colorOptions,
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
              name: 'content',
              type: 'textarea',
              required: true,
            },
            {
              name: 'contentStyle',
              type: 'group',
              dbName: 'txt_content_sty',
              label: 'Innhold Styling',
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
                  type: 'select',
                  dbName: 'tc',
                  defaultValue: '#000000',
                  label: 'Tekstfarge',
                  options: colorOptions,
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
            ...createColorField('backgroundColor', 'Bakgrunnsfarge', '#ffffff', false, 'txt'),
            {
              name: 'sectionPadding',
              type: 'select',
              dbName: 'sec_pad',
              defaultValue: 'medium',
              options: [
                { label: 'Ingen', value: 'none' },
                { label: 'Liten', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Stor', value: 'large' },
              ],
              label: 'Seksjon Padding',
            },
          ],
        },

        // BANNER
        {
          name: 'banner',
          type: 'group',
          label: 'Banner Innstillinger',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'banner',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'imageStyle',
              type: 'group',
              dbName: 'ban_img_sty',
              label: 'Bilde Styling',
              fields: [
                {
                  name: 'borderRadius',
                  type: 'select',
                  dbName: 'br',
                  defaultValue: 'none',
                  options: [
                    { label: 'Ingen', value: 'none' },
                    { label: 'Liten', value: 'small' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Stor', value: 'large' },
                    { label: 'Full', value: 'full' },
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
              name: 'height',
              type: 'select',
              dbName: 'h',
              defaultValue: 'medium',
              options: [
                { label: 'Lav (200px)', value: 'short' },
                { label: 'Medium (400px)', value: 'medium' },
                { label: 'Høy (600px)', value: 'tall' },
              ],
            },
            {
              name: 'link',
              type: 'text',
              label: 'Lenke (valgfritt)',
            },
          ],
        },
      ],
    },
  ],
}
