import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'
import SliderContainer from '../SliderContainer'
import { SliderContext } from '../SliderContext'
import SliderDots from '../SliderDots'
import SliderNext from '../SliderNext'
import SliderPrev from '../SliderPrev'
import SliderScroller, { SliderScrollerProps } from '../SliderScroller'

type ClassKey = 'container' | 'scroller' | 'nav'
type Classes = Partial<Record<ClassKey, string>>
type StylesProps = { count: number; classes?: Classes }

const useStyles = makeStyles<Theme, StylesProps, ClassKey>(
  (theme: Theme) => ({
    container: {
      position: 'relative',
    },
    scroller: ({ count = 2 }: StylesProps) => ({
      minWidth: '100%',
      gridTemplateColumns: `repeat(${count}, 100%)`,
    }),
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

type SingleItemSliderProps = Omit<SliderScrollerProps, 'animating'> & UseStyles<typeof useStyles>

export default function SingleItemSlider(props: SingleItemSliderProps) {
  const { classes, children, ...sliderScrollerProps } = props
  const { container, scroller, nav } = useStyles({ count: React.Children.count(children), classes })

  return (
    <SliderContext>
      <SliderContainer classes={{ container }}>
        <SliderScroller classes={{ scroller }} {...sliderScrollerProps}>
          {children}
        </SliderScroller>

        <div className={nav}>
          <SliderPrev />
          <SliderDots count={React.Children.count(children)} />
          <SliderNext />
        </div>
      </SliderContainer>
    </SliderContext>
  )
}
