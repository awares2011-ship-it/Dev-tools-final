"use client";
"use client";
'use client'
import { useState, useMemo } from 'react'

export default function RegexTester({ accent }: { accent?: string }) {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('')

  const result = useMemo(() => {
    if (!pattern || !text) return null
    try {
      const re = new RegExp(pattern, flags)
      const matches = [...text.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags+'g'))]
      return { matches, count: matches.length, error: null }
    } catch(e: any) { return { matches: [], count: 0, error: e.message } }
  }, [pattern, flags, text])

  const highlighted = useMemo(() => {
    if (!result || result.error || result.count === 0) return text
    try {
      return text.replace(new RegExp(pattern, flags.includes('g') ? flags : flags+'g'), m => `|||${m}|||`)
    } catch { return text }
  }, [result, text, pattern, flags])

  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="form-label">Regex Pattern</label>
            <input type="text" value={pattern} onChange={e => setPattern(e.target.value)}
              className="form-input font-mono" placeholder="[A-Z][a-z]+" />
          </div>
          <div className="w-28">
            <label className="form-label">Flags</label>
            <input type="text" value={flags} onChange={e => setFlags(e.target.value)}
              className="form-input font-mono" placeholder="gim" maxLength={6} />
          </div>
        </div>
        <div>
          <label className="form-label">Test String</label>
          <textarea value={text} onChange={e => setText(e.target.value)}
            className="tool-input" rows={5}
            placeholder="Enter text to test your regular expression against…" />
        </div>
      </div>
      {result && (
        <div className="tool-box">
          {result.error ? (
            <div className="text-red-600 text-sm">❌ Invalid regex: {result.error}</div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold" style={{ color: result.count > 0 ? '#1D9E75' : '#E24B4A' }}>
                  {result.count} match{result.count !== 1 ? 'es' : ''} found
                </span>
              </div>
              {result.count > 0 && (
                <div className="space-y-2">
                  {result.matches.slice(0, 20).map((m, i) => (
                    <div key={i} className="flex gap-2 text-xs bg-teal-50 dark:bg-teal-900/20 rounded-lg px-3 py-2">
                      <span className="text-gray-400">#{i+1}</span>
                      <code className="text-teal-700 dark:text-teal-400 font-mono">{m[0]}</code>
                      <span className="text-gray-400 ml-auto">index {m.index}</span>
                    </div>
                  ))}
                  {result.matches.length > 20 && <p className="text-xs text-gray-400">...and {result.matches.length - 20} more</p>}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
