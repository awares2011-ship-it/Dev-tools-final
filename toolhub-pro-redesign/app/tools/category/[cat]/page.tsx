import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TOOLS, CATEGORIES, getToolsByCategory, type ToolCategory } from '@/lib/tools'
import AdBanner from '@/components/AdBanner'
import ToolCard from '@/components/ToolCard'

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ cat: c.id }))
}

export function generateMetadata({ params }: { params: { cat: string } }): Metadata {
  const cat = CATEGORIES.find(c => c.id === params.cat)
  if (!cat) return {}
  const titles: Record<string,string> = {
    developer:  'Free Online Developer Tools — JSON, Base64, Regex & More',
    text:       'Free Online Text Tools — Word Counter, Case Converter & More',
    security:   'Free Online Security Tools — Password Generator, Hash Generator',
    seo:        'Free Online SEO Tools — Meta Tags, Sitemap, Keyword Density',
    converters: 'Free Online Converter Tools — CSV to JSON, Unit Converter',
    utility:    'Free Online Utility Tools — Color Converter, CSS Gradient & More',
  }
  const descs: Record<string,string> = {
    developer:  'Free browser-based developer tools: JSON formatter, Base64 encoder, URL encoder, JWT decoder, regex tester, and more. No signup required.',
    text:       'Free text tools online: word counter, case converter, slug generator, text compare, line sorter, and more. Fast and private.',
    security:   'Free online security tools: password generator, SHA-256 & MD5 hash generators, AES-256 encryption, UUID generator. 100% browser-based.',
    seo:        'Free SEO tools: meta tag generator, keyword density checker, sitemap generator, robots.txt generator, Open Graph tag builder.',
    converters: 'Free online converters: CSV to JSON, JSON to CSV, unit converter, timezone converter, number base converter. No signup needed.',
    utility:    'Free utility tools: hex to RGB, CSS gradient generator, image to Base64, color palette, percentage calculator. All browser-based.',
  }
  const title = titles[params.cat] ?? `Free ${cat.name} — ToolHub Pro`
  return {
    title,
    description: descs[params.cat] ?? cat.desc,
    keywords: TOOLS.filter(t=>t.category===params.cat).flatMap(t=>t.keywords).slice(0,10),
    openGraph: { title, description: descs[params.cat] ?? cat.desc, type: 'website' },
    alternates: { canonical: `https://toolhubpro.com/tools/category/${params.cat}` },
  }
}

const CAT_ACCENT: Record<string,{color:string;bg:string;grad:string}> = {
  developer:  {color:'#ea580c', bg:'#fff7ed', grad:'linear-gradient(135deg,#f97316,#ea580c)'},
  text:       {color:'#16a34a', bg:'#f0fdf4', grad:'linear-gradient(135deg,#22c55e,#16a34a)'},
  security:   {color:'#ea580c', bg:'#fff7ed', grad:'linear-gradient(135deg,#f97316,#ea580c)'},
  seo:        {color:'#16a34a', bg:'#f0fdf4', grad:'linear-gradient(135deg,#22c55e,#16a34a)'},
  converters: {color:'#ea580c', bg:'#fff7ed', grad:'linear-gradient(135deg,#f97316,#ea580c)'},
  utility:    {color:'#16a34a', bg:'#f0fdf4', grad:'linear-gradient(135deg,#22c55e,#16a34a)'},
}

const CAT_DESCRIPTIONS: Record<string,string> = {
  developer:  'Powerful browser-based tools for developers. Format JSON, encode Base64, test regex, decode JWT, and convert data formats — all running locally in your browser with zero data upload.',
  text:       'Essential text processing tools for writers, bloggers, and content creators. Count words, convert case, remove duplicates, sort lines, compare text, and generate placeholder content.',
  security:   'Stay secure online with our browser-based security toolkit. Generate cryptographically strong passwords, compute MD5/SHA-256 hashes, and encrypt messages — all client-side.',
  seo:        'Boost your website rankings with free SEO tools. Generate meta tags, analyze keyword density, create XML sitemaps, and build robots.txt files for any website.',
  converters: 'Convert between any format instantly. Transform CSV to JSON, JSON to CSV, convert measurement units, number bases, and world timezones — all free and private.',
  utility:    'Creative and utility tools for designers and developers. Convert hex to RGB, generate CSS gradients, encode images to Base64, and calculate percentages.',
}

export default function CategoryPage({ params }: { params: { cat: string } }) {
  const cat = CATEGORIES.find(c => c.id === params.cat)
  if (!cat) notFound()
  const tools = getToolsByCategory(params.cat as ToolCategory)
  const ac = CAT_ACCENT[params.cat] ?? CAT_ACCENT.developer

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="breadcrumb mb-6">
        <Link href="/">Home</Link><span>/</span>
        <span style={{color:ac.color}}>{cat.name}</span>
      </nav>

      {/* Category header */}
      <div className="rounded-2xl p-8 mb-8 border" style={{background:ac.bg, borderColor:ac.color+'30'}}>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl">{cat.icon}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{fontFamily:'Poppins,sans-serif'}}>
              {tools.length} Free {cat.name} Online
            </h1>
            <p className="text-gray-500 text-sm mt-1">{CAT_DESCRIPTIONS[params.cat] ?? cat.desc}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/50 bg-white/70 text-gray-600">
            ✅ {tools.length} tools available
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/50 bg-white/70 text-gray-600">
            🔒 100% browser-based
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/50 bg-white/70 text-gray-600">
            🆓 Always free
          </span>
        </div>
      </div>

      {/* Top ad */}
      <AdBanner slot={`cat-top-${params.cat}`} format="horizontal" className="mb-8" />

      {/* Tool grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
      </div>

      {/* Bottom ad */}
      <AdBanner slot={`cat-bottom-${params.cat}`} format="horizontal" className="mb-10" />

      {/* SEO content */}
      <div className="seo-prose max-w-3xl">
        <h2>About Free {cat.name}</h2>
        <p>{CAT_DESCRIPTIONS[params.cat] ?? cat.desc}</p>
        <p>All tools in this category run entirely in your browser. Your data is never sent to a server, ensuring complete privacy and security. No account registration, no email address, and no credit card required — ever.</p>
        <h2>Popular {cat.name}</h2>
        <ul>
          {tools.slice(0,5).map(t => (
            <li key={t.id}><Link href={`/tools/${t.id}`} style={{color:ac.color}}>{t.name}</Link> — {t.shortDesc}</li>
          ))}
        </ul>
      </div>

      {/* Other categories */}
      <div className="mt-12">
        <h2 className="section-title mb-5">Explore Other Tool Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CATEGORIES.filter(c=>c.id!==params.cat).map(c => {
            const cac = CAT_ACCENT[c.id] ?? CAT_ACCENT.developer
            return (
              <Link key={c.id} href={`/tools/category/${c.id}`}
                className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-all duration-200"
                style={{boxShadow:'0 1px 3px rgba(0,0,0,0.07)'}}>
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500">{TOOLS.filter(t=>t.category===c.id).length} tools</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
