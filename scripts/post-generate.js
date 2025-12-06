#!/usr/bin/env node
/**
 * Post-generate hook to fix importMap.js after Payload generates it
 * This runs automatically after payload generate commands
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')
const importMapPath = resolve(projectRoot, 'src/app/(payload)/admin/importMap.js')

if (existsSync(importMapPath)) {
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
    }
  } catch (error) {
    console.error('Error fixing importMap.js:', error.message)
  }
}

