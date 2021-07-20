import { ContainerProps, Fab, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { UseStyles } from '../../Styles'
import SvgImage from '../../SvgImage'
import { iconCollapseVertical, iconExpandVertical } from '../../icons'
import SliderContainer from '../SliderContainer'
import SliderContext from '../SliderContext'
import SliderDots from '../SliderDots'
import SliderNext from '../SliderNext'
import SliderPrev from '../SliderPrev'
import SliderScroller from '../SliderScroller'

export type StyleProps = {
  maxWidth?: ContainerProps['maxWidth']
  aspectRatio?: [number, number]
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.page.horizontal}px`,
      },
    },
    root: ({ maxWidth }: StyleProps) => ({
      display: 'grid',
      gridAutoFlow: 'row',
      marginBottom: theme.spacings.lg,

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr auto',
      },
      background: theme.palette.background.highlight,

      // height: responsiveVal(500, 1200),
      paddingRight: `calc((100% - ${theme.breakpoints.values[maxWidth || 'lg']}px) / 2)`,
    }),
    sliderWrapper: ({ aspectRatio: [width, height] = [1, 1] }: StyleProps) => {
      const headerHeight = `${theme.page.headerInnerHeight.sm} - ${theme.spacings.sm} * 2`
      const galleryMargin = theme.spacings.lg
      const extraSpacing = theme.spacings.md
      const maxHeight = `calc(100vh - ${headerHeight} - ${galleryMargin} - ${extraSpacing})`
      const ratio = `calc(${width} / ${height} * 100%)`
      return {
        display: 'block',
        height: 0, // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
        position: 'relative',
        minHeight: '100%',
        paddingTop: `min(${ratio}, ${maxHeight})`,
        borderRadius: 2,
      }
    },
    container: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    scroller: {},
    containerZoomed: {
      background: theme.palette.background.highlight,
      zIndex: 12,
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    sidebar: {
      boxSizing: 'content-box',
      padding: `${theme.spacings.md} ${theme.page.horizontal}`,
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacings.lg,
        width: 400,
      },
      display: 'grid',
      justifyItems: 'start',
      alignContent: 'center',
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
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'left',
      },
    },
    sliderButtons: {
      boxShadow: theme.shadows[2],
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    toggleIcon: {
      boxShadow: theme.shadows[2],
    },
    topRight: {
      display: 'grid',
      gridAutoFlow: 'column',
      top: theme.spacings.sm,
      gap: theme.spacings.xxs,
      position: 'absolute',
      right: theme.spacings.sm,
      [theme.breakpoints.down('sm')]: {
        top: 'auto',
        bottom: theme.spacings.sm,
      },
    },
  }),
  { name: 'SidebarGallery' },
)

type SidebarGalleryProps = {
  children: React.ReactNode
  sidebar: React.ReactNode
} & StyleProps &
  UseStyles<typeof useStyles>

export default function SidebarGallery(props: SidebarGalleryProps) {
  const { children, sidebar, maxWidth, aspectRatio } = props
  const classes = useStyles({ maxWidth, aspectRatio })
  const [zoomed, setZoomed] = useState(false)

  /**
   * Since the layout needs to be properly determined for the resize we start with `layout` set to
   * `true` and set it to `false after the first render`
   */
  const [layout, setLayout] = useState(true)
  useEffect(() => setLayout(false), [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <div className={classes.sliderWrapper}>
          <SliderContext scrollSnapAlign='center'>
            <SliderContainer
              layout={layout}
              classes={{
                container: clsx(classes?.container, zoomed && classes?.containerZoomed),
              }}
            >
              <SliderScroller layout={layout} classes={{ scroller: classes.scroller }}>
                {children}
              </SliderScroller>
              <m.div
                className={classes.topRight}
                onLayoutAnimationComplete={() => setLayout(false)}
              >
                <Fab
                  color='inherit'
                  size='small'
                  classes={{ root: classes.toggleIcon }}
                  onClick={() => {
                    setLayout(true)
                    setZoomed(!zoomed)
                    document.body.style.overflow = !zoomed ? 'hidden' : ''
                  }}
                >
                  {!zoomed ? (
                    <SvgImage
                      src={iconExpandVertical}
                      alt='expand'
                      title='Zoom in'
                      loading='eager'
                    />
                  ) : (
                    <SvgImage
                      src={iconCollapseVertical}
                      alt='collapse'
                      title='Zoom out'
                      loading='eager'
                    />
                  )}
                </Fab>
              </m.div>
              <div className={classes.bottomCenter}>
                <SliderPrev layout={layout} classes={{ root: classes.sliderButtons }} />
                <SliderDots layout={layout} count={React.Children.count(children)} />
                <SliderNext layout={layout} classes={{ root: classes.sliderButtons }} />
              </div>
            </SliderContainer>
          </SliderContext>
        </div>
        <div className={classes.sidebar}>{sidebar}</div>
      </div>
    </div>
  )
}
