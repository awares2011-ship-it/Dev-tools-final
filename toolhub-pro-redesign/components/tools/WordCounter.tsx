"use client";
"use client";
'use client'
import { useState, useCallback } from 'react'

export default function WordCounter({ accent }: { accent?: string }) {
  const [text, setText] = useState('')

  const stats = useCallback(() => {
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, '').length
    const sentences = (text.match(/[.!?]+/g) || []).length
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length
    const lines = text === '' ? 0 : text.split('\n').length
    const readTime = Math.ceil(words / 200)
    const unique = new Set((text.toLowerCase().match(/\b\w+\b/g) || [])).size
    return { words, chars, charsNoSpace, sentences, paragraphs, lines, readTime, unique }
  }, [text])

  const s = stats()

  const copyText = () => {
    if (!text) return
    navigator.clipboard.writeText(text).then(() => alert('Copied!'))
  }

  return (
    <div className="space-y-4">
      <div className="tool-box">
        <label className="form-label">Your Text</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="tool-input"
          rows={8}
          placeholder="Paste or type your text here to count words, characters, sentences and more…"
        />
        <div className="flex gap-2 mt-3 flex-wrap">
          <button onClick={() => setText('')} className="btn-ghost btn btn-sm">Clear</button>
          <button onClick={copyText} className="btn-ghost btn btn-sm">📋 Copy</button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { v: s.words, l: 'Words', c: '#1D9E75' },
          { v: s.chars, l: 'Characters', c: '#D85A30' },
          { v: s.sentences, l: 'Sentences', c: '#7F77DD' },
          { v: s.paragraphs, l: 'Paragraphs', c: '#BA7517' },
          { v: s.charsNoSpace, l: 'Chars (no space)', c: '#639922' },
          { v: s.lines, l: 'Lines', c: '#D4537E' },
          { v: s.readTime, l: 'Min Read', c: '#1D9E75' },
          { v: s.unique, l: 'Unique Words', c: '#D85A30' },
        ].map(item => (
          <div key={item.l} className="stat-card">
            <div className="stat-value" style={{ color: item.c }}>{item.v.toLocaleString()}</div>
            <div className="stat-label">{item.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
