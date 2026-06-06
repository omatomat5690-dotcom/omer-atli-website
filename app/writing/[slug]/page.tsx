import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllArticles, getArticleBySlug, getRelatedArticles } from '@/lib/articles'
import { formatDate } from '@/lib/format'

const SITE = 'https://omeratli.com'

const DISCLAIMER = `This website is for educational, editorial, and professional purposes only. It does not provide medical consultations, diagnosis, treatment, prescribing, or personal medical advice. The content reflects the author's commentary and opinions on clinical, scientific, and healthcare-industry topics, and is not a substitute for individual care from a qualified healthcare provider. If you have a clinical concern, please consult your own GP or other healthcare professional.`

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
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
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE}/writing/${slug}`,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
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
  if (!article) notFound()

  const [body, takeaways] = article.content.split('## Key Takeaways')

  const url = `${SITE}/writing/${slug}`
  const related = getRelatedArticles(slug)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        url,
        image: `${url}/opengraph-image`,
        headline: article.title,
        description: article.description,
        inLanguage: 'en-GB',
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        isPartOf: { '@id': `${SITE}/#website` },
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#person` },
        mainEntityOfPage: url,
        ...(article.theme ? { articleSection: article.theme } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Writing', item: `${SITE}/writing` },
          { '@type': 'ListItem', position: 3, name: article.title, item: url },
        ],
      },
    ],
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="wrap article-head" style={{ paddingBottom: 'clamp(40px, 7vw, 88px)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <Link href="/writing" className="backlink reveal">
            <span aria-hidden="true">←</span> All writing
          </Link>

          <header className="reveal" style={{ marginTop: 22 }}>
            <span className="eyebrow">{article.theme}</span>
            <h1 className="article-title">{article.title}</h1>
            {article.subtitle && <p className="article-sub">{article.subtitle}</p>}
            <div className="article-meta">
              <span>
                By{' '}
                <Link
                  href="/about"
                  style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2 }}
                >
                  {article.author}
                </Link>
              </span>
              <span className="dot-sep">·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className="dot-sep">·</span>
              <span>{article.readingTime}</span>
            </div>
          </header>

          <div className="prose-article reveal" style={{ marginTop: 38 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          </div>

          {takeaways && (
            <div className="key-takeaways reveal">
              <h2>Key Takeaways</h2>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{takeaways}</ReactMarkdown>
            </div>
          )}

          {article.clinicalAdjacent && (
            <div
              className="reveal"
              style={{
                marginTop: 36,
                background: 'var(--paper-2)',
                borderLeft: '3px solid var(--line-soft)',
                padding: '22px 26px',
                borderRadius: '0 10px 10px 0',
              }}
            >
              <p style={{ fontSize: 13, color: 'var(--ink-faint)', lineHeight: 1.6, fontStyle: 'italic' }}>
                {DISCLAIMER}
              </p>
            </div>
          )}

          <div
            className="reveal"
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: '1px solid var(--line)',
              display: 'flex',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                border: '1px solid var(--line)',
              }}
            >
              <Image
                src="/dr-omer-atli.jpg"
                alt="Dr Omer Atli"
                width={48}
                height={48}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%' }}
              />
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>
                <Link href="/about" style={{ color: 'inherit' }}>
                  Dr Omer Atli
                </Link>
              </p>
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11.5,
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.06em',
                  marginTop: 2,
                }}
              >
                Physician · Healthcare AI · Emergency &amp; Primary Care
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section wrap" style={{ paddingTop: 0 }}>
          <div className="shead">
            <div>
              <div className="kicker reveal">More on {article.theme}</div>
              <h2 className="reveal">Related writing</h2>
            </div>
            <Link className="linkmore reveal" href="/writing">
              All writing <span className="arr">→</span>
            </Link>
          </div>
          <div className="essays">
            {related.map((a) => (
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
        </section>
      )}
    </article>
  )
}
