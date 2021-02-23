import { Fab, makeStyles } from '@material-ui/core'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { m } from 'framer-motion'
import React from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles({ next: {} }, { name: 'SliderDots' })

type SliderPrevProps = { scope: string } & UseStyles<typeof useStyles>

export default function SliderNext(props: SliderPrevProps) {
  const { scope } = props
  const classes = useStyles(props)
  const [state, dispatch] = useSliderContext(scope)

  const visible = state.items[state.items.length - 1]?.visible ?? false

  return (
    <m.div layout>
      <Fab
        color='inherit'
        className={classes.next}
        size='small'
        disabled={visible}
        onClick={() => !visible && dispatch({ type: 'NAVIGATE_NEXT' })}
      >
        <ArrowForward color='inherit' />
      </Fab>
    </m.div>
  )
}
