import { getPostData, getSortedPostsData } from '@/lib/blog'
import { glossaryData } from '@/lib/glossary'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ArrowRight, BookOpen, ChevronRight } from 'lucide-react'
import ReadingProgress from '@/components/ReadingProgress'
import NewsletterForm from '@/components/NewsletterForm'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

// Find glossary terms whose term name appears in the post content or title
function findRelatedGlossaryTerms(content: string, title: string) {
  const text = (title + ' ' + content).toLowerCase()
  return glossaryData.filter(term => {
    const t = term.term.toLowerCase()
    return text.includes(t) || (t.includes('/') && t.split('/').some(part => text.includes(part.trim())))
  }).slice(0, 7)
}

export async function generateStaticParams() {
  return getSortedPostsData().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostData(slug)
  return {
    title: `${post.title} | FinTech 5`,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostData(slug)
  const allPosts = getSortedPostsData()
  const related = allPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2)
  const otherPosts = related.length < 2
    ? [...related, ...allPosts.filter(p => p.slug !== slug && !related.includes(p)).slice(0, 2 - related.length)]
    : related

  const glossaryTerms = findRelatedGlossaryTerms(post.content, post.title)

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>
      <ReadingProgress />

      {/* ── ARTICLE HEADER ── */}
      <div className="px-6 pt-36 pb-12 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:-translate-x-1 mb-8 block" style={{ color: '#6fc200' }}>
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(78,144,0,0.12)', color: '#6fc200', border: '1px solid rgba(78,144,0,0.2)' }}>
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight mb-6 max-w-3xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</div>
            <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> FinTech 5 Editorial</div>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY + SIDEBAR ── */}
      <article className="px-6 py-16 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">

            {/* ── Main content ── */}
            <div>
              {/* Excerpt lede */}
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 pb-10 font-medium" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {post.excerpt}
              </p>

              <div className="article-body">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* Inline CTA box */}
              <div className="my-16 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.25)' }}>
                <div className="flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#6fc200' }}>Free Analysis — Same-Day Turnaround</div>
                  <div className="text-white font-black text-lg mb-1">See what this means for your business.</div>
                  <p className="text-sm text-slate-400">Upload your merchant statement and we&apos;ll return a line-by-line audit with competitive bids. No consulting fees — ever.</p>
                </div>
                <Link href="/get-your-savings-estimate" className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 20px rgba(78,144,0,0.3)' }}>
                  Get Free Estimate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Newsletter capture stripe */}
              <div className="my-12 rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#6fc200' }}>Monthly Rate Intelligence</div>
                <h3 className="text-lg font-black text-white mb-2">Get notified when interchange rates change.</h3>
                <p className="text-sm text-slate-500 mb-5">We track Visa, Mastercard, and Amex rate tables every quarter and alert our list when something shifts — free, no spam.</p>
                <NewsletterForm />
              </div>

              {/* Back nav */}
              <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:-translate-x-1" style={{ color: '#6fc200' }}>
                  <ArrowLeft className="w-4 h-4" /> All Articles
                </Link>
              </div>
            </div>

            {/* ── Sticky Sidebar ── */}
            <div className="lg:sticky lg:top-28 flex flex-col gap-5">

              {/* Glossary terms */}
              {glossaryTerms.length > 0 && (
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-3.5 h-3.5" style={{ color: '#6fc200' }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#6fc200' }}>Terms in this article</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {glossaryTerms.map(term => (
                      <Link
                        key={term.slug}
                        href={`/glossary/${term.slug}`}
                        className="group flex items-center justify-between py-2 px-3 rounded-xl transition-all hover:bg-white/5"
                      >
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors leading-snug">{term.term}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-[#6fc200] transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <Link href="/glossary" className="mt-4 flex items-center gap-1.5 text-xs font-bold pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: '#4e9000' }}>
                    Full glossary <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

              {/* Calculator nudge */}
              <div className="rounded-2xl p-6" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.2)' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#6fc200' }}>Free Tool</div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">See your current effective rate and what competitive IC+ pricing would cost you.</p>
                <Link href="/calculator" className="inline-flex items-center gap-1.5 text-xs font-black rounded-lg px-4 py-2.5 transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', color: '#fff' }}>
                  Open Calculator <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Audit nudge */}
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-500">Same-Day Audit</div>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">Upload your statement. We name every fee, identify every overcharge, and return competitive bids. Free.</p>
                <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors">
                  Get started <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ── RELATED POSTS ── */}
      {otherPosts.length > 0 && (
        <section className="px-6 py-16 relative" style={{ background: BG2 }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
          <div className="max-w-5xl mx-auto">
            <div className="text-[11px] font-bold uppercase tracking-widest mb-8" style={{ color: '#6fc200' }}>Keep Reading</div>
            <div className="grid md:grid-cols-2 gap-5">
              {otherPosts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#4e9000' }}>{p.category}</div>
                  <h3 className="text-base font-black text-white group-hover:text-[#8cd627] transition-colors leading-snug mb-3 line-clamp-2">{p.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 mt-auto">
                    <Clock className="w-3 h-3" /> {p.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
