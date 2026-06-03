import { Mail } from 'lucide-react'

/**
 * Email signup. Set NEWSLETTER_ACTION_URL (in Vercel env) to your provider's
 * form-POST endpoint to enable the inline form — e.g. Buttondown:
 *   https://buttondown.email/api/emails/embed-subscribe/<username>
 * Until that's set, it falls back to a "subscribe by email" link that works today.
 */
const ACTION = process.env.NEWSLETTER_ACTION_URL

export default function NewsletterSignup() {
  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-lg p-6 md:p-8">
      <h2 className="font-sans font-semibold text-text-heading text-lg mb-1">
        Get new essays by email
      </h2>
      <p className="text-text-muted text-sm leading-relaxed mb-5 max-w-prose">
        Occasional writing on healthcare AI, emergency medicine, and clinical
        safety. No spam — unsubscribe anytime.
      </p>

      {ACTION ? (
        <form
          action={ACTION}
          method="post"
          target="_blank"
          className="flex flex-col sm:flex-row gap-3 max-w-md"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="flex-1 font-sans text-sm bg-bg-elevated border border-border-strong rounded-md px-3 py-2.5 text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="font-sans font-medium text-sm bg-accent text-bg-primary rounded-md px-5 py-2.5 hover:bg-accent-hover transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>
      ) : (
        <a
          href="mailto:dr@omeratli.com?subject=Subscribe%20to%20new%20essays"
          className="inline-flex items-center gap-2 font-sans font-medium text-sm text-accent hover:text-accent-hover transition-colors duration-200"
        >
          <Mail size={16} />
          Email me to subscribe
        </a>
      )}
    </div>
  )
}
