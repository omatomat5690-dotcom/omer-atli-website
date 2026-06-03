import { ImageResponse } from 'next/og'

export const alt = 'Omer Atli — Healthcare AI, Emergency Medicine, Clinical Safety'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAF7',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#0F0F0F',
          }}
        >
          OMER ATLI
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#0F0F0F',
              maxWidth: 960,
            }}
          >
            The clinical reality behind modern medicine
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#C65D2E', marginTop: 28 }}>
            Healthcare AI · Emergency Medicine · Clinical Safety
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
