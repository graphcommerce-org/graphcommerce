'use client'

import { GlobalStyles } from '@mui/material'
import { domMax, LazyMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export type CssAndFramerMotionProviderRscProps = {
  children?: ReactNode
}

/**
 * App Router version of CssAndFramerMotionProvider.
 *
 * Unlike the Pages Router version, this does NOT wrap with EmotionProvider/CacheProvider because
 * that's handled by AppRouterCacheProvider in app/layout.tsx. Using both would create two
 * conflicting Emotion caches - AppRouterCacheProvider collects styles for SSR, but if
 * EmotionProvider creates another cache, styles render with the wrong cache and aren't collected.
 */
export function CssAndFramerMotionProviderRsc({ children }: CssAndFramerMotionProviderRscProps) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
      <GlobalStyles
        styles={{
          ':root': {
            '--client-size-y': '100vh',
            '--client-size-x': '100vw',
            '@supports(height: 100dvh)': {
              '--client-size-y': '100dvh',
              '--client-size-x': '100dvw',
            },
          },
        }}
      />
    </LazyMotion>
  )
}
