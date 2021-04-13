import { makeStyles, Theme, Fab } from '@material-ui/core'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'
import SliderContainer from '../SliderContainer'
import { SliderContext } from '../SliderContext'
import SliderDots from '../SliderDots'
import SliderNext from '../SliderNext'
import SliderPrev from '../SliderPrev'
import SliderScroller from '../SliderScroller'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridAutoFlow: 'row',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '11fr 5fr',
      },
      background: theme.palette.background.highlight,
      marginBottom: theme.spacings.lg,
      height: responsiveVal(500, 1200),
    },
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
    container: {
      position: 'relative',
      zIndex: 10,
      background: theme.palette.background.highlight,
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      minHeight: '20vh',
    },
    containerZoomed: {
      zIndex: 12,
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    sidebar: {
      width: '100%',
      minWidth: '10vw',
      height: '100%',
      minHeight: '20vh',
      display: 'grid',
      justifyItems: 'start',
      alignContent: 'center',
      padding: 10,
      '& > *': {
        width: '100%',
      },
    },
  }),
  { name: 'ExpandableGallery' },
)

type SidebarGalleryProps = {
  children: React.ReactNode
  sidebar: React.ReactNode
} & UseStyles<typeof useStyles>

export default function SidebarGallery(props: SidebarGalleryProps) {
  const { children, sidebar } = props
  const classes = useStyles(props)
  const [zoomed, setZoomed] = useState(false)

  /**
   * Since the layout needs to be properly determined for the resize we start with `layout` set to
   * `true` and set it to `false after the first render`
   */
  const [layout, setLayout] = useState(true)
  useEffect(() => setLayout(false), [])

  return (
    <div className={classes.root}>
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
            className={classes.topRight}
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
          <div className={classes.bottomCenter}>
            <SliderPrev layout={layout} classes={{ root: classes.sliderButtons }} />
            <SliderDots layout={layout} count={React.Children.count(children)} />
            <SliderNext layout={layout} classes={{ root: classes.sliderButtons }} />
          </div>
        </SliderContainer>
      </SliderContext>
      <div className={classes.sidebar}>{sidebar}</div>
    </div>
  )
}
