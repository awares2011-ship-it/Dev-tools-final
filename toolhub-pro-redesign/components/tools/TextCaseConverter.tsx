"use client";
"use client";
'use client'
import { useState } from 'react'

export default function TextCaseConverter({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const convert = (type: string) => {
    let r = ''
    switch (type) {
      case 'upper': r = input.toUpperCase(); break
      case 'lower': r = input.toLowerCase(); break
      case 'title': r = input.replace(/\w\S*/g, t => t[0].toUpperCase() + t.slice(1).toLowerCase()); break
      case 'sentence': r = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(); break
      case 'camel': r = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (w,i) => i===0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g,''); break
      case 'pascal': r = input.replace(/(?:^\w|[A-Z]|\b\w)/g, w => w.toUpperCase()).replace(/\s+/g,''); break
      case 'snake': r = input.toLowerCase().replace(/\s+/g,'_'); break
      case 'kebab': r = input.toLowerCase().replace(/\s+/g,'-'); break
      case 'dot': r = input.toLowerCase().replace(/\s+/g,'.'); break
    }
    setOutput(r)
  }

  const buttons = [
    { label: 'UPPERCASE', type: 'upper', color: '#D85A30' },
    { label: 'lowercase', type: 'lower', color: '#1D9E75' },
    { label: 'Title Case', type: 'title', color: '#7F77DD' },
    { label: 'Sentence case', type: 'sentence', color: '#D4537E' },
    { label: 'camelCase', type: 'camel', color: '#BA7517' },
    { label: 'PascalCase', type: 'pascal', color: '#639922' },
    { label: 'snake_case', type: 'snake', color: '#D85A30' },
    { label: 'kebab-case', type: 'kebab', color: '#1D9E75' },
    { label: 'dot.case', type: 'dot', color: '#7F77DD' },
  ]

  return (
    <div className="space-y-4">
      <div className="tool-box">
        <label className="form-label">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          className="tool-input" rows={5}
          placeholder="Type or paste your text here…" />
      </div>
      <div className="flex flex-wrap gap-2">
        {buttons.map(b => (
          <button key={b.type} onClick={() => convert(b.type)}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:scale-105 transition-all"
            style={{ color: b.color }}>
            {b.label}
          </button>
        ))}
      </div>
      {output && (
        <div className="tool-box">
          <label className="form-label">Output</label>
          <div className="tool-output text-sm">{output}</div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm">📋 Copy</button>
            <button onClick={() => { setInput(output); setOutput('') }} className="btn btn-ghost btn-sm">Use as Input</button>
          </div>
        </div>
      )}
    </div>
  )
}
