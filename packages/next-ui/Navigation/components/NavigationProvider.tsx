import { MotionConfig, useMotionValue } from 'framer-motion'
import React, { useMemo } from 'react'
import { isElement } from 'react-is'
import {
  NavigationNode,
  NavigationContextType,
  NavigationContext,
  UseNavigationSelection,
} from '../hooks/useNavigation'

export type NavigationProviderProps = {
  items: (NavigationNode | React.ReactElement)[]
  hideRootOnNavigate?: boolean
  closeAfterNavigate?: boolean
  children?: React.ReactNode
  animationDuration?: number
  selection: UseNavigationSelection
}

const nonNullable = <T,>(value: T): value is NonNullable<T> => value !== null && value !== undefined

export const NavigationProvider = React.memo<NavigationProviderProps>((props) => {
  const {
    items,
    hideRootOnNavigate = true,
    closeAfterNavigate = false,
    animationDuration = 0.2,
    children,
    selection,
  } = props

  const animating = useMotionValue(false)
  const closing = useMotionValue(false)

  const value = useMemo<NavigationContextType>(
    () => ({
      hideRootOnNavigate,
      selection,
      animating,
      closing,
      items: items
        .map((item, index) => (isElement(item) ? { id: item.key ?? index, component: item } : item))
        .filter(nonNullable),
    }),
    [hideRootOnNavigate, selection, animating, closing, items],
  )

  return (
    <MotionConfig transition={{ duration: animationDuration }}>
      <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
    </MotionConfig>
  )
})
