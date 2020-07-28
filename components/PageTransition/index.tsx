import React, { useState, useEffect, PropsWithChildren } from 'react'
import { TargetAndTransition, MotionProps, AnimatePresence, m as motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/styles'
import { NextPage } from 'next'
import { getScrollPos, saveScrollPos } from './scrollPosStorage'

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
  { name: 'ShopLayout' },
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
      if (router.asPath === newToUrl) {
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
  }, [backTrans, pageTransition, router])

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

  return (
    <AnimatePresence
      initial={false}
      custom={backTrans ? backTrans.foreground : pageTransition?.background}
      onExitComplete={onTransComplete}
    >
      <motion.div
        key={router.asPath}
        {...motionDivProps(backTrans ? backTrans.background : pageTransition?.foreground)}
        className={classes.animationDiv}
        style={offsetStyle}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
