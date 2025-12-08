import Link from 'next/link'

async function getSiteSettings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/site-settings`,
      { cache: 'no-store' }
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function Header() {
  const settings = await getSiteSettings()
  const header = settings?.header || {}
  const general = settings?.general || {}

  // Use colors directly from admin settings - no fallbacks
  const bgStyle: React.CSSProperties = {}
  const textStyle: React.CSSProperties = {}
  
  if (header.backgroundColor) {
    bgStyle.backgroundColor = header.backgroundColor
  }
  
  if (header.textColor) {
    textStyle.color = header.textColor
  }

  return (
    <header 
      className={`${header.sticky ? 'sticky top-0 z-50' : ''} shadow-md`}
      style={{
        ...bgStyle,
        ...textStyle,
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {general.logo && typeof general.logo === 'object' && general.logo.url ? (
              <img 
                src={general.logo.url} 
                alt={general.siteName || 'Logo'}
                className="h-12 max-w-[200px] w-auto object-contain"
              />
            ) : (
              <span className="text-2xl font-bold">
                {general.siteName || 'BookDragons'}
              </span>
            )}
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className="hover:opacity-80 transition"
              style={textStyle.color ? { color: textStyle.color } : undefined}
            >
              Hjem
            </Link>
            <Link 
              href="/boker" 
              className="hover:opacity-80 transition"
              style={textStyle.color ? { color: textStyle.color } : undefined}
            >
              Bøker
            </Link>
            <Link 
              href="/forfattere" 
              className="hover:opacity-80 transition"
              style={textStyle.color ? { color: textStyle.color } : undefined}
            >
              Forfattere
            </Link>
            
            {/* Cart Icon */}
            {header.showCartIcon && (
              <Link 
                href="/handlekurv" 
                className="hover:opacity-80 transition flex items-center gap-2"
                style={textStyle.color ? { color: textStyle.color } : undefined}
                aria-label="Gå til handlekurv"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="hidden md:inline">Handlekurv</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}