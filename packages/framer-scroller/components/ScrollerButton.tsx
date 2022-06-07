import { useElementScroll, useMotionValueValue } from '@graphcommerce/framer-utils'
import { Fab, FabProps } from '@mui/material'
import { m, useMotionTemplate, useSpring, useTransform } from 'framer-motion'
import React from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { SnapPositionDirection } from '../types'

export type ScrollerButtonProps = {
  direction: SnapPositionDirection
  layout?: boolean
} & FabProps

export const ScrollerButton = m(
  React.forwardRef<HTMLDivElement, ScrollerButtonProps>((props, ref) => {
    const { direction, sx = [], layout, ...buttonProps } = props

    const { getSnapPosition, scrollerRef } = useScrollerContext()
    const scrollTo = useScrollTo()
    const handleClick = () => scrollTo(getSnapPosition(direction))

    const { xProgress, yProgress, xMax, yMax } = useElementScroll(scrollerRef)

    const progress = useTransform<number, number>(
      [xProgress, yProgress, xMax, yMax],
      ([x, y, xM, yM]) => {
        if (xM === 0 && yM === 0) return 0

        switch (direction) {
          case 'left':
            return x < 0.1 ? 0 : 1
          case 'right':
            return x > 0.9 ? 0 : 1
          case 'up':
            return y < 0.1 ? 0 : 1
          case 'down':
            return y > 0.9 ? 0 : 1
          default:
            return 0
        }
      },
    )

    const scale = useMotionValueValue(progress, (v) => v)

    return (
      <m.div ref={ref} layout={layout}>
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
              opacity: scale,
              transform: `scale(${scale})`,
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        />
      </m.div>
    )
  }),
)

ScrollerButton.displayName = 'ScrollerButton'
