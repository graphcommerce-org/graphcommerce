import { MotionValue, useMotionValue } from 'framer-motion'
import { createContext, MutableRefObject, useContext } from 'react'

export type NavigationId = string | number
export type NavigationPath = NavigationId[]
export type NavigationRender = React.FC<
  (NavigationNodeComponent | NavigationNodeHref) & { children?: React.ReactNode }
>

export type UseNavigationSelection = MotionValue<NavigationPath | false>

export type NavigationOnClose = (
  event?: React.MouseEvent<HTMLAnchorElement>,
  href?: string | undefined,
) => void
export type NavigationContextType = {
  selection: UseNavigationSelection
  items: NavigationNode[]
  hideRootOnNavigate: boolean
  animating: MotionValue<boolean>
  closing: MotionValue<boolean>
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

/**
 * To prevent excessive rerenders we're not using plain React useState, but we're using a reactive
 * motion value (could easily be any other reactive variable like Zustand, MobX, etc).
 *
 * Usage:
 *
 * ```tsx
 * const selection = useNavigationSelection()
 *
 * function onClose() {
 *   selection.set(false)
 * }
 *
 * function openRoot() {
 *   selection.set([])
 * }
 *
 * function openPath() {
 *   selection.set(['my-path'])
 * }
 * ```
 */
export function useNavigationSelection(): UseNavigationSelection {
  return useMotionValue<NavigationPath | false>(false)
}
