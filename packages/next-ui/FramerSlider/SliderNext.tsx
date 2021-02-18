import { Fab, makeStyles } from '@material-ui/core'
import ArrowForward from '@material-ui/icons/ArrowForward'
import React from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles({ next: {} }, { name: 'SliderDots' })

type SliderPrevProps = { scope: string } & UseStyles<typeof useStyles>

export default function SliderNext(props: SliderPrevProps) {
  const { scope } = props
  const classes = useStyles(props)
  const [state, dispatch] = useSliderContext(scope)

  const itemArr = Object.entries(state.items)
  const { active } = itemArr[itemArr.length - 1]?.[1] ?? false

  return (
    <Fab
      color='inherit'
      className={classes.next}
      size='small'
      disabled={active}
      onClick={() => !active && dispatch({ type: 'NAVIGATE_NEXT' })}
    >
      <ArrowForward color='inherit' />
    </Fab>
  )
}
