'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

export interface PaginatedItem {
  href: string
  tag: string
  title: string
  description: string
  readingTime?: string
}

const PAGE_SIZE = 5

/** Build a Google-style window of page numbers (max 10 shown) around the current page. */
function pageWindow(current: number, total: number, max = 10): number[] {
  if (total <= max) return Array.from({ length: total }, (_, i) => i + 1)
  let start = Math.max(1, current - Math.floor(max / 2))
  const end = Math.min(total, start + max - 1)
  start = Math.max(1, end - max + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

/**
 * Renders a list of essay/article cards 5 per page, with Google-style numbered
 * pagination (« Prev · 1 2 3 … · Next »). Client-side so the surrounding pages
 * stay static. Remount (via `key`) to reset to page 1 — e.g. on filter change.
 */
export default function PaginatedEssays({
  items,
  pageSize = PAGE_SIZE,
}: {
  items: PaginatedItem[]
  pageSize?: number
}) {
  const [page, setPage] = useState(1)
  const topRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(Math.max(1, page), totalPages)
  const start = (current - 1) * pageSize
  const visible = items.slice(start, start + pageSize)

  const go = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages)
    setPage(next)
    if (topRef.current) {
      const y = topRef.current.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
    }
  }

  const numbers = pageWindow(current, totalPages)

  return (
    <div ref={topRef}>
      {/* key={current} replays the CSS fade per page. No `.reveal` — these rows
          re-render on page change and the scroll-reveal would leave them at opacity 0. */}
      <div className="essays essays-live" key={current}>
        {visible.map((a) => (
          <Link key={a.href} className="essay" href={a.href}>
            <div className="e-tag">{a.tag}</div>
            <div className="e-body">
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
            <div className="e-read">
              <span className="arr">→</span>
              {a.readingTime ? a.readingTime.replace(' read', '') : 'Read'}
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="pager" aria-label="Pagination">
          {current > 1 && (
            <button type="button" className="pager-nav" onClick={() => go(current - 1)} aria-label="Previous page">
              <span aria-hidden="true">←</span> Prev
            </button>
          )}
          {numbers[0] > 1 && (
            <>
              <button type="button" onClick={() => go(1)}>1</button>
              {numbers[0] > 2 && <span className="pager-ellipsis" aria-hidden="true">…</span>}
            </>
          )}
          {numbers.map((p) => (
            <button
              type="button"
              key={p}
              className={p === current ? 'on' : ''}
              aria-current={p === current ? 'page' : undefined}
              onClick={() => go(p)}
            >
              {p}
            </button>
          ))}
          {numbers[numbers.length - 1] < totalPages && (
            <>
              {numbers[numbers.length - 1] < totalPages - 1 && (
                <span className="pager-ellipsis" aria-hidden="true">…</span>
              )}
              <button type="button" onClick={() => go(totalPages)}>{totalPages}</button>
            </>
          )}
          {current < totalPages && (
            <button type="button" className="pager-nav" onClick={() => go(current + 1)} aria-label="Next page">
              Next <span aria-hidden="true">→</span>
            </button>
          )}
        </nav>
      )}
    </div>
  )
}
