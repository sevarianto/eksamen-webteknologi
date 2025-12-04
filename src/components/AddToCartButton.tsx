'use client'

import { useState } from 'react'
import { addToCart } from '@/lib/cart'

interface AddToCartButtonProps {
  book: {
    id: string
    slug: string
    title: string
    price: number
    stock: number
  }
}

export default function AddToCartButton({ book }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      slug: book.slug,
      title: book.title,
      price: book.price,
      stock: book.stock,
    })
    
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (book.stock <= 0) {
    return (
      <button 
        disabled 
        className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
      >
        Utsolgt
      </button>
    )
  }

  return (
    <button 
      onClick={handleAddToCart}
      className={`w-full py-3 rounded-lg font-semibold transition ${
        added 
          ? 'bg-green-600 text-white' 
          : 'bg-emerald-600 text-white hover:bg-emerald-700'
      }`}
    >
      {added ? '✓ Lagt til i handlekurv' : 'Legg i handlekurv'}
    </button>
  )
}