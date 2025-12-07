import Link from 'next/link'
import BookCard from '@/components/BookCard'
import type { Book, Genre } from '@/payload-types'

async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/books?limit=50&depth=1`, {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
}

async function getGenres(): Promise<Genre[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/genres?limit=20`, {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching genres:', error)
    return []
  }
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
          {genres.map((genre) => (
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
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}