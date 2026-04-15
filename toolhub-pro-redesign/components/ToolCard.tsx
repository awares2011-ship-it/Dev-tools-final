import Link from 'next/link'
import type { Tool } from '@/lib/tools'

// Map category to orange/green accent
const CAT_COLORS: Record<string, {bg:string;text:string;border:string}> = {
  developer: {bg:'#fff7ed',text:'#ea580c',border:'#f97316'},
  text:       {bg:'#f0fdf4',text:'#16a34a',border:'#22c55e'},
  security:   {bg:'#fff7ed',text:'#ea580c',border:'#f97316'},
  seo:        {bg:'#f0fdf4',text:'#16a34a',border:'#22c55e'},
  converters: {bg:'#fff7ed',text:'#ea580c',border:'#f97316'},
  utility:    {bg:'#f0fdf4',text:'#16a34a',border:'#22c55e'},
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const c = CAT_COLORS[tool.category] ?? CAT_COLORS.developer

  return (
    <Link href={`/tools/${tool.id}`}>
      <article
        className="hover:text-blue-500 tool-card group h-full"
        style={{borderTop:`3px solid ${c.border}`}}
      >
        <div className="hover:text-blue-500 w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 transition-transform group-hover:scale-110"
          style={{background:c.bg}}>
          {tool.icon}
        </div>
        <h3 className="hover:text-blue-500 font-bold text-sm text-gray-900 mb-1 leading-snug transition-colors duration-200"
          style={{fontFamily:'Inter,sans-serif'}}
          
          >
          {tool.name}
        </h3>
        <p className="hover:text-blue-500 text-xs text-gray-500 leading-relaxed mb-3">{tool.shortDesc}</p>
        <span className="hover:text-blue-500 inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md"
          style={{background:c.bg, color:c.text}}>
          {tool.category}
        </span>
      </article>
    </Link>
  )
}
