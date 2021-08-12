import { FramerNextPages } from '@reachdigital/framer-next-pages'
import { LazyMotion } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import React, { useEffect } from 'react'
import { AppProps } from './types'

export default function App(props: AppProps & AppPropsType) {
  useEffect(() => document.getElementById('jss-server-side')?.remove())

  return (
    <LazyMotion features={async () => (await import('./framerFeatures')).default} strict>
      <FramerNextPages {...props} />
    </LazyMotion>
  )
}
