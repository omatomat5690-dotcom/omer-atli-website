import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedArticles } from '@/lib/articles'

const themes = [
  {
    title: 'Healthcare AI',
    description:
      'On scribes, co-pilots, hallucinations, and the gap between healthcare AI marketing and clinical workflow.',
  },
  {
    title: 'Emergency Medicine Thinking',
    description:
      'On uncertainty, pattern recognition, and what frontline medicine teaches about risk.',
  },
  {
    title: 'Clinical Safety & Digital Health',
    description:
      'On telemedicine governance, prescribing risk, and what safety thinking should actually look like in healthtech.',
  },
  {
    title: 'Medical Writing & Evidence',
    description:
      'On reading papers, appraising claims, and writing clearly about complicated science.',
  },
]

export default function HomePage() {
  const articles = getFeaturedArticles(3)

  return (
    <>
      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
        <div className="max-w-wide mx-auto">
          <h1 className="font-sans font-semibold text-text-heading text-4xl sm:text-5xl md:text-[3.5rem] tracking-tight leading-[1.1] animate-fade-in">
            OMER ATLI
          </h1>
          <p className="mt-6 font-serif italic text-text-primary text-xl md:text-2xl leading-relaxed max-w-[60ch] opacity-0 animate-fade-in-up stagger-1">
            I write about the clinical reality behind modern medicine —
            emergency care, healthcare AI, digital health, and patient safety.
          </p>
          <div className="mt-10 flex items-center gap-6 opacity-0 animate-fade-in-up stagger-2">
            <Link
              href="/writing"
              className="font-sans font-medium text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-all duration-200 flex items-center gap-1.5"
            >
              Read the writing
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="font-sans font-medium text-text-primary border-b border-border-strong pb-0.5 hover:text-accent hover:border-accent transition-all duration-200"
            >
              About
            </Link>
          </div>
        </div>
      </section>

      {/* THEME AREAS */}
      <section className="py-16 md:py-24 px-6 border-t border-border-subtle">
        <div className="max-w-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {themes.map((theme, i) => {
              const stagger = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4'][i] ?? ''
              return (
              <div
                key={theme.title}
                className={`group opacity-0 animate-fade-in-up ${stagger}`}
              >
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-2">
                  {theme.title}
                </h3>
                <p className="text-text-primary text-base leading-relaxed">
                  {theme.description}
                </p>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURED WRITING */}
      {articles.length > 0 && (
        <section className="py-16 md:py-24 px-6 border-t border-border-subtle">
          <div className="max-w-wide mx-auto">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-10">
              Selected Writing
            </h2>
            <div className="space-y-0">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/writing/${article.slug}`}
                  className="group block py-6 border-t border-border-subtle first:border-t-0 transition-colors duration-200 hover:bg-bg-subtle -mx-4 px-4 rounded-lg"
                >
                  <span className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-accent">
                    {article.theme}
                  </span>
                  <h3 className="font-sans font-semibold text-text-heading text-xl md:text-[1.375rem] leading-snug mt-1.5 group-hover:text-accent transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-text-primary text-base leading-relaxed mt-2 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3 font-sans text-sm text-text-muted">
                    <span>{article.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/writing"
                className="font-sans font-medium text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-all duration-200 flex items-center gap-1.5"
              >
                See all writing
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT NOTE */}
      <section className="py-16 md:py-20 px-6 border-t border-border-subtle">
        <div className="max-w-wide mx-auto text-center">
          <p className="font-sans text-text-muted text-sm">
            For professional enquiries:{' '}
            <a
              href="mailto:dr@omeratli.com"
              className="text-text-primary font-medium hover:text-accent transition-colors duration-200"
            >
              dr@omeratli.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
