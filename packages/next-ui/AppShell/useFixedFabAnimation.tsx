import { useMediaQuery, useTheme } from '@mui/material'
import { useMotionTemplate, useTransform, useViewportScroll } from 'framer-motion'

export default function useFixedFabAnimation() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { scrollY } = useViewportScroll()
  const scrollTo = isMobile ? 0 : 60

  const opacity = useTransform(scrollY, [50, scrollTo], [0, 1])
  const opacity1 = useTransform(scrollY, [0, scrollTo], [0, 0.08])
  const opacity2 = useTransform(scrollY, [0, scrollTo], [0, 0.1])
  const filter = useMotionTemplate`
    drop-shadow(0 1px 4px rgba(0,0,0,${opacity1}))
    drop-shadow(0 4px 10px rgba(0,0,0,${opacity2}))`

  return { filter, opacity }
}
