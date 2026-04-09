export default function TermsOfService() {
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
          <h1 className="text-4xl font-black text-white mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: April 8, 2026</p>
        </div>
      </div>
      <div className="px-6 py-16 max-w-3xl mx-auto" style={{ background: BG }}>
        <div className="flex flex-col gap-8 text-slate-400 leading-relaxed">
          <p>By accessing the website at fintech5group.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Consulting Services</h3>
            <p>FinTech 5 acts as a payment processing consulting firm. All savings estimates are projections based on provided statements and are not legally binding guarantees until formal processing agreements are signed with our partner networks.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">No Fees to Merchants</h3>
            <p>FinTech 5 does not charge consulting fees to merchants. Our compensation is provided by processor partners upon successful placement of qualified merchant accounts.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Limitation of Liability</h3>
            <p>FinTech 5 shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of, or inability to use, our services.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Contact</h3>
            <p>Questions? Contact <a href="mailto:info@fintech5group.com" style={{ color: '#6fc200' }}>info@fintech5group.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
