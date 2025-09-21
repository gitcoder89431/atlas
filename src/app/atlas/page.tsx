'use client'

import { useState, useEffect } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'
import { PersonaBadge } from '@/components/persona-badge'
import { Clock, Tag } from 'lucide-react'
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
  const router = useRouter()

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

  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-visible md:overflow-hidden min-h-screen md:h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-auto md:h-full md:overflow-y-auto overflow-visible">
          {/* Centered content container with optimal reading width */}
          <div className="max-w-4xl mx-auto w-full px-2 md:px-0">
            <header className="mb-8 md:mb-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 md:mb-4">
                Atlas
              </h1>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4 md:px-0">
                Knowledge feed of thoughts
              </p>
            </header>

            {/* Twitter-style feed */}
            {loading ? (
              <div className="space-y-4 md:space-y-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-neutral-800 rounded-lg md:rounded-xl p-4 md:p-6 border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="space-y-3 md:space-y-4">
                      <div className="h-5 md:h-6 bg-neutral-200 dark:bg-neutral-600 rounded-md w-4/5 md:w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-3 md:h-4 bg-neutral-100 dark:bg-neutral-700 rounded w-full"></div>
                        <div className="h-3 md:h-4 bg-neutral-100 dark:bg-neutral-700 rounded w-4/5 md:w-5/6"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {articles.map((article) => {
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

                  return (
                    <article
                      key={article.slug}
                      onClick={() => router.push(href)}
                      className="group bg-white dark:bg-neutral-800 rounded-lg md:rounded-xl p-4 md:p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-all duration-300 cursor-pointer border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-md dark:hover:shadow-lg"
                    >
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
                        <h2 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {article.frontmatter.title}
                        </h2>

                        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base line-clamp-3">
                          {summary}
                        </p>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-neutral-500 dark:text-neutral-400">
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
              </div>
            )}

            {/* Bottom padding for scroll breathing room */}
            <div className="h-16 md:h-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}