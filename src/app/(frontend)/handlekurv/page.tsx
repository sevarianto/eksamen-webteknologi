'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCart, updateQuantity, removeFromCart, getCartTotal, type CartItem } from '@/lib/cart'

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCart(getCart())

    const handleCartUpdate = () => {
      setCart(getCart())
    }

    window.addEventListener('cart-updated', handleCartUpdate)
    return () => window.removeEventListener('cart-updated', handleCartUpdate)
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Handlekurv</h1>
        <p>Laster...</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Handlekurv</h1>
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-6">Handlekurven din er tom</p>
          <Link 
            href="/boker"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 inline-block focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
          >
            Se alle bøker
          </Link>
        </div>
      </main>
    )
  }

  const total = getCartTotal()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Handlekurv</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 flex gap-4">
              {/* Book Info */}
              <div className="flex-1">
                <Link 
                  href={`/boker/${item.slug}`}
                  className="text-lg font-bold hover:text-emerald-600"
                >
                  {item.title}
                </Link>
                <p className="text-gray-600 mt-1">{item.price} kr / stk</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
                  aria-label="Reduser antall"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold" aria-label={`Antall: ${item.quantity}`}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
                  aria-label="Øk antall"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="flex flex-col items-end gap-2">
                <p className="font-bold text-lg">{item.price * item.quantity} kr</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-1"
                  aria-label={`Fjern ${item.title} fra handlekurv`}
                >
                  Fjern
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Sammendrag</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Delsum:</span>
                <span>{total} kr</span>
              </div>
              <div className="flex justify-between">
                <span>Frakt:</span>
                <span>Gratis</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Totalt:</span>
                <span>{total} kr</span>
              </div>
            </div>

            <Link
              href="/bestilling"
              className="block w-full bg-emerald-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Gå til bestilling
            </Link>

            <Link
              href="/boker"
              className="block text-center text-emerald-600 mt-4 hover:underline"
            >
              Fortsett å handle
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}