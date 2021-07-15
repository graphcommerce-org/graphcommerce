import { useMediaQuery, useTheme } from '@material-ui/core'
import { useTransform, useViewportScroll } from 'framer-motion'

export default function useFixedFabAnimation() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { scrollY } = useViewportScroll()
  const scrollTo = isMobile ? 0 : 60

  // todo: 14 = element offset
  // from element offset, to fixed padding of 8
  const translateY = useTransform(scrollY, [0, scrollTo], [30, 8])

  return { translateY }
}
