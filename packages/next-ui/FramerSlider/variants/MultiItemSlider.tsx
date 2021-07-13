import { makeStyles } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'
import SliderContainer from '../SliderContainer'
import SliderContext from '../SliderContext'
import SliderScroller, { SliderScrollerProps } from '../SliderScroller'
import { SliderState } from '../sliderReducer'

const useStyles = makeStyles(
  () => ({
    container: {},
    scroller: {},
  }),
  { name: 'MultiItemSlider' },
)

type MultiItemSliderProps = Pick<SliderScrollerProps, 'children'> &
  Partial<SliderState['options']> &
  UseStyles<typeof useStyles>

export default function MultiItemSlider(props: MultiItemSliderProps) {
  const { classes: _unused, children, ...options } = props
  const { container, scroller } = useStyles(props)

  return (
    <SliderContext {...options}>
      <SliderContainer classes={{ container }}>
        <SliderScroller classes={{ scroller }}>{children}</SliderScroller>
      </SliderContainer>
    </SliderContext>
  )
}
