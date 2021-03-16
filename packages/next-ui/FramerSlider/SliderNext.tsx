import { Fab, FabProps } from '@material-ui/core'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { m, useDomEvent } from 'framer-motion'
import React from 'react'
import { useSliderContext } from './SliderContext'

type SliderPrevProps = Omit<FabProps, 'disabled' | 'onClick' | 'children'> & { layout?: boolean }

/**
 * - Next button to navigate to the next slide
 * - Handles the `ArrowRight` key
 * - Hides when disabled
 */
export default function SliderNext(props: SliderPrevProps) {
  const { layout, className, ...fabProps } = props
  const [{ items, containerRef }, dispatch] = useSliderContext()

  const disabled = items[items.length - 1]?.visible ?? false

  const next = () => !disabled && dispatch({ type: 'NAVIGATE_NEXT' })

  const handleArrowLeft = (e: KeyboardEvent | Event) => {
    if ((e as KeyboardEvent)?.key === 'ArrowRight') next()
  }
  useDomEvent(containerRef, 'keyup', handleArrowLeft, { passive: true })

  return (
    <m.div
      layout={layout}
      className={className}
      style={{ visibility: disabled ? 'hidden' : 'visible' }}
      animate={{ scale: disabled ? 0.001 : 1 }}
    >
      <Fab color='inherit' size='small' {...fabProps} onClick={next}>
        <ArrowForward color='inherit' />
      </Fab>
    </m.div>
  )
}
