import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'
import ExploreClient from './ExploreClient'
import { getAllArticles } from '@/lib/markdown'

export const revalidate = 60

export default async function ExplorePage() {
  const articles = await getAllArticles()
  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-visible md:overflow-hidden min-h-screen md:h-screen")}> 
      <AppSidebar />
      <div className="flex flex-1 min-h-0">
        <ExploreClient articles={articles} />
      </div>
    </div>
  )
}

