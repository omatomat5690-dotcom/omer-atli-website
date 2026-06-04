import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  getAllMedicalArticles,
  getMedicalArticleBySlug,
  getMedicalCategory,
} from '@/lib/medical'
import { formatDate } from '@/lib/format'
import NewsletterBand from '@/components/NewsletterBand'

const DISCLAIMER = `This website is for educational, editorial, and professional purposes only. It does not provide medical consultations, diagnosis, treatment, prescribing, or personal medical advice. The content reflects the author's commentary and opinions on clinical, scientific, and healthcare-industry topics, and is not a substitute for individual care from a qualified healthcare provider. If you have a clinical concern, please consult your own GP or other healthcare professional.`

export function generateStaticParams() {
  return getAllMedicalArticles().map((a) => ({ category: a.category, slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category, slug } = await params
  const article = getMedicalArticleBySlug(slug)
  if (!article || article.category !== category) return {}
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

export default async function MedicalArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const article = getMedicalArticleBySlug(slug)
  if (!article || article.category !== category) notFound()

  const cat = getMedicalCategory(article.category)

  return (
    <article>
      <div className="wrap article-head" style={{ paddingBottom: 'clamp(40px, 7vw, 88px)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <Link href={`/medical-topics/${article.category}`} className="backlink reveal">
            <span aria-hidden="true">←</span> {cat ? cat.title : 'Medical Topics'}
          </Link>

          <header className="reveal" style={{ marginTop: 22 }}>
            {cat && <span className="eyebrow">{cat.title}</span>}
            <h1 className="article-title">{article.title}</h1>
            {article.subtitle && <p className="article-sub">{article.subtitle}</p>}
            <div className="article-meta">
              <span>By {article.author}</span>
              <span className="dot-sep">·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className="dot-sep">·</span>
              <span>{article.readingTime}</span>
            </div>
          </header>

          <div className="prose-article reveal" style={{ marginTop: 38 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          </div>

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
              <p style={{ fontWeight: 600, fontSize: 14 }}>Dr Omer Atli</p>
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

      <section className="section wrap" style={{ paddingTop: 0, paddingBottom: 'clamp(56px, 9vw, 120px)' }}>
        <NewsletterBand />
      </section>
    </article>
  )
}
