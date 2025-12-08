import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Author, Book } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/authors?where[slug][equals]=${slug}&depth=2`,
      { cache: 'no-store' }
    )
    
    if (!res.ok) {
      return null
    }
    
    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching author:', error)
    return null
  }
}

async function getBooksByAuthor(authorId: string | number): Promise<Book[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/books?where[author][equals]=${authorId}&limit=20&depth=1`,
      { cache: 'no-store' }
    )
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching books by author:', error)
    return []
  }
}

export default async function AuthorDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const author = await getAuthor(params.slug)

  if (!author) {
    notFound()
  }

  const photo = typeof author.photo === 'object' ? author.photo : null
  const books = await getBooksByAuthor(author.id)

  // Get style values with fallbacks
  const nameStyle = author.nameStyle || {}
  const bioStyle = author.bioStyle || {}
  const photoStyle = author.photoStyle || {}

  // Font size classes
  const fontSizeClasses = {
    small: 'text-lg',
    normal: 'text-2xl',
    large: 'text-3xl',
    xlarge: 'text-4xl',
  }

  const bioFontSizeClasses = {
    small: 'text-sm',
    normal: 'text-base',
    large: 'text-lg',
  }

  // Font weight classes
  const fontWeightClasses = {
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  // Text align classes
  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }

  // Line height classes
  const lineHeightClasses = {
    tight: 'leading-tight',
    normal: 'leading-normal',
    loose: 'leading-loose',
  }

  // Border radius classes for photo
  const borderRadiusClasses = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-lg',
    large: 'rounded-xl',
    full: 'rounded-full',
  }

  // Object fit classes
  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/forfattere" className="text-gray-800 hover:underline mb-4 inline-block focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded">
        ← Tilbake til alle forfattere
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Author Photo */}
        <div className="flex justify-center">
          <div className={`w-full max-w-md ${borderRadiusClasses[photoStyle.borderRadius as keyof typeof borderRadiusClasses] || borderRadiusClasses.medium} overflow-hidden shadow-lg`}>
            {photo && photo.url ? (
              <img 
                src={photo.url} 
                alt={author.name}
                className={`w-full h-full ${objectFitClasses[photoStyle.objectFit as keyof typeof objectFitClasses] || objectFitClasses.cover}`}
              />
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-200">
                <span className="text-6xl font-bold text-gray-400">
                  {author.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Author Info */}
        <div>
          <h1 
            className={`${fontSizeClasses[nameStyle.fontSize as keyof typeof fontSizeClasses] || fontSizeClasses.xlarge} ${fontWeightClasses[nameStyle.fontWeight as keyof typeof fontWeightClasses] || fontWeightClasses.bold} mb-4`}
            style={{ 
              color: nameStyle.textColor || undefined,
              textAlign: nameStyle.textAlign || undefined,
            }}
          >
            {author.name}
          </h1>
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-3 mb-6">
            {author.nationality && (
              <span className="px-3 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800">
                {author.nationality}
              </span>
            )}
            {author.birthYear && (
              <span className="px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800">
                f. {author.birthYear}
              </span>
            )}
          </div>

          {/* Biography */}
          {author.bio && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Biografi</h2>
              <p 
                className={`${bioFontSizeClasses[bioStyle.fontSize as keyof typeof bioFontSizeClasses] || bioFontSizeClasses.normal} ${fontWeightClasses[bioStyle.fontWeight as keyof typeof fontWeightClasses] || fontWeightClasses.normal} ${textAlignClasses[bioStyle.textAlign as keyof typeof textAlignClasses] || textAlignClasses.left} ${lineHeightClasses[bioStyle.lineHeight as keyof typeof lineHeightClasses] || lineHeightClasses.normal} whitespace-pre-line`}
                style={{ 
                  color: bioStyle.textColor || undefined,
                }}
              >
                {author.bio}
              </p>
            </div>
          )}

          {/* Books by this author */}
          {books.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Bøker av {author.name}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {books.map((book) => (
                  <Link
                    key={book.id}
                    href={`/boker/${book.slug}`}
                    className="border rounded-lg p-4 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 block"
                  >
                    <h3 className="font-bold mb-2">{book.title}</h3>
                    {typeof book.coverImage === 'object' && book.coverImage?.url && (
                      <img 
                        src={book.coverImage.url} 
                        alt={book.title}
                        className="w-full h-48 object-cover rounded mb-2"
                      />
                    )}
                    <p className="text-gray-600 text-sm line-clamp-2">{book.description}</p>
                    <p className="text-lg font-bold mt-2">{book.price} kr</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
