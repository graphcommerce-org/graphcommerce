import { makeStyles } from '@material-ui/core'
import React, { useRef } from 'react'
import { UseStyles } from '../../Styles'
import SliderContainer from '../SliderContainer'
import { SliderContext } from '../SliderContext'
import SliderScroller, { SliderScrollerProps } from '../SliderScroller'
import useScopeRef from '../useScopeRef'

const useStyles = makeStyles(
  () => ({
    container: {},
    scroller: {},
  }),
  { name: 'MultiItemSlider' },
)

type MultiItemSliderProps = Omit<
  SliderScrollerProps,
  'containerRef' | 'scope' | 'className' | 'itemClassName'
> &
  UseStyles<typeof useStyles>

export default function MultiItemSlider(props: MultiItemSliderProps) {
  const { classes: _, ...sliderScrollerProps } = props
  const classes = useStyles(props)
  const containerRef = useRef<HTMLDivElement>(null)
  const scope = useScopeRef()

  return (
    <SliderContext scope={scope} containerRef={containerRef}>
      <SliderContainer scope={scope} className={classes.container}>
        <SliderScroller scope={scope} className={classes.scroller} {...sliderScrollerProps} />
      </SliderContainer>
    </SliderContext>
  )
}
