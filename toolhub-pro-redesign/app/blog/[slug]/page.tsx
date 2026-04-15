import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BLOGS, getBlogById, getRelatedBlogs } from '@/lib/blogs'
import { TOOLS, getToolById } from '@/lib/tools'
import { ACCENT_HEX } from '@/lib/colors'
import BlogCard from '@/components/BlogCard'
import ToolCard from '@/components/ToolCard'
import AdBanner from '@/components/AdBanner'

export function generateStaticParams() {
  return BLOGS.map(b => ({ slug: b.id }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const blog = getBlogById(params.slug)
  if (!blog) return {}
  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.tags,
    openGraph: { title: blog.title, description: blog.description, type: 'article' },
    alternates: { canonical: `https://toolhubpro.com/blog/${blog.id}` },
  }
}

const GREEN_SHADES = ['#16a34a','#059669','#0d9488','#15803d','#4ade80','#34d399']

function ColorizedTitle({ title }: { title: string }) {
  const words = title.split(' ')
  return (
    <>
      {words.map((w, i) => (
        <span key={i} style={i%2===0?{color:GREEN_SHADES[Math.floor(i/2)%GREEN_SHADES.length]}:{}} className={i%2===0?'font-extrabold':''}>
          {w}{' '}
        </span>
      ))}
    </>
  )
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>)
    } else if (line.startsWith('```')) {
      const lang = line.slice(3)
      i++
      const codeLines: string[] = []
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]); i++
      }
      elements.push(<pre key={i}><code>{codeLines.join('\n')}</code></pre>)
    } else if (line.startsWith('- ')) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2)); i++
      }
      elements.push(<ul key={i}>{listItems.map((li, j) => <li key={j} dangerouslySetInnerHTML={{__html: li.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`(.+?)`/g,'<code>$1</code>')}} />)}</ul>)
      continue
    } else if (line.match(/^\|.+\|$/)) {
      const rows: string[][] = []
      while (i < lines.length && lines[i].match(/^\|.+\|$/)) {
        if (!lines[i].match(/^\|[-|: ]+\|$/)) {
          rows.push(lines[i].split('|').filter(Boolean).map(c => c.trim()))
        }
        i++
      }
      if (rows.length > 0) {
        elements.push(
          <table key={i}>
            <thead><tr>{rows[0].map((h,j)=><th key={j}>{h}</th>)}</tr></thead>
            <tbody>{rows.slice(1).map((r,j)=><tr key={j}>{r.map((c,k)=><td key={k}>{c}</td>)}</tr>)}</tbody>
          </table>
        )
      }
      continue
    } else if (line.trim()) {
      const html = line
        .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
        .replace(/`(.+?)`/g,'<code>$1</code>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2">$1</a>')
      elements.push(<p key={i} dangerouslySetInnerHTML={{__html: html}} />)
    }
    i++
  }
  return elements
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = getBlogById(params.slug)
  if (!blog) notFound()
  const relatedBlogs = getRelatedBlogs(blog)
  const tool = getToolById(blog.relatedTool)
  const accent = '#16a34a'
  const relatedTools = tool ? [tool, ...TOOLS.filter(t=>t.id!==tool.id&&t.category===tool.category).slice(0,2)] : []

  const schema = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: blog.title, description: blog.description,
    datePublished: blog.publishDate,
    author: { '@type': 'Organization', name: 'ToolHub Pro' },
    publisher: { '@type': 'Organization', name: 'ToolHub Pro', url: 'https://toolhubpro.com' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main */}
          <article>
            <nav className="breadcrumb mb-4">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/blog">Blog</Link><span>/</span>
              <span className="text-green-600">{blog.category}</span>
            </nav>
            <header className="mb-8 pb-6 border-b border-gray-200">
              <div className="text-xs font-bold uppercase tracking-widest mb-2 text-green-600">{blog.category}</div>
              <h1 className="font-['Lora',serif] text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3 text-gray-900">
                <ColorizedTitle title={blog.title} />
              </h1>
              <p className="text-gray-500 text-base mb-4 font-medium">{blog.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span>📖 {blog.readTime} min read</span>
                <span>🗓️ {blog.publishDate}</span>
                <span className="text-green-600">✍️ ToolHub Pro</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {blog.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium bg-green-50 text-green-700 border border-green-100">{tag}</span>
                ))}
              </div>
            </header>
            <AdBanner slot="blog-post-top" format="horizontal" className="mb-8" />
            {tool && (
              <div className="highlight-box mb-6">
                💡 <strong>Quick tip:</strong> Try our free{' '}
                <Link href={`/tools/${tool.id}`} className="font-bold underline text-green-700">{tool.name}</Link>
                {' '}— no signup required, works instantly in your browser.
              </div>
            )}
            <div className="blog-body">
              {renderContent(blog.content)}
            </div>
            <AdBanner slot="blog-post-mid" format="horizontal" className="my-8" />
            {tool && (
              <div className="text-center my-10 py-8 border border-gray-200 rounded-xl bg-green-50">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Try {tool.name} Free</h3>
                <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">{tool.shortDesc}</p>
                <Link href={`/tools/${tool.id}`} className="btn-primary btn">
                  Open Tool →
                </Link>
              </div>
            )}
            {relatedBlogs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-lg font-bold text-gray-900 mb-5">📚 Related Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedBlogs.map(b => <BlogCard key={b.id} blog={b} />)}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            {tool && (
              <div className="tool-box sticky top-20">
                <h3 className="font-bold text-sm text-gray-900 mb-3">🛠️ Featured Tool</h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{tool.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{tool.shortDesc}</div>
                  </div>
                </div>
                <Link href={`/tools/${tool.id}`} className="btn-primary btn w-full justify-center">
                  Try for Free →
                </Link>
              </div>
            )}
            <AdBanner slot="blog-sidebar" format="rectangle" />
            {relatedTools.length > 0 && (
              <div className="tool-box">
                <h3 className="font-bold text-sm text-gray-900 mb-3">🔗 Related Tools</h3>
                <div className="space-y-1">
                  {relatedTools.map(rt => (
                    <Link key={rt.id} href={`/tools/${rt.id}`} className="flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors group">
                      <span>{rt.icon}</span>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">{rt.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="tool-box">
              <h3 className="font-bold text-sm text-gray-900 mb-3">📝 More Articles</h3>
              {BLOGS.filter(b=>b.id!==blog.id).slice(0,5).map(b => (
                <Link key={b.id} href={`/blog/${b.id}`} className="flex items-start gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors group">
                  <span className="text-gray-400 mt-0.5 shrink-0 text-xs">→</span>
                  <span className="text-xs text-gray-700 group-hover:text-green-600 transition-colors leading-snug">{b.title}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
