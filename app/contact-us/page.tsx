import { Phone, Mail, MapPin, ArrowRight, Clock, CheckCircle2 } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export const metadata = {
  title: 'Contact Us | FinTech 5 — Payment Processing Consultants',
  description: 'Talk to a real payment specialist. No bots, no tickets. Reach FinTech 5 by phone, email, or contact form.',
}

const contactItems = [
  { href: 'tel:6469417853',             icon: <Phone className="w-5 h-5" />, label: 'Call Us',         lines: ['(646) 941-7853', '(732) 300-1072'] },
  { href: 'mailto:info@fintech5group.com',icon: <Mail className="w-5 h-5" />,  label: 'Email Us',       lines: ['info@fintech5group.com', 'sales@fintech5group.com'] },
  { href: undefined,                     icon: <MapPin className="w-5 h-5" />, label: 'Coverage',       lines: ['New York & New Jersey', 'Serving clients nationwide'] },
  { href: undefined,                     icon: <Clock className="w-5 h-5" />,  label: 'Response Time',  lines: ['Within 1 business day', '24/7 for active clients'] },
]

const nextSteps = [
  { n: '01', title: 'You submit the form', body: 'We receive your message instantly — no ticket queue, no auto-responder holding pattern.' },
  { n: '02', title: 'A specialist reviews it', body: 'A dedicated payment consultant reads your message and prepares a relevant response — not a generic one.' },
  { n: '03', title: 'We reach out within 1 business day', body: 'Expect a personal reply by phone or email, ready to answer your questions or begin the audit process.' },
]

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(78,144,0,0.1) 0%, transparent 65%)', filter: 'blur(40px)' }} />

        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Get in Touch</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6">
              Talk to a<br />real person.<br />
              <span style={{ background: 'linear-gradient(135deg,#9de84a,#6fc200)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>No bots.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              Reach out directly or fill out the form below — a dedicated payment specialist responds within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-16">

          {/* Form */}
          <Reveal direction="left">
            <div>
              <h2 className="text-2xl font-black text-white mb-2">Send a message</h2>
              <p className="text-slate-500 text-sm mb-8">We&apos;ll reply within 1 business day. For faster response, call us directly.</p>
              <ContactForm />
            </div>
          </Reveal>

          {/* Info sidebar */}
          <div>
            <Reveal direction="right">
              <h2 className="text-2xl font-black text-white mb-6">Direct contact</h2>
            </Reveal>
            <div className="flex flex-col gap-3 mb-8">
              {contactItems.map((item, i) => {
                const inner = (
                  <div className="flex items-center gap-4 p-5 rounded-2xl transition-all group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.15)', color: '#6fc200' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-0.5">{item.label}</div>
                      {item.lines.map((line, j) => (
                        <div key={j} className="font-bold text-slate-300 group-hover:text-white transition-colors text-sm">{line}</div>
                      ))}
                    </div>
                  </div>
                )
                return (
                  <Reveal key={i} delay={i * 60} direction="right">
                    {item.href ? <a href={item.href}>{inner}</a> : inner}
                  </Reveal>
                )
              })}
            </div>

            {/* Faster path CTA */}
            <Reveal direction="right" delay={250}>
              <div className="rounded-2xl p-6" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.25)' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#6fc200' }}>Prefer the fast lane?</div>
                <p className="text-sm text-slate-400 mb-4">Upload your statement and get a full savings audit back in 48 hours — no form needed.</p>
                <a href="/get-your-savings-estimate" className="inline-flex items-center gap-2 text-sm font-black text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90" style={{ background: '#4e9000' }}>
                  Get Free Savings Estimate <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>What happens next</span>
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">No guessing. Here&apos;s the process.</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {nextSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <div className="rounded-2xl p-8 h-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-4xl font-black mb-5" style={{ color: 'rgba(78,144,0,0.3)' }}>{step.n}</div>
                  <h3 className="font-black text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-8 flex items-center justify-center gap-8 flex-wrap pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {['No contracts required', 'No consulting fees', 'No-pressure conversation'].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#4e9000' }} /> {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
