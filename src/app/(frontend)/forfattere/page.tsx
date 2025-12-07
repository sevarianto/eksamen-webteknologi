import AuthorCard from '@/components/AuthorCard'
import type { Author } from '@/payload-types'

async function getAuthors(): Promise<Author[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/authors?limit=50`, {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Forfattere</h1>

      {authors.length === 0 ? (
        <p className="text-gray-600">Ingen forfattere tilgjengelig.</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </div>
  )
}