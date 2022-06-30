import { useState, useMemo } from 'react'
import { isElement } from 'react-is'
import {
  NavigationNode,
  NavigationRender,
  NavigationPath,
  NavigationContextType,
  NavigationContext,
} from '../hooks/useNavigation'

export type NavigationProviderProps = {
  items: (NavigationNode | React.ReactElement)[]
  renderItem: NavigationRender
  onChange?: (path: NavigationPath) => void
  hideRootOnNavigate?: boolean
  children?: React.ReactNode
}

const nonNullable = <T,>(value: T): value is NonNullable<T> => value !== null && value !== undefined

export function NavigationProvider(props: NavigationProviderProps) {
  const { items, renderItem, onChange, hideRootOnNavigate = true, children } = props

  const [path, select] = useState<NavigationPath>([])
  const value = useMemo<NavigationContextType>(
    () => ({
      hideRootOnNavigate,
      path,
      select: (incomming: NavigationPath) => {
        select(incomming)
        onChange?.(incomming)
      },
      items: items
        .map((item, index) => (isElement(item) ? { id: item.key ?? index, component: item } : item))
        .filter(nonNullable),
      Render: renderItem,
    }),
    [hideRootOnNavigate, path, renderItem, items, onChange],
  )

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}
