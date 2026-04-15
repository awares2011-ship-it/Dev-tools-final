'use client'
import { useState } from 'react'

interface FAQ { q: string; a: string }

export default function FAQSection({ faqs, toolName }: { faqs: FAQ[]; toolName: string }) {
  const [open, setOpen] = useState<number | null>(0)

  // JSON-LD Schema for FAQ
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <button
              className="faq-q w-full text-left"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="text-gray-900 text-sm font-semibold pr-4">
                {faq.q}
              </span>
              <span className={`text-green-600 text-lg font-light shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            {open === i && (
              <div className="faq-a animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
