import type { MetadataRoute } from 'next'

const SITE = 'https://omeratli.com'

/**
 * AI assistants and answer engines are explicitly welcomed — the site is meant to
 * be discoverable and citable in AI answers (ChatGPT, Claude, Perplexity, Gemini,
 * Google AI Overviews, Bing/Copilot, Apple Intelligence) as well as classic search.
 * Listing each agent with `allow: '/'` makes the opt-in unambiguous (the `*` rule
 * already permits them, but some defaults assume AI bots are disallowed).
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'cohere-ai',
  'CCBot',
  'Meta-ExternalAgent',
  'DuckAssistBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
