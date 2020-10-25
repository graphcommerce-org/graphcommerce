import { MotionConfig, AnimationFeature, ExitFeature, AnimateLayoutFeature } from 'framer-motion'
import React, { useEffect } from 'react'
import PageTransition from '../PageTransition'
import { AppProps } from './types'

export default function App({ Component, pageProps }: AppProps) {
  const { Layout } = Component

  useEffect(() => document.getElementById('jss-server-side')?.remove())

  return (
    <MotionConfig features={[AnimationFeature, ExitFeature, AnimateLayoutFeature]}>
      {Layout ? (
        <Layout {...pageProps}>
          <PageTransition {...pageProps}>
            <Component {...pageProps} />
          </PageTransition>
        </Layout>
      ) : (
        <PageTransition {...pageProps}>
          <Component {...pageProps} />
        </PageTransition>
      )}
    </MotionConfig>
  )
}
