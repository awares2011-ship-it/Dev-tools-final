"use client";
"use client";
'use client'
import { useState, useCallback, useEffect } from 'react'

interface Props { toolId: string; accent?: string }

function useClipboard() {
  const [copied, setCopied] = useState(false)
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = text; document.body.appendChild(ta); ta.select()
      document.execCommand('copy'); document.body.removeChild(ta)
    })
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }, [])
  return { copied, copy }
}

function download(text: string, name = 'output.txt') {
  const a = document.createElement('a')
  a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  a.download = name; a.click()
}

function CopyBtn({ text, accent }: { text: string; accent?: string }) {
  const { copied, copy } = useClipboard()
  return (
    <button onClick={() => copy(text)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
      {copied ? '✅ Copied!' : '📋 Copy'}
    </button>
  )
}

function Box({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="tool-box">
      {label && <label className="form-label">{label}</label>}
      {children}
    </div>
  )
}

function StatRow({ stats }: { stats: { label: string; value: string | number; color: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map(s => (
        <div key={s.label} className="stat-card">
          <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

// ── WORD COUNTER ──────────────────────────────────────────────
function WordCounter({ accent }: { accent?: string }) {
  const [text, setText] = useState('')
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const sentences = (text.match(/[.!?]+/g) || []).length
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length
  const lines = text.split('\n').length
  const readTime = Math.ceil(words / 200)
  const unique = new Set((text.toLowerCase().match(/\b\w+\b/g) || [])).size
  return (
    <div className="space-y-4">
      <Box label="Input Text">
        <textarea value={text} onChange={e => setText(e.target.value)} className="tool-input" rows={8} placeholder="Paste or type your text here…" />
        <div className="flex gap-2 mt-3">
          <button onClick={() => setText('')} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Clear</button>
          <CopyBtn text={text} accent={accent} />
        </div>
      </Box>
      <StatRow stats={[
        { label: 'Words', value: words.toLocaleString(), color: '#1D9E75' },
        { label: 'Characters', value: chars.toLocaleString(), color: '#D85A30' },
        { label: 'Sentences', value: sentences.toLocaleString(), color: '#7F77DD' },
        { label: 'Paragraphs', value: paragraphs.toLocaleString(), color: '#D4537E' },
        { label: 'Lines', value: lines.toLocaleString(), color: '#BA7517' },
        { label: 'Chars (no spaces)', value: charsNoSpace.toLocaleString(), color: '#639922' },
        { label: 'Min Read', value: readTime, color: '#1D9E75' },
        { label: 'Unique Words', value: unique.toLocaleString(), color: '#D85A30' },
      ]} />
    </div>
  )
}

// ── JSON FORMATTER ────────────────────────────────────────────
function JsonFormatter({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)
  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, indent)); setError('') }
    catch (e: any) { setError(e.message); setOutput('') }
  }
  const minify = () => {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError('') }
    catch (e: any) { setError(e.message) }
  }
  const validate = () => {
    try { JSON.parse(input); setOutput('✅ Valid JSON! No syntax errors found.'); setError('') }
    catch (e: any) { setError('❌ Invalid JSON: ' + e.message); setOutput('') }
  }
  return (
    <div className="space-y-4">
      <Box label="JSON Input">
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={8} placeholder='{"name":"ToolHub","version":1,"tools":["JSON","Base64"]}' />
        <div className="flex flex-wrap gap-2 mt-3 items-center">
          <button onClick={format} className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: accent }}>✨ Format</button>
          <button onClick={minify} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">🗜️ Minify</button>
          <button onClick={validate} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">✅ Validate</button>
          <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Clear</button>
          <select value={indent} onChange={e => setIndent(+e.target.value)} className="px-2 py-1.5 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <option value={2}>2 spaces</option><option value={4}>4 spaces</option>
          </select>
        </div>
      </Box>
      {error && <div className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3 border border-red-200 dark:border-red-800">{error}</div>}
      {output && (
        <Box label="Output">
          <pre className="tool-output text-xs">{output}</pre>
          <div className="flex gap-2 mt-3">
            <CopyBtn text={output} accent={accent} />
            <button onClick={() => download(output, 'formatted.json')} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">⬇️ Download</button>
          </div>
        </Box>
      )}
    </div>
  )
}

