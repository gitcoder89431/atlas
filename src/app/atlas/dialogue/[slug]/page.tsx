import { getArticleBySlug, getAllArticles } from '@/lib/markdown'
import { AppSidebar } from '@/components/app-sidebar'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag, Users, Calendar, Share2, MessageSquare } from 'lucide-react'

interface DialoguePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  const dialogues = articles.filter(article => article.frontmatter.type === 'dialogue')
  return dialogues.map((article) => ({
    slug: article.slug,
  }))
}

function TableOfContents({ content }: { content: string }) {
  const headings = content.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/g) || []
  const tocItems = headings.map((heading, index) => {
    const level = heading.match(/<h([2-3])/)?.[1]
    const text = heading.replace(/<[^>]*>/g, '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return { level: parseInt(level || '2'), text, id, index }
  })

  if (tocItems.length === 0) return null

  return (
    <div className="sticky top-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 w-64 shrink-0">
      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-sm">
        On this page
      </h3>
      <nav className="space-y-2">
        {tocItems.map((item) => (
          <a
            key={item.index}
            href={`#${item.id}`}
            className={cn(
              "block text-sm hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors",
              item.level === 2 ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-500 dark:text-neutral-500 ml-4"
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default async function DialoguePage({ params }: DialoguePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article || article.frontmatter.type !== 'dialogue') {
    notFound()
  }

  const readingTime = Math.ceil(article.content.replace(/<[^>]*>/g, '').split(' ').length / 200)

  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
          <div className="flex gap-8 max-w-7xl mx-auto w-full">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <TracingBeam className="px-6">
                <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                  {/* Back Button */}
                  <Link
                    href="/atlas"
                    className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Atlas
                  </Link>

                  {/* Dialogue Header */}
                  <header className="mb-12">
                    <div className="mb-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 mb-4">
                        <MessageSquare className="w-3 h-3" />
                        {article.frontmatter.type}
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

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 mb-8">
                      {article.frontmatter.author && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{article.frontmatter.author}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={article.frontmatter.date}>
                          {new Date(article.frontmatter.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
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

                    {/* Tags */}
                    {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {article.frontmatter.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </header>

                  {/* Dialogue Content */}
                  <article
                    className="prose prose-neutral dark:prose-invert prose-lg max-w-prose
                      prose-headings:scroll-mt-8 prose-headings:font-bold
                      prose-h1:text-3xl prose-h1:mb-8
                      prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                      prose-p:leading-relaxed prose-p:text-neutral-700 dark:prose-p:text-neutral-300
                      prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-purple-950/30 prose-blockquote:py-2 prose-blockquote:px-4
                      prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
                      prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* Continue Exploration Section */}
                  <div className="mt-16 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Continue the Exploration...
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Link href="#" className="p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Fractal Universe as System Architecture</span>
                      </Link>
                      <Link href="#" className="p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Institutional Design Under Uncertainty</span>
                      </Link>
                    </div>
                  </div>

                  {/* Source Information */}
                  {article.frontmatter.source_run_id && (
                    <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="text-xs text-neutral-500 dark:text-neutral-500">
                        <strong>Source:</strong> Adapted from Cybernetic Governance dialogue, Run {article.frontmatter.source_run_id}
                        {article.frontmatter.source_files && (
                          <div className="mt-1">
                            <strong>Generated from:</strong> {article.frontmatter.source_files.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </TracingBeam>
            </div>

            {/* Right Sidebar - Table of Contents */}
            <div className="hidden xl:block">
              <TableOfContents content={article.content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
