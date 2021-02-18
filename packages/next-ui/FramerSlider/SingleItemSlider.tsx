import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React, { useRef } from 'react'
import { UseStyles } from '../Styles'
import SliderContainer from './SliderContainer'
import { SliderContext } from './SliderContext'
import SliderDots from './SliderDots'
import SliderNext from './SliderNext'
import SliderPrev from './SliderPrev'
import SliderScroller, { SliderScrollerProps } from './SliderScroller'

import useScopeRef from './useScopeRef'

const useStyles = makeStyles(
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
    item: {},
    dots: {},
    dot: {},
    circle: {},
    circleActive: {},
  }),
  { name: 'SingleItemSlider' },
)

type StylesProps = { count: number }

type SingleItemSliderProps = Omit<
  SliderScrollerProps,
  'containerRef' | 'scope' | 'className' | 'itemClassName'
> &
  UseStyles<typeof useStyles>

export default function SingleItemSlider(props: SingleItemSliderProps) {
  const { classes, children, ...sliderScrollerProps } = props
  const classesBase = useStyles({ count: React.Children.count(children) })
  const containerRef = useRef<HTMLDivElement>(null)
  const scope = useScopeRef()

  return (
    <SliderContext scope={scope}>
      <SliderContainer
        containerRef={containerRef}
        className={clsx(classesBase.container, classes?.container)}
      >
        <SliderScroller
          scope={scope}
          containerRef={containerRef}
          className={clsx(classesBase.scroller, classes?.scroller)}
          itemClassName={clsx(classesBase.item, classes?.item)}
          {...sliderScrollerProps}
        >
          {children}
        </SliderScroller>
        <div className={clsx(classesBase.nav, classes?.nav)}>
          <SliderPrev scope={scope} />
          <SliderDots
            scope={scope}
            count={React.Children.count(children)}
            classes={{
              dots: clsx(classesBase.dots, classes?.dots),
              dot: clsx(classesBase.dot, classes?.dot),
              circle: clsx(classesBase.circle, classes?.circle),
              circleActive: clsx(classesBase.circleActive, classes?.circleActive),
            }}
          />
          <SliderNext scope={scope} />
        </div>
      </SliderContainer>
    </SliderContext>
  )
}
