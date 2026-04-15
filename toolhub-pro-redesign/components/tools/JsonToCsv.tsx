"use client";
"use client";
'use client'
import { useState } from 'react'

export default function JsonToCsv({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      const data = JSON.parse(input)
      if (!Array.isArray(data)) { setError('Input must be a JSON array of objects'); return }
      const headers = [...new Set(data.flatMap(obj => Object.keys(obj)))]
      const rows = data.map(obj => headers.map(h => {
        const val = obj[h] ?? ''
        return typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))
          ? `"${val.replace(/"/g, '""')}"` : val
      }).join(','))
      setOutput([headers.join(','), ...rows].join('\n'))
    } catch (e: any) { setError(e.message) }
  }

  const sampleJSON = JSON.stringify([
    { name: 'Alice', age: 30, city: 'London' },
    { name: 'Bob', age: 25, city: 'Mumbai' },
  ], null, 2)

  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <div className="flex justify-between items-center">
          <label className="form-label mb-0">JSON Array Input</label>
          <button onClick={() => setInput(sampleJSON)} className="btn btn-ghost btn-sm">Load Sample</button>
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          className="tool-input" rows={7}
          placeholder='[{"name":"Alice","age":30},{"name":"Bob","age":25}]' />
        <div className="flex gap-2">
          <button onClick={convert} className="btn btn-teal">📈 Convert to CSV</button>
          <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="btn btn-ghost">Clear</button>
        </div>
      </div>
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">❌ {error}</div>}
      {output && (
        <div className="tool-box">
          <label className="form-label">CSV Output</label>
          <pre className="tool-output text-xs overflow-x-auto">{output}</pre>
          <div className="flex gap-2 mt-3">
            <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm">📋 Copy CSV</button>
            <button onClick={() => { const a = document.createElement('a'); a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(output); a.download='data.csv'; a.click() }} className="btn btn-ghost btn-sm">⬇️ Download CSV</button>
          </div>
        </div>
      )}
    </div>
  )
}
