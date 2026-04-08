import { getPostData, getSortedPostsData } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'

// This generates the static routes at build time for Hostinger
export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postData = getPostData(slug)

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <article className="px-6 py-24 max-w-3xl mx-auto w-full">
        <Link href="/blog" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-800 font-bold text-sm uppercase tracking-wider mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-slate-900 leading-tight">
            {postData.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Calendar className="w-4 h-4" />
            {new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-brand-600 max-w-none">
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
