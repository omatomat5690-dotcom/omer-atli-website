import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, type ArticleMeta } from '@/lib/articles'
import { topics } from '@/lib/topics'
import WritingFilter, { type EssayItem, type FilterDef } from '@/components/WritingFilter'

const WRITING_DESC =
  'Long-form thinking on healthcare AI, emergency medicine, clinical safety, and how to read evidence honestly.'

export const metadata: Metadata = {
  title: 'Writing',
  description: WRITING_DESC,
  alternates: { canonical: '/writing' },
  openGraph: {
    type: 'website',
    url: 'https://omeratli.com/writing',
    title: 'Writing',
    description: WRITING_DESC,
    siteName: 'Omer Atli',
  },
  twitter: { card: 'summary_large_image', title: 'Writing', description: WRITING_DESC },
}

const SHORT_LABELS: Record<string, string> = {
  'healthcare-ai': 'Healthcare AI',
  'emergency-medicine': 'Emergency Medicine',
  'clinical-safety': 'Clinical Safety',
  'medical-writing': 'Medical Writing',
  'future-of-medicine': 'Future of Medicine',
}

// One flagship essay per field, in pillar order.
const START_HERE = [
  'ai-scribes-are-not-the-endgame',
  'why-vague-symptoms-are-where-medicine-gets-dangerous',
  'clinical-safety-is-not-a-checkbox',
  'how-to-read-a-medical-paper',
  'why-doctors-need-to-understand-ai',
]

export default function WritingPage() {
  const all = getAllArticles()

  const articles: EssayItem[] = all.map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    theme: a.theme,
    readingTime: a.readingTime,
  }))

  const startArticles = START_HERE.map((s) => all.find((a) => a.slug === s)).filter(
    (a): a is ArticleMeta => Boolean(a)
  )

  const filters: FilterDef[] = topics.map((t) => ({
    slug: t.slug,
    label: SHORT_LABELS[t.slug] ?? t.title,
    themes: t.themes,
  }))

  return (
    <>
      <header className="page-hero wrap">
        <div className="kicker reveal">Writing — Essays &amp; field notes</div>
        <h1 className="reveal">Writing</h1>
        <p className="lead serif reveal">
          Long-form thinking on healthcare AI, emergency medicine, clinical safety, and how to read
          evidence honestly. Filter by field below.
        </p>
      </header>

      <section className="section wrap" style={{ paddingTop: 12, paddingBottom: 0 }}>
        <div className="shead">
          <div>
            <div className="kicker reveal">Featured — clinician-led investigation</div>
          </div>
        </div>
        <div className="essays">
          <Link className="essay reveal" href="/ai-emergency-audit">
            <div className="e-tag">Healthcare AI</div>
            <div className="e-body">
              <h3>Patients already ask AI before they reach the ED. I tested what happens next.</h3>
              <p>
                An emergency physician red-teamed ChatGPT, Claude and Gemini on 20 emergency-care
                scenarios under a locked protocol. The models recognised the red flags — the
                failures came after recognition.
              </p>
            </div>
            <div className="e-read">
              <span className="arr">→</span>
              Read
            </div>
          </Link>
        </div>
      </section>

      {startArticles.length > 0 && (
        <section className="section wrap" style={{ paddingTop: 12, paddingBottom: 0 }}>
          <div className="shead">
            <div>
              <div className="kicker reveal">Start here — one essay per field</div>
            </div>
          </div>
          <div className="essays">
            {startArticles.map((a) => (
              <Link key={a.slug} className="essay reveal" href={`/writing/${a.slug}`}>
                <div className="e-tag">{a.theme}</div>
                <div className="e-body">
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                </div>
                <div className="e-read">
                  <span className="arr">→</span>
                  {a.readingTime.replace(' read', '')}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section wrap" style={{ paddingTop: 28 }}>
        <WritingFilter articles={articles} filters={filters} />
      </section>
    </>
  )
}
