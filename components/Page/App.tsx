import { ApolloProvider } from '@apollo/client'
import PageTransition from 'components/PageTransition'
import { MotionConfig, AnimationFeature, ExitFeature, AnimateLayoutFeature } from 'framer-motion'
import apolloClient from 'lib/apolloClient'
import React, { useEffect } from 'react'
import { AppProps } from './types'

export default function App({ Component, pageProps }: AppProps) {
  const { apolloState, ...layoutPageProps } = pageProps
  const { Layout } = Component

  useEffect(() => document.getElementById('jss-server-side')?.remove())

  return (
    <ApolloProvider client={apolloClient(apolloState)}>
      <MotionConfig features={[AnimationFeature, ExitFeature, AnimateLayoutFeature]}>
        <PageTransition pageTransition={Layout?.pageTransition}>
          {Layout ? (
            <Layout {...layoutPageProps}>
              <Component {...layoutPageProps} />
            </Layout>
          ) : (
            <Component {...layoutPageProps} />
          )}
        </PageTransition>
      </MotionConfig>
    </ApolloProvider>
  )
}
