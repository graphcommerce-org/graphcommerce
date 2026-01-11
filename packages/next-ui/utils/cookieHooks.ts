'use client'

import { useMotionValueValue } from '@graphcommerce/framer-utils'
import type { SerializeOptions } from 'cookie'
import { useIsSSR } from '../hooks'
import { cookie, cookieNotify } from './cookie'

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
