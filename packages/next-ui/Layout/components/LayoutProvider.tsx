import { MotionValue } from 'framer-motion'
import { useMemo } from 'react'
import { layoutContext } from '../context/layoutContext'

export type LayoutProviderProps = {
  children: React.ReactNode
  scroll: MotionValue<number>
}

export function LayoutProvider(props: LayoutProviderProps) {
  const { children, scroll } = props

  return (
    <layoutContext.Provider value={useMemo(() => ({ scroll }), [scroll])}>
      {children}
    </layoutContext.Provider>
  )
}
