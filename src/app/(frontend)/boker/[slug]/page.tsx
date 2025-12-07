import Link from 'next/link'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import type { Book, Author, Genre } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getBook(slug: string): Promise<Book | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/books?where[slug][equals]=${slug}&depth=2`,
      { cache: 'no-store' }
    )
    
    if (!res.ok) {
      return null
    }
    
    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching book:', error)
    return null
  }
}

export default async function BookDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const book = await getBook(params.slug)

  if (!book) {
    notFound()
  }

  const author = typeof book.author === 'object' ? book.author : null
  const genres = book.genres?.filter((g): g is Genre => typeof g === 'object') || []
  const coverImage = typeof book.coverImage === 'object' ? book.coverImage : null

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/boker" className="text-emerald-600 hover:underline mb-4 inline-block">
        ← Tilbake til alle bøker
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Book Cover */}
        <div className="flex justify-center">
          <div className="w-full max-w-md aspect-[3/4] bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg overflow-hidden shadow-lg">
            {coverImage && coverImage.url ? (
              <img 
                src={coverImage.url} 
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-32 h-40 mx-auto mb-4 bg-emerald-200 rounded flex items-center justify-center">
                    <span className="text-6xl font-bold text-emerald-600">B</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-700">{book.title}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Book Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
          
          {author && (
            <p className="text-xl text-gray-600 mb-4">
              av <Link href={`/forfattere/${author.slug}`} className="text-emerald-600 hover:underline">
                {author.name}
              </Link>
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap gap-3 mb-6">
            {Array.isArray(book.ageRating) && book.ageRating.length > 0 ? (
              book.ageRating.map((rating) => (
                <span
                  key={rating}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    rating === 'barn' ? 'bg-blue-100 text-blue-800' :
                    rating === 'ungdom' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {rating === 'barn' ? 'Barn (5-13 år)' :
                   rating === 'ungdom' ? 'Ungdom (13-17 år)' : 'Voksen (17+ år)'}
                </span>
              ))
            ) : book.ageRating ? (
              <span className={`px-3 py-1 rounded text-sm font-medium ${
                book.ageRating === 'barn' ? 'bg-blue-100 text-blue-800' :
                book.ageRating === 'ungdom' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {book.ageRating === 'barn' ? 'Barn (5-13 år)' :
                 book.ageRating === 'ungdom' ? 'Ungdom (13-17 år)' : 'Voksen (17+ år)'}
              </span>
            ) : null}
            
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/sjangere/${genre.slug}`}
                className="px-3 py-1 rounded text-sm font-medium bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              >
                {genre.name}
              </Link>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Beskrivelse</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.description}</p>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-4 mb-6 space-y-2 text-sm text-gray-600">
            {book.isbn && (
              <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
            )}
            {book.publishedYear && (
              <p><span className="font-semibold">Utgivelsesår:</span> {book.publishedYear}</p>
            )}
          </div>

          {/* Price and Stock */}
          <div className="border-t pt-6 mb-6">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-4xl font-bold text-emerald-600">{book.price} kr</span>
              <span className={`text-lg font-medium ${
                book.stock > 5 ? 'text-green-600' : 
                book.stock > 0 ? 'text-orange-600' : 
                'text-red-600'
              }`}>
                {book.stock > 5 ? 'På lager' : 
                 book.stock > 0 ? `${book.stock} igjen` : 
                 'Utsolgt'}
              </span>
            </div>

            <AddToCartButton 
              book={{
                id: String(book.id),
                slug: book.slug,
                title: book.title,
                price: book.price,
                stock: book.stock,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
