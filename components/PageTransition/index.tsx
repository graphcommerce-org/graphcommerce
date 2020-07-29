import { makeStyles } from '@material-ui/styles'
import { TargetAndTransition, MotionProps, AnimatePresence, m as motion } from 'framer-motion'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useEffect, PropsWithChildren } from 'react'
import { getScrollPos, saveScrollPos } from './scrollPosStorage'
import useNavigationSwipe from './useNavigationSwipe'

export type PageTransitionPair = {
  background: MotionProps
  foreground: MotionProps
}

function motionDivProps(toPage: MotionProps | undefined): MotionProps {
  return {
    ...(toPage || {}),
    exit: (fromPage: MotionProps | undefined): TargetAndTransition => {
      return (fromPage?.exit as TargetAndTransition) || {}
    },
  }
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

type StyleProps = {
  isBackTrans: boolean
}

const usePageTransitionStyles = makeStyles(
  {
    animationDiv: ({ isBackTrans }: StyleProps) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: isBackTrans ? 0 : 1,
    }),
  },
  { name: 'PageTransition' },
)

type PageTransitionProps = { pageTransition?: PageTransitionPair }

export type TransitionPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> &
  PageTransitionProps

export default function PageTransition({
  pageTransition,
  children,
}: PropsWithChildren<PageTransitionProps>) {
  const router = useRouter()
  const [backTrans, setBackTransition] = useState<PageTransitionPair | undefined>()

  const [toUrl, setToUrl] = useState<string | undefined>(undefined)
  const [fromUrl, setFromUrl] = useState<string | undefined>(undefined)
  const classes = usePageTransitionStyles({ isBackTrans: Boolean(backTrans) })
  const navigationSwipe = useNavigationSwipe()

  useEffect(() => {
    window.history.scrollRestoration = 'manual'

    const reset = () => {
      saveScrollPos(router.asPath)
      window.history.scrollRestoration = 'auto'
    }

    // When a visitor leaves the website and navigates back
    // let the browser determine the scroll position
    window.addEventListener('beforeunload', reset)
    return () => {
      window.removeEventListener('beforeunload', reset)
    }
  })

  useEffect(() => {
    // Detect that the user is hitting the back button
    // use the reverse transition
    router.beforePopState(() => {
      // todo(paales) Isn't actually navigating back, will also fire when navigating forward.
      setBackTransition(pageTransition)
      return true
    })

    // When a user navigates to a new page
    const onTransStart = (newToUrl: string) => {
      if (router.asPath === newToUrl || navigationSwipe !== 0) {
        return
      }
      saveScrollPos(router.asPath)
      setToUrl(newToUrl)
      setFromUrl(router.asPath)
      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'
    }

    router.events.on('beforeHistoryChange', onTransStart)
    return () => {
      router.events.off('beforeHistoryChange', onTransStart)
    }
  }, [backTrans, navigationSwipe, pageTransition, router])

  // When a transition is complete
  const onTransComplete = () => {
    if (backTrans) setBackTransition(undefined)
    setToUrl(undefined)
    setFromUrl(undefined)
    const scroll = getScrollPos(router.asPath)
    window.scrollTo(scroll.x, scroll.y)
    document.body.style.overflow = ''
  }

  const offsetStyle = containerOffset(router.asPath, fromUrl, toUrl)

  let exitAnimation = backTrans ? backTrans.foreground : pageTransition?.background
  let entryAnimation = backTrans ? backTrans.background : pageTransition?.foreground
  if (navigationSwipe !== 0) exitAnimation = {}
  if (navigationSwipe !== 0) entryAnimation = {}

  return (
    <AnimatePresence initial={false} custom={exitAnimation} onExitComplete={onTransComplete}>
      <motion.div
        key={router.asPath}
        {...motionDivProps(entryAnimation)}
        className={classes.animationDiv}
        style={offsetStyle}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
