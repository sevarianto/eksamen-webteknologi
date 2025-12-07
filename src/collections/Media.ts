import type { CollectionConfig } from 'payload'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '../..')
const mediaDir = path.join(rootDir, 'media')

// Sanitize filename to prevent URI malformed errors
// Replaces problematic characters that cause issues in URLs
function sanitizeFilename(filename: string): string {
  if (!filename) return filename
  
  // Replace problematic characters that cause URI issues
  // % is especially problematic as it's used for URL encoding
  return filename
    .replace(/%/g, 'percent') // Replace % with 'percent'
    .replace(/,/g, '-') // Replace comma with hyphen
    .replace(/\.(?!\w{2,4}$)/g, '-') // Replace dots except file extension
    .replace(/[<>:"|?*]/g, '-') // Replace other problematic characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
    maxFileSize: 10 * 1024 * 1024, // 10MB
    mimeTypes: ['image/*'],
    adminThumbnail: 'original',
    // Empty imageSizes array means no image processing/resizing
    // This preserves the original file format and quality
    imageSizes: [],
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        // Sanitize filename at the earliest possible point
        // This runs before any other hooks or processing
        if (operation === 'create' && args.req?.file) {
          const file = args.req.file
          if (file.name) {
            file.name = sanitizeFilename(file.name)
          }
          if (file.filename) {
            file.filename = sanitizeFilename(file.filename)
          }
          // Also sanitize data.filename if it exists
          if (args.data?.filename) {
            args.data.filename = sanitizeFilename(args.data.filename)
          }
        }
        return args
      },
    ],
    beforeValidate: [
      async ({ data, req, operation }) => {
        // Sanitize filename early in the process to prevent URI errors
        // This runs before Payload generates URLs
        if (req.file) {
          // For file uploads, sanitize the filename from req.file
          if (req.file.name) {
            req.file.name = sanitizeFilename(req.file.name)
          }
          if (req.file.filename) {
            req.file.filename = sanitizeFilename(req.file.filename)
          }
        }
        if (data?.filename) {
          data.filename = sanitizeFilename(data.filename)
        }
        return data
      },
    ],
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        // When updating existing media without a new file, preserve ALL original file data
        // This is critical to prevent files from "disappearing" when saving metadata changes
        if (operation === 'update' && originalDoc?.filename) {
          // Check if there's no new file being uploaded
          const hasNewFile = req.file || (req.files && req.files.file)
          
          if (!hasNewFile) {
            // Preserve all file-related fields from the original document
            // Modify data in place to ensure Payload doesn't try to reprocess
            data.filename = originalDoc.filename
            data.mimeType = originalDoc.mimeType
            data.filesize = originalDoc.filesize
            data.width = originalDoc.width
            data.height = originalDoc.height
            data.url = originalDoc.url
            data.thumbnailURL = originalDoc.thumbnailURL
            // Also preserve the file reference if it exists
            if (originalDoc.focalX !== undefined) data.focalX = originalDoc.focalX
            if (originalDoc.focalY !== undefined) data.focalY = originalDoc.focalY
          }
        }
        
        // Only sanitize filename for new uploads (create operation with file)
        if (operation === 'create' && req.file && data.filename) {
          data.filename = sanitizeFilename(data.filename)
        }
        
        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        // Only handle new file uploads (create operation)
        // For updates, beforeChange hook preserves the original file data
        if (operation === 'create' && doc.filename) {
          const sanitized = sanitizeFilename(doc.filename)
          // Only update if filename actually needs sanitization
          if (sanitized !== doc.filename) {
            try {
              // Check if file exists with original name and rename it
              const oldPath = path.join(mediaDir, doc.filename)
              const newPath = path.join(mediaDir, sanitized)
              
              try {
                await fs.access(oldPath)
                // File exists, rename it
                await fs.rename(oldPath, newPath)
              } catch (error: any) {
                // File might not exist yet or already renamed - that's okay
                if (error.code !== 'ENOENT') {
                  console.error('Error accessing file:', error)
                }
              }
              
              // Update the document with sanitized filename
              const payload = req.payload
              const updated = await payload.update({
                collection: 'media',
                id: doc.id,
                data: {
                  filename: sanitized,
                },
              })
              
              // Update the doc object that will be returned
              doc.filename = updated.filename
              doc.url = updated.url
              doc.thumbnailURL = updated.thumbnailURL
            } catch (error) {
              console.error('Error in afterChange hook:', error)
            }
          }
        }
        return doc
      },
    ],
    afterRead: [
      async ({ doc, req }) => {
        // Ensure URLs point to files that actually exist on disk
        // This fixes the issue where URLs don't match actual filenames
        // IMPORTANT: Only update URL, never update filename in database to prevent breaking existing files
        if (doc.filename) {
          try {
            // Check which filename actually exists on disk
            const originalPath = path.join(mediaDir, doc.filename)
            const sanitized = sanitizeFilename(doc.filename)
            const sanitizedPath = path.join(mediaDir, sanitized)
            
            let actualFilename = doc.filename
            let fileExists = false
            
            // Check if original filename exists
            try {
              await fs.access(originalPath)
              fileExists = true
              actualFilename = doc.filename
            } catch {
              // Check if sanitized filename exists
              try {
                await fs.access(sanitizedPath)
                fileExists = true
                actualFilename = sanitized
              } catch {
                // File doesn't exist with either name, try to find it
                try {
                  const files = await fs.readdir(mediaDir)
                  const searchName = doc.filename.toLowerCase().replace(/[^a-z0-9]/g, '')
                  for (const file of files) {
                    const fileSearchName = file.toLowerCase().replace(/[^a-z0-9]/g, '')
                    if (fileSearchName === searchName || 
                        fileSearchName.includes(searchName) || 
                        searchName.includes(fileSearchName)) {
                      actualFilename = file
                      fileExists = true
                      break
                    }
                  }
                } catch (error) {
                  // Could not read directory, use original filename
                }
              }
            }
            
            // Generate URL with the filename that actually exists on disk
            const correctUrl = `/api/media/file/${encodeURIComponent(actualFilename)}`
            
            // Only update URL in memory (for display), never update filename in database
            // This prevents breaking existing files when they're saved
            if (doc.url !== correctUrl) {
              doc.url = correctUrl
              if (doc.thumbnailURL) {
                doc.thumbnailURL = correctUrl
              }
            }
            
            // DO NOT update doc.filename - this would break files when saved
            // The URL will point to the correct file on disk, but filename stays as stored in DB
          } catch (error) {
            // If anything goes wrong, keep the original URL
            console.error('Error in afterRead hook:', error)
          }
        }
        return doc
      },
    ],
  },
}
