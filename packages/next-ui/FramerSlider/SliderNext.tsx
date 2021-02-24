import { Fab, FabProps } from '@material-ui/core'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { m } from 'framer-motion'
import React from 'react'
import { useSliderContext } from './SliderContext'

type SliderPrevProps = Omit<FabProps, 'disabled' | 'onClick' | 'children'>

export default function SliderNext(props: SliderPrevProps) {
  const [state, dispatch] = useSliderContext()

  const visible = state.items[state.items.length - 1]?.visible ?? false

  return (
    <m.div layout>
      <Fab
        color='inherit'
        size='small'
        {...props}
        disabled={visible}
        onClick={() => !visible && dispatch({ type: 'NAVIGATE_NEXT' })}
      >
        <ArrowForward color='inherit' />
      </Fab>
    </m.div>
  )
}
