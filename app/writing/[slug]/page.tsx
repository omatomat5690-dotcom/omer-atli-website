import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { formatDate } from '@/lib/format'

const DISCLAIMER = `This website is for educational, editorial, and professional purposes only. It does not provide medical consultations, diagnosis, treatment, prescribing, or personal medical advice. The content reflects the author's commentary and opinions on clinical, scientific, and healthcare-industry topics, and is not a substitute for individual care from a qualified healthcare provider. If you have a clinical concern, please consult your own GP or other healthcare professional.`

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: [article.author],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Separate the main body from the Key Takeaways section so the latter can be
  // rendered in its own styled callout box.
  const [body, takeaways] = article.content.split('## Key Takeaways')

  return (
    <article className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
      <div className="max-w-content mx-auto">
        {/* Back link */}
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 font-sans text-sm text-text-muted hover:text-accent transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={14} />
          All writing
        </Link>

        {/* Header */}
        <header className="mb-12 animate-fade-in">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            {article.theme}
          </span>
          <h1 className="font-sans font-bold text-text-heading text-3xl md:text-[2.75rem] leading-[1.1] tracking-tight mt-3">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="font-serif italic text-text-muted text-xl md:text-[1.375rem] leading-snug mt-3">
              {article.subtitle}
            </p>
          )}
          <div className="flex items-center gap-3 mt-6 font-sans text-sm text-text-muted">
            <span>By {article.author}</span>
            <span>&middot;</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span>&middot;</span>
            <span>{article.readingTime}</span>
          </div>
        </header>

        {/* Article body */}
        <div className="prose-article animate-fade-in-up">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>

        {/* Key Takeaways */}
        {takeaways && (
          <div className="key-takeaways mt-12">
            <h2>Key Takeaways</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{takeaways}</ReactMarkdown>
          </div>
        )}

        {/* Disclaimer */}
        {article.clinicalAdjacent && (
          <div className="mt-12 bg-bg-subtle border-l-[3px] border-border-strong p-6 rounded-r-lg">
            <p className="text-text-muted text-sm italic leading-relaxed">
              {DISCLAIMER}
            </p>
          </div>
        )}

        {/* Author card */}
        <div className="mt-16 pt-8 border-t border-border-subtle">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-border-subtle bg-bg-subtle">
              <Image
                src="/headshot.jpg"
                alt="Dr Omer Atli"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-sans font-semibold text-text-heading text-sm">
                Dr Omer Atli
              </p>
              <p className="font-sans text-text-muted text-xs">
                Physician &middot; Healthcare AI &middot; Emergency Medicine
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
