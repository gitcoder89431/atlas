"use client"

import { useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PodcastPlayerProps {
  src: string
  className?: string
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function PodcastPlayer({ src, className }: PodcastPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const isLoaded = duration > 0

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoaded = () => {
      setDuration(audio.duration || 0)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(audio.duration || 0)
    }

    audio.addEventListener('loadedmetadata', handleLoaded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }

  const handleSeek = (value: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = value
    setCurrentTime(value)
  }

  return (
    <div className={cn('w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100/70 dark:bg-neutral-800/70 backdrop-blur-sm px-4 py-3', className)}>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full transition-colors',
            isPlaying
              ? 'bg-purple-600 text-white hover:bg-purple-500'
              : 'bg-blue-600 text-white hover:bg-blue-500',
          )}
          aria-label={isPlaying ? 'Pause podcast' : 'Play podcast'}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={isLoaded ? duration : 0}
              step={0.1}
              value={currentTime}
              onChange={(event) => handleSeek(Number(event.target.value))}
              className="flex-1 accent-neutral-900 dark:accent-neutral-100 h-1 rounded-full appearance-none bg-neutral-300 dark:bg-neutral-700"
              aria-valuemax={duration}
              aria-valuemin={0}
              aria-valuenow={currentTime}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <audio ref={audioRef} preload="none">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
