async function getFooterSettings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/footer-settings`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function Footer() {
  const footer = await getFooterSettings() || {}

  // Use colors directly from admin settings with opacity support
  const bgStyle: React.CSSProperties = {}
  const textStyle: React.CSSProperties = {}

  if (footer.backgroundColor) {
    const opacity = footer.backgroundColorOpacity !== undefined && footer.backgroundColorOpacity !== null 
      ? footer.backgroundColorOpacity / 100 
      : 1
    
    // Convert hex to rgba if opacity is less than 100
    if (opacity < 1) {
      const hex = footer.backgroundColor.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      bgStyle.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`
    } else {
      bgStyle.backgroundColor = footer.backgroundColor
    }
  }

  if (footer.textColor) {
    textStyle.color = footer.textColor
  }

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
            <p style={textStyle.color ? { color: textStyle.color, opacity: 0.8 } : undefined}>
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
            <p style={textStyle.color ? { color: textStyle.color, opacity: 0.8 } : undefined}>
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
            ...(textStyle.color && {
              borderColor: `${textStyle.color}40`,
              color: textStyle.color,
              opacity: 0.8,
            }),
          }}
        >
          <p>© 2024 {footer.companyName || 'BookDragons'}. Eksamen i Webteknologi Frontend.</p>
        </div>
      </div>
    </footer>
  )
}
