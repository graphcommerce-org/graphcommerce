import { usePresence } from 'framer-motion'
import { SafeToRemove } from 'framer-motion/types/components/AnimatePresence/use-presence'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useNavigationContext, { NavigationContext } from './useNavigationContext'

export type Phase = undefined | 'exiting' | 'entering'
export type Mode = undefined | 'shallow' | 'deep'
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

function getMode({ from, to }: NavigationContext): Mode {
  if (!to || !from) return undefined
  return to?.split('/')[1] === from?.split('/')[1] ? 'shallow' : 'deep'
}

export default function usePageTransition(layoutType: LayoutType) {
  const [isPresent, safeToRemove] = usePresence()
  const navigationContext = useNavigationContext()
  const { from, to, swipe } = navigationContext
  const router = useRouter()

  const [phaseMode, setPhaseMode] = useState<{ phase: Phase; mode: Mode }>({
    phase: 'entering',
    mode: getMode(navigationContext),
  })

  useEffect(() => {
    if (layoutType === 'normal') safeToRemoveHandler(safeToRemove)
    if (layoutType === 'overlay' && !safeToRemove) safeToRemoveHandler(true)
    if (layoutType === 'overlay' && safeToRemove) safeToRemove()
  }, [layoutType, safeToRemove])

  useEffect(() => {
    if (swipe || !isPresent) return
    if (to && from) {
      if (from === router.asPath)
        setPhaseMode({ phase: 'exiting', mode: getMode(navigationContext) })
      if (to === router.asPath)
        setPhaseMode({ phase: 'entering', mode: getMode(navigationContext) })
    }
  }, [from, isPresent, navigationContext, router.asPath, swipe, to])

  return phaseMode
}
