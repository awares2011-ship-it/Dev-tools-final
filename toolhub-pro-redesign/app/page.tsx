'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { TOOLS, CATEGORIES } from '@/lib/tools'
import { BLOGS } from '@/lib/blogs'
import ToolCard from '@/components/ToolCard'
import BlogCard from '@/components/BlogCard'
import AdBanner from '@/components/AdBanner'
import JsonFormatter from '@/components/tools/JsonFormatter'

// Group tools by category for the scrollable section
const TOOL_GROUPS = [
  {
    id: 'developer',
    label: '👨‍💻 Developer Tools',
    seoH2: 'Free Online Developer Tools — JSON, Base64, Regex & More',
    desc: 'Powerful browser-based tools for developers. Format JSON, encode Base64, test regex, decode JWT, and convert data formats — all running locally in your browser.',
    tools: TOOLS.filter(t => t.category === 'developer'),
    icon: '💻',
  },
  {
    id: 'text',
    label: '✍️ Text Tools',
    seoH2: 'Free Online Text Tools — Word Counter, Case Converter & More',
    desc: 'Essential text processing tools for writers, bloggers, and content creators. Count words, convert case, remove duplicates, sort lines, and more.',
    tools: TOOLS.filter(t => t.category === 'text'),
    icon: '✏️',
  },
  {
    id: 'security',
    label: '🔐 Security Tools',
    seoH2: 'Free Online Security Tools — Password Generator, Hash Generator',
    desc: 'Stay secure online with our browser-based security toolkit. Generate strong passwords, compute MD5/SHA-256 hashes, and encrypt messages with AES-256.',
    tools: TOOLS.filter(t => t.category === 'security'),
    icon: '🛡️',
  },
  {
    id: 'seo',
    label: '🔍 SEO Tools',
    seoH2: 'Free Online SEO Tools — Meta Tags, Sitemap Generator & More',
    desc: 'Boost your website rankings with free SEO tools. Generate meta tags, analyze keyword density, create sitemaps, and build robots.txt files.',
    tools: TOOLS.filter(t => t.category === 'seo'),
    icon: '📈',
  },
  {
    id: 'converters',
    label: '🔄 Converter Tools',
    seoH2: 'Free Online Converter Tools — CSV to JSON, Unit & Base Converter',
    desc: 'Convert between any format instantly. Transform CSV to JSON, JSON to CSV, convert units, number bases, and timezones — all free and private.',
    tools: TOOLS.filter(t => t.category === 'converters'),
    icon: '🔄',
  },
  {
    id: 'utility',
    label: '🎨 Utility Tools',
    seoH2: 'Free Online Utility Tools — Color Converter, CSS Gradient & More',
    desc: 'Creative and utility tools for designers and developers. Convert hex to RGB, generate CSS gradients, encode images, and more.',
    tools: TOOLS.filter(t => t.category === 'utility'),
    icon: '🎨',
  },
]

