"use client";
"use client";
'use client'
import { useState } from 'react'
const LOREM = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')
export default function LoremGenerator({ accent }: { accent?: string }) {
  const [type, setType] = useState('paragraphs')
  const [count, setCount] = useState(3)
  const [output, setOutput] = useState('')
  const generate = () => {
    if (type === 'words') {
      const words = Array.from({length: count}, (_,i) => LOREM[i % LOREM.length]).join(' ')
      setOutput(words)
    } else if (type === 'sentences') {
      const sents = Array.from({length: count}, (_,i) => {
        const start = (i * 7) % LOREM.length
        return LOREM.slice(start, start+12).join(' ') + '.'
      })
      setOutput(sents.join(' '))
    } else {
      const paras = Array.from({length: count}, (_,i) => {
        const start = (i * 15) % LOREM.length
        return LOREM.slice(start, start + 40).join(' ') + '.'
      })
      setOutput(paras.join('\n\n'))
    }
  }
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="form-label">Type</label>
            <select value={type} onChange={e => setType(e.target.value)} className="form-select">
              <option value="words">Words</option>
              <option value="sentences">Sentences</option>
              <option value="paragraphs">Paragraphs</option>
            </select>
          </div>
          <div>
            <label className="form-label">Count</label>
            <input type="number" value={count} min={1} max={20} onChange={e => setCount(Math.min(20, Math.max(1, +e.target.value)))} className="form-input" />
          </div>
        </div>
        <button onClick={generate} className="btn btn-teal w-full">🎲 Generate Lorem Ipsum</button>
      </div>
      {output && (
        <div className="tool-box">
          <label className="form-label">Generated Text</label>
          <div className="tool-output text-sm whitespace-pre-wrap">{output}</div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm">📋 Copy</button>
            <button onClick={generate} className="btn btn-ghost btn-sm">🔄 Regenerate</button>
          </div>
        </div>
      )}
    </div>
  )
}
