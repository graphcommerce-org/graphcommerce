import { makeStyles, Theme, Fab } from '@material-ui/core'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { UseStyles } from '../../Styles'
import SliderContainer from '../SliderContainer'
import { SliderContext } from '../SliderContext'
import SliderDots from '../SliderDots'
import SliderNext from '../SliderNext'
import SliderPrev from '../SliderPrev'
import SliderScroller, { SliderScrollerProps } from '../SliderScroller'
import useScopeRef from '../useScopeRef'

type ClassKey =
  | 'container'
  | 'containerZoomed'
  | 'scroller'
  | 'item'
  | 'bottomCenter'
  | 'topRight'
  | 'navArea'

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
    scroller: ({ count = 2 }: StylesProps) => ({
      minWidth: '100%',
      gridTemplateColumns: `repeat(${count}, 100%)`,
    }),
    item: {
      display: 'block',
      height: 0, // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
      position: 'relative',
      paddingTop: `calc(100% / 1 * 1)`,
      background: 'rgba(0, 0, 0, 0.03)', // thema specifiek
      borderRadius: 2,
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        pointerEvents: 'none',
      },
    },
    navArea: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.xxs,
    },
    bottomCenter: {
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

  return (
    <SliderContext scope={scope} scrollSnapStop='always'>
      <SliderContainer
        scope={scope}
        containerRef={containerRef}
        className={clsx(classes.container, zoomed && classes.containerZoomed)}
      >
        <SliderScroller
          scope={scope}
          containerRef={containerRef}
          className={classes.scroller}
          itemClassName={classes.item}
          {...sliderScrollerProps}
        >
          {children}
        </SliderScroller>

        <div className={clsx(classes.navArea, classes.bottomCenter)}>
          <SliderPrev scope={scope} />
          <SliderDots scope={scope} count={React.Children.count(children)} />
          <SliderNext scope={scope} />
        </div>

        <m.div layout className={clsx(classes.navArea, classes.topRight)}>
          <Fab color='inherit' size='small' onClick={() => setZoomed(!zoomed)}>
            {zoomed ? <FullscreenExit /> : <Fullscreen />}
          </Fab>
        </m.div>
      </SliderContainer>
    </SliderContext>
  )
}
