"use client"

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PersonaBadge } from '@/components/persona-badge'
import { ChannelBadge } from '@/components/channel-badge'
import { Search, Calendar, Clock, Tag, X } from 'lucide-react'
import type { Article } from '@/lib/markdown'
import { personaMap } from '@/data/personas'

export default function ExploreClient({ articles }: { articles: Article[] }) {
  const [rawQuery, setRawQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Debounce search input (200ms)
  useEffect(() => {
    const id = setTimeout(() => setSearchQuery(rawQuery), 200)
    return () => clearTimeout(id)
  }, [rawQuery])

  // Helper function to determine article's primary channel
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

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return articles.filter(article => {
      const title = article.frontmatter.title?.toLowerCase() || ''
      const authorStr = (article.frontmatter.author || 'Unknown').toLowerCase()
      const tags = (article.frontmatter.tags || []).map(t => t.toLowerCase())
      return !q || title.includes(q) || authorStr.includes(q) || tags.some(t => t.includes(q))
    })
  }, [articles, searchQuery])

  return (
    <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 w-full h-auto md:h-full md:overflow-hidden overflow-visible">
      {/* Header */}
      <div className="mb-2 shrink-0">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
          Explore
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Search and filter through our knowledge library
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by title, author, or tags..."
              value={rawQuery}
              onChange={(e) => setRawQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {rawQuery && (
              <button
                type="button"
                onClick={() => setRawQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          Showing {filteredArticles.length} of {articles.length} articles{searchQuery ? ' • filtered' : ''}
        </div>
      </div>

      {/* Table region fills viewport with inner scrolling */}
      <div
        className="flex-1 min-h-0 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800"
        style={{ contentVisibility: 'auto' }}
      >
        <Table containerClassName="h-full" aria-label="Explore results">
          <TableHeader className="sticky top-0 z-10 bg-white dark:bg-neutral-900 shadow-sm">
            <TableRow className="border-b border-neutral-200 dark:border-neutral-700">
              <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Title</TableHead>
              <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Author(s)</TableHead>
              <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100 hidden sm:table-cell">Channels</TableHead>
              <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100 hidden xl:table-cell">Tags</TableHead>
              <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100 hidden md:table-cell w-24 whitespace-nowrap text-right">Read Time</TableHead>
              <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100 hidden sm:table-cell w-24 whitespace-nowrap text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-neutral-500 py-10">
                  No results match your search.
                </TableCell>
              </TableRow>
            )}
            {filteredArticles.map((article) => {
              const readingTime = Math.ceil(article.content.replace(/<[^>]*>/g, '').split(' ').length / 200)
              const authorString = article.frontmatter.author || 'Unknown'
              const authors = authorString.includes('&') ? authorString.split('&').map((a: string) => a.trim()) : [authorString]
              const mainAuthor = authors[0]
              const persona = personaMap[mainAuthor]
              const articleChannel = getArticleChannel(article)
              const href = article.frontmatter.type === 'dialogue'
                ? `/atlas/dialogue/${article.slug}`
                : article.frontmatter.type === 'book'
                ? `/atlas/books/${article.slug}`
                : `/atlas/monologue/${article.slug}`

              return (
                <TableRow key={article.slug} className="border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">
                    <Link href={href} className="line-clamp-2 focus:outline-none focus:underline">
                      {article.frontmatter.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-neutral-700 dark:text-neutral-300">
                    {authors.length > 1 ? (
                      <div className="flex flex-col gap-2">
                        {authors.slice(0, 2).map((author: string, index: number) => {
                          const authorPersona = personaMap[author]
                          return (
                            <div key={index} className="flex items-center gap-3">
                              {authorPersona ? (
                                <PersonaBadge imageSrc={authorPersona.imageSrc} alt={author} size="sm" />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
                              )}
                              <span className="truncate text-sm">{author}</span>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        {persona ? (
                          <PersonaBadge imageSrc={persona.imageSrc} alt={mainAuthor} size="sm" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
                        )}
                        <span className="truncate">{mainAuthor}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-neutral-700 dark:text-neutral-300 hidden sm:table-cell">
                    {articleChannel ? (
                      <ChannelBadge channelId={articleChannel} size="sm" />
                    ) : (
                      <span className="text-neutral-400 text-sm">Uncategorized</span>
                    )}
                  </TableCell>
                  <TableCell className="text-neutral-700 dark:text-neutral-300 hidden xl:table-cell">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3 w-3" />
                      <span className="truncate">
                        {article.frontmatter.tags?.slice(0, 3).join(', ') || 'No tags'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-700 dark:text-neutral-300 hidden md:table-cell w-24 whitespace-nowrap text-right">
                    <div className="flex items-center gap-2 whitespace-nowrap justify-end">
                      <Clock className="h-3 w-3" />
                      <span>{readingTime} min</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-700 dark:text-neutral-300 hidden sm:table-cell w-24 whitespace-nowrap text-right">
                    <div className="flex items-center gap-2 whitespace-nowrap justify-end">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Bottom padding */}
      <div className="h-2 md:h-3 shrink-0"></div>
    </div>
  )
}
