"use client";
"use client";
'use client'
import { useState, useEffect } from 'react'

function uuid4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

function formatUuid(id: string, fmt: string) {
  if (fmt === 'uppercase') return id.toUpperCase()
  if (fmt === 'no-hyphens') return id.replace(/-/g, '')
  if (fmt === 'braces') return `{${id}}`
  return id
}

export default function UuidGenerator({ accent }: { accent?: string }) {
  const [format, setFormat] = useState('standard')
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState<string[]>([])

  const generate = () => {
    const arr = Array.from({ length: count }, () => formatUuid(uuid4(), format))
    setUuids(arr)
  }
  useEffect(() => { generate() }, [])
  const copyAll = () => navigator.clipboard.writeText(uuids.join('\n')).then(() => alert('All copied!'))

  return (
    <div className="space-y-4">
      <div className="tool-box space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Format</label>
            <select value={format} onChange={e => setFormat(e.target.value)} className="form-select">
              <option value="standard">Standard (lowercase)</option>
              <option value="uppercase">Uppercase</option>
              <option value="no-hyphens">No Hyphens</option>
              <option value="braces">With Braces {'{}'}</option>
            </select>
          </div>
          <div>
            <label className="form-label">Count (1–20)</label>
            <input type="number" value={count} min={1} max={20}
              onChange={e => setCount(Math.min(20, Math.max(1, +e.target.value)))}
              className="form-input" />
          </div>
        </div>
        <button onClick={generate} className="btn btn-teal w-full">🎯 Generate UUIDs</button>
      </div>
      {uuids.length > 0 && (
        <div className="tool-box">
          <div className="flex justify-between items-center mb-3">
            <label className="form-label mb-0">Generated UUIDs</label>
            <button onClick={copyAll} className="btn btn-ghost btn-sm">📋 Copy All</button>
          </div>
          {uuids.map((id, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 mb-2">
              <code className="flex-1 text-xs font-mono text-gray-700 dark:text-gray-300 break-all">{id}</code>
              <button onClick={() => navigator.clipboard.writeText(id).then(() => alert('Copied!'))}
                className="btn btn-ghost btn-sm shrink-0">📋</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
