import { Variants } from 'framer-motion'
import { useSheetContext } from './SheetContext'
import { snapPointToValue } from './snapPoint'

export default function useSnapPointVariants(): Variants {
  const { snapPoints, height } = useSheetContext()

  return Object.fromEntries(
    snapPoints.map((point, idx) => [
      `snapPoint${idx}`,
      () => ({
        y: snapPointToValue(point, height.get()),
      }),
    ]),
  )
}
