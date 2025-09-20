'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Calendar, Clock, Tag, User, Users } from 'lucide-react'
import { AtlasFilters } from '@/components/atlas-filters'

interface Article {
  slug: string
  content: string
  frontmatter: {
    title: string
    date: string
    tags: string[]
    summary?: string
    type: 'monologue' | 'dialogue'
    tier: 'free' | 'premium'
    author?: string
  }
}

interface AtlasClientProps {
  articles: Article[]
}

export function AtlasClient({ articles }: AtlasClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'monologue' | 'dialogue'>('all')

  const filteredArticles = articles.filter(article => {
    if (activeFilter === 'all') return true
    return article.frontmatter.type === activeFilter
  })

  return (
    <>
      <AtlasFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-5">
        {filteredArticles.map((article) => {
          const readingTime = Math.ceil(article.content.replace(/<[^>]*>/g, '').split(' ').length / 200)
          const href = article.frontmatter.type === 'dialogue'
            ? `/atlas/dialogue/${article.slug}`
            : `/atlas/monologue/${article.slug}`

          return (
            <Link
              key={article.slug}
              href={href}
              className="group bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-xl p-4 hover:from-neutral-100 hover:to-neutral-200 dark:hover:from-neutral-700 dark:hover:to-neutral-800 transition-all duration-300 cursor-pointer border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 aspect-square flex flex-col justify-between"
            >
              {/* Content Type Badge */}
              <div className="flex justify-between items-start mb-2">
                <span className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full",
                  article.frontmatter.type === 'dialogue'
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                )}>
                  {article.frontmatter.type}
                </span>
                {article.frontmatter.tier === 'premium' && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                    Premium
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors line-clamp-2 mb-2">
                {article.frontmatter.title}
              </h3>

              {/* Summary */}
              {article.frontmatter.summary && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-3">
                  {article.frontmatter.summary}
                </p>
              )}

              {/* Meta Info */}
              <div className="space-y-1 text-xs text-neutral-500 dark:text-neutral-500">
                {article.frontmatter.author && (
                  <div className="flex items-center gap-1">
                    {article.frontmatter.type === 'dialogue' ? (
                      <Users className="w-3 h-3" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                    <span className="truncate">{article.frontmatter.author}</span>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{readingTime} min read</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(article.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>

                {/* Tags */}
                {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span className="truncate">{article.frontmatter.tags.slice(0, 2).join(', ')}</span>
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}