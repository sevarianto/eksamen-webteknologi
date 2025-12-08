import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const fixHeaderMigration = () => {
  console.log('Fixing header settings migration...')
  try {
    const dbPath = process.env.DATABASE_URI 
      ? process.env.DATABASE_URI.replace('file:', '')
      : path.resolve(dirname, '../..', 'eksamen-webteknologi.db')
    
    const db = new Database(dbPath)
    
    // Check if header_settings table exists
    const tableExists = db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='header_settings'
    `).get()
    
    if (tableExists) {
      // Check if background_type column exists
      const columns = db.prepare(`PRAGMA table_info(header_settings)`).all() as Array<{name: string}>
      const hasBackgroundType = columns.some(col => col.name === 'background_type')
      
      if (!hasBackgroundType) {
        console.log('Adding new columns to header_settings table...')
        
        // Add new columns with default values
        db.exec(`
          ALTER TABLE header_settings 
          ADD COLUMN background_type TEXT DEFAULT 'solid';
        `)
        console.log('✓ Added background_type column')
        
        db.exec(`
          ALTER TABLE header_settings 
          ADD COLUMN gradient_color1 TEXT;
        `)
        console.log('✓ Added gradient_color1 column')
        
        db.exec(`
          ALTER TABLE header_settings 
          ADD COLUMN gradient_color2 TEXT;
        `)
        console.log('✓ Added gradient_color2 column')
        
        db.exec(`
          ALTER TABLE header_settings 
          ADD COLUMN gradient_angle INTEGER DEFAULT 135;
        `)
        console.log('✓ Added gradient_angle column')
      }
      
      // Rename logo_style_shape to logo_settings_shape if it exists
      const hasLogoStyleShape = columns.some(col => col.name === 'logo_style_shape')
      const hasLogoSettingsShape = columns.some(col => col.name === 'logo_settings_shape')
      
      if (hasLogoStyleShape && !hasLogoSettingsShape) {
        console.log('Renaming logo_style_shape to logo_settings_shape...')
        db.exec(`
          ALTER TABLE header_settings 
          RENAME COLUMN logo_style_shape TO logo_settings_shape;
        `)
        console.log('✓ Renamed logo_style_shape to logo_settings_shape')
      }
      
      // Drop logo_style_size if it exists
      const hasLogoStyleSize = columns.some(col => col.name === 'logo_style_size')
      if (hasLogoStyleSize) {
        console.log('Dropping logo_style_size column...')
        // SQLite doesn't support DROP COLUMN directly, so we need to recreate the table
        // But for now, we'll just leave it and let Payload handle it
        console.log('⚠ logo_style_size will be handled by Payload migration')
      }
    } else {
      console.log('⚠ header_settings table does not exist yet - this is OK')
    }
    
    db.close()
    console.log('✓ Done!')
  } catch (error: any) {
    console.error('Error fixing header migration:', error.message)
    process.exit(1)
  }
}

fixHeaderMigration()

