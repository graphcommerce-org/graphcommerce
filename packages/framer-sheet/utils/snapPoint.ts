import { MotionValue } from 'framer-motion'
import { SnapPoint, SheetVariant } from '../types'

export const snapPointToValue = (point: SnapPoint, contain: number, variant: SheetVariant) => {
  const inverse = ['left', 'top'].includes(variant)
  if (point === 'open') return 0

  if (!inverse) {
    if (point === 'closed') return contain + 100
    return Math.max(0, point > 0 ? contain - point : -point)
  }

  if (point === 'closed') return -contain - 100
  return Math.min(0, point < 0 ? point : -contain + point)
}

export function nearestSnapPointIndex(
  size: number,
  snapPoints: SnapPoint[],
  height: MotionValue<number>,
  variant: SheetVariant,
) {
  const snapPointsPx = snapPoints.map((point) => snapPointToValue(point, height.get(), variant))
  return snapPointsPx.indexOf(
    snapPoints.reduce<number>((prev, point) => {
      const pointValue = snapPointToValue(point, height.get(), variant)
      return Math.abs(pointValue - size) < Math.abs(prev - size) ? pointValue : prev
    }, Infinity),
  )
}
