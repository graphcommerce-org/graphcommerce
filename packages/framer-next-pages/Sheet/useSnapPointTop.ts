import { useTransform } from 'framer-motion'
import { useSheetContext } from './SheetContext'
import { snapPointPx } from './useSnapPoint'

export default function useSnapPointTop() {
  const { snapPoints, height } = useSheetContext()
  return useTransform(height, (h) =>
    snapPoints.reduce((prev, curr) => {
      const point = snapPointPx(curr, g)
      return point < prev ? point : prev
    }, Infinity),
  )
}
