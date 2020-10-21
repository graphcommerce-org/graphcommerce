import { useQuery } from '@apollo/client'
import { MotionProps, usePresence } from 'framer-motion'
import { Target } from 'framer-motion/types/types'
import { HistoryStateDocument } from 'generated/documents'
import { useState } from 'react'
import {
  getFromIdx,
  getPage,
  afterPhase,
  untillPhase,
  updatePage,
  getUpPage,
  getUpIdx,
  holdRoute,
} from './historyHelpers'
import { historyStateVar } from './typePolicies'

const isBrowser = typeof window !== 'undefined'

type UsePageTransitionProps = { safeToRemoveAfter?: number } & Omit<
  GQLHistoryStatePage,
  'href' | 'as' | 'x' | 'y'
>

const usePageTransition = ({ safeToRemoveAfter = 0.3, title }: UsePageTransitionProps) => {
  useQuery(HistoryStateDocument)
  let state = historyStateVar()

  const [thisIdx] = useState(state?.idx ?? 0)
  const toIdx = state?.idx ?? 0
  const fromIdx = getFromIdx()

  const isToPage = thisIdx === toIdx
  const isFromPage = thisIdx === fromIdx

  const [, safeToRemove] = usePresence()

  // Register that we want to keep the prevous page
  if (isToPage && getPage(thisIdx)?.title !== title) {
    state = updatePage({}, { title }, thisIdx)
  }

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
  const inBack = isFromInBack || isFromInBack

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
        typeof holdRoute[page.href] === 'undefined' &&
        afterPhase('REGISTERED')
      ) {
        console.warn(
          `route ${page.href} not registered, please call registerRoute in /pages${page.href}`,
        )
      }
      return holdRoute[page.href] ?? false
    })

  // If we do not need to keep the layout, we can mark it for removal
  if (isFromInBack && !hold && safeToRemove && afterPhase('REGISTERED')) {
    setTimeout(() => safeToRemove(), safeToRemoveAfter * 1000)
  }

  let target: Target = {
    y: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    minHeight: '100vh',
    pointerEvents: 'none',
  }

  if (isFromInBack || isToInBack) {
    target = { ...target, y: (thisPage?.y ?? 0) * -1, position: 'fixed' }
  }

  const offsetDiv: MotionProps = {
    initial: target,
    animate: { ...target, transition: { duration: 0 } },
    exit: { ...target, transition: { duration: 0 } },
  }

  return {
    offsetDiv,
    hold,
    inFront,
    inBack,
    isFromPage,
    toIdx,
    prevPage: getPage(thisIdx - 1),
    upPage: getUpPage(thisIdx),
    upIdx: getUpIdx(thisIdx),
  }
}

export default usePageTransition
