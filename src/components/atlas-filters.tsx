'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AtlasFiltersProps {
  onFilterChange: (filter: 'all' | 'monologue' | 'dialogue') => void
  activeFilter: 'all' | 'monologue' | 'dialogue'
}

export function AtlasFilters({ onFilterChange, activeFilter }: AtlasFiltersProps) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'monologue', label: 'Monologues' },
    { id: 'dialogue', label: 'Dialogues' }
  ] as const

  return (
    <div className="flex gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
            activeFilter === filter.id
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}