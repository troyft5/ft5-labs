import { Phone, Mail, MapPin, ArrowRight, Clock } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

const BG  = '#0f1a0f'
const BG2 = '#131f13'

export const metadata = {
  title: 'Contact Us | FinTech 5 — Payment Processing Consultants',
  description: 'Talk to a real payment specialist. No bots, no tickets. Reach FinTech 5 by phone, email, or contact form.',
}

const contactItems = [
  {
    href: 'tel:6469417853',
    icon: <Phone className="w-5 h-5 text-white" />,
    label: 'Phone',
    lines: ['(646) 941-7853', '(732) 300-1072'],
  },
  {
    href: 'mailto:info@fintech5group.com',
    icon: <Mail className="w-5 h-5 text-white" />,
    label: 'Email',
    lines: ['info@fintech5group.com', 'sales@fintech5group.com'],
  },
  {
    href: undefined,
    icon: <MapPin className="w-5 h-5 text-white" />,
    label: 'Location',
    lines: ['New York & New Jersey', 'Serving clients nationwide'],
  },
  {
    href: undefined,
    icon: <Clock className="w-5 h-5 text-white" />,
    label: 'Response Time',
    lines: ['Within 1 business day', '24/7 support for active clients'],
  },
]

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>

      {/* Hero */}
      <section className="px-6 pt-40 pb-24 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Talk to a Real Person.<br />
            <span style={{ color: '#6fc200' }}>No Bots. No Tickets.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Reach out directly or fill out the form — a dedicated payment specialist will respond within one business day.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

          {/* Form */}
          <div>
            <h2 className="text-2xl font-black text-white mb-8">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-black text-white mb-8">Contact Information</h2>
            <div className="flex flex-col gap-4 mb-8">
              {contactItems.map((item, i) => {
                const Wrapper = item.href ? 'a' : 'div'
                return (
                  <Wrapper
                    key={i}
                    {...(item.href ? { href: item.href } : {})}
                    className="flex items-center gap-4 p-5 rounded-2xl transition-all group"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#4e9000' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">{item.label}</div>
                      {item.lines.map((line, j) => (
                        <div key={j} className="font-bold text-slate-300 group-hover:text-white transition-colors text-sm">{line}</div>
                      ))}
                    </div>
                  </Wrapper>
                )
              })}
            </div>

            {/* Quick CTA */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.25)' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#6fc200' }}>Prefer a faster path?</div>
              <p className="text-sm text-slate-400 mb-4">Get a full savings estimate with your merchant statement — we&apos;ll analyze it and come back with a detailed report in 48 hours.</p>
              <a href="/get-your-savings-estimate" className="inline-flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90" style={{ background: '#4e9000' }}>
                Get Free Savings Estimate <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
