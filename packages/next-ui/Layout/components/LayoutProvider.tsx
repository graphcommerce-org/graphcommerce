import { useMemo } from 'react'
import { layoutContext } from '../context/layoutContext'
import { LayoutContext } from '../types'

export type LayoutProviderProps = {
  children: React.ReactNode
} & LayoutContext

export function LayoutProvider(props: LayoutProviderProps) {
  const { children, scroll } = props

  return (
    <layoutContext.Provider value={useMemo(() => ({ scroll }), [scroll])}>
      {children}
    </layoutContext.Provider>
  )
}
