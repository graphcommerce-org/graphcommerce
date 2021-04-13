import clsx from 'clsx'
import React, { useCallback } from 'react'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import useSheetContext from '../hooks/useSheetContext'
import { SheetVariant } from '../types'
import { Styled } from '../utils/styled'
import windowSize from '../utils/windowSize'

export type SheetContainerClassKeys = 'container' | `container${SheetVariant}`

export type SheetContainerProps = { children: React.ReactNode } & Styled<SheetContainerClassKeys>

/**
 * SheetContainer is responsible for the layout constraints of the Sheet. Default: the
 * SheetContainer doesn't have a fixed height, but only a max-height.
 */
export default function SheetContainer(props: SheetContainerProps) {
  const { children, styles, classes } = props
  const { variant, size, maxSize, containerRef } = useSheetContext()

  const length = ['top', 'bottom'].includes(variant) ? 'height' : 'width'
  const axis = ['top', 'bottom'].includes(variant) ? 'y' : 'x'

  const calcMaxSize = useCallback(() => {
    const el = containerRef.current
    if (!el) return

    const parentSize = el.parentElement?.getBoundingClientRect()[length] ?? 0
    const offset = el.getBoundingClientRect()[length] - size.get()
    maxSize.set(parentSize - offset)
  }, [containerRef, length, size, maxSize])

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return undefined
    const ro = new ResizeObserver(([entry]) => {
      size.set(entry.contentRect[length])
      calcMaxSize()
    })
    ro.observe(containerRef.current)
    return ro.disconnect
  }, [calcMaxSize, containerRef, length, size])

  useIsomorphicLayoutEffect(() => windowSize[axis].attach(calcMaxSize), [axis, calcMaxSize])

  return (
    <div
      ref={containerRef}
      className={clsx(classes?.container, classes?.[`container${variant}`])}
      style={{ ...styles?.container, ...styles?.[`container${variant}`] }}
    >
      {children}
    </div>
  )
}
