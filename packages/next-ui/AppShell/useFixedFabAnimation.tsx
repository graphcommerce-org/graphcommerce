import { useMediaQuery, useTheme } from '@material-ui/core'
import { useMotionTemplate, useTransform, useViewportScroll } from 'framer-motion'

const hex2rgb = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${opacity})`
}

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
    [hex2rgb(theme.palette.background.default, 0), hex2rgb(theme.palette.background.paper, 1)],
  )
  const boxShadow = useMotionTemplate`0 2px 10px 0 rgba(0, 0, 0, ${opacity})`
  const backgroundColor = useMotionTemplate`${opacity1}`
  return { boxShadow, backgroundColor, opacity }
}
