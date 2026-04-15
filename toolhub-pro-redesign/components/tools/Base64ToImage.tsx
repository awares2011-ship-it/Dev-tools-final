"use client";
"use client";
'use client'
import { useState } from 'react'
export default function Base64ToImage({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const src = input.startsWith('data:') ? input : input ? `data:image/png;base64,${input}` : ''
  const download = () => {
    if (!src) return
    const a = document.createElement('a'); a.href = src; a.download = 'image'; a.click()
  }
  return (
    <div className="space-y-4">
      <div className="tool-box">
        <label className="form-label">Base64 String or Data URI</label>
        <textarea value={input} onChange={e => { setInput(e.target.value); setError('') }}
          className="tool-input text-xs" rows={6}
          placeholder="Paste Base64 string or full data URI (data:image/png;base64,...)" />
        <button onClick={() => { setInput(''); setError('') }} className="btn btn-ghost btn-sm mt-3">Clear</button>
      </div>
      {src && (
        <div className="tool-box">
          <label className="form-label">Decoded Image</label>
          <img src={src} alt="decoded" className="max-w-full rounded-xl"
            onError={() => setError('Could not decode image. Ensure valid Base64.')} />
          {error && <p className="text-red-600 text-sm mt-2">❌ {error}</p>}
          {!error && <button onClick={download} className="btn btn-ghost btn-sm mt-3">⬇️ Download Image</button>}
        </div>
      )}
    </div>
  )
}