const FAQ_ITEMS = [
  { q: 'How do I use the JSON Formatter?', a: 'Paste your JSON into the left panel, then click "Format JSON" to beautify it. Use "Minify" to compress it, and "Validate" to check for syntax errors. You can also click "Sample JSON" to load an example.' },
  { q: 'Is my data safe? Does it get uploaded to a server?', a: 'Absolutely safe. All ToolHub Pro tools run entirely in your browser using JavaScript. No data is ever sent to our servers. Your JSON, passwords, and text stay 100% private on your device.' },
  { q: 'What is JSON and why do I need a formatter?', a: 'JSON (JavaScript Object Notation) is a lightweight data format used for APIs and configuration files. A formatter indents and structures raw JSON into a readable format, making it easy to spot errors and understand data hierarchy.' },
  { q: 'What indentation should I use for JSON?', a: '2 spaces is the most common standard (used by most linters and APIs). 4 spaces is popular in Python projects. Both are equally valid — choose based on your team\'s style guide.' },
  { q: 'Can I use these tools on mobile?', a: 'Yes! All ToolHub Pro tools are fully responsive and optimized for mobile devices. The JSON formatter uses a stacked layout on smaller screens for easy reading.' },
  { q: 'Are all the tools really free?', a: 'Yes, all 50+ tools are completely free with no account required, no trials, no paywalls, and no feature limits.' },
]

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [displayed, setDisplayed] = useState(TOOLS)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q'); if (q) setQuery(q)
  }, [])

  useEffect(() => {
    let res = TOOLS
    if (activeCategory !== 'all') res = res.filter(t => t.category === activeCategory)
    if (query.trim()) {
      const q = query.toLowerCase()
      res = res.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.keywords.some(k => k.includes(q))
      )
    }
    setDisplayed(res)
  }, [query, activeCategory])

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          ABOVE THE FOLD — SEO Hero + JSON Tool
      ═══════════════════════════════════════════════════════ */}
      <section id="json-tool" className="tools-scroll-section bg-white border-b border-gray-100 pt-10 pb-10 px-4">
        <div className="max-w-7xl mx-auto">

          {/* SEO H1 Hero */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-orange-50 text-orange-600 border-orange-200 mb-4">
              ⚡ {TOOLS.length}+ Free Tools · No Signup · 100% In-Browser
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 text-balance" style={{fontFamily:'Poppins,sans-serif'}}>
              Free Online{' '}
              <span className="bg-clip-text text-transparent" style={{backgroundImage:'linear-gradient(135deg,#f97316,#ea580c)'}}>JSON Formatter</span>{' '}
              &amp;{' '}
              <span className="bg-clip-text text-transparent" style={{backgroundImage:'linear-gradient(135deg,#22c55e,#16a34a)'}}>Validator Tool</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Format, validate, and beautify JSON instantly — secure, fast, and browser-based.
            </p>
          </div>

          {/* JSON Formatter — TWO-PANEL, primary tool */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 p-6" style={{boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
              <JsonFormatter />
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[
              {n:`${TOOLS.length}+`, l:'Free Tools',    c:'#f97316'},
              {n:'100%',            l:'Client-Side',    c:'#22c55e'},
              {n:'0',               l:'Signup Needed',  c:'#f97316'},
              {n:'20+',             l:'Blog Articles',  c:'#22c55e'},
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-extrabold" style={{color:s.c,fontFamily:'Poppins,sans-serif'}}>{s.n}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP AD BANNER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <AdBanner format="horizontal" slot="1234567890" label="Top Banner" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          EXPLORE ALL FREE TOOLS — Scrollable sections
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-green-50 text-green-600 border-green-200 mb-3">
            🛠️ All Tools
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>
            Explore All Free Online Tools
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            50+ browser-based tools, organized by category. No signup, no installation, completely free.
          </p>
        </div>

        {/* Quick search + filter */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-8" style={{boxShadow:'0 1px 3px rgba(0,0,0,0.07)'}}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search 50+ tools — try 'JSON', 'password', 'slug'…"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 text-gray-900 placeholder-gray-400 transition-colors" />
              {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => setActiveCategory('all')}
                className="px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                style={activeCategory==='all' ? {background:'#f97316',color:'#fff',borderColor:'#f97316'} : {background:'white',borderColor:'#e5e7eb',color:'#6b7280'}}>
                All
              </button>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                  style={activeCategory===cat.id ? {background:'#22c55e',color:'#fff',borderColor:'#22c55e'} : {background:'white',borderColor:'#e5e7eb',color:'#6b7280'}}>
                  {cat.icon} {cat.name.replace(' Tools','')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* If search/filter active: show flat grid */}
        {(query || activeCategory !== 'all') ? (
          <div>
            <p className="text-sm text-gray-500 mb-4">{displayed.length} tool{displayed.length !== 1 ? 's' : ''} found{query ? ` for "${query}"` : ''}</p>
            {displayed.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">🔍</div>
                <p className="font-semibold text-gray-700">No tools found for &quot;{query}&quot;</p>
                <button onClick={() => { setQuery(''); setActiveCategory('all') }}
                  className="mt-4 btn btn-orange btn-sm">Clear Search</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayed.map(tool => <ToolCard key={tool.id} tool={tool} />)}
              </div>
            )}
          </div>
        ) : (
          /* ── GROUPED SCROLLABLE SECTIONS ── */
          <div className="space-y-16">
            {TOOL_GROUPS.map((group, gi) => (
              <div key={group.id} id={`tools-${group.id}`} className="tools-scroll-section">
                {/* Section header with SEO H2 */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-3"
                    style={gi%2===0 ? {background:'#fff7ed',color:'#ea580c',borderColor:'#fed7aa'} : {background:'#f0fdf4',color:'#16a34a',borderColor:'#bbf7d0'}}>
                    {group.icon} {group.label}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1" style={{fontFamily:'Poppins,sans-serif'}}>
                    {group.seoH2}
                  </h2>
                  <p className="text-gray-500 text-sm max-w-2xl">{group.desc}</p>
                </div>

                {/* Tool cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  {group.tools.map(tool => (
                    <Link key={tool.id} href={`/tools/${tool.id}`}
                      className="tool-card group block">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-2xl shrink-0">{tool.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors" style={{fontFamily:'Inter,sans-serif'}}>
                            {tool.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{tool.shortDesc}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={gi%2===0
                            ? {background:'#fff7ed',color:'#ea580c'}
                            : {background:'#f0fdf4',color:'#16a34a'}}>
                          {CATEGORIES.find(c=>c.id===tool.category)?.name?.replace(' Tools','')}
                        </span>
                        <span className="text-xs font-semibold text-gray-400 group-hover:text-orange-500 transition-colors">
                          Open →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link href={`/tools/category/${group.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                  View all {group.tools.length} {group.label.split(' ').slice(1).join(' ')} →
                </Link>

                {/* Ad after every 2 tool groups */}
                {(gi % 2 === 1) && (
                  <div className="mt-8">
                    <AdBanner format="horizontal" slot={`ad-between-${gi}`} label="Between Tools Ad" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── AD AFTER TOOLS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <AdBanner format="rectangle" slot="0987654321" label="High CTR Zone — After Tools" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          HOW TO USE JSON FORMATTER — SEO Content
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white border-y border-gray-100 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-orange-50 text-orange-600 border-orange-200 mb-3">
              📘 Guide
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>
              How to Use the Free JSON Formatter
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">Step-by-step guide to formatting, validating, and minifying JSON online</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {n:'1',icon:'📋',t:'Paste Your JSON',d:'Copy your raw or minified JSON and paste it into the left input panel above.'},
              {n:'2',icon:'✨',t:'Click Format',d:'Hit "Format JSON" to instantly beautify and indent your JSON with clean formatting.'},
              {n:'3',icon:'✅',t:'Validate Syntax',d:'Use "Validate JSON" to check for syntax errors with detailed error messages.'},
              {n:'4',icon:'📋',t:'Copy Output',d:'Click "Copy" to copy the formatted JSON, or "Download" to save it as a .json file.'},
            ].map(s => (
              <div key={s.n} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white mb-3 mx-auto"
                  style={{background:'linear-gradient(135deg,#f97316,#ea580c)'}}>
                  {s.n}
                </div>
                <div className="text-2xl mb-2">{s.icon}</div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1" style={{fontFamily:'Poppins,sans-serif'}}>{s.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl border border-orange-100 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4" style={{fontFamily:'Poppins,sans-serif'}}>
              ✨ Features &amp; Benefits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '🚀 Instant formatting — no page reload required',
                '🔍 Real-time syntax validation with error details',
                '⚡ Minify JSON to reduce file size by up to 60%',
                '📄 Sample JSON button for quick testing',
                '🤖 Auto-format toggle for live formatting',
                '🔒 100% private — runs entirely in your browser',
                '📋 One-click copy to clipboard',
                '⬇️ Download formatted JSON as a file',
                '📐 Configurable indentation (2 or 4 spaces)',
                '📱 Fully responsive — works on mobile too',
              ].map(f => (
                <div key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="shrink-0 text-green-500 mt-0.5">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MID AD ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <AdBanner format="horizontal" slot="1122334455" label="Mid-page Ad" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          FAQ — Schema-ready
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-green-50 text-green-600 border-green-200 mb-3">
            ❓ FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm">Common questions about ToolHub Pro's JSON formatter and other free tools</p>
        </div>
        <div className="space-y-2">
          {FAQ_ITEMS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q w-full text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <span className="text-gray-400 shrink-0 transition-transform duration-200" style={{transform: openFaq===i ? 'rotate(180deg)' : 'none'}}>
                  ▾
                </span>
              </button>
              {openFaq === i && (
                <div className="faq-a">{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a }
          }))
        })}} />
      </section>

      {/* ═══════════════════════════════════════════════════════
          BLOG PREVIEW
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-gray-100 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-orange-50 text-orange-600 border-orange-200 mb-2">
                📝 Blog
              </div>
              <h2 className="section-title">Latest Articles &amp; Guides</h2>
              <p className="text-sm text-gray-500 mt-1">Deep dives, tutorials, and SEO tips</p>
            </div>
            <Link href="/blog" className="btn btn-ghost btn-sm hidden sm:inline-flex">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOGS.slice(0,6).map(blog => <BlogCard key={blog.id} blog={blog} />)}
          </div>
        </div>
      </section>

      {/* ── BOTTOM AD ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <AdBanner format="horizontal" slot="9876543210" label="Bottom Ad" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          WHY TOOLHUB PRO
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-gray-100 py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-1 text-gray-900" style={{fontFamily:'Poppins,sans-serif'}}>
            Why <span style={{color:'#f97316'}}>ToolHub</span> <span className="text-gray-700">Pro</span>?
          </h2>
          <p className="text-gray-500 mb-10 text-sm font-medium">Built for speed, privacy, and simplicity. No strings attached.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {icon:'🔒',t:'100% Private',d:'All processing in your browser. Zero data sent anywhere.',c:'#f97316'},
              {icon:'⚡',t:'Instant Results',d:'No loading spinners. Tools respond in milliseconds.',c:'#22c55e'},
              {icon:'📱',t:'Mobile Ready',d:'Fully responsive. Works on phones, tablets, and desktops.',c:'#f97316'},
              {icon:'🎯',t:'No Signup Ever',d:'Use every tool immediately. No account, no email needed.',c:'#22c55e'},
            ].map(f => (
              <div key={f.t} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:-translate-y-1 transition-transform duration-200">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-sm mb-1" style={{color:f.c,fontFamily:'Poppins,sans-serif'}}>{f.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-gray-400 font-medium">
            🔒 All tools run locally in your browser. No data is uploaded.
          </p>
        </div>
      </section>

      {/* JSON-LD WebSite schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org',
        '@type':'WebSite',
        'name':'ToolHub Pro',
        'url':'https://toolhubpro.com',
        'description':'Free online JSON formatter, validator, and 50+ developer, text, SEO, and security tools. No signup required. 100% browser-based.',
        potentialAction:{
          '@type':'SearchAction',
          'target':'https://toolhubpro.com/?q={search_term_string}',
          'query-input':'required name=search_term_string'
        }
      })}} />

      {/* SoftwareApplication schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org',
        '@type':'SoftwareApplication',
        'name':'JSON Formatter & Validator — ToolHub Pro',
        'applicationCategory':'DeveloperApplication',
        'operatingSystem':'Any',
        'url':'https://toolhubpro.com',
        'offers':{'@type':'Offer','price':'0','priceCurrency':'USD'},
        'description':'Free browser-based JSON formatter and validator. Format, minify, and validate JSON instantly.'
      })}} />
    </>
  )
}
