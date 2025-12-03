import { sxx } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { styled } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import { useScrollY } from '../../Layout'

const MotionDiv = styled(m.div)({})

export function OverlayStickyBottom(props: {
  children: React.ReactNode
  sx?: SxProps<Theme>
  className?: string
}) {
  const { sx = [], ...divProps } = props
  const scrollY = useScrollY()
  const bottom = useTransform(scrollY, (offset) => Math.max(-200, offset > 0 ? 0 : offset))

  return (
    <MotionDiv sx={sxx({ position: 'sticky', zIndex: 1 }, sx)} style={{ bottom }} {...divProps} />
  )
}
