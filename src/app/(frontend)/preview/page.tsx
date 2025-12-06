import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

export default async function PreviewPage() {
  const settings = await getSiteSettings()

  if (!settings || !settings.homeSections || settings.homeSections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Velkommen til BookDragons</h1>
          <p className="text-gray-600 mb-8">Konfiger hjemmesiden i Admin → Site Settings</p>
          <Link href="/admin" className="bg-emerald-600 text-white px-6 py-3 rounded-lg">
            Gå til Admin
          </Link>
        </div>
      </div>
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
        {allSections.map((section: any, index: number) => {
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
            const gradients = {
              emerald: 'from-emerald-600 via-emerald-700 to-emerald-800',
              blue: 'from-blue-600 via-blue-700 to-blue-800',
              purple: 'from-purple-600 via-purple-700 to-purple-800',
              rose: 'from-rose-600 via-rose-700 to-rose-800',
              amber: 'from-amber-600 via-amber-700 to-amber-800',
              teal: 'from-teal-600 via-teal-700 to-teal-800',
            }

            // Apply custom styling from hero.titleStyle
            const titleStyle: any = {}
            if (hero.titleStyle) {
              if (hero.titleStyle.fontSize) {
                const fontSizeMap: Record<string, string> = {
                  small: 'text-3xl',
                  normal: 'text-4xl',
                  large: 'text-5xl',
                  xlarge: 'text-6xl',
                  xxlarge: 'text-7xl',
                }
                titleStyle.fontSize = fontSizeMap[hero.titleStyle.fontSize] || 'text-5xl'
              }
              if (hero.titleStyle.fontWeight) {
                const fontWeightMap: Record<string, string> = {
                  normal: 'font-normal',
                  semibold: 'font-semibold',
                  bold: 'font-bold',
                }
                titleStyle.fontWeight = fontWeightMap[hero.titleStyle.fontWeight] || 'font-bold'
              }
              if (hero.titleStyle.textColor) {
                titleStyle.color = hero.titleStyle.textColor
              }
            }

            // Apply custom styling from hero.subtitleStyle
            const subtitleStyle: any = {}
            if (hero.subtitleStyle) {
              if (hero.subtitleStyle.fontSize) {
                const fontSizeMap: Record<string, string> = {
                  small: 'text-base',
                  normal: 'text-lg',
                  large: 'text-xl',
                  xlarge: 'text-2xl',
                }
                subtitleStyle.fontSize = fontSizeMap[hero.subtitleStyle.fontSize] || 'text-xl'
              }
              if (hero.subtitleStyle.fontWeight) {
                const fontWeightMap: Record<string, string> = {
                  normal: 'font-normal',
                  semibold: 'font-semibold',
                  bold: 'font-bold',
                }
                subtitleStyle.fontWeight =
                  fontWeightMap[hero.subtitleStyle.fontWeight] || 'font-normal'
              }
              if (hero.subtitleStyle.textColor) {
                subtitleStyle.color = hero.subtitleStyle.textColor
              }
            }

            // Apply button styling
            const buttonStyle: any = {}
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
                    // Try to parse custom gradient colors
                    let gradientStyle: React.CSSProperties = {}
                    try {
                      if (hero.gradientColors && typeof hero.gradientColors === 'string') {
                        const gradient = JSON.parse(hero.gradientColors)
                        if (gradient.color1 && gradient.color2) {
                          gradientStyle = {
                            background: `linear-gradient(${gradient.angle || 135}deg, ${gradient.color1}, ${gradient.color2})`,
                          }
                        }
                      }
                    } catch {
                      // Fallback to default gradient
                    }

                    if (Object.keys(gradientStyle).length > 0) {
                      return <div className="absolute inset-0" style={gradientStyle}></div>
                    }

                    // Fallback to predefined gradients
                    return (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradients[hero.gradientStart as keyof typeof gradients] || gradients.emerald}`}
                      ></div>
                    )
                  })()
                )}

                {/* Content */}
                <div
                  className={`relative container mx-auto px-4 ${textAlignClasses[hero.textAlign as keyof typeof textAlignClasses] || textAlignClasses.center}`}
                >
                  <h1
                    className={`${titleStyle.fontSize || 'text-5xl'} md:${titleStyle.fontSize?.replace('text-', 'md:text-') || 'text-6xl'} ${titleStyle.fontWeight || 'font-bold'} mb-6 drop-shadow-lg`}
                    style={{ color: titleStyle.color || 'white' }}
                  >
                    {hero.title}
                  </h1>
                  {hero.subtitle && (
                    <p
                      className={`${subtitleStyle.fontSize || 'text-xl'} md:${subtitleStyle.fontSize?.replace('text-', 'md:text-') || 'text-2xl'} ${subtitleStyle.fontWeight || 'font-normal'} mb-8 drop-shadow-md max-w-3xl mx-auto`}
                      style={{ color: subtitleStyle.color || 'white' }}
                    >
                      {hero.subtitle}
                    </p>
                  )}
                  {hero.buttonText && (
                    <Link
                      href={hero.buttonLink || '/boker'}
                      className={`inline-block ${buttonStyle.padding || 'px-8 py-4'} ${buttonStyle.borderRadius || 'rounded-lg'} font-semibold hover:opacity-90 transition shadow-lg ${buttonStyle.fontSize || 'text-lg'}`}
                      style={{
                        backgroundColor: buttonStyle.backgroundColor || 'white',
                        color: buttonStyle.color || '#059669',
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
            const bgClasses = {
              white: 'bg-white',
              gray: 'bg-gray-100',
              emerald: 'bg-emerald-50',
            }

            return (
              <FeaturedBooksSection
                key={index}
                settings={section.featured}
                bgClass={
                  bgClasses[section.featured.backgroundColor as keyof typeof bgClasses] ||
                  bgClasses.white
                }
              />
            )
          }

          // CATEGORIES SECTION
          if (section.sectionType === 'categories' && section.categories) {
            const bgClasses = {
              white: 'bg-white',
              gray: 'bg-gray-100',
              emerald: 'bg-emerald-50',
            }

            return (
              <section
                key={index}
                className={`${bgClasses[section.categories.backgroundColor as keyof typeof bgClasses] || bgClasses.gray} py-16`}
              >
                <div className="container mx-auto px-4">
                  <h2 className="text-4xl font-bold mb-10 text-center">
                    {section.categories.title}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Link
                      href="/sjangere/fantasy"
                      className="bg-white p-8 rounded-xl hover:shadow-xl transition text-center group"
                    >
                      <div className="text-5xl mb-4"></div>
                      <h3 className="text-2xl font-bold text-emerald-600 mb-2">Fantasy</h3>
                      <p className="text-gray-600">Magiske eventyr</p>
                    </Link>
                    <Link
                      href="/sjangere/krim"
                      className="bg-white p-8 rounded-xl hover:shadow-xl transition text-center group"
                    >
                      <div className="text-5xl mb-4"></div>
                      <h3 className="text-2xl font-bold text-emerald-600 mb-2">Krim</h3>
                      <p className="text-gray-600">Spenning og mysterier</p>
                    </Link>
                    <Link
                      href="/sjangere/barneboker"
                      className="bg-white p-8 rounded-xl hover:shadow-xl transition text-center group"
                    >
                      <div className="text-5xl mb-4"></div>
                      <h3 className="text-2xl font-bold text-emerald-600 mb-2">Barnebøker</h3>
                      <p className="text-gray-600">Bøker for de minste</p>
                    </Link>
                  </div>
                </div>
              </section>
            )
          }

          // TEXT SECTION
          if (section.sectionType === 'text' && section.textSection) {
            const getBgStyle = () => {
              if (
                section.textSection.backgroundColor &&
                section.textSection.backgroundColor.startsWith('#')
              ) {
                return {
                  style: { backgroundColor: section.textSection.backgroundColor },
                  className: '',
                }
              }
              const bgClasses: Record<string, string> = {
                white: 'bg-white',
                gray: 'bg-gray-100',
                emerald: 'bg-emerald-50',
              }
              return {
                style: {},
                className:
                  bgClasses[section.textSection.backgroundColor as string] || bgClasses.white,
              }
            }
            const bgStyle = getBgStyle()

            // Apply custom styling
            const titleStyle: any = {}
            if (section.textSection.titleStyle) {
              if (section.textSection.titleStyle.fontSize) {
                const fontSizeMap: Record<string, string> = {
                  small: 'text-2xl',
                  normal: 'text-3xl',
                  large: 'text-4xl',
                  xlarge: 'text-5xl',
                }
                titleStyle.fontSize =
                  fontSizeMap[section.textSection.titleStyle.fontSize] || 'text-4xl'
              }
              if (section.textSection.titleStyle.fontWeight) {
                const fontWeightMap: Record<string, string> = {
                  normal: 'font-normal',
                  semibold: 'font-semibold',
                  bold: 'font-bold',
                }
                titleStyle.fontWeight =
                  fontWeightMap[section.textSection.titleStyle.fontWeight] || 'font-bold'
              }
              if (section.textSection.titleStyle.textColor) {
                titleStyle.color = section.textSection.titleStyle.textColor
              }
            }

            const contentStyle: any = {}
            if (section.textSection.contentStyle) {
              if (section.textSection.contentStyle.fontSize) {
                const fontSizeMap: Record<string, string> = {
                  small: 'text-sm',
                  normal: 'text-base',
                  large: 'text-lg',
                }
                contentStyle.fontSize =
                  fontSizeMap[section.textSection.contentStyle.fontSize] || 'text-lg'
              }
              if (section.textSection.contentStyle.fontWeight) {
                const fontWeightMap: Record<string, string> = {
                  normal: 'font-normal',
                  semibold: 'font-semibold',
                  bold: 'font-bold',
                }
                contentStyle.fontWeight =
                  fontWeightMap[section.textSection.contentStyle.fontWeight] || 'font-normal'
              }
              if (section.textSection.contentStyle.textColor) {
                contentStyle.color = section.textSection.contentStyle.textColor
              }
            }

            return (
              <section key={index} className={`${bgStyle.className} py-16`} style={bgStyle.style}>
                <div className="container mx-auto px-4 max-w-4xl">
                  {section.textSection.title && (
                    <h2
                      className={`${titleStyle.fontSize || 'text-4xl'} ${titleStyle.fontWeight || 'font-bold'} mb-6 text-center`}
                      style={{ color: titleStyle.color }}
                    >
                      {section.textSection.title}
                    </h2>
                  )}
                  <p
                    className={`${contentStyle.fontSize || 'text-lg'} ${contentStyle.fontWeight || 'font-normal'} text-gray-700 leading-relaxed whitespace-pre-line`}
                    style={{ color: contentStyle.color || undefined }}
                  >
                    {section.textSection.content}
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
                className="block hover:opacity-90 transition"
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
async function FeaturedBooksSection({ settings, bgClass, bgStyle }: any) {
  const books = await getFeaturedBooks(settings.limit || 3)

  if (books.length === 0) return null

  return (
    <section className={`${bgClass || ''} py-16`} style={bgStyle || {}}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center">{settings.title}</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {books.map((book: any) => (
            <Link
              key={book.id}
              href={`/boker/${book.slug}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-50">
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
                  <span className="text-2xl font-bold text-emerald-600">{book.price} kr</span>
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
