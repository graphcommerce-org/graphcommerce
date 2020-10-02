import { MotionProps, AnimatePresence, m as motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useState, useEffect, PropsWithChildren } from 'react'
import { getScrollPos, saveScrollPos } from './scrollPosStorage'
import { NavigationContextProvider } from './useNavigationContext'
import useNavigationSwipe from './useNavigationSwipe'

export type PageTransitionPair = {
  background: MotionProps
  foreground: MotionProps
}

function containerOffset(
  url: string,
  fromUrl?: string,
  toUrl?: string,
): JSX.IntrinsicElements['div']['style'] {
  let style: JSX.IntrinsicElements['div']['style']
  if (fromUrl && url === fromUrl) {
    style = { left: `${window.scrollX * -1}px`, top: `${window.scrollY * -1}px` }
  } else if (toUrl && url === toUrl) {
    const scrollPos = getScrollPos(toUrl)
    style = { left: `${scrollPos.x * -1}px`, top: `${scrollPos.y * -1}px` }
  } else {
    style = { left: 0, top: 0 }
  }
  return style
}

const PageTransition: React.FC = ({ children }) => {
  const router = useRouter()
  const urls = useState<[string | undefined, string | undefined]>([undefined, undefined])
  const [[from, to], setUrls] = urls

  const swipe = useNavigationSwipe()

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    const reset = () => {
      saveScrollPos(router.asPath)
      window.history.scrollRestoration = 'auto'
    }
    // When a visitor leaves the website and navigates back
    // let the browser determine the scroll position
    window.addEventListener('beforeunload', reset)
  })

  useEffect(() => {
    // When a user navigates to a new page
    const onTransStart = (newToUrl: string) => {
      if (router.asPath === newToUrl || swipe !== 0) return
      saveScrollPos(router.asPath)
      setUrls([router.asPath, newToUrl])
      window.scrollTo(0, 0)
    }

    router.events.on('beforeHistoryChange', onTransStart)
    return () => {
      router.events.off('beforeHistoryChange', onTransStart)
    }
  })

  // When a transition is complete
  const onTransComplete = () => {
    setUrls([undefined, undefined])
    const scroll = getScrollPos(router.asPath)
    window.scrollTo(scroll.x, scroll.y)
  }

  return (
    <NavigationContextProvider value={{ swipe, from, to }}>
      <AnimatePresence initial={false} onExitComplete={onTransComplete}>
        <motion.div key={router.asPath} style={containerOffset(router.asPath, from, to)}>
          {children}
        </motion.div>
      </AnimatePresence>
    </NavigationContextProvider>
  )
}

export default PageTransition
