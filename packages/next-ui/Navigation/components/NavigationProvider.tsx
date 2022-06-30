import { MotionConfig } from 'framer-motion'
import { useState, useMemo } from 'react'
import { isElement } from 'react-is'
import {
  NavigationNode,
  NavigationPath,
  NavigationContextType,
  NavigationContext,
  NavigationSelect,
} from '../hooks/useNavigation'

export type NavigationProviderProps = {
  items: (NavigationNode | React.ReactElement)[]
  onChange?: NavigationSelect
  hideRootOnNavigate?: boolean
  children?: React.ReactNode
}

const nonNullable = <T,>(value: T): value is NonNullable<T> => value !== null && value !== undefined

export function NavigationProvider(props: NavigationProviderProps) {
  const { items, onChange, hideRootOnNavigate = true, children } = props

  const [selected, setSelected] = useState<NavigationPath>([])
  const value = useMemo<NavigationContextType>(
    () => ({
      hideRootOnNavigate,
      selected,
      select: (incomming: NavigationPath) => {
        setSelected(incomming)
        onChange?.(incomming)
      },
      items: items
        .map((item, index) => (isElement(item) ? { id: item.key ?? index, component: item } : item))
        .filter(nonNullable),
    }),
    [hideRootOnNavigate, selected, items, onChange],
  )

  return (
    <MotionConfig transition={{ duration: 0.275 }}>
      <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
    </MotionConfig>
  )
}
