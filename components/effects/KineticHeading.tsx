'use client'

import { Fragment, useEffect, useRef } from 'react'

/**
 * Hero name that fades + rises in letter-by-letter on mount.
 * Words are kept on one line (white-space: nowrap) so letters never wrap mid-word.
 */
export default function KineticHeading({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const chars = ref.current?.querySelectorAll<HTMLElement>('.ch')
    if (!chars) return
    const timers: number[] = []
    chars.forEach((ch, i) => {
      ch.style.opacity = '0'
      ch.style.transform = 'translateY(0.5em) rotate(2deg)'
      timers.push(
        window.setTimeout(() => {
          ch.style.transition = 'opacity .8s var(--ease), transform .9s var(--ease)'
          ch.style.opacity = '1'
          ch.style.transform = 'none'
        }, 120 + i * 45)
      )
    })
    return () => timers.forEach(clearTimeout)
  }, [text])

  const words = text.trim().split(/\s+/)
  return (
    <h1 className={className} ref={ref}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="word">
            {[...word].map((c, ci) => (
              <span className="ch" key={ci}>
                {c}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </h1>
  )
}
