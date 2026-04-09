import { getPostData, getSortedPostsData } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

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
  const otherPosts = related.length < 2 ? [...related, ...allPosts.filter(p => p.slug !== slug && !related.includes(p)).slice(0, 2 - related.length)] : related

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── ARTICLE HEADER ── */}
      <div className="px-6 pt-36 pb-12 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:-translate-x-1 mb-8 block" style={{ color: '#6fc200' }}>
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(78,144,0,0.12)', color: '#6fc200', border: '1px solid rgba(78,144,0,0.2)' }}>
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</div>
            <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> FinTech 5 Editorial</div>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <article className="px-6 py-16 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
        <div className="max-w-3xl mx-auto">

          {/* Excerpt lede */}
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 pb-10 font-medium" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {post.excerpt}
          </p>

          <div className="prose prose-lg max-w-none
            prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-5
            prose-a:text-[#6fc200] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold
            prose-li:text-slate-400
            prose-ul:text-slate-400 prose-ul:my-4 prose-ul:pl-6
            prose-ol:text-slate-400 prose-ol:my-4
            prose-blockquote:border-l-4 prose-blockquote:border-[#4e9000] prose-blockquote:text-slate-300 prose-blockquote:italic prose-blockquote:bg-transparent prose-blockquote:pl-6 prose-blockquote:py-1
            prose-code:text-[#6fc200] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-table:border-collapse prose-th:text-white prose-th:font-bold prose-th:text-sm
            prose-td:text-slate-400 prose-td:text-sm prose-td:border prose-td:border-white/10 prose-td:px-3 prose-td:py-2
            prose-th:border prose-th:border-white/10 prose-th:px-3 prose-th:py-2 prose-th:bg-white/5
            prose-hr:border-white/10
          ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Inline CTA box */}
          <div className="my-16 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.25)' }}>
            <div className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#6fc200' }}>Free Analysis — 48hr Turnaround</div>
              <div className="text-white font-black text-lg mb-1">See what this means for your business.</div>
              <p className="text-sm text-slate-400">Upload your merchant statement and we&apos;ll return a line-by-line audit with competitive bids. No consulting fees — ever.</p>
            </div>
            <Link href="/get-your-savings-estimate" className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 20px rgba(78,144,0,0.3)' }}>
              Get Free Estimate <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Back nav */}
          <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:-translate-x-1" style={{ color: '#6fc200' }}>
              <ArrowLeft className="w-4 h-4" /> All Articles
            </Link>
          </div>
        </div>
      </article>

      {/* ── RELATED POSTS ── */}
      {otherPosts.length > 0 && (
        <section className="px-6 py-16 relative" style={{ background: BG2 }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
          <div className="max-w-3xl mx-auto">
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
