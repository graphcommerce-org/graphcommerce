import { useMediaQuery, useTheme } from '@material-ui/core'
import { useMotionTemplate, useTransform } from 'framer-motion'
import { useScrollY } from '../Layout/hooks/useScrollY'

export function useFabAnimation() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const scrollY = useScrollY()
  const scrollTo = isMobile ? 0 : 130

  const scale = useTransform(scrollY, [50, scrollTo], [0.4, 1])
  const opacity = useTransform(scrollY, [50, scrollTo], [0, 1])
  const opacity1 = useTransform(scrollY, [0, scrollTo], [0, 0.08])
  const opacity2 = useTransform(scrollY, [0, scrollTo], [0, 0.1])
  const filter = useMotionTemplate`
    drop-shadow(0 1px 4px rgba(0,0,0,${opacity1}))
    drop-shadow(0 4px 10px rgba(0,0,0,${opacity2}))`

  return { filter, opacity, scale }
}
