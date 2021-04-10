import { useTransform } from 'framer-motion'
import windowSize from './windowSize'

export const snapPointPx = (snapPoint: SnapPoint, windowHeight: number) =>
  snapPoint > 0 ? windowHeight - snapPoint : -snapPoint

export type SnapPoint = number

export function useSnapPoint(snapPoint: SnapPoint) {
  return useTransform(windowSize.height, (height) => snapPointPx(snapPoint, height))
}

export function nearest(y: number, snapPoints: number[]) {
  return snapPoints.reduce<number>((prevPointPx, currPoint) => {
    const pointPx = snapPointPx(currPoint, windowSize.height.get())
    return Math.abs(pointPx - y) < Math.abs(prevPointPx - y) ? pointPx : prevPointPx
  }, Infinity)
}

export function nearestIndex(y: number, snapPoints: number[]) {
  const snapPointsPx = snapPoints.map((point) => snapPointPx(point, windowSize.height.get()))
  return snapPointsPx.indexOf(nearest(y, snapPoints))
}
