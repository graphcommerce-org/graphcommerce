import { alpha, useTheme } from '@material-ui/core'
import { useTransform } from 'framer-motion'
import { useScrollY } from '../Layout/hooks/useScrollY'

export function useFixedFabAnimation() {
  const theme = useTheme()
  const scrollY = useScrollY()
  const opacity = useTransform(scrollY, [50, 60], [0, 1])
  const backgroundColor = useTransform(
    scrollY,
    [0, 10],
    [alpha(theme.palette.background.paper, 0), alpha(theme.palette.background.paper, 1)],
  )
  return { backgroundColor, opacity }
}
