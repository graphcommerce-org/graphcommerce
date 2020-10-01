import { makeStyles } from '@material-ui/styles'
import { TargetAndTransition, MotionProps, AnimatePresence, m as motion } from 'framer-motion'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useEffect, PropsWithChildren } from 'react'
import { getScrollPos, saveScrollPos } from './scrollPosStorage'
import useNavigationDirection from './useNavigationDirection'
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
      pointerEvents: 'none',
      '& > *': {
        pointerEvents: 'all',
      },
    }),
  },
  { name: 'PageTransition' },
)

type PageTransitionProps = { pageTransition?: PageTransitionPair }

export type WithTransition<P> = P & PageTransitionProps

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
  const getDirection = useNavigationDirection()

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
      if (router.asPath === newToUrl || navigationSwipe !== 0) {
        return
      }
      setBackTransition(getDirection(newToUrl) === -1 ? pageTransition : undefined)
      saveScrollPos(router.asPath)
      setToUrl(newToUrl)
      setFromUrl(router.asPath)
      window.scrollTo(0, 0)
    }

    router.events.on('beforeHistoryChange', onTransStart)
    return () => {
      router.events.off('beforeHistoryChange', onTransStart)
    }
  })

  // When a transition is complete
  const onTransComplete = () => {
    setBackTransition(undefined)
    setToUrl(undefined)
    setFromUrl(undefined)
    const scroll = getScrollPos(router.asPath)
    window.scrollTo(scroll.x, scroll.y)
  }

  const offsetStyle = containerOffset(router.asPath, fromUrl, toUrl)

  let oldPageTransition = backTrans ? backTrans.foreground : pageTransition?.background
  let newPageTransition = backTrans ? backTrans.background : pageTransition?.foreground
  if (navigationSwipe !== 0) oldPageTransition = {}
  if (navigationSwipe !== 0) newPageTransition = {}

  return (
    <AnimatePresence initial={false} custom={oldPageTransition} onExitComplete={onTransComplete}>
      <motion.div
        key={router.asPath}
        {...motionDivProps(newPageTransition)}
        className={classes.animationDiv}
        style={offsetStyle}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
