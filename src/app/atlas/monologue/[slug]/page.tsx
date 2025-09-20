import { getArticleBySlug, getAllMonologues } from '@/lib/markdown'
import { AppSidebar } from '@/components/app-sidebar'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag, User, Calendar, Share2, Quote } from 'lucide-react'

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  const articles = await getAllMonologues()
  return articles.map((a) => ({ slug: a.slug }))
}

export default async function MonologuePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug)
  if (!article || article.frontmatter.type !== 'monologue') notFound()
  const readingTime = Math.ceil(article.content.replace(/<[^>]*>/g, '').split(' ').length / 200)
  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-visible md:overflow-hidden min-h-screen md:h-screen") }>
      <AppSidebar />
      <div className="flex flex-1">
        <div id="scroll-container" className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full md:h-full h-auto md:overflow-y-auto overflow-visible">
          <div className="flex gap-8 max-w-7xl mx-auto w-full">
            <div className="flex-1 min-w-0">
              <TracingBeam className="px-6">
                <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                  <Link href="/atlas" className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Atlas
                  </Link>

                  <header className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4">
                        <Quote className="w-3 h-3" /> Monologue
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight">
                      {article.frontmatter.title}
                    </h1>
                    {article.frontmatter.summary && (
                      <p className="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8 font-medium">
                        {article.frontmatter.summary}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 mb-8">
                      {article.frontmatter.author && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{article.frontmatter.author}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={article.frontmatter.date}>{new Date(article.frontmatter.date).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{readingTime} min read</span>
                      </div>
                      <button className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                    {article.frontmatter.tags?.length ? (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {article.frontmatter.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm">
                            <Tag className="w-3 h-3" /> {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </header>

                  <article
                    className="prose prose-neutral dark:prose-invert prose-lg max-w-prose prose-headings:scroll-mt-8 prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-8 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 dark:prose-blockquote:bg-emerald-950/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              </TracingBeam>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
