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
} from './historyHelpers'
import { historyStateVar } from './typePolicies'

const isBrowser = typeof window !== 'undefined'

type UsePageTransitionProps = { safeToRemoveAfter?: number } & Pick<
  GQLHistoryStatePage,
  'holdBackground' | 'title'
>

const usePageTransition = ({
  holdBackground = false,
  safeToRemoveAfter = 0.3,
  title,
}: UsePageTransitionProps) => {
  useQuery(HistoryStateDocument)
  let state = historyStateVar()

  const [thisIdx] = useState(state?.idx ?? 0)
  const toIdx = state?.idx ?? 0
  const fromIdx = getFromIdx()

  const isToPage = thisIdx === toIdx
  const isFromPage = thisIdx === fromIdx

  const [, safeToRemove] = usePresence()

  // Register that we want to keep the prevous page
  if (isBrowser && isToPage && getPage(thisIdx)?.title === '') {
    state = updatePage({}, { holdBackground, title }, thisIdx)
  }

  // Register the scroll position of the previous page
  if (isBrowser && state.phase === 'LOCATION_CHANGED') {
    state = updatePage({ phase: 'SCROLL_SAVED' }, { x: window.scrollX, y: window.scrollY }, fromIdx)
  }

  const thisPage = getPage(thisIdx)

  const isFarInBack = thisIdx < fromIdx && thisIdx !== toIdx
  const isFromInFront = isFromPage && untillPhase('LOCATION_CHANGED') && !isFarInBack
  const isFromInBack = (isFromPage && afterPhase('REGISTERED')) || isFarInBack
  const isToInFront = isToPage && afterPhase('REGISTERED')
  const isToInBack = isToPage && untillPhase('LOCATION_CHANGED')

  // todo: Should we warn for the case when one navigates from an overlay to a page directly instead of replacing state?
  //       Because all previous state is removed at that point with the current implementation
  //       It isn't viable to keep all old state around?
  const nextPages = state.pages.slice(thisIdx + 1, toIdx + 1)
  const hold = nextPages && nextPages.length > 0 && nextPages.every((page) => page.holdBackground)

  // If we do not need to keep the layout, we can mark it for removal
  if (isFromInBack && !hold && safeToRemove && afterPhase('REGISTERED')) {
    setTimeout(() => safeToRemove(), safeToRemoveAfter * 1000 + 300)
  }

  let target: Target = { y: 0, position: 'absolute', left: 0, right: 0, minHeight: '100vh' }

  const inFront = isFromInFront || isToInFront
  const inBack = isFromInBack || isFromInBack

  if (isFromInBack || isToInBack) {
    target = { ...target, y: (thisPage?.y ?? 0) * -1, position: 'fixed' }
  }

  const offsetDiv: MotionProps = {
    initial: target,
    animate: { ...target, transition: { duration: 0 } },
    exit: { ...target, transition: { duration: 0 } },
  }

  const prevPage = getPage(thisIdx - 1)
  const upPage = getUpPage(thisIdx)
  return { offsetDiv, hold, inFront, inBack, prevPage, upPage }
}

export default usePageTransition
