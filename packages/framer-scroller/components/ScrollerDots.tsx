import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { UseStyles } from '@graphcommerce/next-ui'
import { Fab, FabProps, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { HTMLMotionProps, m } from 'framer-motion'
import React from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'

const useStyles = makeStyles(
  (theme: Theme) => ({
    dots: {
      width: 'fit-content',
      display: 'grid',
      gridAutoFlow: 'column',
      padding: `0 7px`,
      borderRadius: '20px',
    },
    dot: {
      boxShadow: 'none',
      margin: `0 -7px`,
      background: 'transparent',
    },
    circle: {
      borderRadius: '50%',
      width: 10,
      height: 10,
      background: theme.palette.text.primary,
    },
  }),
  { name: 'ScrollerDots' },
)

export type DotsProps = {
  fabProps?: Omit<FabProps, 'onClick' | 'children'>
} & HTMLMotionProps<'div'> &
  UseStyles<typeof useStyles>

const ScrollerDots = m(
  React.forwardRef<HTMLDivElement, DotsProps>((props, ref) => {
    const { fabProps, ...containerProps } = props
    const { dots, dot, circle, ...classes } = useStyles(props)
    const { items, getScrollSnapPositions } = useScrollerContext()
    const itemsArr = useMotionValueValue(items, (v) => v)
    const scrollTo = useScrollTo()

    return (
      <m.div {...containerProps} className={clsx(dots, containerProps?.className)} ref={ref}>
        {itemsArr.map((item, idx) => (
          <Fab
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            color='inherit'
            size='small'
            {...fabProps}
            onClick={() => {
              const positions = getScrollSnapPositions()
              scrollTo({ x: positions.x[idx] ?? 0, y: positions.y[idx] ?? 0 })
            }}
            className={clsx(dot, props.className)}
            classes={classes}
            aria-label={`img-${idx}`}
          >
            <m.div className={circle} style={{ opacity: item.opacity }} />
          </Fab>
        ))}
      </m.div>
    )
  }),
)

ScrollerDots.displayName = 'ScrollerDots'

export default ScrollerDots
