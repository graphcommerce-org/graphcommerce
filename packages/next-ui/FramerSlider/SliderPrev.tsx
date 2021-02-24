import { Fab, FabProps } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { m } from 'framer-motion'
import React from 'react'
import { useSliderContext } from './SliderContext'

type SliderPrevProps = Omit<FabProps, 'disabled' | 'onClick' | 'children'>

export default function SliderPrev(props: SliderPrevProps) {
  const [state, dispatch] = useSliderContext()

  // const disable = !state.items.some((item) => item.visible)
  const disabled = state.items[0]?.visible ?? false

  return (
    <m.div layout>
      <Fab
        color='inherit'
        size='small'
        {...props}
        disabled={disabled}
        onClick={() => !disabled && dispatch({ type: 'NAVIGATE_PREV' })}
      >
        <ArrowBack color='inherit' />
      </Fab>
    </m.div>
  )
}
