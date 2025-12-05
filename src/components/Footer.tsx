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

  // Handle hex colors, rgba colors, or fallback to predefined colors
  const getBgColor = () => {
    if (footer.backgroundColor) {
      // Check if it's hex, rgb, or rgba
      if (footer.backgroundColor.startsWith('#') || footer.backgroundColor.startsWith('rgb')) {
        return { backgroundColor: footer.backgroundColor }
      }
    }
    // Fallback to default dark gray
    return { backgroundColor: '#111827' }
  }

  const getTextColor = () => {
    if (footer.textColor) {
      // Check if it's hex, rgb, or rgba
      if (footer.textColor.startsWith('#') || footer.textColor.startsWith('rgb')) {
        return { color: footer.textColor }
      }
    }
    // Fallback to white
    return { color: '#ffffff' }
  }

  const bgStyle = getBgColor()
  const textStyle = getTextColor()

  return (
    <footer 
      className="py-12"
      style={{
        ...bgStyle,
        ...textStyle,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 
              className="text-xl font-bold mb-4"
              style={textStyle.color ? { color: textStyle.color } : undefined}
            >
              {footer.companyName || 'BookDragons'}
            </h3>
            <p 
              style={textStyle.color ? { color: textStyle.color, opacity: 0.8 } : undefined}
            >
              {footer.description || 'Din bokhandel på Østlandet siden 2024'}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 
              className="text-xl font-bold mb-4"
              style={textStyle.color ? { color: textStyle.color } : undefined}
            >
              Kontakt
            </h3>
            <p 
              className="mb-2"
              style={textStyle.color ? { color: textStyle.color, opacity: 0.8 } : undefined}
            >
              E-post: {footer.email || 'kontakt@bookdragons.no'}
            </p>
            <p 
              style={textStyle.color ? { color: textStyle.color, opacity: 0.8 } : undefined}
            >
              Telefon: {footer.phone || '12 34 56 78'}
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 
              className="text-xl font-bold mb-4"
              style={textStyle.color ? { color: textStyle.color } : undefined}
            >
              Åpningstider
            </h3>
            <p 
              className="whitespace-pre-line"
              style={textStyle.color ? { color: textStyle.color, opacity: 0.8 } : undefined}
            >
              {footer.openingHours || 'Man-Fre: 10:00 - 18:00\nLør: 10:00 - 16:00\nSøn: Stengt'}
            </p>
          </div>
        </div>

        <div 
          className="border-t mt-8 pt-8 text-center"
          style={{
            borderColor: textStyle.color ? `${textStyle.color}40` : 'rgba(255, 255, 255, 0.2)',
            color: textStyle.color ? textStyle.color : undefined,
            opacity: textStyle.color ? 0.8 : undefined,
          }}
        >
          <p>© 2024 {footer.companyName || 'BookDragons'}. Eksamen i Webteknologi Frontend.</p>
        </div>
      </div>
    </footer>
  )
}