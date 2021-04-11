import { MotionValue, useTransform } from 'framer-motion'

export const snapPointPx = (snapPoint: SnapPoint, windowHeight: number) =>
  Math.max(0, snapPoint > 0 ? windowHeight - snapPoint : -snapPoint)

export type SnapPoint = number

export function useSnapPoint(snapPoint: SnapPoint, height: MotionValue<height>) {
  return useTransform(height, (h) => snapPointPx(snapPoint, h))
}

export function nearest(y: number, snapPoints: number[], height: MotionValue<number>) {
  return snapPoints.reduce<number>((prevPointPx, currPoint) => {
    const pointPx = snapPointPx(currPoint, height.get())
    return Math.abs(pointPx - y) < Math.abs(prevPointPx - y) ? pointPx : prevPointPx
  }, Infinity)
}

export function nearestIndex(y: number, snapPoints: number[], height: MotionValue<number>) {
  const snapPointsPx = snapPoints.map((point) => snapPointPx(point, height.get()))
  return snapPointsPx.indexOf(nearest(y, snapPoints, height))
}
