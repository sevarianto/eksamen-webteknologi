import Link from 'next/link'
import type { Book } from '@/payload-types'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const author = typeof book.author === 'object' ? book.author : null
  const coverImage = typeof book.coverImage === 'object' ? book.coverImage : null

  return (
    <Link 
      href={`/boker/${book.slug}`}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Book Cover */}
      <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 aspect-[3/4] flex items-center justify-center overflow-hidden">
        {coverImage && coverImage.url ? (
          <img 
            src={coverImage.url} 
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
        
        {author && (
          <p className="text-sm text-gray-600 mb-3">
            av {author.name}
          </p>
        )}

        {/* Age Rating Badge */}
        {book.ageRating && book.ageRating.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {Array.isArray(book.ageRating) ? (
              book.ageRating.map((rating) => (
                <span
                  key={rating}
                  className={`text-xs px-2 py-1 rounded ${
                    rating === 'barn' ? 'bg-blue-100 text-blue-800' :
                    rating === 'ungdom' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {rating === 'barn' ? 'Barn' :
                   rating === 'ungdom' ? 'Ungdom' : 'Voksen'}
                </span>
              ))
            ) : (
              <span className={`text-xs px-2 py-1 rounded ${
                book.ageRating === 'barn' ? 'bg-blue-100 text-blue-800' :
                book.ageRating === 'ungdom' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {book.ageRating === 'barn' ? 'Barn' :
                 book.ageRating === 'ungdom' ? 'Ungdom' : 'Voksen'}
              </span>
            )}
          </div>
        )}

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
  )
}

