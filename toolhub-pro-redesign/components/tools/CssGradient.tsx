"use client";
"use client";
'use client'
import { useState } from 'react'

export default function CssGradient({ accent }: { accent?: string }) {
  const [type, setType] = useState('linear')
  const [color1, setColor1] = useState('#7F77DD')
  const [color2, setColor2] = useState('#D4537E')
  const [angle, setAngle] = useState(135)

  const css = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : type === 'radial'
    ? `radial-gradient(circle, ${color1}, ${color2})`
    : `conic-gradient(${color1}, ${color2}, ${color1})`

  const full = `background: ${css};`
  const copy = () => navigator.clipboard.writeText(full).then(() => alert('CSS copied!'))

  return (
    <div className="space-y-4">
      <div className="tool-box space-y-4">
        <div>
          <label className="form-label">Gradient Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="form-select">
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
            <option value="conic">Conic</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Color 1</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={color1} onChange={e => setColor1(e.target.value)}
                className="w-11 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
              <input type="text" value={color1} onChange={e => setColor1(e.target.value)}
                className="form-input flex-1 font-mono text-sm" />
            </div>
          </div>
          <div>
            <label className="form-label">Color 2</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={color2} onChange={e => setColor2(e.target.value)}
                className="w-11 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
              <input type="text" value={color2} onChange={e => setColor2(e.target.value)}
                className="form-input flex-1 font-mono text-sm" />
            </div>
          </div>
        </div>
        {type === 'linear' && (
          <div>
            <label className="form-label">Angle: <strong style={{ color: accent }}>{angle}°</strong></label>
            <input type="range" min={0} max={360} value={angle}
              onChange={e => setAngle(+e.target.value)} className="w-full accent-purple-500 mt-1" />
          </div>
        )}
      </div>
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800"
        style={{ height: 140, background: css }} />
      <div className="tool-box">
        <label className="form-label">CSS Output</label>
        <div className="tool-output text-sm font-mono">{full}</div>
        <button onClick={copy} className="btn btn-ghost btn-sm mt-3">📋 Copy CSS</button>
      </div>
    </div>
  )
}
