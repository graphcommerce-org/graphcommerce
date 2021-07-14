import { useMediaQuery, useTheme } from '@material-ui/core'
import { useTransform, useViewportScroll } from 'framer-motion'

export default function useDesktopNavActionsAnimation() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { scrollY } = useViewportScroll()
  const scrollTo = isMobile ? 0 : 60

  const translateY = useTransform(scrollY, [0, scrollTo], [14, 8])

  return { translateY }
}
