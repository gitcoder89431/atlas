import { AppSidebar } from '@/components/app-sidebar'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { cn } from '@/lib/utils'
import { personas } from '@/data/personas'

// Extract quotes from personas data
function getQuotesFromPersonas() {
  const quotes: { quote: string; name: string; title: string }[] = []

  personas.forEach(persona => {
    if (persona.famousQuotes && persona.famousQuotes.length > 0) {
      // Get 1-2 best quotes per persona to avoid overwhelming
      const quotesToUse = persona.famousQuotes.slice(0, 2)
      quotesToUse.forEach(quote => {
        quotes.push({
          quote,
          name: persona.name,
          title: persona.title
        })
      })
    }
  })

  // Shuffle quotes for variety
  return quotes.sort(() => Math.random() - 0.5)
}

export default function Home() {
  const quotes = getQuotesFromPersonas()

  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full relative">
          <BackgroundBeams />

          {/* Hero Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                RUIXEN
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                The bridge between past wisdom and future intelligence
              </p>
            </div>

            {/* Flying Quotes */}
            <div className="w-full">
              <InfiniteMovingCards
                items={quotes}
                direction="right"
                speed="slow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}