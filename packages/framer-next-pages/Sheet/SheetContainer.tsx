import React, { CSSProperties, useEffect, useRef } from 'react'
import { useSheetContext } from './SheetContext'

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
  const { height } = useSheetContext()

  useEffect(() => {
    if (!containerRef.current) return undefined
    const ro = new ResizeObserver(([entry]) => height.set(entry.contentRect.height))
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [height])

  return (
    <div {...props} ref={containerRef} style={{ ...sheetContainerStyles, ...style }}>
      {children}
    </div>
  )
}
