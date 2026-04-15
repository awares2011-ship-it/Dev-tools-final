import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'About ToolHub Pro', description: 'Learn about ToolHub Pro — free online tools for developers, writers, and SEO professionals.' }

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-2">
        <span className="mr-2 text-green-600">About</span>
        <span className="mr-2 text-gray-900">ToolHub</span>
        <span className="text-gray-500">Pro</span>
      </h1>
      <p className="text-gray-500 mb-8 font-medium">Free tools built for the people who build the web.</p>
      <div className="seo-prose space-y-6">
        <p>ToolHub Pro is a collection of 50+ free, browser-based tools designed for developers, writers, SEO professionals, and anyone who works with text and data online.</p>
        <h2>Our Mission</h2>
        <p>We believe powerful tools should be free, instant, and private. Every tool on ToolHub Pro runs entirely in your browser — your data never touches our servers.</p>
        <h2>What We Offer</h2>
        <ul>
          <li><strong>Developer Tools</strong> — JSON formatters, code minifiers, encoders, and more</li>
          <li><strong>Text Tools</strong> — Word counters, case converters, slug generators</li>
          <li><strong>Security Tools</strong> — Password generators, hash generators, encryption</li>
          <li><strong>SEO Tools</strong> — Meta tag generators, keyword density checkers</li>
          <li><strong>Converters</strong> — CSV to JSON, unit converters, base converters</li>
        </ul>
        <h2>Privacy First</h2>
        <p>All processing is done in your browser using JavaScript. We do not collect, store, or transmit any input data. What you type stays on your device.</p>
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="btn-primary btn">Explore All Tools →</Link>
      </div>
    </div>
  )
}
