'use client'

import React, { useState, useEffect } from 'react'
import { HexColorPicker, RgbaColorPicker } from 'react-colorful'
import type { FieldComponent } from 'payload'

const ColorPickerField: FieldComponent = (props) => {
  const { path, value = '#000000', setValue, label, description } = props
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [localValue, setLocalValue] = useState(value || '#000000')
  const [isGradient, setIsGradient] = useState(false)
  const [gradientColor1, setGradientColor1] = useState('#000000')
  const [gradientColor2, setGradientColor2] = useState('#ffffff')
  const [gradientAngle, setGradientAngle] = useState(90)

  // Update local value when prop value changes
  useEffect(() => {
    if (value) {
      setLocalValue(value)
      // Check if it's a gradient
      try {
        const parsed = typeof value === 'string' ? JSON.parse(value) : value
        if (parsed && typeof parsed === 'object' && parsed.color1) {
          setIsGradient(true)
          setGradientColor1(parsed.color1 || '#000000')
          setGradientColor2(parsed.color2 || '#ffffff')
          setGradientAngle(parsed.angle || 90)
        } else {
          setIsGradient(false)
        }
      } catch {
        setIsGradient(false)
      }
    }
  }, [value])

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  // Parse value to determine if it has alpha
  const parseColor = (colorValue: string | undefined | null) => {
    if (!colorValue || typeof colorValue !== 'string') return { hex: '#000000', hasAlpha: false }
    
    // Check if it's rgba format
    if (colorValue.startsWith('rgba')) {
      const match = colorValue.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/)
      if (match) {
        const r = parseInt(match[1], 10)
        const g = parseInt(match[2], 10)
        const b = parseInt(match[3], 10)
        const a = parseFloat(match[4])
        return { 
          hex: `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`,
          rgba: { r, g, b, a },
          hasAlpha: a < 1
        }
      }
    }
    
    // Check if it's rgb format
    if (colorValue.startsWith('rgb')) {
      const match = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
      if (match) {
        const r = parseInt(match[1], 10)
        const g = parseInt(match[2], 10)
        const b = parseInt(match[3], 10)
        return { 
          hex: `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`,
          rgba: { r, g, b, a: 1 },
          hasAlpha: false
        }
      }
    }
    
    // Default to hex
    return { hex: colorValue || '#000000', hasAlpha: false }
  }

  const currentValue = localValue || '#000000'
  const parsedColor = parseColor(isGradient ? gradientColor1 : currentValue)

  const handleHexChange = (hex: string) => {
    try {
      setLocalValue(hex) // Update local state for real-time preview
      if (setValue) {
        if (path) {
          setValue(hex, { path })
        } else {
          setValue(hex)
        }
      }
    } catch (error) {
      console.error('Error in handleHexChange:', error)
    }
  }

  const handleRgbaChange = (rgba: { r: number; g: number; b: number; a: number }) => {
    try {
      let colorValue: string
      if (rgba.a < 1) {
        colorValue = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
      } else {
        colorValue = `#${[rgba.r, rgba.g, rgba.b].map(x => x.toString(16).padStart(2, '0')).join('')}`
      }
      
      setLocalValue(colorValue) // Update local state for real-time preview
      if (setValue) {
        if (path) {
          setValue(colorValue, { path })
        } else {
          setValue(colorValue)
        }
      }
    } catch (error) {
      console.error('Error in handleRgbaChange:', error)
    }
  }

  const handleGradientToggle = () => {
    const newIsGradient = !isGradient
    setIsGradient(newIsGradient)
    
    if (newIsGradient) {
      const gradientValue = JSON.stringify({ 
        color1: currentValue, 
        color2: '#ffffff', 
        angle: 90 
      })
      setLocalValue(gradientValue)
      if (setValue) {
        if (path) {
          setValue(gradientValue, { path })
        } else {
          setValue(gradientValue)
        }
      }
    } else {
      setLocalValue(gradientColor1)
      if (setValue) {
        if (path) {
          setValue(gradientColor1, { path })
        } else {
          setValue(gradientColor1)
        }
      }
    }
  }

  const handleGradientColor1Change = (newColor: string | { r: number; g: number; b: number; a: number }) => {
    let newColor1: string
    if (typeof newColor === 'string') {
      newColor1 = newColor
    } else {
      if (newColor.a < 1) {
        newColor1 = `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`
      } else {
        newColor1 = `#${[newColor.r, newColor.g, newColor.b].map(x => x.toString(16).padStart(2, '0')).join('')}`
      }
    }
    setGradientColor1(newColor1)
    const gradientValue = JSON.stringify({ color1: newColor1, color2: gradientColor2, angle: gradientAngle })
    setLocalValue(gradientValue)
    if (setValue) {
      if (path) {
        setValue(gradientValue, { path })
      } else {
        setValue(gradientValue)
      }
    }
  }

  const handleGradientColor2Change = (newColor: string | { r: number; g: number; b: number; a: number }) => {
    let newColor2: string
    if (typeof newColor === 'string') {
      newColor2 = newColor
    } else {
      if (newColor.a < 1) {
        newColor2 = `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`
      } else {
        newColor2 = `#${[newColor.r, newColor.g, newColor.b].map(x => x.toString(16).padStart(2, '0')).join('')}`
      }
    }
    setGradientColor2(newColor2)
    const gradientValue = JSON.stringify({ color1: gradientColor1, color2: newColor2, angle: gradientAngle })
    setLocalValue(gradientValue)
    if (setValue) {
      if (path) {
        setValue(gradientValue, { path })
      } else {
        setValue(gradientValue)
      }
    }
  }

  const handleGradientAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAngle = parseInt(e.target.value, 10)
    setGradientAngle(newAngle)
    const gradientValue = JSON.stringify({ color1: gradientColor1, color2: gradientColor2, angle: newAngle })
    setLocalValue(gradientValue)
    if (setValue) {
      if (path) {
        setValue(gradientValue, { path })
      } else {
        setValue(gradientValue)
      }
    }
  }

  const getDisplayColor = () => {
    if (isGradient) {
      return `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`
    }
    return currentValue
  }

  const parseGradientColor = (colorValue: string) => {
    if (!colorValue || typeof colorValue !== 'string') return { hex: '#000000', hasAlpha: false }
    
    if (colorValue.startsWith('rgba')) {
      const match = colorValue.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/)
      if (match) {
        const r = parseInt(match[1], 10)
        const g = parseInt(match[2], 10)
        const b = parseInt(match[3], 10)
        const a = parseFloat(match[4])
        return { 
          hex: `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`,
          rgba: { r, g, b, a },
          hasAlpha: a < 1
        }
      }
    }
    
    if (colorValue.startsWith('rgb')) {
      const match = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
      if (match) {
        const r = parseInt(match[1], 10)
        const g = parseInt(match[2], 10)
        const b = parseInt(match[3], 10)
        return { 
          hex: `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`,
          rgba: { r, g, b, a: 1 },
          hasAlpha: false
        }
      }
    }
    
    return { hex: colorValue || '#000000', hasAlpha: false }
  }

  const gradientColor1Parsed = parseGradientColor(gradientColor1)
  const gradientColor2Parsed = parseGradientColor(gradientColor2)
  const [displayGradientPicker1, setDisplayGradientPicker1] = useState(false)
  const [displayGradientPicker2, setDisplayGradientPicker2] = useState(false)

  const styles: Record<string, React.CSSProperties> = {
    color: {
      width: '36px',
      height: '36px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    },
    swatch: {
      padding: '5px',
      background: '#fff',
      borderRadius: '4px',
      display: 'inline-block',
      cursor: 'pointer',
      border: '1px solid #ddd',
    },
    popover: {
      position: 'absolute',
      zIndex: 2000,
      marginTop: '8px',
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      zIndex: 1999,
      background: 'transparent',
    },
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleGradientToggle}
          style={{
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            background: isGradient ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isGradient ? '✓ Gradient' : 'Solid'}
        </button>
        {isGradient && (
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            Kombiner to farger
          </span>
        )}
      </div>

      {isGradient ? (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Gradient Color 1 */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
              Farge 1
            </label>
            <div style={styles.swatch} onClick={() => setDisplayGradientPicker1(!displayGradientPicker1)}>
              <div style={{ ...styles.color, background: gradientColor1 }} />
            </div>
            {displayGradientPicker1 && (
              <>
                <div style={styles.cover} onClick={() => setDisplayGradientPicker1(false)} />
                <div style={styles.popover}>
                  <div style={{ 
                    background: 'white', 
                    borderRadius: '8px', 
                    padding: '16px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    minWidth: '250px'
                  }}>
                    {gradientColor1Parsed.hasAlpha && gradientColor1Parsed.rgba ? (
                      <RgbaColorPicker
                        color={gradientColor1Parsed.rgba}
                        onChange={handleGradientColor1Change}
                      />
                    ) : (
                      <HexColorPicker
                        color={gradientColor1Parsed.hex}
                        onChange={handleGradientColor1Change}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Gradient Color 2 */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
              Farge 2
            </label>
            <div style={styles.swatch} onClick={() => setDisplayGradientPicker2(!displayGradientPicker2)}>
              <div style={{ ...styles.color, background: gradientColor2 }} />
            </div>
            {displayGradientPicker2 && (
              <>
                <div style={styles.cover} onClick={() => setDisplayGradientPicker2(false)} />
                <div style={styles.popover}>
                  <div style={{ 
                    background: 'white', 
                    borderRadius: '8px', 
                    padding: '16px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    minWidth: '250px'
                  }}>
                    {gradientColor2Parsed.hasAlpha && gradientColor2Parsed.rgba ? (
                      <RgbaColorPicker
                        color={gradientColor2Parsed.rgba}
                        onChange={handleGradientColor2Change}
                      />
                    ) : (
                      <HexColorPicker
                        color={gradientColor2Parsed.hex}
                        onChange={handleGradientColor2Change}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Gradient Angle */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
              Vinkel: {gradientAngle}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={gradientAngle}
              onChange={handleGradientAngleChange}
              style={{ width: '150px' }}
            />
          </div>

          {/* Gradient Preview */}
          <div style={{ width: '100%', marginTop: '0.5rem' }}>
            <div style={{
              width: '100%',
              height: '40px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              background: getDisplayColor(),
            }} />
          </div>
        </div>
      ) : (
        <>
          <div style={{ position: 'relative', display: 'inline-block', marginRight: '8px' }}>
            <div style={styles.swatch} onClick={handleClick}>
              <div style={{ ...styles.color, background: currentValue }} />
            </div>
            {displayColorPicker ? (
              <>
                <div style={styles.cover} onClick={handleClose} />
                <div style={styles.popover}>
                  <div style={{ 
                    background: 'white', 
                    borderRadius: '8px', 
                    padding: '16px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    minWidth: '250px'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '12px' }}>
                      💡 Klikk og dra i fargehjulet for å velge farge, juster opacity nederst
                    </div>
                    {parsedColor.hasAlpha && parsedColor.rgba ? (
                      <RgbaColorPicker
                        color={parsedColor.rgba}
                        onChange={handleRgbaChange}
                      />
                    ) : (
                      <HexColorPicker
                        color={parsedColor.hex}
                        onChange={handleHexChange}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <input
            type="text"
            value={currentValue}
            onChange={(e) => {
              setLocalValue(e.target.value)
              if (setValue && path) {
                setValue(e.target.value, { path })
              } else if (setValue) {
                setValue(e.target.value)
              }
            }}
            style={{
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              width: '150px',
            }}
            placeholder="#000000 eller rgba(...)"
          />
        </>
      )}
    </div>
  )
}

export default ColorPickerField
