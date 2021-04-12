import { AnimationControls, MotionValue, useAnimation, useMotionValue } from 'framer-motion'
import React, { useCallback, useContext, useEffect, useRef } from 'react'

export type SheetVariant = 'top' | 'bottom' | 'left' | 'right'
export type SnapPoint = 'open' | 'closed' | number

type SheetContextType = {
  variant: SheetVariant
  /** `y`/ `x`-position of the Sheet */
  drag: MotionValue<number>
  /** `height`/ `width` of the SheetContainer */
  size: MotionValue<number>
  /** `maxHeight`/ `maxWidth` determined by the SheetContainer */
  maxSize: MotionValue<number>

  containerRef: React.RefObject<HTMLDivElement>

  /**
   * Animate to a snapPoint:
   *
   * ```ts
   * const snapPointIndex = 0
   * controls.start('snapPoint${snapPointIndex}')
   * ```
   */
  controls: AnimationControls

  /**
   * First entry is the opening position
   *
   * Default: `['top', 'bottom']` (only the most top position allowed)
   *
   * - `top`: the top most position
   * - `bottom`: the most bottom position
   * - Positive integer: pixels measured from the most bottom position of the sheet.
   * - Negative integer: pixels measured form the most top position of the sheet.
   */
  snapPoints: SnapPoint[]
  /** @private */
  onSnap?: (snapPoint: SnapPoint, index: number) => void
}

const sheetContext = React.createContext((undefined as unknown) as SheetContextType)
sheetContext.displayName = 'sheetContext'

export function useSheetContext() {
  return useContext(sheetContext)
}

type SheetContextProps = {
  children: React.ReactNode
  /**
   * Open/close the panel
   *
   * ```ts
   * ;<SheetContext open={true | false} />
   * ```
   */
  open: boolean
} & Pick<SheetContextType, 'snapPoints' | 'variant' | 'onSnap'>

export default function SheetContext(props: SheetContextProps) {
  const { children, snapPoints = ['open', 'closed'], open, variant, onSnap } = props

  const context: SheetContextType = {
    drag: useMotionValue<number>(0),
    size: useMotionValue<number>(0),
    maxSize: useMotionValue<number>(0),
    controls: useAnimation(),
    containerRef: useRef<HTMLDivElement>(null),
    snapPoints,
    variant,
    onSnap,
  }

  const last = snapPoints.length - 1

  // Open/close the panel when the size is calculated
  useEffect(() => {
    let cancel: () => void
    const init = (v: number) => {
      if (v === 0) return
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      context.controls.start(open ? `snapPoint0` : `snapPoint${last}`)
      cancel()
    }
    cancel = context.size.onChange(init)
    init(context.size.get())
    return cancel
  }, [open, last, context.size, context.controls])

  return <sheetContext.Provider value={context}>{children}</sheetContext.Provider>
}
