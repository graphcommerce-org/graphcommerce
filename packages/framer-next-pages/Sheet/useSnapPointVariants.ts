import { Variants } from 'framer-motion'
import { useSheetContext } from './SheetContext'
import { snapPointPx } from './useSnapPoint'

export default function useSnapPointVariants(): Variants {
  const { snapPoints, height } = useSheetContext()

  return Object.fromEntries(
    snapPoints.map((point, idx) => [
      `snapPoint${idx}`,
      () => ({
        y: snapPointPx(point, height.get()),
      }),
    ]),
  )
}
