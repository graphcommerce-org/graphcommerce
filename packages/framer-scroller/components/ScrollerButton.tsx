import { useMotionValueValue } from '@graphcommerce/framer-utils'
import Fab, { FabProps } from '@mui/material/Fab'
import { styled, SxProps, Theme } from '@mui/material/styles'
import { m, useTransform } from 'framer-motion'
import React from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { SnapPositionDirection } from '../types'

const MotionDiv = styled(m.div)({})

export type ScrollerButtonProps = {
  direction: SnapPositionDirection
  layout?: boolean
  sxContainer?: SxProps<Theme>
} & FabProps

export const ScrollerButton = m(
  React.forwardRef<HTMLDivElement, ScrollerButtonProps>((props, ref) => {
    const { direction, sx = [], layout, className, sxContainer, ...buttonProps } = props

    const { getSnapPosition, scroll } = useScrollerContext()
    const scrollTo = useScrollTo()
    const handleClick = () => scrollTo(getSnapPosition(direction))

    const { xProgress, yProgress, xMax, yMax } = scroll

    const visibility = useMotionValueValue(
      useTransform<number, number>([xProgress, yProgress, xMax, yMax], ([x, y, xM, yM]) => {
        if (xM === 0 && yM === 0) return 0

        if (direction === 'left') return x < 0.01 ? 0 : 1
        if (direction === 'right') return x > 0.99 ? 0 : 1
        if (direction === 'up') return y < 0.1 ? 0 : 1
        if (direction === 'down') return y > 0.9 ? 0 : 1

        return 0
      }),
      (v) => v,
    )

    return (
      <MotionDiv ref={ref} layout={layout} sx={sxContainer} className={className}>
        <Fab
          type='button'
          size='small'
          {...buttonProps}
          onClick={handleClick}
          aria-label={direction}
          sx={[
            {
              display: { xs: 'none', md: 'flex' },
              transition: 'all 250ms',
              opacity: visibility,
              transform: `scale(${visibility})`,
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        />
      </MotionDiv>
    )
  }),
)

ScrollerButton.displayName = 'ScrollerButton'
