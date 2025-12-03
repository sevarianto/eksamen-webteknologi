import Link from 'next/link'

async function getAuthors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/authors?limit=50`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    return []
  }
  
  const data = await res.json()
  return data.docs || []
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
          {authors.map((author: any) => (
            <Link 
              key={author.id} 
              href={`/forfattere/${author.slug}`}
              className="border rounded-lg p-6 hover:shadow-lg transition text-center"
            >
              {/* Author Photo */}
              {author.photo && typeof author.photo === 'object' && author.photo.url ? (
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={author.photo.url} 
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-4xl">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{author.name}</h3>
              
              {author.nationality && (
                <p className="text-gray-600 text-sm mb-2">{author.nationality}</p>
              )}

              {author.birthYear && (
                <p className="text-gray-500 text-sm">f. {author.birthYear}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}