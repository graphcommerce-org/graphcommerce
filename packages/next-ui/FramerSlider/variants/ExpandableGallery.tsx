import { makeStyles, Theme, Fab } from '@material-ui/core'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'
import { CSSProperties } from '@material-ui/styles'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import SliderContainer from '../SliderContainer'
import { SliderContext } from '../SliderContext'
import SliderDots from '../SliderDots'
import SliderNext from '../SliderNext'
import SliderPrev from '../SliderPrev'
import SliderScroller, { SliderScrollerProps } from '../SliderScroller'

type ClassKey =
  | 'container'
  | 'containerZoomed'
  | 'scroller'
  | 'scrollerZoomed'
  | 'bottomCenter'
  | 'topRight'

type Classes = Partial<Record<ClassKey, string>>

type StylesProps = { classes?: Classes; size: CSSProperties; zoomedSize: CSSProperties }

const useStyles = makeStyles<Theme, StylesProps, ClassKey>(
  (theme: Theme) => ({
    container: ({ size }) => ({
      position: 'relative',
      zIndex: 10,
      ...size,
    }),
    containerZoomed: ({ zoomedSize }) => ({
      position: 'fixed',
      top: 0,
      left: 0,
      ...zoomedSize,
    }),
    scroller: ({ size }) => ({
      '& > *': size,
    }),
    scrollerZoomed: ({ zoomedSize }) => ({
      '& > *': zoomedSize,
    }),
    bottomCenter: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.xxs,
      position: 'absolute',
      bottom: theme.spacings.sm,
      justifyContent: 'center',
      width: '100%',
      pointerEvents: 'none',
      '& > *': {
        pointerEvents: 'all',
      },
    },
    topRight: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.xxs,
      position: 'absolute',
      top: theme.spacings.sm,
      right: theme.spacings.sm,
    },
  }),
  { name: 'ExandableGallery' },
)

type SingleItemSliderProps = StylesProps & Pick<SliderScrollerProps, 'children'>

export default function ExpandableGallery(props: SingleItemSliderProps) {
  const { classes: classesBase, children, ...sliderScrollerProps } = props
  const classes = useStyles(props)
  const [zoomed, setZoomed] = useState(false)

  /**
   * Since the layout needs to be properly determined beforehand we start with the isAnimating set
   * to true and disable it immediately.
   *
   * This causes an additional rerender, but should be fine?
   */
  const [animating, setAnimating] = useState(true)
  useEffect(() => setAnimating(false), [])

  return (
    <SliderContext scrollSnapStop='always' scrollSnapAlign='center'>
      <SliderContainer
        classes={{ container: clsx(classes.container, zoomed && classes.containerZoomed) }}
      >
        <SliderScroller
          classes={{ scroller: clsx(classes.scroller, zoomed && classes.scrollerZoomed) }}
          layout={animating}
          {...sliderScrollerProps}
        >
          {/**
           * We're passing the animating prop down to the child component. This allows the inside of the
           * component to counterscale
           */}
          {React.Children.map(children, (child) =>
            React.isValidElement<{ layout: boolean }>(child)
              ? React.cloneElement(child, { layout: animating })
              : child,
          )}
        </SliderScroller>

        <m.div
          layout
          className={classes.topRight}
          onLayoutAnimationComplete={() => setAnimating(false)}
        >
          <Fab
            color='inherit'
            size='small'
            onClick={() => {
              setAnimating(true)
              setZoomed(!zoomed)
              document.body.style.overflow = !zoomed ? 'hidden' : ''
            }}
          >
            {zoomed ? <FullscreenExit /> : <Fullscreen />}
          </Fab>
        </m.div>

        <div className={classes.bottomCenter}>
          <SliderPrev />
          <SliderDots count={React.Children.count(children)} />
          <SliderNext />
        </div>
      </SliderContainer>
    </SliderContext>
  )
}
