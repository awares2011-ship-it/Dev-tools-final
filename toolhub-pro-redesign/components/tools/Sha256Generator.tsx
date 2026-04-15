"use client";
"use client";
'use client'
import { useState, useEffect } from 'react'

export default function Sha256Generator({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [hash, setHash] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!input) { setHash(''); return }
    setLoading(true)
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(input)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      setHash(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''))
    } catch (e) { setHash('Error generating hash') }
    setLoading(false)
  }

  useEffect(() => { const t = setTimeout(generate, 300); return () => clearTimeout(t) }, [input])

  return (
    <div className="space-y-4">
      <div className="tool-box">
        <label className="form-label">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          className="tool-input" rows={5}
          placeholder="Enter any text to generate its SHA-256 hash…" />
        <button onClick={() => setInput('')} className="btn btn-ghost btn-sm mt-3">Clear</button>
      </div>
      {hash && !loading && (
        <div className="space-y-3">
          {[
            { label: 'SHA-256 (Hex)', value: hash, color: '#1D9E75' },
            { label: 'SHA-256 (Uppercase)', value: hash.toUpperCase(), color: '#7F77DD' },
            { label: 'SHA-256 (Base64)', value: btoa(hash), color: '#D85A30' },
          ].map(item => (
            <div key={item.label} className="tool-box">
              <label className="form-label" style={{ color: item.color }}>{item.label}</label>
              <div className="tool-output text-xs font-mono break-all">{item.value}</div>
              <button onClick={() => navigator.clipboard.writeText(item.value).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm mt-3">📋 Copy</button>
            </div>
          ))}
          <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl px-4 py-3 text-xs text-teal-800 dark:text-teal-300">
            ✅ SHA-256 is cryptographically secure and recommended for all security applications.
          </div>
        </div>
      )}
      {loading && <div className="text-sm text-gray-400 animate-pulse">Computing hash…</div>}
    </div>
  )
}
