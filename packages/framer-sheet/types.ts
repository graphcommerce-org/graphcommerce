import { MotionValue, AnimationControls } from 'framer-motion'
import { CSSProperties } from 'react'
import { LiteralUnion } from 'type-fest'

export type SheetVariant = 'top' | 'bottom' | 'left' | 'right'
export type SheetSize = LiteralUnion<
  'min' | 'max',
  CSSProperties['height'] | CSSProperties['width']
>
export type SnapPoint = LiteralUnion<'open' | 'closed', number>

export type SheetContext = {
  variant: SheetVariant

  variantSize: SheetSize

  /** `y`/ `x`-position of the Sheet */
  drag: MotionValue<number>
  /** `height`/ `width` of the SheetContainer */
  size: MotionValue<number>
  /** `maxHeight`/ `maxWidth` determined by the SheetContainer */
  maxSize: MotionValue<number>

  containerRef: React.RefObject<HTMLDivElement>

  contentRef: React.MutableRefObject<HTMLDivElement | undefined> | undefined
  contentRefCallback: React.RefCallback<HTMLDivElement>

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

  onSnap?: (snapPoint: SnapPoint, index: number) => void
  onSnapEnd?: (snapPoint: SnapPoint, index: number) => void
}
