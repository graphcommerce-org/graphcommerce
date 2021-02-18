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
      boxShadow: theme.shadows[8],
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

type SliderDotsProps = {
  scope: string
} & UseStyles<typeof useStyles>

export default function SliderDots(props: SliderDotsProps) {
  const { scope } = props
  const classes = useStyles(props)
  const [state] = useSliderContext(scope)

  return (
    <div className={classes.dots}>
      {Object.entries(state.items).map(([key, item]) => (
        <Fab color='inherit' key={key} className={classes.dot} size='small'>
          <div className={clsx({ [classes.circle]: true, [classes.circleActive]: item.active })} />
        </Fab>
      ))}
    </div>
  )
}
