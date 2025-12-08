/**
 * Script to fix avatar index issue in users table
 * This script drops the existing index if it exists
 */

import 'dotenv/config'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const dbPath = path.join(rootDir, 'eksamen-webteknologi.db')

try {
  console.log('Fixing avatar index issue...')
  
  const db = new Database(dbPath)
  
  // Drop the index if it exists
  try {
    db.exec('DROP INDEX IF EXISTS users_avatar_idx;')
    console.log('✓ Dropped users_avatar_idx index if it existed')
  } catch (error: any) {
    console.log('⚠️  Could not drop index (might not exist):', error.message)
  }
  
  // Also try to drop any other avatar-related indexes
  try {
    db.exec('DROP INDEX IF EXISTS idx_users_avatar_id;')
    console.log('✓ Dropped idx_users_avatar_id index if it existed')
  } catch (error: any) {
    // Ignore if it doesn't exist
  }
  
  db.close()
  console.log('✓ Done!')
  process.exit(0)
} catch (error) {
  console.error('✗ Error:', error)
  process.exit(1)
}

