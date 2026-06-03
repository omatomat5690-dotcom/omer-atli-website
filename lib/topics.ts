import { getAllArticles, type ArticleMeta } from '@/lib/articles'

export interface Topic {
  slug: string
  /** Display title used on the homepage pillar and the topic page. */
  title: string
  description: string
  /** Article `theme` frontmatter values that belong to this topic. */
  themes: string[]
}

/**
 * Editorial pillars. Each maps to one or more article `theme` values, so the
 * broad homepage themes can link to a filtered list without renaming articles.
 */
export const topics: Topic[] = [
  {
    slug: 'healthcare-ai',
    title: 'Healthcare AI',
    description:
      'On scribes, co-pilots, hallucinations, and the gap between healthcare AI marketing and clinical workflow.',
    themes: ['Healthcare AI'],
  },
  {
    slug: 'emergency-medicine',
    title: 'Emergency Medicine Thinking',
    description:
      'On uncertainty, pattern recognition, and what frontline medicine teaches about risk.',
    themes: ['Emergency Medicine'],
  },
  {
    slug: 'clinical-safety',
    title: 'Clinical Safety & Digital Health',
    description:
      'On telemedicine governance, prescribing risk, and what safety thinking should actually look like in healthtech.',
    themes: ['Clinical Safety'],
  },
  {
    slug: 'medical-writing',
    title: 'Medical Writing & Evidence',
    description:
      'On reading papers, appraising claims, and writing clearly about complicated science.',
    themes: ['Medical Writing', 'Evidence'],
  },
  {
    slug: 'future-of-medicine',
    title: 'Future of Medicine',
    description:
      'On where the profession is heading — AI reordering the workflow, the return of the generalist, and what the job becomes.',
    themes: ['Future of Medicine'],
  },
]

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug)
}

export function getArticlesForTopic(topic: Topic): ArticleMeta[] {
  return getAllArticles().filter((a) => topic.themes.includes(a.theme))
}
