import { useTransform } from 'framer-motion'
import { useSheetContext } from './SheetContext'
import { snapPointPx } from './useSnapPoint'
import windowSize from './windowSize'

export default function useSnapPointTop() {
  const { snapPoints } = useSheetContext()
  return useTransform(windowSize.height, (height) =>
    snapPoints.reduce((prev, curr) => {
      const point = snapPointPx(curr, height)
      return point < prev ? point : prev
    }, Infinity),
  )
}
