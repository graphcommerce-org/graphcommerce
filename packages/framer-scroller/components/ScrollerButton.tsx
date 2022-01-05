import { useElementScroll } from '@graphcommerce/framer-utils'
import { UseStyles } from '@graphcommerce/next-ui'
import { makeStyles, useMergedClasses } from '@graphcommerce/next-ui/Styles/tssReact'
import { Fab, FabProps } from '@mui/material'
import { m, useSpring, useTransform } from 'framer-motion'
import React from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { SnapPositionDirection } from '../types'

const useStyles = makeStyles()((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}))

export type ScrollerButtonProps = {
  direction: SnapPositionDirection
} & FabProps &
  UseStyles<typeof useStyles>

const ScrollerFab = m(
  React.forwardRef<HTMLDivElement, ScrollerButtonProps>((props, ref) => {
    const { direction, ...buttonProps } = props
    const classes = useMergedClasses(useStyles().classes, props.classes)

    const { getSnapPosition, scrollerRef } = useScrollerContext()
    const scrollTo = useScrollTo()
    const handleClick = () => scrollTo(getSnapPosition(direction))

    const { xProgress, yProgress, xMax, yMax } = useElementScroll(scrollerRef, 1)

    const progress = useTransform<number, number>(
      [xProgress, yProgress, xMax, yMax],
      ([x, y, xM, yM]) => {
        if (xM === 0 && yM === 0) return 0
        if (direction === 'right' || direction === 'down') return x * y === 1 ? 0 : 1
        return x * y === 0 ? 0 : 1
      },
    )
    const scale = useSpring(progress)

    return (
      <m.div ref={ref} style={{ scale, opacity: scale, willChange: 'scale, opacity', zIndex: 1 }}>
        <Fab
          type='button'
          {...buttonProps}
          onClick={handleClick}
          classes={{ ...classes, ...buttonProps.classes }}
          aria-label={direction}
          size='small'
        />
      </m.div>
    )
  }),
)
ScrollerFab.displayName = 'ScrollerFab'

export default ScrollerFab
