import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0f1a0f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 7,
          border: '1px solid rgba(78,144,0,0.5)',
        }}
      >
        {/* Chevron arrow mark — matches the FT5 logo shape */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          <div
            style={{
              color: '#6fc200',
              fontSize: 15,
              fontWeight: 900,
              letterSpacing: '-0.06em',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1,
            }}
          >
            F5
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