// ── PASSWORD GENERATOR ────────────────────────────────────────
function PasswordGenerator({ accent }: { accent?: string }) {
  const [len, setLen] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [nums, setNums] = useState(true)
  const [syms, setSyms] = useState(true)
  const [count, setCount] = useState(5)
  const [passwords, setPasswords] = useState<string[]>([])
  const generate = useCallback(() => {
    let chars = ''
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (nums) chars += '0123456789'
    if (syms) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'
    const arr = new Uint32Array(len * count)
    crypto.getRandomValues(arr)
    const pws: string[] = []
    for (let i = 0; i < count; i++) {
      let pw = ''
      for (let j = 0; j < len; j++) pw += chars[arr[i * len + j] % chars.length]
      pws.push(pw)
    }
    setPasswords(pws)
  }, [len, upper, lower, nums, syms, count])
  useEffect(() => { generate() }, [generate])
  const { copy } = useClipboard()
  return (
    <div className="space-y-4">
      <Box label="Settings">
        <div className="space-y-4">
          <div>
            <label className="form-label">Length: <strong>{len}</strong></label>
            <input type="range" min={6} max={64} value={len} onChange={e => setLen(+e.target.value)} className="w-full accent-[#1D9E75] mt-1" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>6</span><span>64</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[['Uppercase (A-Z)', upper, setUpper],['Lowercase (a-z)', lower, setLower],['Numbers (0-9)', nums, setNums],['Symbols (!@#)', syms, setSyms]].map(([label, val, setter]) => (
              <label key={label as string} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" checked={val as boolean} onChange={e => (setter as any)(e.target.checked)} className="form-checkbox" />
                {label as string}
              </label>
            ))}
          </div>
          <div>
            <label className="form-label">Count (1–20)</label>
            <input type="number" value={count} min={1} max={20} onChange={e => setCount(Math.min(20, Math.max(1, +e.target.value)))} className="form-input" />
          </div>
          <button onClick={generate} className="w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90" style={{ background: accent }}>🔑 Generate Passwords</button>
        </div>
      </Box>
      <Box label="Generated Passwords">
        <div className="space-y-2">
          {passwords.map((pw, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5">
              <code className="flex-1 text-xs font-mono text-gray-800 dark:text-gray-200 break-all">{pw}</code>
              <button onClick={() => copy(pw)} className="shrink-0 px-2 py-1 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 transition-all">📋</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <CopyBtn text={passwords.join('\n')} accent={accent} />
          <button onClick={() => download(passwords.join('\n'), 'passwords.txt')} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">⬇️ Download</button>
        </div>
      </Box>
    </div>
  )
}

// ── PASSWORD STRENGTH CHECKER ─────────────────────────────────
function PasswordStrength({ accent }: { accent?: string }) {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const score = (() => {
    if (!pw) return { score: 0, label: 'Enter a password', color: '#9ca3af', pct: 0, tips: [] }
    let s = 0
    const tips: string[] = []
    if (pw.length >= 8) s += 1; else tips.push('Use at least 8 characters')
    if (pw.length >= 12) s += 1; else tips.push('Use at least 12 characters for better security')
    if (/[A-Z]/.test(pw)) s += 1; else tips.push('Add uppercase letters')
    if (/[a-z]/.test(pw)) s += 1; else tips.push('Add lowercase letters')
    if (/[0-9]/.test(pw)) s += 1; else tips.push('Add numbers')
    if (/[^A-Za-z0-9]/.test(pw)) s += 1; else tips.push('Add symbols (!@#$%)')
    if (!/(.)\1{2,}/.test(pw)) s += 1; else tips.push('Avoid repeated characters')
    const pct = Math.round((s / 7) * 100)
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Excellent']
    const colors = ['#E24B4A','#E24B4A','#BA7517','#BA7517','#1D9E75','#1D9E75','#639922']
    return { score: s, label: labels[Math.min(s, 6)], color: colors[Math.min(s, 6)], pct, tips }
  })()
  return (
    <div className="space-y-4">
      <Box label="Enter Password">
        <div className="relative">
          <input type={show ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)} className="form-input pr-10" placeholder="Type your password here…" />
          <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm">{show ? '🙈' : '👁️'}</button>
        </div>
        {pw && (
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm" style={{ color: score.color }}>{score.label}</span>
              <span className="text-xs text-gray-500">{score.pct}%</span>
            </div>
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score.pct}%`, background: score.color }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { l: 'Length', v: pw.length + ' chars', ok: pw.length >= 12 },
                { l: 'Uppercase', v: /[A-Z]/.test(pw) ? 'Yes ✓' : 'No ✗', ok: /[A-Z]/.test(pw) },
                { l: 'Numbers', v: /[0-9]/.test(pw) ? 'Yes ✓' : 'No ✗', ok: /[0-9]/.test(pw) },
                { l: 'Symbols', v: /[^A-Za-z0-9]/.test(pw) ? 'Yes ✓' : 'No ✗', ok: /[^A-Za-z0-9]/.test(pw) },
              ].map(item => (
                <div key={item.l} className={`rounded-lg px-3 py-2 text-center ${item.ok ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                  <div className={`font-bold ${item.ok ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{item.v}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-[10px] mt-0.5">{item.l}</div>
                </div>
              ))}
            </div>
            {score.tips.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
                <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">💡 Suggestions:</p>
                {score.tips.map(t => <p key={t} className="text-xs text-amber-700 dark:text-amber-400">• {t}</p>)}
              </div>
            )}
          </div>
        )}
      </Box>
    </div>
  )
}

// ── BASE64 ENCODER ────────────────────────────────────────────
function Base64Tool({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const encode = () => { try { setOutput(btoa(unescape(encodeURIComponent(input)))) } catch { setOutput('Error: invalid input') } }
  const decode = () => { try { setOutput(decodeURIComponent(escape(atob(input)))) } catch { setOutput('Error: invalid Base64 string') } }
  return (
    <div className="space-y-4">
      <Box label="Input">
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={6} placeholder="Enter text to encode, or Base64 to decode…" />
        <div className="flex gap-2 mt-3 flex-wrap">
          <button onClick={encode} className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: accent }}>🔐 Encode</button>
          <button onClick={decode} className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#D85A30] hover:bg-[#993C1D] transition-all">🔓 Decode</button>
          <button onClick={() => { setInput(''); setOutput('') }} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Clear</button>
        </div>
      </Box>
      {output && (
        <Box label="Output">
          <div className="tool-output text-sm">{output}</div>
          <div className="flex gap-2 mt-3">
            <CopyBtn text={output} accent={accent} />
            <button onClick={() => download(output)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">⬇️ Download</button>
          </div>
        </Box>
      )}
    </div>
  )
}

// ── URL ENCODER ───────────────────────────────────────────────
function UrlEncoder({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const encode = () => setOutput(encodeURIComponent(input))
  const decode = () => { try { setOutput(decodeURIComponent(input)) } catch { setOutput('Error: invalid percent-encoded string') } }
  const fullEncode = () => setOutput(input.split('').map(c => /[A-Za-z0-9_.~-]/.test(c) ? c : '%' + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(''))
  return (
    <div className="space-y-4">
      <Box label="Input URL / Text">
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={5} placeholder="https://example.com/search?q=hello world&lang=en" />
        <div className="flex gap-2 mt-3 flex-wrap">
          <button onClick={encode} className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: accent }}>🌐 Encode</button>
          <button onClick={decode} className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#D85A30] hover:bg-[#993C1D] transition-all">🔓 Decode</button>
          <button onClick={fullEncode} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Full Encode</button>
          <button onClick={() => { setInput(''); setOutput('') }} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Clear</button>
        </div>
      </Box>
      {output && (
        <Box label="Output">
          <div className="tool-output">{output}</div>
          <div className="flex gap-2 mt-3"><CopyBtn text={output} accent={accent} /></div>
        </Box>
      )}
    </div>
  )
}

// ── SLUG GENERATOR ────────────────────────────────────────────
function SlugGen({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [sep, setSep] = useState('-')
  const [toLower, setToLower] = useState(true)
  const slug = (() => {
    let s = input
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, sep)
      .replace(/--+/g, sep)
      .replace(/^-+|-+$/g, '')
    if (toLower) s = s.toLowerCase()
    return s || 'your-slug-here'
  })()
  const { copy } = useClipboard()
  return (
    <div className="space-y-4">
      <Box label="Input Text">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} className="form-input" placeholder="My Awesome Blog Post Title!" />
        <div className="flex flex-wrap gap-4 mt-3 items-center">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input type="checkbox" checked={toLower} onChange={e => setToLower(e.target.checked)} className="form-checkbox" />Lowercase
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Separator:</span>
            <select value={sep} onChange={e => setSep(e.target.value)} className="px-2 py-1 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
              <option value=".">Dot (.)</option>
            </select>
          </div>
        </div>
      </Box>
      <Box label="Generated Slug">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-4 font-mono text-lg font-bold break-all" style={{ color: accent }}>{slug}</div>
        <div className="flex gap-2 mt-3"><CopyBtn text={slug} accent={accent} /></div>
      </Box>
    </div>
  )
}

// ── TEXT CASE CONVERTER ───────────────────────────────────────
function TextCase({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const convert = (type: string) => {
    let r = input
    switch (type) {
      case 'upper': r = input.toUpperCase(); break
      case 'lower': r = input.toLowerCase(); break
      case 'title': r = input.replace(/\w\S*/g, t => t[0].toUpperCase() + t.slice(1).toLowerCase()); break
      case 'sentence': r = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(); break
      case 'camel': r = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, ''); break
      case 'pascal': r = input.replace(/(?:^\w|[A-Z]|\b\w)/g, w => w.toUpperCase()).replace(/\s+/g, ''); break
      case 'snake': r = input.toLowerCase().replace(/\s+/g, '_'); break
      case 'kebab': r = input.toLowerCase().replace(/\s+/g, '-'); break
      case 'constant': r = input.toUpperCase().replace(/\s+/g, '_'); break
    }
    setOutput(r)
  }
  const cases = [
    ['UPPERCASE', 'upper', '#7F77DD'],['lowercase', 'lower', '#1D9E75'],['Title Case', 'title', '#D85A30'],
    ['Sentence case', 'sentence', '#D4537E'],['camelCase', 'camel', '#BA7517'],['PascalCase', 'pascal', '#639922'],
    ['snake_case', 'snake', '#7F77DD'],['kebab-case', 'kebab', '#1D9E75'],['CONSTANT_CASE', 'constant', '#D85A30'],
  ]
  return (
    <div className="space-y-4">
      <Box label="Input Text">
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input-text" rows={5} placeholder="Type or paste your text here…" />
      </Box>
      <div className="flex flex-wrap gap-2">
        {cases.map(([label, type, color]) => (
          <button key={type} onClick={() => convert(type as string)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all hover:-translate-y-0.5"
            style={{ borderColor: color as string, color: color as string, background: `${color as string}10` }}>
            {label}
          </button>
        ))}
      </div>
      {output && (
        <Box label="Output">
          <div className="tool-output-text bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 text-sm">{output}</div>
          <div className="flex gap-2 mt-3">
            <CopyBtn text={output} accent={accent} />
            <button onClick={() => setInput(output)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Use as Input</button>
          </div>
        </Box>
      )}
    </div>
  )
}

// ── HEX TO RGB ────────────────────────────────────────────────
function HexToRgb({ accent }: { accent?: string }) {
  const [hex, setHex] = useState('#1D9E75')
  const [result, setResult] = useState({ r: 29, g: 158, b: 117, h: 158, s: 69, l: 37 })
  const convert = (h: string) => {
    let clean = h.replace('#', '')
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('')
    if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return
    const r = parseInt(clean.slice(0, 2), 16)
    const g = parseInt(clean.slice(2, 4), 16)
    const b = parseInt(clean.slice(4, 6), 16)
    const rn = r / 255, gn = g / 255, bn = b / 255
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn), d = max - min
    let hh = 0; const ll = (max + min) / 2
    const ss = d === 0 ? 0 : d / (1 - Math.abs(2 * ll - 1))
    if (d) { hh = max === rn ? ((gn - bn) / d + 6) % 6 : max === gn ? (bn - rn) / d + 2 : (rn - gn) / d + 4; hh /= 6 }
    setResult({ r, g, b, h: Math.round(hh * 360), s: Math.round(ss * 100), l: Math.round(ll * 100) })
  }
  useEffect(() => { convert(hex) }, [])
  return (
    <div className="space-y-4">
      <Box label="Hex Color">
        <div className="flex gap-3 items-center">
          <input type="color" value={hex} onChange={e => { setHex(e.target.value); convert(e.target.value) }} className="w-14 h-10 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 p-0.5" />
          <input type="text" value={hex} onChange={e => { setHex(e.target.value); convert(e.target.value) }} className="form-input flex-1" placeholder="#1D9E75" />
        </div>
        <button onClick={() => convert(hex)} className="mt-3 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: accent }}>🎨 Convert</button>
      </Box>
      <div className="h-20 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all" style={{ background: hex }} />
      <StatRow stats={[
        { label: 'HEX', value: hex.toUpperCase(), color: '#D85A30' },
        { label: 'RGB', value: `${result.r}, ${result.g}, ${result.b}`, color: '#1D9E75' },
        { label: 'HSL', value: `${result.h}°, ${result.s}%, ${result.l}%`, color: '#7F77DD' },
        { label: 'CSS rgb()', value: `rgb(${result.r},${result.g},${result.b})`, color: '#D4537E' },
      ]} />
      <Box label="CSS Snippets">
        {[
          `color: ${hex};`,
          `background: ${hex};`,
          `background: rgb(${result.r}, ${result.g}, ${result.b});`,
          `background: hsl(${result.h}deg, ${result.s}%, ${result.l}%);`,
          `border-color: ${hex};`,
        ].map(css => (
          <div key={css} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <code className="text-xs font-mono text-gray-700 dark:text-gray-300">{css}</code>
            <CopyBtn text={css} accent={accent} />
          </div>
        ))}
      </Box>
    </div>
  )
}

// ── UUID GENERATOR ────────────────────────────────────────────
function UuidGen({ accent }: { accent?: string }) {
  const [count, setCount] = useState(5)
  const [fmt, setFmt] = useState('standard')
  const [uuids, setUuids] = useState<string[]>([])
  const gen = useCallback(() => {
    const arr: string[] = []
    for (let i = 0; i < count; i++) {
      let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      if (fmt === 'upper') id = id.toUpperCase()
      if (fmt === 'nohyphen') id = id.replace(/-/g, '')
      if (fmt === 'braces') id = `{${id}}`
      arr.push(id)
    }
    setUuids(arr)
  }, [count, fmt])
  useEffect(() => { gen() }, [gen])
  const { copy } = useClipboard()
  return (
    <div className="space-y-4">
      <Box label="Settings">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Format</label>
            <select value={fmt} onChange={e => setFmt(e.target.value)} className="form-select">
              <option value="standard">Standard</option>
              <option value="upper">Uppercase</option>
              <option value="nohyphen">No Hyphens</option>
              <option value="braces">Braces {'{}'}</option>
            </select>
          </div>
          <div>
            <label className="form-label">Count (1–20)</label>
            <input type="number" value={count} min={1} max={20} onChange={e => setCount(Math.min(20, Math.max(1, +e.target.value)))} className="form-input" />
          </div>
        </div>
        <button onClick={gen} className="mt-4 w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90" style={{ background: accent }}>🎯 Generate UUIDs</button>
      </Box>
      <Box label="Generated UUIDs">
        <div className="space-y-2">
          {uuids.map((id, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5">
              <code className="flex-1 text-xs font-mono text-gray-800 dark:text-gray-200 break-all">{id}</code>
              <button onClick={() => copy(id)} className="shrink-0 px-2 py-1 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 transition-all">📋</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <CopyBtn text={uuids.join('\n')} accent={accent} />
          <button onClick={() => download(uuids.join('\n'), 'uuids.txt')} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">⬇️ Download</button>
        </div>
      </Box>
    </div>
  )
}

// ── CSS GRADIENT GENERATOR ────────────────────────────────────
function CssGradient({ accent }: { accent?: string }) {
  const [type, setType] = useState('linear')
  const [c1, setC1] = useState('#7F77DD')
  const [c2, setC2] = useState('#D4537E')
  const [angle, setAngle] = useState(135)
  const css = (() => {
    if (type === 'linear') return `linear-gradient(${angle}deg, ${c1}, ${c2})`
    if (type === 'radial') return `radial-gradient(circle, ${c1}, ${c2})`
    return `conic-gradient(${c1}, ${c2}, ${c1})`
  })()
  return (
    <div className="space-y-4">
      <Box label="Gradient Settings">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {['linear', 'radial', 'conic'].map(t => (
            <button key={t} onClick={() => setType(t)} className="py-2 rounded-xl text-xs font-semibold border-2 capitalize transition-all"
              style={type === t ? { borderColor: accent, color: accent, background: `${accent}15` } : { borderColor: '#e5e7eb', color: '#6b7280' }}>
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="form-label">Color 1</label>
            <input type="color" value={c1} onChange={e => setC1(e.target.value)} className="w-full h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer p-0.5" />
            <input type="text" value={c1} onChange={e => setC1(e.target.value)} className="form-input mt-1 text-xs" />
          </div>
          <div>
            <label className="form-label">Color 2</label>
            <input type="color" value={c2} onChange={e => setC2(e.target.value)} className="w-full h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer p-0.5" />
            <input type="text" value={c2} onChange={e => setC2(e.target.value)} className="form-input mt-1 text-xs" />
          </div>
        </div>
        {type === 'linear' && (
          <div>
            <label className="form-label">Angle: <strong>{angle}°</strong></label>
            <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)} className="w-full accent-purple-500 mt-1" />
          </div>
        )}
      </Box>
      <div className="h-32 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all" style={{ background: css }} />
      <Box label="CSS Output">
        <code className="block text-sm font-mono text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 break-all">
          background: {css};
        </code>
        <div className="flex gap-2 mt-3">
          <CopyBtn text={`background: ${css};`} accent={accent} />
        </div>
      </Box>
    </div>
  )
}

// ── META TAG GENERATOR ────────────────────────────────────────
function MetaTagGen({ accent }: { accent?: string }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [keys, setKeys] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const output = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title || 'Page Title'}</title>
<meta name="description" content="${desc || 'Page description for search engines'}">
<meta name="keywords" content="${keys || 'keyword1, keyword2'}">
<meta name="author" content="${author || 'Author Name'}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url || 'https://yourdomain.com/page'}">
<!-- Open Graph -->
<meta property="og:title" content="${title || 'Page Title'}">
<meta property="og:description" content="${desc || 'Page description'}">
<meta property="og:url" content="${url || 'https://yourdomain.com/page'}">
<meta property="og:type" content="website">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title || 'Page Title'}">
<meta name="twitter:description" content="${desc || 'Page description'}">`
  return (
    <div className="space-y-4">
      <Box label="Page Details">
        <div className="space-y-3">
          <div><label className="form-label">Page Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-input" placeholder="My Awesome Page Title" /></div>
          <div><label className="form-label">Meta Description <span className="normal-case font-normal">({desc.length}/160)</span></label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} className="form-input" rows={3} placeholder="A brief description for search engines…" /></div>
          <div><label className="form-label">Keywords</label><input type="text" value={keys} onChange={e => setKeys(e.target.value)} className="form-input" placeholder="seo, tools, free" /></div>
          <div><label className="form-label">Author</label><input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="form-input" placeholder="ToolHub Pro" /></div>
          <div><label className="form-label">Canonical URL</label><input type="text" value={url} onChange={e => setUrl(e.target.value)} className="form-input" placeholder="https://yourdomain.com/page" /></div>
        </div>
      </Box>
      <Box label="Generated Meta Tags">
        <pre className="tool-output text-xs bg-gray-900 text-green-400 rounded-xl p-4 overflow-x-auto">{output}</pre>
        <div className="flex gap-2 mt-3">
          <CopyBtn text={output} accent={accent} />
          <button onClick={() => download(output, 'meta-tags.html')} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">⬇️ Download</button>
        </div>
      </Box>
    </div>
  )
}

// ── CSV TO JSON ───────────────────────────────────────────────
function CsvToJson({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const convert = () => {
    try {
      const lines = input.trim().split('\n')
      const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''))
      const data = lines.slice(1).map(line => {
        const vals = line.split(delimiter).map(v => v.trim().replace(/^"|"$/g, ''))
        return headers.reduce((obj: any, h, i) => { obj[h] = vals[i] ?? ''; return obj }, {})
      })
      setOutput(JSON.stringify(data, null, 2))
    } catch (e: any) { setOutput('Error: ' + e.message) }
  }
  return (
    <div className="space-y-4">
      <Box label="CSV Input">
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={7} placeholder={`name,age,city\nAlice,30,London\nBob,25,Mumbai`} />
        <div className="flex gap-3 mt-3 items-center">
          <div className="flex items-center gap-2">
            <label className="form-label mb-0">Delimiter:</label>
            <select value={delimiter} onChange={e => setDelimiter(e.target.value)} className="px-2 py-1.5 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <option value=",">,  Comma</option>
              <option value=";">; Semicolon</option>
              <option value={'\t'}>→ Tab</option>
              <option value="|">| Pipe</option>
            </select>
          </div>
          <button onClick={convert} className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: accent }}>Convert →</button>
          <button onClick={() => { setInput(''); setOutput('') }} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Clear</button>
        </div>
      </Box>
      {output && (
        <Box label="JSON Output">
          <pre className="tool-output text-xs">{output}</pre>
          <div className="flex gap-2 mt-3">
            <CopyBtn text={output} accent={accent} />
            <button onClick={() => download(output, 'output.json')} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">⬇️ Download</button>
          </div>
        </Box>
      )}
    </div>
  )
}

// ── REGEX TESTER ──────────────────────────────────────────────
function RegexTester({ accent }: { accent?: string }) {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testStr, setTestStr] = useState('')
  const [result, setResult] = useState<{ matches: string[]; count: number; valid: boolean; error?: string } | null>(null)
  const test = () => {
    try {
      const re = new RegExp(pattern, flags)
      const matches = [...testStr.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))].map(m => m[0])
      setResult({ matches, count: matches.length, valid: true })
    } catch (e: any) { setResult({ matches: [], count: 0, valid: false, error: e.message }) }
  }
  return (
    <div className="space-y-4">
      <Box label="Regular Expression">
        <div className="flex gap-2 items-center">
          <span className="text-gray-400 font-mono">/</span>
          <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} className="form-input flex-1 font-mono" placeholder="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}" />
          <span className="text-gray-400 font-mono">/</span>
          <input type="text" value={flags} onChange={e => setFlags(e.target.value)} className="form-input w-16 font-mono" placeholder="gi" />
        </div>
        <p className="text-xs text-gray-500 mt-1">Flags: g (global) · i (case-insensitive) · m (multiline) · s (dotAll)</p>
      </Box>
      <Box label="Test String">
        <textarea value={testStr} onChange={e => setTestStr(e.target.value)} className="tool-input-text" rows={5} placeholder="Enter your test string here…" />
        <button onClick={test} className="mt-3 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: accent }}>▶ Test Regex</button>
      </Box>
      {result && (
        <Box label="Results">
          {!result.valid ? (
            <div className="text-red-600 dark:text-red-400 text-sm">❌ {result.error}</div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold" style={{ color: result.count > 0 ? '#1D9E75' : '#E24B4A' }}>
                  {result.count > 0 ? `✅ ${result.count} match${result.count !== 1 ? 'es' : ''}` : '❌ No matches'}
                </span>
              </div>
              {result.matches.length > 0 && (
                <div className="space-y-1">
                  {result.matches.slice(0, 20).map((m, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-1.5">
                      <span className="text-[10px] text-gray-400 w-4">{i + 1}</span>
                      <code className="text-xs font-mono text-gray-800 dark:text-gray-200">{m}</code>
                    </div>
                  ))}
                  {result.matches.length > 20 && <p className="text-xs text-gray-500">… and {result.matches.length - 20} more</p>}
                </div>
              )}
            </>
          )}
        </Box>
      )}
    </div>
  )
}

