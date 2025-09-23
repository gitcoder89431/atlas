import { AppSidebar } from '@/components/app-sidebar'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { QuotesCarousel } from '@/components/quotes-carousel'
import { cn } from '@/lib/utils'

export default function Home() {

  return (
    <div className={cn(
      "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700",
      // Always allow vertical scrolling so hero + carousel never get clipped
      "min-h-screen overflow-y-auto"
    )}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-6 lg:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full relative isolate overflow-visible">
          <BackgroundBeams />

          {/* Hero Content */}
          <div className="relative z-20 flex flex-col items-center justify-start md:justify-center min-h-[60vh] px-4 md:px-8 pt-6 md:pt-0">
            <div className="relative z-50 text-center mb-12 md:mb-24">
              {/* Logo */}
              <div className="mb-8 md:mb-10">
                <img
                  src="/logo.png"
                  alt="RUIXEN Logo"
                  className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto drop-shadow-xl rounded-full"
                />
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 md:mb-8 tracking-tight">
                RUIXEN
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed font-light">
                The bridge between past wisdom and future intelligence
              </p>
            </div>

            {/* Flying Quotes */}
            <QuotesCarousel />
            <div className="h-8 md:h-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
