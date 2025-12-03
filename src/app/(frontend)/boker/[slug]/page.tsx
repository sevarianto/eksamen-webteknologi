import Link from 'next/link'

async function getBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/books?limit=50&depth=1`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    return []
  }
  
  const data = await res.json()
  return data.docs || []
}

async function getGenres() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/genres?limit=20`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    return []
  }
  
  const data = await res.json()
  return data.docs || []
}

export default async function BooksPage() {
  const books = await getBooks()
  const genres = await getGenres()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Alle bøker</h1>

      {/* Genre Filter */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtrer etter sjanger:</h2>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/boker"
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Alle
          </Link>
          {genres.map((genre: any) => (
            <Link 
              key={genre.id}
              href={`/sjangere/${genre.slug}`}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      {books.length === 0 ? (
        <p className="text-gray-600">Ingen bøker tilgjengelig.</p>
      ) : (
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
      )}
    </div>
  )
}