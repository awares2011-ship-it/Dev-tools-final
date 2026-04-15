"use client";
"use client";
'use client'
import { useState, useRef } from 'react'
export default function ImageToBase64({ accent }: { accent?: string }) {
  const [result, setResult] = useState('')
  const [preview, setPreview] = useState('')
  const [info, setInfo] = useState<{name:string,size:string,type:string}|null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setInfo({ name: file.name, size: (file.size/1024).toFixed(1)+'KB', type: file.type })
    const reader = new FileReader()
    reader.onload = ev => {
      const r = ev.target?.result as string
      setPreview(r)
      setResult(r)
    }
    reader.readAsDataURL(file)
  }
  const copy = () => navigator.clipboard.writeText(result).then(() => alert('Copied!'))
  return (
    <div className="space-y-4">
      <div className="tool-box">
        <label className="form-label">Upload Image</label>
        <div onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-teal-400 transition-colors">
          <div className="text-3xl mb-2">🖼️</div>
          <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, WebP, SVG</p>
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        {info && <div className="mt-3 text-xs text-gray-500 flex gap-4"><span>📄 {info.name}</span><span>📦 {info.size}</span><span>🔷 {info.type}</span></div>}
      </div>
      {preview && (
        <>
          <div className="tool-box">
            <label className="form-label">Preview</label>
            <img src={preview} alt="preview" className="max-h-48 rounded-xl object-contain" />
          </div>
          <div className="tool-box">
            <label className="form-label">Base64 Data URI</label>
            <div className="tool-output text-xs break-all max-h-40 overflow-y-auto">{result}</div>
            <div className="flex gap-2 mt-3">
              <button onClick={copy} className="btn btn-ghost btn-sm">📋 Copy</button>
              <button onClick={() => { const a=document.createElement('a'); a.href='data:text/plain,'+encodeURIComponent(result); a.download='image-base64.txt'; a.click() }} className="btn btn-ghost btn-sm">⬇️ Download</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
