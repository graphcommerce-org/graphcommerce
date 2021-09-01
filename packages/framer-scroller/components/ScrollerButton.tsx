import { Fab, FabProps, makeStyles, Theme } from '@material-ui/core'
import { m, useMotionValue, useSpring } from 'framer-motion'
import React, { useEffect } from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ItemState, SnapPositionDirection } from '../types'

export type ScrollerButtonProps = {
  direction: SnapPositionDirection
} & FabProps

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))

const ScrollerFab = m(
  React.forwardRef<HTMLDivElement, ScrollerButtonProps>((props, ref) => {
    const { direction, ...buttonProps } = props
    const classes = useStyles(buttonProps)

    const end = direction === 'right' || direction === 'down'

    const { getSnapPosition, items } = useScrollerContext()
    const scrollTo = useScrollTo()
    const handleClick = () => scrollTo(getSnapPosition(direction))

    const visibility = useMotionValue(0)

    useEffect(() => {
      const watched: (() => void)[] = []
      const onChangeItems = (itemArr: ItemState[]) => {
        const watch = end ? itemArr[itemArr.length - 1].visibility : itemArr[0].visibility
        watched.push(
          watch.onChange((v: number) =>
            // If we're half way past the first/last item we show/hide the button
            visibility.set((!end && v > 0.5) || (end && v > 0.5) ? 0 : 1),
          ),
        )
      }
      watched.push(items.onChange(onChangeItems))
      onChangeItems(items.get())
      return () => watched.forEach((d) => d())
    }, [end, items, visibility])

    const scale = useSpring(visibility)

    return (
      <m.div ref={ref} style={{ scale, opacity: scale }}>
        <Fab
          type='button'
          {...buttonProps}
          onClick={handleClick}
          classes={{ ...classes, ...buttonProps.classes }}
        />
      </m.div>
    )
  }),
)
ScrollerFab.displayName = 'ScrollerFab'

export default ScrollerFab