// ── KEYWORD DENSITY CHECKER ───────────────────────────────────
function KeywordDensity({ accent }: { accent?: string }) {
  const [text, setText] = useState('')
  const [minLen, setMinLen] = useState(3)
  const [stopWords] = useState(new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','up','about','into','over','after','as','is','was','are','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','shall','can']))
  const words = text.toLowerCase().match(/\b\w+\b/g) || []
  const filtered = words.filter(w => w.length >= minLen && !stopWords.has(w))
  const freq: Record<string, number> = {}
  filtered.forEach(w => { freq[w] = (freq[w] || 0) + 1 })
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20)
  const total = words.length
  return (
    <div className="space-y-4">
      <Box label="Content">
        <textarea value={text} onChange={e => setText(e.target.value)} className="tool-input-text" rows={8} placeholder="Paste your content here to analyse keyword density…" />
        <div className="flex items-center gap-3 mt-3">
          <label className="form-label mb-0 whitespace-nowrap">Min length:</label>
          <input type="number" value={minLen} min={1} max={10} onChange={e => setMinLen(+e.target.value)} className="form-input w-20" />
          <span className="text-xs text-gray-500">words · {total} total words</span>
        </div>
      </Box>
      {sorted.length > 0 && (
        <Box label="Keyword Frequency">
          <div className="space-y-2">
            {sorted.map(([word, count]) => {
              const density = ((count / total) * 100).toFixed(2)
              const pct = (count / sorted[0][1]) * 100
              return (
                <div key={word} className="flex items-center gap-3">
                  <span className="text-sm font-mono font-semibold w-28 shrink-0 text-gray-800 dark:text-gray-200">{word}</span>
                  <div className="flex-1 h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: accent }} />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{count}×</span>
                  <span className="text-xs font-bold w-12 text-right" style={{ color: +density > 3 ? '#E24B4A' : accent }}>{density}%</span>
                </div>
              )
            })}
          </div>
        </Box>
      )}
    </div>
  )
}

