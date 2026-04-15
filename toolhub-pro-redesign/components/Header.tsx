'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/tools'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center text-base font-black text-white group-hover:scale-105 transition-transform" style={{background:'linear-gradient(135deg,#f97316,#ea580c)'}}>⚡</span>
          <span className="font-extrabold text-gray-900 text-[15px] tracking-tight" style={{fontFamily:'Poppins,sans-serif'}}>
            Tool<span style={{color:'#f97316'}}>Hub</span>
            <span className="text-gray-400"> Pro</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={`/tools/category/${cat.id}`}
              className="px-3 py-1.5 text-[12px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {cat.icon} {cat.name.replace(' Tools', '')}
            </Link>
          ))}
          <Link href="/blog" className="px-3 py-1.5 text-[12px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
            📝 Blog
          </Link>
        </nav>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 w-48 lg:w-56 focus-within:border-orange-400 transition-colors">
          <span className="text-gray-400 text-sm">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && search.trim())
                window.location.href = `/?q=${encodeURIComponent(search.trim())}`
            }}
            placeholder="Search tools…"
            className="bg-transparent text-[13px] outline-none text-gray-700 placeholder-gray-400 w-full"
          />
        </div>

        {/* CTA */}
        <a href="#json-tool" className="hidden lg:inline-flex btn btn-orange text-xs px-3 py-1.5 rounded-lg ml-1">
          🚀 Try JSON Tool
        </a>

        {/* Mobile */}
        <button
          className="md:hidden w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-sm ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >☰</button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-1">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} href={`/tools/category/${cat.id}`} onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-600 rounded-lg transition-all">
              {cat.icon} {cat.name}
            </Link>
          ))}
          <Link href="/blog" onClick={() => setMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-600 rounded-lg transition-all">
            📝 Blog
          </Link>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mt-1">
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              placeholder="Search tools…"
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => { if (e.key==='Enter' && search.trim()) window.location.href=`/?q=${encodeURIComponent(search.trim())}` }}
              className="bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 w-full"
            />
          </div>
        </div>
      )}
    </header>
  )
}
