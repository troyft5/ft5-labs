import { Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ContactUs() {
  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      <section className="px-6 py-24 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        
        <div>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold uppercase tracking-wide">
            Contact Support
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">
            Let's optimize your <br/><span className="text-blue-600">payment stack.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-12">
            Whether you need technical support, have questions about our processing models, or want to explore partnership opportunities, our team is ready to assist.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Direct Lines</h3>
                <p className="text-slate-600 mt-1">(646)-941-7853</p>
                <p className="text-slate-600">(732)-300-1072</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Email Us</h3>
                <p className="text-slate-600 mt-1">info@fintech5group.com</p>
                <p className="text-slate-600">sales@fintech5group.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Locations</h3>
                <p className="text-slate-600 mt-1">Serving clients nationwide with offices in NY & NJ.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="text-2xl font-bold mb-6 text-slate-900">Send a Message</h3>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" />
            <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" />
            <textarea placeholder="How can we help?" rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all resize-none"></textarea>
            <button type="button" className="w-full py-4 mt-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-md transition-all">
              Send Message
            </button>
            <p className="text-center mt-4 text-sm text-slate-500">
              Looking for a rate analysis? <Link href="/get-your-savings-estimate" className="text-blue-600 font-bold hover:underline">Get an Estimate instead.</Link>
            </p>
          </form>
        </div>

      </section>
    </div>
  )
}
