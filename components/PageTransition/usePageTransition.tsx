import { useQuery } from '@apollo/client'
import { MotionProps, usePresence } from 'framer-motion'
import { Target } from 'framer-motion/types/types'
import { HistoryStateDocument } from 'generated/documents'
import { useEffect, useState } from 'react'
import {
  getCurrentIdx,
  getFromIdx,
  getPage,
  includingPhases,
  afterPhase,
  untillPhase,
  updatePage,
  betweenPhases,
  updateHistory,
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

export default function usePageTransition(layoutType: LayoutType) {
  const { data } = useQuery(HistoryStateDocument)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let state = historyStateVar()

  const [thisIdx] = useState<number>(state?.idx ?? 0)
  const currentIdx = state?.idx ?? 0
  const nextIdx = thisIdx + 1
  const prevIdx = thisIdx - 1
  const fromIdx = getFromIdx()

  const [, safeToRemove] = usePresence()

  if (typeof window !== 'undefined') {
    if (state?.phase === 'LOCATION_CHANGED' && thisIdx === currentIdx) {
      state = updatePage(
        { phase: 'REGISTERED' },
        { holdPrevious: layoutType !== 'normal' },
        thisIdx,
      )
    }
    if (state?.phase === 'REGISTERED' && thisIdx === fromIdx) {
      state = updatePage(
        { phase: 'SCROLL_SAVED' },
        { x: window.scrollX, y: window.scrollY },
        thisIdx,
      )
    }
  }

  const currentpage = getPage()
  const thisPage = getPage(thisIdx)
  const prevPage = getPage(prevIdx)
  const nextPage = getPage(nextIdx)
  const fromPage = getPage(fromIdx)

  // todo: Should we warn for the case when one navigates from an overlay to a page directly instead of replacing state?
  //       Because all previous state is removed at that point with the current implementation
  //       It isn't viable to keep all old state around?
  const isActive =
    currentIdx === thisIdx ||
    ((state?.phase === 'LOADING' || state?.phase === 'LOCATION_CHANGED') &&
      getFromIdx() === thisIdx)

  const nextPages = state?.pages.slice(nextIdx, currentIdx + 1)
  // console.log(nextPages, state?.pages)
  const hold = nextPages && nextPages.length > 0 && nextPages.every((page) => page.holdPrevious)

  // If we do not need to keep the layout, we can mark it for removal
  if (!isActive && !hold && safeToRemove) safeToRemove()

  const mode: Mode = 'deep'
  let target: Target = { y: 0, visibility: 'visible', position: 'absolute', left: 0, right: 0 }

  if (thisIdx === getFromIdx() && state.direction === 'FORWARD' && afterPhase('REGISTERED')) {
    target = { ...target, y: (thisPage?.y ?? 0) * -1 }

    if (layoutType === 'normal') {
      target = { ...target, position: 'fixed' }
    }
  }

  if (thisIdx === currentIdx && state.direction === 'FORWARD' && untillPhase('SCROLLING')) {
    target = { ...target, visibility: 'hidden' }
  }

  // We move the scroll handling inline so we can immediately use the result
  if (thisIdx === currentIdx && state.phase === 'SCROLL_SAVED') {
    console.log(state.phase)
    state = updateHistory({ phase: 'SCROLLING' })
    const page = getPage()
    window.scrollTo(page?.x ?? 0, page?.y ?? 0)
  }

  // incomming page
  if (thisIdx === currentIdx && state.direction === 'BACK' && untillPhase('SCROLLING')) {
    target = { ...target, y: (thisPage?.y ?? 0) * -1 }
    console.log(thisPage?.as, state.phase, (thisPage?.y ?? 0) * -1)
  }

  if (thisIdx === currentIdx) {
    console.log(thisPage?.as, state.phase, target.y)
  }

  // leaving page
  if (thisIdx === fromIdx && state.direction === 'BACK' && afterPhase('SCROLLING')) {
    target = { ...target, y: (thisPage?.y ?? 0) + (prevPage?.y ?? 0) * -1 }
  }

  // const bla2 =
  //   state.phase === 'LOADING' ||
  //   state.phase === 'LOCATION_CHANGED' ||
  //   state.phase === 'REGISTERED' ||
  //   state.phase === 'SCROLLING'
  // if (currentIdx === thisIdx && state.direction === 'BACK' && bla2) {
  //   console.log(nextPage?.as, 'hoi')
  //   offset = (nextPage?.y ?? 0) * -1
  // }

  // if (state.direction === 'FORWARD' && !isActive && hold && state?.phase !== 'LOADING') {

  // }

  // if (state.direction === 'BACK' && !isActive && )

  // if (state.direction === 'FORWARD')
  // console.log(thisPage?.as, state?.phase, isActive, currentIdx)
  // const isVisible = false
  // if (state?.direction === 'FORWARD') {
  //   if (thisPage?.href && thisPage.href === nextPage?.href) mode = 'shallow'

  //   // forground
  //   // if (isActive) offset = (prevPage?.y ?? 0) * -1

  //   // background
  //   if (!isActive) offset = (thisPage?.y ?? 0) * -1
  // } else {
  //   if (thisPage?.href && thisPage.href === prevPage?.href) mode = 'shallow'

  //   // forground
  //   if (isActive) {
  //     switch (state?.phase) {
  //       case 'LOADING':
  //       case 'LOCATION_CHANGED':
  //       case 'SCROLLING':
  //       case 'FINISHED':
  //     }
  //   }

  //   // background
  //   if (!isActive) {
  //     switch (state?.phase) {
  //       case 'LOADING':
  //       case 'LOCATION_CHANGED':
  //       case 'SCROLLING':
  //       case 'FINISHED':
  //     }
  //   }
  // }

  // console.log(
  //   thisPage?.as,
  //   `state.phase:${state?.phase}`,
  //   `isActive:${isForeground}`,
  //   `hold:${hold}`,
  //   `offset:${offset}`,
  // )

  const offsetDiv: MotionProps = {
    initial: target,
    animate: { ...target, transition: { duration: 0 } },
    exit: { ...target, transition: { duration: 0 } },
  }
  return { isActive, offsetDiv, mode, state: data?.historyState, hold }
  // if (state.phase === 'SCROLLING' || state.phase === 'FINISHED') {
  //   if (layoutType === 'normal' && phase !== 'enter' && state.direction === 'FORWARD') {
  //     offset = (thisPage?.y ?? 0) * -1
  //   }
  // }

  // if (layoutType === 'normal' && phase !== 'enter' && state.direction === 'BACK') {
  //   offset = ((prevPage?.y ?? 0) - (thisPage?.y ?? 0)) * -1
  // }
  // // if (state.phase === 'LOADING')
  // if (layoutType === 'overlay' && phase === 'exit' && state.direction === 'BACK') {
  //   offset = prevPage?.y ?? 0
  // }
  // // }

  // nog niet scroll positie aangepast, doe een offset

  // console.log(thisPage?.as, isActive, state.phase, phase, state.idx)
  //
  // return { phaseMode: `${phase}-${mode}` as PhaseMode, phase, mode, offset }
}
