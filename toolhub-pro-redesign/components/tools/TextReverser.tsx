"use client";
"use client";
'use client'
import { useState } from 'react'
export default function TextReverser({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('chars')
  const reverse = () => {
    if (mode === 'chars') return input.split('').reverse().join('')
    if (mode === 'words') return input.split(' ').reverse().join(' ')
    return input.split('\n').reverse().join('\n')
  }
  const output = input ? reverse() : ''
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <label className="form-label">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={5} placeholder="Hello World" />
        <div className="flex gap-2 flex-wrap">
          {[{v:'chars',l:'Reverse Characters'},{v:'words',l:'Reverse Words'},{v:'lines',l:'Reverse Lines'}].map(m=>(
            <button key={m.v} onClick={() => setMode(m.v)}
              className={`btn btn-sm ${mode===m.v?'btn-teal':'btn-ghost'}`}>{m.l}</button>
          ))}
        </div>
      </div>
      {output && (
        <div className="tool-box">
          <label className="form-label">Reversed Output</label>
          <div className="tool-output">{output}</div>
          <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm mt-3">📋 Copy</button>
        </div>
      )}
    </div>
  )
}
