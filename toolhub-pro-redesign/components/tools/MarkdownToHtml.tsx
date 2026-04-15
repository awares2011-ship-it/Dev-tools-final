"use client";
"use client";
'use client'
import { useState } from 'react'
const SAMPLE = `# Hello World
## This is ToolHub Pro
Write **bold** or *italic* text easily.
- Item one
- Item two
- Item three
[Link](https://toolhubpro.com) to ToolHub Pro.
\`code\` inline or blocks.`

function md2html(md: string): string {
  return md
    .replace(/^### (.+)$/gm,'<h3>$1</h3>')
    .replace(/^## (.+)$/gm,'<h2>$1</h2>')
    .replace(/^# (.+)$/gm,'<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`(.+?)`/g,'<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2">$1</a>')
    .replace(/^- (.+)$/gm,'<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>\n?)+/g,m=>`<ul>${m}</ul>`)
    .replace(/^(?!<[hulp])(.+)$/gm,'<p>$1</p>')
}

export default function MarkdownToHtml({ accent }: { accent?: string }) {
  const [md, setMd] = useState(SAMPLE)
  const html = md2html(md)
  const copy = () => navigator.clipboard.writeText(html).then(() => alert('HTML copied!'))
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="tool-box">
          <div className="flex justify-between items-center mb-2">
            <label className="form-label mb-0">Markdown</label>
            <button onClick={() => setMd(SAMPLE)} className="btn btn-ghost btn-sm">Sample</button>
          </div>
          <textarea value={md} onChange={e => setMd(e.target.value)} className="tool-input" rows={12} />
        </div>
        <div className="tool-box">
          <label className="form-label">Live Preview</label>
          <div className="seo-prose prose-sm text-sm" dangerouslySetInnerHTML={{__html: html}} />
        </div>
      </div>
      <div className="tool-box">
        <label className="form-label">HTML Output</label>
        <pre className="tool-output text-xs overflow-x-auto">{html}</pre>
        <button onClick={copy} className="btn btn-ghost btn-sm mt-3">📋 Copy HTML</button>
      </div>
    </div>
  )
}
