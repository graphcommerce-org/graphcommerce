import { createContext, useContext } from 'react'

export type NavigationId = string | number
export type NavigationPath = NavigationId[]
export type NavigationSelect = (path: NavigationPath) => void
export type NavigationRender = React.FC<
  (NavigationNodeComponent | NavigationNodeHref) & { children?: React.ReactNode }
>

export type NavigationContextType = {
  path: NavigationPath
  select: NavigationSelect
  items: NavigationNode[]
  hideRootOnNavigate: boolean
}

type NavigationNodeBase = {
  id: NavigationId
}

export type NavigationNodeHref = NavigationNodeBase & {
  name: string
  href: string
}

export type NavigationNodeButton = NavigationNodeBase & {
  name: string
  childItems: NavigationNode[]
}

export type NavigationNodeComponent = NavigationNodeBase & {
  component: React.ReactNode
}

export type NavigationNode = NavigationNodeHref | NavigationNodeButton | NavigationNodeComponent

export function isNavigationHref(node: NavigationNodeBase): node is NavigationNodeHref {
  return 'href' in node
}

export function isNavigationButton(node: NavigationNodeBase): node is NavigationNodeButton {
  return (node as NavigationNodeButton).childItems?.length > 0
}

export function isNavigationComponent(node: NavigationNodeBase): node is NavigationNodeComponent {
  return 'component' in node
}

export const NavigationContext = createContext(undefined as unknown as NavigationContextType)

export function useNavigation() {
  return useContext(NavigationContext)
}
