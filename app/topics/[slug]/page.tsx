import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { topics, getTopicBySlug, getArticlesForTopic } from '@/lib/topics'
import { getAllArticles, type ArticleMeta } from '@/lib/articles'

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) return {}
  const path = `/topics/${slug}`
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: `https://omeratli.com${path}`,
      title: topic.title,
      description: topic.description,
      siteName: 'Omer Atli',
    },
    twitter: { card: 'summary_large_image', title: topic.title, description: topic.description },
  }
}

function EssayCard({ a }: { a: ArticleMeta }) {
  return (
    <Link className="essay reveal" href={`/writing/${a.slug}`}>
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
  )
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) notFound()

  const articles = getArticlesForTopic(topic)
  const all = getAllArticles()
  const startArticles = topic.startWith
    .map((s) => all.find((a) => a.slug === s))
    .filter((a): a is ArticleMeta => Boolean(a))

  return (
    <>
      <header className="page-hero wrap">
        <div style={{ marginBottom: 18 }}>
          <Link href="/writing" className="backlink reveal">
            <span aria-hidden="true">←</span> All writing
          </Link>
        </div>
        <div className="kicker reveal">Topic</div>
        <h1 className="reveal">{topic.title}</h1>
        <p className="lead serif reveal">{topic.intro}</p>
      </header>

      <section className="section wrap" style={{ paddingTop: 12 }}>
        {startArticles.length > 0 && (
          <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
            <div className="shead">
              <div>
                <div className="kicker reveal">Start with</div>
              </div>
            </div>
            <div className="essays">
              {startArticles.map((a) => (
                <EssayCard key={a.slug} a={a} />
              ))}
            </div>
          </div>
        )}

        {articles.length === 0 ? (
          <div className="empty">More writing on this is on the way.</div>
        ) : (
          <div className="essays">
            {articles.map((a) => (
              <EssayCard key={a.slug} a={a} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
