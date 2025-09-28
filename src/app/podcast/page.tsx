import { AppSidebar } from '@/components/app-sidebar'
import { cn, formatDateUTC } from '@/lib/utils'
import { podcastEpisodes } from '@/data/podcasts'
import { Calendar, Clock } from 'lucide-react'
import { PodcastPlayer } from '@/components/podcast-player'

export const metadata = {
  title: 'Podcast | Ruixen Atlas',
  description: 'A weekly audio signal distilling the newest Atlas dialogues, bridges, and monologues into one concise briefing.',
}

export default function PodcastPage() {
  const episodes = [...podcastEpisodes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden min-h-screen',
      )}
    >
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
          <header className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Atlas Podcast
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed">
              Each episode is a fast signal—distilling new dialogues, bridge reports, and monologues into one listenable briefing so you can track how the Atlas is evolving.
            </p>
          </header>

          <section className="space-y-6">
            {episodes.map((episode) => (
              <article
                key={episode.id}
                className="relative overflow-hidden border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white/95 dark:bg-neutral-900/90 shadow-sm hover:shadow-md transition-shadow px-6 py-6 md:px-8"
              >
                <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 opacity-80" aria-hidden="true" />
                <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                  <div className="space-y-4 md:pr-6">
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                      {episode.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDateUTC(episode.date)}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                        <Clock className="h-3 w-3" />
                        {episode.duration}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                      {episode.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 justify-center w-full md:w-[22rem] lg:w-[24rem]">
                    <PodcastPlayer src={episode.audioSrc} className="w-full" />
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}
