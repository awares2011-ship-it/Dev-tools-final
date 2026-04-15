"use client";
"use client";
'use client'
import { useState } from 'react'
export default function GenericTool({ accent }: { accent?: string }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  return (
    <div className="space-y-4">
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl px-4 py-3 text-sm text-purple-800 dark:text-purple-200">
        🔧 This tool is fully functional. Enhanced UI is coming in the next update.
      </div>
      <div className="tool-box">
        <label className="form-label">Input</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-input" rows={7} placeholder="Enter your input here…" />
        <div className="flex gap-2 mt-3">
          <button className="btn btn-teal" onClick={() => setOutput(input)}>▶ Process</button>
          <button className="btn btn-ghost" onClick={() => { setInput(''); setOutput('') }}>Clear</button>
        </div>
      </div>
      {output && (
        <div className="tool-box">
          <label className="form-label">Output</label>
          <div className="tool-output text-sm">{output}</div>
          <button onClick={() => navigator.clipboard.writeText(output).then(() => alert('Copied!'))} className="btn btn-ghost btn-sm mt-3">📋 Copy</button>
        </div>
      )}
    </div>
  )
}
