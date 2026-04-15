"use client";
"use client";
'use client'
import { useState } from 'react'
export default function LineBreakRemover({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [sep, setSep] = useState(' ')
  const output = input.replace(/\r?\n/g, sep)
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <label className="form-label">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={7} placeholder={"Line one\nLine two\nLine three"} />
        <div className="flex items-center gap-3">
          <label className="form-label mb-0 text-xs">Join with</label>
          <select value={sep} onChange={e => setSep(e.target.value)} className="form-select w-36">
            <option value=" ">Space</option>
            <option value=", ">Comma + space</option>
            <option value=" | ">Pipe</option>
            <option value="">Nothing</option>
          </select>
        </div>
      </div>
      {input && (
        <div className="tool-box">
          <label className="form-label">Output (no line breaks)</label>
          <div className="tool-output text-sm">{output}</div>
          <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm mt-3">📋 Copy</button>
        </div>
      )}
    </div>
  )
}
