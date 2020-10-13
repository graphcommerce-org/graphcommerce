import { useQuery } from '@apollo/client'
import { MotionProps, usePresence } from 'framer-motion'
import { Target } from 'framer-motion/types/types'
import { HistoryStateDocument } from 'generated/documents'
import { useEffect, useState } from 'react'
import {
  getCurrentIdx,
  getFromIdx,
  getPage,
  afterPhase,
  untillPhase,
  updatePage,
  betweenPhases,
  updateHistory,
  getFromPage,
} from './historyHelpers'
import { historyStateVar } from './typePolicies'

export type Mode = 'shallow' | 'deep'

// todo: can be removed in typescript 4.1
export type PhaseMode =
  | 'enter-shallow'
  | 'exit-shallow'
  | 'hold-shallow'
  | 'enter-deep'
  | 'exit-deep'
  | 'hold-deep'

export type LayoutType = 'normal' | 'overlay'

const isBrowser = typeof window !== 'undefined'

export default function usePageTransition(layoutType: LayoutType) {
  useQuery(HistoryStateDocument)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let state = historyStateVar()

  const [thisIdx] = useState<number>(state?.idx ?? 0)
  const currentIdx = state?.idx ?? 0
  const fromIdx = getFromIdx()

  const isToPage = thisIdx === currentIdx
  const isFromPage = thisIdx === fromIdx

  const [, safeToRemove] = usePresence()

  if (isBrowser && isToPage && layoutType === 'normal' && getPage(thisIdx)?.holdPrevious === true) {
    state = updatePage({}, { holdPrevious: false }, thisIdx)
  }

  if (isBrowser && state.phase === 'LOCATION_CHANGED') {
    const scroll = { x: window.scrollX, y: window.scrollY }
    if (isToPage && state.direction === 'BACK') {
      state = updatePage({ phase: 'SCROLL_SAVED' }, scroll, fromIdx)
    }
    if (isFromPage && state.direction === 'FORWARD') {
      state = updatePage({ phase: 'SCROLL_SAVED' }, scroll, thisIdx)
    }
  }

  const toPage = getPage()
  const thisPage = getPage(thisIdx)
  const fromPage = getPage(fromIdx)

  const fromInFront = isFromPage && untillPhase('LOCATION_CHANGED')
  const fromInBg = isFromPage && afterPhase('REGISTERED')
  const toInFront = isToPage && afterPhase('REGISTERED')
  const toInBg = isToPage && untillPhase('LOCATION_CHANGED')

  // todo: Should we warn for the case when one navigates from an overlay to a page directly instead of replacing state?
  //       Because all previous state is removed at that point with the current implementation
  //       It isn't viable to keep all old state around?
  const isActive =
    currentIdx === thisIdx ||
    ((state?.phase === 'LOADING' || state?.phase === 'LOCATION_CHANGED') &&
      getFromIdx() === thisIdx)

  const nextPages = state?.pages.slice(thisIdx + 1, currentIdx + 1)
  const hold = nextPages && nextPages.length > 0 && nextPages.every((page) => page.holdPrevious)

  // If we do not need to keep the layout, we can mark it for removal
  if (!isActive && !hold && safeToRemove && afterPhase('FINISHED')) {
    setTimeout(() => safeToRemove(), 1000)
  }

  const mode: Mode = 'deep'
  let target: Target = {
    y: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    minHeight: '100vh',
  }

  const inFront = fromInFront || toInFront
  const inBack = fromInBg || toInBg

  if (fromInFront) {
    target = { ...target }
    console.log(fromPage?.as, 'fromInFront', target.y, state.phase)
  }
  if (fromInBg) {
    target = { ...target, y: (fromPage?.y ?? 0) * -1, position: 'fixed' }
    console.log(fromPage?.as, 'fromInBg', target.y, state.phase)
  }
  if (toInBg) {
    target = { ...target, y: (toPage?.y ?? 0) * -1, position: 'fixed' }
    console.log(toPage?.as, 'toInBg', target.y, state.phase)
  }
  if (toInFront) {
    target = { ...target }
    console.log(toPage?.as, 'toInFront', target.y, state.phase)
  }

  const offsetDiv: MotionProps = {
    initial: target,
    animate: { ...target, transition: { duration: 0 } },
    exit: { ...target, transition: { duration: 0 } },
  }
  return { offsetDiv, hold, inFront }
}
