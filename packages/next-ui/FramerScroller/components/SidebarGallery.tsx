import { usePrevPageRouter } from '@graphcommerce/framer-next-pages/hooks/usePrevPageRouter'
import {
  CenterSlide,
  MotionImageAspect,
  MotionImageAspectProps,
  Scroller,
  ScrollerButton,
  ScrollerDots,
  ScrollerProvider,
} from '@graphcommerce/framer-scroller'
import { clientSize, useMotionValueValue } from '@graphcommerce/framer-utils'
import { Fab, makeStyles, Theme, useTheme, alpha } from '@material-ui/core'
import clsx from 'clsx'
import { m, useDomEvent, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { Row } from '../..'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
import { iconChevronLeft, iconChevronRight, iconFullscreen, iconFullscreenExit } from '../../icons'

type StyleProps = {
  aspectRatio: [number, number]
  clientHeight: number
  classes?: Record<string, unknown>
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr auto',
      },
      background:
        theme.palette.type === 'light'
          ? theme.palette.background.image
          : theme.palette.background.paper,
      paddingRight: `calc((100% - ${theme.breakpoints.values.lg}px) / 2)`,
    },
    rootZoomed: {
      position: 'relative',
      zIndex: theme.zIndex.modal,
      marginTop: `calc(${theme.headerHeight.sm} * -1)`,
      [theme.breakpoints.up('md')]: {
        marginTop: `calc(${theme.headerHeight.md} * -1  - ${theme.spacings.sm})`,
      },
      paddingRight: 0,
    },
    scrollerContainer: ({ aspectRatio: [width, height] }: StyleProps) => {
      const headerHeight = `${theme.headerHeight.sm} - ${theme.spacings.sm} * 2`
      const galleryMargin = theme.spacings.lg
      const extraSpacing = theme.spacings.md

      const maxHeight = `calc(100vh - ${headerHeight} - ${galleryMargin} - ${extraSpacing})`
      const ratio = `calc(${height} / ${width} * 100%)`

      return {
        height: 0, // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
        backgroundColor: theme.palette.background.image,
        position: 'relative',
        minHeight: '100%',
        paddingTop: `min(${ratio}, ${maxHeight})`,
        [theme.breakpoints.down('sm')]: {
          width: '100vw',
        },
      }
    },
    scrollerContainerZoomed: ({ clientHeight }: StyleProps) => ({
      paddingTop: clientHeight,
    }),
    scroller: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      gridAutoColumns: `100%`,
      gridTemplateRows: `100%`,
      cursor: 'zoom-in',
    },
    scrollerZoomed: ({ clientHeight }: StyleProps) => ({
      height: clientHeight,
      cursor: 'inherit',
    }),
    sidebarWrapper: {
      boxSizing: 'content-box',
      display: 'grid',
      justifyItems: 'start',
      alignContent: 'center',
      position: 'relative',
      [theme.breakpoints.up('md')]: {
        width: `calc(${responsiveVal(300, 500, theme.breakpoints.values.lg)} + ${
          theme.page.horizontal
        } * 2)`,
      },
    },
    sidebarWrapperZoomed: {
      [theme.breakpoints.up('md')]: {
        marginLeft: `calc((${responsiveVal(300, 500, theme.breakpoints.values.lg)} + ${
          theme.page.horizontal
        } * 2) * -1)`,
        left: `calc(${responsiveVal(300, 500, theme.breakpoints.values.lg)} + ${
          theme.page.horizontal
        } * 2)`,
      },
    },
    sidebar: {
      boxSizing: 'border-box',
      width: '100%',
      padding: `${theme.spacings.md} ${theme.page.horizontal}`,
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacings.lg,
      },
    },
    bottomCenter: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.xxs,
      position: 'absolute',
      bottom: theme.spacings.xxs,
      justifyContent: 'center',
      width: '100%',
      pointerEvents: 'none',
      '& > *': {
        pointerEvents: 'all',
      },
    },
    sliderButtons: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    toggleIcon: {
      boxShadow: theme.shadows[6],
    },
    topRight: {
      display: 'grid',
      gridAutoFlow: 'column',
      top: theme.spacings.sm,
      gap: theme.spacings.xxs,
      position: 'absolute',
      right: theme.spacings.sm,
    },
    centerLeft: {
      display: 'grid',
      gridAutoFlow: 'row',
      gap: theme.spacings.xxs,
      position: 'absolute',
      left: theme.spacings.sm,
      top: `calc(50% - 28px)`,
    },
    centerRight: {
      display: 'grid',
      gap: theme.spacings.xxs,
      position: 'absolute',
      right: theme.spacings.sm,
      top: `calc(50% - 28px)`,
    },
    dots: {
      background: alpha(theme.palette.background.paper, 0.7),
    },
  }),
  { name: 'SidebarGallery' },
)

