"use client";
"use client";
'use client'
import { useState } from 'react'

export default function SlugGenerator({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [sep, setSep] = useState('-')
  const [toLower, setToLower] = useState(true)

  const slug = (() => {
    let s = input
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, sep)
      .replace(new RegExp(`[${sep}]+`, 'g'), sep)
    if (toLower) s = s.toLowerCase()
    return s || 'your-url-slug-here'
  })()

  const copy = () => navigator.clipboard.writeText(slug).then(() => alert('Slug copied!'))

  return (
    <div className="space-y-4">
      <div className="tool-box space-y-4">
        <div>
          <label className="form-label">Input Text / Title</label>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            className="form-input"
            placeholder="My Awesome Blog Post Title! — 2024 Edition" />
        </div>
        <div className="flex gap-4 flex-wrap items-center">
          <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={toLower} onChange={e => setToLower(e.target.checked)} className="form-checkbox" />
            Lowercase
          </label>
          <div className="flex items-center gap-2">
            <label className="form-label mb-0 text-xs">Separator</label>
            <select value={sep} onChange={e => setSep(e.target.value)} className="form-select w-28">
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
              <option value=".">Dot (.)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="tool-box">
        <label className="form-label">Generated Slug</label>
        <div className="tool-output text-lg font-bold" style={{ color: accent }}>{slug}</div>
        <div className="mt-2 text-xs text-gray-400">
          URL: <code className="text-gray-600 dark:text-gray-300">https://yourdomain.com/blog/<span style={{ color: accent }}>{slug}</span></code>
        </div>
        <button onClick={copy} className="btn btn-ghost btn-sm mt-3">📋 Copy Slug</button>
      </div>
    </div>
  )
}
