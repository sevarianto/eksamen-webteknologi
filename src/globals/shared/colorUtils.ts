// Felles farge-options med beskrivelser - utvidet liste
export const colorOptions = [
  // Nøytrale farger
  { label: 'Hvit', value: '#ffffff' },
  { label: 'Svart', value: '#000000' },
  { label: 'Grå (veldig lys)', value: '#f9fafb' },
  { label: 'Grå (lys)', value: '#f3f4f6' },
  { label: 'Grå (medium)', value: '#e5e7eb' },
  { label: 'Grå (mørk)', value: '#6b7280' },
  { label: 'Grå (veldig mørk)', value: '#374151' },
  { label: 'Grå (nesten svart)', value: '#1f2937' },
  
  // Røde farger
  { label: 'Rød (lys)', value: '#fee2e2' },
  { label: 'Rød', value: '#ef4444' },
  { label: 'Rød (mørk)', value: '#dc2626' },
  { label: 'Rød (veldig mørk)', value: '#b91c1c' },
  { label: 'Karminrød', value: '#be123c' },
  { label: 'Burgunder', value: '#991b1b' },
  
  // Blå farger
  { label: 'Blå (veldig lys)', value: '#eff6ff' },
  { label: 'Blå (lys)', value: '#dbeafe' },
  { label: 'Blå', value: '#3b82f6' },
  { label: 'Blå (mørk)', value: '#2563eb' },
  { label: 'Blå (veldig mørk)', value: '#1e40af' },
  { label: 'Kongeblå', value: '#1e3a8a' },
  { label: 'Marineblå', value: '#1e293b' },
  
  // Grønne farger
  { label: 'Grønn (veldig lys)', value: '#f0fdf4' },
  { label: 'Grønn (lys)', value: '#d1fae5' },
  { label: 'Grønn', value: '#10b981' },
  { label: 'Grønn (mørk)', value: '#059669' },
  { label: 'Grønn (veldig mørk)', value: '#047857' },
  { label: 'Smaragdgrønn', value: '#065f46' },
  
  // Gule farger
  { label: 'Gul (veldig lys)', value: '#fefce8' },
  { label: 'Gul (lys)', value: '#fef3c7' },
  { label: 'Gul', value: '#f59e0b' },
  { label: 'Gul (mørk)', value: '#d97706' },
  { label: 'Gull', value: '#d4af37' },
  { label: 'Gull (mørk)', value: '#b8860b' },
  { label: 'Amber', value: '#f97316' },
  
  // Lilla farger
  { label: 'Lilla (veldig lys)', value: '#faf5ff' },
  { label: 'Lilla (lys)', value: '#ede9fe' },
  { label: 'Lilla', value: '#8b5cf6' },
  { label: 'Lilla (mørk)', value: '#7c3aed' },
  { label: 'Lilla (veldig mørk)', value: '#6d28d9' },
  { label: 'Fiolett', value: '#5b21b6' },
  
  // Rosa farger
  { label: 'Rosa (veldig lys)', value: '#fdf2f8' },
  { label: 'Rosa (lys)', value: '#fce7f3' },
  { label: 'Rosa', value: '#ec4899' },
  { label: 'Rosa (mørk)', value: '#db2777' },
  { label: 'Rosa (veldig mørk)', value: '#be185d' },
  { label: 'Fuchsia', value: '#d946ef' },
  { label: 'Magenta', value: '#c026d3' },
  
  // Turkis/cyan farger
  { label: 'Turkis (veldig lys)', value: '#ecfeff' },
  { label: 'Turkis (lys)', value: '#cffafe' },
  { label: 'Turkis', value: '#06b6d4' },
  { label: 'Turkis (mørk)', value: '#0891b2' },
  { label: 'Cyan', value: '#0e7490' },
  
  // Oransje farger
  { label: 'Oransje (veldig lys)', value: '#fff7ed' },
  { label: 'Oransje (lys)', value: '#ffedd5' },
  { label: 'Oransje', value: '#f97316' },
  { label: 'Oransje (mørk)', value: '#ea580c' },
  { label: 'Oransje (veldig mørk)', value: '#c2410c' },
  
  // Sølv og metalliske farger
  { label: 'Sølv (lys)', value: '#e8e8e8' },
  { label: 'Sølv', value: '#c0c0c0' },
  { label: 'Sølv (mørk)', value: '#a8a8a8' },
  { label: 'Kobber', value: '#b87333' },
  { label: 'Bronse', value: '#cd7f32' },
  
  // Spesielle farger
  { label: 'Korall', value: '#ff7f50' },
  { label: 'Lakserosa', value: '#fa8072' },
  { label: 'Peach', value: '#ffdab9' },
  { label: 'Lavendel', value: '#e6e6fa' },
  { label: 'Mint', value: '#98ff98' },
  { label: 'Oliven', value: '#808000' },
  { label: 'Teal', value: '#008080' },
  { label: 'Indigo', value: '#4b0082' },
]

// Hjelpefunksjon for å lage fargefelt med opacity
export const createColorField = (name: string, label: string, defaultValue: string = '#ffffff', required: boolean = false, dbNamePrefix: string = '') => {
  const bgDbName = dbNamePrefix ? `${dbNamePrefix}_bg` : 'bg_col'
  const opacityDbName = dbNamePrefix ? `${dbNamePrefix}_bg_op` : 'bg_op'
  
  return [
    {
      name: name,
      type: 'select',
      required,
      defaultValue,
      label,
      options: colorOptions,
      dbName: bgDbName,
      admin: {
        description: 'Velg farge fra listen',
      },
    },
    {
      name: `${name}Opacity`,
      type: 'number',
      dbName: opacityDbName,
      defaultValue: 100,
      min: 0,
      max: 100,
      label: `${label} Gjennomsiktighet (%)`,
      admin: {
        description: '0 = fullstendig gjennomsiktig, 100 = fullstendig ugjennomsiktig',
      },
    },
  ]
}

