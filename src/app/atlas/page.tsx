import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'
import { getAllArticles } from '@/lib/markdown'
import { AtlasClient } from './atlas-client'

export default async function Home() {
  const articles = await getAllArticles()

  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
          <AtlasClient articles={articles} />
        </div>
      </div>
    </div>
  )
}
