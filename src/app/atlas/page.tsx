import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'

export default function AtlasPage() {
  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
          <header className="mb-6">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Atlas
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Knowledge library of dialogues and monologues
            </p>
          </header>
          <div className="flex flex-1 flex-col gap-4">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="bg-neutral-50 dark:bg-neutral-800/50 aspect-video h-12 w-full rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-700"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}