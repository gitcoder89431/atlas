import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'

export default function AtlasPage() {
  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-visible md:overflow-hidden min-h-screen md:h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-auto md:h-full md:overflow-y-auto overflow-visible">
          {/* Centered content container with optimal reading width */}
          <div className="max-w-4xl mx-auto w-full px-2 md:px-0">
            <header className="mb-8 md:mb-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 md:mb-4">
                Atlas
              </h1>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4 md:px-0">
                Knowledge library of dialogues and monologues
              </p>
            </header>

            {/* Card-based layout with responsive spacing */}
            <div className="space-y-4 md:space-y-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-neutral-800 rounded-lg md:rounded-xl p-4 md:p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-all duration-300 cursor-pointer border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-md dark:hover:shadow-lg"
                >
                  {/* Article preview card content */}
                  <div className="space-y-3 md:space-y-4">
                    {/* Title placeholder */}
                    <div className="h-5 md:h-6 bg-neutral-200 dark:bg-neutral-600 rounded-md w-4/5 md:w-3/4"></div>

                    {/* Summary placeholder */}
                    <div className="space-y-2">
                      <div className="h-3 md:h-4 bg-neutral-100 dark:bg-neutral-700 rounded w-full"></div>
                      <div className="h-3 md:h-4 bg-neutral-100 dark:bg-neutral-700 rounded w-4/5 md:w-5/6"></div>
                    </div>

                    {/* Meta info placeholder - responsive layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2">
                      <div className="h-3 bg-neutral-100 dark:bg-neutral-700 rounded w-16 sm:w-20"></div>
                      <div className="h-3 bg-neutral-100 dark:bg-neutral-700 rounded w-12 sm:w-16"></div>
                      <div className="h-3 bg-neutral-100 dark:bg-neutral-700 rounded w-20 sm:w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom padding for scroll breathing room */}
            <div className="h-16 md:h-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}