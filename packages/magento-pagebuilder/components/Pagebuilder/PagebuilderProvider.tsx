import React, { useMemo } from 'react'
import type { GetRenderComponent } from '../../types'

type PagebuilderContext = {
  getComponentByType: GetRenderComponent
}
const pagebuilerContext = React.createContext(undefined as unknown as PagebuilderContext)

if (process.env.NODE_ENV !== 'production') {
  pagebuilerContext.displayName = 'PagebuilerContext'
}

type PagebuilderContextProps = {
  children: React.ReactNode
} & PagebuilderContext

export function PagebuilderProvider(props: PagebuilderContextProps) {
  const { children, getComponentByType } = props
  const value = useMemo(() => ({ getComponentByType }), [getComponentByType])
  return <pagebuilerContext.Provider value={value}>{children}</pagebuilerContext.Provider>
}

export function usePagebuilderContext() {
  return React.useContext(pagebuilerContext)
}
