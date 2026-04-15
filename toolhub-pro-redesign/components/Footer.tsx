import Link from 'next/link'
import { TOOLS, CATEGORIES } from '@/lib/tools'
import { BLOGS } from '@/lib/blogs'

export default function Footer() {
  const popular = TOOLS.filter(t => ['json-formatter','word-counter','password-generator','base64-encoder','url-encoder','sha256-generator','meta-tag-generator','keyword-density-checker'].includes(t.id))
  const recentBlogs = BLOGS.slice(0, 5)

  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      {/* Trust bar */}
      <div className="border-b border-gray-100 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500 text-center">
          <span className="flex items-center gap-1.5">🔒 <strong className="text-gray-700">100% Private</strong> — All processing in your browser</span>
          <span className="hidden sm:block text-gray-300">|</span>
          <span className="flex items-center gap-1.5">⚡ <strong className="text-gray-700">No Signup</strong> — Use instantly, no account needed</span>
          <span className="hidden sm:block text-gray-300">|</span>
          <span className="flex items-center gap-1.5">🆓 <strong className="text-gray-700">Always Free</strong> — No paywalls, no plans</span>
          <span className="hidden sm:block text-gray-300">|</span>
          <span className="flex items-center gap-1.5">📱 <strong className="text-gray-700">Mobile Ready</strong> — Works on any device</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-base font-black text-white" style={{background:'linear-gradient(135deg,#f97316,#ea580c)'}}>⚡</span>
              <span className="font-extrabold text-gray-900 text-[15px]" style={{fontFamily:'Poppins,sans-serif'}}>
                Tool<span style={{color:'#f97316'}}>Hub</span>
                <span className="text-gray-400"> Pro</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              50+ free online tools for developers, writers, and SEO professionals. No signup, no tracking, no cost.
            </p>
            <div className="flex gap-2 mt-4">
              {['🐦 Twitter','📧 Contact'].map(s => (
                <span key={s} className="text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 cursor-pointer hover:border-orange-300 hover:text-orange-600 transition-colors">
                  {s}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">🔒 All tools run locally in your browser.<br />No data is uploaded.</p>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Popular Tools</h3>
            <ul className="space-y-2">
              {popular.map(t => (
                <li key={t.id}>
                  <Link href={`/tools/${t.id}`} className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    {t.icon} {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map(c => (
                <li key={c.id}>
                  <Link href={`/tools/category/${c.id}`} className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    {c.icon} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog & Pages */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Latest Articles</h3>
            <ul className="space-y-2 mb-6">
              {recentBlogs.map(b => (
                <li key={b.id}>
                  <Link href={`/blog/${b.id}`} className="text-sm text-gray-600 hover:text-orange-600 transition-colors line-clamp-1">
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Pages</h3>
            <ul className="space-y-2">
              {[
                {href:'/about', label:'About Us'},
                {href:'/contact', label:'Contact'},
                {href:'/privacy-policy', label:'Privacy Policy'},
                {href:'/disclaimer', label:'Disclaimer'},
              ].map(p => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internal linking tag cloud — SEO */}
        <div className="border-t border-gray-100 pt-8 mb-6">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Explore All Tools</h3>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map(t => (
              <Link key={t.id} href={`/tools/${t.id}`}
                className="text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors">
                {t.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} ToolHub Pro. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link href="/sitemap.xml" className="hover:text-gray-600 transition-colors">Sitemap</Link>
            <Link href="/robots.txt" className="hover:text-gray-600 transition-colors">Robots.txt</Link>
            <span>Built with ❤️ — Free forever</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
