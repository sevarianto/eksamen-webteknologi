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

  const bgColors = {
    emerald: 'bg-emerald-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    dark: 'bg-gray-900',
    white: 'bg-white border-b',
  }

  const textColors = {
    white: 'text-white',
    black: 'text-gray-900',
    gray: 'text-gray-600',
  }

  const bgClass = bgColors[header.backgroundColor as keyof typeof bgColors] || bgColors.emerald
  const textClass = textColors[header.textColor as keyof typeof textColors] || textColors.white

  return (
    <header className={`${bgClass} ${textClass} ${header.sticky ? 'sticky top-0 z-50' : ''} shadow-md`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {general.logo && typeof general.logo === 'object' && general.logo.url ? (
              <img 
                src={general.logo.url} 
                alt={general.siteName || 'Logo'}
                className="h-10 w-auto"
              />
            ) : (
              <span className="text-2xl font-bold">
                {general.siteName || 'BookDragons'}
              </span>
            )}
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link href="/" className={`${textClass} hover:opacity-80 transition`}>
              Hjem
            </Link>
            <Link href="/boker" className={`${textClass} hover:opacity-80 transition`}>
              Bøker
            </Link>
            <Link href="/forfattere" className={`${textClass} hover:opacity-80 transition`}>
              Forfattere
            </Link>
            
            {/* Cart Icon */}
            {header.showCartIcon && (
              <Link 
                href="/handlekurv" 
                className={`${textClass} hover:opacity-80 transition flex items-center gap-2`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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