import { useTransform } from 'framer-motion'
import { useScrollY } from '../Layout/hooks/useScrollY'

export function useFabAnimation() {
  const scrollY = useScrollY()

  const scale = useTransform(scrollY, [50, 130], [0.4, 1])
  const opacity = useTransform(scrollY, [50, 130], [0, 1])
  const shadowOpacity = useTransform(scrollY, [131, 140], [0, 1])
  return { opacity, scale, shadowOpacity }
}
