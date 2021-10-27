import { useMediaQuery, useTheme } from '@material-ui/core'
import { useMotionTemplate, useTransform, useViewportScroll } from 'framer-motion'

export default function useFixedFabAnimation() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { scrollY } = useViewportScroll()
  const scrollTo = isMobile ? 0 : 60
  const opacity = useTransform(scrollY, [50, scrollTo], [0, 1])
  const opacity1 = useTransform(scrollY, [0, scrollTo], [0, 0.08])
  const boxShadow = useMotionTemplate`
    0 2px 10px 0 rgba(0, 0, 0, ${opacity1})
    `

  return { boxShadow, opacity }
}
