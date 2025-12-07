import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig, { isServer }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    
    // Add alias support for @/ in .js files - CRITICAL for importMap.js
    if (!webpackConfig.resolve.alias) {
      webpackConfig.resolve.alias = {}
    }
    
    // Use absolute path resolution
    const srcPath = path.resolve(__dirname, './src')
    webpackConfig.resolve.alias['@'] = srcPath
    
    // CRITICAL: Ensure @/ works in .js files by adding it to resolveLoader as well
    if (!webpackConfig.resolveLoader) {
      webpackConfig.resolveLoader = {}
    }
    if (!webpackConfig.resolveLoader.alias) {
      webpackConfig.resolveLoader.alias = {}
    }
    webpackConfig.resolveLoader.alias['@'] = srcPath
    
    // CRITICAL: Add src to modules array for resolution - this allows relative paths to work
    const existingModules = webpackConfig.resolve.modules || []
    const modulesArray = Array.isArray(existingModules) ? existingModules : [existingModules]
    
    // Add src directory to modules if not already present - this makes relative paths work
    if (!modulesArray.includes(srcPath)) {
      webpackConfig.resolve.modules = [srcPath, ...modulesArray.filter(m => m !== 'node_modules'), 'node_modules']
    }
    
    // CRITICAL: Ensure symlinks are resolved correctly for relative paths
    webpackConfig.resolve.symlinks = true
    
    // CRITICAL: Add custom plugin to intercept and fix importMap.js imports
    // This ensures relative paths work even if Payload generates them
    const originalNormalModuleFactory = webpackConfig.plugins?.find(
      (p) => p.constructor?.name === 'NormalModuleFactoryPlugin'
    )
    
    // Add a custom plugin to handle importMap.js resolution
    if (!webpackConfig.plugins) {
      webpackConfig.plugins = []
    }
    
    // Add plugin to fix importMap.js imports on the fly
    webpackConfig.plugins.push({
      apply: (compiler) => {
        compiler.hooks.normalModuleFactory.tap('FixImportMapPlugin', (nmf) => {
          nmf.hooks.beforeResolve.tap('FixImportMapPlugin', (data) => {
            // If resolving from importMap.js and using relative path, ensure it resolves correctly
            if (data.contextInfo?.issuer?.includes('importMap.js')) {
              if (data.request?.includes('../../../../components/admin/')) {
                // Convert to @/ alias
                data.request = data.request.replace(
                  '../../../../components/admin/',
                  '@/components/admin/'
                )
              } else if (data.request?.includes('../../../components/admin/')) {
                // Convert to @/ alias
                data.request = data.request.replace(
                  '../../../components/admin/',
                  '@/components/admin/'
                )
              }
            }
          })
        })
      },
    })

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
