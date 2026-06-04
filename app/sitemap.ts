import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'
import { topics } from '@/lib/topics'
import { medicalCategories, getAllMedicalArticles } from '@/lib/medical'

const BASE = 'https://omeratli.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/writing`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/publications`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/now`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.4 },
  ]

  const topicRoutes: MetadataRoute.Sitemap = topics.map((t) => ({
    url: `${BASE}/topics/${t.slug}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/writing/${a.slug}`,
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const medicalRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/medical-topics`, changeFrequency: 'weekly', priority: 0.8 },
    ...medicalCategories.map((c) => ({
      url: `${BASE}/medical-topics/${c.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...getAllMedicalArticles().map((a) => ({
      url: `${BASE}/medical-topics/${a.category}/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]

  return [...staticRoutes, ...topicRoutes, ...articleRoutes, ...medicalRoutes]
}
