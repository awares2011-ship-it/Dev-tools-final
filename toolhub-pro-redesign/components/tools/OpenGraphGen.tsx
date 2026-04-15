"use client";
"use client";
'use client'
import { useState } from 'react'
export default function OpenGraphGen({ accent }: { accent?: string }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [type, setType] = useState('website')
  const [site, setSite] = useState('')
  const tags = `<!-- Open Graph -->
<meta property="og:type" content="${type}">
<meta property="og:title" content="${title||'Page Title'}">
<meta property="og:description" content="${desc||'Page description.'}">
${url?`<meta property="og:url" content="${url}">`:''
}${image?`<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">`:''
}${site?`<meta property="og:site_name" content="${site}">`:''
}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title||'Page Title'}">
<meta name="twitter:description" content="${desc||'Page description.'}">${image?`
<meta name="twitter:image" content="${image}">`:''}`
  const copy = () => navigator.clipboard.writeText(tags.trim()).then(() => alert('Tags copied!'))
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        {[
          {label:'Title',val:title,set:setTitle,ph:'JSON Formatter — ToolHub Pro',hint:`${title.length}/70`},
          {label:'Description',val:desc,set:setDesc,ph:'Format and validate JSON instantly. Free, no signup.',hint:`${desc.length}/160`},
          {label:'Page URL',val:url,set:setUrl,ph:'https://toolhubpro.com/tools/json-formatter/'},
          {label:'Image URL (1200×630)',val:image,set:setImage,ph:'https://toolhubpro.com/og/json.png'},
          {label:'Site Name',val:site,set:setSite,ph:'ToolHub Pro'},
        ].map(f => (
          <div key={f.label}>
            <label className="form-label">{f.label} {f.hint && <span className="text-gray-400 font-normal">{f.hint}</span>}</label>
            <input type="text" value={f.val} onChange={e => f.set(e.target.value)} className="form-input" placeholder={f.ph} />
          </div>
        ))}
        <div>
          <label className="form-label">Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="form-select">
            <option value="website">website</option><option value="article">article</option>
            <option value="product">product</option><option value="profile">profile</option>
          </select>
        </div>
      </div>
      <div className="tool-box">
        <label className="form-label">Generated OG Tags</label>
        <pre className="tool-output text-xs overflow-x-auto">{tags.trim()}</pre>
        <button onClick={copy} className="btn btn-teal mt-3">📋 Copy HTML</button>
      </div>
    </div>
  )
}
