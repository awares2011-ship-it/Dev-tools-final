"use client";
"use client";
'use client'
import { useState } from 'react'
async function getKey(passphrase: string): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode('toolhubpro-salt'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
  )
}
async function encryptText(text: string, passphrase: string): Promise<string> {
  const key = await getKey(passphrase)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const enc = new TextEncoder()
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(text))
  const combined = new Uint8Array(iv.length + ct.byteLength)
  combined.set(iv); combined.set(new Uint8Array(ct), iv.length)
  return btoa(String.fromCharCode(...combined))
}
async function decryptText(ciphertext: string, passphrase: string): Promise<string> {
  const key = await getKey(passphrase)
  const combined = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0))
  const iv = combined.slice(0, 12), ct = combined.slice(12)
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct)
  return new TextDecoder().decode(plain)
}
export default function EncryptDecrypt({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const run = async (mode: 'enc' | 'dec') => {
    if (!input || !passphrase) { setError('Both input and passphrase are required'); return }
    setLoading(true); setError(''); setOutput('')
    try {
      const result = mode === 'enc' ? await encryptText(input, passphrase) : await decryptText(input, passphrase)
      setOutput(result)
    } catch { setError(mode === 'enc' ? 'Encryption failed' : 'Decryption failed — wrong passphrase or invalid ciphertext') }
    setLoading(false)
  }
  return (
    <div className="space-y-4">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 dark:text-amber-300">
        🔒 AES-256-GCM encryption. Runs entirely in your browser. Never enter passwords or private keys in web tools.
      </div>
      <div className="tool-box space-y-3">
        <div>
          <label className="form-label">Input Text / Ciphertext</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={5} placeholder="Plain text to encrypt, or encrypted Base64 to decrypt…" />
        </div>
        <div>
          <label className="form-label">Passphrase</label>
          <div className="relative">
            <input type={show?'text':'password'} value={passphrase} onChange={e => setPassphrase(e.target.value)}
              className="form-input pr-12" placeholder="Strong passphrase — keep it secret!" />
            <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{show?'🙈':'👁️'}</button>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => run('enc')} disabled={loading} className="btn btn-teal flex-1">🔐 Encrypt</button>
          <button onClick={() => run('dec')} disabled={loading} className="btn btn-coral flex-1">🔓 Decrypt</button>
        </div>
      </div>
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">❌ {error}</div>}
      {output && (
        <div className="tool-box">
          <label className="form-label">Output</label>
          <div className="tool-output text-xs break-all">{output}</div>
          <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm mt-3">📋 Copy</button>
        </div>
      )}
    </div>
  )
}
