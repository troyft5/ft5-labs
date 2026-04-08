import { getSortedPostsData } from '@/lib/blog'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

export default function BlogIndex() {
  const posts = getSortedPostsData()

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      <section className="px-6 py-24 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">
            The FinTech 5 <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-lg text-slate-600">Expert strategies on payment processing, technology, and maximizing your profit margins.</p>
        </div>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3 font-medium">
                <Calendar className="w-4 h-4 text-blue-600" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
