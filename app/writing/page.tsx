import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/articles'
import { topics } from '@/lib/topics'
import WritingFilter, { type EssayItem, type FilterDef } from '@/components/WritingFilter'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Long-form thinking on healthcare AI, emergency medicine, clinical safety, and how to read evidence honestly.',
}

const SHORT_LABELS: Record<string, string> = {
  'healthcare-ai': 'Healthcare AI',
  'emergency-medicine': 'Emergency Medicine',
  'clinical-safety': 'Clinical Safety',
  'medical-writing': 'Medical Writing',
  'future-of-medicine': 'Future of Medicine',
}

export default function WritingPage() {
  const articles: EssayItem[] = getAllArticles().map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    theme: a.theme,
    readingTime: a.readingTime,
  }))

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

      <section className="section wrap" style={{ paddingTop: 12 }}>
        <WritingFilter articles={articles} filters={filters} />
      </section>
    </>
  )
}
