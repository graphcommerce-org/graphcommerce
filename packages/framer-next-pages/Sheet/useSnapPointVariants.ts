import { Variants } from 'framer-motion'
import { useSheetContext } from './SheetContext'
import { snapPointPx } from './useSnapPoint'
import windowSize from './windowSize'

export default function useSnapPointVariants(): Variants {
  const { snapPoints } = useSheetContext()

  return Object.fromEntries(
    snapPoints.map((point, idx) => [
      `snapPoint${idx}`,
      () => ({
        y: snapPointPx(point, windowSize.height.get()),
      }),
    ]),
  )
}
