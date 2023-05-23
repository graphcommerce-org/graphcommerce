/* eslint-disable import/no-extraneous-dependencies */
import createCache from '@emotion/cache'
import type { Options as OptionsOfCreateCache, EmotionCache } from '@emotion/cache'
import { CacheProvider as DefaultCacheProvider } from '@emotion/react'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'
import type { ReactNode } from 'react'

export type NextAppDirEmotionCacheProviderProps = {
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options: Omit<OptionsOfCreateCache, 'insertionPoint'>
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: { value: EmotionCache; children: ReactNode }) => JSX.Element | null
  children: ReactNode
}

export function StylesCacheProvider(props: NextAppDirEmotionCacheProviderProps) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props

  const [handle] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert.bind(cache)
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  // useEffect(() => {
  //   const style = document.querySelector("[data-emotion^='css ']")
  //   if (style) {
  //     style.remove()
  //   }
  // }, [])

  useServerInsertedHTML(() => {
    const names = handle.flush()
    if (names.length === 0) return null
    let styles = ''
    for (const name of names) {
      styles += handle.cache.inserted[name]
    }
    return (
      <style
        key={handle.cache.key}
        data-emotion={`${handle.cache.key} ${names.join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return <CacheProvider value={handle.cache}>{children}</CacheProvider>
}
