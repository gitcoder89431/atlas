"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChannelsSidebar } from '@/components/channels-sidebar'
import { RecentUpdates } from '@/components/recent-updates'
import { cn } from '@/lib/utils'
import { PersonaBadge } from '@/components/persona-badge'
import { ChannelBadge } from '@/components/channel-badge'
import { Clock, Tag, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { personaMap } from '@/data/personas'
import type { Article } from '@/lib/markdown'

export default function AtlasClient({ articles }: { articles: Article[] }) {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['editorial', 'books', 'conversations', 'biology', 'physics', 'mathematics', 'ethics'])
  const [displayCount, setDisplayCount] = useState(3)
  const [loadingMore, setLoadingMore] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const getArticleChannel = (article: Article): string | null => {
    const fm = article.frontmatter
    const explicitChannel = fm.channel
    if (explicitChannel && typeof explicitChannel === 'string') return explicitChannel
    const tags = article.frontmatter.tags || []
    const content = article.content.toLowerCase()
    const title = article.frontmatter.title.toLowerCase()
    if (article.frontmatter.type === 'dialogue') return 'conversations'
    if (tags.some(t => ['biology','evolution','life','natural-selection'].includes(t.toLowerCase())) || content.includes('evolution') || content.includes('darwin') || title.includes('evolution')) return 'biology'
    if (tags.some(t => ['physics','quantum','mechanics'].includes(t.toLowerCase())) || content.includes('physics') || content.includes('quantum') || content.includes('feynman')) return 'physics'
    if (tags.some(t => ['mathematics','computation','logic','turing'].includes(t.toLowerCase())) || content.includes('computation') || content.includes('algorithm') || content.includes('turing')) return 'mathematics'
    if (tags.some(t => ['ethics','morality','justice','governance'].includes(t.toLowerCase())) || content.includes('ethics') || content.includes('governance') || content.includes('morality')) return 'ethics'
    if ((article.frontmatter.author === 'Ruixen') || tags.some(t => ['editorial','commentary'].includes(t.toLowerCase()))) return 'editorial'
    if (tags.some(t => ['philosophy'].includes(t.toLowerCase())) || content.includes('philosophy')) return 'philosophy'
    return null
  }

  const filteredArticles = selectedChannels.length === 0
    ? articles
    : articles.filter(a => {
        const ch = getArticleChannel(a)
        return ch && selectedChannels.includes(ch)
      })

  const loadMoreArticles = useCallback(() => {
    if (loadingMore) return
    setLoadingMore(true)
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 3, filteredArticles.length))
      setLoadingMore(false)
    }, 300)
  }, [loadingMore, filteredArticles.length])

  useEffect(() => {
    if (!loadMoreRef.current) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && filteredArticles.length > displayCount) {
          loadMoreArticles()
        }
      })
    }, { root: null, threshold: 0.1 })
    observerRef.current.observe(loadMoreRef.current)
    return () => observerRef.current?.disconnect()
  }, [filteredArticles.length, displayCount, loadMoreArticles])

  function handleChannelToggle(channelId: string) {
    setSelectedChannels((prev) =>
      prev.includes(channelId) ? prev.filter((c) => c !== channelId) : [...prev, channelId]
    )
    setDisplayCount(3)
  }

  return (
    <div className={cn("p-2 md:p-6 lg:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-1 w-full h-full overflow-hidden")}> 
      <div className="flex flex-1 justify-center items-start">
        <div className="flex max-w-7xl w-full gap-4">
          <ChannelsSidebar
            selectedChannels={selectedChannels}
            onChannelToggle={handleChannelToggle}
            articles={articles}
          />

          {/* Center: Scrollable Feed */}
          <div className="flex-1 relative">
            <div className="overflow-y-auto scroll-smooth h-full" style={{ maxHeight: "calc(100vh - 3rem)" }}>
              <div className="max-w-3xl mx-auto space-y-6 pt-2">
                <div className="space-y-6" style={{ contentVisibility: 'auto' }}>
                  {filteredArticles.slice(0, displayCount).map((article, index) => {
                    const readingTime = Math.ceil(article.content.replace(/<[^>]*>/g, '').split(' ').length / 200)
                    const authorString = article.frontmatter.author || 'Unknown'
                    const authors = authorString.includes('&') ? authorString.split('&').map((a: string) => a.trim()) : [authorString]
                    const mainAuthor = authors[0]
                    const persona = personaMap[mainAuthor]
                    const href = article.frontmatter.type === 'dialogue'
                      ? `/atlas/dialogue/${article.slug}`
                      : article.frontmatter.type === 'book'
                        ? `/atlas/books/${article.slug}`
                        : `/atlas/monologue/${article.slug}`
                    const contentText = article.content.replace(/<[^>]*>/g, '')
                    const firstParagraph = contentText.split('\n\n')[0] || contentText.slice(0, 200)
                    const autoSummary = firstParagraph.length > 200 ? firstParagraph.slice(0, 200) + '...' : firstParagraph
                    const summary = article.frontmatter.summary || autoSummary
                    const articleChannel = getArticleChannel(article)

                    return (
                      <Link key={article.slug} href={href} className="block group" style={{ animationDelay: `${Math.min(index * 100, 300)}ms` }} aria-label={`Read ${article.frontmatter.title}`}>
                        <article className="relative bg-white dark:bg-neutral-800 rounded-xl p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-all duration-500 ease-out border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-800/50 hover:-translate-y-1 animate-fade-in-up">
                          {articleChannel && (
                            <div className="absolute top-4 right-4 z-10">
                              <ChannelBadge channelId={articleChannel} size="sm" />
                            </div>
                          )}
                          <div className="flex items-center gap-3 mb-3 md:mb-4">
                            {authors.length > 1 ? (
                              <div className="flex -space-x-2">
                                {authors.slice(0, 2).map((author: string, idx: number) => {
                                  const authorPersona = personaMap[author]
                                  return (
                                    <div key={idx} className={idx > 0 ? 'ml-1' : ''}>
                                      {authorPersona ? (
                                        <PersonaBadge imageSrc={authorPersona.imageSrc} alt={author} size="md" />
                                      ) : (
                                        <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            ) : (
                              persona ? (
                                <PersonaBadge imageSrc={persona.imageSrc} alt={mainAuthor} size="md" />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
                              )
                            )}
                            <div className="flex flex-col">
                              <span className="font-semibold text-neutral-900 dark:text-neutral-100">{authorString}</span>
                              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                {new Date(article.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-3 md:space-y-4">
                            <h2 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 transition-colors" style={{ '--hover-color': 'var(--ruixen-primary)' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ruixen-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                              {article.frontmatter.title}
                            </h2>
                            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base line-clamp-3">{summary}</p>
                            <div className="flex items-center justify-between pt-2 text-sm text-neutral-500 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="sm:hidden">{readingTime} min</span>
                            <span className="hidden sm:inline">{readingTime} min read</span>
                          </div>
                              {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <Tag className="h-3 w-3" />
                                  <span className="sm:hidden">
                                    {article.frontmatter.tags.slice(0, 2).join(', ')}
                                  </span>
                                  <span className="hidden sm:inline">
                                    {article.frontmatter.tags.slice(0, 4).join(', ')}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      </Link>
                    )
                  })}

                  {/* Load more functionality */}
                  {filteredArticles.length > displayCount && (
                    <>
                      <div ref={loadMoreRef} className="h-4" />
                      {loadingMore && (
                        <div className="space-y-6">
                          {Array.from({ length: Math.min(3, filteredArticles.length - displayCount) }).map((_, index) => (
                            <div key={`loading-${index}`} className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 animate-pulse">
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-600"></div>
                                  <div className="space-y-2">
                                    <div className="h-4 bg-neutral-200 dark:bg-neutral-600 rounded w-24"></div>
                                    <div className="h-3 bg-neutral-100 dark:bg-neutral-700 rounded w-16"></div>
                                  </div>
                                </div>
                                <div className="h-6 bg-neutral-200 dark:bg-neutral-600 rounded w-3/4"></div>
                                <div className="space-y-2">
                                  <div className="h-4 bg-neutral-100 dark:bg-neutral-700 rounded w-full"></div>
                                  <div className="h-4 bg-neutral-100 dark:bg-neutral-700 rounded w-5/6"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {!loadingMore && (
                        <div className="text-center pt-8">
                          <button onClick={loadMoreArticles} className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 hover:shadow-lg">
                            <span className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">Load More Articles</span>
                            <ChevronDown className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-transform group-hover:translate-y-0.5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Fade overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-neutral-900 via-white/90 dark:via-neutral-900/90 to-transparent pointer-events-none z-10" />
          </div>

          {/* Right: Recent Updates */}
          <RecentUpdates />
        </div>
      </div>
    </div>
  )
}
