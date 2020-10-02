import { useIsPresent } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useNavigationContext, { NavigationContext } from './useNavigationContext'

export type Phase = undefined | 'exiting' | 'entering'
export type Mode = undefined | 'shallow' | 'deep'

function getMode({ from, to }: NavigationContext): Mode {
  if (!to || !from) return undefined
  return to?.split('/')[1] === from?.split('/')[1] ? 'shallow' : 'deep'
}

export default function usePhaseMode() {
  const isPresent = useIsPresent()
  const navigationContext = useNavigationContext()
  const { from, to, swipe } = navigationContext
  const router = useRouter()

  const [phaseMode, setPhaseMode] = useState<{ phase: Phase; mode: Mode }>({
    phase: 'entering',
    mode: getMode(navigationContext),
  })

  useEffect(() => {
    if (swipe || !isPresent) return
    if (to && from) {
      if (from === router.asPath)
        setPhaseMode({ phase: 'exiting', mode: getMode(navigationContext) })
      if (to === router.asPath)
        setPhaseMode({ phase: 'entering', mode: getMode(navigationContext) })
    } else {
      setPhaseMode({ phase: undefined, mode: undefined })
    }
  }, [from, isPresent, navigationContext, router.asPath, swipe, to])

  return phaseMode
}
