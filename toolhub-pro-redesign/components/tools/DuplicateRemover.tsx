"use client";
"use client";
'use client'
import { useState } from 'react'
export default function DuplicateRemover({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [sort, setSort] = useState(false)
  const process = () => {
    const lines = input.split('\n')
    const seen = new Set<string>()
    let result = lines.filter(l => {
      const key = caseSensitive ? l : l.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key); return true
    })
    if (sort) result = result.sort()
    return result.join('\n')
  }
  const output = process()
  const inputLines = input.split('\n').length
  const outputLines = output.split('\n').filter(Boolean).length
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <label className="form-label">Input (one item per line)</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={7} placeholder={"apple\nbanana\napple\ncherry\nbanana\ndate"} />
        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} className="form-checkbox" />Case-sensitive
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={sort} onChange={e => setSort(e.target.checked)} className="form-checkbox" />Sort result
          </label>
        </div>
      </div>
      {input && (
        <div className="tool-box">
          <div className="flex justify-between items-center mb-2">
            <label className="form-label mb-0">Unique Lines</label>
            <span className="text-xs text-gray-500">
              {inputLines} → {outputLines} lines (removed {inputLines - outputLines})
            </span>
          </div>
          <div className="tool-output text-sm">{output}</div>
          <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm mt-3">📋 Copy</button>
        </div>
      )}
    </div>
  )
}
