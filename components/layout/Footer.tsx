import Link from 'next/link'
import { Mail, Linkedin } from 'lucide-react'

const DISCLAIMER = `This website is for educational, editorial, and professional purposes only. It does not provide medical consultations, diagnosis, treatment, prescribing, or personal medical advice. The content reflects the author's commentary and opinions on clinical, scientific, and healthcare-industry topics, and is not a substitute for individual care from a qualified healthcare provider. If you have a clinical concern, please consult your own GP or other healthcare professional.`

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary font-sans">
      {/* Top section */}
      <div className="max-w-container mx-auto px-6 pt-16 pb-8">
        <div className="max-w-wide mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-12">
            <div>
              <div className="text-text-heading font-semibold tracking-[0.05em] text-lg mb-1">
                OMER ATLI
              </div>
              <p className="text-text-muted text-sm max-w-xs">
                Writing on healthcare AI, emergency medicine, clinical safety, and medical evidence.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:dr@omeratli.com"
                className="inline-flex items-center gap-2 text-text-primary text-sm hover:text-accent transition-colors duration-200"
              >
                <Mail size={16} />
                dr@omeratli.com
              </a>
              <a
                href="https://www.linkedin.com/in/omer-atli-968a2a3a6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-text-primary text-sm hover:text-accent transition-colors duration-200"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { href: '/writing', label: 'Writing' },
                  { href: '/publications', label: 'Publications' },
                  { href: '/about', label: 'About' },
                  { href: '/now', label: 'Now' },
                  { href: '/contact', label: 'Contact' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-text-muted text-sm hover:text-accent transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-border-subtle pt-8 mb-8">
            <p className="text-text-muted text-sm italic leading-relaxed max-w-2xl">
              {DISCLAIMER}
            </p>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-text-muted text-xs">
            <span>&copy; {new Date().getFullYear()} Omer Atli</span>
            <span>GMC (UK) 8126471</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
