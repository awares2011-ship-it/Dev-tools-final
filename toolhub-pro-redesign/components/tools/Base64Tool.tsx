"use client";
"use client";
'use client'
import { useState } from 'react'

export default function Base64Tool({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const encode = () => {
    setError('')
    try { setOutput(btoa(unescape(encodeURIComponent(input)))) }
    catch (e: any) { setError('Encoding failed: ' + e.message) }
  }
  const decode = () => {
    setError('')
    try { setOutput(decodeURIComponent(escape(atob(input)))) }
    catch { setError('Invalid Base64 string') }
  }
  const copy = () => navigator.clipboard.writeText(output).then(() => alert('Copied!'))
  const download = () => {
    const a = document.createElement('a')
    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(output)
    a.download = 'output.txt'; a.click()
  }

  return (
    <div className="space-y-4">
      <div className="tool-box">
        <label className="form-label">Input</label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          className="tool-input" rows={6}
          placeholder="Enter text to encode, or Base64 to decode…" />
        <div className="flex gap-2 mt-3 flex-wrap">
          <button onClick={encode} className="btn btn-teal">🔐 Encode</button>
          <button onClick={decode} className="btn btn-coral">🔓 Decode</button>
          <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="btn btn-ghost">Clear</button>
        </div>
      </div>
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">❌ {error}</div>}
      {output && (
        <div className="tool-box">
          <label className="form-label">Output</label>
          <div className="tool-output text-sm">{output}</div>
          <div className="flex gap-2 mt-3">
            <button onClick={copy} className="btn btn-ghost btn-sm">📋 Copy</button>
            <button onClick={download} className="btn btn-ghost btn-sm">⬇️ Download</button>
          </div>
        </div>
      )}
    </div>
  )
}
