import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://toolhubpro.com'),
  title: {
    default: 'Free JSON Formatter & Validator Online — ToolHub Pro | 50+ Free Tools',
    template: '%s | ToolHub Pro — Free Online Tools',
  },
  description:
    'Free online JSON formatter, validator & beautifier. Format, minify, validate JSON instantly in your browser. Plus 50+ free developer, text, SEO & security tools. No signup required.',
  keywords: [
    'json formatter', 'json validator', 'json beautifier', 'format json online',
    'free online tools', 'developer tools', 'seo tools', 'text tools',
    'word counter', 'password generator', 'base64 encoder', 'url encoder',
    'hash generator', 'meta tag generator', 'json minifier', 'json pretty print',
  ],
  authors: [{ name: 'ToolHub Pro' }],
  creator: 'ToolHub Pro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolhubpro.com',
    siteName: 'ToolHub Pro',
    title: 'Free JSON Formatter & Validator — ToolHub Pro | 50+ Free Tools',
    description: 'Format, validate, and beautify JSON instantly. Plus 50+ free browser-based tools for developers, writers, and SEO professionals.',
    images: [{ url: '/og/home.png', width: 1200, height: 630, alt: 'ToolHub Pro — Free Online Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@toolhubpro',
    creator: '@toolhubpro',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: 'https://toolhubpro.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#f5f5f5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* AdSense — uncomment and add your publisher ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body className="bg-[#f5f5f5] text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
