"use client";
"use client";
'use client'
import { useState } from 'react'

export default function MetaTagGenerator({ accent }: { accent?: string }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [keys, setKeys] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const tags = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title || 'Page Title'}</title>
<meta name="description" content="${desc || 'Page description for search engines.'}">
<meta name="keywords" content="${keys || 'keyword1, keyword2'}">
<meta name="author" content="${author || 'Author Name'}">
<meta name="robots" content="index, follow">
${url ? `<link rel="canonical" href="${url}">` : ''}
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="${title || 'Page Title'}">
<meta property="og:description" content="${desc || 'Page description.'}">
${url ? `<meta property="og:url" content="${url}">` : ''}
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title || 'Page Title'}">
<meta name="twitter:description" content="${desc || 'Page description.'}">`

  const copy = () => navigator.clipboard.writeText(tags).then(() => alert('Copied!'))

  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <div>
          <label className="form-label">Page Title <span className="text-gray-400 font-normal">{title.length}/60</span></label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            className="form-input" placeholder="Best Free JSON Formatter | ToolHub Pro" />
        </div>
        <div>
          <label className="form-label">Meta Description <span className="text-gray-400 font-normal">{desc.length}/160</span></label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)}
            className="form-input" rows={2}
            placeholder="Format and validate JSON instantly. Free, in-browser, no signup required." />
        </div>
        <div>
          <label className="form-label">Keywords</label>
          <input type="text" value={keys} onChange={e => setKeys(e.target.value)}
            className="form-input" placeholder="json formatter, free tool, developer tools" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="form-label">Author</label>
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)}
              className="form-input" placeholder="ToolHub Pro" />
          </div>
          <div>
            <label className="form-label">Canonical URL</label>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)}
              className="form-input" placeholder="https://toolhubpro.com/tools/json-formatter/" />
          </div>
        </div>
      </div>
      <div className="tool-box">
        <label className="form-label">Generated Meta Tags</label>
        <pre className="tool-output text-xs leading-relaxed overflow-x-auto">{tags}</pre>
        <button onClick={copy} className="btn btn-ghost btn-sm mt-3">📋 Copy HTML</button>
      </div>
    </div>
  )
}
