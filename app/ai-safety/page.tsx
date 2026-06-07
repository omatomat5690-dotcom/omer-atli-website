import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import Prose from '@/components/Prose'

const SITE = 'https://omeratli.com'

const TITLE_FULL = 'Clinician-led safety red-teaming for healthcare AI — Dr Ömer Atlı'
const H1 = 'Clinician-led safety red-teaming for healthcare AI'
const DESCRIPTION =
  'Locked-protocol clinical red-teams for patient-facing AI: scenario testing, failure taxonomy, severity grading, and a shippable risk-reduction backlog. Email to discuss a pilot.'
const LEAD =
  "Patient-facing AI rarely fails by not knowing the diagnosis. It fails after recognition — a missing instruction, a softened disposition, a dropped harm-prevention step, the wrong country's emergency pathway. These failures don't show up on benchmarks. They show up in front of a clinician running a locked protocol."
const CONTACT = 'mailto:dr@omeratli.com?subject=AI%20safety%20scoping%20call'

export const metadata: Metadata = {
  title: { absolute: TITLE_FULL },
  description: DESCRIPTION,
  alternates: { canonical: '/ai-safety' },
  openGraph: {
    type: 'website',
    url: `${SITE}/ai-safety`,
    title: TITLE_FULL,
    description: DESCRIPTION,
    siteName: 'Omer Atli',
  },
  twitter: { card: 'summary_large_image', title: TITLE_FULL, description: DESCRIPTION },
}

export default function AiSafetyPage() {
  const body = fs.readFileSync(path.join(process.cwd(), 'content/pages/ai-safety.md'), 'utf8')

  const url = `${SITE}/ai-safety`
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: H1,
        serviceType: 'Clinical safety red-teaming for patient-facing AI',
        provider: { '@id': `${SITE}/#person` },
        description: DESCRIPTION,
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'AI Safety', item: url },
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
          <header className="reveal">
            <span className="eyebrow">AI Safety</span>
            <h1 className="article-title" style={{ marginTop: 14 }}>
              {H1}
            </h1>
            <p className="lead serif" style={{ marginTop: 18 }}>
              {LEAD}
            </p>
          </header>

          <Prose className="reveal" style={{ marginTop: 32 }}>
            {body}
          </Prose>

          <div
            className="reveal"
            style={{ marginTop: 44, display: 'flex', flexWrap: 'wrap', gap: 14 }}
          >
            <a className="btn btn-primary" data-magnetic="0.25" href={CONTACT}>
              Book a 20-minute scoping call <span className="arr">→</span>
            </a>
            <Link className="btn btn-ghost" href="/ai-emergency-audit">
              Read the public audit <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
