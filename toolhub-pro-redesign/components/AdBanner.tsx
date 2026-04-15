'use client'
import { useEffect, useRef } from 'react'

interface AdBannerProps {
  slot?: string
  format?: 'horizontal' | 'rectangle' | 'vertical'
  className?: string
  label?: string
}

const SIZE_MAP = {
  horizontal: 'h-[90px]',
  rectangle:  'h-[250px]',
  vertical:   'h-[600px]',
}

export default function AdBanner({ slot, format = 'horizontal', className = '', label }: AdBannerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Production: uncomment and configure AdSense
    // try {
    //   const adsbygoogle = (window as any).adsbygoogle || []
    //   adsbygoogle.push({})
    // } catch {}
  }, [])

  return (
    <div
      ref={ref}
      className={`ad-slot ${SIZE_MAP[format]} ${className}`}
      aria-label="Advertisement"
      data-ad-slot={slot}
    >
      <div className="flex flex-col items-center gap-1 opacity-50">
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">Advertisement</div>
        {label && <div className="text-[10px] text-gray-400">{label}</div>}
        {/* Production AdSense:
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        /> */}
      </div>
    </div>
  )
}
