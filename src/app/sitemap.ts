import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/markdown'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, priority: 1, changeFrequency: 'weekly', lastModified: new Date() },
    { url: `${baseUrl}/atlas`, priority: 0.9, changeFrequency: 'daily', lastModified: new Date() },
    { url: `${baseUrl}/explore`, priority: 0.7, changeFrequency: 'daily', lastModified: new Date() },
    { url: `${baseUrl}/agency`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${baseUrl}/about`, priority: 0.4, changeFrequency: 'monthly', lastModified: new Date() },
  ]

  const articles = await getAllArticles()
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/atlas/${a.frontmatter.type === 'dialogue' ? 'dialogue' : a.frontmatter.type === 'book' ? 'books' : 'monologue'}/${a.slug}`,
    lastModified: new Date(a.frontmatter.date || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...articleRoutes]
}

