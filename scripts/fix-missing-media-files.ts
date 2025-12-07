import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs/promises'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Sanitize filename function (same as in Media.ts)
function sanitizeFilename(filename: string): string {
  if (!filename) return filename
  
  return filename
    .replace(/%/g, 'percent')
    .replace(/,/g, '-')
    .replace(/\.(?!\w{2,4}$)/g, '-')
    .replace(/[<>:"|?*]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const fixMissingMediaFiles = async () => {
  console.log('Fixing missing media files...')
  
  try {
    const payload = await getPayload({ config })
    const mediaDir = path.resolve(dirname, '..', 'media')
    
    // Get all media documents
    const result = await payload.find({
      collection: 'media',
      limit: 1000,
    })
    
    const docs = result.docs || []
    console.log(`Found ${docs.length} media documents`)
    
    let fixed = 0
    let notFound = 0
    
    for (const doc of docs) {
      if (!doc.filename) continue
      
      const sanitized = sanitizeFilename(doc.filename)
      const filePath = path.join(mediaDir, doc.filename)
      const sanitizedPath = path.join(mediaDir, sanitized)
      
      // Check if original file exists
      let fileExists = false
      try {
        await fs.access(filePath)
        fileExists = true
      } catch {
        // File doesn't exist at original path
      }
      
      // Check if sanitized file exists
      let sanitizedExists = false
      try {
        await fs.access(sanitizedPath)
        sanitizedExists = true
      } catch {
        // File doesn't exist at sanitized path
      }
      
      // Try to find file with similar name (case-insensitive, with spaces)
      let foundFile: string | null = null
      if (!fileExists && !sanitizedExists) {
        try {
          const files = await fs.readdir(mediaDir)
          // Try to find file by matching name (ignoring case and some special chars)
          const searchName = doc.filename.toLowerCase().replace(/[^a-z0-9]/g, '')
          for (const file of files) {
            const fileSearchName = file.toLowerCase().replace(/[^a-z0-9]/g, '')
            if (fileSearchName.includes(searchName) || searchName.includes(fileSearchName)) {
              foundFile = file
              break
            }
          }
        } catch (error) {
          console.error(`Error reading media directory:`, error)
        }
      }
      
      if (fileExists) {
        // File exists, but might need URL update
        if (sanitized !== doc.filename) {
          const newUrl = `/api/media/file/${encodeURIComponent(sanitized)}`
          await payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              url: newUrl,
              thumbnailURL: newUrl,
            },
          })
          fixed++
          console.log(`✓ Updated URL for: ${doc.filename}`)
        }
      } else if (sanitizedExists) {
        // Sanitized file exists, update database
        const newUrl = `/api/media/file/${encodeURIComponent(sanitized)}`
        await payload.update({
          collection: 'media',
          id: doc.id,
          data: {
            filename: sanitized,
            url: newUrl,
            thumbnailURL: newUrl,
          },
        })
        fixed++
        console.log(`✓ Updated filename: ${doc.filename} → ${sanitized}`)
      } else if (foundFile) {
        // Found similar file, update database
        const sanitizedFound = sanitizeFilename(foundFile)
        const newUrl = `/api/media/file/${encodeURIComponent(sanitizedFound)}`
        await payload.update({
          collection: 'media',
          id: doc.id,
          data: {
            filename: sanitizedFound,
            url: newUrl,
            thumbnailURL: newUrl,
          },
        })
        fixed++
        console.log(`✓ Matched and updated: ${doc.filename} → ${sanitizedFound}`)
      } else {
        notFound++
        console.log(`⚠ File not found: ${doc.filename} (ID: ${doc.id})`)
      }
    }
    
    console.log(`\n✓ Fixed ${fixed} files`)
    if (notFound > 0) {
      console.log(`⚠ ${notFound} files not found on disk`)
    }
    console.log('✓ Done!')
    
    process.exit(0)
  } catch (error: any) {
    console.error('Error fixing media files:', error.message)
    process.exit(1)
  }
}

fixMissingMediaFiles()

