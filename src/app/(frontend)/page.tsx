import Link from 'next/link'
import type { SiteSetting, Book } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type HomeSection = NonNullable<SiteSetting['homeSections']>[number]

async function getFeaturedBooks(limit = 3) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/books?where[featured][equals]=true&limit=${limit}&depth=1`,
    { cache: 'no-store' }
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
}

async function getSiteSettings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/site-settings?depth=1`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  return await res.json()
}

export default async function Home() {
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

  const visibleSections = (settings.homeSections || []).filter((s: HomeSection) => s.visible !== false)

  return (
    <main className="min-h-screen">
      {visibleSections.map((section: HomeSection, index: number) => {
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

          return (
            <section key={index} className={`relative ${heightClasses[hero.height as keyof typeof heightClasses] || heightClasses.normal} flex items-center overflow-hidden`}>
              {/* Background */}
              {hero.backgroundType === 'video' && hero.backgroundVideo && typeof hero.backgroundVideo === 'object' && hero.backgroundVideo.url ? (
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
              ) : hero.backgroundType === 'image' && hero.backgroundImage && typeof hero.backgroundImage === 'object' && hero.backgroundImage.url ? (
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
                  
                  // Fallback to predefined gradients
                  return <div className={`absolute inset-0 bg-gradient-to-br ${gradients[hero.gradientStart as keyof typeof gradients] || gradients.emerald}`}></div>
                })()
              )}

              {/* Content */}
              <div className={`relative container mx-auto px-4 text-white ${textAlignClasses[hero.textAlign as keyof typeof textAlignClasses] || textAlignClasses.center}`}>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                  {hero.title}
                </h1>
                {hero.subtitle && (
                  <p className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-3xl mx-auto">
                    {hero.subtitle}
                  </p>
                )}
                {hero.buttonText && (
                  <Link 
                    href={hero.buttonLink || '/boker'}
                    className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
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
          const getBgStyle = () => {
            if (section.featured.backgroundColor && section.featured.backgroundColor.startsWith('#')) {
              return { style: { backgroundColor: section.featured.backgroundColor }, className: '' }
            }
            const bgClasses: Record<string, string> = {
              white: 'bg-white',
              gray: 'bg-gray-100',
              emerald: 'bg-emerald-50',
            }
            return { style: {}, className: bgClasses[section.featured.backgroundColor as string] || bgClasses.white }
          }
          const bgStyle = getBgStyle()

          return (
            <FeaturedBooksSection 
              key={index} 
              settings={section.featured}
              bgClass={bgStyle.className}
              bgStyle={bgStyle.style}
            />
          )
        }

        // CATEGORIES SECTION
        if (section.sectionType === 'categories' && section.categories) {
          const getBgStyle = () => {
            if (section.categories.backgroundColor && section.categories.backgroundColor.startsWith('#')) {
              return { style: { backgroundColor: section.categories.backgroundColor }, className: '' }
            }
            const bgClasses: Record<string, string> = {
              white: 'bg-white',
              gray: 'bg-gray-100',
              emerald: 'bg-emerald-50',
            }
            return { style: {}, className: bgClasses[section.categories.backgroundColor as string] || bgClasses.gray }
          }
          const bgStyle = getBgStyle()

          return (
            <section key={index} className={`${bgStyle.className} py-16`} style={bgStyle.style}>
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-10 text-center">
                  {section.categories.title}
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <Link href="/sjangere/fantasy" className="bg-white p-8 rounded-xl hover:shadow-xl transition text-center group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 block">
                    <div className="text-5xl mb-4"></div>
                    <h3 className="text-2xl font-bold text-emerald-600 mb-2">Fantasy</h3>
                    <p className="text-gray-600">Magiske eventyr</p>
                  </Link>
                  <Link href="/sjangere/krim" className="bg-white p-8 rounded-xl hover:shadow-xl transition text-center group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 block">
                    <div className="text-5xl mb-4"></div>
                    <h3 className="text-2xl font-bold text-emerald-600 mb-2">Krim</h3>
                    <p className="text-gray-600">Spenning og mysterier</p>
                  </Link>
                  <Link href="/sjangere/barneboker" className="bg-white p-8 rounded-xl hover:shadow-xl transition text-center group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 block">
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
            if (section.textSection.backgroundColor && section.textSection.backgroundColor.startsWith('#')) {
              return { style: { backgroundColor: section.textSection.backgroundColor }, className: '' }
            }
            const bgClasses: Record<string, string> = {
              white: 'bg-white',
              gray: 'bg-gray-100',
              emerald: 'bg-emerald-50',
            }
            return { style: {}, className: bgClasses[section.textSection.backgroundColor as string] || bgClasses.white }
          }
          const bgStyle = getBgStyle()

          return (
            <section key={index} className={`${bgStyle.className} py-16`} style={bgStyle.style}>
              <div className="container mx-auto px-4 max-w-4xl">
                {section.textSection.title && (
                  <h2 className="text-4xl font-bold mb-6 text-center">{section.textSection.title}</h2>
                )}
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
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
            <div className={`relative ${heightClasses[section.banner.height as keyof typeof heightClasses] || heightClasses.medium} overflow-hidden`}>
              {typeof image === 'object' && image.url && (
                <img 
                  src={image.url}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )

          return section.banner.link ? (
            <Link key={index} href={section.banner.link} className="block hover:opacity-90 transition">
              {content}
            </Link>
          ) : (
            <div key={index}>{content}</div>
          )
        }

        return null
      })}
    </main>
  )
}

// FEATURED BOOKS COMPONENT
async function FeaturedBooksSection({ 
  settings, 
  bgClass 
}: { 
  settings: { title?: string | null; limit?: number | null } 
  bgClass?: string 
}) {
  const books = await getFeaturedBooks(settings.limit || 3)

  if (books.length === 0) return null

  return (
    <section className={`${bgClass} py-16`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center">
          {settings.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {books.map((book: Book) => (
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
                  <span className={`text-sm font-medium px-3 py-1 rounded ${book.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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