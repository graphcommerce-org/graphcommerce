import '../demo.css'
import { PageComponent, FramerNextPages } from '@reachdigital/framer-next-pages'
import { AppPropsType } from 'next/dist/next-server/lib/utils'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'

const Fallback = dynamic(() => import('./index'), { ssr: false })

export default function MyApp(props: AppPropsType<Router> & { Component: PageComponent }) {
  return <FramerNextPages {...props} fallback={<Fallback />} fallbackKey='/' />
}
