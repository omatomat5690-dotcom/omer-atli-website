import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Publications & Press',
  description:
    'Peer-reviewed publications, writing, and media by Dr Omer Atli on healthcare AI, emergency medicine, and clinical safety.',
}

interface Entry {
  title: string
  venue: string
  year: string
  links?: { label: string; href: string }[]
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
  },
]

const press: Entry[] = [
  // e.g. { title: 'Interview on clinical AI', venue: 'Podcast name', year: '2025', links: [...] },
]

function EntryList({ items }: { items: Entry[] }) {
  return (
    <ul className="space-y-0">
      {items.map((item, i) => (
        <li
          key={`${item.title}-${i}`}
          className="border-t border-border-subtle first:border-t-0 py-6"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-sans text-sm text-text-faint tabular-nums shrink-0 pt-0.5">
              {item.year}
            </span>
            <div>
              <h3 className="font-sans font-semibold text-text-heading leading-snug">
                {item.title}
              </h3>
              <p className="font-serif italic text-text-muted text-sm mt-1">
                {item.venue}
              </p>
              {item.links && item.links.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                  {item.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
                    >
                      {l.label}
                      <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function PublicationsPage() {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
      <div className="max-w-content mx-auto">
        <h1 className="font-sans font-semibold text-text-heading text-3xl md:text-4xl tracking-tight mb-4 animate-fade-in">
          Publications & Press
        </h1>
        <p className="text-text-muted font-serif italic text-lg md:text-xl max-w-[60ch] mb-12 animate-fade-in-up">
          Peer-reviewed work and selected media, alongside the essays.
        </p>

        <div className="animate-fade-in-up">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-2">
            Publications
          </h2>
          <EntryList items={publications} />
        </div>

        {press.length > 0 && (
          <div className="mt-12 animate-fade-in-up">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-2">
              Press & Media
            </h2>
            <EntryList items={press} />
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-border-subtle">
          <p className="text-text-primary text-base leading-relaxed">
            For the essays and commentary, see the{' '}
            <Link
              href="/writing"
              className="text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors duration-200"
            >
              writing
            </Link>
            . For commissions or media enquiries,{' '}
            <Link
              href="/contact"
              className="text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors duration-200"
            >
              get in touch
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
