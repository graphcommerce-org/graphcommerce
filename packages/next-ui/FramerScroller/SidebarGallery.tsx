import { usePrevPageRouter } from '@graphcommerce/framer-next-pages/hooks/usePrevPageRouter'
import {
  MotionImageAspect,
  MotionImageAspectProps,
  Scroller,
  ScrollerButton,
  ScrollerDots,
  ScrollerProvider,
} from '@graphcommerce/framer-scroller'
import { clientSize, useMotionValueValue } from '@graphcommerce/framer-utils'
import { Fab, useTheme, alpha, Box, styled } from '@mui/material'
import { m, useDomEvent, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { Row } from '../Row'
import { extendableComponent } from '../Styles'
import { classesPicker } from '../Styles/classesPicker'
import { responsiveVal } from '../Styles/responsiveVal'
import { SvgIcon } from '../SvgIcon/SvgIcon'
import { iconChevronLeft, iconChevronRight, iconFullscreen, iconFullscreenExit } from '../icons'

const MotionBox = styled(m.div)({})

const { classes, selectors, componentName } = extendableComponent('SidebarGallery', [
  'root',
  'rootZoomed',
  'scrollerContainer',
  'scrollerContainerZoomed',
  'scroller',
  'scrollerZoomed',
  'sidebarWrapper',
  'sidebarWrapperZoomed',
  'sidebar',
  'bottomCenter',
  'sliderButtons',
  'toggleIcon',
  'topRight',
  'centerLeft',
  'centerRight',
  'dots',
] as const)

export type SidebarGalleryProps = {
  sidebar: React.ReactNode
  images: MotionImageAspectProps[]
  aspectRatio?: [number, number]
  routeHash?: string
}

export function SidebarGallery(props: SidebarGalleryProps) {
  const { sidebar, images, aspectRatio: [width, height] = [1, 1], routeHash = 'gallery' } = props

  const router = useRouter()
  const prevRoute = usePrevPageRouter()
  const clientHeight = useMotionValueValue(clientSize.y, (y) => y)
  // const classes = useMergedClasses(useStyles({ clientHeight, aspectRatio }).classes, props.classes)

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

  const className = classesPicker(classes, { zoomed })
  const theme = useTheme()
  const windowRef = useRef(typeof window !== 'undefined' ? window : null)

  const handleEscapeKey = (e: KeyboardEvent | Event) => {
    if (zoomed && (e as KeyboardEvent)?.key === 'Escape') toggle()
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

  const headerHeight = `${theme.appShell.headerHeightSm} - ${theme.spacings.sm} * 2`
  const galleryMargin = theme.spacings.lg
  const extraSpacing = theme.spacings.md

  const maxHeight = `calc(100vh - ${headerHeight} - ${galleryMargin} - ${extraSpacing})`
  const ratio = `calc(${height} / ${width} * 100%)`

  return (
    <ScrollerProvider scrollSnapAlign='center'>
      <Row maxWidth={false} disableGutters className={componentName}>
        <MotionBox
          layout
          {...className('root')}
          sx={[
            {
              willChange: 'transform',
              display: 'grid',
              [theme.breakpoints.up('md')]: {
                gridTemplateColumns: '1fr auto',
              },
              background:
                theme.palette.mode === 'light'
                  ? theme.palette.background.image
                  : theme.palette.background.paper,
              paddingRight: `calc((100% - ${theme.breakpoints.values.lg}px) / 2)`,
            },
            zoomed && {
              position: 'relative',
              zIndex: theme.zIndex.modal,
              marginTop: `calc(${theme.appShell.headerHeightSm} * -1)`,
              [theme.breakpoints.up('md')]: {
                marginTop: `calc(${theme.appShell.headerHeightMd} * -1  - ${theme.spacings.lg})`,
              },
              paddingRight: 0,
            },
          ]}
        >
          <MotionBox
            layout
            {...className('scrollerContainer')}
            sx={[
              {
                willChange: 'transform',
                height: 0, // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
                backgroundColor: theme.palette.background.image,
                position: 'relative',
                minHeight: '100%',
                paddingTop: `min(${ratio}, ${maxHeight})`,
                [theme.breakpoints.down('md')]: {
                  width: '100vw',
                },
              },
              zoomed && {
                paddingTop: `${clientHeight}px`,
              },
            ]}
            onLayoutAnimationComplete={() => {
              if (!zoomed) document.body.style.overflow = ''
            }}
          >
            <Scroller
              {...className('scroller')}
              hideScrollbar
              onMouseDown={onMouseDownScroller}
              onMouseUp={onMouseUpScroller}
              sx={[
                {
                  willChange: 'transform',
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  height: '100%',
                  gridAutoColumns: `100%`,
                  gridTemplateRows: `100%`,
                  cursor: 'zoom-in',
                },
                zoomed && {
                  height: clientHeight,
                  cursor: 'inherit',
                },
              ]}
            >
              {images.map((image, idx) => (
                <MotionImageAspect
                  key={typeof image.src === 'string' ? image.src : idx}
                  layout
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  sizes={{
                    0: '100vw',
                    [theme.breakpoints.values.md]: zoomed ? '100vw' : '60vw',
                  }}
                  alt={image.alt || `Product Image ${idx}` || undefined}
                  dontReportWronglySizedImages
                />
              ))}
            </Scroller>
            <MotionBox
              layout
              className={classes.topRight}
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                top: theme.spacings.sm,
                gap: theme.spacings.xxs,
                position: 'absolute',
                right: theme.spacings.sm,
              }}
            >
              <Fab
                size='small'
                className={classes.toggleIcon}
                onMouseUp={toggle}
                aria-label='Toggle Fullscreen'
                sx={{
                  boxShadow: theme.shadows[6],
                }}
              >
                {!zoomed ? <SvgIcon src={iconFullscreen} /> : <SvgIcon src={iconFullscreenExit} />}
              </Fab>
            </MotionBox>
            <Box
              className={classes.centerLeft}
              sx={{
                display: 'grid',
                gridAutoFlow: 'row',
                gap: theme.spacings.xxs,
                position: 'absolute',
                left: theme.spacings.sm,
                top: `calc(50% - 28px)`,
              }}
            >
              <ScrollerButton
                layout
                direction='left'
                size='small'
                className={classes.sliderButtons}
              >
                <SvgIcon src={iconChevronLeft} />
              </ScrollerButton>
            </Box>
            <Box
              className={classes.centerRight}
              sx={{
                display: 'grid',
                gap: theme.spacings.xxs,
                position: 'absolute',
                right: theme.spacings.sm,
                top: `calc(50% - 28px)`,
              }}
            >
              <ScrollerButton
                layout
                direction='right'
                size='small'
                className={classes.sliderButtons}
              >
                <SvgIcon src={iconChevronRight} />
              </ScrollerButton>
            </Box>

            <Box
              className={classes.bottomCenter}
              sx={{
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
              }}
            >
              <ScrollerDots
                layout
                sx={{
                  background: alpha(theme.palette.background.paper, 1),
                  boxShadow: theme.shadows[6],
                }}
              />
            </Box>
          </MotionBox>

          <Box
            {...className('sidebarWrapper')}
            sx={[
              {
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
              zoomed && {
                [theme.breakpoints.up('md')]: {
                  marginLeft: `calc((${responsiveVal(300, 500, theme.breakpoints.values.lg)} + ${
                    theme.page.horizontal
                  } * 2) * -1)`,
                  left: `calc(${responsiveVal(300, 500, theme.breakpoints.values.lg)} + ${
                    theme.page.horizontal
                  } * 2)`,
                },
              },
            ]}
          >
            <MotionBox
              layout
              {...className('sidebar')}
              sx={{
                boxSizing: 'border-box',
                width: '100%',
                padding: `${theme.spacings.lg} ${theme.page.horizontal}`,
                [theme.breakpoints.up('md')]: {
                  paddingLeft: theme.spacings.lg,
                },
              }}
            >
              {sidebar}
            </MotionBox>
          </Box>
        </MotionBox>
      </Row>
    </ScrollerProvider>
  )
}

SidebarGallery.selectors = selectors
