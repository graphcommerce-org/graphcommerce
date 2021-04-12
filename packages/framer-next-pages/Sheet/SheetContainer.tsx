import React, { CSSProperties, useCallback, useRef } from 'react'
import { SheetVariant, useSheetContext } from './SheetContext'
import useIsomorphicLayoutEffect from './hooks/useIsomorphicLayoutEffect'
import windowSize from './utils/windowSize'

type Props = JSX.IntrinsicElements['div'] & { children: React.ReactNode }

const styles: Record<'root' | `${SheetVariant}`, CSSProperties> = {
  root: {
    position: 'absolute',
    maxWidth: '100%',
    boxSizing: 'border-box',
    maxHeight: '100%',
    display: 'flex',
  },
  top: {
    width: '100%',
    left: 0,
    top: 0,
    paddingBottom: 24,
    flexDirection: 'column-reverse',
  },
  bottom: {
    width: '100%',
    left: 0,
    bottom: 0,
    paddingTop: 24,
    flexDirection: 'column',
  },
  left: {
    height: '100%',
    top: 0,
    left: 0,
    paddingRight: 24,
    flexDirection: 'row-reverse',
  },
  right: {
    height: '100%',
    top: 0,
    right: 0,
    paddingLeft: 24,
    flexDirection: 'row',
  },
}

/**
 * SheetContainer is responsible for the layout constraints of the Sheet. Default: the
 * SheetContainer doesn't have a fixed height, but only a max-height.
 */
export default function SheetContainer(props: Props) {
  const { children, style } = props

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
    <div {...props} ref={containerRef} style={{ ...styles.root, ...styles[variant], ...style }}>
      {children}
    </div>
  )
}
