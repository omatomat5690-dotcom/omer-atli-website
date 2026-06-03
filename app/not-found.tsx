import Link from 'next/link'

export default function NotFound() {
  return (
    <section
      className="page-hero wrap"
      style={{ textAlign: 'center', paddingBottom: 'clamp(64px, 10vw, 128px)' }}
    >
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--accent-deep)',
        }}
      >
        404
      </div>
      <h1>Page not found</h1>
      <p className="lead serif" style={{ margin: '18px auto 34px', maxWidth: '40ch' }}>
        This page doesn&rsquo;t exist — it may have moved.
      </p>
      <Link className="btn btn-primary" href="/">
        Back to home <span className="arr">→</span>
      </Link>
    </section>
  )
}
