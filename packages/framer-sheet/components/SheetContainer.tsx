import { useIsomorphicLayoutEffect, Styled, clientSize } from '@graphcommerce/framer-utils'
import clsx from 'clsx'
import React, { useCallback } from 'react'
import { useSheetContext } from '../hooks/useSheetContext'
import { SheetVariant } from '../types'
import variantSizeCss from '../utils/variantSizeCss'

export type SheetContainerClassKeys = 'container' | `container${SheetVariant}`

export type SheetContainerProps = { children: React.ReactNode } & Styled<SheetContainerClassKeys>

/**
 * SheetContainer is responsible for the layout constraints of the Sheet. Default: the
 * SheetContainer doesn't have a fixed height, but only a max-height.
 */
export default function SheetContainer(props: SheetContainerProps) {
  const { children, styles, classes } = props
  const { variant, variantSize, size, maxSize, containerRef } = useSheetContext()

  const dimension = ['top', 'bottom'].includes(variant) ? 'height' : 'width'
  const axis = ['top', 'bottom'].includes(variant) ? 'y' : 'x'

  const calcMaxSize = useCallback(() => {
    const el = containerRef.current
    if (!el) return

    const parentSize = el.parentElement?.getBoundingClientRect()[dimension] ?? 0
    const offset = el.getBoundingClientRect()[dimension] - size.get()
    maxSize.set(parentSize - offset)
  }, [containerRef, dimension, size, maxSize])

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return undefined
    const ro = new ResizeObserver(([entry]) => {
      size.set(entry.contentRect[dimension])
      calcMaxSize()
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [calcMaxSize, containerRef, dimension, size])

  useIsomorphicLayoutEffect(() => clientSize[axis].onChange(calcMaxSize), [axis, calcMaxSize])

  return (
    <div
      ref={containerRef}
      className={clsx(classes?.container, classes?.[`container${variant}`])}
      style={{
        ...styles?.container,
        ...styles?.[`container${variant}`],
        [dimension]: variantSizeCss(variantSize),
      }}
    >
      {children}
    </div>
  )
}
