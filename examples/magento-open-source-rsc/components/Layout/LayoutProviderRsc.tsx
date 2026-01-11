'use client'

import type { MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'

export type LayoutContextRsc = {
  scroll: MotionValue<number>
}

const layoutContextRsc = createContext<LayoutContextRsc | undefined>(undefined)

export type LayoutProviderRscProps = {
  children: ReactNode
} & LayoutContextRsc

export function LayoutProviderRsc(props: LayoutProviderRscProps) {
  const { children, scroll } = props

  return (
    <layoutContextRsc.Provider value={useMemo(() => ({ scroll }), [scroll])}>
      {children}
    </layoutContextRsc.Provider>
  )
}

export function useLayoutRsc() {
  const ctx = useContext(layoutContextRsc)
  if (!ctx) {
    throw new Error('useLayoutRsc must be used within LayoutProviderRsc')
  }
  return ctx
}
