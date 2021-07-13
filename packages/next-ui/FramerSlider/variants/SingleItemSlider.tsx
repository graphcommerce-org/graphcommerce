import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'
import SliderContainer from '../SliderContainer'
import SliderContext from '../SliderContext'
import SliderDots from '../SliderDots'
import SliderNext from '../SliderNext'
import SliderPrev from '../SliderPrev'
import SliderScroller from '../SliderScroller'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      position: 'relative',
    },
    scroller: {},
    nav: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.xxs,
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: `translateX(-50%)`,
    },
  }),
  { name: 'SingleItemSlider' },
)

export type SingleItemSliderProps = { children: React.ReactNode } & UseStyles<typeof useStyles>

export default function SingleItemSlider(props: SingleItemSliderProps) {
  const { children } = props
  const { scroller, container, ...classes } = useStyles(props)

  return (
    <SliderContext>
      <SliderContainer classes={{ container }}>
        <SliderScroller classes={{ scroller }}>{children}</SliderScroller>

        <div className={classes.nav}>
          <SliderPrev />
          <SliderDots count={React.Children.count(children)} />
          <SliderNext />
        </div>
      </SliderContainer>
    </SliderContext>
  )
}
