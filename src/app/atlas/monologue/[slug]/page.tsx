import { getArticleBySlug, getAllMonologues } from '@/lib/markdown'
import { AppSidebar } from '@/components/app-sidebar'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag, User, Calendar, Share2 } from 'lucide-react'
import { Toc } from '@/components/ui/toc'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getAllMonologues()
  return articles.map((a) => ({ slug: a.slug }))
}

export default async function MonologuePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article || article.frontmatter.type !== 'monologue') {
    notFound()
  }

  const readingTime = Math.ceil(article.content.replace(/<[^>]*>/g, '').split(' ').length / 200)
  // Remove only the inline "Continue the Exploration..." section (keep trailing keywords/source)
  const withoutInlineContinue = article.content.replace(
    /<h[2-3][^>]*>\s*Continue the Exploration\.\.\.\s*<\/h[2-3]>[\s\S]*?(?=<hr\b|<h[1-6]|$)/i,
    '',
  )
  // Split after the opening paragraph/question: find first section heading (h2/h3)
  const firstSection = /<h[2-3][^>]*>/i.exec(withoutInlineContinue)
  const introHtml = firstSection ? withoutInlineContinue.slice(0, firstSection.index) : ''
  const contentAfterIntro = firstSection ? withoutInlineContinue.slice(firstSection.index) : withoutInlineContinue
  // Split contentAfterIntro at "TL;DR" to insert a visual separator before the summary
  const tldrRegex = /<(?:strong|b)[^>]*>\s*(TL;DR|TLDR|Summary)\s*:?\s*<\/(?:strong|b)>/i
  const match = tldrRegex.exec(contentAfterIntro)
  const beforeHtml = match ? contentAfterIntro.slice(0, match.index) : contentAfterIntro
  const afterHtml = match ? contentAfterIntro.slice(match.index) : ''

  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-visible md:overflow-hidden min-h-screen md:h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div id="scroll-container" className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full md:h-full h-auto md:overflow-y-auto overflow-visible">
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

                  {/* Article Header */}
                  <header className="mb-12">

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
                          <User className="w-4 h-4" />
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

                  {/* Monologue Content */}
                  {/* Intro paragraph/question */}
                  {introHtml && (
                    <article
                      className="prose prose-neutral dark:prose-invert prose-lg max-w-prose prose-p:leading-relaxed prose-p:text-neutral-700 dark:prose-p:text-neutral-300"
                      dangerouslySetInnerHTML={{ __html: introHtml }}
                    />
                  )}

                  {/* Decorative separator under the intro */}
                  {introHtml && (
                    <div className="my-8 flex items-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-blue-700" />
                      <span className="mx-3 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Deep Dive</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent dark:via-purple-700" />
                    </div>
                  )}

                  {/* Main content */}
                  <article id="article-root"
                    className="prose prose-neutral dark:prose-invert prose-lg max-w-prose prose-headings:scroll-mt-8 prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-8 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: beforeHtml }}
                  />
                  {match && (
                    <>
                      {/* Decorative separator leading into TL;DR */}
                      <div className="my-12 flex items-center">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-blue-700" />
                        <span className="mx-3 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">TL;DR</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent dark:via-purple-700" />
                      </div>
                      <article
                        className="prose prose-neutral dark:prose-invert prose-lg max-w-prose prose-headings:scroll-mt-8 prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-8 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: afterHtml }}
                      />
                    </>
                  )}

                  {/* Continue Exploration Section (bottom card) */}
                  <div className="mt-16 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                      Continue the Exploration...
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Link href="#" className="p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Collaborative Reality Mathematics</span>
                      </Link>
                      <Link href="#" className="p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Identity Fractals at the Mortality Boundary</span>
                      </Link>
                    </div>
                  </div>

                  {/* Source Information */}
                  {article.frontmatter.source_run_id && (
                    <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="text-xs text-neutral-500 dark:text-neutral-500">
                        <strong>Keywords:</strong> {article.frontmatter.tags?.join(', ')}
                        {article.frontmatter.source_files && (
                          <div className="mt-1">
                            <strong>Source:</strong> Adapted from Trinity dialogue series, Run {article.frontmatter.source_run_id}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </TracingBeam>
            </div>

            {/* Right Sidebar - TOC with author profile */}
            <div className="hidden xl:block">
              <Toc
                contentHtml={beforeHtml}
                title={article.frontmatter.title}
                author={article.frontmatter.author}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}