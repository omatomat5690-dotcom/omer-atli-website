import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { topics, getTopicBySlug, getArticlesForTopic } from '@/lib/topics'

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
  return { title: topic.title, description: topic.description }
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
        <p className="lead serif reveal">{topic.description}</p>
      </header>

      <section className="section wrap" style={{ paddingTop: 12 }}>
        {articles.length === 0 ? (
          <div className="empty">More writing on this is on the way.</div>
        ) : (
          <div className="essays">
            {articles.map((a) => (
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
        )}
      </section>
    </>
  )
}
