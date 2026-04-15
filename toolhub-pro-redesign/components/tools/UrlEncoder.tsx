"use client";
"use client";
'use client'
import { useState } from 'react'

export default function UrlEncoder({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const encode = () => { setError(''); setOutput(encodeURIComponent(input)) }
  const decode = () => {
    setError('')
    try { setOutput(decodeURIComponent(input)) }
    catch (e: any) { setError('Invalid URL encoding: ' + e.message) }
  }
  const encodeFull = () => { setError(''); setOutput(encodeURI(input)) }

  return (
    <div className="space-y-4">
      <div className="tool-box">
        <label className="form-label">Input URL or Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          className="tool-input" rows={5}
          placeholder="https://example.com/search?q=hello world&lang=en" />
        <div className="flex gap-2 mt-3 flex-wrap">
          <button onClick={encode} className="btn btn-teal">🌐 Encode Component</button>
          <button onClick={decode} className="btn btn-coral">🔓 Decode</button>
          <button onClick={encodeFull} className="btn btn-ghost">Full URL Encode</button>
          <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="btn btn-ghost">Clear</button>
        </div>
      </div>
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">❌ {error}</div>}
      {output && (
        <div className="tool-box">
          <label className="form-label">Output</label>
          <div className="tool-output text-sm break-all">{output}</div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm">📋 Copy</button>
          </div>
        </div>
      )}
    </div>
  )
}
