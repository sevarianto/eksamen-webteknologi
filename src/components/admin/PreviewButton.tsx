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
      <div className="payload-preview-button">
        <button
          onClick={handleOpenPreview}
          className="payload-preview-button__button"
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
        <p className="payload-preview-button__description">
          Åpner forhåndsvisning i et eget vindu på samme side. Alle seksjoner vises i forhåndsvisningen, uavhengig av "Vis denne seksjonen"-innstillingen. Trykk ESC for å lukke.
        </p>
      </div>

      {isOpen && (
        <div className="payload-preview-modal" onClick={handleClosePreview}>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <div
            className={`payload-preview-modal__content ${isFullscreen ? 'payload-preview-modal__content--fullscreen' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="payload-preview-modal__header">
              <div style={{ flex: 1 }}>
                <h2>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Forhåndsvisning av Hjemmeside
                </h2>
                <p>
                  Dette er en forhåndsvisning med gjeldende styling-innstillinger • Trykk ESC for å lukke
                </p>
              </div>
              
              {/* Controls */}
              <div className="payload-preview-modal__controls">
                {/* Zoom Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--payload-admin-color-gray-100)', padding: '0.25rem', borderRadius: 'var(--payload-admin-radius-md)' }}>
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 50}
                    style={{
                      padding: '0.375rem',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: 'var(--payload-admin-radius-sm)',
                      cursor: zoom <= 50 ? 'not-allowed' : 'pointer',
                      color: zoom <= 50 ? 'var(--payload-admin-color-gray-400)' : 'var(--payload-admin-color-gray-700)',
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
                  <span style={{ fontSize: '0.75rem', color: 'var(--payload-admin-color-gray-500)', minWidth: '3rem', textAlign: 'center', fontWeight: '500' }}>
                    {zoom}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 200}
                    style={{
                      padding: '0.375rem',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: 'var(--payload-admin-radius-sm)',
                      cursor: zoom >= 200 ? 'not-allowed' : 'pointer',
                      color: zoom >= 200 ? 'var(--payload-admin-color-gray-400)' : 'var(--payload-admin-color-gray-700)',
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
                      borderRadius: 'var(--payload-admin-radius-sm)',
                      cursor: 'pointer',
                      color: 'var(--payload-admin-color-gray-500)',
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
                    background: isFullscreen ? 'var(--payload-admin-color-success)' : 'transparent',
                    border: '1px solid var(--payload-admin-color-gray-200)',
                    borderRadius: 'var(--payload-admin-radius-md)',
                    cursor: 'pointer',
                    color: isFullscreen ? 'white' : 'var(--payload-admin-color-gray-500)',
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
                    border: '1px solid var(--payload-admin-color-gray-200)',
                    borderRadius: 'var(--payload-admin-radius-md)',
                    cursor: 'pointer',
                    color: 'var(--payload-admin-color-gray-500)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fee2e2'
                    e.currentTarget.style.color = 'var(--payload-admin-color-error-hover)'
                    e.currentTarget.style.borderColor = '#fecaca'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--payload-admin-color-gray-500)'
                    e.currentTarget.style.borderColor = 'var(--payload-admin-color-gray-200)'
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
            <div className="payload-preview-modal__body">
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
                        border: '4px solid var(--payload-admin-color-gray-200)',
                        borderTopColor: 'var(--payload-admin-color-success)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem',
                      }}
                    />
                    <p style={{ color: 'var(--payload-admin-color-gray-500)', fontSize: '0.875rem' }}>Laster forhåndsvisning...</p>
                  </div>
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
