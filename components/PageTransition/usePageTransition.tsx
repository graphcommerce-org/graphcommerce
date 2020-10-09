import { useQuery } from '@apollo/client'
import { usePresence } from 'framer-motion'
import { HistoryStateDocument } from 'generated/documents'
import { useState } from 'react'
import { defaultHistoryState } from './useHistoryState'

export type Phase = 'enter' | 'exit' | 'hold'
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
  // eslint-disable-next-line prefer-const
  let { data = defaultHistoryState, client } = useQuery(HistoryStateDocument)

  try {
    // Use most recent data
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    data = client.readQuery({ query: HistoryStateDocument })!
    // eslint-disable-next-line no-empty
  } catch {}
  const { historyState: state } = data

  const [thisIdx] = useState<number>(data?.historyState.idx ?? 0)
  const nextIdx = thisIdx + 1
  const prevIdx = thisIdx - 1

  const [, safeToRemove] = usePresence()

  const thisPage = state.pages[thisIdx] as GQLHistoryStatePage | undefined
  const prevPage = state.pages[prevIdx] as GQLHistoryStatePage | undefined
  const nextPage = state.pages[nextIdx] as GQLHistoryStatePage | undefined
  // const page = historyState.pages[historyState.idx]

  if (typeof window !== 'undefined' && layoutType === 'normal' && thisPage?.holdPrevious === true) {
    const pages = [...state.pages]
    pages[thisIdx] = { ...pages[thisIdx], holdPrevious: false }
    client.writeQuery({
      query: HistoryStateDocument,
      data: { ...data, historyState: { ...state, pages } },
      broadcast: true,
    })
  }

  // todo: Should we warn for the case when one navigates from an overlay to a page directly instead of replacing state?
  //       Because all previous state is removed at that point with the current implementation
  //       It isn't viable to keep all old state around?
  const isActive = state.idx === thisIdx
  const nextPages = state.pages.slice(nextIdx, state.idx + 1)
  const hold = nextPages.length > 0 && nextPages.every((page) => page.holdPrevious)

  // If we do not need to keep the layout, we can mark it for removal
  if (!isActive && !hold && safeToRemove) safeToRemove()
  let mode: Mode = 'deep'
  let offset = 0

  const isVisible = false
  if (state.direction === 'FORWARD') {
    if (thisPage?.href && thisPage.href === nextPage?.href) mode = 'shallow'

    // forground
    if (isActive) {
      switch (state.phase) {
        case 'LOADING':
          offset = (prevPage?.y ?? 0) * -1
          break
        case 'LOCATION_CHANGED':
        case 'BEFORE_SCROLL':
        case 'FINISHED':
      }
    }

    // background
    if (!isActive) {
      switch (state.phase) {
        case 'LOADING':
          break
        case 'LOCATION_CHANGED':
        case 'BEFORE_SCROLL':
        case 'FINISHED':
          offset = (thisPage?.y ?? 0) * -1
      }
    }
  } else if (thisPage?.href && thisPage.href === prevPage?.href) mode = 'shallow'

  return { isActive, isVisible, offset, mode, state, hold }
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
