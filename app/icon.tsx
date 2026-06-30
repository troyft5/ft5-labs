import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 32, height: 32, background: '#0f1a0f', display: 'flex', borderRadius: 7 }}>
        <svg width="32" height="32" viewBox="0 -274 2048 2048">
          <path
            d="M 24.566742 1394 L 2022.228149 1156.592163 L 1692.278198 107 L 1689.545044 943.003296 Z"
            fill="#4e9000"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
