import {
  AnimationControls,
  MotionValue,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import React, { useContext } from 'react'
import { SnapPoint, snapPointToValue } from './snapPoint'

type SheetContextType = {
  /** `y-position` of the SheetPanel */
  y: MotionValue<number>
  /** `height` of the SheetContainer */
  height: MotionValue<number>
  /** `maxHeight` determined by the SheetContainer */
  maxHeight: MotionValue<number>

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

type SheetContextProps = { children?: React.ReactNode; snapPoints?: SnapPoint[] }

export default function SheetContext(props: SheetContextProps) {
  const { children, snapPoints = ['top', 'bottom'] } = props

  const height = useMotionValue<number>(0)
  const maxHeight = useMotionValue<number>(0)
  const yInitial = useTransform(height, (h) => snapPointToValue(snapPoints[0], h))

  const context = {
    y: useMotionValue<number>(yInitial.get()),
    height,
    maxHeight,
    controls: useAnimation(),
    snapPoints,
  }

  return <sheetContext.Provider value={context}>{children}</sheetContext.Provider>
}