// ── GENERIC TOOL FALLBACK ─────────────────────────────────────
function GenericTool({ toolId, accent }: { toolId: string; accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const process = () => {
    switch (toolId) {
      case 'remove-extra-spaces': setOutput(input.replace(/\s+/g, ' ').trim()); break
      case 'line-break-remover': setOutput(input.replace(/[\r\n]+/g, ' ').trim()); break
      case 'text-reverser': setOutput(input.split('').reverse().join('')); break
      case 'duplicate-line-remover': setOutput([...new Set(input.split('\n'))].join('\n')); break
      case 'text-sorter': setOutput(input.split('\n').sort().join('\n')); break
      case 'random-text-generator': {
        const lorem = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
        const words = lorem.split(' ')
        let text = ''
        for (let i = 0; i < 100; i++) text += words[i % words.length] + (i % 15 === 14 ? '. ' : ' ')
        setOutput(text.trim())
        return
      }
      case 'html-formatter': setOutput(input.replace(/></g, '>\n<').replace(/(<[^/][^>]*>)/g, '\n$1').trim()); break
      case 'css-minifier': setOutput(input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*([{}:;,])\s*/g, '$1').replace(/\s+/g, ' ').trim()); break
      case 'js-minifier': setOutput(input.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()); break
      case 'sql-formatter': setOutput(input.replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP BY|ORDER BY|HAVING|LIMIT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|AND|OR|NOT|IN|IS|NULL|AS|DISTINCT)\b/gi, '\n$1').trim()); break
      case 'xml-formatter': {
        let formatted = '', indent = 0
        input.replace(/>\s*</g, '><').split(/</).filter(Boolean).forEach(node => {
          if (node.startsWith('/')) indent--
          formatted += '  '.repeat(indent) + '<' + node + '\n'
          if (!node.startsWith('/') && !node.endsWith('/') && !node.startsWith('?') && !node.startsWith('!')) indent++
        })
        setOutput(formatted.trim())
        break
      }
      case 'url-slug-generator': setOutput(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-').replace(/^-+|-+$/g, '')); break
      case 'word-frequency-counter': {
        const ws = input.toLowerCase().match(/\b\w{3,}\b/g) || []
        const fr: Record<string, number> = {}
        ws.forEach(w => { fr[w] = (fr[w] || 0) + 1 })
        const sorted = Object.entries(fr).sort((a, b) => b[1] - a[1]).slice(0, 30)
        setOutput(sorted.map(([w, c]) => `${w}: ${c}`).join('\n'))
        break
      }
      case 'json-to-csv': {
        try {
          const data = JSON.parse(input)
          if (!Array.isArray(data)) { setOutput('Error: expected JSON array'); return }
          const keys = [...new Set(data.flatMap(Object.keys))]
          const rows = [keys.join(','), ...data.map((row: any) => keys.map(k => JSON.stringify(row[k] ?? '')).join(','))]
          setOutput(rows.join('\n'))
        } catch (e: any) { setOutput('Error: ' + e.message) }
        break
      }
      case 'number-base-converter': {
        const n = parseInt(input.trim())
        if (isNaN(n)) { setOutput('Error: invalid number'); return }
        setOutput(`Decimal:     ${n}\nBinary:      ${n.toString(2)}\nOctal:       ${n.toString(8)}\nHexadecimal: ${n.toString(16).toUpperCase()}`)
        break
      }
      case 'jwt-decoder': {
        try {
          const parts = input.trim().split('.')
          if (parts.length !== 3) { setOutput('Error: not a valid JWT (expected 3 parts)'); return }
          const dec = (s: string) => JSON.parse(atob(s.replace(/-/g, '+').replace(/_/g, '/')))
          setOutput(`HEADER:\n${JSON.stringify(dec(parts[0]), null, 2)}\n\nPAYLOAD:\n${JSON.stringify(dec(parts[1]), null, 2)}\n\nSIGNATURE: ${parts[2]}`)
        } catch { setOutput('Error: invalid JWT token') }
        break
      }
      case 'character-counter': {
        const c = input.length, cns = input.replace(/\s/g, '').length, w = input.trim() === '' ? 0 : input.trim().split(/\s+/).length
        setOutput(`Characters (with spaces):    ${c}\nCharacters (without spaces): ${cns}\nWords:                       ${w}\nTwitter limit remaining:     ${280 - c}\nSMS limit remaining:         ${160 - c}\nMeta description remaining:  ${160 - c}`)
        break
      }
      default: setOutput(input ? `Processed: ${input.slice(0, 200)}` : '')
    }
  }
  return (
    <div className="space-y-4">
      <Box label="Input">
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={7} placeholder="Enter your input here…" />
        <div className="flex gap-2 mt-3">
          <button onClick={process} className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: accent }}>▶ Process</button>
          <button onClick={() => { setInput(''); setOutput('') }} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Clear</button>
        </div>
      </Box>
      {output && (
        <Box label="Output">
          <div className="tool-output text-sm">{output}</div>
          <div className="flex gap-2 mt-3">
            <CopyBtn text={output} accent={accent} />
            <button onClick={() => download(output)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">⬇️ Download</button>
          </div>
        </Box>
      )}
    </div>
  )
}

