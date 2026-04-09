import { getPostData, getSortedPostsData } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'

const BG = '#0f1a0f'
const BG2 = '#131f13'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postData = getPostData(slug)

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>

      {/* Header bar */}
      <div className="px-6 pt-32 pb-8 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-70 mb-6" style={{ color: '#6fc200' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight mb-4">
            {postData.title}
          </h1>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" style={{ color: '#4e9000' }} />
            {new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="px-6 py-16" style={{ background: BG }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-white prose-headings:font-black
              prose-p:text-slate-400 prose-p:leading-relaxed
              prose-a:text-[#6fc200] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-li:text-slate-400
              prose-ul:text-slate-400
              prose-blockquote:border-l-[#4e9000] prose-blockquote:text-slate-400
              prose-code:text-[#6fc200] prose-code:bg-white/5 prose-code:px-1.5 prose-code:rounded
            "
          >
            <ReactMarkdown>{postData.content}</ReactMarkdown>
          </div>

          {/* Back CTA */}
          <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-70" style={{ color: '#6fc200' }}>
              <ArrowLeft className="w-4 h-4" /> All Articles
            </Link>
          </div>
        </div>
      </article>

    </div>
  )
}
