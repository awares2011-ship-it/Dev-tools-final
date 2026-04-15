import type { Metadata } from 'next'
import { BLOGS } from '@/lib/blogs'
import BlogCard from '@/components/BlogCard'
import AdBanner from '@/components/AdBanner'

export const metadata: Metadata = {
  title: 'Blog — Developer Guides, SEO Tips & Tool Tutorials',
  description: 'In-depth articles, tutorials, and guides for developers, writers, and SEO professionals. Learn how to use every tool effectively.',
  alternates: { canonical: 'https://toolhubpro.com/blog' },
}

const GREEN_SHADES = ['#16a34a','#059669','#0d9488','#15803d','#4ade80','#34d399']

export default function BlogPage() {
  const categories = [...new Set(BLOGS.map(b => b.category))]
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
          {['Articles','&','Guides'].map((w,i)=>(
            <span key={i} className="mr-2" style={i%2===0?{color:GREEN_SHADES[i]}:{}}>{w}</span>
          ))}
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto font-medium">Deep dives, tutorials, and expert tips for developers, writers, and SEO professionals.</p>
      </div>
      <AdBanner slot="blog-top" format="horizontal" className="mb-8" />
      {categories.map(cat => {
        const catBlogs = BLOGS.filter(b => b.category === cat)
        return (
          <section key={cat} className="mb-12">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full inline-block bg-green-500"/>
              {cat}
              <span className="text-gray-400 font-normal text-sm">({catBlogs.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {catBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
            </div>
          </section>
        )
      })}
      <AdBanner slot="blog-bottom" format="horizontal" className="mt-8" />
    </div>
  )
}
