import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'

const contentDirectory = path.join(process.cwd(), 'src/content')

export interface ArticleFrontmatter {
  title: string
  date: string
  tags: string[]
  summary: string
  type: 'monologue' | 'dialogue' | 'treatise' | 'outline'
  tier: 'free' | 'premium' | 'dev'
  slug: string
  thumbnail?: string
  author?: string
  source_run_id?: string
  source_files?: string[]
  canonical?: string
}

export interface Article {
  frontmatter: ArticleFrontmatter
  content: string
  slug: string
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(contentDirectory, 'posts', `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkSlug)
      .use(html)
      .process(content)

    return {
      frontmatter: { ...data, slug } as ArticleFrontmatter,
      content: processedContent.toString(),
      slug
    }
  } catch (error) {
    return null
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const postsDirectory = path.join(contentDirectory, 'posts')

    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allArticles = await Promise.all(
      fileNames
        .filter(name => name.endsWith('.md'))
        .map(async (name) => {
          const slug = name.replace(/\.md$/, '')
          return await getArticleBySlug(slug)
        })
    )

    return allArticles
      .filter((article): article is Article => article !== null)
      .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
  } catch (error) {
    return []
  }
}

export async function getArticlesByType(type: ArticleFrontmatter['type']): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter(article => article.frontmatter.type === type)
}
