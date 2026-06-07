import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  medicalCategories,
  getMedicalCategory,
  getMedicalArticlesByCategory,
} from '@/lib/medical'
import PaginatedEssays from '@/components/PaginatedEssays'

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
  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: `/medical-topics/${category}` },
  }
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

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://omeratli.com/' },
      { '@type': 'ListItem', position: 2, name: 'Medical Topics', item: 'https://omeratli.com/medical-topics' },
      {
        '@type': 'ListItem',
        position: 3,
        name: cat.title,
        item: `https://omeratli.com/medical-topics/${category}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
          <PaginatedEssays
            items={articles.map((a) => ({
              href: `/medical-topics/${cat.slug}/${a.slug}`,
              tag: cat.title,
              title: a.title,
              description: a.description,
              readingTime: a.readingTime,
            }))}
          />
        )}
      </section>
    </>
  )
}
