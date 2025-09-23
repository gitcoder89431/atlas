import { AppSidebar } from '@/components/app-sidebar'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-6 lg:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-hidden relative">
          {/* Background Beams */}
          <BackgroundBeams className="absolute inset-0 z-0" />

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8">
            <div className="text-center bg-white/5 dark:bg-white/3 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-white/20 dark:border-white/10">
              {/* Brand Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 md:mb-10 tracking-tight">
                RUIXEN
              </h1>

              {/* Logo */}
              <div className="mb-8 md:mb-10">
                <img
                  src="/logo.svg"
                  alt="RUIXEN Logo"
                  className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto drop-shadow-xl rounded-full"
                />
              </div>

              {/* Link Navigation */}
              <div className="flex items-center justify-center gap-8 mb-8 md:mb-10">
                <Link href="/agency" className="text-sm text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors underline decoration-1 underline-offset-2">
                  AGENCY
                </Link>
                <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-600" />
                <Link href="/atlas" className="text-sm text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors underline decoration-1 underline-offset-2">
                  ATLAS
                </Link>
                <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-600" />
                <Link href="/about" className="text-sm text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors underline decoration-1 underline-offset-2">
                  ABOUT
                </Link>
              </div>

              {/* Tagline */}
              <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed font-light">
                The bridge between past wisdom and future intelligence
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}