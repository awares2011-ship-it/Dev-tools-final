import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Disclaimer — ToolHub Pro' }
export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-6"><span className="text-green-600">Disclaimer</span></h1>
      <div className="seo-prose">
        <h2>General</h2>
        <p>ToolHub Pro provides tools and information for general informational and educational purposes only. All tools are provided &quot;as is&quot; without warranties of any kind.</p>
        <h2>Security Tools</h2>
        <p>Security tools (password generators, hash generators, encryption) are provided for legitimate use. We are not responsible for any misuse. Generated passwords and hashes should not be considered professionally audited cryptography for high-security applications.</p>
        <h2>SEO Tools</h2>
        <p>SEO recommendations are based on general best practices. Search engine algorithms change frequently and we cannot guarantee specific search ranking improvements.</p>
        <h2>Accuracy</h2>
        <p>We strive for accuracy but make no warranties about the completeness or accuracy of any tool output. Always verify critical results independently.</p>
        <h2>Limitation of Liability</h2>
        <p>ToolHub Pro shall not be liable for any indirect, incidental, or consequential damages arising from the use of our tools.</p>
      </div>
    </div>
  )
}
