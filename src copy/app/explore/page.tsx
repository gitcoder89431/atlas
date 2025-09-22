'use client'

import { useState, useEffect } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PersonaBadge } from '@/components/persona-badge'
import { Search, Filter, Calendar, Clock, Tag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { personaMap } from '@/data/personas'


export default function ExplorePage() {
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
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Explore
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Search and filter through our knowledge library
            </p>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by title, author, or tags..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
            {loading ? (
              <div className="p-8 text-center">
                <div className="text-neutral-500">Loading articles...</div>
              </div>
            ) : (
              <Table>
              <TableHeader>
                <TableRow className="border-b border-neutral-200 dark:border-neutral-700">
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Title</TableHead>
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Author(s)</TableHead>
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100 hidden md:table-cell">Tags</TableHead>
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100 hidden lg:table-cell">Read Time</TableHead>
                  <TableHead className="font-semibold text-neutral-900 dark:text-neutral-100">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => {
                  const readingTime = Math.ceil(article.content.replace(/<[^>]*>/g, '').split(' ').length / 200)
                  const authorString = article.frontmatter.author || 'Unknown'
                  const authors = authorString.includes('&') ? authorString.split('&').map((a: string) => a.trim()) : [authorString]
                  const mainAuthor = authors[0]
                  const persona = personaMap[mainAuthor]
                  const href = article.frontmatter.type === 'dialogue'
                    ? `/atlas/dialogue/${article.slug}`
                    : `/atlas/monologue/${article.slug}`

                  return (
                    <TableRow
                      key={article.slug}
                      onClick={() => router.push(href)}
                      className="border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 cursor-pointer transition-colors"
                    >
                      <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">
                        <span className="line-clamp-2">{article.frontmatter.title}</span>
                      </TableCell>
                      <TableCell className="text-neutral-700 dark:text-neutral-300">
                        {authors.length > 1 ? (
                          <div className="flex flex-col gap-2">
                            {authors.slice(0, 2).map((author: string, index: number) => {
                              const authorPersona = personaMap[author]
                              return (
                                <div key={index} className="flex items-center gap-3">
                                  {authorPersona ? (
                                    <PersonaBadge
                                      imageSrc={authorPersona.imageSrc}
                                      size="sm"
                                    />
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
                              <PersonaBadge
                                imageSrc={persona.imageSrc}
                                size="sm"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
                            )}
                            <span className="truncate">{mainAuthor}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-neutral-700 dark:text-neutral-300 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Tag className="h-3 w-3" />
                          <span className="truncate">
                            {article.frontmatter.tags?.slice(0, 3).join(', ') || 'No tags'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-neutral-700 dark:text-neutral-300 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{readingTime} min read</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-neutral-700 dark:text-neutral-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            )}
          </div>

          {/* Bottom padding */}
          <div className="h-16 md:h-20"></div>
        </div>
      </div>
    </div>
  )
}