import { Variants } from 'framer-motion'
import { snapPointToValue } from '../utils/snapPoint'
import { useSheetContext } from './useSheetContext'

export default function useSnapPointVariants(): Variants {
  const { snapPoints, size, variant } = useSheetContext()
  const axis = ['top', 'bottom'].includes(variant) ? 'y' : 'x'

  return Object.fromEntries(
    snapPoints.map((point, idx) => [
      `snapPoint${idx}`,
      () => ({
        [axis]: snapPointToValue(point, size.get(), variant),
      }),
    ]),
  )
}
