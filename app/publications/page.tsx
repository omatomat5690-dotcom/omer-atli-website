import type { Metadata } from 'next'
import Link from 'next/link'

const PUBLICATIONS_DESC =
  'Selected peer-reviewed work by Dr Omer Atli, alongside the essays on healthcare AI, emergency medicine, and clinical safety.'

export const metadata: Metadata = {
  title: 'Publications',
  description: PUBLICATIONS_DESC,
  alternates: { canonical: '/publications' },
  openGraph: {
    type: 'website',
    url: 'https://omeratli.com/publications',
    title: 'Publications',
    description: PUBLICATIONS_DESC,
    siteName: 'Omer Atli',
  },
  twitter: { card: 'summary_large_image', title: 'Publications', description: PUBLICATIONS_DESC },
}

interface Entry {
  title: string
  venue: string
  year: string
  links?: { label: string; href: string }[]
  note?: string
}

// Edit these lists as new work is published.
const publications: Entry[] = [
  {
    title:
      'Late diagnosis of Kartagener syndrome in a 38-year-old female presenting with palpitations in a resource-limited emergency department',
    venue: 'Oxford Medical Case Reports',
    year: '2025',
    links: [
      {
        label: 'Oxford Medical Case Reports',
        href: 'https://academic.oup.com/omcr/article/2025/11/omaf233/8343261',
      },
      { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/41311431/' },
    ],
    note:
      'A case report on diagnosing a rare congenital condition in a resource-limited emergency department — the setting that shapes much of the writing here.',
  },
]

const press: Entry[] = []

function EntryList({ items }: { items: Entry[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <div className="pub reveal" key={`${item.title}-${i}`}>
          <div className="yr">{item.year}</div>
          <div>
            <h3>{item.title}</h3>
            <div className="venue">{item.venue}</div>
            {item.links && item.links.length > 0 && (
              <div className="links">
                {item.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
            {item.note && (
              <p
                style={{
                  marginTop: 12,
                  fontSize: 14.5,
                  color: 'var(--ink-soft)',
                  lineHeight: 1.6,
                  maxWidth: '62ch',
                }}
              >
                {item.note}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PublicationsPage() {
  return (
    <>
      <header className="page-hero wrap">
        <div className="kicker reveal">Publications</div>
        <h1 className="reveal">Publications</h1>
        <p className="lead serif reveal">
          Selected peer-reviewed work, alongside the essays.
        </p>
      </header>

      <section className="section wrap" style={{ paddingTop: 12 }}>
        <EntryList items={publications} />

        {press.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <div className="kicker reveal">Press &amp; Media</div>
            <div style={{ marginTop: 16 }}>
              <EntryList items={press} />
            </div>
          </div>
        )}

        <p
          className="reveal"
          style={{
            marginTop: 44,
            paddingTop: 28,
            borderTop: '1px solid var(--line)',
            color: 'var(--ink-soft)',
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: '60ch',
          }}
        >
          For the essays and commentary, see the{' '}
          <Link
            href="/writing"
            style={{ color: 'var(--accent-deep)', textDecoration: 'underline', textUnderlineOffset: 2 }}
          >
            writing
          </Link>
          . For commissions or media enquiries,{' '}
          <Link
            href="/contact"
            style={{ color: 'var(--accent-deep)', textDecoration: 'underline', textUnderlineOffset: 2 }}
          >
            get in touch
          </Link>
          .
        </p>
      </section>
    </>
  )
}
