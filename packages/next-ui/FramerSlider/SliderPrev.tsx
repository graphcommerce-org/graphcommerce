import { Fab, FabProps } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { m, useDomEvent } from 'framer-motion'
import React from 'react'
import { useSliderContext } from './SliderContext'

type SliderPrevProps = Omit<FabProps, 'disabled' | 'onClick' | 'children'> & { layout?: boolean }

/**
 * - Prev button to navigate to the previous slide
 * - Handles the `ArrowLeft` key
 * - Hides when disabled
 */
export default function SliderPrev(props: SliderPrevProps) {
  const { layout, className, ...fabProps } = props
  const [{ items, containerRef }, dispatch] = useSliderContext()

  // const disable = !state.items.some((item) => item.visible)
  const disabled = items[0]?.visible ?? false
  const prev = () => !disabled && dispatch({ type: 'NAVIGATE_PREV' })

  const handleArrowLeft = (e: KeyboardEvent | Event) => {
    if ((e as KeyboardEvent)?.key === 'ArrowLeft') prev()
  }
  useDomEvent(containerRef, 'keyup', handleArrowLeft, { passive: true })

  return (
    <m.div layout={layout} className={className} animate={{ scale: !disabled ? 1 : 0.001 }}>
      <Fab color='inherit' size='small' {...fabProps} onClick={prev}>
        <ArrowBack color='inherit' />
      </Fab>
    </m.div>
  )
}
