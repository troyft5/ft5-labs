import Link from 'next/link'
const BG  = '#0f1a0f'
const BG2 = '#131f13'

export const metadata = {
  title: 'Terms of Service | FinTech 5 Group',
  description: 'Terms governing your use of the FinTech 5 Group website and consulting services.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-black text-white mb-3">{title}</h2>
      {children}
    </div>
  )
}

export default function TermsOfService() {
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
          <h1 className="text-4xl font-black text-white mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-16 max-w-3xl mx-auto" style={{ background: BG }}>
        <div className="flex flex-col gap-10 text-slate-400 leading-relaxed">

          <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree, please do not use our website.</p>

          <Section title="About Our Services">
            <p>FinTech 5 Group is a payment processing consulting firm. We help businesses evaluate, compare, and select payment processing solutions. We provide guidance, analysis, and recommendations based on our industry expertise.</p>
            <p className="mt-3">We are not a payment processor. We do not process transactions, hold funds, or handle payment card data. When you engage a payment processor through our services, you will enter into a separate merchant agreement directly with that processor governing your payment processing relationship. FinTech 5 Group serves as your ongoing partner and point of contact, but the processing of your transactions is performed by the processor under their agreement with you.</p>
          </Section>

          <Section title="No Financial or Legal Advice">
            <p>The information provided on this website and through our consulting services is for general informational purposes only. Nothing on this website or in our communications constitutes financial, legal, tax, or professional advice.</p>
            <p className="mt-3">While we strive to provide accurate and helpful guidance regarding payment processing, we are not licensed financial advisors, attorneys, or accountants. You should consult with qualified professionals for advice specific to your situation before making business decisions.</p>
          </Section>

          <Section title="No Guarantee of Results">
            <p>While we work to help our clients find cost-effective payment processing solutions, we cannot and do not guarantee specific savings, rates, or outcomes. Payment processing rates and terms depend on many factors outside our control, including your business type, transaction volume, risk profile, and the processors&apos; own underwriting decisions.</p>
            <p className="mt-3">Any estimates, projections, or examples of potential savings are illustrative only and should not be relied upon as guarantees of future results.</p>
          </Section>

          <Section title="Calculator Tool">
            <p>Our website may include calculator tools designed to help you estimate potential costs or savings. These tools are provided for informational purposes only. They do not store or retain any information you enter. Results are estimates based on the inputs you provide and may not reflect actual rates or savings you would receive from any processor.</p>
          </Section>

          <Section title="Third-Party Services and Links">
            <p>Our website contains links to third-party websites, including payment processors, industry organizations, and regulatory bodies. These links are provided for your convenience and reference only.</p>
            <p className="mt-3">We do not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party websites or services. Your use of third-party websites is at your own risk and subject to their terms and conditions.</p>
            <p className="mt-3">When you apply for or engage services with a payment processor, you are entering into a separate agreement with that processor. FinTech 5 Group is not a party to that agreement and is not responsible for the processor&apos;s actions, services, fees, or performance.</p>
          </Section>

          <Section title="Intellectual Property">
            <p>All content on this website, including text, graphics, logos, images, and software, is the property of FinTech 5 Group or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.</p>
            <p className="mt-3">You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent.</p>
          </Section>

          <Section title="User Conduct">
            <p>When using our website, you agree not to:</p>
            <ul className="list-disc pl-5 mt-3 flex flex-col gap-1.5">
              {[
                'Provide false or misleading information',
                'Use the website for any unlawful purpose',
                'Attempt to gain unauthorized access to any portion of the website',
                'Interfere with or disrupt the website or servers',
                'Use automated systems to access the website without our permission',
              ].map(i => <li key={i}>{i}</li>)}
            </ul>
          </Section>

          <Section title="Disclaimer of Warranties">
            <p>This website and all content, materials, and services provided through it are offered on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied.</p>
            <p className="mt-3">We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant that any information on the website is accurate, complete, or current.</p>
          </Section>

          <Section title="Limitation of Liability">
            <p>To the fullest extent permitted by law, FinTech 5 Group, its owners, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or our services.</p>
            <p className="mt-3">This includes, without limitation, damages for lost profits, lost revenue, loss of data, or business interruption, even if we have been advised of the possibility of such damages.</p>
            <p className="mt-3">In no event shall our total liability exceed the amount you paid to FinTech 5 Group, if any, for services during the twelve months prior to the claim.</p>
          </Section>

          <Section title="Indemnification">
            <p>You agree to indemnify, defend, and hold harmless FinTech 5 Group, its owners, officers, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the website, your violation of these Terms, or your violation of any rights of another party.</p>
          </Section>

          <Section title="Governing Law">
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of New Jersey, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in New Jersey.</p>
          </Section>

          <Section title="Changes to These Terms">
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page with an updated revision date. Your continued use of the website after any changes constitutes your acceptance of the new Terms.</p>
          </Section>

          <Section title="Severability">
            <p>If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.</p>
          </Section>

          <Section title="Contact Us">
            <p>If you have questions about these Terms of Service, contact us at:</p>
            <div className="mt-4 rounded-xl p-5 flex flex-col gap-1.5 text-sm" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.2)' }}>
              <div className="font-bold text-white">FinTech 5 Group</div>
              <div>Phone: <a href="tel:6469417853" className="hover:text-white transition-colors" style={{ color: '#6fc200' }}>(646) 941-7853</a></div>
              <div>Email: <a href="mailto:info@fintech5group.com" className="hover:text-white transition-colors" style={{ color: '#6fc200' }}>info@fintech5group.com</a></div>
              <div>Location: NY / NJ</div>
            </div>
          </Section>

          <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <Link href="/privacy-policy" className="text-sm font-bold hover:opacity-80 transition-opacity" style={{ color: '#6fc200' }}>
              View Privacy Policy →
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
