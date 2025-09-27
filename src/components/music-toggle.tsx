"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Play,
  Volume2,
  Radio,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const PRIMARY_VIDEO_ID = 'yf5NOyy1SXU'
const FALLBACK_VIDEO_ID = 'jfKfPfyJRdk'

const STATIONS = [
  {
    id: 'ambient-focus',
    name: 'Ambient Focus',
    description: 'Deep focus ambience',
    videoId: PRIMARY_VIDEO_ID,
  },
  {
    id: 'lofi-beats',
    name: 'Lofi Beats',
    description: 'Chill coding patterns',
    videoId: FALLBACK_VIDEO_ID,
  },
  {
    id: 'chill-synth',
    name: 'Chill Synthwave',
    description: 'Retrowave sunsets and neon vibes',
    videoId: 'UedTcufyrHc',
  },
] as const

const INITIAL_STATION_INDEX = 0
const INITIAL_VIDEO_ID = STATIONS[INITIAL_STATION_INDEX]?.videoId ?? PRIMARY_VIDEO_ID

const YT_SCRIPT_ID = 'youtube-iframe-api'

type PlayerStatus = 'loading' | 'ready' | 'error'

type YouTubePlayer = {
  playVideo(): void
  pauseVideo(): void
  stopVideo(): void
  loadVideoById: (videoId: string | { videoId: string; startSeconds?: number }) => void
  destroy(): void
  setVolume: (volume: number) => void
  mute?: () => void
  unMute?: () => void
}

type YouTubeNamespace = {
  Player: new (
    element: HTMLElement | string,
    options: {
      height: string
      width: string
      videoId: string
      playerVars?: Record<string, string | number | undefined>
      events?: {
        onReady?: (event: { target: YouTubePlayer }) => void
        onError?: () => void
      }
    }
  ) => YouTubePlayer
}

declare global {
  interface Window {
    YT?: YouTubeNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let youtubeAPIPromise: Promise<YouTubeNamespace> | null = null

function loadYouTubeIframeAPI(): Promise<YouTubeNamespace> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window is not available'))
  }

  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT)
  }

  if (youtubeAPIPromise) {
    return youtubeAPIPromise
  }

  youtubeAPIPromise = new Promise<YouTubeNamespace>((resolve, reject) => {
    const existingScript = document.getElementById(YT_SCRIPT_ID) as HTMLScriptElement | null

    const scriptElement = existingScript ?? (() => {
      const script = document.createElement('script')
      script.id = YT_SCRIPT_ID
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.addEventListener('error', () => {
        youtubeAPIPromise = null
        reject(new Error('Failed to load the YouTube Iframe API'))
      }, { once: true })
      document.head.appendChild(script)
      return script
    })()

    if (scriptElement.getAttribute('data-loaded') === 'true' && window.YT && window.YT.Player) {
      resolve(window.YT)
      return
    }

    const previousCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      scriptElement.setAttribute('data-loaded', 'true')
      previousCallback?.()
      if (window.YT && window.YT.Player) {
        resolve(window.YT)
      } else {
        youtubeAPIPromise = null
        reject(new Error('YouTube API loaded without Player'))
      }
    }
  })

  return youtubeAPIPromise
}

