"use client";
"use client";
'use client'
import { useState } from 'react'

function b64Decode(str: string) {
  try { return JSON.parse(atob(str.replace(/-/g,'+').replace(/_/g,'/'))) }
  catch { return null }
}

export default function JwtDecoder({ accent }: { accent?: string }) {
  const [jwt, setJwt] = useState('')
  const parts = jwt.trim().split('.')
  const header = parts.length >= 1 ? b64Decode(parts[0]) : null
  const payload = parts.length >= 2 ? b64Decode(parts[1]) : null
  const sig = parts[2] || null
  const valid = header && payload

  const formatExp = (ts: number) => ts ? new Date(ts*1000).toLocaleString() : 'N/A'

  return (
    <div className="space-y-4">
      <div className="tool-box">
        <label className="form-label">JWT Token</label>
        <textarea value={jwt} onChange={e => setJwt(e.target.value)}
          className="tool-input text-xs" rows={4}
          placeholder="Paste your JWT token here…&#10;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" />
        <button onClick={() => setJwt('')} className="btn btn-ghost btn-sm mt-3">Clear</button>
      </div>
      {valid && (
        <div className="space-y-3">
          {[
            { label: '🔵 Header', data: header, color: '#7F77DD' },
            { label: '🟢 Payload', data: payload, color: '#1D9E75' },
          ].map(s => (
            <div key={s.label} className="tool-box">
              <label className="form-label mb-2" style={{ color: s.color }}>{s.label}</label>
              <pre className="tool-output text-xs overflow-x-auto">{JSON.stringify(s.data, null, 2)}</pre>
              {s.label.includes('Payload') && (
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  {payload.exp && <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2"><span className="text-gray-500">exp:</span> <strong>{formatExp(payload.exp)}</strong></div>}
                  {payload.iat && <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-2"><span className="text-gray-500">iat:</span> <strong>{formatExp(payload.iat)}</strong></div>}
                  {payload.sub && <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 col-span-2"><span className="text-gray-500">sub:</span> <strong>{payload.sub}</strong></div>}
                </div>
              )}
            </div>
          ))}
          <div className="tool-box">
            <label className="form-label" style={{ color: '#D85A30' }}>🔴 Signature</label>
            <div className="tool-output text-xs break-all">{sig}</div>
            <p className="text-xs text-gray-500 mt-2">Signature verification requires the secret key — this is intentionally not done client-side.</p>
          </div>
        </div>
      )}
      {jwt && !valid && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">❌ Invalid JWT format. A valid JWT has three Base64url-encoded parts separated by dots.</div>
      )}
    </div>
  )
}
