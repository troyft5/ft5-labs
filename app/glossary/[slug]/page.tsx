import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, BookOpen, ChevronRight } from 'lucide-react'
import { glossaryData, glossaryBySlug, glossaryCategories } from '@/lib/glossary'
import type { GlossaryTerm } from '@/lib/glossary'
import Reveal from '@/components/Reveal'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

const categoryColor: Record<GlossaryTerm['category'], string> = {
  pricing:        '#6fc200',
  fees:           '#ef4444',
  processing:     '#3b82f6',
  fraud:          '#f59e0b',
  compliance:     '#8b5cf6',
  infrastructure: '#06b6d4',
}

export async function generateStaticParams() {
  return glossaryData.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const term = glossaryBySlug[slug]
  if (!term) return {}
  return {
    title: `${term.term} — Payment Processing Glossary | FinTech 5`,
    description: term.shortDef,
  }
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const term = glossaryBySlug[slug]
  if (!term) return notFound()

  const related = (term.relatedSlugs ?? [])
    .map(s => glossaryBySlug[s])
    .filter(Boolean) as GlossaryTerm[]

  const color = categoryColor[term.category]

  // Breadcrumb JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.shortDef,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Payment Processing Glossary',
      url: 'https://fintech5group.com/glossary',
    },
  }

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-0 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${color}80,transparent)` }} />

        {/* Watermark */}
        <div className="absolute right-0 top-16 flex flex-col items-end select-none pointer-events-none leading-none" aria-hidden="true">
          {term.term.split(' ').map((word, i) => (
            <div key={i} className="text-[11vw] font-black uppercase leading-none"
              style={{ color: `rgba(78,144,0,${0.045 - i * 0.007})`, transform: `translateX(${i * 10}px)` }}>
              {word}
            </div>
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <Link href="/glossary" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors">
                <ArrowLeft className="w-3 h-3" /> Glossary
              </Link>
              <span className="text-slate-700">/</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color }}>
                {glossaryCategories[term.category]}
              </span>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
              <BookOpen className="w-3 h-3" /> {glossaryCategories[term.category]}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6">
              {term.term}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-12 font-medium">
              {term.shortDef}
            </p>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
      </section>

      {/* ── BODY ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Main content */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="flex flex-col gap-6">
                  {term.body.map((para, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed text-lg">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>

              {/* Merchant impact callout */}
              {term.merchantImpact && (
                <Reveal delay={100}>
                  <div className="mt-10 rounded-2xl p-8" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.25)' }}>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#6fc200' }}>
                      What this means for your business
                    </div>
                    <p className="text-slate-300 leading-relaxed">{term.merchantImpact}</p>
                  </div>
                </Reveal>
              )}

              {/* Navigation */}
              <Reveal delay={140}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                    Get Your Free Audit <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/glossary" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all">
                    All Terms <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">

              {/* Quick facts */}
              <Reveal delay={80}>
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-4 text-slate-500">Quick Reference</div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-0.5">Category</div>
                      <div className="text-sm font-bold" style={{ color }}>{glossaryCategories[term.category]}</div>
                    </div>
                    <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <div>
                      <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-0.5">One-line definition</div>
                      <div className="text-sm text-slate-400 leading-relaxed">{term.shortDef}</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Related terms */}
              {related.length > 0 && (
                <Reveal delay={120}>
                  <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-4 text-slate-500">Related Terms</div>
                    <div className="flex flex-col gap-2">
                      {related.map(r => (
                        <Link key={r.slug} href={`/glossary/${r.slug}`}
                          className="group flex items-center justify-between py-2 px-3 rounded-xl transition-all hover:bg-white/5">
                          <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{r.term}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-[#6fc200] transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Calculator nudge */}
              <Reveal delay={160}>
                <div className="rounded-2xl p-6" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.2)' }}>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#6fc200' }}>Free Tool</div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">See how your effective rate compares to what competitive IC+ pricing would cost you.</p>
                  <Link href="/calculator" className="inline-flex items-center gap-1.5 text-xs font-bold rounded-lg px-4 py-2.5 transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', color: '#fff' }}>
                    Open Calculator <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── MORE TERMS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Keep Learning</span>
                </div>
                <h2 className="text-2xl font-black text-white">More terms to know.</h2>
              </div>
              <Link href="/glossary" className="hidden md:flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-white transition-colors whitespace-nowrap">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4">
            {glossaryData
              .filter(t => t.slug !== slug)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((t, i) => (
                <Reveal key={t.slug} delay={i * 60}>
                  <Link href={`/glossary/${t.slug}`}
                    className="group flex flex-col rounded-2xl p-6 h-full transition-all hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: categoryColor[t.category] }}>
                      {glossaryCategories[t.category]}
                    </div>
                    <h3 className="font-black text-white group-hover:text-[#8cd627] transition-colors mb-2 text-sm">{t.term}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-3">{t.shortDef}</p>
                    <div className="text-xs font-bold" style={{ color: '#4e9000' }}>Read definition →</div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl font-black text-white mb-4 leading-tight">
              You now know more than most merchants.<br />
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>Find out if your processor knows you know.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-lg mb-10 max-w-xl mx-auto">
              Upload your statement. We&apos;ll show you every fee by name, what each one costs you annually, and what you&apos;d pay with a competitive processor. same day or less — free.
            </p>
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-10 py-4 font-black rounded-xl transition-all hover:-translate-y-1" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              Get My Free Statement Audit <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
