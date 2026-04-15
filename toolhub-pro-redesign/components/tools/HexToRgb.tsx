"use client";
"use client";
'use client'
import { useState } from 'react'

function hexToRgbHsl(hex: string) {
  hex = hex.replace('#', '').trim()
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return null
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const rn = r/255, gn = g/255, bn = b/255
  const max = Math.max(rn,gn,bn), min = Math.min(rn,gn,bn), d = max - min
  let h = 0, s = 0, l = (max + min) / 2
  if (d) {
    s = d / (1 - Math.abs(2*l - 1))
    h = max===rn ? ((gn-bn)/d+6)%6 : max===gn ? (bn-rn)/d+2 : (rn-gn)/d+4
    h /= 6
  }
  return {
    hex: '#' + hex.toUpperCase(), r, g, b,
    hsl: `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`,
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, 1)`,
    h: Math.round(h*360), sat: Math.round(s*100), lig: Math.round(l*100),
  }
}

export default function HexToRgb({ accent }: { accent?: string }) {
  const [hex, setHex] = useState('#1D9E75')
  const result = hexToRgbHsl(hex)

  const copy = (val: string) => navigator.clipboard.writeText(val).then(() => alert('Copied!'))

  return (
    <div className="space-y-4">
      <div className="tool-box space-y-4">
        <div>
          <label className="form-label">Hex Color</label>
          <div className="flex gap-3 items-center">
            <input type="color" value={result ? result.hex.toLowerCase() : '#1d9e75'}
              onChange={e => setHex(e.target.value)}
              className="w-14 h-11 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer p-1 bg-transparent" />
            <input type="text" value={hex} onChange={e => setHex(e.target.value)}
              className="form-input flex-1 font-mono"
              placeholder="#1D9E75 or 1D9E75" />
          </div>
        </div>
      </div>
      {result ? (
        <>
          <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800" style={{ height: 100, background: result.hex }} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'HEX', value: result.hex, color: '#D85A30' },
              { label: 'RGB', value: result.rgb, color: '#1D9E75' },
              { label: 'HSL', value: result.hsl, color: '#7F77DD' },
              { label: 'RGBA', value: result.rgba, color: '#D4537E' },
            ].map(item => (
              <div key={item.label} className="stat-card cursor-pointer hover:ring-1 hover:ring-gray-300"
                onClick={() => copy(item.value)}>
                <div className="stat-value text-sm font-mono truncate" style={{ color: item.color }}>{item.value}</div>
                <div className="stat-label">{item.label} — click to copy</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          ❌ Invalid hex color. Use format #RRGGBB or #RGB
        </div>
      )}
    </div>
  )
}
