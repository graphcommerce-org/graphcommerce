import type { SerializeOptions } from 'cookie'
import { parse, serialize } from 'cookie'

// Notification callback for cookie changes - set by cookieHooks.ts on the client
let onCookieChange: (() => void) | null = null

/** Register a callback to be notified when cookies change (used by useCookies hook) */
export function registerCookieChangeCallback(callback: (() => void) | null) {
  onCookieChange = callback
}

export function cookie(): Record<string, string | undefined>
/** Read a cookie */
export function cookie<T extends string>(name: string): T | undefined
/** Set a cookie */
export function cookie(name: string, value: string, options?: SerializeOptions): void
/** Delete a cookie */
export function cookie(name: string, value: null): void
/** Function to handle the three different cases */
export function cookie(name?: string, value?: string | null, options?: SerializeOptions) {
  if (typeof window === 'undefined') return undefined

  // Read all cookies
  if (typeof name === 'undefined') return parse(document.cookie)

  // Read a cookie
  if (typeof value === 'undefined') return parse(document.cookie)[name]

  // Set a cookie
  if (typeof value === 'string') {
    const serialized = serialize(name, value, { path: '/', maxAge: 31536000, ...options })
    document.cookie = serialized
    onCookieChange?.()
    return undefined
  }

  // Delete a cookie
  if (value === null) {
    const serialized = serialize(name, '', { path: '/', maxAge: 0 })
    document.cookie = serialized
    onCookieChange?.()
    return undefined
  }

  return undefined
}
