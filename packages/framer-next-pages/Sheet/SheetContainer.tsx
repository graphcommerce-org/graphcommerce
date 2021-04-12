import React, { CSSProperties, useCallback } from 'react'
import { SheetVariant, useSheetContext } from './SheetContext'
import useIsomorphicLayoutEffect from './hooks/useIsomorphicLayoutEffect'
import windowSize from './utils/windowSize'

export type SheetContainerClassKeys = 'container' | `container${SheetVariant}`

type SheetContainerProps = {
  children: React.ReactNode
  styles?: Record<SheetContainerClassKeys, CSSProperties>
  classes?: Record<SheetContainerClassKeys, string>
}

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
    return () => ro.disconnect()
  }, [calcMaxSize, containerRef, length, size])

  useIsomorphicLayoutEffect(() => windowSize[axis].attach(calcMaxSize), [axis, calcMaxSize])

  return (
    <div
      {...props}
      ref={containerRef}
      style={{ ...styles?.container, ...styles?.[`container${variant}`] }}
      className={`${classes?.container} ${classes?.[`container${variant}`]}`}
    >
      {children}
    </div>
  )
}
