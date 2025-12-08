import Link from 'next/link'
import { notFound } from 'next/navigation'
import BookCard from '@/components/BookCard'
import type { Book, Genre } from '@/payload-types'

async function getGenre(slug: string): Promise<Genre | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/genres?where[slug][equals]=${slug}`,
      { cache: 'no-store' }
    )
    
    if (!res.ok) {
      return null
    }
    
    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching genre:', error)
    return null
  }
}

async function getBooksByGenre(genreId: string | number): Promise<Book[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/books?where[genres][in]=${genreId}&depth=1`,
      { cache: 'no-store' }
    )
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching books by genre:', error)
    return []
  }
}

export default async function GenrePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const genre = await getGenre(params.slug)

  if (!genre) {
    notFound()
  }

  const books = await getBooksByGenre(genre.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/boker" className="text-emerald-600 hover:underline mb-4 inline-block focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded">
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
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 inline-block focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
          >
            Se alle bøker
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">{books.length} {books.length === 1 ? 'bok' : 'bøker'} funnet</p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}