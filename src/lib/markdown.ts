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
  channel?: string
  published?: boolean
}

export interface Article {
  frontmatter: ArticleFrontmatter
  content: string
  slug: string
}

export function inferType(dir: 'posts'|'monologues'|'dialogues', slug: string, data: any): ArticleFrontmatter['type'] {
  if (data?.type) return data.type
  if (dir !== 'posts') return (dir.slice(0, -1) as ArticleFrontmatter['type'])
  // Simple heuristic: filenames containing "dialogue" are dialogues, else monologues
  return /dialogue/i.test(slug) ? 'dialogue' : 'monologue'
}

export function inferChannel(fm: ArticleFrontmatter, rawContent: string): string | null {
  // Frontmatter overrides all
  if (typeof fm.channel === 'string' && fm.channel.trim()) return fm.channel

  const tags = (fm.tags || []).map(t => t.toLowerCase())
  const content = (rawContent || '').toLowerCase()
  const title = (fm.title || '').toLowerCase()

  if (fm.type === 'dialogue') return 'conversations'

  if (tags.some(t => ['biology', 'evolution', 'life', 'natural-selection'].includes(t)) ||
      content.includes('evolution') || content.includes('darwin') || title.includes('evolution')) {
    return 'biology'
  }

  if (tags.some(t => ['physics', 'quantum', 'mechanics'].includes(t)) ||
      content.includes('physics') || content.includes('quantum') || content.includes('feynman')) {
    return 'physics'
  }

  if (tags.some(t => ['mathematics', 'computation', 'logic', 'turing'].includes(t)) ||
      content.includes('computation') || content.includes('algorithm') || content.includes('turing')) {
    return 'mathematics'
  }

  if (tags.some(t => ['ethics', 'morality', 'justice', 'governance'].includes(t)) ||
      content.includes('ethics') || content.includes('governance') || content.includes('morality')) {
    return 'ethics'
  }

  if ((fm.author === 'Ruixen') || tags.some(t => ['editorial', 'commentary'].includes(t))) {
    return 'editorial'
  }

  if (tags.includes('philosophy') || content.includes('philosophy')) {
    return 'philosophy'
  }

  return null
}

async function getFromDir(dir: 'posts'|'monologues'|'dialogues', slug: string): Promise<Article | null> {
  const fullPath = path.join(contentDirectory, dir, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = await remark()
    .use(remarkGfm)
    // @ts-expect-error - Type conflict between unified versions
    .use(remarkSlug)
    .use(html)
    .process(content)
  const type = inferType(dir, slug, data)
  const fm: ArticleFrontmatter = { type, tier: 'free', tags: [], summary: '', title: '', date: '', ...data, slug }
  // Auto-assign channel if not explicitly set
  const autoChannel = inferChannel(fm, content)
  if (autoChannel && !fm.channel) fm.channel = autoChannel
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
    const gathered: Article[] = []
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
  } catch {
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
