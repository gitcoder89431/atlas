import { getAllArticles } from '@/lib/markdown'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const articles = await getAllArticles()
    return NextResponse.json(articles, {
      headers: {
        // Cache at the edge for 60s, serve stale for 5 minutes while revalidating
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
