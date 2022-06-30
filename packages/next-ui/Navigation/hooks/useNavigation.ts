import { createContext, useContext } from 'react'

export type NavigationId = string | number
export type NavigationPath = NavigationId[]
export type NavigationSelect = (path: NavigationPath) => void
export type NavigationRender = React.FC<
  (NavigationComponent | NavigationHref) & { children?: React.ReactNode }
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

type NavigationHref = NavigationNodeBase & {
  name: string
  href: string
}

type NavigationButton = NavigationNodeBase & {
  name: string
  childItems: NavigationNode[]
}

type NavigationComponent = NavigationNodeBase & {
  component: React.ReactNode
}

export type NavigationNode = NavigationHref | NavigationButton | NavigationComponent

export function isNavigationHref(node: NavigationNodeBase): node is NavigationHref {
  return 'href' in node
}

export function isNavigationButton(node: NavigationNodeBase): node is NavigationButton {
  return (node as NavigationButton).childItems?.length > 0
}

export function isNavigationComponent(node: NavigationNodeBase): node is NavigationComponent {
  return 'component' in node
}

export const NavigationContext = createContext(undefined as unknown as NavigationContextType)

export function useNavigation() {
  return useContext(NavigationContext)
}
