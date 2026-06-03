'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface EssayItem {
  slug: string
  title: string
  description: string
  theme: string
  readingTime: string
}

export interface FilterDef {
  slug: string
  label: string
  themes: string[]
}

export default function WritingFilter({
  articles,
  filters,
}: {
  articles: EssayItem[]
  filters: FilterDef[]
}) {
  const [active, setActive] = useState('all')

  const shown =
    active === 'all'
      ? articles
      : articles.filter((a) => {
          const f = filters.find((x) => x.slug === active)
          return f ? f.themes.includes(a.theme) : false
        })

  return (
    <>
      <div className="filters reveal">
        <button type="button" className={`chip ${active === 'all' ? 'on' : ''}`} onClick={() => setActive('all')}>
          All <span className="c-n">{articles.length}</span>
        </button>
        {filters.map((f) => (
          <button
            type="button"
            key={f.slug}
            className={`chip ${active === f.slug ? 'on' : ''}`}
            onClick={() => setActive(f.slug)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="empty">No essays in this field yet — check back soon.</div>
      ) : (
        <div className="essays">
          {shown.map((a) => (
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
    </>
  )
}
