import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
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
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo (valgfritt)',
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Favicon (valgfritt)',
        },
      ],
    },

    // HEADER
    {
      name: 'header',
      type: 'group',
      label: 'Header / Navigasjon',
      fields: [
        {
          name: 'backgroundColor',
          type: 'select',
          dbName: 'bg_col',
          required: true,
          defaultValue: 'emerald',
          options: [
            { label: 'Emerald (Grønn)', value: 'emerald' },
            { label: 'Blue (Blå)', value: 'blue' },
            { label: 'Purple (Lilla)', value: 'purple' },
            { label: 'Dark (Mørk)', value: 'dark' },
            { label: 'White (Hvit)', value: 'white' },
          ],
        },
        {
          name: 'textColor',
          type: 'select',
          dbName: 'txt_col',
          required: true,
          defaultValue: 'white',
          options: [
            { label: 'Hvit', value: 'white' },
            { label: 'Svart', value: 'black' },
            { label: 'Grå', value: 'gray' },
          ],
        },
        {
          name: 'sticky',
          type: 'checkbox',
          defaultValue: true,
          label: 'Sticky header (følger med når du scroller)',
        },
        {
          name: 'showCartIcon',
          type: 'checkbox',
          defaultValue: true,
          label: 'Vis handlekurv-ikon',
        },
      ],
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
          label: 'Tittel Styling',
          dbName: 'title_sty',
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
              type: 'text',
              dbName: 'tc',
              defaultValue: '#ffffff',
              label: 'Tekstfarge (hex, f.eks. #ffffff)',
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
          label: 'Undertittel Styling',
          dbName: 'sub_sty',
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
              type: 'text',
              dbName: 'tc',
              defaultValue: '#ffffff',
              label: 'Tekstfarge (hex)',
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
          label: 'Knapp Styling',
          dbName: 'btn_sty',
          fields: [
            {
              name: 'backgroundColor',
              type: 'text',
              defaultValue: '#10b981',
              label: 'Bakgrunnsfarge (hex)',
            },
            {
              name: 'textColor',
              type: 'text',
              defaultValue: '#ffffff',
              label: 'Tekstfarge (hex)',
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
              name: 'gradientStart',
              type: 'select',
              dbName: 'grad_start',
              defaultValue: 'emerald',
              options: [
                { label: 'Emerald', value: 'emerald' },
                { label: 'Blue', value: 'blue' },
                { label: 'Purple', value: 'purple' },
                { label: 'Rose', value: 'rose' },
                { label: 'Amber', value: 'amber' },
              ],
              admin: {
                condition: (data, siblingData) => siblingData?.backgroundType === 'gradient',
              },
            },
            {
              name: 'gradientEnd',
              type: 'select',
              dbName: 'grad_end',
              defaultValue: 'teal',
              options: [
                { label: 'Emerald', value: 'emerald' },
                { label: 'Blue', value: 'blue' },
                { label: 'Purple', value: 'purple' },
                { label: 'Teal', value: 'teal' },
              ],
              admin: {
                condition: (data, siblingData) => siblingData?.backgroundType === 'gradient',
              },
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
              label: 'Tittel Styling',
              dbName: 'feat_title_sty',
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
              name: 'limit',
              type: 'number',
              defaultValue: 3,
              min: 1,
              max: 12,
            },
            {
              name: 'backgroundColor',
              type: 'select',
              defaultValue: 'white',
              options: [
                { label: 'Hvit', value: 'white' },
                { label: 'Grå', value: 'gray' },
                { label: 'Emerald', value: 'emerald' },
              ],
            },
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
              label: 'Tittel Styling',
              dbName: 'cat_title_sty',
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
              name: 'backgroundColor',
              type: 'select',
              dbName: 'bg_col',
              defaultValue: 'gray',
              options: [
                { label: 'Hvit', value: 'white' },
                { label: 'Grå', value: 'gray' },
                { label: 'Emerald', value: 'emerald' },
              ],
            },
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
              label: 'Tittel Styling',
              dbName: 'txt_title_sty',
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
              name: 'content',
              type: 'textarea',
              required: true,
            },
            {
              name: 'contentStyle',
              type: 'group',
              label: 'Innhold Styling',
              dbName: 'txt_content_sty',
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
              name: 'backgroundColor',
              type: 'select',
              dbName: 'bg_col',
              defaultValue: 'white',
              options: [
                { label: 'Hvit', value: 'white' },
                { label: 'Grå', value: 'gray' },
                { label: 'Emerald', value: 'emerald' },
              ],
            },
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
              label: 'Bilde Styling',
              dbName: 'banner_img_sty',
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

    // FOOTER
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        {
          name: 'companyName',
          type: 'text',
          required: true,
          defaultValue: 'BookDragons',
        },
        {
          name: 'companyNameStyle',
          type: 'group',
          label: 'Firmanavn Styling',
          dbName: 'footer_comp_sty',
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
              defaultValue: '#ffffff',
              label: 'Tekstfarge (hex)',
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Din bokhandel på Østlandet siden 2024',
        },
        {
          name: 'descriptionStyle',
          type: 'group',
          label: 'Beskrivelse Styling',
          dbName: 'footer_desc_sty',
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
              type: 'text',
              dbName: 'tc',
              defaultValue: '#ffffff',
              label: 'Tekstfarge (hex)',
            },
          ],
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'kontakt@bookdragons.no',
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '12 34 56 78',
        },
        {
          name: 'openingHours',
          type: 'textarea',
          defaultValue: 'Man-Fre: 10:00 - 18:00\nLør: 10:00 - 16:00\nSøn: Stengt',
        },
        {
          name: 'backgroundColor',
          type: 'select',
          dbName: 'bg_col',
          defaultValue: 'dark',
          options: [
            { label: 'Mørk', value: 'dark' },
            { label: 'Grå', value: 'gray' },
            { label: 'Emerald', value: 'emerald' },
          ],
        },
      ],
    },
  ],
}