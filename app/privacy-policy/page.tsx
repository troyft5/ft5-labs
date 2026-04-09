export default function PrivacyPolicy() {
  const BG = '#0f1a0f'
  const BG2 = '#131f13'
  return (
    <div className="min-h-screen" style={{ background: BG }}>
      <div className="px-6 pt-40 pb-8 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Legal</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: April 8, 2026</p>
        </div>
      </div>
      <div className="px-6 py-16 max-w-3xl mx-auto" style={{ background: BG }}>
        <div className="flex flex-col gap-8 text-slate-400 leading-relaxed">
          <p>FinTech 5 (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Data We Collect</h3>
            <p>We may collect, use, store and transfer different kinds of personal data about you, including identity data, contact data, and business processing volume details provided during the estimate process.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">How We Use Your Data</h3>
            <p>We use your data solely to provide payment consulting services, respond to your inquiries, and provide you with relevant information about processor options and savings opportunities.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Data Security</h3>
            <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered, or disclosed.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Contact</h3>
            <p>For any privacy-related questions, contact us at <a href="mailto:info@fintech5group.com" style={{ color: '#6fc200' }}>info@fintech5group.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
