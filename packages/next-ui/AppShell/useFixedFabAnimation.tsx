import { alpha, useMediaQuery, useTheme } from '@material-ui/core'
import { useMotionTemplate, useTransform, useViewportScroll } from 'framer-motion'

export default function useFixedFabAnimation() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { scrollY } = useViewportScroll()
  const scrollTo = isMobile ? 0 : 60
  const scrollToBg = isMobile ? 0 : 10
  const opacity = useTransform(scrollY, [50, scrollTo], [0, 0.08])
  const opacity1 = useTransform(
    scrollY,
    [0, scrollToBg],
    [alpha(theme.palette.background.paper, 0), alpha(theme.palette.background.paper, 1)],
  )
  const boxShadow = useMotionTemplate`0 2px 10px 0 rgba(0, 0, 0, ${opacity})`
  const backgroundColor = useMotionTemplate`${opacity1}`
  return { boxShadow, backgroundColor, opacity }
}
