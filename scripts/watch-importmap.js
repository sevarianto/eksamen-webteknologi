#!/usr/bin/env node
/**
 * Watch script to automatically fix importMap.js when Payload regenerates it
 * Run this in a separate terminal: node scripts/watch-importmap.js
 */

import { watchFile } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')
const importMapPath = resolve(projectRoot, 'src/app/(payload)/admin/importMap.js')

function fixImportMap() {
  try {
    const { readFileSync, writeFileSync } = await import('fs')
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
    }
  } catch (error) {
    console.error('Error fixing importMap.js:', error.message)
  }
}

console.log('Watching importMap.js for changes...')
watchFile(importMapPath, { interval: 1000 }, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log('importMap.js changed, fixing...')
    fixImportMap()
  }
})

