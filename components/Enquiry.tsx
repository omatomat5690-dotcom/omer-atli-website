/**
 * A quiet professional-enquiries line. Replaces the old newsletter band —
 * no signup CTA, just a way to reach the author.
 */
export default function Enquiry() {
  return (
    <div className="reveal" style={{ textAlign: 'center', paddingTop: 16 }}>
      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          letterSpacing: '0.04em',
          color: 'var(--ink-faint)',
        }}
      >
        For professional enquiries —{' '}
        <a href="mailto:dr@omeratli.com" style={{ color: 'var(--accent-deep)' }}>
          dr@omeratli.com
        </a>
      </p>
    </div>
  )
}
