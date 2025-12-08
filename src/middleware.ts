import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Intercept media file requests that might have problematic URLs
  if (pathname.startsWith('/api/media/file/')) {
    try {
      // Extract the filename from the URL
      const urlPath = pathname.replace('/api/media/file/', '')
      
      // Try to decode to check if it's malformed
      let decoded: string
      let needsFix = false
      
      try {
        decoded = decodeURIComponent(urlPath)
        // Check if decoded filename contains problematic characters
        if (decoded.includes('%') || decoded.includes(' ')) {
          needsFix = true
        }
      } catch (error) {
        // URL is malformed, try to fix it
        needsFix = true
        try {
          // Try to decode with error handling - sometimes URLs are double-encoded
          decoded = urlPath
          // Try to decode multiple times to handle double encoding
          for (let i = 0; i < 3; i++) {
            try {
              decoded = decodeURIComponent(decoded)
            } catch {
              break
            }
          }
        } catch {
          // If we can't decode, try to extract filename manually
          decoded = urlPath.replace(/%25/g, '%').replace(/%20/g, ' ').replace(/%C3%97/g, '×')
        }
      }
      
      // If URL needs fixing, rewrite it with sanitized filename
      if (needsFix && decoded) {
        const sanitized = sanitizeFilename(decoded)
        const newPath = `/api/media/file/${encodeURIComponent(sanitized)}`
        
        // Rewrite the URL instead of redirecting to avoid changing the request
        const url = request.nextUrl.clone()
        url.pathname = newPath
        return NextResponse.rewrite(url)
      }
    } catch (error) {
      // If anything goes wrong, let the request through
      console.error('Error in middleware:', error)
    }
  }
  
  // Continue with normal request handling
  return NextResponse.next()
}

export const config = {
  matcher: '/api/media/file/:path*',
}

