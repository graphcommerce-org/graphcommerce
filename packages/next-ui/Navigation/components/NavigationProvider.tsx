import { useEventCallback } from '@mui/material'
import { MotionConfig } from 'framer-motion'
import React, { useMemo, useRef, useEffect } from 'react'
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
  onChange?: UseNavigationSelection['set']
  onClose?: NavigationContextType['onClose']
}

const nonNullable = <T,>(value: T): value is NonNullable<T> => value !== null && value !== undefined

export const NavigationProvider = React.memo<NavigationProviderProps>((props) => {
  const {
    items,
    onChange,
    hideRootOnNavigate = true,
    closeAfterNavigate = false,
    animationDuration = 0.275,
    children,
    onClose: _onClose,
    selection,
  } = props

  const animating = useRef(false)

  useEffect(() => selection.onChange((v) => onChange?.(v)), [onChange, selection])

  const onClose: NavigationContextType['onClose'] = useEventCallback((e, href) => {
    _onClose?.(e, href)
    setTimeout(() => selection.set(false), animationDuration * 1000)
  })

  const value = useMemo<NavigationContextType>(
    () => ({
      hideRootOnNavigate,
      selection,
      animating,
      items: items
        .map((item, index) => (isElement(item) ? { id: item.key ?? index, component: item } : item))
        .filter(nonNullable),
      onClose,
    }),
    [hideRootOnNavigate, selection, items, onClose],
  )

  return (
    <MotionConfig transition={{ duration: animationDuration }}>
      <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
    </MotionConfig>
  )
})
