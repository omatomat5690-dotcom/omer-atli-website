import { parseISO, format } from 'date-fns'

/**
 * Format an ISO date string (e.g. "2025-06-01") as "1 June 2025".
 * Parses as local time to avoid timezone off-by-one. Falls back to the
 * raw string if parsing fails.
 */
export function formatDate(iso: string): string {
  try {
    return format(parseISO(iso), 'd MMMM yyyy')
  } catch {
    return iso
  }
}
