import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { UseStyles } from '@graphcommerce/next-ui'
import { Fab, FabProps, Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import clsx from 'clsx'
import { HTMLMotionProps, m } from 'framer-motion'
import React from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'

const useStyles = makeStyles({ name: 'ScrollerDots' })((theme: Theme) => ({
  dots: {
    width: 'fit-content',
    display: 'grid',
    gridAutoFlow: 'column',
    padding: `0 6px`,
    borderRadius: '99em',
  },
  dot: {
    boxShadow: 'none',
    background: 'transparent',
  },
  circle: {
    borderRadius: '99em',
    width: 10,
    height: 10,
    background: theme.palette.text.primary,
  },
}))

export type DotsProps = {
  fabProps?: Omit<FabProps, 'onClick' | 'children'>
} & HTMLMotionProps<'div'> &
  UseStyles<typeof useStyles>

const ScrollerDots = m(
  React.forwardRef<HTMLDivElement, DotsProps>((props, ref) => {
    const { fabProps, classes: _classes, ...containerProps } = props
    const {
      classes: { dots, dot, circle, ...classes },
    } = useStyles(props)
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
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
