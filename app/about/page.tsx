import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Dr Omer Atli is a physician with an Emergency Medicine background, writing about healthcare AI, clinical safety, and digital health.',
}

const DISCLAIMER = `This website is for educational, editorial, and professional purposes only. It does not provide medical consultations, diagnosis, treatment, prescribing, or personal medical advice. The content reflects the author's commentary and opinions on clinical, scientific, and healthcare-industry topics, and is not a substitute for individual care from a qualified healthcare provider. If you have a clinical concern, please consult your own GP or other healthcare professional.`

export default function AboutPage() {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
      <div className="max-w-content mx-auto">
        <h1 className="font-sans font-semibold text-text-heading text-3xl md:text-4xl tracking-tight mb-10 animate-fade-in">
          About
        </h1>

        <div className="space-y-6 text-text-primary text-[1.1875rem] leading-[1.7] animate-fade-in-up">
          <p>
            I&rsquo;m a physician with an Emergency Medicine background, currently
            practising in T&uuml;rkiye. I&rsquo;m GMC-registered (8126471) and write
            about the intersection of frontline clinical work, healthcare AI,
            digital health, and patient safety.
          </p>

          <p>
            My clinical experience is mostly in resource-limited emergency
            medicine &mdash; the kind of setting where diagnostic reasoning, risk
            calibration, and decision-making under uncertainty are the daily
            work. That perspective shapes how I think about AI in medicine:
            which problems it actually solves, which ones it makes worse, and
            why the gap between healthtech marketing and clinical workflow
            is wider than most product teams realise.
          </p>

          <p>
            I publish writing here on healthcare AI, emergency medicine
            thinking, clinical safety in digital health, and how to read
            medical evidence well. The site is editorial &mdash; it doesn&rsquo;t offer
            personal medical advice.
          </p>

          <p>
            If you&rsquo;re working on a healthcare AI or digital health product
            and want clinical perspective, or if you commission writing on
            medicine and healthcare technology, you can reach me at{' '}
            <a
              href="mailto:dr@omeratli.com"
              className="text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors duration-200"
            >
              dr@omeratli.com
            </a>.
          </p>
        </div>

        {/* Headshot */}
        <div className="mt-12 mb-12 opacity-0 animate-fade-in stagger-2">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-border-subtle">
            <Image
              src="/headshot.jpg"
              alt="Dr Omer Atli — professional headshot"
              width={480}
              height={480}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Credentials */}
        <div className="font-sans text-sm text-text-muted space-y-1 mb-12 opacity-0 animate-fade-in stagger-3">
          <p>Published in: Oxford Medical Case Reports (2025).</p>
          <p>GMC-registered physician. Member, British Medical Association.</p>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-border-subtle pt-8">
          <p className="text-text-muted text-sm italic leading-relaxed max-w-2xl">
            {DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  )
}
