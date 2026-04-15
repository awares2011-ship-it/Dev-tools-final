"use client";
"use client";
'use client'
import { useState } from 'react'
export default function TextSorter({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('az')
  const [removeEmpty, setRemoveEmpty] = useState(true)
  const process = () => {
    let lines = input.split('\n')
    if (removeEmpty) lines = lines.filter(l => l.trim())
    if (mode==='az') lines.sort((a,b) => a.localeCompare(b))
    else if (mode==='za') lines.sort((a,b) => b.localeCompare(a))
    else if (mode==='len-asc') lines.sort((a,b) => a.length - b.length)
    else if (mode==='len-desc') lines.sort((a,b) => b.length - a.length)
    else if (mode==='num') lines.sort((a,b) => +a - +b)
    else if (mode==='random') lines.sort(() => Math.random()-0.5)
    return lines.join('\n')
  }
  const output = input ? process() : ''
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <label className="form-label">Input (one item per line)</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={7} placeholder={"banana\napple\ncherry\ndate"} />
        <div className="flex flex-wrap gap-2 items-center">
          <select value={mode} onChange={e => setMode(e.target.value)} className="form-select w-40">
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
            <option value="len-asc">Shortest first</option>
            <option value="len-desc">Longest first</option>
            <option value="num">Numeric</option>
            <option value="random">Random</option>
          </select>
          <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={removeEmpty} onChange={e => setRemoveEmpty(e.target.checked)} className="form-checkbox" />Remove empty lines
          </label>
        </div>
      </div>
      {output && (
        <div className="tool-box">
          <label className="form-label">Sorted Output</label>
          <div className="tool-output text-sm">{output}</div>
          <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm mt-3">📋 Copy</button>
        </div>
      )}
    </div>
  )
}