export function MusicToggle({ className }: { className?: string }) {
  const [status, setStatus] = useState<PlayerStatus>('loading')
  const [isMusicOn, setIsMusicOn] = useState(false)
  const [stationIndex, setStationIndex] = useState(INITIAL_STATION_INDEX)
  const [isExpanded, setIsExpanded] = useState(false)

  const playerRef = useRef<YouTubePlayer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasSetVolumeRef = useRef(false)
  const isMusicOnRef = useRef(false)
  const errorCountRef = useRef(0)
  const activeVideoRef = useRef<string>(INITIAL_VIDEO_ID)

  const activeStation = useMemo(() => STATIONS[stationIndex] ?? STATIONS[0], [stationIndex])

  useEffect(() => {
    let isMounted = true

    loadYouTubeIframeAPI()
      .then((YT) => {
        if (!isMounted || !containerRef.current) return

        const player = new YT.Player(containerRef.current, {
          height: '0',
          width: '0',
          videoId: INITIAL_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: () => {
              if (!isMounted) return
              setStatus('ready')
              errorCountRef.current = 0
            },
            onError: () => {
              if (!isMounted) return
              errorCountRef.current += 1
              if (errorCountRef.current >= STATIONS.length) {
                setStatus('error')
                setIsMusicOn(false)
                return
              }
              setStationIndex((prev) => {
                if (STATIONS.length <= 1) {
                  setStatus('error')
                  setIsMusicOn(false)
                  return prev
                }
                return (prev + 1) % STATIONS.length
              })
            },
          },
        })

        playerRef.current = player
      })
      .catch(() => {
        if (isMounted) {
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
      if (playerRef.current) {
        try {
          playerRef.current.stopVideo()
        } catch {
          // ignore
        }
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const player = playerRef.current
    if (!player || status !== 'ready') return

    if (!hasSetVolumeRef.current) {
      try {
        player.setVolume(35)
        player.unMute?.()
      } catch {
        // ignore
      }
      hasSetVolumeRef.current = true
    }

    if (isMusicOn) {
      try {
        player.playVideo()
      } catch {
        // ignore
      }
    } else {
      try {
        player.pauseVideo()
      } catch {
        // ignore
      }
    }
  }, [isMusicOn, status])

  useEffect(() => {
    if (status === 'error' && isMusicOn) {
      setIsMusicOn(false)
    }
  }, [status, isMusicOn])

  useEffect(() => {
    isMusicOnRef.current = isMusicOn
  }, [isMusicOn])

  useEffect(() => {
    const player = playerRef.current
    if (!player || status === 'loading') return

    const currentVideoId = activeStation?.videoId ?? INITIAL_VIDEO_ID
    if (!currentVideoId) return
    if (currentVideoId === activeVideoRef.current) return

    activeVideoRef.current = currentVideoId
    try {
      player.loadVideoById({ videoId: currentVideoId, startSeconds: 0 })
      errorCountRef.current = 0
      if (!isMusicOnRef.current) {
        setTimeout(() => {
          try {
            player.pauseVideo()
          } catch {
            // ignore
          }
        }, 200)
      }
    } catch {
      // ignore, onError handler will cope
    }
  }, [activeStation, status])

  const toggleMusic = () => {
    if (status !== 'ready') return
    setIsMusicOn((prev) => !prev)
  }

  const handleStationChange = (direction: 'next' | 'prev') => {
    if (STATIONS.length <= 1) return
    if (status === 'loading') return

    errorCountRef.current = 0
    setStationIndex((prev) => {
      const count = STATIONS.length
      if (count === 0) return prev
      return direction === 'next'
        ? (prev + 1) % count
        : (prev + count - 1) % count
    })

    if (status === 'error') {
      setStatus('ready')
    }
  }

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev)
  }

  const icon = status === 'loading' ? (
    <Loader2 className="h-5 w-5 animate-spin" />
  ) : isMusicOn ? (
    <Volume2 className="h-5 w-5" />
  ) : (
    <Play className="h-5 w-5" />
  )

  return (
    <div className={cn('pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2', className)}>
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        {isExpanded && (
          <div className="w-64 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 backdrop-blur shadow-lg">
            <div className="flex items-start justify-between gap-2 border-b border-neutral-200/70 dark:border-neutral-700/70 px-4 py-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {activeStation?.name ?? 'Unknown Station'}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {status === 'loading'
                    ? 'Preparing stream…'
                    : activeStation?.description ?? 'Curated ambient feed'}
                </p>
              </div>
              <button
                type="button"
                onClick={toggleExpanded}
                className="rounded-full p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                aria-label="Close radio panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <button
                type="button"
                className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-blue-400 hover:text-blue-500 transition-colors"
                onClick={() => handleStationChange('prev')}
                aria-label="Previous station"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Station
                </p>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                  {activeStation?.name ?? 'Ambient'}
                </p>
              </div>
              <button
                type="button"
                className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-blue-400 hover:text-blue-500 transition-colors"
                onClick={() => handleStationChange('next')}
                aria-label="Next station"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            {status === 'error' && (
              <div className="px-4 pb-4">
                <p className="rounded-md bg-red-100/80 dark:bg-red-900/30 px-3 py-2 text-xs text-red-600 dark:text-red-300">
                  Music playback is unavailable right now.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleExpanded}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 backdrop-blur hover:border-blue-400 hover:text-blue-500 transition-colors"
            aria-label={isExpanded ? 'Hide radio controls' : 'Show radio controls'}
          >
            <Radio className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggleMusic}
            aria-pressed={isMusicOn}
            aria-label={isMusicOn ? 'Pause background music' : 'Play background music'}
            disabled={status === 'loading'}
            className={cn(
              'h-12 w-12 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 backdrop-blur transition-colors',
              status === 'loading'
                ? 'cursor-progress text-neutral-400'
                : 'hover:border-blue-400 hover:text-blue-500'
            )}
          >
            {icon}
          </button>
        </div>
      </div>
      <div ref={containerRef} aria-hidden className="absolute h-0 w-0 overflow-hidden" />
    </div>
  )
}
