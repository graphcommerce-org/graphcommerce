import { FramerNextPages } from '@reachdigital/framer-next-pages'
import { LazyMotion } from 'framer-motion'
import { AppPropsType } from 'next/dist/next-server/lib/utils'
import React, { useEffect } from 'react'
import { AppProps } from './types'

export default function App(props: AppProps & AppPropsType) {
  const {
    Component: { Layout },
    pageProps,
  } = props
  useEffect(() => document.getElementById('jss-server-side')?.remove())

  return (
    <LazyMotion features={async () => (await import('./framerFeatures')).default} strict>
      {Layout ? (
        <Layout {...pageProps}>
          <FramerNextPages {...props} />
        </Layout>
      ) : (
        <FramerNextPages {...props} />
      )}
    </LazyMotion>
  )
}
