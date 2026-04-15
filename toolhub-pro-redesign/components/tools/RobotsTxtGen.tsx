"use client";
"use client";
'use client'
import { useState } from 'react'
export default function RobotsTxtGen({ accent }: { accent?: string }) {
  const [sitemap, setSitemap] = useState('https://example.com/sitemap.xml')
  const [blockAdmin, setBlockAdmin] = useState(true)
  const [blockSearch, setBlockSearch] = useState(true)
  const [blockGpt, setBlockGpt] = useState(false)
  const [custom, setCustom] = useState('')
  const txt = [
    'User-agent: *',
    blockAdmin ? 'Disallow: /admin/' : '',
    blockAdmin ? 'Disallow: /wp-admin/' : '',
    blockAdmin ? 'Disallow: /account/' : '',
    blockSearch ? 'Disallow: /search?' : '',
    blockSearch ? 'Disallow: /search/' : '',
    'Allow: /',
    '',
    blockGpt ? 'User-agent: GPTBot\nDisallow: /' : '',
    blockGpt ? 'User-agent: ChatGPT-User\nDisallow: /' : '',
    sitemap ? `Sitemap: ${sitemap}` : '',
    custom ? custom : '',
  ].filter(Boolean).join('\n').trim()
  const copy = () => navigator.clipboard.writeText(txt).then(() => alert('robots.txt copied!'))
  const download = () => { const a=document.createElement('a'); a.href='data:text/plain,'+encodeURIComponent(txt); a.download='robots.txt'; a.click() }
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <div>
          <label className="form-label">Sitemap URL</label>
          <input type="text" value={sitemap} onChange={e => setSitemap(e.target.value)} className="form-input" placeholder="https://example.com/sitemap.xml" />
        </div>
        <div className="space-y-2">
          {[
            {label:'Block admin pages (/admin, /wp-admin)', val:blockAdmin, set:setBlockAdmin},
            {label:'Block search results pages (/search?)', val:blockSearch, set:setBlockSearch},
            {label:'Block AI crawlers (GPTBot, ChatGPT-User)', val:blockGpt, set:setBlockGpt},
          ].map(o => (
            <label key={o.label} className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
              <input type="checkbox" checked={o.val} onChange={e => o.set(e.target.checked)} className="form-checkbox" />{o.label}
            </label>
          ))}
        </div>
        <div>
          <label className="form-label">Custom Rules (optional)</label>
          <textarea value={custom} onChange={e => setCustom(e.target.value)} className="tool-input" rows={3} placeholder="Disallow: /private/&#10;Disallow: /staging/" />
        </div>
      </div>
      <div className="tool-box">
        <label className="form-label">robots.txt Output</label>
        <pre className="tool-output text-sm">{txt}</pre>
        <div className="flex gap-2 mt-3">
          <button onClick={copy} className="btn btn-teal">📋 Copy</button>
          <button onClick={download} className="btn btn-ghost">⬇️ Download robots.txt</button>
        </div>
      </div>
    </div>
  )
}
