import Link from 'next/link'
import type { Blog } from '@/lib/blogs'
import { ACCENT_HEX } from '@/lib/colors'

const WORD_COLORS = [
  '#16a34a', '#059669', '#0d9488', '#15803d', '#4ade80', '#34d399',
]

function colorizeTitle(title: string) {
  return title.split(' ').map((word, i) => {
    const color = i % 3 === 0 ? WORD_COLORS[Math.floor(i / 3) % WORD_COLORS.length] : undefined
    return { word, color }
  })
}

export default function BlogCard({ blog }: { blog: Blog }) {
  const words = colorizeTitle(blog.title)
  const accent = ACCENT_HEX[blog.color as keyof typeof ACCENT_HEX] ?? '#16a34a'

  return (
    <Link href={`/blog/${blog.id}`}>
      <article className="blog-card group h-full flex flex-col">
        {/* Category pill */}
        <span
          className="text-[11px] font-bold uppercase tracking-wider mb-3 text-green-600"
        >
          {blog.category}
        </span>

        {/* Title */}
        <h3 className="font-['Lora',serif] font-bold text-[1rem] leading-snug mb-2 text-gray-900 group-hover:opacity-90 transition-opacity">
          {words.map(({ word, color }, i) => (
            <span key={i} style={color ? { color } : undefined} className="font-extrabold">
              {word}{' '}
            </span>
          ))}
        </h3>

        <p className="text-xs text-gray-500 leading-relaxed flex-1">
          {blog.description}
        </p>

        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">📖 {blog.readTime} min read</span>
          <span className="text-xs text-gray-400">{blog.publishDate}</span>
          <span className="ml-auto text-xs font-semibold text-green-600 transition-colors">
            Read →
          </span>
        </div>
      </article>
    </Link>
  )
}
