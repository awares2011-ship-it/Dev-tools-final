"use client";
"use client";
'use client'
import { useState } from 'react'

export default function CsvToJson({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      const lines = input.trim().split('\n')
      if (lines.length < 2) { setError('Need at least a header row and one data row'); return }
      const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^["']|["']$/g, ''))
      const data = lines.slice(1).map(line => {
        const vals = line.split(delimiter).map(v => v.trim().replace(/^["']|["']$/g, ''))
        return headers.reduce((obj: Record<string,string>, h, i) => { obj[h] = vals[i] ?? ''; return obj }, {})
      })
      setOutput(JSON.stringify(data, null, 2))
    } catch (e: any) { setError(e.message) }
  }

  const sampleCSV = `name,age,city,email
Alice Johnson,30,London,alice@example.com
Bob Smith,25,Mumbai,bob@example.com
Carol White,35,New York,carol@example.com`

  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <div className="flex justify-between items-center">
          <label className="form-label mb-0">CSV Input</label>
          <button onClick={() => setInput(sampleCSV)} className="btn btn-ghost btn-sm">Load Sample</button>
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          className="tool-input" rows={6}
          placeholder="name,age,city&#10;Alice,30,London&#10;Bob,25,Mumbai" />
        <div className="flex gap-3 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <label className="form-label mb-0 text-xs">Delimiter</label>
            <select value={delimiter} onChange={e => setDelimiter(e.target.value)} className="form-select w-28">
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value={'\t'}>Tab</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>
          <button onClick={convert} className="btn btn-teal">📊 Convert to JSON</button>
          <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="btn btn-ghost">Clear</button>
        </div>
      </div>
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">❌ {error}</div>}
      {output && (
        <div className="tool-box">
          <label className="form-label">JSON Output</label>
          <pre className="tool-output text-xs overflow-x-auto">{output}</pre>
          <div className="flex gap-2 mt-3">
            <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm">📋 Copy JSON</button>
            <button onClick={() => { const a = document.createElement('a'); a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(output); a.download='data.json'; a.click() }} className="btn btn-ghost btn-sm">⬇️ Download</button>
          </div>
        </div>
      )}
    </div>
  )
}
