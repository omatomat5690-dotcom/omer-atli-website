import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Publications & Press',
  description:
    'Peer-reviewed publications, writing, and media by Dr Omer Atli on healthcare AI, emergency medicine, and clinical safety.',
}

// Edit these lists as new work is published. `href` is optional.
const publications: { title: string; venue: string; year: string; href?: string }[] = [
  {
    title: 'Case report',
    venue: 'Oxford Medical Case Reports',
    year: '2025',
    // href: 'https://doi.org/...',  // add the DOI / link when available
  },
]

const press: { title: string; venue: string; year: string; href?: string }[] = [
  // e.g. { title: 'Interview on clinical AI', venue: 'Podcast name', year: '2025', href: '...' },
]

function EntryList({
  items,
}: {
  items: { title: string; venue: string; year: string; href?: string }[]
}) {
  return (
    <ul className="space-y-0">
      {items.map((item, i) => {
        const inner = (
          <>
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-sm text-text-faint tabular-nums shrink-0">
                {item.year}
              </span>
              <div>
                <span className="font-sans font-semibold text-text-heading group-hover:text-accent transition-colors duration-200">
                  {item.title}
                  {item.href && (
                    <ArrowUpRight size={14} className="inline ml-1 -translate-y-px" />
                  )}
                </span>
                <span className="block font-serif italic text-text-muted text-sm mt-0.5">
                  {item.venue}
                </span>
              </div>
            </div>
          </>
        )
        return (
          <li
            key={`${item.title}-${i}`}
            className="border-t border-border-subtle first:border-t-0 py-5"
          >
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block -mx-4 px-4 rounded-lg hover:bg-bg-subtle transition-colors duration-200"
              >
                {inner}
              </a>
            ) : (
              <div className="group">{inner}</div>
            )}
          </li>
        )
      })}
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
