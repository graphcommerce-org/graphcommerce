import type { SerializeOptions } from 'cookie'
import { parse, serialize } from 'cookie'

/** Read a cookie */
export function cookie(name: string): string | undefined
/** Set a cookie */
export function cookie(name: string, value: string, options?: SerializeOptions): void
/** Delete a cookie */
export function cookie(name: string, value: null): void
/** Function to handle the three different cases */
export function cookie(name: string, value?: string | null, options?: SerializeOptions) {
  if (typeof window === 'undefined') {
    return undefined
  }

  // Read a cookie
  if (typeof value === 'undefined') return parse(document.cookie)[name]

  // Set a cookie
  if (typeof value === 'string') {
    const serialized = serialize(name, value, { path: '/', maxAge: 31536000, ...options })
    document.cookie = serialized
    return undefined
  }

  // Delete a cookie
  if (value === null) {
    const serialized = serialize(name, '', { path: '/', maxAge: 0 })
    document.cookie = serialized
    return undefined
  }

  return undefined
}
