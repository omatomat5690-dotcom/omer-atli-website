import type { Metadata } from 'next'

const CONTACT_DESC =
  'Get in touch with Dr Omer Atli for editorial commissions, healthcare AI consulting, podcast or media enquiries, or writing collaborations.'

export const metadata: Metadata = {
  title: 'Contact',
  description: CONTACT_DESC,
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: 'https://omeratli.com/contact',
    title: 'Contact',
    description: CONTACT_DESC,
    siteName: 'Omer Atli',
  },
  twitter: { card: 'summary_large_image', title: 'Contact', description: CONTACT_DESC },
}

export default function ContactPage() {
  return (
    <section className="page-hero wrap" style={{ paddingBottom: 'clamp(64px, 10vw, 128px)' }}>
      <div className="kicker reveal">Contact</div>
      <h1 className="reveal">Get in touch</h1>
      <p className="lead serif reveal" style={{ maxWidth: '46ch' }}>
        For professional enquiries — editorial commissions, healthcare AI consulting interest,
        podcast or media enquiries, writing collaborations — please reach out.
      </p>

      <div className="hero-cta reveal" style={{ marginTop: 36 }}>
        <a className="btn btn-primary" data-magnetic="0.25" href="mailto:dr@omeratli.com">
          dr@omeratli.com <span className="arr">→</span>
        </a>
        <a
          className="btn btn-ghost"
          href="https://www.linkedin.com/in/omer-atli-968a2a3a6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn
        </a>
      </div>

      <p
        className="reveal"
        style={{
          marginTop: 28,
          fontFamily: 'var(--mono)',
          fontSize: 13,
          letterSpacing: '0.06em',
          color: 'var(--ink-faint)',
        }}
      >
        I aim to reply within a few working days.
      </p>

      <p
        className="reveal"
        style={{
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px solid var(--line-soft)',
          fontSize: 13,
          color: 'var(--ink-faint)',
          lineHeight: 1.6,
          maxWidth: '60ch',
        }}
      >
        Note: This website is for editorial and professional purposes only and does not provide
        medical consultations or personal medical advice. For clinical concerns, please contact
        your GP.
      </p>
    </section>
  )
}
