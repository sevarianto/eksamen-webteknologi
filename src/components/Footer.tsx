async function getSiteSettings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/site-settings`,
      { cache: 'no-store' }
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function Footer() {
  const settings = await getSiteSettings()
  const footer = settings?.footer || {}

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {footer.companyName || 'BookDragons'}
            </h3>
            <p className="text-gray-400">
              {footer.description || 'Din bokhandel på Østlandet siden 2024'}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kontakt</h3>
            <p className="text-gray-400 mb-2">
              E-post: {footer.email || 'kontakt@bookdragons.no'}
            </p>
            <p className="text-gray-400">
              Telefon: {footer.phone || '12 34 56 78'}
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Åpningstider</h3>
            <p className="text-gray-400 whitespace-pre-line">
              {footer.openingHours || 'Man-Fre: 10:00 - 18:00\nLør: 10:00 - 16:00\nSøn: Stengt'}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 {footer.companyName || 'BookDragons'}. Eksamen i Webteknologi Frontend.</p>
        </div>
      </div>
    </footer>
  )
}