import { GlobalStyles } from '@mui/material'
import type { FeatureBundle } from 'framer-motion'
import { LazyMotion } from 'framer-motion'
import { startTransition, useEffect, useState } from 'react'
import type { EmotionProviderProps } from '../Styles/EmotionProvider'
import { EmotionProvider } from '../Styles/EmotionProvider'

// Until the features are loaded `m` components render as plain elements.
const noFeatures = {} as FeatureBundle

/**
 * Loads framer-motion's features after hydration and applies them in a transition, so the resulting
 * re-render of all `m` components is time-sliced instead of one blocking task, and the features
 * stay out of the startup bundle.
 */
function useFramerFeatures() {
  const [features, setFeatures] = useState<FeatureBundle>(noFeatures)
  useEffect(() => {
    import('./framerFeatures')
      .then((m) => startTransition(() => setFeatures(m.default)))
      .catch(console.error)
  }, [])
  return features
}

export type CssAndFramerMotionProviderProps = EmotionProviderProps

/**
 * For [@emotion/core](https://emotion.sh/docs/introduction) and
 * [framer-motion](https://www.framer.com/motion/) to work they need to have a provider.
 *
 * - Wrapps the app to lazily load framer-motion.
 * - Wrapps the app to have Emotion CSS styles
 */
export function CssAndFramerMotionProvider(props: CssAndFramerMotionProviderProps) {
  const { children, emotionCache } = props
  return (
    <EmotionProvider emotionCache={emotionCache}>
      <LazyMotion features={useFramerFeatures()} strict>
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
    </EmotionProvider>
  )
}
