import { makeStyles } from '@material-ui/core'
import React, { useRef } from 'react'
import { UseStyles } from '../../Styles'
import SliderContainer from '../SliderContainer'
import { SliderContext } from '../SliderContext'
import SliderScroller, { SliderScrollerProps } from '../SliderScroller'

const useStyles = makeStyles(
  () => ({
    container: {},
    scroller: {},
  }),
  { name: 'MultiItemSlider' },
)

type MultiItemSliderProps = Omit<
  SliderScrollerProps,
  'containerRef' | 'className' | 'itemClassName'
> &
  UseStyles<typeof useStyles>

export default function MultiItemSlider(props: MultiItemSliderProps) {
  const { classes: _unused, ...sliderScrollerProps } = props
  const classes = useStyles(props)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <SliderContext containerRef={containerRef}>
      <SliderContainer classes={{ container: classes.container }}>
        <SliderScroller className={classes.scroller} {...sliderScrollerProps} />
      </SliderContainer>
    </SliderContext>
  )
}
