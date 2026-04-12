import Link from 'next/link'
const BG  = '#0f1a0f'
const BG2 = '#131f13'

export const metadata = {
  title: 'Privacy Policy | FinTech 5 Group',
  description: 'How FinTech 5 Group collects, uses, and protects your information.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ background: BG }}>

      {/* Header */}
      <div className="px-6 pt-40 pb-12 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Legal</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-16 max-w-3xl mx-auto" style={{ background: BG }}>
        <div className="flex flex-col gap-10 text-slate-400 leading-relaxed">

          <p>FinTech 5 Group (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates fintech5group.com. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or contact us through our forms.</p>

          <Section title="Information We Collect">
            <p>When you submit a form on our website, we may collect:</p>
            <ul className="list-disc pl-5 mt-3 flex flex-col gap-1.5">
              {['Name','Email address','Phone number','Business name','Any additional information you choose to provide in message fields'].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p className="mt-4">We also automatically collect certain technical information when you visit our site, including your IP address, browser type, and pages visited. This data is collected through cookies and similar technologies.</p>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-5 mt-3 flex flex-col gap-1.5">
              {['Respond to your inquiries','Provide information about our payment processing consulting services','Follow up on potential business opportunities','Improve our website and services'].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p className="mt-4">We do not sell your personal information to third parties.</p>
          </Section>

          <Section title="Third-Party Services">
            <p>We use the following third-party services that may collect or process data on our behalf:</p>
            <div className="mt-4 flex flex-col gap-4">
              {[
                { name: 'HubSpot', desc: 'We use HubSpot to manage our contact forms and customer relationships. When you submit a form, your information is stored in HubSpot\'s platform.' },
                { name: 'Cloudflare', desc: 'We use Cloudflare for website security and performance. Cloudflare may collect technical data such as IP addresses and set cookies for security purposes.' },
                { name: 'Google', desc: 'We use Google Search Console to understand how our site performs in search results. This involves aggregated, anonymized data about site traffic.' },
              ].map(s => (
                <div key={s.name} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="font-bold text-white mb-1">{s.name}</div>
                  <p className="text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Cookies">
            <p>Our website uses cookies — small text files stored on your device — to help our site function properly and to understand how visitors interact with our content. These cookies are primarily set by our third-party service providers (HubSpot and Cloudflare).</p>
            <p className="mt-3">You can control cookies through your browser settings. Note that disabling cookies may affect your experience on our site.</p>
          </Section>

          <Section title="Data Security">
            <p>We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </Section>

          <Section title="Data Retention">
            <p>We retain your contact information for as long as necessary to fulfill the purposes outlined in this policy, maintain our business relationship, or as required by law.</p>
          </Section>

          <Section title="Your Rights">
            <p>You may request to:</p>
            <ul className="list-disc pl-5 mt-3 flex flex-col gap-1.5">
              {['Access the personal information we hold about you','Correct inaccurate information','Delete your personal information from our systems'].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p className="mt-4">To make any of these requests, contact us using the information below.</p>
          </Section>

          <Section title="California Residents">
            <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and the right to request deletion. We do not sell personal information.</p>
          </Section>

          <Section title="Children's Privacy">
            <p>Our website and services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.</p>
          </Section>

          <Section title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
          </Section>

          <Section title="Contact Us">
            <p>If you have questions about this Privacy Policy or our data practices, contact us at:</p>
            <div className="mt-4 rounded-xl p-5 flex flex-col gap-1.5 text-sm" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.2)' }}>
              <div className="font-bold text-white">FinTech 5 Group</div>
              <div>Phone: <a href="tel:6469417853" className="hover:text-white transition-colors" style={{ color: '#6fc200' }}>(646) 941-7853</a></div>
              <div>Email: <a href="mailto:info@fintech5group.com" className="hover:text-white transition-colors" style={{ color: '#6fc200' }}>info@fintech5group.com</a></div>
              <div>Location: NY / NJ</div>
            </div>
          </Section>

          <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <Link href="/terms-of-service" className="text-sm font-bold hover:opacity-80 transition-opacity" style={{ color: '#6fc200' }}>
              View Terms of Service →
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-black text-white mb-3">{title}</h2>
      {children}
    </div>
  )
}
