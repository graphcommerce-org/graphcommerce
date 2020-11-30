import { useReactiveVar } from '@apollo/client'
import { HistoryStatePage } from '@reachdigital/magento-graphql'
import { MotionProps, usePresence } from 'framer-motion'
import { Target } from 'framer-motion/types/types'
import { useEffect, useState } from 'react'
import {
  getFromIdx,
  getPage,
  afterPhase,
  untillPhase,
  updatePage,
  getUpPage,
  routeUi,
} from './historyHelpers'
import { historyStateVar } from './typePolicies'

const isBrowser = typeof window !== 'undefined'

type UsePageTransitionProps = { safeToRemoveAfter?: number } & Omit<
  HistoryStatePage,
  'href' | 'as' | 'x' | 'y'
>

const usePageTransition = ({ safeToRemoveAfter = 0.5, title }: UsePageTransitionProps) => {
  let state = useReactiveVar(historyStateVar)

  const [thisIdx] = useState(state?.idx ?? 0)

  const toIdx = state?.idx ?? 0
  const fromIdx = getFromIdx()

  const isToPage = thisIdx === toIdx
  const isFromPage = thisIdx === fromIdx

  const [, safeToRemove] = usePresence()

  useEffect(() => {
    // Register the title of the page if it needs updating
    if (getPage(thisIdx)?.title === title) return
    updatePage({}, { title }, thisIdx)
  }, [isToPage, thisIdx, title])

  // Register the scroll position of the previous page
  if (isBrowser && state.phase === 'LOCATION_CHANGED') {
    state = updatePage({ phase: 'REGISTERED' }, { x: window.scrollX, y: window.scrollY }, fromIdx)
  }

  const thisPage = getPage(thisIdx)
  const isFarInBack = thisIdx < fromIdx && thisIdx !== toIdx
  const isFromInFront = isFromPage && untillPhase('LOCATION_CHANGED') && !isFarInBack
  const isFromInBack = (isFromPage && afterPhase('REGISTERED')) || isFarInBack
  const isToInFront = isToPage && afterPhase('REGISTERED')
  const isToInBack = isToPage && untillPhase('LOCATION_CHANGED')
  const inFront = isFromInFront || isToInFront
  const inBack = isFromInBack || isToInBack

  // todo: Should we warn for the case when one navigates from an overlay to a page directly instead of replacing state?
  //       Because all previous state is removed at that point with the current implementation
  //       It isn't viable to keep all old state around?
  const nextPages = state.pages.slice(thisIdx + 1, toIdx + 1)
  const hold =
    nextPages &&
    nextPages.length > 0 &&
    nextPages.every((page) => {
      if (
        process.env.NODE_ENV !== 'production' &&
        typeof routeUi[page.href] === 'undefined' &&
        afterPhase('REGISTERED')
      ) {
        console.warn(
          `route ${page.href} not registered, please call registerRoute in /pages${page.href}`,
        )
      }
      return routeUi[page.href]?.holdBackground ?? false
    })

  // calculate how far a page is in the back
  let backLevel = nextPages.length
  if (untillPhase('LOCATION_CHANGED')) {
    if (thisIdx <= fromIdx && state.direction === 'FORWARD') backLevel -= 1
    if (thisIdx < fromIdx && state.direction === 'BACK') backLevel += 1
  }

  // If we do not need to keep the layout, we can mark it for removal
  if (isFromInBack && !hold && safeToRemove && afterPhase('REGISTERED')) {
    setTimeout(() => safeToRemove(), safeToRemoveAfter * 1000)
  }

  useEffect(() => {
    setTimeout(() => {
      const { phase } = historyStateVar()
      if (phase !== 'REGISTERED' || !isToPage) return
      updatePage({ phase: 'FINISHED' }, {})
      const page = getPage()
      document.body.style.minHeight = `calc(100vh + ${page?.y}px)`
      window.scrollTo(page?.x ?? 0, page?.y ?? 0)
    }, safeToRemoveAfter * 1000)
  })

  let target: Target = {
    y: 0,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  }

  if (isFromPage) {
    if (state.phase === 'LOADING') {
      target = { ...target, position: 'relative' }
    } else {
      const y = (thisPage?.y ?? 0) * -1 + getPage(toIdx).y
      target = { ...target, pointerEvents: 'none', y }
    }
  }

  if (isToPage) {
    if (untillPhase('REGISTERED')) {
      const y = (thisPage?.y ?? 0) * -1
      target = { ...target, y }
    }
    if (state.phase === 'FINISHED') {
      target = { ...target, position: 'relative' }
    }
  }

  const offsetDiv: MotionProps = {
    initial: target,
    animate: { ...target, transition: { duration: 0 } },
    exit: { ...target, transition: { duration: 0 } },
  }

  return {
    phase: state.phase,
    offsetDiv,
    hold,
    inFront,
    inBack,
    isFromPage,
    toIdx,
    thisIdx,
    backLevel,
    prevPage: getPage(thisIdx - 1),
    upPage: getUpPage(thisIdx),
  }
}

export default usePageTransition
