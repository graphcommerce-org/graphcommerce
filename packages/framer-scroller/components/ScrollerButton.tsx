import { UseStyles } from '@graphcommerce/next-ui'
import { makeStyles, useMergedClasses } from '@graphcommerce/next-ui/Styles/tssReact'
import { Fab, FabProps } from '@mui/material'
import { m, useMotionValue, useSpring } from 'framer-motion'
import React from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { useWatchItems } from '../hooks/useWatchItems'
import { SnapPositionDirection } from '../types'

const useStyles = makeStyles()((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
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

    const end = direction === 'right' || direction === 'down'

    const { getSnapPosition } = useScrollerContext()
    const scrollTo = useScrollTo()
    const handleClick = () => scrollTo(getSnapPosition(direction))

    const visibility = useMotionValue(0)

    useWatchItems((_, itemArr) => {
      const itemVisbility = end
        ? itemArr[itemArr.length - 1].visibility.get()
        : itemArr[0].visibility.get()

      // If we're half way past the first/last item we show/hide the button
      const value = (!end && itemVisbility > 0.5) || (end && itemVisbility > 0.5) ? 0 : 1
      if (visibility.get() !== value) visibility.set(value)
    })

    const scale = useSpring(visibility)

    return (
      <m.div ref={ref} style={{ scale, opacity: scale }}>
        <Fab
          type='button'
          {...buttonProps}
          onClick={handleClick}
          classes={{ ...classes, ...buttonProps.classes }}
          aria-label={direction}
        />
      </m.div>
    )
  }),
)
ScrollerFab.displayName = 'ScrollerFab'

export default ScrollerFab
