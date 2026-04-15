"use client";
"use client";
'use client'
import { useState } from 'react'
const ZONES = ['UTC','America/New_York','America/Chicago','America/Denver','America/Los_Angeles','America/Sao_Paulo','Europe/London','Europe/Paris','Europe/Berlin','Europe/Moscow','Asia/Dubai','Asia/Kolkata','Asia/Bangkok','Asia/Singapore','Asia/Tokyo','Asia/Shanghai','Australia/Sydney','Pacific/Auckland']
export default function TimezoneConverter({ accent }: { accent?: string }) {
  const [dt, setDt] = useState(() => new Date().toISOString().slice(0,16))
  const [from, setFrom] = useState('UTC')
  const d = new Date(dt)
  const COLORS = ['#1D9E75','#D85A30','#7F77DD','#D4537E','#BA7517','#639922']
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="form-label">Date & Time</label>
            <input type="datetime-local" value={dt} onChange={e => setDt(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="form-label">From Timezone</label>
            <select value={from} onChange={e => setFrom(e.target.value)} className="form-select">
              {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ZONES.slice(0,12).map((tz,i) => {
          try {
            const formatted = d.toLocaleString('en-US', { timeZone: tz, dateStyle: 'medium', timeStyle: 'short' })
            return (
              <div key={tz} className="tool-box">
                <div className="text-xs font-bold mb-1" style={{color:COLORS[i%6]}}>{tz.replace('_',' ')}</div>
                <div className="font-mono text-sm text-gray-900 dark:text-gray-100">{formatted}</div>
              </div>
            )
          } catch { return null }
        })}
      </div>
    </div>
  )
}
