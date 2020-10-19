import { ApolloProvider } from '@apollo/client'
import PageTransition from 'components/PageTransition'
import { MotionConfig, AnimationFeature, ExitFeature, AnimateLayoutFeature } from 'framer-motion'
import apolloClient from 'lib/apolloClient'
import React, { useEffect } from 'react'
import { AppProps } from './types'

export default function App({ Component, pageProps }: AppProps) {
  const { apolloState, ...props } = pageProps
  const { Layout } = Component

  useEffect(() => document.getElementById('jss-server-side')?.remove())

  return (
    <ApolloProvider client={apolloClient(apolloState)}>
      <MotionConfig features={[AnimationFeature, ExitFeature, AnimateLayoutFeature]}>
        {Layout ? (
          <Layout {...props}>
            <PageTransition {...props}>
              <Component {...props} />
            </PageTransition>
          </Layout>
        ) : (
          <PageTransition {...props}>
            <Component {...props} />
          </PageTransition>
        )}
      </MotionConfig>
    </ApolloProvider>
  )
}
