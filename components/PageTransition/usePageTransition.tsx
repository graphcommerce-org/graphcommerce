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
  getCurrentIdx,
} from './historyHelpers'
import { historyStateVar } from './typePolicies'

const isBrowser = typeof window !== 'undefined'

function isHold(thisIdx: number) {
  const nextPages = historyStateVar().pages.slice(thisIdx + 1, getCurrentIdx() + 1)
  return nextPages && nextPages.length > 0 && nextPages.every((page) => page.holdPrevious)
}

export default function usePageTransition(layoutType: 'normal' | 'overlay') {
  useQuery(HistoryStateDocument)
  let state = historyStateVar()

  const [thisIdx] = useState(state?.idx ?? 0)
  const toIdx = state?.idx ?? 0
  const fromIdx = getFromIdx()

  const isToPage = thisIdx === toIdx
  const isFromPage = thisIdx === fromIdx

  const [, safeToRemove] = usePresence()

  // Register that we want to keep the prevous page
  if (isBrowser && isToPage && layoutType === 'normal' && getPage(thisIdx)?.holdPrevious === true) {
    state = updatePage({}, { holdPrevious: false }, thisIdx)
  }
  // Register the scroll position of the previous page
  if (isBrowser && state.phase === 'LOCATION_CHANGED') {
    state = updatePage({ phase: 'SCROLL_SAVED' }, { x: window.scrollX, y: window.scrollY }, fromIdx)
  }

  const toPage = getPage()
  const fromPage = getPage(fromIdx)

  const isFromInFront = isFromPage && untillPhase('LOCATION_CHANGED')
  const isFromInBg = isFromPage && afterPhase('REGISTERED')
  const isToInFront = isToPage && afterPhase('REGISTERED')
  const isToInBg = isToPage && untillPhase('LOCATION_CHANGED')

  // todo: Should we warn for the case when one navigates from an overlay to a page directly instead of replacing state?
  //       Because all previous state is removed at that point with the current implementation
  //       It isn't viable to keep all old state around?
  const hold = isHold(thisIdx)

  // If we do not need to keep the layout, we can mark it for removal
  if (isFromInBg && !hold && safeToRemove && afterPhase('FINISHED')) {
    console.log(fromPage?.as, 'remove')
    setTimeout(() => safeToRemove(), 1000)
  }

  let target: Target = {
    y: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    minHeight: '100vh',
  }

  const inFront = isFromInFront || isToInFront

  if (isFromInFront) {
    target = { ...target }
    console.log(fromPage?.as, 'fromInFront', target.y, state.phase, state.direction)
  }
  if (isFromInBg) {
    target = { ...target, y: (fromPage?.y ?? 0) * -1, position: 'fixed' }
    console.log(fromPage?.as, 'fromInBg', target.y, state.phase, state.direction)
  }
  if (isToInBg) {
    target = { ...target, y: (toPage?.y ?? 0) * -1, position: 'fixed' }
    console.log(toPage?.as, 'toInBg', target.y, state.phase, state.direction)
  }
  if (isToInFront) {
    target = { ...target }
    console.log(toPage?.as, 'toInFront', target.y, state.phase, state.direction)
  }

  const offsetDiv: MotionProps = {
    initial: target,
    animate: { ...target, transition: { duration: 0 } },
    exit: { ...target, transition: { duration: 0 } },
  }
  return { offsetDiv, hold, inFront }
}
