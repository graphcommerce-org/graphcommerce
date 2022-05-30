import { LazyMotion } from 'framer-motion'

export type GraphCommerceProviderProps = {
  children: React.ReactNode
}

/**
 * For [@emotion/core](https://emotion.sh/docs/introduction) and
 * [framer-motion](https://www.framer.com/motion/) to work they need to have a provider.
 *
 * - Wrapps the app to lazily load framer-motion.
 * - Wrapps the app to have Emotion CSS styles
 */
export function CssAndFramerMotionProvider({ children }: GraphCommerceProviderProps) {
  return (
    <LazyMotion features={async () => (await import('./framerFeatures')).default} strict>
      {children}
    </LazyMotion>
  )
}
