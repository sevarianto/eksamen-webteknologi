import Header from '@/components/Header'
import Footer from '@/components/Footer'

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

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings()
  const general = siteSettings?.general || {}
  
  // Get background style from SiteSettings
  const backgroundStyle: React.CSSProperties = {}
  const backgroundType = general.pageBackgroundType || 'solid'
  
  if (backgroundType === 'gradient') {
    const gradientColor1 = general.pageGradientColor1 || '#ffffff'
    const gradientColor2 = general.pageGradientColor2 || '#f3f4f6'
    const gradientAngle = general.pageGradientAngle || 135
    backgroundStyle.background = `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`
  } else {
    // Solid color background
    backgroundStyle.backgroundColor = general.pageBackgroundColor || '#ffffff'
  }
  
  return (
    <>
      <Header />
      <main className="min-h-screen" style={backgroundStyle}>
        {children}
      </main>
      <Footer />
    </>
  )
}