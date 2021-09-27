import '../demo.css'
import { PageComponent, FramerNextPages } from '@graphcommerce/framer-next-pages'
import { LazyMotion } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import React from 'react'

const Fallback = dynamic(() => import('./[url]'), { ssr: false })

export default function MyApp(props: AppPropsType<Router> & { Component: PageComponent }) {
  return (
    <LazyMotion features={async () => (await import('../components/lazyMotion')).default}>
      <FramerNextPages {...props} fallback={<Fallback title='' />} fallbackKey='/' />
    </LazyMotion>
  )
}
