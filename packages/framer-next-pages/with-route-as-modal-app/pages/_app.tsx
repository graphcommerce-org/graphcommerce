import '../demo.css'
import { PageComponent, FramerNextPages } from '@reachdigital/framer-next-pages'
import { AppPropsType } from 'next/dist/next-server/lib/utils'
import type { Router } from 'next/router'

export default function MyApp(props: AppPropsType<Router> & { Component: PageComponent }) {
  return <FramerNextPages {...props} />
}
