import { MotionProps, usePresence } from 'framer-motion'
import { SafeToRemove } from 'framer-motion/types/components/AnimatePresence/use-presence'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useNavigationContext, { NavigationContext } from './useNavigationContext'

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

function getMode({ from, to }: Pick<NavigationContext, 'from' | 'to'>): Mode {
  if (!to || !from) return 'deep'
  return to?.split('/')[1] === from?.split('/')[1] ? 'shallow' : 'deep'
}

export default function usePageTransition(layoutType: LayoutType) {
  const [, safeToRemove] = usePresence()
  const navigationContext = useNavigationContext()
  const { from, to, swipe } = navigationContext
  const router = useRouter()
  const [asPath] = useState<string>(router.asPath)

  const mode = getMode({ from, to })
  const [phase, setPhase] = useState<Phase>('enter')

  useEffect(() => {
    if (layoutType === 'normal') safeToRemoveHandler(safeToRemove)
    if (layoutType === 'overlay' && !safeToRemove) safeToRemoveHandler(true)
    if (layoutType === 'overlay' && safeToRemove) safeToRemove()
  }, [layoutType, safeToRemove])

  useEffect(() => {
    if (swipe) return
    if (to && from) {
      if (from === asPath && !canRemove) setPhase('hold')
      if (from === asPath && canRemove) {
        setPhase((current) => (current === 'hold' ? current : 'exit'))
      }
      if (to === asPath) setPhase('enter')
    }
  }, [asPath, from, safeToRemove, swipe, to])

  return `${phase}-${mode}` as PhaseMode
}
