'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import ToolCard from './ToolCard'
import BlogCard from './BlogCard'
import AdBanner from './AdBanner'
import type { Tool, ToolCategory } from '@/lib/tools'
import type { Blog } from '@/lib/blogs'
import { ACCENT_HEX } from '@/lib/colors'

interface Props {
  tools: Tool[]
  categories: { id: ToolCategory; name: string; icon: string; color: string; desc: string }[]
  blogs: Blog[]
}

const GREEN_SHADES = [
  'text-green-600',
  'text-emerald-600',
  'text-teal-600',
  'text-green-700',
  'text-emerald-500',
  'text-teal-500',
]

export default function HomepageClient({ tools, categories, blogs }: Props) {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState<ToolCategory | 'all'>('all')

  const filtered = useMemo(() => {
    let list = tools
    if (activeCat !== 'all') list = list.filter(t => t.category === activeCat)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q) ||
        t.keywords.some(k => k.includes(q))
      )
    }
    return list
  }, [tools, activeCat, query])

  const heroWords = ['Free', 'Online', 'Tools']
  const heroSubWords = ['Developers', 'Writers', 'SEO Pros']

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5f7f6] to-[#e6f4ea] pt-14 pb-12 px-4">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.06] bg-green-400 blur-3xl pointer-events-none" />
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05] bg-emerald-500 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-green-200">
            ⚡ {tools.length}+ Free Tools — No Signup Required
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight mb-4 text-balance">
            {heroWords.map((w, i) => (
              <span key={w} className={`${GREEN_SHADES[i]} inline-block mr-2`}>{w}</span>
            ))}<br />
            <span className="text-gray-900">Tools for </span>
            {heroSubWords.map((w, i) => (
              <span key={w} className={`${GREEN_SHADES[i + 3]} inline-block`}>
                {w}{i < heroSubWords.length - 1 && <span className="text-gray-400 mx-1">&</span>}
              </span>
            ))}
          </h1>

          <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto font-medium">
            Instant, in-browser tools. Your data never leaves your device.
          </p>

          <div className="relative max-w-xl mx-auto mb-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search 50+ tools — try 'JSON', 'password', 'slug'…"
              className="w-full pl-11 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-green-400 shadow-sm transition-colors text-gray-900 placeholder-gray-400"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex justify-center gap-8 flex-wrap">
            {[
              { n: '50+', l: 'Free Tools', c: 'text-green-600' },
              { n: '100%', l: 'Client-Side', c: 'text-emerald-600' },
              { n: '0', l: 'Signup Needed', c: 'text-teal-600' },
              { n: '20+', l: 'Blog Articles', c: 'text-green-700' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className={`text-2xl font-extrabold ${s.c}`}>{s.n}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP AD ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <AdBanner format="horizontal" slot="1234567890" />
      </div>

      {/* ── CATEGORY FILTER ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCat('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
              activeCat === 'all'
                ? 'bg-green-600 text-white border-transparent shadow-sm'
                : 'bg-white border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700'
            }`}
          >
            All Tools
          </button>
          {categories.map(cat => {
            const accent = ACCENT_HEX[cat.color as keyof typeof ACCENT_HEX] ?? '#16a34a'
            const isActive = activeCat === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                  isActive
                    ? 'text-white border-transparent shadow-sm'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                style={isActive ? { background: accent, borderColor: accent } : {}}
              >
                {cat.icon} {cat.name.replace(' Tools', '')}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── TOOL GRID ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="section-header">
          <h2 className="section-title">
            {activeCat === 'all'
              ? `🛠️ All Tools`
              : categories.find(c => c.id === activeCat)?.icon + ' ' +
                categories.find(c => c.id === activeCat)?.name}
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({filtered.length} {filtered.length === 1 ? 'tool' : 'tools'})
            </span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-semibold text-gray-700">No tools found for &quot;{query}&quot;</p>
            <p className="text-sm mt-1">Try a different search term</p>
            <button
              onClick={() => { setQuery(''); setActiveCat('all') }}
              className="mt-4 btn-primary btn text-sm"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* ── CATEGORIES SHOWCASE ──────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#f5f7f6] to-[#e6f4ea] border-y border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="section-header mb-8">
            <h2 className="section-title">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(cat => {
              const accent = ACCENT_HEX[cat.color as keyof typeof ACCENT_HEX] ?? '#16a34a'
              const count = tools.filter(t => t.category === cat.id).length
              return (
                <Link
                  key={cat.id}
                  href={`/tools/category/${cat.id}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-gray-500">{count} tools</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{cat.desc}</p>
                  <span className="inline-block mt-3 text-xs font-semibold text-green-600">
                    Explore →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="section-header">
          <h2 className="section-title">
            📝 <span className="text-green-600">Latest</span>{' '}
            <span className="text-emerald-600">Articles</span>{' '}
            &amp; <span className="text-teal-600">Guides</span>
          </h2>
          <Link href="/blog" className="btn-ghost btn btn-sm">View All Articles →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      {/* ── BOTTOM AD ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <AdBanner format="horizontal" slot="9876543210" />
      </div>

      {/* ── WHY TOOLHUB PRO ──────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#f5f7f6] to-[#e6f4ea] border-t border-gray-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Why <span className="text-green-600">ToolHub</span>{' '}
            <span className="text-gray-700">Pro</span>?
          </h2>
          <p className="text-gray-500 mb-8 font-medium">Everything you need. Nothing you don&apos;t.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔒', title: '100% Private', desc: 'Your data never leaves your browser' },
              { icon: '⚡', title: 'Instant Results', desc: 'No server round-trips, no waiting' },
              { icon: '📱', title: 'Mobile-Ready', desc: 'Works perfectly on any device' },
              { icon: '🆓', title: 'Always Free', desc: 'No plans, no paywalls, ever' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
