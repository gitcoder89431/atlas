import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'
import { getAllArticles } from '@/lib/markdown'
import AtlasClient from './AtlasClient'

export const revalidate = 60

export default async function AtlasPage() {
  const articles = await getAllArticles()
  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden min-h-screen md:h-screen")}> 
      <AppSidebar />
      <div className="flex flex-1">
        <AtlasClient articles={articles} />
      </div>
    </div>
  )
}

