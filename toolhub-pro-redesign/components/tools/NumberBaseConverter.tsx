"use client";
"use client";
'use client'
import { useState } from 'react'
export default function NumberBaseConverter({ accent }: { accent?: string }) {
  const [decimal, setDecimal] = useState('')
  const num = parseInt(decimal, 10)
  const valid = !isNaN(num) && num >= 0
  const conversions = valid ? [
    { label: 'Binary (Base 2)', value: num.toString(2), prefix: '0b' },
    { label: 'Octal (Base 8)', value: num.toString(8), prefix: '0o' },
    { label: 'Decimal (Base 10)', value: num.toString(10), prefix: '' },
    { label: 'Hexadecimal (Base 16)', value: num.toString(16).toUpperCase(), prefix: '0x' },
    { label: 'Base 32', value: num.toString(32).toUpperCase(), prefix: '' },
    { label: 'Base 36', value: num.toString(36).toUpperCase(), prefix: '' },
  ] : []
  const COLORS = ['#D85A30','#7F77DD','#1D9E75','#D4537E','#BA7517','#639922']
  return (
    <div className="space-y-4">
      <div className="tool-box">
        <label className="form-label">Decimal Number</label>
        <input type="number" value={decimal} onChange={e => setDecimal(e.target.value)}
          className="form-input text-xl font-mono" placeholder="e.g. 255" min={0} />
      </div>
      {conversions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {conversions.map((c,i) => (
            <div key={c.label} className="tool-box cursor-pointer hover:ring-1 hover:ring-gray-200"
              onClick={() => navigator.clipboard.writeText(c.value).then(() => alert('Copied!'))}>
              <div className="form-label mb-1">{c.label}</div>
              <div className="font-mono text-base font-bold break-all" style={{color:COLORS[i]}}>
                {c.prefix}{c.value}
              </div>
              <div className="text-xs text-gray-400 mt-1">Click to copy</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
