import type { SerializeOptions } from 'cookie'
import { parse, serialize } from 'cookie'
import { motionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

// We need this motionValue to be synced with the actual cookie store.
const cookieNotify = motionValue<number>(0)

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
    cookieNotify.set(cookieNotify.get() + 1)
    return undefined
  }

  // Delete a cookie
  if (value === null) {
    const serialized = serialize(name, '', { path: '/', maxAge: 0 })
    document.cookie = serialized
    cookieNotify.set(cookieNotify.get() + 1)
    return undefined
  }

  return undefined
}

export function useCookie(name: string) {
  const [value, setValue] = useState<string | null | undefined>(undefined)

  useEffect(() => setValue(cookie(name)), [name])
  useEffect(() => cookieNotify.on('change', () => setValue(cookie(name))))

  const update = (val: string | null) => {
    if (val) cookie(name, val, { sameSite: true })
    else cookie(name, null)
    cookieNotify.set(cookieNotify.get() + 1)
  }

  return [value, update] as const
}
