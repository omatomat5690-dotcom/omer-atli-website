import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Prose from '@/components/Prose'

const SITE = 'https://omeratli.com'

const TITLE = 'Patients already ask AI before they reach the ED. I tested what happens next.'
const DESCRIPTION =
  'An emergency physician red-teamed ChatGPT, Claude and Gemini on 20 emergency-care scenarios under a locked protocol. The models recognised the red flags — the failures came after recognition.'
const DEK =
  'The models recognised the red flags. The failures came after recognition — in action, urgency, localisation and safety-netting.'
const BYLINE =
  'A clinician-led red-team of frontier AI on 20 synthetic emergency-care scenarios · Dr Ömer Atlı — Emergency Physician (GMC-registered) · June 2026'
const OG_IMAGE = '/ai-audit/fig1-v11-chatgpt.png'
const PUBLISHED = '2026-06-07'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/ai-emergency-audit' },
  openGraph: {
    type: 'article',
    url: `${SITE}/ai-emergency-audit`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Omer Atli',
    publishedTime: PUBLISHED,
    authors: ['Dr Ömer Atlı'],
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function AiEmergencyAuditPage() {
  const body = fs.readFileSync(
    path.join(process.cwd(), 'content/pages/ai-emergency-audit.md'),
    'utf8'
  )

  const url = `${SITE}/ai-emergency-audit`
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        url,
        image: `${SITE}${OG_IMAGE}`,
        headline: TITLE,
        description: DESCRIPTION,
        inLanguage: 'en-GB',
        datePublished: PUBLISHED,
        dateModified: PUBLISHED,
        isPartOf: { '@id': `${SITE}/#website` },
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#person` },
        mainEntityOfPage: url,
        articleSection: 'Healthcare AI',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Writing', item: `${SITE}/writing` },
          { '@type': 'ListItem', position: 3, name: TITLE, item: url },
        ],
      },
    ],
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="wrap article-head" style={{ paddingBottom: 'clamp(40px, 7vw, 88px)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <Link href="/writing" className="backlink reveal">
            <span aria-hidden="true">←</span> All writing
          </Link>

          <header className="reveal" style={{ marginTop: 22 }}>
            <span className="eyebrow">Healthcare AI</span>
            <h1 className="article-title">{TITLE}</h1>
            <p className="article-sub">{DEK}</p>
            <div className="article-meta">
              <span>{BYLINE}</span>
            </div>
          </header>

          <Prose className="reveal" style={{ marginTop: 38 }}>
            {body}
          </Prose>

          <div
            className="reveal"
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: '1px solid var(--line)',
              display: 'flex',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                border: '1px solid var(--line)',
              }}
            >
              <Image
                src="/dr-omer-atli.jpg"
                alt="Dr Omer Atli"
                width={48}
                height={48}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%' }}
              />
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>
                <Link href="/about" style={{ color: 'inherit' }}>
                  Dr Omer Atli
                </Link>
              </p>
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11.5,
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.06em',
                  marginTop: 2,
                }}
              >
                Physician · Healthcare AI · Emergency &amp; Primary Care
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
