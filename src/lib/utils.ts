import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateUTC(
  dateString: string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {},
) {
  if (!dateString) return ''
  const safeDate = new Date(`${dateString}T00:00:00Z`)
  if (Number.isNaN(safeDate.getTime())) return dateString
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    ...options,
  })
  return formatter.format(safeDate)
}
