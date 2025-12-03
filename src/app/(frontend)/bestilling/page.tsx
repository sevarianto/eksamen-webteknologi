'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCart, clearCart, getCartTotal, type CartItem } from '@/lib/cart'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  })

  useEffect(() => {
    setMounted(true)
    setCart(getCart())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generer ordrenummer
      const orderNumber = `ORD-${Date.now()}`

      // Prepare order data
      const orderData = {
        orderNumber,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        items: cart.map(item => ({
          book: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: getCartTotal(),
        status: 'pending',
      }

      // Send til Payload API
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (res.ok) {
        // Clear cart
        clearCart()
        
        // Redirect til bekreftelse
        router.push(`/bestilling/bekreftelse?orderNumber=${orderNumber}`)
      } else {
        alert('Noe gikk galt. Vennligst prøv igjen.')
        setLoading(false)
      }
    } catch (error) {
      console.error('Order error:', error)
      alert('Noe gikk galt. Vennligst prøv igjen.')
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Bestilling</h1>
        <p>Laster...</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Bestilling</h1>
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-6">Handlekurven din er tom</p>
          <a 
            href="/boker"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 inline-block"
          >
            Se alle bøker
          </a>
        </div>
      </div>
    )
  }

  const total = getCartTotal()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Bestilling</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Kontaktinformasjon</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-semibold mb-2">
                  Navn *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Ola Nordmann"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-semibold mb-2">
                  E-post *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="ola@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-semibold mb-2">
                  Telefon
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="12 34 56 78"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Behandler bestilling...' : 'Fullfør bestilling'}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Din ordre</h2>
            
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title} × {item.quantity}</span>
                  <span className="font-semibold">{item.price * item.quantity} kr</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Delsum:</span>
                <span>{total} kr</span>
              </div>
              <div className="flex justify-between">
                <span>Frakt:</span>
                <span>Gratis</span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Totalt:</span>
                <span>{total} kr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}