import { ImageResponse } from 'next/og'

export const runtime     = 'edge'
export const alt         = 'Smart Gents Saloon — Premium Men\'s Grooming'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#0F0F0F',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial gold glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,169,107,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(200,169,107,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,107,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Top eyebrow line */}
        <div
          style={{
            position: 'absolute',
            top: 72,
            left: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ width: 32, height: 1, backgroundColor: '#C8A96B' }} />
          <span
            style={{
              color: '#C8A96B',
              fontSize: 12,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              fontFamily: 'serif',
            }}
          >
            Premium Men&apos;s Grooming
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h1
            style={{
              fontSize: 80,
              fontWeight: 700,
              fontFamily: 'serif',
              color: '#FFFFFF',
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Smart Gents{' '}
            <span style={{ color: '#C8A96B', fontStyle: 'italic' }}>Saloon.</span>
          </h1>

          <p
            style={{
              fontSize: 22,
              color: 'rgba(255,255,255,0.45)',
              fontFamily: 'sans-serif',
              margin: 0,
              maxWidth: 600,
              lineHeight: 1.55,
            }}
          >
            Where Style Meets Precision. Professional haircuts, beard sculpting &
            luxury grooming for the modern gentleman.
          </p>

          {/* Bottom separator + URL */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
            <div style={{ width: 40, height: 1, backgroundColor: 'rgba(200,169,107,0.45)' }} />
            <span
              style={{
                color: 'rgba(255,255,255,0.28)',
                fontSize: 14,
                fontFamily: 'sans-serif',
                letterSpacing: '0.1em',
              }}
            >
              smartgentssaloon.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
