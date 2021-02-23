import { Fab, makeStyles } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { m } from 'framer-motion'
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

  // const disable = !state.items.some((item) => item.visible)
  const disabled = state.items[0]?.visible ?? false

  return (
    <m.div layout>
      <Fab
        color='inherit'
        className={classes.prev}
        size='small'
        disabled={disabled}
        onClick={() => !disabled && dispatch({ type: 'NAVIGATE_PREV' })}
      >
        <ArrowBack color='inherit' />
      </Fab>
    </m.div>
  )
}
