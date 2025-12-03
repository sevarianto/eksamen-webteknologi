import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getGenre(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/genres?where[slug][equals]=${slug}`,
    { cache: 'no-store' }
  )
  
  if (!res.ok) {
    return null
  }
  
  const data = await res.json()
  return data.docs?.[0] || null
}

async function getBooksByGenre(genreId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/books?where[genres][in]=${genreId}&depth=1`,
    { cache: 'no-store' }
  )
  
  if (!res.ok) {
    return []
  }
  
  const data = await res.json()
  return data.docs || []
}

export default async function GenrePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const genre = await getGenre(params.slug)

  if (!genre) {
    notFound()
  }

  const books = await getBooksByGenre(genre.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/boker" className="text-emerald-600 hover:underline mb-4 inline-block">
        ← Tilbake til alle bøker
      </Link>

      <div className="mt-6 mb-8">
        <h1 className="text-4xl font-bold mb-4">{genre.name}</h1>
        
        {genre.description && (
          <p className="text-lg text-gray-700 max-w-3xl">{genre.description}</p>
        )}
      </div>

      {books.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-6">Ingen bøker funnet i denne sjangeren.</p>
          <Link 
            href="/boker"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 inline-block"
          >
            Se alle bøker
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">{books.length} {books.length === 1 ? 'bok' : 'bøker'} funnet</p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book: any) => (
              <Link 
                key={book.id} 
                href={`/boker/${book.slug}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Book Cover */}
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 aspect-[3/4] flex items-center justify-center overflow-hidden">
                  {book.coverImage && typeof book.coverImage === 'object' && book.coverImage.url ? (
                    <img 
                      src={book.coverImage.url} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <div className="w-16 h-20 mx-auto mb-2 bg-emerald-200 rounded flex items-center justify-center">
                        <span className="text-2xl font-bold text-emerald-600">B</span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium line-clamp-2">{book.title}</p>
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">{book.title}</h3>
                  
                  {book.author && typeof book.author === 'object' && (
                    <p className="text-sm text-gray-600 mb-3">
                      av {book.author.name}
                    </p>
                  )}

                  {/* Age Rating Badge */}
                  <div className="mb-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      book.ageRating === 'barn' ? 'bg-blue-100 text-blue-800' :
                      book.ageRating === 'ungdom' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {book.ageRating === 'barn' ? 'Barn' :
                       book.ageRating === 'ungdom' ? 'Ungdom' : 'Voksen'}
                    </span>
                  </div>

                  {/* Price and Stock */}
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-xl font-bold text-emerald-600">
                      {book.price} kr
                    </span>
                    <span className={`text-sm font-medium ${
                      book.stock > 5 ? 'text-green-600' : 
                      book.stock > 0 ? 'text-orange-600' : 
                      'text-red-600'
                    }`}>
                      {book.stock > 5 ? 'På lager' : 
                       book.stock > 0 ? `${book.stock} igjen` : 
                       'Utsolgt'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}