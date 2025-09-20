import { AppSidebar } from '@/components/app-sidebar'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full relative">
          <BackgroundBeams />
        </div>
      </div>
    </div>
  )
}