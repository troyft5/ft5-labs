import { getSortedPostsData } from '@/lib/blog'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

const BG = '#0f1a0f'
const BG2 = '#131f13'

export const metadata = {
  title: 'Insights | FinTech 5 — Payment Processing Blog',
  description: 'Expert strategies on payment processing, technology, and maximizing your profit margins.',
}

export default function BlogIndex() {
  const posts = getSortedPostsData()

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>

      {/* Hero */}
      <section className="px-6 pt-40 pb-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Resources</span>
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white">
            The FinTech 5 <span style={{ color: '#6fc200' }}>Insights</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">Expert strategies on payment processing, technology, and maximizing your profit margins.</p>
        </div>
      </section>

      {/* Posts */}
      <section className="px-6 py-20" style={{ background: BG }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-5">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="dark-card group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid' }}
              >
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-4 font-medium uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" style={{ color: '#4e9000' }} />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <h2 className="text-xl font-black mb-3 text-white group-hover:text-[#6fc200] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-slate-400 leading-relaxed text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: '#4e9000' }}>
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
