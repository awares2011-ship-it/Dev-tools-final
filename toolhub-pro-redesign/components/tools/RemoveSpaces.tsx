"use client";
"use client";
'use client'
import { useState } from 'react'
export default function RemoveSpaces({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [trimEdges, setTrimEdges] = useState(true)
  const [collapseMultiple, setCollapseMultiple] = useState(true)
  const [removeNbsp, setRemoveNbsp] = useState(true)
  const process = () => {
    let r = input
    if (removeNbsp) r = r.replace(/\u00a0/g, ' ')
    if (collapseMultiple) r = r.replace(/ {2,}/g, ' ')
    if (trimEdges) r = r.trim()
    return r
  }
  const output = process()
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <label className="form-label">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={6} placeholder="Text   with   extra   spaces…" />
        <div className="space-y-2">
          {[
            {label:'Trim leading/trailing spaces', val:trimEdges, set:setTrimEdges},
            {label:'Collapse multiple spaces to one', val:collapseMultiple, set:setCollapseMultiple},
            {label:'Replace non-breaking spaces (\u00a0)', val:removeNbsp, set:setRemoveNbsp},
          ].map(o => (
            <label key={o.label} className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
              <input type="checkbox" checked={o.val} onChange={e => o.set(e.target.checked)} className="form-checkbox" />{o.label}
            </label>
          ))}
        </div>
      </div>
      {input && (
        <div className="tool-box">
          <label className="form-label">Cleaned Output</label>
          <div className="tool-output text-sm">{output}</div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm">📋 Copy</button>
            <span className="text-xs text-gray-400 ml-auto self-center">
              Saved {input.length - output.length} chars
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
