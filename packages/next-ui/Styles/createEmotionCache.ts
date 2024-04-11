import createCache from '@emotion/cache'

export const createEmotionCache = () => {
  let insertionPoint: HTMLElement | undefined

  if (typeof window !== 'undefined') {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    )
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  return createCache({ key: 'mui-style', insertionPoint, stylisPlugins: [] })
}
