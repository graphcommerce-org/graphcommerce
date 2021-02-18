import { Fab, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles(
  (theme: Theme) => ({
    dots: {
      borderRadius: 20,
      background: theme.palette.background.paper,
      boxShadow: theme.shadows[6],
      width: 'fit-content',
      display: 'grid',
      gridAutoFlow: 'column',
      // padding: 8,
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
      background: theme.palette.action.hover,
    },
    circleActive: {
      background: theme.palette.text.primary,
    },
  }),
  { name: 'SliderDots' },
)

type SliderDotsProps = { scope: string; count: number } & UseStyles<typeof useStyles>

export default function SliderDots(props: SliderDotsProps) {
  const { scope, count } = props
  const classes = useStyles(props)
  const [state, dispatch] = useSliderContext(scope)

  const items = new Array(count).fill(undefined).map((_, idx) => [idx, state.items?.[idx]] as const)

  return (
    <div className={classes.dots}>
      {items.map(([idx, item]) => (
        <Fab
          color='inherit'
          key={idx}
          className={classes.dot}
          size='small'
          onClick={() => dispatch({ type: 'NAVIGATE', to: idx })}
        >
          <div className={clsx({ [classes.circle]: true, [classes.circleActive]: item?.active })} />
        </Fab>
      ))}
    </div>
  )
}
