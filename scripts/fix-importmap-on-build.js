#!/usr/bin/env node
/**
 * Script that runs during Next.js build/dev to fix importMap.js
 * This ensures the file is always fixed even if Payload regenerates it
 */

import { readFileSync, writeFileSync, existsSync, watchFile } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')
const importMapPath = resolve(projectRoot, 'src/app/(payload)/admin/importMap.js')

function fixImportMap() {
  if (!existsSync(importMapPath)) {
    return
  }

  try {
    let content = readFileSync(importMapPath, 'utf-8')
    
    // Check if it needs fixing
    if (content.includes('../../../../components/admin/') || content.includes('../../../components/admin/')) {
      // Replace relative paths with @/ alias
      content = content.replace(
        /from ['"]\.\.\/\.\.\/\.\.\/\.\.\/components\/admin\/([^'"]+)['"]/g,
        "from '@/components/admin/$1'"
      )
      content = content.replace(
        /from ['"]\.\.\/\.\.\/\.\.\/components\/admin\/([^'"]+)['"]/g,
        "from '@/components/admin/$1'"
      )
      
      writeFileSync(importMapPath, content, 'utf-8')
      console.log('Auto-fixed importMap.js to use @/ alias')
      return true
    }
    return false
  } catch (error) {
    console.error('Error fixing importMap.js:', error.message)
    return false
  }
}

// Fix immediately
fixImportMap()

// Watch for changes if in dev mode
if (process.env.NODE_ENV !== 'production') {
  console.log('Watching importMap.js for changes...')
  watchFile(importMapPath, { interval: 1000 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      fixImportMap()
    }
  })
}

