import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { MotionConfig, useMotionValue } from 'framer-motion'
import React, { useMemo } from 'react'
import { isElement } from 'react-is'
import { LazyHydrate } from '../../LazyHydrate'
import { nonNullable } from '../../RenderType/nonNullable'
import type {
  NavigationNode,
  NavigationContextType,
  UseNavigationSelection,
  NavigationNodeComponent,
} from '../hooks/useNavigation'
import { NavigationContext, NavigationNodeType } from '../hooks/useNavigation'

export type NavigationProviderBaseProps = {
  items: (NavigationNode | React.ReactElement)[]
  hideRootOnNavigate?: boolean
  /**
   * @deprecated No longer used
   */
  closeAfterNavigate?: boolean
  children?: React.ReactNode
  animationDuration?: number
  selection: UseNavigationSelection
  serverRenderDepth?: number
}

export type NavigationProviderProps = NavigationProviderBaseProps & { hold?: boolean }

const NavigationProviderBase = React.memo<NavigationProviderBaseProps>((props) => {
  const {
    items,
    hideRootOnNavigate = true,
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

export function NavigationProvider(props: NavigationProviderProps) {
  const { selection } = props
  const hydrateManually = useMotionValueValue(selection, (s) => s !== false)

  return (
    <LazyHydrate hydrated={hydrateManually}>
      <NavigationProviderBase {...props} />
    </LazyHydrate>
  )
}
