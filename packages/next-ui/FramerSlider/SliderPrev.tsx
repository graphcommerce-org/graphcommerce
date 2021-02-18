import { Fab, makeStyles } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import React from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles(
  {
    prev: {},
  },
  { name: 'SliderDots' },
)

type SliderPrevProps = { scope: string } & UseStyles<typeof useStyles>

export default function SliderPrev(props: SliderPrevProps) {
  const { scope } = props
  const classes = useStyles(props)
  const [state, dispatch] = useSliderContext(scope)

  const active = state.firstItem?.active ?? true

  return (
    <Fab
      color='inherit'
      className={classes.prev}
      size='small'
      disabled={active}
      onClick={() => !active && dispatch({ type: 'NAVIGATE_PREV' })}
    >
      <ArrowBack color='inherit' />
    </Fab>
  )
}
