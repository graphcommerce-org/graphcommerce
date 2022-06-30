import { createContext, useContext } from 'react'

export type NavigationId = string | number
export type NavigationPath = NavigationId[]
export type NavigationSelect = (path: NavigationPath) => void
export type NavigationRender = React.FC<
  Omit<NavigationNode, 'childItems'> & { children?: React.ReactNode; hasChildren: boolean }
>

export type NavigationContextType = {
  path: NavigationPath
  select: NavigationSelect
  Render: NavigationRender
  items: NavigationNode[]
  hideRootOnNavigate: boolean
}

export type NavigationNode = {
  id: NavigationId
  name?: string
  href?: string
  component?: React.ReactNode
  childItems?: NavigationNode[]
  childItemsCount?: number
  onItemClick?: () => void
}

export const NavigationContext = createContext(undefined as unknown as NavigationContextType)

export function useNavigation() {
  return useContext(NavigationContext)
}
