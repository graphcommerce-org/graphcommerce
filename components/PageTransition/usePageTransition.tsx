import { usePresence } from 'framer-motion'
import { SafeToRemove } from 'framer-motion/types/components/AnimatePresence/use-presence'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useNavigationContext, { NavigationContext } from './useNavigationContext'
import useNavigationDirection from './useNavigationDirection'
import { HistoryState } from '.'

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

const toRemove = new Set<SafeToRemove>()
let canRemove = true

const safeToRemoveHandler = (safeToRemove: true | ReturnType<typeof usePresence>[1]) => {
  if (safeToRemove === true) {
    canRemove = false
  } else if (typeof safeToRemove === 'function') {
    toRemove.add(safeToRemove)
    canRemove = true
  } else {
    setTimeout(() => {
      if (!canRemove) return
      toRemove.forEach((remove) => remove())
      toRemove.clear()
      canRemove = false
    }, 0)
  }
}

function useScrollStates() {
  const router = useRouter()
  const [pos, setState] = useState<[number, number]>([0, 0])

  useEffect(() => {
    const onPopState = (e: PopStateEvent): void => {
      const state = e.state as HistoryState
      if (!state?.__N) return
      setState([window.scrollY, state.options._N_Y ?? 0])
    }
    const onRouteChangeStart = () => {
      const state = window.history.state as HistoryState
      if (!state?.__N) return
      setState([state.options._N_Y, 0])
    }
    window.addEventListener('popstate', onPopState)
    router.events.on('routeChangeStart', onRouteChangeStart)
    return () => {
      window.removeEventListener('popstate', onPopState)
      router.events.off('routeChangeStart', onRouteChangeStart)
    }
  }, [router.events])

  return pos
}

export default function usePageTransition(layoutType: LayoutType) {
  const [, safeToRemove] = usePresence()
  const { from, to, fromRoute, toRoute } = useNavigationContext()
  const router = useRouter()
  const [asPath] = useState<string>(router.asPath)
  const mode: Mode = fromRoute === toRoute ? 'shallow' : 'deep'
  const [fromPx, toPx] = useScrollStates()
  const direction = useNavigationDirection()

  let phase: Phase = 'enter'
  let offset = 0

  if (from === asPath) {
    phase = 'exit'
  }
  if (from === asPath && !canRemove) {
    phase = 'hold'
  }

  if (layoutType === 'normal' && (phase === 'hold' || phase === 'exit')) {
    offset = direction === 1 ? fromPx * -1 : (toPx - fromPx) * -1
  }
  if (layoutType === 'overlay' && phase === 'exit') {
    offset = direction === 1 ? 0 : toPx
  }

  useEffect(() => {
    if (layoutType === 'normal') safeToRemoveHandler(safeToRemove)
    if (layoutType === 'overlay' && !safeToRemove) safeToRemoveHandler(true)
    if (layoutType === 'overlay' && safeToRemove) safeToRemove()
  }, [layoutType, safeToRemove])

  return { phaseMode: `${phase}-${mode}` as PhaseMode, phase, mode, offset }
}
