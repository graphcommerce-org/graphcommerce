import { useMotionValueValue } from '@graphcommerce/framer-utils'
import type { SerializeOptions } from 'cookie'
import { parse, serialize } from 'cookie'
import { motionValue } from 'framer-motion'
import { useIsSSR } from '../hooks'

// We need this motionValue to be synced with the actual cookie store.
const cookieNotify = motionValue<number>(0)

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

/**
 * This makes sure this hook is rerendered when the cookie changes, we do not actually use the
 * value.
 */
export function useCookies(): Record<string, string | undefined> {
  // Initial render it should always be empty since the server renders cookie-less.
  // Whenever the server can handle cookies, we can remove this and directly return the cookie value.
  const isSsr = useIsSSR()

  useMotionValueValue(cookieNotify, (v) => v)

  return isSsr ? {} : cookie()
}

export function useCookie<T extends string>(
  name: string,
  options: SerializeOptions = { sameSite: true },
  defaultValue?: T | null,
): [T | undefined | null, (value: T | null) => void] {
  const update = (val: T | null) => {
    if (val) cookie(name, val, options)
    else cookie(name, null)
  }

  const cookies = useCookies()
  const value = (cookies[name] as T | undefined | null) ?? defaultValue
  return [value, update] as const
}
