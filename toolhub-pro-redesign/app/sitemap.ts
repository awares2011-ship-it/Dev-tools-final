import { MetadataRoute } from 'next'
import { TOOLS } from '@/lib/tools'
import { BLOGS } from '@/lib/blogs'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://toolhubpro.com'
  const tools = TOOLS.map(t => ({ url: `${base}/tools/${t.id}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }))
  const blogs = BLOGS.map(b => ({ url: `${base}/blog/${b.id}`, lastModified: new Date(b.publishDate), changeFrequency: 'monthly' as const, priority: 0.7 }))
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...tools, ...blogs,
  ]
}
