'use client'

import { useState } from 'react'
import PaginatedEssays from './PaginatedEssays'

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
      {/* No `reveal` here: this list re-renders on filter, and the JS scroll-reveal
          would leave re-rendered rows stuck at opacity 0. Always visible instead. */}
      <div className="filters">
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
        // key={active} remounts on filter change, resetting pagination to page 1.
        <PaginatedEssays
          key={active}
          items={shown.map((a) => ({
            href: `/writing/${a.slug}`,
            tag: a.theme,
            title: a.title,
            description: a.description,
            readingTime: a.readingTime,
          }))}
        />
      )}
    </>
  )
}
