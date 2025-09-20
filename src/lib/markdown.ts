import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'

function getContentRoot(): string {
  const a = path.join(process.cwd(), 'src/content')
  if (fs.existsSync(a)) return a
  const b = path.join(process.cwd(), 'content')
  return fs.existsSync(b) ? b : a
}
const contentDirectory = getContentRoot()

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

async function getFromDir(dir: 'posts'|'monologues'|'dialogues', slug: string): Promise<Article | null> {
  const fullPath = path.join(contentDirectory, dir, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkSlug)
    .use(html)
    .process(content)
  const typeDefault = dir === 'posts' ? 'monologue' : (dir.slice(0, -1) as ArticleFrontmatter['type'])
  const fm = { type: typeDefault, tier: 'free', ...data, slug } as ArticleFrontmatter
  return {
    frontmatter: fm,
    content: processedContent.toString(),
    slug,
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Try posts, then monologues, then dialogues
  const dirs: ('posts'|'monologues'|'dialogues')[] = ['posts','monologues','dialogues']
  for (const d of dirs) {
    const art = await getFromDir(d, slug)
    if (art) return art
  }
  return null
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const dirs: ('posts'|'monologues'|'dialogues')[] = ['posts','monologues','dialogues']
    const gathered: Article[] = [] as any
    for (const d of dirs) {
      const dirPath = path.join(contentDirectory, d)
      if (!fs.existsSync(dirPath)) continue
      const fileNames = fs.readdirSync(dirPath).filter(n => n.endsWith('.md'))
      for (const name of fileNames) {
        const slug = name.replace(/\.md$/, '')
        const art = await getFromDir(d, slug)
        if (art) gathered.push(art)
      }
    }
    const allArticles = gathered
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

export async function getAllDialogues(): Promise<Article[]> {
  return getArticlesByType('dialogue')
}

export async function getAllMonologues(): Promise<Article[]> {
  return getArticlesByType('monologue')
}
