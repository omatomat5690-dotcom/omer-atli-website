import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What Dr Omer Atli is currently focused on — clinical work, writing, and reading.',
}

// Update this whenever you revise the page.
const LAST_UPDATED = 'June 2025'

export default function NowPage() {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
      <div className="max-w-content mx-auto">
        <h1 className="font-sans font-semibold text-text-heading text-3xl md:text-4xl tracking-tight mb-2 animate-fade-in">
          Now
        </h1>
        <p className="font-sans text-sm text-text-faint mb-10 animate-fade-in-up">
          What I&rsquo;m focused on at the moment. Last updated {LAST_UPDATED}.
        </p>

        <div className="space-y-6 text-text-primary text-[1.1875rem] leading-[1.7] animate-fade-in-up">
          <p>
            <strong className="font-semibold">Clinically</strong>, my background
            is in emergency medicine &mdash; the resource-limited,
            decision-under-uncertainty end of the job that shapes most of what I
            write.
          </p>
          <p>
            <strong className="font-semibold">Writing</strong>, I&rsquo;m
            building out essays on healthcare AI and clinical safety &mdash;
            currently thinking about where ambient AI scribes stop and genuine
            clinical reasoning support would have to begin, and what
            &ldquo;safety thinking&rdquo; should actually look like inside
            healthtech teams.
          </p>
          <p>
            <strong className="font-semibold">Reading</strong>, I&rsquo;m
            spending time on calibration and uncertainty in clinical
            decision-making, and on how digital-health products fail at the
            workflow edges rather than in the demo.
          </p>
          <p>
            If any of this overlaps with what you&rsquo;re working on, I&rsquo;m
            happy to hear from you &mdash; see{' '}
            <Link
              href="/contact"
              className="text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors duration-200"
            >
              contact
            </Link>
            .
          </p>
        </div>

        <p className="mt-12 pt-8 border-t border-border-subtle font-sans text-sm text-text-muted">
          This is a{' '}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors duration-200"
          >
            now page
          </a>
          , and you&rsquo;re welcome to make one too.
        </p>
      </div>
    </section>
  )
}
