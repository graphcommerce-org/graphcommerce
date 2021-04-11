import React, { useEffect, useRef } from 'react'
import { useSheetContext } from './SheetContext'

/**
 * SheetContainer is responsible for the layout constraints of the Sheet.
 *
 * - The height of this container is used to calculate the snapPoints.
 */
export default function SheetContainer(props: { children: React.ReactNode }) {
  const { children } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const { height } = useSheetContext()

  useEffect(() => {
    if (!containerRef.current) return undefined
    const ro = new ResizeObserver(([entry]) => height.set(entry.contentRect.height))
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [height])

  return (
    <div ref={containerRef} style={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}>
      {children}
    </div>
  )
}
