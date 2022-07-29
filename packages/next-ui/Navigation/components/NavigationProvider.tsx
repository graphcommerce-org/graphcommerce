import { useEventCallback } from '@mui/material'
import { MotionConfig } from 'framer-motion'
import { useState, useMemo, SetStateAction, useRef } from 'react'
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
  hideRootOnNavigate?: boolean
  closeAfterNavigate?: boolean
  children?: React.ReactNode
  animationDuration?: number
  selected: NavigationPath
  setSelected: (value: SetStateAction<NavigationPath>) => void
  onChange?: NavigationSelect
  onClose?: NavigationContextType['onClose']
}

const nonNullable = <T,>(value: T): value is NonNullable<T> => value !== null && value !== undefined

export function NavigationProvider(props: NavigationProviderProps) {
  const {
    items,
    onChange,
    hideRootOnNavigate = true,
    closeAfterNavigate = false,
    animationDuration = 0.275,
    children,
    onClose: onCloseUnstable,
    selected,
    setSelected,
  } = props

  const animating = useRef(false)

  const select = useEventCallback((incomming: NavigationPath) => {
    setSelected(incomming)
    onChange?.(incomming)
  })

  const onClose: NavigationContextType['onClose'] = useEventCallback((e, href) => {
    onCloseUnstable?.(e, href)
    setTimeout(() => select([]), animationDuration * 1000)
  })

  const value = useMemo<NavigationContextType>(
    () => ({
      hideRootOnNavigate,
      selected,
      select,
      animating,
      items: items
        .map((item, index) => (isElement(item) ? { id: item.key ?? index, component: item } : item))
        .filter(nonNullable),
      onClose,
    }),
    [hideRootOnNavigate, selected, select, items, onClose],
  )

  return (
    <MotionConfig transition={{ duration: animationDuration }}>
      <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
    </MotionConfig>
  )
}
