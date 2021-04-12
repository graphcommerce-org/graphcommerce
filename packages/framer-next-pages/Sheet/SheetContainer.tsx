import React, { CSSProperties, useCallback, useRef } from 'react'
import { useSheetContext } from './SheetContext'
import { useIsomorphicLayoutEffect } from './utils'
import windowSize from './windowSize'

type Props = JSX.IntrinsicElements['div'] & { children: React.ReactNode }

const sheetContainerStyles: CSSProperties = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  boxSizing: 'border-box',
  maxHeight: '100%',
  paddingTop: `24px`,
}

/**
 * SheetContainer is responsible for the layout constraints of the Sheet. Default: the
 * SheetContainer doesn't have a fixed height, but only a max-height.
 */
export default function SheetContainer(props: Props) {
  const { children, style } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const { height, maxHeight } = useSheetContext()

  const calcMaxHeight = useCallback(() => {
    const el = containerRef.current
    if (!el) return

    const parentHeight = el.parentElement?.getBoundingClientRect().height ?? 0
    const offset = el.getBoundingClientRect().height - height.get()
    maxHeight.set(parentHeight - offset)
  }, [height, maxHeight])

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return undefined
    const ro = new ResizeObserver(([entry]) => {
      height.set(entry.contentRect.height)
      calcMaxHeight()
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [calcMaxHeight, height])

  useIsomorphicLayoutEffect(() => windowSize.height.attach(calcMaxHeight), [calcMaxHeight])

  return (
    <div {...props} ref={containerRef} style={{ ...sheetContainerStyles, ...style }}>
      {children}
    </div>
  )
}
