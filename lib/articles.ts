import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export interface ArticleMeta {
  title: string
  subtitle?: string
  slug: string
  date: string
  updated?: string
  theme: string
  readingTime: string
  author: string
  description: string
  coverImage?: string
  coverAlt?: string
  featured: boolean
  clinicalAdjacent: boolean
}

export interface Article extends ArticleMeta {
  content: string
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []

  const files = fs.readdirSync(ARTICLES_DIR)

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const filePath = path.join(ARTICLES_DIR, file)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(source)
      const stats = readingTime(content)

      return {
        ...data,
        slug,
        readingTime: stats.text,
      } as ArticleMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  const stats = readingTime(content)

  return {
    ...data,
    slug,
    content,
    readingTime: stats.text,
  } as Article
}

export function getArticlesByTheme(theme: string): ArticleMeta[] {
  return getAllArticles().filter((article) => article.theme === theme)
}

export function getFeaturedArticles(limit = 3): ArticleMeta[] {
  return getAllArticles()
    .filter((article) => article.featured)
    .slice(0, limit)
}

/** Other essays sharing this article's theme — for in-pillar internal linking. */
export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const all = getAllArticles()
  const current = all.find((a) => a.slug === slug)
  if (!current) return []
  return all.filter((a) => a.theme === current.theme && a.slug !== slug).slice(0, limit)
}
