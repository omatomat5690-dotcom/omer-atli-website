import { getAllArticles, type ArticleMeta } from '@/lib/articles'

export interface Topic {
  slug: string
  /** Display title used on the homepage pillar and the topic page. */
  title: string
  /** Short description — used for metadata and the homepage pillar card. */
  description: string
  /** Longer intro paragraph shown under the H1 on the topic hub. */
  intro: string
  /** 2–3 featured essay slugs shown in the "Start with" row. */
  startWith: string[]
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
    intro:
      'The questions this section keeps returning to: what AI tools actually do in clinical workflow (as opposed to what the marketing says), where transcription ends and reasoning would have to begin, and who carries the consequences when a model is wrong.',
    startWith: [
      'ai-scribes-are-not-the-endgame',
      'the-emergency-department-test-for-medical-ai',
      'the-problem-with-symptom-checkers',
    ],
    themes: ['Healthcare AI'],
  },
  {
    slug: 'emergency-medicine',
    title: 'Emergency Medicine Thinking',
    description:
      'On uncertainty, pattern recognition, and what frontline medicine teaches about risk.',
    intro:
      'Emergency medicine is a discipline of decision-making under uncertainty — incomplete information, time pressure, and asymmetric stakes. Most of what this section covers travels well beyond the emergency department.',
    startWith: [
      'why-vague-symptoms-are-where-medicine-gets-dangerous',
      'chest-pain-is-a-trapdoor',
      'why-doctors-miss-pulmonary-embolism',
    ],
    themes: ['Emergency Medicine'],
  },
  {
    slug: 'clinical-safety',
    title: 'Clinical Safety & Digital Health',
    description:
      'On telemedicine governance, prescribing risk, and what safety thinking should actually look like in healthtech.',
    intro:
      'Clinical safety in digital health is too often a folder of documents produced to be filed. This section is about the real thing: hazards as specific failure paths, mitigations that change the product, and safety cases that can be argued with.',
    startWith: [
      'clinical-safety-is-not-a-checkbox',
      'hazard-is-not-risk',
      'the-confident-wrong-answer',
    ],
    themes: ['Clinical Safety'],
  },
  {
    slug: 'medical-writing',
    title: 'Medical Writing & Evidence',
    description:
      'On reading papers, appraising claims, and writing clearly about complicated science.',
    intro:
      'How to read studies without being misled, how to weigh claims, and how to write about medicine clearly — for anyone who reads health content, not only people who produce it.',
    startWith: [
      'how-to-read-a-medical-paper',
      'medical-content-review-accuracy-is-not-enough',
      'the-nhs-tone',
    ],
    themes: ['Medical Writing', 'Evidence'],
  },
  {
    slug: 'future-of-medicine',
    title: 'Future of Medicine',
    description:
      'On where the profession is heading — AI reordering the workflow, the return of the generalist, and what the job becomes.',
    intro:
      'Where the profession is heading as AI starts operating on clinical language and reasoning — what changes, what doesn’t, and what the job becomes.',
    startWith: [
      'why-doctors-need-to-understand-ai',
      'the-future-doctor-clinician-editor-systems-thinker',
      'the-return-of-the-medical-generalist',
    ],
    themes: ['Future of Medicine'],
  },
]

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug)
}

export function getArticlesForTopic(topic: Topic): ArticleMeta[] {
  return getAllArticles().filter((a) => topic.themes.includes(a.theme))
}
