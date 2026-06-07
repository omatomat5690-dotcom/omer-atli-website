import Link from 'next/link'

const DISCLAIMER = `This website is for educational, editorial, and professional purposes only. It does not provide medical consultations, diagnosis, treatment, prescribing, or personal medical advice. The content reflects the author's commentary and opinions on clinical, scientific, and healthcare-industry topics, and is not a substitute for individual care from a qualified healthcare provider. If you have a clinical concern, please consult your own GP or other healthcare professional.`

export default function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <div className="f-brand">OMER ATLI</div>
          <p>Writing on healthcare AI, emergency medicine, clinical safety, and medical evidence.</p>
        </div>
        <div>
          <h4>Navigate</h4>
          <div className="f-links">
            <Link href="/">Home</Link>
            <Link href="/writing">Writing</Link>
            <Link href="/medical-topics">Medical Topics</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/ai-safety">AI Safety</Link>
            <Link href="/about">About</Link>
            <Link href="/now">Now</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4>Elsewhere</h4>
          <div className="f-links">
            <a href="mailto:dr@omeratli.com">dr@omeratli.com</a>
            <a href="https://www.linkedin.com/in/dromeratli" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="/feed.xml">RSS</a>
          </div>
        </div>
      </div>
      <p className="disclaimer">{DISCLAIMER}</p>
      <div className="copyright">
        <span>&copy; {new Date().getFullYear()} Omer Atli</span>
        <span>GMC (UK) 8126471</span>
      </div>
    </footer>
  )
}