// ── MAIN ROUTER ───────────────────────────────────────────────
export default function ToolEngine({ toolId, accent }: Props) {
  switch (toolId) {
    case 'word-counter':            return <WordCounter accent={accent} />
    case 'json-formatter':          return <JsonFormatter accent={accent} />
    case 'password-generator':      return <PasswordGenerator accent={accent} />
    case 'password-strength-checker': return <PasswordStrength accent={accent} />
    case 'base64-encoder':          return <Base64Tool accent={accent} />
    case 'url-encoder':             return <UrlEncoder accent={accent} />
    case 'slug-generator':          return <SlugGen accent={accent} />
    case 'url-slug-generator':      return <SlugGen accent={accent} />
    case 'text-case-converter':     return <TextCase accent={accent} />
    case 'hex-to-rgb':              return <HexToRgb accent={accent} />
    case 'uuid-generator':          return <UuidGen accent={accent} />
    case 'css-gradient-generator':  return <CssGradient accent={accent} />
    case 'meta-tag-generator':      return <MetaTagGen accent={accent} />
    case 'csv-to-json':             return <CsvToJson accent={accent} />
    case 'regex-tester':            return <RegexTester accent={accent} />
    case 'keyword-density-checker': return <KeywordDensity accent={accent} />
    default:                        return <GenericTool toolId={toolId} accent={accent} />
  }
}
