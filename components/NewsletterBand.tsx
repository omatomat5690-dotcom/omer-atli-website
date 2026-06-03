/**
 * Dark newsletter band with an animated node-network canvas (driven by SiteEffects).
 * Inline form activates when NEWSLETTER_ACTION_URL is set; otherwise an email CTA.
 */
const ACTION = process.env.NEWSLETTER_ACTION_URL

export default function NewsletterBand() {
  return (
    <div className="news reveal">
      <canvas className="news-bg" id="news-canvas" aria-hidden="true" />
      <div className="kicker" style={{ color: 'var(--accent-glow)' }}>
        Get new essays by email
      </div>
      <h2 style={{ marginTop: 14 }}>
        Occasional writing,
        <br />
        never noise.
      </h2>
      <p>
        Healthcare AI, emergency medicine, and clinical safety — sent when there&rsquo;s something
        worth your time. No spam, unsubscribe anytime.
      </p>
      <div className="news-cta">
        {ACTION ? (
          <form action={ACTION} method="post" target="_blank" className="news-cta" style={{ width: '100%' }}>
            <label htmlFor="news-email" className="sr-only">
              Email address
            </label>
            <input id="news-email" type="email" name="email" required placeholder="you@example.com" />
            <button type="submit" className="btn btn-accent">
              Subscribe <span className="arr">→</span>
            </button>
          </form>
        ) : (
          <>
            <a
              className="btn btn-accent"
              data-magnetic="0.25"
              href="mailto:dr@omeratli.com?subject=Subscribe%20to%20new%20essays"
            >
              Email me to subscribe <span className="arr">→</span>
            </a>
            <a
              className="btn btn-ghost"
              style={{ color: 'var(--paper)', borderColor: 'oklch(0.99 0.01 80 / 0.25)' }}
              href="https://www.linkedin.com/in/omer-atli-968a2a3a6"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </>
        )}
      </div>
      <small>For professional enquiries — dr@omeratli.com</small>
    </div>
  )
}
