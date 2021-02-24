import { makeStyles, Theme, Fab } from '@material-ui/core'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'
import { CSSProperties } from '@material-ui/styles'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useRef, useState } from 'react'
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
      ...size,
    }),
    containerZoomed: ({ zoomedSize }) => ({
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
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

type SingleItemSliderProps = Omit<
  SliderScrollerProps,
  'containerRef' | 'className' | 'itemClassName'
> &
  StylesProps

export default function ExpandableGallery(props: SingleItemSliderProps) {
  const { classes: classesBase, children, ...sliderScrollerProps } = props
  const classes = useStyles(props)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoomed, setZoomed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  return (
    <SliderContext scrollSnapStop='always' scrollSnapAlign='center' containerRef={containerRef}>
      <SliderContainer
        classes={{
          container: clsx(classes.container, zoomed && classes.containerZoomed),
        }}
      >
        <SliderScroller
          className={clsx(classes.scroller, zoomed && classes.scrollerZoomed)}
          animating={isAnimating}
          {...sliderScrollerProps}
        >
          {children}
        </SliderScroller>

        <m.div
          layout
          className={classes.topRight}
          onLayoutAnimationComplete={() => requestAnimationFrame(() => setIsAnimating(false))}
        >
          <Fab
            color='inherit'
            size='small'
            onClick={() => {
              setIsAnimating(true)
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
