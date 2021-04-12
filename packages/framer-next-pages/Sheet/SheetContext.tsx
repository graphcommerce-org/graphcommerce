import { AnimationControls, MotionValue, useAnimation, useMotionValue } from 'framer-motion'
import React, { useContext, useRef } from 'react'

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
}

const sheetContext = React.createContext((undefined as unknown) as SheetContextType)
sheetContext.displayName = 'sheetContext'

export function useSheetContext() {
  return useContext(sheetContext)
}

type SheetContextProps = {
  children: React.ReactNode
  variant: SheetVariant
  snapPoints?: SnapPoint[]
}

export default function SheetContext(props: SheetContextProps) {
  const { children, variant, snapPoints = ['open', 'closed'] } = props

  const size = useMotionValue<number>(0)
  const maxSize = useMotionValue<number>(0)
  const drag = useMotionValue<number>(0)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <sheetContext.Provider
      value={{ variant, drag, size, maxSize, controls, snapPoints, containerRef }}
    >
      {children}
    </sheetContext.Provider>
  )
}
