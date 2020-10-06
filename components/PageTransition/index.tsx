import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, useEffect, Fragment } from 'react'
import { NavigationContext, NavigationContextProvider } from './useNavigationContext'

interface NextHistoryState {
  url: string
  as: string
  options: {
    _N_X: number
    _N_Y: number
    urls: string[]
  }
}
export type HistoryState = null | { __N: false } | ({ __N: true } & NextHistoryState)

type From = Pick<NavigationContext, 'from' | 'fromRoute'>
type To = Pick<NavigationContext, 'to' | 'toRoute'>

const PageTransition: React.FC = ({ children }) => {
  const router = useRouter()

  const [from, setFrom] = useState<From>({ from: router.asPath, fromRoute: router.route })
  const to: To = { to: router.asPath ?? '', toRoute: router.route ?? '' }

  useEffect(() => {
    // Right before a new page will enter (after it has been loaded)
    const onChangeView = () => setFrom({ from: router.asPath, fromRoute: router.route })
    router.events.on('beforeHistoryChange', onChangeView)
    return () => router.events.off('beforeHistoryChange', onChangeView)
  }, [from, router.asPath, router.events, router.route])

  return (
    <NavigationContextProvider value={{ ...from, ...to }}>
      <AnimatePresence initial={false}>
        <Fragment key={router.asPath}>{children}</Fragment>
      </AnimatePresence>
    </NavigationContextProvider>
  )
}

export default PageTransition
