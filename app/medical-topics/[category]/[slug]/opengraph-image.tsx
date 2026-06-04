import { ImageResponse } from 'next/og'
import { getMedicalArticleBySlug, getMedicalCategory } from '@/lib/medical'

export const alt = 'Medical Topics — Dr Omer Atli, GMC-registered physician'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { slug } = await params
  const article = getMedicalArticleBySlug(slug)
  const cat = article ? getMedicalCategory(article.category) : undefined
  const title = article?.title ?? 'Medical Topics'
  const kicker = cat?.title ?? 'Medical Topics'

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
            fontSize: 30,
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
              display: 'flex',
              fontSize: 24,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#BE5126',
              marginBottom: 24,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.12,
              color: '#0F0F0F',
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#3A3A3A' }}>
          Dr Omer Atli · GMC-registered physician
        </div>
      </div>
    ),
    { ...size }
  )
}
