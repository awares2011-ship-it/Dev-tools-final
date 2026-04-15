import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Privacy Policy — ToolHub Pro', description: 'ToolHub Pro privacy policy. We collect no personal data.' }
export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-6"><span className="text-green-600">Privacy</span> Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: November 2024</p>
      <div className="seo-prose space-y-6">
        <h2>Overview</h2>
        <p>ToolHub Pro is committed to protecting your privacy. This policy outlines what data we collect (very little) and how we use it.</p>
        <h2>Data We Do NOT Collect</h2>
        <ul>
          <li>Any input data you enter into our tools</li>
          <li>Passwords, API keys, or tokens you analyse</li>
          <li>Files or images you convert</li>
          <li>Personal information</li>
        </ul>
        <p>All tool processing happens entirely in your browser. Your input data never leaves your device.</p>
        <h2>Data We May Collect</h2>
        <p>We use standard server logs that may include your IP address and browser type for security and analytics. We may use Google Analytics to understand aggregate usage patterns. We use Google AdSense to display advertisements.</p>
        <h2>Cookies</h2>
        <p>We use a single cookie to remember your dark/light mode preference. Third-party advertising partners may use cookies for ad personalisation — you can opt out through your browser settings or Google&apos;s opt-out tools.</p>
        <h2>Contact</h2>
        <p>Questions? Email <a href="mailto:privacy@toolhubpro.com" className="text-green-600 hover:underline">privacy@toolhubpro.com</a></p>
      </div>
    </div>
  )
}
