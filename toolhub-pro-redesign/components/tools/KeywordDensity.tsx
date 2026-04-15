"use client";
"use client";
'use client'
import { useState, useMemo } from 'react'
export default function KeywordDensity({ accent }: { accent?: string }) {
  const [text, setText] = useState('')
  const [keyword, setKeyword] = useState('')
  const analysis = useMemo(() => {
    if (!text) return null
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || []
    const total = words.length
    const wf: Record<string,number> = {}
    words.forEach(w => { wf[w] = (wf[w]||0)+1 })
    const top = Object.entries(wf).sort((a,b) => b[1]-a[1]).slice(0,15)
    let kd = 0, kCount = 0
    if (keyword) {
      const kw = keyword.toLowerCase().trim()
      kCount = (text.toLowerCase().match(new RegExp(`\\b${kw}\\b`,'g')) || []).length
      kd = total > 0 ? (kCount / total) * 100 : 0
    }
    return { total, top, kd, kCount }
  }, [text, keyword])
  const COLORS = ['#1D9E75','#D85A30','#7F77DD','#D4537E','#BA7517','#639922']
  return (
    <div className="space-y-4">
      <div className="tool-box space-y-3">
        <label className="form-label">Content Text</label>
        <textarea value={text} onChange={e => setText(e.target.value)} className="tool-input" rows={6} placeholder="Paste your article or page content here…" />
        <div>
          <label className="form-label">Target Keyword (optional)</label>
          <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} className="form-input" placeholder="e.g. json formatter" />
        </div>
      </div>
      {analysis && (
        <>
          {keyword && (
            <div className="grid grid-cols-3 gap-3">
              <div className="stat-card"><div className="stat-value" style={{color:'#1D9E75'}}>{analysis.kCount}</div><div className="stat-label">Occurrences</div></div>
              <div className="stat-card"><div className="stat-value" style={{color:analysis.kd>5?'#E24B4A':analysis.kd>2?'#BA7517':'#1D9E75'}}>{analysis.kd.toFixed(2)}%</div><div className="stat-label">Density</div></div>
              <div className="stat-card"><div className="stat-value" style={{color:'#7F77DD'}}>{analysis.total}</div><div className="stat-label">Total Words</div></div>
            </div>
          )}
          <div className="tool-box">
            <label className="form-label">Top Words by Frequency</label>
            <div className="space-y-2 mt-2">
              {analysis.top.map(([w,c],i) => (
                <div key={w} className="flex items-center gap-3">
                  <span className="w-20 text-sm font-mono shrink-0" style={{color:COLORS[i%6]}}>{w}</span>
                  <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${(c/analysis.top[0][1])*100}%`,background:COLORS[i%6]}} />
                  </div>
                  <span className="w-8 text-xs text-right text-gray-500">{c}</span>
                  <span className="w-12 text-xs text-right text-gray-400">{((c/analysis.total)*100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
