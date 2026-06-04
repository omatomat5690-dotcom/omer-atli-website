import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  medicalCategories,
  getMedicalCategory,
  getMedicalArticlesByCategory,
} from '@/lib/medical'

export function generateStaticParams() {
  return medicalCategories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const cat = getMedicalCategory(category)
  if (!cat) return {}
  return { title: cat.title, description: cat.description }
}

export default async function MedicalCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const cat = getMedicalCategory(category)
  if (!cat) notFound()

  const articles = getMedicalArticlesByCategory(category)

  return (
    <>
      <header className="page-hero wrap">
        <div style={{ marginBottom: 18 }}>
          <Link href="/medical-topics" className="backlink reveal">
            <span aria-hidden="true">←</span> Medical Topics
          </Link>
        </div>
        <div className="kicker reveal">Medical Topics</div>
        <h1 className="reveal">{cat.title}</h1>
        <p className="lead serif reveal">{cat.intro}</p>
      </header>

      <section className="section wrap" style={{ paddingTop: 12 }}>
        {articles.length === 0 ? (
          <div className="empty">More on this is on the way.</div>
        ) : (
          <div className="essays">
            {articles.map((a) => (
              <Link
                key={a.slug}
                className="essay reveal"
                href={`/medical-topics/${cat.slug}/${a.slug}`}
              >
                <div className="e-tag">{cat.title}</div>
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
        )}
      </section>
    </>
  )
}
