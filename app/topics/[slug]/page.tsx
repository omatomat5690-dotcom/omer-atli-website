import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { topics, getTopicBySlug, getArticlesForTopic } from '@/lib/topics'
import { formatDate } from '@/lib/format'

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
  return {
    title: topic.title,
    description: topic.description,
  }
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
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
      <div className="max-w-wide mx-auto">
        <Link
          href="/writing"
          className="flex w-fit items-center gap-1.5 font-sans text-sm text-text-muted hover:text-accent transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={14} />
          All writing
        </Link>

        <span className="block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          Topic
        </span>
        <h1 className="font-sans font-semibold text-text-heading text-3xl md:text-4xl tracking-tight mt-2 mb-4 animate-fade-in">
          {topic.title}
        </h1>
        <p className="text-text-muted font-serif italic text-lg md:text-xl max-w-[60ch] mb-12 animate-fade-in-up">
          {topic.description}
        </p>

        {articles.length === 0 ? (
          <p className="text-text-muted text-base italic">
            More writing on this is on the way.
          </p>
        ) : (
          <div className="space-y-0">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/writing/${article.slug}`}
                className="group block py-6 border-t border-border-subtle transition-colors duration-200 hover:bg-bg-subtle -mx-4 px-4 rounded-lg"
              >
                <span className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-accent">
                  {article.theme}
                </span>
                <h2 className="font-sans font-semibold text-text-heading text-xl md:text-[1.375rem] leading-snug mt-1.5 group-hover:text-accent transition-colors duration-200">
                  {article.title}
                </h2>
                <p className="text-text-primary text-base leading-relaxed mt-2 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center gap-3 mt-3 font-sans text-sm text-text-muted">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span>&middot;</span>
                  <span>{article.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
