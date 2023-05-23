'use client'

import createCache from '@emotion/cache'
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

let muiCache: EmotionCache | undefined
export const createMuiCache = () => {
  muiCache = createCache({ key: 'mui' })
  return muiCache
}

/** Provider that is supposed to be used in your `pages/_app.tsx` */
export function EmotionProvider({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={muiCache ?? createMuiCache()}>{children}</CacheProvider>
}
