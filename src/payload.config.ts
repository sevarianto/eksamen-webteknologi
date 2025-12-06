import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import Database from 'better-sqlite3'

import { Users } from './collections/Users'
import { Books } from './collections/Books'
import { Authors } from './collections/Authors'
import { Genres } from './collections/Genres'
import { Orders } from './collections/Orders'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'
import { HeaderSettings } from './globals/HeaderSettings'
import { FooterSettings } from './globals/FooterSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Fix database index issues automatically on startup
const fixDatabaseIndexes = () => {
  try {
    const dbPath = process.env.DATABASE_URI
      ? process.env.DATABASE_URI.replace('file:', '')
      : path.resolve(dirname, '../..', 'eksamen-webteknologi.db')

    const db = new Database(dbPath)

    // Drop problematic indexes if they exist
    // Avatar indexes
    db.exec('DROP INDEX IF EXISTS users_avatar_idx;')
    db.exec('DROP INDEX IF EXISTS idx_users_avatar_id;')

    // Home sections order index
    db.exec('DROP INDEX IF EXISTS site_settings_home_sections_order_idx;')
    db.exec('DROP INDEX IF EXISTS idx_site_settings_home_sections_order;')

    db.close()
  } catch {
    // Silently fail - database might not exist yet or might be using a different adapter
    console.log('Note: Could not fix database indexes (this is OK if database does not exist yet)')
  }
}

// Fix index issues before Payload initializes
fixDatabaseIndexes()

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Books, Authors, Genres, Orders, Media],
  globals: [SiteSettings, HeaderSettings, FooterSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./eksamen-webteknologi.db',
    },
  }),
  sharp,
})
