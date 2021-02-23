import { makeStyles, Theme, Fab } from '@material-ui/core'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { UseStyles } from '../../Styles'
import SliderContainer from '../SliderContainer'
import { SliderContext } from '../SliderContext'
import SliderDots from '../SliderDots'
import SliderNext from '../SliderNext'
import SliderPrev from '../SliderPrev'
import SliderScroller, { SliderScrollerProps } from '../SliderScroller'
import useScopeRef from '../useScopeRef'

type ClassKey = 'container' | 'containerZoomed' | 'scroller' | 'bottomCenter' | 'topRight'

type Classes = Partial<Record<ClassKey, string>>
type StylesProps = { count: number; classes?: Classes }

const useStyles = makeStyles<Theme, StylesProps, ClassKey>(
  (theme: Theme) => ({
    container: {
      position: 'relative',
      width: '400px',
      height: '400px',
      background: '#fff',
      zIndex: 10,
    },
    containerZoomed: {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
    },
    scroller: {},
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
  'containerRef' | 'scope' | 'className' | 'itemClassName'
> &
  UseStyles<typeof useStyles>

export default function ExpandableGallery(props: SingleItemSliderProps) {
  const { classes: classesBase, children, ...sliderScrollerProps } = props
  const classes = useStyles({ count: React.Children.count(children), classes: classesBase })
  const containerRef = useRef<HTMLDivElement>(null)
  const scope = useScopeRef()
  const [zoomed, setZoomed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  return (
    <SliderContext
      scope={scope}
      scrollSnapStop='always'
      scrollSnapAlign='center'
      containerRef={containerRef}
    >
      <SliderContainer
        scope={scope}
        className={clsx(classes.container, zoomed && classes.containerZoomed)}
      >
        <SliderScroller
          scope={scope}
          className={classes.scroller}
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
            }}
          >
            {zoomed ? <FullscreenExit /> : <Fullscreen />}
          </Fab>
        </m.div>

        <div className={classes.bottomCenter}>
          <SliderPrev scope={scope} />
          <SliderDots scope={scope} count={React.Children.count(children)} />
          <SliderNext scope={scope} />
        </div>
      </SliderContainer>
    </SliderContext>
  )
}
