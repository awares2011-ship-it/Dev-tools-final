"use client";
"use client";
'use client'
import { useState } from 'react'
export default function PercentageCalc({ accent }: { accent?: string }) {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const results = {
    pctOf: a && b ? ((+a / 100) * +b).toFixed(4) : '',
    whatPct: a && b ? ((+a / +b) * 100).toFixed(4) : '',
    increase: a && b ? (((+b - +a) / +a) * 100).toFixed(4) : '',
    result: a && b ? (+a + (+a * +b / 100)).toFixed(4) : '',
  }
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="form-label">Value A</label>
            <input type="number" value={a} onChange={e => setA(e.target.value)} className="form-input" placeholder="e.g. 25" /></div>
          <div><label className="form-label">Value B</label>
            <input type="number" value={b} onChange={e => setB(e.target.value)} className="form-input" placeholder="e.g. 200" /></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: `${a||'A'}% of ${b||'B'}`, value: results.pctOf, color: '#1D9E75' },
          { label: `${a||'A'} is __% of ${b||'B'}`, value: results.whatPct ? results.whatPct + '%' : '', color: '#7F77DD' },
          { label: `% change from ${a||'A'} to ${b||'B'}`, value: results.increase ? results.increase + '%' : '', color: '#D85A30' },
          { label: `${a||'A'} increased by ${b||'B'}%`, value: results.result, color: '#D4537E' },
        ].map(r => (
          <div key={r.label} className="stat-card text-left px-4">
            <div className="text-xs text-gray-500 mb-1">{r.label}</div>
            <div className="text-xl font-extrabold" style={{ color: r.color }}>{r.value || '—'}</div>
            {r.value && <button onClick={() => navigator.clipboard.writeText(r.value).then(() => alert('Copied!'))} className="text-xs text-gray-400 mt-1 hover:text-gray-600">📋 Copy</button>}
          </div>
        ))}
      </div>
    </div>
  )
}
