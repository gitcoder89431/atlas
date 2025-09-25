"use client"

import { useEffect, useRef, useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, Tag, Award, BookOpen, Users } from 'lucide-react'
import { getFeaturedPersonas, type Persona } from '@/data/personas'

// Get featured personas for public display
const personas = getFeaturedPersonas()

export default function AgencyPage() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePersonaClick = (persona: Persona) => {
    setSelectedPersona(persona)
    setIsDialogOpen(true)
  }

  return (
    <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-visible md:overflow-hidden min-h-screen md:h-screen")}>
      <AppSidebar />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-auto md:h-full md:overflow-y-auto overflow-visible">
          {/* Persona Grid */}
          <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-5">
            {personas.map((persona) => (
              <div
                key={persona.id}
                onClick={() => handlePersonaClick(persona)}
                className="group relative bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 aspect-square rounded-xl hover:from-neutral-100 hover:to-neutral-200 dark:hover:from-neutral-700 dark:hover:to-neutral-800 transition-all duration-300 cursor-pointer border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-lg overflow-hidden"
              >
                {/* Video Background (lazy) */}
                <LazyAutoplayVideo
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  src={persona.videoSrc}
                  poster={persona.imageSrc}
                />

                {/* Mobile overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl md:hidden" />

                {/* Mobile content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:hidden">
                  <div className="flex items-center gap-2 mb-1">
                    {persona.nobel && (
                      <Award className="w-3 h-3 text-yellow-400" />
                    )}
                    <span className="text-xs font-medium opacity-90">{persona.era}</span>
                  </div>
                  <h3 className="font-bold text-sm leading-tight mb-1">
                    {persona.name}
                  </h3>
                  <p className="text-xs opacity-80 leading-tight">
                    {persona.title}
                  </p>
                </div>

                {/* Desktop: Name only on hover */}
                <div className="hidden md:block absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-white">
                        {persona.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            ))}

            {/* Empty slots for future personas */}
            {Array.from({ length: Math.max(0, 25 - personas.length) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="bg-gray-100 dark:bg-neutral-800 aspect-square rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center"
              >
                <span className="text-neutral-400 dark:text-neutral-500 text-sm">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Persona Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPersona && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={selectedPersona.imageSrc}
                    >
                      <source src={selectedPersona.videoSrc} type="video/mp4" />
                    </video>
                  </div>

                  {/* Header Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <DialogTitle className="text-2xl font-bold">
                        {selectedPersona.name}
                      </DialogTitle>
                      {selectedPersona.nobel && (
                        <Award className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <DialogDescription className="text-lg font-medium mb-2">
                      {selectedPersona.title}
                    </DialogDescription>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <Calendar className="w-4 h-4" />
                      {selectedPersona.era}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Biography */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Biography
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {selectedPersona.bio}
                  </p>
                </div>

                {/* Key Contributions */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Key Contributions
                  </h3>
                  <ul className="space-y-2">
                    {selectedPersona.keyContributions.map((contribution, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-neutral-700 dark:text-neutral-300">{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Famous Quotes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Famous Quotes</h3>
                  <div className="space-y-3">
                    {selectedPersona.famousQuotes.map((quote, index) => (
                      <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-neutral-700 dark:text-neutral-300">
                        &ldquo;{quote}&rdquo;
                      </blockquote>
                    ))}
                  </div>
                </div>

                {/* Expertise Tags */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPersona.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Lazy-load and autoplay mp4 only when in viewport
function LazyAutoplayVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return // Respect user preference; keep image poster

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
          } else {
            setInView(false)
          }
        }
      },
      { root: null, threshold: 0.35 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView) {
      // Try to play when available
      const play = async () => {
        try {
          await v.play()
        } catch {
          // Autoplay may be blocked; ignore
        }
      }
      play()
    } else {
      v.pause()
    }
  }, [inView])

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // Poster-only until in view (no network fetch for video)
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}
