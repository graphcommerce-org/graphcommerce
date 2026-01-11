'use client'

import type { SerializeOptions } from 'cookie'
import { useCallback, useEffect, useState } from 'react'
import { useIsSSR } from '../hooks'
import { cookie, registerCookieChangeCallback } from './cookie'

/**
 * This makes sure this hook is rerendered when the cookie changes, we do not actually use the
 * value.
 */
export function useCookies(): Record<string, string | undefined> {
  // Initial render it should always be empty since the server renders cookie-less.
  // Whenever the server can handle cookies, we can remove this and directly return the cookie value.
  const isSsr = useIsSSR()
  const [version, setVersion] = useState(0)

  // Register callback to be notified when cookies change
  useEffect(() => {
    const callback = () => setVersion((v) => v + 1)
    registerCookieChangeCallback(callback)
    return () => registerCookieChangeCallback(null)
  }, [])

  // Force re-read on version change
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = version

  return isSsr ? {} : cookie()
}

export function useCookie<T extends string>(
  name: string,
  options: SerializeOptions = { sameSite: true },
  defaultValue?: T | null,
): [T | undefined | null, (value: T | null) => void] {
  const update = useCallback(
    (val: T | null) => {
      if (val) cookie(name, val, options)
      else cookie(name, null)
    },
    [name, options],
  )

  const cookies = useCookies()
  const value = (cookies[name] as T | undefined | null) ?? defaultValue
  return [value, update] as const
}
