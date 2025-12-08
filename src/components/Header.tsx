import Link from 'next/link'

async function getHeaderSettings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/header-settings`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

async function getSiteSettings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/site-settings`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function Header() {
  const headerSettings = await getHeaderSettings()
  const siteSettings = await getSiteSettings()
  const header = headerSettings || {}
  const general = siteSettings?.general || {}

  // Use colors directly from admin settings with opacity support
  const bgStyle: React.CSSProperties = {}
  const textStyle: React.CSSProperties = {}

  const backgroundType = header.backgroundType || 'solid'

  if (backgroundType === 'gradient') {
    // Gradient background
    const gradientColor1 = header.gradientColor1 || '#6b7280'
    const gradientColor2 = header.gradientColor2 || '#374151'
    const gradientAngle = header.gradientAngle || 135
    bgStyle.background = `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`
  } else {
    // Solid color background
    if (header.backgroundColor) {
      const opacity =
        header.backgroundColorOpacity !== undefined && header.backgroundColorOpacity !== null
          ? header.backgroundColorOpacity / 100
          : 1

      // Convert hex to rgba if opacity is less than 100
      if (opacity < 1) {
        const hex = header.backgroundColor.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        bgStyle.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`
      } else {
        bgStyle.backgroundColor = header.backgroundColor
      }
    }
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
            {header.logo && typeof header.logo === 'object' && header.logo.url ? (
              (() => {
                const logoSettings = header.logoSettings || {}
                const shape = logoSettings.shape || 'rectangle'
                
                // Size - fixed to fit header height
                const sizeClass = 'h-14'
                
                // Shape classes
                const shapeClasses = {
                  rectangle: '', // No rounding
                  rounded: 'rounded-lg', // Rounded rectangle
                  circle: 'rounded-full aspect-square', // Actual circle
                }
                
                const shapeClass = shapeClasses[shape as keyof typeof shapeClasses] || shapeClasses.rectangle
                
                return (
                  <img
                    src={header.logo.url}
                    alt={general.siteName || 'Logo'}
                    className={`${sizeClass} ${shape === 'circle' ? 'w-14' : 'w-auto'} ${shapeClass} object-cover`}
                  />
                )
              })()
            ) : general.logo && typeof general.logo === 'object' && general.logo.url ? (
              <img
                src={general.logo.url}
                alt={general.siteName || 'Logo'}
                className="h-12 max-w-[200px] w-auto object-contain"
              />
            ) : (
              <span className="text-2xl font-bold">{general.siteName || 'BookDragons'}</span>
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
              href="/sjangere"
              className="hover:opacity-80 transition"
              style={textStyle.color ? { color: textStyle.color } : undefined}
            >
              Sjangere
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
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
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
