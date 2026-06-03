import type { Metadata } from 'next'
import { Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Dr Omer Atli for editorial commissions, healthcare AI consulting, podcast or media enquiries, or writing collaborations.',
}

export default function ContactPage() {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
      <div className="max-w-content mx-auto">
        <h1 className="font-sans font-semibold text-text-heading text-3xl md:text-4xl tracking-tight mb-10 animate-fade-in">
          Contact
        </h1>

        <div className="space-y-6 text-text-primary text-[1.1875rem] leading-[1.7] animate-fade-in-up">
          <p>
            For professional enquiries &mdash; editorial commissions, healthcare
            AI consulting interest, podcast or media enquiries, writing
            collaborations &mdash; please email:
          </p>
        </div>

        <a
          href="mailto:dr@omeratli.com"
          className="inline-flex items-center gap-3 mt-8 mb-8 text-text-heading font-sans font-semibold text-xl hover:text-accent transition-colors duration-200 group opacity-0 animate-fade-in-up stagger-1"
        >
          <Mail size={22} className="text-accent" />
          dr@omeratli.com
        </a>

        <p className="text-text-primary text-[1.1875rem] leading-[1.7] opacity-0 animate-fade-in-up stagger-2">
          I aim to reply within a few working days.
        </p>

        {/* Abbreviated disclaimer */}
        <div className="border-t border-border-subtle mt-12 pt-8">
          <p className="text-text-muted text-sm italic leading-relaxed max-w-2xl">
            Note: This website is for editorial and professional purposes only and
            does not provide medical advice. For clinical
            concerns, please consult your own GP or other healthcare professional.
          </p>
        </div>
      </div>
    </section>
  )
}
