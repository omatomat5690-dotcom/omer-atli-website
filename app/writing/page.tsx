import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Articles on healthcare AI, emergency medicine, clinical safety, and medical evidence by Dr Omer Atli.',
}

export default function WritingPage() {
  const articles = getAllArticles()

  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
      <div className="max-w-wide mx-auto">
        <h1 className="font-sans font-semibold text-text-heading text-3xl md:text-4xl tracking-tight mb-4 animate-fade-in">
          Writing
        </h1>
        <p className="text-text-muted font-sans text-base mb-12 animate-fade-in-up">
          Essays on the clinical reality behind modern medicine.
        </p>

        {articles.length === 0 ? (
          <p className="text-text-muted text-base italic">
            Articles coming soon.
          </p>
        ) : (
          <div className="space-y-0">
            {articles.map((article, i) => {
              const stagger = ['stagger-05', 'stagger-1', 'stagger-15', 'stagger-2', 'stagger-25', 'stagger-3', 'stagger-4'][i] ?? ''
              return (
              <Link
                key={article.slug}
                href={`/writing/${article.slug}`}
                className={`group block py-6 border-t border-border-subtle transition-colors duration-200 hover:bg-bg-subtle -mx-4 px-4 rounded-lg opacity-0 animate-fade-in-up ${stagger}`}
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
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
