import React, { useMemo } from 'react'
import { GetRenderType } from '../../types'

type PagebuilderContext = {
  getRenderType: GetRenderType
}
const pagebuilerContext = React.createContext(undefined as unknown as PagebuilderContext)

if (process.env.NODE_ENV !== 'production') {
  pagebuilerContext.displayName = 'PagebuilerContext'
}

type PagebuilderContextProps = {
  children: React.ReactNode
} & PagebuilderContext

export function PagebuilderProvider(props: PagebuilderContextProps) {
  const { children, getRenderType } = props
  const value = useMemo(() => ({ getRenderType }), [getRenderType])
  return <pagebuilerContext.Provider value={value}>{children}</pagebuilerContext.Provider>
}

export function usePagebuilderContext() {
  return React.useContext(pagebuilerContext)
}
