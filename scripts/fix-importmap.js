#!/usr/bin/env node
/**
 * Script to fix importMap.js after Payload generates it
 * This ensures that @/ alias is used instead of relative paths
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')
const importMapPath = resolve(projectRoot, 'src/app/(payload)/admin/importMap.js')

try {
  let content = readFileSync(importMapPath, 'utf-8')
  
  // Replace relative paths with @/ alias
  content = content.replace(
    /from ['"]\.\.\/\.\.\/\.\.\/\.\.\/components\/admin\/([^'"]+)['"]/g,
    "from '@/components/admin/$1'"
  )
  
  // Also handle ../../../ paths (3 levels)
  content = content.replace(
    /from ['"]\.\.\/\.\.\/\.\.\/components\/admin\/([^'"]+)['"]/g,
    "from '@/components/admin/$1'"
  )
  
  writeFileSync(importMapPath, content, 'utf-8')
  console.log('Fixed importMap.js to use @/ alias')
} catch (error) {
  console.error('Error fixing importMap.js:', error.message)
  process.exit(1)
}

