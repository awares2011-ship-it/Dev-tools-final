"use client";
"use client";
'use client'
import { useState, useEffect } from 'react'

export default function PasswordGenerator({ accent }: { accent?: string }) {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [nums, setNums] = useState(true)
  const [syms, setSyms] = useState(true)
  const [count, setCount] = useState(5)
  const [passwords, setPasswords] = useState<string[]>([])

  const generate = () => {
    let chars = ''
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (nums)  chars += '0123456789'
    if (syms)  chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'
    const arr = new Uint32Array(count * length)
    crypto.getRandomValues(arr)
    const result: string[] = []
    for (let i = 0; i < count; i++) {
      let pw = ''
      for (let j = 0; j < length; j++) pw += chars[arr[i * length + j] % chars.length]
      result.push(pw)
    }
    setPasswords(result)
  }

  useEffect(() => { generate() }, [])

  const copy = (pw: string) => navigator.clipboard.writeText(pw).then(() => alert('Copied!'))
  const copyAll = () => navigator.clipboard.writeText(passwords.join('\n')).then(() => alert('All copied!'))

  return (
    <div className="space-y-4">
      <div className="tool-box space-y-4">
        <div>
          <label className="form-label">Length: <strong style={{ color: accent }}>{length}</strong></label>
          <input type="range" min={6} max={64} value={length}
            onChange={e => setLength(+e.target.value)} className="w-full accent-teal-500 mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Uppercase (A-Z)', val: upper, set: setUpper },
            { label: 'Lowercase (a-z)', val: lower, set: setLower },
            { label: 'Numbers (0-9)',   val: nums,  set: setNums },
            { label: 'Symbols (!@#$)', val: syms,  set: setSyms },
          ].map(o => (
            <label key={o.label} className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
              <input type="checkbox" checked={o.val} onChange={e => o.set(e.target.checked)} className="form-checkbox" />
              {o.label}
            </label>
          ))}
        </div>
        <div>
          <label className="form-label">Count (1–20)</label>
          <input type="number" min={1} max={20} value={count}
            onChange={e => setCount(Math.min(20, Math.max(1, +e.target.value)))}
            className="form-input w-24" />
        </div>
        <button onClick={generate} className="btn btn-teal w-full">🔑 Generate Passwords</button>
      </div>
      {passwords.length > 0 && (
        <div className="tool-box space-y-2">
          <div className="flex justify-between items-center mb-2">
            <label className="form-label mb-0">Generated Passwords</label>
            <button onClick={copyAll} className="btn btn-ghost btn-sm">📋 Copy All</button>
          </div>
          {passwords.map((pw, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
              <code className="flex-1 text-sm font-mono text-gray-900 dark:text-gray-100 break-all">{pw}</code>
              <button onClick={() => copy(pw)} className="btn btn-ghost btn-sm shrink-0">📋</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
