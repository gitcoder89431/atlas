import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-neutral-800 aspect-square rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
