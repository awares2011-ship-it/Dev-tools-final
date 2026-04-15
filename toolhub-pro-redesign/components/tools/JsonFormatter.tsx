"use client";
"use client";
'use client'
import { useState, useEffect, useCallback } from 'react'

const SAMPLE_JSON = `{
  "name": "ToolHub Pro",
  "version": "2.0",
  "description": "Free online tools for developers",
  "tools": ["JSON Formatter", "Base64 Encoder", "Password Generator"],
  "features": {
    "clientSide": true,
    "noSignup": true,
    "free": true
  },
  "count": 50,
  "active": true,
  "tags": null
}`

export default function JsonFormatter({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState('2')
  const [autoFormat, setAutoFormat] = useState(false)
  const [copied, setCopied] = useState(false)
  const [validMsg, setValidMsg] = useState('')

  const format = useCallback(() => {
    setError(''); setValidMsg('')
    if (!input.trim()) { setError('Please enter JSON to format.'); return }
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, parseInt(indent)))
    } catch (e: any) { setError(e.message); setOutput('') }
  }, [input, indent])

  const minify = () => {
    setError(''); setValidMsg('')
    if (!input.trim()) { setError('Please enter JSON to minify.'); return }
    try { setOutput(JSON.stringify(JSON.parse(input))) }
    catch (e: any) { setError(e.message) }
  }

  const validate = () => {
    setError(''); setValidMsg('')
    if (!input.trim()) { setError('Please enter JSON to validate.'); return }
    try { JSON.parse(input); setValidMsg('✅ Valid JSON — No syntax errors found!'); setOutput('') }
    catch (e: any) { setError(e.message); setOutput('') }
  }

  const copy = () => {
    if (!output) return
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    })
  }

  const clear = () => { setInput(''); setOutput(''); setError(''); setValidMsg('') }

  const loadSample = () => { setInput(SAMPLE_JSON); setError(''); setValidMsg(''); setOutput('') }

  useEffect(() => {
    if (autoFormat && input.trim()) {
      const t = setTimeout(format, 600)
      return () => clearTimeout(t)
    }
  }, [input, autoFormat, format])

  return (
    <div className="space-y-4">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <button onClick={format} className="btn btn-orange">✨ Format JSON</button>
        <button onClick={minify} className="btn btn-green">🔧 Minify</button>
        <button onClick={validate} className="btn btn-ghost">✅ Validate</button>
        <button onClick={loadSample} className="btn btn-ghost">📄 Sample JSON</button>
        <div className="flex items-center ml-auto gap-3">
          <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer select-none">
            <input type="checkbox" checked={autoFormat} onChange={e => setAutoFormat(e.target.checked)} className="form-checkbox" />
            Auto-format
          </label>
          <select value={indent} onChange={e => setIndent(e.target.value)} className="form-select w-28 text-xs py-1.5">
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="1">1 space</option>
          </select>
          <button onClick={clear} className="btn btn-ghost text-xs px-3 py-1.5">Clear</button>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT: Input */}
        <div className="tool-box">
          <label className="form-label flex items-center gap-1.5">
            <span style={{color:'#f97316'}}>⬇</span> Input JSON
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="tool-input"
            rows={14}
            placeholder={'{\n  "paste": "your JSON here",\n  "or": "click Sample JSON above"\n}'}
            spellCheck={false}
          />
          <div className="mt-2 text-xs text-gray-400">
            {input.length > 0 && <span>{input.length} chars</span>}
          </div>
        </div>

        {/* RIGHT: Output */}
        <div className="tool-box">
          <label className="form-label flex items-center gap-1.5">
            <span style={{color:'#22c55e'}}>⬆</span> Output JSON
          </label>
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-3">
              <div className="font-semibold mb-1">❌ JSON Error</div>
              <code className="text-xs break-all">{error}</code>
            </div>
          ) : validMsg ? (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 font-semibold">
              {validMsg}
            </div>
          ) : (
            <pre className="tool-output text-xs leading-relaxed overflow-x-auto min-h-[200px]">
              {output || <span className="text-gray-400">Formatted output will appear here…</span>}
            </pre>
          )}
          {output && (
            <div className="flex gap-2 mt-3">
              <button onClick={copy} className={`btn btn-sm ${copied ? 'btn-green' : 'btn-ghost'}`}>
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
              <button onClick={() => {
                const a = document.createElement('a')
                a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(output)
                a.download = 'formatted.json'; a.click()
              }} className="btn btn-ghost btn-sm">⬇️ Download</button>
              <span className="ml-auto text-xs text-gray-400 self-center">{output.length} chars</span>
            </div>
          )}
        </div>
      </div>

      {/* Trust line */}
      <p className="text-xs text-center text-gray-400">
        🔒 All processing runs locally in your browser. No data is uploaded or stored.
      </p>
    </div>
  )
}
