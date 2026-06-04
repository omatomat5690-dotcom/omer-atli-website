import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const MEDICAL_DIR = path.join(process.cwd(), 'content/medical')

export interface MedicalCategory {
  slug: string
  title: string
  /** Short one-liner used on cards. */
  description: string
  /** Longer editorial intro used on the category landing page. */
  intro: string
}

/**
 * The seven Medical Topics categories. Order here is the display order on the
 * section landing page. Each article's `category` frontmatter must match one
 * of these slugs.
 */
export const medicalCategories: MedicalCategory[] = [
  {
    slug: 'metabolic-health',
    title: 'Metabolic Health',
    description:
      'Type 2 diabetes, prediabetes, HbA1c, and insulin resistance — what the numbers mean and what actually changes them.',
    intro:
      'Plain, evidence-based explanations of the conditions and numbers at the centre of metabolic health — written to help you understand, not to diagnose.',
  },
  {
    slug: 'weight-loss-medicines',
    title: 'Weight Loss Medicines',
    description:
      'GLP-1s, dual incretins, and obesity medicine — how they work, what they don’t do, and the safety that gets skipped.',
    intro:
      'How the new generation of weight-loss medicines actually work, where their limits are, and the honest safety picture. Education, not prescription.',
  },
  {
    slug: 'menopause-and-hormones',
    title: 'Menopause & Hormones',
    description:
      'Menopause, perimenopause, HRT, and the symptoms that quietly go untreated.',
    intro:
      'What is actually happening through the menopause transition, how to weigh the evidence on HRT, and the problems that too often go unmentioned.',
  },
  {
    slug: 'hair-loss',
    title: 'Hair Loss',
    description:
      'Why hair falls out — and an honest read on finasteride, minoxidil, and the treatments worth understanding.',
    intro:
      'A doctor’s map of why hair is lost and what the evidence says about the common treatments, before anyone reaches a checkout page.',
  },
  {
    slug: 'supplements-and-longevity',
    title: 'Supplements & Longevity',
    description:
      'Evidence-based only — what genuinely helps, and what is marketing dressed up as science.',
    intro:
      'The supplements and longevity ideas with real evidence behind them, separated honestly from the much larger world of claims that don’t.',
  },
  {
    slug: 'heart-risk',
    title: 'Heart Risk',
    description:
      'Blood pressure, cholesterol, statins, and how cardiovascular risk really adds up.',
    intro:
      'The quiet, accumulating risks at the heart of cardiovascular health — blood pressure, cholesterol, and the risk scores behind the conversations.',
  },
  {
    slug: 'medical-content-review',
    title: 'Medical Content Review',
    description:
      'How a doctor reviews health content — and why “medically reviewed” should mean something.',
    intro:
      'The invisible work behind trustworthy health writing: what clinical review actually checks, and how to spot content that hasn’t had it.',
  },
]

export interface MedicalArticleMeta {
  title: string
  subtitle?: string
  slug: string
  category: string
  order: number
  date: string
  author: string
  description: string
  featured: boolean
  readingTime: string
}

export interface MedicalArticle extends MedicalArticleMeta {
  content: string
}

export function getAllMedicalArticles(): MedicalArticleMeta[] {
  if (!fs.existsSync(MEDICAL_DIR)) return []

  return fs
    .readdirSync(MEDICAL_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const source = fs.readFileSync(path.join(MEDICAL_DIR, file), 'utf8')
      const { data, content } = matter(source)
      return {
        ...data,
        slug,
        readingTime: readingTime(content).text,
      } as MedicalArticleMeta
    })
    .sort((a, b) => a.order - b.order)
}

export function getMedicalArticleBySlug(slug: string): MedicalArticle | null {
  const filePath = path.join(MEDICAL_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  return {
    ...data,
    slug,
    content,
    readingTime: readingTime(content).text,
  } as MedicalArticle
}

export function getMedicalCategory(slug: string): MedicalCategory | undefined {
  return medicalCategories.find((c) => c.slug === slug)
}

export function getMedicalArticlesByCategory(categorySlug: string): MedicalArticleMeta[] {
  return getAllMedicalArticles()
    .filter((a) => a.category === categorySlug)
    .sort((a, b) => a.order - b.order)
}

export function getFeaturedMedical(limit = 3): MedicalArticleMeta[] {
  return getAllMedicalArticles()
    .filter((a) => a.featured)
    .slice(0, limit)
}

/** Number of articles in each category, keyed by category slug. */
export function getMedicalCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const a of getAllMedicalArticles()) {
    counts[a.category] = (counts[a.category] || 0) + 1
  }
  return counts
}
