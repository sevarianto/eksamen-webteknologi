import Link from 'next/link'
import type { Genre } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getGenres(): Promise<Genre[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/genres?limit=50`, {
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

export default async function GenresPage() {
  const genres = await getGenres()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Sjangere</h1>

      {genres.length === 0 ? (
        <p className="text-gray-600">Ingen sjangere tilgjengelig.</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link 
              key={genre.id} 
              href={`/sjangere/${genre.slug}`}
              className="border rounded-lg p-6 hover:shadow-lg transition text-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 block"
            >
              <h3 className="text-xl font-bold mb-2">{genre.name}</h3>
              
              {genre.description && (
                <p className="text-gray-600 text-sm line-clamp-3">{genre.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

