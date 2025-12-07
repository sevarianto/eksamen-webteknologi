/**
 * Script to fix media filenames with problematic characters (like %)
 * This script renames files in the database and on disk to prevent URI malformed errors
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const mediaDir = path.join(rootDir, 'media')

// Sanitize filename to prevent URI malformed errors
function sanitizeFilename(filename: string): string {
  if (!filename) return filename
  
  return filename
    .replace(/%/g, 'percent') // Replace % with 'percent'
    .replace(/[<>:"|?*]/g, '-') // Replace other problematic characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

async function fixMediaFilenames() {
  try {
    console.log('Starting media filename fix...')
    
    const payload = await getPayload({ config })
    
    // Get all media documents
    const result = await payload.find({
      collection: 'media',
      limit: 1000,
      depth: 0,
    })
    
    console.log(`Found ${result.docs.length} media files to check`)
    
    let fixedCount = 0
    let errorCount = 0
    
    for (const doc of result.docs) {
      if (!doc.filename) continue
      
      const originalFilename = doc.filename
      const sanitized = sanitizeFilename(originalFilename)
      
      // Check if URL needs fixing (even if filename doesn't)
      // URL might be malformed even if filename looks OK
      let needsUrlFix = false
      if (doc.url) {
        try {
          // Try to decode the URL path to see if it's malformed
          const urlPath = doc.url.replace('/api/media/file/', '')
          decodeURIComponent(urlPath)
          // If decoding succeeds, check if it contains problematic characters
          if (urlPath.includes('%') && !urlPath.match(/^[a-zA-Z0-9\-_\.%]+$/)) {
            needsUrlFix = true
          }
        } catch (error) {
          // URL is malformed, needs fixing
          needsUrlFix = true
        }
      }
      
      // Always fix URL if it contains problematic patterns
      if (doc.url && (doc.url.includes('%25') || doc.url.includes('%20') || doc.url.includes(originalFilename) && (originalFilename.includes('%') || originalFilename.includes(' ')))) {
        needsUrlFix = true
      }
      
      // Skip if filename doesn't need fixing AND URL is fine
      if (originalFilename === sanitized && !needsUrlFix) {
        continue
      }
      
      try {
        const oldPath = path.join(mediaDir, originalFilename)
        const newPath = path.join(mediaDir, sanitized)
        
        // Check if old file exists
        try {
          await fs.access(oldPath)
        } catch {
          console.log(`⚠️  File not found on disk: ${originalFilename}`)
          // Still update the database even if file doesn't exist
        }
        
        // Rename file on disk if it exists
        try {
          await fs.rename(oldPath, newPath)
          console.log(`✓ Renamed file: ${originalFilename} → ${sanitized}`)
        } catch (error: any) {
          if (error.code === 'ENOENT') {
            console.log(`⚠️  File not found on disk (skipping rename): ${originalFilename}`)
          } else {
            throw error
          }
        }
        
        // Update database with new filename (if changed)
        let finalFilename = originalFilename
        if (originalFilename !== sanitized) {
          const updated = await payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              filename: sanitized,
            },
          })
          finalFilename = sanitized
        }
        
        // Always regenerate URL with sanitized filename to prevent URI errors
        // Payload's auto-generated URLs can contain problematic characters
        const newUrl = `/api/media/file/${encodeURIComponent(finalFilename)}`
        await payload.update({
          collection: 'media',
          id: doc.id,
          data: {
            url: newUrl,
            thumbnailURL: newUrl,
          },
        })
        
        if (originalFilename !== sanitized) {
          console.log(`✓ Updated database entry and URL for: ${originalFilename} → ${sanitized}`)
        } else {
          console.log(`✓ Fixed URL for: ${originalFilename}`)
        }
        console.log(`  New URL: ${newUrl}`)
        fixedCount++
      } catch (error: any) {
        console.error(`✗ Error fixing ${originalFilename}:`, error.message)
        errorCount++
      }
    }
    
    console.log('\n=== Summary ===')
    console.log(`Total files checked: ${result.docs.length}`)
    console.log(`Files fixed: ${fixedCount}`)
    console.log(`Errors: ${errorCount}`)
    console.log('\nDone!')
    
    process.exit(0)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

fixMediaFilenames()

