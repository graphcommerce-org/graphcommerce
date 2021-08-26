import { Fab, makeStyles, Theme } from '@material-ui/core'
import { useMotionValueValue } from '@reachdigital/framer-utils'
import { m } from 'framer-motion'
import React from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'

export type DotsProps = Record<string, never> & {
  classes?: Record<'dots' | 'dot' | 'circle' | 'cicleActive', string>
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    dots: {
      width: 'fit-content',
      display: 'grid',
      gridAutoFlow: 'column',
      padding: `0 7px`,
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
    circleActive: {},
  }),
  { name: 'ScrollerDots' },
)

export default function ScrollerDots(props: DotsProps) {
  const classes = useStyles(props)
  const { items, getScrollSnapPositions } = useScrollerContext()
  const itemsArr = useMotionValueValue(items, (v) => v)
  const scrollTo = useScrollTo()

  return (
    <m.div layout className={classes.dots}>
      {itemsArr.map((item, idx) => (
        <Fab
          color='inherit'
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className={classes.dot}
          size='small'
          onClick={() => {
            const positions = getScrollSnapPositions()
            scrollTo({ x: positions.x[idx] ?? 0, y: positions.y[idx] ?? 0 })
          }}
        >
          <m.div className={classes.circle} style={{ opacity: item.opacity }} />
        </Fab>
      ))}
    </m.div>
  )
}
