'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-4">Takk for din bestilling!</h1>
        
        {orderNumber && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-2">Ditt ordrenummer er:</p>
            <p className="text-3xl font-bold text-gray-800">{orderNumber}</p>
          </div>
        )}

        <p className="text-lg text-gray-700 mb-8">
          Vi har mottatt din bestilling og sender en bekreftelse til din e-post.
          Bøkene vil bli sendt innen 2-3 virkedager.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/boker"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Fortsett å handle
          </Link>
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Tilbake til forsiden
          </Link>
        </div>
      </div>
    </main>
  )
}