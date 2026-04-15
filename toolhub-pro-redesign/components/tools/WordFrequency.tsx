"use client";
"use client";
'use client'
import { useState, useMemo } from 'react'
const STOPWORDS = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','is','it','its','as','be','was','are','were','with','that','this','from','by','have','has','had','do','did','not','so','if','we','you','i','he','she','they','our','your','my','his','her','their'])
export default function WordFrequency({ accent }: { accent?: string }) {
  const [text, setText] = useState('')
  const [stopWords, setStopWords] = useState(true)
  const [minLen, setMinLen] = useState(2)
  const freq = useMemo(() => {
    if (!text) return []
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || []
    const map: Record<string, number> = {}
    words.forEach(w => {
      if (stopWords && STOPWORDS.has(w)) return
      if (w.length < minLen) return
      map[w] = (map[w] || 0) + 1
    })
    return Object.entries(map).sort((a,b) => b[1]-a[1]).slice(0, 30)
  }, [text, stopWords, minLen])
  const max = freq[0]?.[1] || 1
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <label className="form-label">Input Text</label>
        <textarea value={text} onChange={e => setText(e.target.value)} className="tool-input" rows={6} placeholder="Paste your content here to analyse word frequency…" />
        <div className="flex gap-4 flex-wrap items-center">
          <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={stopWords} onChange={e => setStopWords(e.target.checked)} className="form-checkbox" />Exclude stop words
          </label>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Min length:</span>
            <input type="number" value={minLen} min={1} max={10} onChange={e => setMinLen(+e.target.value)} className="form-input w-16" />
          </div>
        </div>
      </div>
      {freq.length > 0 && (
        <div className="tool-box">
          <label className="form-label">Top Words ({freq.length})</label>
          <div className="space-y-2 mt-2">
            {freq.map(([word, count]) => (
              <div key={word} className="flex items-center gap-3">
                <span className="w-24 text-sm font-mono text-gray-700 dark:text-gray-300 shrink-0">{word}</span>
                <div className="flex-1 h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(count/max)*100}%`, background: accent }} />
                </div>
                <span className="w-8 text-xs text-right text-gray-500">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
