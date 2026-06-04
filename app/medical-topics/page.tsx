import type { Metadata } from 'next'
import Link from 'next/link'
import { medicalCategories, getMedicalCategoryCounts } from '@/lib/medical'

export const metadata: Metadata = {
  title: 'Medical Topics',
  description:
    'Clear, evidence-based explainers on the health topics people actually search for — metabolic health, weight-loss medicines, menopause, hair loss, supplements, heart risk, and how health content is reviewed. By Dr Omer Atli, GMC-registered physician.',
  alternates: { canonical: '/medical-topics' },
}

export default function MedicalTopicsPage() {
  const counts = getMedicalCategoryCounts()

  return (
    <>
      <header className="page-hero wrap">
        <div className="kicker reveal">Medical Topics</div>
        <h1 className="reveal">Health, explained properly</h1>
        <p className="lead serif reveal">
          Clear, evidence-based explainers on the health questions people actually
          search for — grounded in UK guidance and kept honest about uncertainty.
          These are educational articles, not personal medical advice.
        </p>
      </header>

      <section className="section wrap" style={{ paddingTop: 12 }}>
        <div className="topics">
          {medicalCategories.map((cat, i) => {
            const count = counts[cat.slug] ?? 0
            return (
              <Link key={cat.slug} className="topic reveal" href={`/medical-topics/${cat.slug}`}>
                <span className="glow" />
                <div className="idx">{String(i + 1).padStart(2, '0')}</div>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <span className="go">
                  {count} article{count === 1 ? '' : 's'} <span className="arr">→</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
