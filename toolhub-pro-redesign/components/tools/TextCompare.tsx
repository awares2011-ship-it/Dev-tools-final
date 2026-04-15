"use client";
"use client";
'use client'
import { useState, useMemo } from 'react'
export default function TextCompare({ accent }: { accent?: string }) {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const diff = useMemo(() => {
    if (!text1 || !text2) return null
    const l1 = text1.split('\n'), l2 = text2.split('\n')
    const max = Math.max(l1.length, l2.length)
    const result = []
    let added = 0, removed = 0, same = 0
    for (let i = 0; i < max; i++) {
      const a = l1[i] ?? '', b = l2[i] ?? ''
      if (a === b) { result.push({ type: 'same', val: a }); same++ }
      else {
        if (a) { result.push({ type: 'removed', val: a }); removed++ }
        if (b) { result.push({ type: 'added', val: b }); added++ }
      }
    }
    return { lines: result, added, removed, same }
  }, [text1, text2])
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="tool-box">
          <label className="form-label" style={{color:'#E24B4A'}}>Original Text</label>
          <textarea value={text1} onChange={e => setText1(e.target.value)} className="tool-input" rows={7} placeholder="Paste original text here…" />
        </div>
        <div className="tool-box">
          <label className="form-label" style={{color:'#1D9E75'}}>Modified Text</label>
          <textarea value={text2} onChange={e => setText2(e.target.value)} className="tool-input" rows={7} placeholder="Paste modified text here…" />
        </div>
      </div>
      {diff && (
        <>
          <div className="grid grid-cols-3 gap-3">
            {[{l:'Added Lines',v:diff.added,c:'#1D9E75'},{l:'Removed Lines',v:diff.removed,c:'#E24B4A'},{l:'Unchanged',v:diff.same,c:'#888'}].map(s=>(
              <div key={s.l} className="stat-card"><div className="stat-value" style={{color:s.c}}>{s.v}</div><div className="stat-label">{s.l}</div></div>
            ))}
          </div>
          <div className="tool-box">
            <label className="form-label">Diff Output</label>
            <div className="font-mono text-xs space-y-0.5 max-h-80 overflow-y-auto">
              {diff.lines.map((l,i) => (
                <div key={i} className={`px-3 py-0.5 rounded ${l.type==='added'?'bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200':l.type==='removed'?'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200':'text-gray-600 dark:text-gray-400'}`}>
                  {l.type==='added'?'+ ':l.type==='removed'?'- ':'  '}{l.val || ' '}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
