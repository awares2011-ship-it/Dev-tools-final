"use client";
"use client";
'use client'
import { useState } from 'react'
interface UrlEntry { url: string; priority: string; freq: string; lastmod: string }
export default function SitemapGenerator({ accent }: { accent?: string }) {
  const [urls, setUrls] = useState<UrlEntry[]>([
    { url: 'https://example.com', priority: '1.0', freq: 'daily', lastmod: new Date().toISOString().slice(0,10) },
    { url: 'https://example.com/about', priority: '0.8', freq: 'monthly', lastmod: new Date().toISOString().slice(0,10) },
  ])
  const addUrl = () => setUrls([...urls, { url: '', priority: '0.7', freq: 'weekly', lastmod: new Date().toISOString().slice(0,10) }])
  const remove = (i: number) => setUrls(urls.filter((_,idx) => idx !== i))
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.filter(u=>u.url).map(u=>`  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  const download = () => { const a=document.createElement('a'); a.href='data:text/xml,'+encodeURIComponent(xml); a.download='sitemap.xml'; a.click() }
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        {urls.map((u,i) => (
          <div key={i} className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <input value={u.url} onChange={e => { const n=[...urls]; n[i].url=e.target.value; setUrls(n) }} className="form-input sm:col-span-2 text-sm" placeholder="https://example.com/page" />
              <select value={u.freq} onChange={e => { const n=[...urls]; n[i].freq=e.target.value; setUrls(n) }} className="form-select text-sm">
                {['always','hourly','daily','weekly','monthly','yearly','never'].map(f=><option key={f}>{f}</option>)}
              </select>
              <input value={u.priority} onChange={e => { const n=[...urls]; n[i].priority=e.target.value; setUrls(n) }} className="form-input text-sm" placeholder="0.8" />
            </div>
            <button onClick={() => remove(i)} className="btn btn-ghost btn-sm text-red-400 hover:text-red-600 mt-0.5">✕</button>
          </div>
        ))}
        <button onClick={addUrl} className="btn btn-ghost w-full">+ Add URL</button>
      </div>
      <div className="tool-box">
        <label className="form-label">sitemap.xml Output</label>
        <pre className="tool-output text-xs overflow-x-auto">{xml}</pre>
        <div className="flex gap-2 mt-3">
          <button onClick={() => navigator.clipboard.writeText(xml).then(() => alert('Copied!'))} className="btn btn-teal">📋 Copy XML</button>
          <button onClick={download} className="btn btn-ghost">⬇️ Download sitemap.xml</button>
        </div>
      </div>
    </div>
  )
}
