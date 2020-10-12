import { useQuery } from '@apollo/client'
import { usePresence } from 'framer-motion'
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
} from './historyState'
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
  let offset = 0

  if (thisIdx === getFromIdx() && state.direction === 'FORWARD' && afterPhase('REGISTERED')) {
    offset = (thisPage?.y ?? 0) * -1
  }

  if (
    layoutType === 'overlay' &&
    thisIdx === currentIdx &&
    state.direction === 'FORWARD' &&
    untillPhase('LOADING')
  ) {
    offset = prevPage?.y ?? 0
    console.log(offset)
  }

  if (thisIdx === currentIdx && typeof window !== 'undefined') {
    // console.log(thisPage?.as, state.phase, window.scrollY)
  }

  if (thisIdx === currentIdx && state.direction === 'BACK' && untillPhase('BEFORE_SCROLL')) {
    offset = (thisPage?.y ?? 0) * -1
  }

  // The page we're navigating from
  if (thisIdx === fromIdx && state.direction === 'BACK' && afterPhase('BEFORE_SCROLL')) {
    offset = prevPage?.y ?? 0 * -1
  }

  // const bla2 =
  //   state.phase === 'LOADING' ||
  //   state.phase === 'LOCATION_CHANGED' ||
  //   state.phase === 'REGISTERED' ||
  //   state.phase === 'BEFORE_SCROLL'
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
  //       case 'BEFORE_SCROLL':
  //       case 'FINISHED':
  //     }
  //   }

  //   // background
  //   if (!isActive) {
  //     switch (state?.phase) {
  //       case 'LOADING':
  //       case 'LOCATION_CHANGED':
  //       case 'BEFORE_SCROLL':
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

  return { isActive, offset, mode, state: data?.historyState, hold }
  // if (state.phase === 'BEFORE_SCROLL' || state.phase === 'FINISHED') {
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
