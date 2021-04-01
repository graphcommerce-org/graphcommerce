import { LazyMotion } from 'framer-motion'
import React, { useEffect } from 'react'
import PageTransition from '../PageTransition'
import { AppProps } from './types'

export default function App({ Component, pageProps }: AppProps) {
  const { Layout } = Component

  useEffect(() => document.getElementById('jss-server-side')?.remove())

  return (
    <LazyMotion features={async () => (await import('./framerFeatures')).default} strict>
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
    </LazyMotion>
  )
}
