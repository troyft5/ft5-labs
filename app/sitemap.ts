import { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/blog'
import { industriesData, solutionsData } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://fintech5group.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/get-your-savings-estimate`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const blogPages: MetadataRoute.Sitemap = getSortedPostsData().map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const industryPages: MetadataRoute.Sitemap = Object.keys(industriesData).map(slug => ({
    url: `${base}/industries/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const solutionPages: MetadataRoute.Sitemap = Object.keys(solutionsData).map(slug => ({
    url: `${base}/solutions/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages, ...industryPages, ...solutionPages]
}
