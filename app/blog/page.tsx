import { getSortedPostsData } from '@/lib/blog'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import Reveal from '@/components/Reveal'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export const metadata = {
  title: 'Insights | FinTech 5 — Payment Processing Blog',
  description: 'Expert strategies on payment processing, interchange pricing, and maximizing your profit margins. Written by industry veterans.',
}

const categoryColors: Record<string, string> = {
  'Education': '#3b82f6',
  'Pricing':   '#f59e0b',
  'Analysis':  '#8b5cf6',
  'Technology':'#06b6d4',
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BlogIndex() {
  const posts = getSortedPostsData()
  const [featured, ...rest] = posts

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute top-0 left-0 w-[500px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(78,144,0,0.1) 0%, transparent 65%)', filter: 'blur(40px)' }} />

        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Resources</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
              The FT5 Playbook
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              No jargon. No fluff. Expert breakdowns of payment processing written by people who spent decades inside the industry.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">

          {/* Featured post — hero card */}
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden mb-10 transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                {/* Color accent bar */}
                <div className="md:w-1 w-full h-1.5 md:h-auto shrink-0" style={{ background: categoryColors[featured.category] || '#4e9000' }} />
                <div className="flex flex-col flex-1 p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(78,144,0,0.12)', color: '#6fc200', border: '1px solid rgba(78,144,0,0.2)' }}>
                      Featured
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: categoryColors[featured.category] || '#6fc200' }}>{featured.category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white group-hover:text-[#8cd627] transition-colors leading-snug mb-4">{featured.title}</h2>
                  <p className="text-slate-400 leading-relaxed flex-1 mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {fmt(featured.date)}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold" style={{ color: '#4e9000' }}>
                      Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Post grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(78,144,0,0.05)' }}>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: categoryColors[post.category] || '#4e9000' }}>{post.category}</span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-base font-black text-white leading-snug mb-3 group-hover:text-[#8cd627] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-2 mb-5">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </div>
                      <span className="text-xs font-bold" style={{ color: '#4e9000' }}>Read →</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* CTA strip */}
          <Reveal delay={200}>
            <div className="mt-16 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: 'rgba(78,144,0,0.07)', border: '1px solid rgba(78,144,0,0.2)' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.15)', color: '#6fc200' }}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-white mb-1">Ready to see your numbers?</div>
                  <div className="text-sm text-slate-400">Run a free analysis — get your actual savings estimate in 48 hours.</div>
                </div>
              </div>
              <Link href="/get-your-savings-estimate" className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 20px rgba(78,144,0,0.3)' }}>
                Get Free Estimate <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  )
}
