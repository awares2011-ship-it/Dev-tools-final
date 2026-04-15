import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Contact — ToolHub Pro', description: 'Get in touch with the ToolHub Pro team.' }
export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-2">
        <span className="text-green-600">Contact</span> <span className="text-gray-900">Us</span>
      </h1>
      <p className="text-gray-500 mb-8 font-medium">Have a suggestion, found a bug, or want to add a tool? We would love to hear from you.</p>
      <div className="tool-box space-y-4">
        <div><label className="form-label">Name</label><input type="text" className="form-input" placeholder="Your name" /></div>
        <div><label className="form-label">Email</label><input type="email" className="form-input" placeholder="your@email.com" /></div>
        <div><label className="form-label">Subject</label>
          <select className="form-select">
            <option>Bug Report</option><option>Feature Request</option><option>Tool Suggestion</option><option>General Enquiry</option>
          </select>
        </div>
        <div><label className="form-label">Message</label><textarea className="form-input" rows={5} placeholder="Tell us more…" /></div>
        <button className="btn-primary btn w-full justify-center py-3">Send Message</button>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        Or email us directly at <a href="mailto:hello@toolhubpro.com" className="font-semibold text-green-600 hover:text-green-700 transition-colors">hello@toolhubpro.com</a>
      </div>
    </div>
  )
}
