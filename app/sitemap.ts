import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

const BASE = 'https://omeratli.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/writing`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.4 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/writing/${a.slug}`,
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}
