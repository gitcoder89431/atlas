'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { ChannelsSidebar } from '@/components/channels-sidebar'
import { RecentUpdates } from '@/components/recent-updates'
import { cn } from '@/lib/utils'
import { PersonaBadge } from '@/components/persona-badge'
import { ChannelBadge, CHANNELS } from '@/components/channel-badge'
import { Clock, Tag, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { personaMap } from '@/data/personas'


export default function AtlasPage() {
  const [articles, setArticles] = useState<Array<{
    slug: string
    content: string
    frontmatter: {
      title: string
      author?: string
      date: string
      tags?: string[]
      type: 'monologue' | 'dialogue'
      summary?: string
    }
  }>>([])
  const [loading, setLoading] = useState(true)
  const [selectedChannels, setSelectedChannels] = useState(['editorial', 'conversations', 'biology', 'physics', 'mathematics', 'ethics']) // All channels checked by default
  const [displayCount, setDisplayCount] = useState(3) // Start with 3 articles
  const [loadingMore, setLoadingMore] = useState(false)
  const router = useRouter()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles')
        if (!response.ok) {
          throw new Error('Failed to fetch articles')
        }
        const articlesData = await response.json()
        setArticles(articlesData)
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  // Helper function to determine article's primary channel
  const getArticleChannel = (article: typeof articles[0]): string | null => {
    // First check if explicit channel is defined in frontmatter
    const explicitChannel = (article.frontmatter as any).channel;
    if (explicitChannel && typeof explicitChannel === 'string') {
      return explicitChannel;
    }

    // Fallback to detection logic - return most relevant single channel
    const tags = article.frontmatter.tags || [];
    const content = article.content.toLowerCase();
    const title = article.frontmatter.title.toLowerCase();

    // Conversations (highest priority for dialogues)
    if (article.frontmatter.type === 'dialogue') {
      return 'conversations';
    }

    // Biology (high priority for evolution/life sciences)
    if (tags.some(tag => ['biology', 'evolution', 'life', 'natural-selection'].includes(tag.toLowerCase())) ||
        content.includes('evolution') || content.includes('darwin') || title.includes('evolution')) {
      return 'biology';
    }

    // Physics (high priority for physics concepts)
    if (tags.some(tag => ['physics', 'quantum', 'mechanics'].includes(tag.toLowerCase())) ||
        content.includes('physics') || content.includes('quantum') || content.includes('feynman')) {
      return 'physics';
    }

    // Mathematics (for computation/algorithms)
    if (tags.some(tag => ['mathematics', 'computation', 'logic', 'turing'].includes(tag.toLowerCase())) ||
        content.includes('computation') || content.includes('algorithm') || content.includes('turing')) {
      return 'mathematics';
    }

    // Ethics (for moral/governance topics)
    if (tags.some(tag => ['ethics', 'morality', 'justice', 'governance'].includes(tag.toLowerCase())) ||
        content.includes('ethics') || content.includes('governance') || content.includes('morality')) {
      return 'ethics';
    }

    // Editorial (for Ruixen's editorial content)
    if (article.frontmatter.author === 'Ruixen' ||
        tags.some(tag => ['editorial', 'commentary'].includes(tag.toLowerCase()))) {
      return 'editorial';
    }

    // Philosophy (fallback for general philosophical content)
    if (tags.some(tag => ['philosophy'].includes(tag.toLowerCase())) ||
        content.includes('philosophy')) {
      return 'philosophy';
    }

    return null;
  }

  // Filter articles based on selected channels
  const filteredArticles = selectedChannels.length === 0
    ? articles // Show all if none selected (fallback)
    : articles.filter(article => {
        const articleChannel = getArticleChannel(article);
        return articleChannel && selectedChannels.includes(articleChannel);
      });

  // Load more functionality
  const loadMoreArticles = useCallback(() => {
    if (loadingMore) return
    setLoadingMore(true)

    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 3, filteredArticles.length))
      setLoadingMore(false)
    }, 400)
  }, [loadingMore, filteredArticles.length])

  // Intersection Observer for auto-loading
  useEffect(() => {
    if (loadMoreRef.current && filteredArticles.length > displayCount) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loadingMore) {
            loadMoreArticles()
          }
        },
        { threshold: 0.1 }
      )

      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [filteredArticles.length, displayCount, loadingMore, loadMoreArticles])

  // Handle channel toggle (must keep at least 1 checked)
  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev => {
      if (prev.includes(channelId)) {
        // Prevent unchecking if only 1 left
        return prev.length > 1 ? prev.filter(id => id !== channelId) : prev;
      } else {
        // Add the channel
        return [...prev, channelId];
      }
    });
  };

  // Reset display count when channels change
  useEffect(() => {
    setDisplayCount(3)
  }, [selectedChannels])

  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden min-h-screen md:h-screen")}>
      <AppSidebar />

      {/* Main content area - follows global pattern */}
      <div className="flex flex-1">
        <div className="p-2 md:p-6 lg:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-1 w-full h-full overflow-hidden">
          {/* 3-panel layout within main content */}
          <div className="flex flex-1 justify-center items-start">
            {/* Center-focused layout */}
            <div className="flex max-w-7xl w-full gap-4">
              {/* Left: Channels Sidebar */}
              <ChannelsSidebar
                selectedChannels={selectedChannels}
                onChannelToggle={handleChannelToggle}
                articles={articles}
              />

              {/* Center: Scrollable Feed */}
              <div className="flex-1 relative">
                <div className="overflow-y-auto scroll-smooth h-full" style={{ maxHeight: "calc(100vh - 3rem)" }}>
                  <div className="max-w-3xl mx-auto space-y-6 pt-2">
                {/* Feed */}
                {loading ? (
                  <div className="space-y-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
                      >
                        <div className="space-y-4">
                          <div className="h-6 bg-neutral-200 dark:bg-neutral-600 rounded-md w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-neutral-100 dark:bg-neutral-700 rounded w-full"></div>
                            <div className="h-4 bg-neutral-100 dark:bg-neutral-700 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredArticles.slice(0, displayCount).map((article, index) => {
                      const readingTime = Math.ceil(article.content.replace(/<[^>]*>/g, '').split(' ').length / 200)
                      const authorString = article.frontmatter.author || 'Unknown'
                      const authors = authorString.includes('&') ? authorString.split('&').map((a: string) => a.trim()) : [authorString]
                      const mainAuthor = authors[0]
                      const persona = personaMap[mainAuthor]
                      const href = article.frontmatter.type === 'dialogue'
                        ? `/atlas/dialogue/${article.slug}`
                        : `/atlas/monologue/${article.slug}`

                      // Extract first paragraph as summary
                      const contentText = article.content.replace(/<[^>]*>/g, '')
                      const firstParagraph = contentText.split('\n\n')[0] || contentText.slice(0, 200)
                      const summary = firstParagraph.length > 200 ? firstParagraph.slice(0, 200) + '...' : firstParagraph

                      // Get article channel
                      const articleChannel = getArticleChannel(article)

                      return (
                        <article
                          key={article.slug}
                          onClick={() => router.push(href)}
                          className="group relative bg-white dark:bg-neutral-800 rounded-xl p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-all duration-500 ease-out cursor-pointer border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-800/50 hover:-translate-y-1 animate-fade-in-up"
                          style={{
                            animationDelay: `${Math.min(index * 100, 300)}ms`
                          }}
                        >
                          {/* Channel badge - top right */}
                          {articleChannel && (
                            <div className="absolute top-4 right-4 z-10">
                              <ChannelBadge
                                channelId={articleChannel}
                                size="sm"
                              />
                            </div>
                          )}
                          {/* Author header */}
                          <div className="flex items-center gap-3 mb-3 md:mb-4">
                        {authors.length > 1 ? (
                          <div className="flex -space-x-2">
                            {authors.slice(0, 2).map((author: string, index: number) => {
                              const authorPersona = personaMap[author]
                              return (
                                <div key={index} className={index > 0 ? 'ml-1' : ''}>
                                  {authorPersona ? (
                                    <PersonaBadge
                                      imageSrc={authorPersona.imageSrc}
                                      size="md"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          persona ? (
                            <PersonaBadge
                              imageSrc={persona.imageSrc}
                              size="md"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
                          )
                        )}
                        <div className="flex flex-col">
                          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {authorString}
                          </span>
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {new Date(article.frontmatter.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Article content */}
                      <div className="space-y-3 md:space-y-4">
                        <h2 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 transition-colors" style={{ '--hover-color': 'var(--ruixen-primary)' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ruixen-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                          {article.frontmatter.title}
                        </h2>

                        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base line-clamp-3">
                          {summary}
                        </p>

                        {/* Meta info */}
                        <div className="flex items-center justify-between pt-2 text-sm text-neutral-500 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{readingTime} min read</span>
                          </div>
                          {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              <span>{article.frontmatter.tags.slice(0, 4).join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                        </article>
                      )
                    })}

                    {/* Load more functionality */}
                    {!loading && filteredArticles.length > displayCount && (
                      <>
                        {/* Intersection observer target */}
                        <div ref={loadMoreRef} className="h-4" />

                        {/* Loading more indicator */}
                        {loadingMore && (
                          <div className="space-y-6">
                            {Array.from({ length: Math.min(3, filteredArticles.length - displayCount) }).map((_, index) => (
                              <div
                                key={`loading-${index}`}
                                className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 animate-pulse"
                              >
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

                        {/* Manual load more button (fallback) */}
                        {!loadingMore && (
                          <div className="text-center pt-8">
                            <button
                              onClick={loadMoreArticles}
                              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 hover:shadow-lg"
                            >
                              <span className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                                Load More Articles
                              </span>
                              <ChevronDown className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-transform group-hover:translate-y-0.5" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* Bottom fade effect */}
                <div className="relative h-24">
                  <div className="h-16" />
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
      </div>
    </div>
  )
}