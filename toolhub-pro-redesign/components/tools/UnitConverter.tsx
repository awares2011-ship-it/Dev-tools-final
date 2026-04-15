"use client";
"use client";
'use client'
import { useState } from 'react'
const UNITS = {
  length: { m:1, km:0.001, cm:100, mm:1000, ft:3.28084, inch:39.3701, mi:0.000621371, yd:1.09361 },
  weight: { kg:1, g:1000, lb:2.20462, oz:35.274, mg:1e6, tonne:0.001 },
  temperature: { C:1, F:1, K:1 },
  speed: { 'km/h':3.6, 'mph':2.23694, 'm/s':1, knot:1.94384 },
}
function convertTemp(val: number, from: string, to: string) {
  let celsius = from==='F' ? (val-32)*5/9 : from==='K' ? val-273.15 : val
  if (to==='F') return celsius*9/5+32
  if (to==='K') return celsius+273.15
  return celsius
}
export default function UnitConverter({ accent }: { accent?: string }) {
  const [category, setCategory] = useState<'length'|'weight'|'temperature'|'speed'>('length')
  const [val, setVal] = useState('')
  const [from, setFrom] = useState('m')
  const cats = Object.keys(UNITS) as Array<'length'|'weight'|'temperature'|'speed'>
  const units = Object.keys(UNITS[category])
  const COLORS = ['#1D9E75','#D85A30','#7F77DD','#D4537E','#BA7517','#639922','#E24B4A','#1D9E75']
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <div className="flex gap-2 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => { setCategory(c); setFrom(Object.keys(UNITS[c])[0]) }}
              className={`btn btn-sm ${category===c?'btn-teal':'btn-ghost'} capitalize`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="form-label">Value</label>
            <input type="number" value={val} onChange={e => setVal(e.target.value)} className="form-input" placeholder="Enter value…" />
          </div>
          <div>
            <label className="form-label">From</label>
            <select value={from} onChange={e => setFrom(e.target.value)} className="form-select">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>
      {val && !isNaN(+val) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {units.map((u,i) => {
            let result: number
            if (category === 'temperature') result = convertTemp(+val, from, u)
            else {
              const baseVal = +val / (UNITS[category] as any)[from]
              result = baseVal * (UNITS[category] as any)[u]
            }
            return (
              <div key={u} className="tool-box cursor-pointer hover:ring-1 hover:ring-gray-200"
                onClick={() => navigator.clipboard.writeText(result.toFixed(6)).then(() => alert('Copied!'))}>
                <div className="font-mono text-lg font-bold" style={{color:COLORS[i%8]}}>{result.toFixed(4)}</div>
                <div className="text-xs text-gray-500 mt-1">{u} — click to copy</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
