import { MotionConfig, useMotionValue } from 'framer-motion'
import React, { useMemo } from 'react'
import { isElement } from 'react-is'
import {
  NavigationNode,
  NavigationContextType,
  NavigationContext,
  UseNavigationSelection,
  NavigationNodeType,
  NavigationNodeComponent,
} from '../hooks/useNavigation'

export type NavigationProviderProps = {
  items: (NavigationNode | React.ReactElement)[]
  hideRootOnNavigate?: boolean
  closeAfterNavigate?: boolean
  children?: React.ReactNode
  animationDuration?: number
  selection: UseNavigationSelection
  serverRenderDepth?: number
}

const nonNullable = <T,>(value: T): value is NonNullable<T> => value !== null && value !== undefined

export const NavigationProvider = React.memo<NavigationProviderProps>((props) => {
  const {
    items,
    hideRootOnNavigate = true,
    closeAfterNavigate = false,
    animationDuration = 0.225,
    children,
    selection,
    serverRenderDepth = 2,
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
        .map((item, index) =>
          isElement(item)
            ? ({
                type: NavigationNodeType.COMPONENT,
                id: item.key ?? index,
                component: item,
              } as NavigationNodeComponent)
            : item,
        )
        .filter(nonNullable),
      serverRenderDepth,
      animationDuration,
    }),
    [
      hideRootOnNavigate,
      selection,
      animating,
      closing,
      items,
      serverRenderDepth,
      animationDuration,
    ],
  )

  return (
    <MotionConfig transition={{ duration: animationDuration }}>
      <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
    </MotionConfig>
  )
})
