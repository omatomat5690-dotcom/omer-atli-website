import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What Dr Omer Atli is currently focused on — clinical work across emergency and primary care, medical review, writing, and reading.',
}

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
        A snapshot of what I&rsquo;m focused on at the moment.
      </p>

      <div className="about-body" style={{ marginTop: 36, maxWidth: 680 }}>
        <p className="body reveal">
          <strong>Clinically</strong>, my background is in both emergency medicine and primary care
          — the two ends of the system where undifferentiated problems arrive first, decisions are
          made on incomplete information, and the cost of a wrong mental model is measured in
          patients. That frontline vantage shapes most of what I write.
        </p>
        <p className="body reveal">
          <strong>Reviewing</strong>, I work as a medical reviewer — appraising clinical and
          drug-related content for accuracy, safety, and the kind of nuance that is easy to lose at
          scale. A growing part of that work is judging medical material that AI has made cheap to
          generate and expensive to verify: text that is correct sentence by sentence and still
          unsafe as a whole. Getting that review right is one of the problems I think about most.
        </p>
        <p className="body reveal">
          <strong>Writing</strong>, I&rsquo;m building out essays on healthcare AI, clinical safety,
          and where the profession is heading — currently thinking about where ambient AI scribes
          stop and genuine clinical reasoning support would have to begin, and what &ldquo;safety
          thinking&rdquo; should actually look like inside healthtech teams.
        </p>
        <p className="body reveal">
          <strong>Reading</strong>, I&rsquo;m spending time on calibration and uncertainty in
          clinical decision-making, on how to read evidence without being hypnotised by the abstract,
          and on how digital-health products fail at the workflow edges rather than in the demo.
        </p>
        <p className="body reveal">
          If any of this overlaps with what you&rsquo;re working on — clinical or drug-content
          review, a healthcare-AI perspective, or commissioned writing — I&rsquo;m glad to hear from
          you. See <Link href="/contact">contact</Link>.
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
