import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const ABOUT_DESC =
  'Dr Omer Atli is an emergency physician writing about healthcare AI, clinical safety, and digital health.'

export const metadata: Metadata = {
  title: 'About',
  description: ABOUT_DESC,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: 'https://omeratli.com/about',
    title: 'About',
    description: ABOUT_DESC,
    siteName: 'Omer Atli',
  },
  twitter: { card: 'summary_large_image', title: 'About', description: ABOUT_DESC },
}

const facts = [
  { k: 'Background', v: 'Emergency & Primary Care' },
  { k: 'GMC (UK)', v: '8126471' },
  { k: 'Also registered', v: 'Turkish Ministry of Health' },
  { k: 'Also works as', v: 'Medical Reviewer' },
  { k: 'Member', v: 'BMA · IDF · TMA' },
  { k: 'Writes on', v: 'Healthcare AI & Safety' },
]

const focus = [
  {
    label: 'Field 01',
    title: 'Healthcare AI in real workflow',
    desc: 'Scribes, co-pilots, hallucination risk, and the marketing-to-clinic gap.',
  },
  {
    label: 'Field 02',
    title: 'Reasoning under uncertainty',
    desc: 'What frontline medicine teaches about risk and pattern recognition.',
  },
  {
    label: 'Field 03',
    title: 'Clinical safety & governance',
    desc: 'Telemedicine, prescribing risk, and safety thinking in healthtech.',
  },
  {
    label: 'Field 04',
    title: 'Reading the evidence honestly',
    desc: 'Appraising claims and writing clearly about complicated science.',
  },
]

const profileSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://omeratli.com/about#profilepage',
  url: 'https://omeratli.com/about',
  name: 'About Dr Omer Atli',
  description: ABOUT_DESC,
  mainEntity: { '@id': 'https://omeratli.com/#person' },
  isPartOf: { '@id': 'https://omeratli.com/#website' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://omeratli.com/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://omeratli.com/about' },
    ],
  },
}

export default function AboutPage() {
  return (
    <section className="section wrap" style={{ paddingTop: 'clamp(48px, 8vw, 104px)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      <div className="about-grid">
        <div className="about-portrait reveal">
          <Image
            src="/dr-omer-atli.jpg"
            alt="Dr Omer Atli"
            fill
            priority
            sizes="(max-width: 880px) 86vw, 360px"
          />
          <span className="portrait-frame" />
        </div>

        <div className="about-body">
          <div className="kicker reveal">About</div>
          <h1 className="reveal">Dr Omer Atli</h1>
          <p className="lead serif reveal">
            Emergency physician writing at the seam between frontline clinical reality and the
            technology being built around it.
          </p>
          <p className="body reveal">
            I work across emergency medicine and primary care — the parts of the system where
            undifferentiated problems arrive first, decisions are made on incomplete information, and
            the cost of a wrong mental model is measured in patients. That vantage point shapes
            everything I write.
          </p>
          <p className="body reveal">
            Most healthcare-AI commentary is written by people who have never run a busy department
            or sat with the consequences of a missed diagnosis. <strong>I write from the other side
            of that gap</strong> — about where AI scribes actually help, where &ldquo;co-pilot&rdquo;
            language oversells, and what safety thinking should look like when software starts making
            clinical suggestions.
          </p>
          <p className="body reveal">
            I&rsquo;m registered with the UK General Medical Council (GMC 8126471) and the Turkish
            Ministry of Health, and a member of the British Medical Association, the Independent
            Doctors Federation, and the Turkish Medical Association. Alongside clinical work I work as
            a <strong>medical reviewer</strong> — appraising clinical and drug-related content for
            accuracy and safety — and my case-report work appears in{' '}
            <Link href="/publications">Oxford Medical Case Reports</Link>.
          </p>

          <div className="facts reveal">
            {facts.map((f) => (
              <div className="fact" key={f.k}>
                <div className="k">{f.k}</div>
                <div className="v">{f.v}</div>
              </div>
            ))}
          </div>

          <div className="kicker reveal" style={{ marginTop: 8 }}>
            What I focus on
          </div>
          <div className="creds">
            {focus.map((f) => (
              <div className="cred reveal" key={f.label}>
                <div className="yr">{f.label}</div>
                <div className="d">
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="about-cta reveal">
            <Link className="btn btn-primary" data-magnetic="0.25" href="/writing">
              Read the writing <span className="arr">→</span>
            </Link>
            <a className="btn btn-ghost" href="mailto:dr@omeratli.com">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
