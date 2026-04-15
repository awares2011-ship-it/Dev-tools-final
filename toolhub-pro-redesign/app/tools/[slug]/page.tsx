import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TOOLS, getToolById, getRelatedTools } from '@/lib/tools'
import { BLOGS, getBlogsByTool } from '@/lib/blogs'
import AdBanner from '@/components/AdBanner'
import FAQSection from '@/components/FAQSection'
import ToolCard from '@/components/ToolCard'
import BlogCard from '@/components/BlogCard'
import ToolEngine from '@/components/tools/ToolEngine'

export function generateStaticParams() {
  return TOOLS.map(t => ({ slug: t.id }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = getToolById(params.slug)
  if (!tool) return {}
  const title = `Free ${tool.name} Online — No Signup Required`
  return {
    title,
    description: `${tool.longDesc.slice(0, 155)}…`,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} | ToolHub Pro — Free Online Tools`,
      description: tool.shortDesc,
      type: 'website',
      url: `https://toolhubpro.com/tools/${tool.id}`,
    },
    twitter: { card: 'summary_large_image', title, description: tool.shortDesc },
    alternates: { canonical: `https://toolhubpro.com/tools/${tool.id}` },
  }
}

const CAT_ACCENT: Record<string,{color:string;bg:string}> = {
  developer:  {color:'#ea580c', bg:'#fff7ed'},
  text:       {color:'#16a34a', bg:'#f0fdf4'},
  security:   {color:'#ea580c', bg:'#fff7ed'},
  seo:        {color:'#16a34a', bg:'#f0fdf4'},
  converters: {color:'#ea580c', bg:'#fff7ed'},
  utility:    {color:'#16a34a', bg:'#f0fdf4'},
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolById(params.slug)
  if (!tool) notFound()
  const related = getRelatedTools(tool)
  const blogs = getBlogsByTool(tool.id)
  const catTools = TOOLS.filter(t => t.id !== tool.id && t.category === tool.category).slice(0, 4)
  const ac = CAT_ACCENT[tool.category] ?? CAT_ACCENT.developer

  const schema = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: tool.name, description: tool.longDesc,
    url: `https://toolhubpro.com/tools/${tool.id}`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: tool.keywords.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <nav className="breadcrumb mb-6">
          <Link href="/">Home</Link><span>/</span>
          <Link href={`/tools/category/${tool.category}`} style={{color:ac.color}}>{tool.category}</Link>
          <span>/</span>
          <span className="text-gray-700">{tool.name}</span>
        </nav>

        {/* Tool header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{tool.icon}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900" style={{fontFamily:'Poppins,sans-serif'}}>
              Free {tool.name} Online
            </h1>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{background:ac.bg, color:ac.color, borderColor:ac.color+'40'}}>Free</span>
          </div>
          <p className="text-gray-600 max-w-2xl font-medium text-sm">{tool.longDesc}</p>
          <p className="text-xs text-gray-400 mt-2">🔒 All processing runs locally in your browser. No data is uploaded.</p>
        </div>

        {/* Top ad */}
        <AdBanner slot="tool-top" format="horizontal" className="mb-6" />

        {/* Two-column layout: tool + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

          {/* Main tool */}
          <div>
            <ToolEngine toolId={tool.id} accent={ac.color} />
          </div>

          {/* Sticky sidebar */}
          <aside className="flex flex-col gap-4 sticky-sidebar self-start">

            {/* Sidebar ad — sticky */}
            <AdBanner slot="tool-sidebar" format="rectangle" />

            {/* Related tools */}
            {related.length > 0 && (
              <div className="tool-box">
                <h3 className="font-bold text-sm text-gray-900 mb-3">🔗 Related Tools</h3>
                {related.map(rt => {
                  const rac = CAT_ACCENT[rt.category] ?? CAT_ACCENT.developer
                  return (
                    <Link key={rt.id} href={`/tools/${rt.id}`}
                      className="flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors group">
                      <span className="text-base">{rt.icon}</span>
                      <span className="text-sm font-medium text-gray-700 group-hover:transition-colors" style={{}}
                        
                        >
                        {rt.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Keywords / internal links */}
            <div className="tool-box">
              <h3 className="font-bold text-sm text-gray-900 mb-3">🏷️ Keywords</h3>
              <div className="flex flex-wrap gap-1.5">
                {tool.keywords.map(k => (
                  <span key={k} className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                    style={{background:ac.bg, color:ac.color}}>{k}</span>
                ))}
              </div>
            </div>

            {/* Category link */}
            <Link href={`/tools/category/${tool.category}`}
              className="tool-box block hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <h3 className="font-bold text-sm mb-1" style={{color:ac.color}}>🗂️ Browse {tool.category} Tools</h3>
              <p className="text-xs text-gray-500">See all {TOOLS.filter(t=>t.category===tool.category).length} tools in this category</p>
            </Link>
          </aside>
        </div>

        {/* Post-tool ad (high CTR zone) */}
        <AdBanner slot="tool-after" format="horizontal" className="mt-8" />

        {/* SEO content + FAQ */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 seo-prose">
            <h2>What is {tool.name}?</h2>
            <p>{tool.longDesc}</p>
            <p>This tool runs entirely in your browser — your data is <strong>never</strong> sent to any server. 100% private, works offline after first load.</p>

            <h2>How to Use {tool.name}</h2>
            <p>Paste or type your input, click the action button, and results appear instantly. Copy the output to clipboard or download as a file.</p>
            <ul>
              <li>No installation or plugins required</li>
              <li>Works on all modern browsers (Chrome, Firefox, Safari, Edge)</li>
              <li>Mobile-friendly responsive design</li>
              <li>Process unlimited data — no rate limits</li>
              <li>Free forever — no account or payment needed</li>
            </ul>

            <h2>Frequently Asked Questions about {tool.name}</h2>
            <FAQSection faqs={tool.faqs} toolName={tool.name} />

            {/* Internal links */}
            <div className="mt-6 p-4 rounded-2xl border" style={{background:ac.bg, borderColor:ac.color+'30'}}>
              <p className="text-sm font-semibold mb-2" style={{color:ac.color}}>
                🔗 Explore more {tool.category} tools:
              </p>
              <div className="flex flex-wrap gap-2">
                {TOOLS.filter(t=>t.category===tool.category&&t.id!==tool.id).map(t=>(
                  <Link key={t.id} href={`/tools/${t.id}`}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-gray-100 text-gray-600 hover:text-orange-600 hover:border-orange-200 transition-colors">
                    {t.icon} {t.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="tool-box">
              <h3 className="font-bold text-sm text-gray-900 mb-2">⚡ Quick Facts</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex gap-2"><span style={{color:ac.color}}>✓</span> 100% free, no signup</li>
                <li className="flex gap-2"><span style={{color:ac.color}}>✓</span> Runs in your browser</li>
                <li className="flex gap-2"><span style={{color:ac.color}}>✓</span> No data uploaded</li>
                <li className="flex gap-2"><span style={{color:ac.color}}>✓</span> Mobile-friendly</li>
                <li className="flex gap-2"><span style={{color:ac.color}}>✓</span> No rate limits</li>
              </ul>
            </div>
            <Link href="/" className="tool-box block text-center hover:-translate-y-0.5 transition-transform">
              <p className="font-bold text-sm text-gray-900 mb-1">⚡ ToolHub Pro</p>
              <p className="text-xs text-gray-500">Explore 50+ free tools →</p>
            </Link>
          </div>
        </div>

        {/* Related guides */}
        {blogs.length > 0 && (
          <div className="mt-12">
            <h2 className="section-title mb-5">📚 Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map(b => <BlogCard key={b.id} blog={b} />)}
            </div>
          </div>
        )}

        {/* More tools in category */}
        <div className="mt-12">
          <h2 className="section-title mb-5">🛠️ More {tool.category} Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {catTools.map(t => <ToolCard key={t.id} tool={t} />)}
          </div>
          <div className="text-center mt-6">
            <Link href="/" className="btn btn-ghost">View all 50+ free tools →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
