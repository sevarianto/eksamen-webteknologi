'use client'

import React, { useState, useEffect } from 'react'
import type { FieldComponent } from 'payload'

const PreviewButton: FieldComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleOpenPreview = () => {
    setIsOpen(true)
    setIsLoading(true)
    setZoom(100)
    setIsFullscreen(false)
  }

  const handleClosePreview = () => {
    setIsOpen(false)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50))
  }

  const handleResetZoom = () => {
    setZoom(100)
  }

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev)
  }

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClosePreview()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
        <button
          onClick={handleOpenPreview}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#059669'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#10b981'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          type="button"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Forhåndsvis Hjemmeside
        </button>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
          Åpner forhåndsvisning i et eget vindu på samme side. Alle seksjoner vises i forhåndsvisningen, uavhengig av "Vis denne seksjonen"-innstillingen. Trykk ESC for å lukke.
        </p>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isFullscreen ? '0' : '1rem',
            animation: 'fadeIn 0.2s ease-in',
          }}
          onClick={handleClosePreview}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
          <div
            style={{
              width: isFullscreen ? '100%' : '95%',
              height: isFullscreen ? '100%' : '90%',
              maxWidth: isFullscreen ? '100%' : '1400px',
              maxHeight: isFullscreen ? '100%' : '90vh',
              background: 'white',
              borderRadius: isFullscreen ? '0' : '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: isFullscreen ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              animation: 'slideUp 0.3s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(to right, #f9fafb, #ffffff)',
                flexShrink: 0,
              }}
            >
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Forhåndsvisning av Hjemmeside
                </h2>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                  Dette er en forhåndsvisning med gjeldende styling-innstillinger • Trykk ESC for å lukke
                </p>
              </div>
              
              {/* Controls */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {/* Zoom Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#f3f4f6', padding: '0.25rem', borderRadius: '0.375rem' }}>
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 50}
                    style={{
                      padding: '0.375rem',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: zoom <= 50 ? 'not-allowed' : 'pointer',
                      color: zoom <= 50 ? '#9ca3af' : '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    type="button"
                    aria-label="Zoom ut"
                    title="Zoom ut"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </button>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '3rem', textAlign: 'center', fontWeight: '500' }}>
                    {zoom}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 200}
                    style={{
                      padding: '0.375rem',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: zoom >= 200 ? 'not-allowed' : 'pointer',
                      color: zoom >= 200 ? '#9ca3af' : '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    type="button"
                    aria-label="Zoom inn"
                    title="Zoom inn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </button>
                  <button
                    onClick={handleResetZoom}
                    style={{
                      padding: '0.375rem 0.5rem',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      color: '#6b7280',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                    }}
                    type="button"
                    title="Tilbakestill zoom"
                  >
                    Reset
                  </button>
                </div>

                {/* Fullscreen Toggle */}
                <button
                  onClick={handleToggleFullscreen}
                  style={{
                    padding: '0.5rem',
                    background: isFullscreen ? '#10b981' : 'transparent',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    color: isFullscreen ? 'white' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  type="button"
                  aria-label={isFullscreen ? 'Avslutt fullskjerm' : 'Fullskjerm'}
                  title={isFullscreen ? 'Avslutt fullskjerm' : 'Fullskjerm'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isFullscreen ? (
                      <>
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                      </>
                    ) : (
                      <>
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      </>
                    )}
                  </svg>
                </button>

                {/* Close Button */}
                <button
                  onClick={handleClosePreview}
                  style={{
                    padding: '0.5rem',
                    background: 'transparent',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fee2e2'
                    e.currentTarget.style.color = '#dc2626'
                    e.currentTarget.style.borderColor = '#fecaca'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#6b7280'
                    e.currentTarget.style.borderColor = '#e5e7eb'
                  }}
                  type="button"
                  aria-label="Lukk forhåndsvisning"
                  title="Lukk (ESC)"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                position: 'relative',
                background: '#f9fafb',
              }}
            >
              {isLoading && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    zIndex: 10,
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        border: '4px solid #e5e7eb',
                        borderTopColor: '#10b981',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem',
                      }}
                    />
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Laster forhåndsvisning...</p>
                  </div>
                  <style>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              )}
              <div
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top left',
                  width: `${10000 / zoom}%`,
                  height: `${10000 / zoom}%`,
                  transition: 'transform 0.2s ease',
                }}
              >
                <iframe
                  src="/preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                  }}
                  title="Forhåndsvisning av hjemmeside"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PreviewButton
