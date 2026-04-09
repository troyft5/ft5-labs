import { Phone, Mail, MapPin, ArrowRight, Clock } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us | FinTech 5 — Payment Processing Consultants',
  description: 'Talk to a real payment specialist. No bots, no tickets. Reach FinTech 5 by phone, email, or contact form.',
}

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-[#060d06] text-white px-6 pt-44 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-brand-600/20 text-brand-300 border border-brand-600/30 rounded-full text-xs font-bold uppercase tracking-widest">
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Talk to a Real Person.<br />
            <span className="text-brand-400">No Bots. No Tickets.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Reach out directly or fill out the form — a dedicated payment specialist will respond within one business day.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

          {/* Form */}
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-8">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-8">Contact Information</h2>
            <div className="flex flex-col gap-6 mb-10">
              <a href="tel:6469417853" className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50 transition-all group">
                <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Phone</div>
                  <div className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">(646) 941-7853</div>
                  <div className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">(732) 300-1072</div>
                </div>
              </a>
              <a href="mailto:info@fintech5group.com" className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50 transition-all group">
                <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Email</div>
                  <div className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">info@fintech5group.com</div>
                  <div className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">sales@fintech5group.com</div>
                </div>
              </a>
              <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Location</div>
                  <div className="font-bold text-slate-900">New York &amp; New Jersey</div>
                  <div className="text-sm text-slate-500">Serving clients nationwide</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Response Time</div>
                  <div className="font-bold text-slate-900">Within 1 business day</div>
                  <div className="text-sm text-slate-500">24/7 support for active clients</div>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="bg-[#060d06] rounded-2xl p-6 text-white">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">Prefer a faster path?</div>
              <p className="text-sm text-slate-400 mb-4">Get a full savings estimate with your merchant statement — we&apos;ll analyze it and come back with a detailed report in 48 hours.</p>
              <a href="/get-your-savings-estimate" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 px-5 py-2.5 rounded-xl transition-all">
                Get Free Savings Estimate <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
