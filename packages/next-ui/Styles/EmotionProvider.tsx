import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { createEmotionCache } from './createEmotionCache'

export type EmotionProviderProps = { children?: React.ReactNode; emotionCache?: EmotionCache }

const clientSideEmotionCache = createEmotionCache()

/** Provider that is supposed to be used in your `pages/_app.tsx` */
export function EmotionProvider(props: EmotionProviderProps) {
  const { children, emotionCache = clientSideEmotionCache } = props

  return <CacheProvider value={emotionCache}>{children}</CacheProvider>
}
