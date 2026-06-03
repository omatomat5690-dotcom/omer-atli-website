import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Dr Omer Atli is currently focused on — clinical work, writing, and reading.',
}

// Update whenever you revise this page.
const LAST_UPDATED = 'June 2025'

export default function NowPage() {
  return (
    <section className="page-hero wrap" style={{ paddingBottom: 'clamp(64px, 10vw, 128px)' }}>
      <div className="kicker reveal">Now</div>
      <h1 className="reveal">Now</h1>
      <p
        className="reveal"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          letterSpacing: '0.06em',
          color: 'var(--ink-faint)',
          marginTop: 16,
        }}
      >
        What I&rsquo;m focused on at the moment · Last updated {LAST_UPDATED}
      </p>

      <div className="about-body" style={{ marginTop: 36, maxWidth: 680 }}>
        <p className="body reveal">
          <strong>Clinically</strong>, my background is in emergency medicine — the resource-limited,
          decision-under-uncertainty end of the job that shapes most of what I write.
        </p>
        <p className="body reveal">
          <strong>Writing</strong>, I&rsquo;m building out essays on healthcare AI and clinical
          safety — currently thinking about where ambient AI scribes stop and genuine clinical
          reasoning support would have to begin, and what &ldquo;safety thinking&rdquo; should
          actually look like inside healthtech teams.
        </p>
        <p className="body reveal">
          <strong>Reading</strong>, I&rsquo;m spending time on calibration and uncertainty in
          clinical decision-making, and on how digital-health products fail at the workflow edges
          rather than in the demo.
        </p>
        <p className="body reveal">
          If any of this overlaps with what you&rsquo;re working on, I&rsquo;m happy to hear from you
          — see <Link href="/contact">contact</Link>.
        </p>
      </div>

      <p
        className="reveal"
        style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: '1px solid var(--line-soft)',
          fontFamily: 'var(--mono)',
          fontSize: 12.5,
          color: 'var(--ink-faint)',
        }}
      >
        This is a{' '}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent-deep)' }}
        >
          now page
        </a>
        .
      </p>
    </section>
  )
}
