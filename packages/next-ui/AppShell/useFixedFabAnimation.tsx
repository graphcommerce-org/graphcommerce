import { alpha, useTheme } from '@material-ui/core'
import { useMotionTemplate, useTransform, useViewportScroll } from 'framer-motion'

export default function useFixedFabAnimation() {
  const theme = useTheme()
  const { scrollY } = useViewportScroll()
  const opacity = useTransform(scrollY, [50, 60], [0, 1])
  const opacity1 = useTransform(
    scrollY,
    [0, 10],
    [alpha(theme.palette.background.paper, 0), alpha(theme.palette.background.paper, 1)],
  )
  const backgroundColor = useMotionTemplate`${opacity1}`
  return { backgroundColor, opacity }
}
