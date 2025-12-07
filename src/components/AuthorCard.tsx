import Link from 'next/link'
import type { Author } from '@/payload-types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const photo = typeof author.photo === 'object' ? author.photo : null

  return (
    <Link 
      href={`/forfattere/${author.slug}`}
      className="border rounded-lg p-6 hover:shadow-lg transition text-center"
    >
      {/* Author Photo */}
      {photo && photo.url ? (
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
          <img 
            src={photo.url} 
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
  )
}

