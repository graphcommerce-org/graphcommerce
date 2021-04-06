import { makeStyles, Theme, Fab } from '@material-ui/core'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { UseStyles } from '../../Styles'
import SliderContainer, { useSliderContainerStyles } from '../SliderContainer'
import { SliderContext } from '../SliderContext'
import SliderDots from '../SliderDots'
import SliderNext from '../SliderNext'
import SliderPrev from '../SliderPrev'
import SliderScroller from '../SliderScroller'

const useStyles = makeStyles(
  (theme: Theme) => ({
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
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'left',
      },
    },
    sliderButtons: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    topRight: {
      display: 'grid',
      gridAutoFlow: 'column',
      top: theme.spacings.sm,
      gap: theme.spacings.xxs,
      position: 'absolute',
      right: theme.spacings.sm,
      [theme.breakpoints.down('xs')]: {
        top: 'auto',
        bottom: theme.spacings.sm,
      },
    },
    container: {},
    containerZoomed: {},
  }),
  { name: 'ExpandableGallery' },
)

type SidebarGalleryProps = {
  children: React.ReactNode
  sidebar: React.ReactNode
} & UseStyles<typeof useStyles>

export default function SidebarGallery(props: SidebarGalleryProps) {
  const { children, sidebar, classes } = props
  const expGalleryClasses = useStyles(props)
  const [zoomed, setZoomed] = useState(false)

  /**
   * Since the layout needs to be properly determined for the resize we start with `layout` set to
   * `true` and set it to `false after the first render`
   */
  const [layout, setLayout] = useState(true)
  useEffect(() => setLayout(false), [])

  return (
    <>
      <SliderContext scrollSnapAlign='center'>
        <SliderContainer
          layout={layout}
          classes={{
            container: clsx(classes?.container, zoomed && classes?.containerZoomed),
          }}
        >
          <SliderScroller layout={layout}>{children}</SliderScroller>
          <m.div
            layout
            className={expGalleryClasses.topRight}
            onLayoutAnimationComplete={() => setLayout(false)}
          >
            <Fab
              color='inherit'
              size='small'
              onClick={() => {
                setLayout(true)
                setZoomed(!zoomed)
                document.body.style.overflow = !zoomed ? 'hidden' : ''
              }}
            >
              {zoomed ? <FullscreenExit /> : <Fullscreen />}
            </Fab>
          </m.div>
          <div className={expGalleryClasses.bottomCenter}>
            <SliderPrev layout={layout} classes={{ root: expGalleryClasses.sliderButtons }} />
            <SliderDots layout={layout} count={React.Children.count(children)} />
            <SliderNext layout={layout} classes={{ root: expGalleryClasses.sliderButtons }} />
          </div>
        </SliderContainer>
      </SliderContext>

      {sidebar}
    </>
  )
}
