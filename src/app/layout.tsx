import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BookDragons - Din bokhandel på Østlandet',
  description: 'Nettbutikk for bøker med stort utvalg av skjønnlitteratur, krim, fantasy og barnebøker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}