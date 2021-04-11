import { MotionValue } from 'framer-motion'

export type SnapPoint = 'top' | 'bottom' | number

export const snapPointToValue = (snapPoint: SnapPoint, containerHeight: number) => {
  if (snapPoint === 'top') return 0
  if (snapPoint === 'bottom') return containerHeight + 100
  return Math.max(0, snapPoint > 0 ? containerHeight - snapPoint : -snapPoint)
}

export function nearestSnapPointIndex(
  y: number,
  snapPoints: SnapPoint[],
  height: MotionValue<number>,
) {
  const snapPointsPx = snapPoints.map((point) => snapPointToValue(point, height.get()))
  return snapPointsPx.indexOf(
    snapPoints.reduce<number>((prev, point) => {
      const pointValue = snapPointToValue(point, height.get())
      return Math.abs(pointValue - y) < Math.abs(prev - y) ? pointValue : prev
    }, Infinity),
  )
}
