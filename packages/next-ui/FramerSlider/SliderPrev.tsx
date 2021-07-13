import { Fab, FabProps } from '@material-ui/core'
import { m, useDomEvent } from 'framer-motion'
import React from 'react'
import SvgImage from '../SvgImage'
import { iconChevronLeft } from '../icons'
import { useSliderContext } from './SliderContext'

export type SliderPrevProps = Omit<FabProps, 'disabled' | 'onClick' | 'children'> & {
  layout?: boolean
}

/**
 * - Prev button to navigate to the previous slide
 * - Handles the `ArrowLeft` key
 * - Hides when disabled
 */
export default function SliderPrev(props: SliderPrevProps) {
  const { layout, className, ...fabProps } = props
  const [{ items, containerRef }, dispatch] = useSliderContext()

  // const disable = !state.items.some((item) => item.visible)
  const disabled = items[0]?.visible ?? true
  const prev = () => !disabled && dispatch({ type: 'NAVIGATE_PREV' })

  const handleArrowLeft = (e: KeyboardEvent | Event) => {
    if ((e as KeyboardEvent)?.key === 'ArrowLeft') prev()
  }
  useDomEvent(containerRef, 'keyup', handleArrowLeft, { passive: true })

  return (
    <m.div layout={layout} className={className} animate={{ scale: disabled ? 0.001 : 1 }}>
      <Fab color='inherit' size='small' {...fabProps} onClick={prev}>
        <SvgImage src={iconChevronLeft} alt='backwards' size='small' title='Back' />
      </Fab>
    </m.div>
  )
}
