"use client";
"use client";
'use client'
import { useState } from 'react'

function checkStrength(pw: string) {
  let score = 0
  const checks = {
    length8: pw.length >= 8,
    length12: pw.length >= 12,
    length16: pw.length >= 16,
    hasUpper: /[A-Z]/.test(pw),
    hasLower: /[a-z]/.test(pw),
    hasNum: /\d/.test(pw),
    hasSym: /[^A-Za-z0-9]/.test(pw),
    noCommon: !['password','123456','qwerty','admin','letmein'].some(c => pw.toLowerCase().includes(c)),
  }
  if (checks.length8) score++
  if (checks.length12) score++
  if (checks.length16) score++
  if (checks.hasUpper) score++
  if (checks.hasLower) score++
  if (checks.hasNum) score++
  if (checks.hasSym) score += 2
  if (checks.noCommon) score++
  const level = score <= 2 ? 'Weak' : score <= 4 ? 'Fair' : score <= 6 ? 'Good' : 'Strong'
  const pct = Math.min(100, Math.round((score / 9) * 100))
  const color = score <= 2 ? '#E24B4A' : score <= 4 ? '#BA7517' : score <= 6 ? '#1D9E75' : '#639922'
  return { score, level, pct, color, checks }
}

export default function PasswordStrength({ accent }: { accent?: string }) {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const result = checkStrength(pw)

  return (
    <div className="space-y-4">
      <div className="tool-box space-y-4">
        <div>
          <label className="form-label">Password to Check</label>
          <div className="relative">
            <input type={show ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)}
              className="form-input pr-12"
              placeholder="Enter any password to analyse its strength…" />
            <button onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm">
              {show ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        {pw && (
          <>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold" style={{ color: result.color }}>{result.level}</span>
                <span className="text-gray-400">{result.pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${result.pct}%`, background: result.color }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: '8+ characters', ok: result.checks.length8 },
                { label: '12+ characters', ok: result.checks.length12 },
                { label: 'Uppercase letter', ok: result.checks.hasUpper },
                { label: 'Lowercase letter', ok: result.checks.hasLower },
                { label: 'Number', ok: result.checks.hasNum },
                { label: 'Symbol (!@#$)', ok: result.checks.hasSym },
                { label: 'No common words', ok: result.checks.noCommon },
                { label: '16+ characters', ok: result.checks.length16 },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-2 text-sm">
                  <span style={{ color: c.ok ? '#1D9E75' : '#E24B4A' }}>{c.ok ? '✅' : '❌'}</span>
                  <span className={c.ok ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}>{c.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