export type SidebarGalleryProps = {
  sidebar: React.ReactNode
  images: MotionImageAspectProps[]
  aspectRatio?: [number, number]
  routeHash?: string
} & UseStyles<typeof useStyles>

export default function SidebarGallery(props: SidebarGalleryProps) {
  const { sidebar, images, aspectRatio = [1, 1], routeHash = 'gallery' } = props
  const router = useRouter()
  const prevRoute = usePrevPageRouter()
  const clientHeight = useMotionValueValue(clientSize.y, (y) => y)
  const classes = useStyles({ clientHeight, aspectRatio, classes: props.classes })

  const route = `#${routeHash}`
  // We're using the URL to manage the state of the gallery.
  const zoomed = router.asPath.endsWith(route)

  // cleanup if someone enters the page with #gallery
  useEffect(() => {
    if (!prevRoute?.pathname && zoomed) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.replace(router.asPath.replace(route, ''))
    }
  }, [prevRoute?.pathname, route, router, zoomed])

  const toggle = () => {
    if (!zoomed) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(route, undefined, { shallow: true })
      document.body.style.overflow = 'hidden'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.back()
    }
  }

  const clsxZoom = (key: string) => clsx(classes?.[key], zoomed && classes?.[`${key}Zoomed`])
  const theme = useTheme()
  const windowRef = useRef(typeof window !== 'undefined' ? window : null)

  const handleEscapeKey = (e: KeyboardEvent | Event) => {
    if (zoomed) {
      if ((e as KeyboardEvent)?.key === 'Escape') {
        toggle()
      }
    }
  }

  const dragStart = useMotionValue<number>(0)
  const onMouseDownScroller: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (dragStart.get() === e.clientX) return
    dragStart.set(e.clientX)
  }
  const onMouseUpScroller: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const currentDragLoc = e.clientX
    if (Math.abs(currentDragLoc - dragStart.get()) < 8) toggle()
  }

  useDomEvent(windowRef, 'keyup', handleEscapeKey, { passive: true })

  return (
    <ScrollerProvider scrollSnapAlign='center'>
      <Row maxWidth={false} disableGutters>
        <m.div layout className={clsxZoom('root')}>
          <m.div
            layout
            className={clsxZoom('scrollerContainer')}
            onLayoutAnimationComplete={() => {
              if (!zoomed) document.body.style.overflow = ''
            }}
          >
            <Scroller
              className={clsxZoom('scroller')}
              hideScrollbar
              onMouseDown={onMouseDownScroller}
              onMouseUp={onMouseUpScroller}
            >
              {images.map((image, idx) => (
                <CenterSlide key={typeof image.src === 'string' ? image.src : idx}>
                  <MotionImageAspect
                    layout
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    sizes={{
                      0: '100vw',
                      [theme.breakpoints.values.md]: zoomed ? '100vw' : '60vw',
                    }}
                    dontReportWronglySizedImages
                  />
                </CenterSlide>
              ))}
            </Scroller>
            <m.div layout className={classes.topRight}>
              <Fab
                size='small'
                className={classes.toggleIcon}
                onMouseUp={toggle}
                aria-label='Toggle Fullscreen'
              >
                {!zoomed ? (
                  <SvgImageSimple src={iconFullscreen} />
                ) : (
                  <SvgImageSimple src={iconFullscreenExit} />
                )}
              </Fab>
            </m.div>
            <div className={classes.centerLeft}>
              <ScrollerButton
                layout
                direction='left'
                size='small'
                className={classes.sliderButtons}
              >
                <SvgImageSimple src={iconChevronLeft} />
              </ScrollerButton>
            </div>
            <div className={classes.centerRight}>
              <ScrollerButton
                layout
                direction='right'
                size='small'
                className={classes.sliderButtons}
              >
                <SvgImageSimple src={iconChevronRight} />
              </ScrollerButton>
            </div>

            <div className={classes.bottomCenter}>
              <ScrollerDots layout classes={{ dots: classes.dots }} />
            </div>
          </m.div>

          <div className={clsxZoom('sidebarWrapper')}>
            <m.div layout className={clsxZoom('sidebar')}>
              {sidebar}
            </m.div>
          </div>
        </m.div>
      </Row>
    </ScrollerProvider>
  )
}
