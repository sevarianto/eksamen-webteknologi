import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { SiteSetting, Book } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type HomeSection = NonNullable<SiteSetting['homeSections']>[number]

async function getFeaturedBooks(limit = 3) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/books?where[featured][equals]=true&limit=${limit}&depth=1`,
    { cache: 'no-store' },
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
}

async function getSiteSettings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/site-settings?depth=1`,
    { cache: 'no-store' },
  )
  if (!res.ok) return null
  return await res.json()
}

async function getHeaderSettings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/header-settings`,
    { cache: 'no-store' },
  )
  if (!res.ok) return null
  return await res.json()
}

export default async function PreviewPage() {
  const settings = await getSiteSettings()
  const headerSettings = await getHeaderSettings()

  if (!settings || !settings.homeSections || settings.homeSections.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Velkommen til BookDragons</h1>
          <p className="text-gray-600 mb-8">Konfiger hjemmesiden i Admin → Site Settings</p>
          <Link href="/admin" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Gå til Admin
          </Link>
        </div>
      </main>
    )
  }

  // Show all sections in preview, regardless of visible flag
  const allSections = settings.homeSections || []

  return (
    <div className="min-h-screen">
      {/* Preview Banner */}
      <div className="bg-yellow-400 text-black py-2 px-4 text-center font-semibold sticky top-0 z-50">
        FORHÅNDSVISNING - Dette er en forhåndsvisning av hjemmesiden med gjeldende
        styling-innstillinger
      </div>

      <Header />

      <main>
        {allSections.map((section: HomeSection, index: number) => {
          // HERO SECTION
          if (section.sectionType === 'hero' && section.hero) {
            const hero = section.hero
            const heightClasses = {
              short: 'min-h-[400px]',
              normal: 'min-h-[600px]',
              tall: 'min-h-[800px]',
              full: 'min-h-screen',
            }
            const textAlignClasses = {
              left: 'text-left',
              center: 'text-center',
              right: 'text-right',
            }
            // Gradients removed - using gradientColor1 and gradientColor2 instead

            // Apply custom styling from hero.titleStyle
            const titleStyle: React.CSSProperties = {}
            const titleClassName: string[] = []
            if (hero.titleStyle) {
              if (hero.titleStyle.fontSize) {
                const fontSizeMap: Record<string, string> = {
                  small: 'text-3xl',
                  normal: 'text-4xl',
                  large: 'text-5xl',
                  xlarge: 'text-6xl',
                  xxlarge: 'text-7xl',
                }
                titleClassName.push(fontSizeMap[hero.titleStyle.fontSize] || 'text-5xl')
              }
              if (hero.titleStyle.fontWeight) {
                const fontWeightMap: Record<string, string> = {
                  normal: 'font-normal',
                  semibold: 'font-semibold',
                  bold: 'font-bold',
                }
                titleClassName.push(fontWeightMap[hero.titleStyle.fontWeight] || 'font-bold')
              }
              if (hero.titleStyle.textColor) {
                titleStyle.color = hero.titleStyle.textColor
              }
            }

            // Apply custom styling from hero.subtitleStyle
            const subtitleStyle: React.CSSProperties = {}
            const subtitleClassName: string[] = []
            if (hero.subtitleStyle) {
              if (hero.subtitleStyle.fontSize) {
                const fontSizeMap: Record<string, string> = {
                  small: 'text-base',
                  normal: 'text-lg',
                  large: 'text-xl',
                  xlarge: 'text-2xl',
                }
                subtitleClassName.push(fontSizeMap[hero.subtitleStyle.fontSize] || 'text-xl')
              }
              if (hero.subtitleStyle.fontWeight) {
                const fontWeightMap: Record<string, string> = {
                  normal: 'font-normal',
                  semibold: 'font-semibold',
                  bold: 'font-bold',
                }
                subtitleClassName.push(
                  fontWeightMap[hero.subtitleStyle.fontWeight] || 'font-normal',
                )
              }
              if (hero.subtitleStyle.textColor) {
                subtitleStyle.color = hero.subtitleStyle.textColor
              }
            }

            // Apply button styling
            const buttonStyle: React.CSSProperties = {}
            if (hero.buttonStyle) {
              if (hero.buttonStyle.backgroundColor) {
                buttonStyle.backgroundColor = hero.buttonStyle.backgroundColor
              }
              if (hero.buttonStyle.textColor) {
                buttonStyle.color = hero.buttonStyle.textColor
              }
              if (hero.buttonStyle.fontSize) {
                const fontSizeMap: Record<string, string> = {
                  small: 'text-sm',
                  normal: 'text-base',
                  large: 'text-lg',
                }
                buttonStyle.fontSize = fontSizeMap[hero.buttonStyle.fontSize] || 'text-base'
              }
              if (hero.buttonStyle.padding) {
                const paddingMap: Record<string, string> = {
                  small: 'px-4 py-2',
                  medium: 'px-6 py-3',
                  large: 'px-8 py-4',
                }
                buttonStyle.padding = paddingMap[hero.buttonStyle.padding] || 'px-8 py-4'
              }
              if (hero.buttonStyle.borderRadius) {
                const borderRadiusMap: Record<string, string> = {
                  none: 'rounded-none',
                  small: 'rounded',
                  medium: 'rounded-lg',
                  large: 'rounded-xl',
                  full: 'rounded-full',
                }
                buttonStyle.borderRadius =
                  borderRadiusMap[hero.buttonStyle.borderRadius] || 'rounded-lg'
              }
            }

            return (
              <section
                key={index}
                className={`relative ${heightClasses[hero.height as keyof typeof heightClasses] || heightClasses.normal} flex items-center overflow-hidden`}
              >
                {/* Background */}
                {hero.backgroundType === 'video' &&
                hero.backgroundVideo &&
                typeof hero.backgroundVideo === 'object' &&
                hero.backgroundVideo.url ? (
                  <>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={hero.backgroundVideo.url} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  </>
                ) : hero.backgroundType === 'image' &&
                  hero.backgroundImage &&
                  typeof hero.backgroundImage === 'object' &&
                  hero.backgroundImage.url ? (
                  <>
                    <img
                      src={hero.backgroundImage.url}
                      alt="Hero background"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  </>
                ) : (
                  (() => {
                    // Use new gradient color fields
                    if (hero.gradientColor1 && hero.gradientColor2) {
                      const angle = hero.gradientAngle || 135
                      return (
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(${angle}deg, ${hero.gradientColor1}, ${hero.gradientColor2})`,
                          }}
                        ></div>
                      )
                    }

                    // Fallback to default gradient (use header color or neutral gray)
                    const fallbackColor = 
                      (headerSettings?.backgroundType === 'solid' && headerSettings?.backgroundColor) 
                        ? headerSettings.backgroundColor 
                        : headerSettings?.gradientColor1 || '#6b7280'
                    return (
                      <div 
                        className="absolute inset-0" 
                        style={{
                          background: `linear-gradient(135deg, ${fallbackColor}, ${fallbackColor}dd)`,
                        }}
                      ></div>
                    )
                  })()
                )}

                {/* Content */}
                <div
                  className={`relative container mx-auto px-4 ${textAlignClasses[hero.textAlign as keyof typeof textAlignClasses] || textAlignClasses.center}`}
                >
                  <h1
                    className={`${titleClassName.join(' ') || 'text-5xl md:text-6xl font-bold'} mb-6 drop-shadow-lg`}
                    style={titleStyle.color ? { color: titleStyle.color } : { color: 'white' }}
                  >
                    {hero.title}
                  </h1>
                  {hero.subtitle && (
                    <p
                      className={`${subtitleClassName.join(' ') || 'text-xl md:text-2xl font-normal'} mb-8 drop-shadow-md max-w-3xl mx-auto`}
                      style={
                        subtitleStyle.color ? { color: subtitleStyle.color } : { color: 'white' }
                      }
                    >
                      {hero.subtitle}
                    </p>
                  )}
                  {hero.buttonText && (
                    <Link
                      href={hero.buttonLink || '/boker'}
                      className={`inline-block ${buttonStyle.padding || 'px-8 py-4'} ${buttonStyle.borderRadius || 'rounded-lg'} font-semibold hover:opacity-90 transition shadow-lg ${buttonStyle.fontSize || 'text-lg'} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      style={{
                        backgroundColor: buttonStyle.backgroundColor || 'white',
                        color: buttonStyle.color || '#000000',
                      }}
                    >
                      {hero.buttonText}
                    </Link>
                  )}
                </div>
              </section>
            )
          }

          // FEATURED BOOKS SECTION
          if (section.sectionType === 'featured' && section.featured) {
            return (
              <FeaturedBooksSection
                key={index}
                settings={section.featured}
                bgClass=""
                bgStyle={{
                  backgroundColor: section.featured.backgroundColor || '#ffffff',
                }}
                headerSettings={headerSettings || null}
              />
            )
          }

          // CATEGORIES SECTION
          if (section.sectionType === 'categories' && section.categories) {
            return (
              <section
                key={index}
                className="py-16"
                style={{
                  backgroundColor: section.categories.backgroundColor || '#f3f4f6',
                }}
              >
                <div className="container mx-auto px-4">
                  <h2 className="text-4xl font-bold mb-10 text-center">
                    {section.categories.title}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Link
                      href="/sjangere/fantasy"
                      className="bg-white p-8 rounded-xl hover:shadow-xl transition text-center group focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 block"
                    >
                      <div className="text-5xl mb-4"></div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: section.categories.titleStyle?.textColor || '#000000' }}>Fantasy</h3>
                      <p className="text-gray-600">Magiske eventyr</p>
                    </Link>
                    <Link
                      href="/sjangere/krim"
                      className="bg-white p-8 rounded-xl hover:shadow-xl transition text-center group focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 block"
                    >
                      <div className="text-5xl mb-4"></div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: section.categories.titleStyle?.textColor || '#000000' }}>Krim</h3>
                      <p className="text-gray-600">Spenning og mysterier</p>
                    </Link>
                    <Link
                      href="/sjangere/barneboker"
                      className="bg-white p-8 rounded-xl hover:shadow-xl transition text-center group focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 block"
                    >
                      <div className="text-5xl mb-4"></div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: section.categories.titleStyle?.textColor || '#000000' }}>Barnebøker</h3>
                      <p className="text-gray-600">Bøker for de minste</p>
                    </Link>
                  </div>
                </div>
              </section>
            )
          }

          // TEXT SECTION
          if (section.sectionType === 'text' && section.textSection) {
            const textSectionData = section.textSection
            const getBgStyle = () => {
              if (
                textSectionData.backgroundColor &&
                textSectionData.backgroundColor.startsWith('#')
              ) {
                return {
                  style: { backgroundColor: textSectionData.backgroundColor },
                  className: '',
                }
              }
              // Always use hex color from SiteSettings, no fallback classes
              return {
                style: {
                  backgroundColor: textSectionData.backgroundColor || '#ffffff',
                },
                className: '',
              }
            }
            const bgStyle = getBgStyle()

            // Apply custom styling
            const titleStyle: React.CSSProperties = {}
            if (textSectionData.titleStyle) {
              if (textSectionData.titleStyle.fontSize) {
                const fontSizeMap: Record<string, string> = {
                  small: 'text-2xl',
                  normal: 'text-3xl',
                  large: 'text-4xl',
                  xlarge: 'text-5xl',
                }
                titleStyle.fontSize = fontSizeMap[textSectionData.titleStyle.fontSize] || 'text-4xl'
              }
              if (textSectionData.titleStyle.fontWeight) {
                const fontWeightMap: Record<string, string> = {
                  normal: 'font-normal',
                  semibold: 'font-semibold',
                  bold: 'font-bold',
                }
                titleStyle.fontWeight =
                  fontWeightMap[textSectionData.titleStyle.fontWeight] || 'font-bold'
              }
              if (textSectionData.titleStyle.textColor) {
                titleStyle.color = textSectionData.titleStyle.textColor
              }
            }

            const contentStyle: React.CSSProperties = {}
            if (textSectionData.contentStyle) {
              if (textSectionData.contentStyle.fontSize) {
                const fontSizeMap: Record<string, string> = {
                  small: 'text-sm',
                  normal: 'text-base',
                  large: 'text-lg',
                }
                contentStyle.fontSize =
                  fontSizeMap[textSectionData.contentStyle.fontSize] || 'text-lg'
              }
              if (textSectionData.contentStyle.fontWeight) {
                const fontWeightMap: Record<string, string> = {
                  normal: 'font-normal',
                  semibold: 'font-semibold',
                  bold: 'font-bold',
                }
                contentStyle.fontWeight =
                  fontWeightMap[textSectionData.contentStyle.fontWeight] || 'font-normal'
              }
              if (textSectionData.contentStyle.textColor) {
                contentStyle.color = textSectionData.contentStyle.textColor
              }
            }

            return (
              <section key={index} className={`${bgStyle.className} py-16`} style={bgStyle.style}>
                <div className="container mx-auto px-4 max-w-4xl">
                  {textSectionData.title && (
                    <h2
                      className={`${titleStyle.fontSize || 'text-4xl'} ${titleStyle.fontWeight || 'font-bold'} mb-6 text-center`}
                      style={{ color: titleStyle.color }}
                    >
                      {textSectionData.title}
                    </h2>
                  )}
                  <p
                    className={`${contentStyle.fontSize || 'text-lg'} ${contentStyle.fontWeight || 'font-normal'} text-gray-700 leading-relaxed whitespace-pre-line`}
                    style={{ color: contentStyle.color || undefined }}
                  >
                    {textSectionData.content}
                  </p>
                </div>
              </section>
            )
          }

          // BANNER SECTION
          if (section.sectionType === 'banner' && section.banner && section.banner.image) {
            const heightClasses = {
              short: 'h-[200px]',
              medium: 'h-[400px]',
              tall: 'h-[600px]',
            }
            const image = section.banner.image

            const content = (
              <div
                className={`relative ${heightClasses[section.banner.height as keyof typeof heightClasses] || heightClasses.medium} overflow-hidden`}
              >
                {typeof image === 'object' && image.url && (
                  <img src={image.url} alt="Banner" className="w-full h-full object-cover" />
                )}
              </div>
            )

            return section.banner.link ? (
              <Link
                key={index}
                href={section.banner.link}
                className="block hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {content}
              </Link>
            ) : (
              <div key={index}>{content}</div>
            )
          }

          return null
        })}
      </main>

      <Footer />
    </div>
  )
}

// FEATURED BOOKS COMPONENT
async function FeaturedBooksSection({
  settings,
  bgClass,
  bgStyle,
  headerSettings,
}: {
  settings: { title?: string | null; limit?: number | null }
  bgClass?: string
  bgStyle?: React.CSSProperties
  headerSettings?: any
}) {
  const books = await getFeaturedBooks(settings.limit || 3)

  if (books.length === 0) return null

  return (
    <section className={`${bgClass || ''} py-16`} style={bgStyle || {}}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center">{settings.title}</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {books.map((book: Book) => (
            <Link
              key={book.id}
              href={`/boker/${book.slug}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {book.coverImage && typeof book.coverImage === 'object' && book.coverImage.url ? (
                  <img
                    src={book.coverImage.url}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-6xl"></span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{book.description}</p>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span 
                    className="text-2xl font-bold" 
                    style={{ 
                      color: headerSettings 
                        ? (headerSettings.backgroundType === 'solid' 
                            ? headerSettings.backgroundColor 
                            : headerSettings.gradientColor1) || '#000000'
                        : '#000000'
                    }}
                  >
                    {book.price} kr
                  </span>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded ${book.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {book.stock > 0 ? `${book.stock} på lager` : 'Utsolgt'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
