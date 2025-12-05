'use client'

import React, { useState, useEffect } from 'react'
import { HexColorPicker, RgbaColorPicker } from 'react-colorful'
import type { FieldComponent } from 'payload'

const GradientColorPickerField: FieldComponent = (props) => {
  const { path, value, setValue, label, description } = props
  const allowGradient = true

  // Parse value - can be string (solid) or JSON string of object (gradient)
  const parseValue = () => {
    if (!value) return { isGradient: false, color1: '#000000', color2: '#ffffff', angle: 90 }
    
    try {
      const parsed = typeof value === 'string' ? JSON.parse(value) : value
      if (parsed && typeof parsed === 'object' && parsed.color1) {
        return {
          isGradient: true,
          color1: parsed.color1 || '#000000',
          color2: parsed.color2 || '#ffffff',
          angle: parsed.angle || 90,
        }
      }
    } catch {
      // Not JSON, treat as solid color
    }
    
    return {
      isGradient: false,
      color1: typeof value === 'string' ? value : '#000000',
      color2: '#ffffff',
      angle: 90,
    }
  }

  const initial = parseValue()
  const [isGradient, setIsGradient] = useState(initial.isGradient)
  const [color1, setColor1] = useState(initial.color1)
  const [color2, setColor2] = useState(initial.color2)
  const [angle, setAngle] = useState(initial.angle)
  const [displayColorPicker1, setDisplayColorPicker1] = useState(false)
  const [displayColorPicker2, setDisplayColorPicker2] = useState(false)

  // Update when value changes externally
  useEffect(() => {
    const parsed = parseValue()
    setIsGradient(parsed.isGradient)
    setColor1(parsed.color1)
    setColor2(parsed.color2)
    setAngle(parsed.angle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const updateValue = (newIsGradient: boolean, newColor1: string, newColor2: string, newAngle: number) => {
    if (setValue && path) {
      if (newIsGradient) {
        setValue(JSON.stringify({ color1: newColor1, color2: newColor2, angle: newAngle }), { path })
      } else {
        setValue(newColor1, { path })
      }
    } else if (setValue) {
      if (newIsGradient) {
        setValue(JSON.stringify({ color1: newColor1, color2: newColor2, angle: newAngle }))
      } else {
        setValue(newColor1)
      }
    }
  }

  // Parse color string to hex or rgba object
  const parseColorForPicker = (colorValue: string | undefined | null) => {
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

  const handleColor1Change = (newColor: string | { r: number; g: number; b: number; a: number }) => {
    try {
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
      setColor1(newColor1)
      updateValue(isGradient, newColor1, color2, angle)
    } catch (error) {
      console.error('Error in handleColor1Change:', error)
    }
  }

  const handleColor2Change = (newColor: string | { r: number; g: number; b: number; a: number }) => {
    try {
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
      setColor2(newColor2)
      if (isGradient) {
        updateValue(true, color1, newColor2, angle)
      }
    } catch (error) {
      console.error('Error in handleColor2Change:', error)
    }
  }

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAngle = parseInt(e.target.value, 10)
    setAngle(newAngle)
    if (isGradient) {
      updateValue(true, color1, color2, newAngle)
    }
  }

  const handleToggleGradient = () => {
    const newIsGradient = !isGradient
    setIsGradient(newIsGradient)
    updateValue(newIsGradient, color1, color2, angle)
  }

  const getGradientStyle = () => {
    if (isGradient) {
      return {
        background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
      }
    }
    return {
      background: color1,
    }
  }

  const styles: Record<string, React.CSSProperties> = {
    container: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 600,
      fontSize: '0.875rem',
      color: '#374151',
    },
    description: {
      marginBottom: '0.5rem',
      fontSize: '0.75rem',
      color: '#6b7280',
    },
    preview: {
      width: '100%',
      height: '60px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      marginBottom: '1rem',
      ...getGradientStyle(),
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
    colorSwatch: {
      padding: '5px',
      background: '#fff',
      borderRadius: '4px',
      display: 'inline-block',
      cursor: 'pointer',
      border: '1px solid #ddd',
    },
    color: {
      width: '36px',
      height: '36px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
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
    angleControl: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    toggleButton: {
      padding: '0.5rem 1rem',
      background: isGradient ? '#10b981' : '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: 500,
    },
  }

  const color1Parsed = parseColorForPicker(color1)
  const color2Parsed = parseColorForPicker(color2)

  return (
    <div style={styles.container}>
      {allowGradient && (
        <button
          type="button"
          onClick={handleToggleGradient}
          style={styles.toggleButton}
        >
          {isGradient ? '✓ Gradient' : 'Solid Farge'}
        </button>
      )}

      <div style={styles.preview} />

      <div style={styles.controls}>
        <div style={{ position: 'relative' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
            {isGradient ? 'Farge 1' : 'Farge'}
          </label>
          <div style={styles.colorSwatch} onClick={() => setDisplayColorPicker1(!displayColorPicker1)}>
            <div style={{ ...styles.color, background: color1 }} />
          </div>
          {displayColorPicker1 ? (
            <>
              <div style={styles.cover} onClick={() => setDisplayColorPicker1(false)} />
              <div style={styles.popover}>
                <div style={{ 
                  background: 'white', 
                  borderRadius: '8px', 
                  padding: '16px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  minWidth: '250px'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '12px' }}>
                    💡 Klikk og dra i fargehjulet for å velge farge
                  </div>
                  {color1Parsed.hasAlpha && color1Parsed.rgba ? (
                    <RgbaColorPicker
                      color={color1Parsed.rgba}
                      onChange={handleColor1Change}
                    />
                  ) : (
                    <HexColorPicker
                      color={color1Parsed.hex}
                      onChange={handleColor1Change}
                    />
                  )}
                </div>
              </div>
            </>
          ) : null}
          <input
            type="text"
            value={color1}
            onChange={(e) => handleColor1Change(e.target.value)}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              width: '100px',
            }}
            placeholder="#000000"
          />
        </div>

        {isGradient && (
          <>
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
                Farge 2
              </label>
              <div style={styles.colorSwatch} onClick={() => setDisplayColorPicker2(!displayColorPicker2)}>
                <div style={{ ...styles.color, background: color2 }} />
              </div>
              {displayColorPicker2 ? (
                <>
                  <div style={styles.cover} onClick={() => setDisplayColorPicker2(false)} />
                  <div style={styles.popover}>
                    <div style={{ 
                      background: 'white', 
                      borderRadius: '8px', 
                      padding: '16px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      minWidth: '250px'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '12px' }}>
                        💡 Klikk og dra i fargehjulet for å velge farge
                      </div>
                      {color2Parsed.hasAlpha && color2Parsed.rgba ? (
                        <RgbaColorPicker
                          color={color2Parsed.rgba}
                          onChange={handleColor2Change}
                        />
                      ) : (
                        <HexColorPicker
                          color={color2Parsed.hex}
                          onChange={handleColor2Change}
                        />
                      )}
                    </div>
                  </div>
                </>
              ) : null}
              <input
                type="text"
                value={color2}
                onChange={(e) => handleColor2Change(e.target.value)}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  width: '100px',
                }}
                placeholder="#ffffff"
              />
            </div>

            <div style={styles.angleControl}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
                Vinkel: {angle}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={handleAngleChange}
                style={{
                  width: '150px',
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GradientColorPickerField
