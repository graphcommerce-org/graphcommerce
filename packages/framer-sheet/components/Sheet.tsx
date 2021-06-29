import { useAnimation, useMotionValue } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import sheetContext from '../context/sheetContext'
import { SheetContext, SheetSize } from '../types'

export type SheetProps = {
  children: React.ReactNode
  /**
   * Open/close the panel
   *
   * ```ts
   * ;<SheetContext open={true | false} />
   * ```
   */
  open: boolean

  /** Size of the sheet can be min or max or a css value */
  size?: SheetSize
} & Pick<SheetContext, 'variant' | 'onSnap' | 'onSnapEnd'> &
  Partial<Pick<SheetContext, 'snapPoints'>>

export default function Sheet(props: SheetProps) {
  const { children, snapPoints = ['open', 'closed'], open, size = 'min', ...contextProps } = props

  const contentRefInternal = useRef<HTMLDivElement>()
  const [contentRef, setContentRef] = useState<React.MutableRefObject<HTMLDivElement | undefined>>()

  const contentRefCallback: React.RefCallback<HTMLDivElement> = (node) => {
    contentRefInternal.current = node ?? undefined
    setContentRef(contentRefInternal)
  }

  const context: SheetContext = {
    drag: useMotionValue<number>(0),
    size: useMotionValue<number>(0),
    maxSize: useMotionValue<number>(0),
    controls: useAnimation(),
    containerRef: useRef<HTMLDivElement>(null),
    contentRef,
    contentRefCallback,
    variantSize: size,
    snapPoints,
    ...contextProps,
  }

  const last = snapPoints.length - 1

  // Open/close the panel when the size is calculated
  useEffect(() => {
    let cancel: () => void
    const init = (v: number) => {
      if (v === 0) return
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      if (open) context.controls.start(`snapPoint0`)
      cancel()
    }
    cancel = context.size.onChange(init)
    init(context.size.get())
    return cancel
  }, [open, last, context.size, context.controls])

  return <sheetContext.Provider value={context}>{children}</sheetContext.Provider>
}
