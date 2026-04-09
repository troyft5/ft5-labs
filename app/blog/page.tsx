import { getSortedPostsData } from '@/lib/blog'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import Reveal from '@/components/Reveal'
import ScrollDepth3D from '@/components/ScrollDepth3D'

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
            <ScrollDepth3D delay={80} intensity={0.8}>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
                The FT5 Playbook
              </h1>
            </ScrollDepth3D>
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

      {/* ── TOPICS WE COVER ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>What We Write About</span>
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">Topics that matter to your bottom line.</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { cat: 'Education', color: '#3b82f6', emoji: '📖', desc: 'Plain-English explanations of interchange, pricing models, and how the payment stack actually works.' },
              { cat: 'Pricing', color: '#f59e0b', emoji: '💰', desc: 'Breakdowns of flat-rate vs tiered vs IC+ pricing — with real math on what each model costs at scale.' },
              { cat: 'Analysis', color: '#8b5cf6', emoji: '📊', desc: 'Deep dives into industry trends, seasonal rate changes, and what merchants should watch for in their statements.' },
              { cat: 'Technology', color: '#06b6d4', emoji: '⚡', desc: 'Coverage of emerging payment tech: contactless, biometrics, AI fraud detection, and what\'s coming next.' },
            ].map((item, i) => (
              <Reveal key={item.cat} delay={i * 70}>
                <div className="rounded-2xl p-6 h-full" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${item.color}22` }}>
                  <div className="text-3xl mb-4">{item.emoji}</div>
                  <div className="text-sm font-black mb-3" style={{ color: item.color }}>{item.cat}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE TOOLS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Free Tools</span>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal direction="left">
              <Link href="/calculator" className="group flex flex-col rounded-2xl p-8 transition-all hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-3xl mb-4">🧮</div>
                <h3 className="text-xl font-black text-white group-hover:text-[#8cd627] transition-colors mb-3">Processing Fee Calculator</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">Enter your monthly volume and transaction details to see your estimated effective rate, markup breakdown, and potential savings — instantly.</p>
                <div className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#4e9000' }}>Try the Calculator <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
              </Link>
            </Reveal>
            <Reveal direction="right" delay={100}>
              <Link href="/get-your-savings-estimate" className="group flex flex-col rounded-2xl p-8 transition-all hover:-translate-y-1" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.2)' }}>
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-xl font-black text-white group-hover:text-[#8cd627] transition-colors mb-3">Free Statement Audit</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">Upload your merchant statement and get a full line-by-line analysis with competitive bids from 10+ processors in 48 hours. No consulting fee. Ever.</p>
                <div className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#4e9000' }}>Get My Free Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY READ FT5 ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Why Read This</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-5 leading-tight">Written by people who spent decades inside the industry.</h2>
              <p className="text-slate-400 text-sm leading-relaxed">These aren&apos;t AI-generated summaries of press releases. This is the real operational knowledge our team accumulated from working inside acquiring banks, building processor networks, and negotiating on behalf of thousands of merchants.</p>
            </div>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <div className="flex flex-col gap-4">
              {[
                { emoji: '🔍', point: 'We name the things processors prefer to obscure — like tiered pricing tiers, basis point markups, and junk fees.' },
                { emoji: '📐', point: 'We do the math for you. Every article includes real examples with actual numbers, not hypotheticals.' },
                { emoji: '⚖️', point: 'We don\'t have editorial partnerships with processors. No sponsored content. No affiliate links. No agenda.' },
                { emoji: '🆓', point: 'Every piece of content is free, always. Our business model is consulting — not selling your data or your attention.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-xl shrink-0">{item.emoji}</span>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.point}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
