import { usePrevPageRouter } from '@graphcommerce/framer-next-pages/hooks/usePrevPageRouter'
import {
  MotionImageAspect,
  MotionImageAspectProps,
  Scroller,
  ScrollerButton,
  ScrollerDots,
  ScrollerProvider,
} from '@graphcommerce/framer-scroller'
import { dvh } from '@graphcommerce/framer-utils'
import { Fab, useTheme, Box, styled, SxProps, Theme } from '@mui/material'
import { m, useDomEvent, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { IconSvg } from '../IconSvg'
import { Row } from '../Row/Row'
import { extendableComponent } from '../Styles'
import { iconChevronLeft, iconChevronRight, iconFullscreen, iconFullscreenExit } from '../icons'

const MotionBox = styled(m.div)({})

type OwnerState = { zoomed: boolean }
const name = 'SidebarGallery' as const
const parts = [
  'row',
  'root',
  'scrollerContainer',
  'scroller',
  'sidebarWrapper',
  'sidebar',
  'bottomCenter',
  'sliderButtons',
  'toggleIcon',
  'topRight',
  'centerLeft',
  'centerRight',
  'dots',
] as const
const { withState, selectors } = extendableComponent<OwnerState, typeof name, typeof parts>(
  name,
  parts,
)

export type SidebarGalleryProps = {
  sidebar: React.ReactNode
  images: MotionImageAspectProps[]
  aspectRatio?: [number, number]
  routeHash?: string
  sx?: SxProps<Theme>
}

export function SidebarGallery(props: SidebarGalleryProps) {
  const {
    sidebar,
    images,
    aspectRatio: [width, height] = [1, 1],
    sx,
    routeHash = 'gallery',
  } = props

  const router = useRouter()
  const prevRoute = usePrevPageRouter()
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

  const classes = withState({ zoomed })
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

  const headerHeight = theme.rv`${theme.appShell.headerHeightSm} - ${theme.spacings.sm} * 2`
  const galleryMargin = theme.spacings.lg

  const maxHeight = theme.rv`calc(100vh - ${headerHeight} - ${galleryMargin})`
  const ratio = theme.rv`calc(${height} / ${width} * 100%)`

  const hasImages = images.length > 0

  return (
    <ScrollerProvider scrollSnapAlign='center'>
      <Row maxWidth={false} disableGutters className={classes.row} sx={sx}>
        <MotionBox
          layout
          layoutDependency={zoomed}
          className={classes.root}
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
              mt: `calc(${theme.appShell.headerHeightSm} * -1)`,
              [theme.breakpoints.up('md')]: {
                mt: theme.rv`calc(${theme.appShell.headerHeightMd} * -1  - ${theme.spacings.lg})`,
              },
              paddingRight: 0,
            },
          ]}
        >
          <MotionBox
            layout
            layoutDependency={zoomed}
            className={classes.scrollerContainer}
            sx={[
              {
                willChange: 'transform',
                height: 0, // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
                backgroundColor: theme.palette.background.image,
                position: 'relative',
                pt: theme.rv`min(${ratio}, ${maxHeight})`,
                [theme.breakpoints.down('md')]: {
                  width: '100vw',
                },
                [theme.breakpoints.up('md')]: {
                  height: `calc(${dvh(100)} - ${theme.appShell.headerHeightMd} - ${
                    theme.spacings.lg
                  })`,
                  position: 'sticky',
                  top: theme.appShell.headerHeightMd,
                },
              },
              zoomed && {
                position: 'relative',
                top: 0,
                marginTop: 0,
                paddingTop: dvh(100),
              },
            ]}
            onLayoutAnimationComplete={() => {
              if (!zoomed) document.body.style.overflow = ''
            }}
          >
            <Scroller
              className={classes.scroller}
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
                  height: `var(--client-size-y)`,
                  cursor: 'inherit',
                },
              ]}
            >
              {images.map((image, idx) => (
                <MotionImageAspect
                  key={typeof image.src === 'string' ? image.src : idx}
                  layout
                  layoutDependency={zoomed}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  sx={{ display: 'block', objectFit: 'contain' }}
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
              layout='position'
              layoutDependency={zoomed}
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
                disabled={!hasImages}
                onMouseUp={toggle}
                aria-label='Toggle Fullscreen'
                sx={{ boxShadow: 6 }}
              >
                {!zoomed ? <IconSvg src={iconFullscreen} /> : <IconSvg src={iconFullscreenExit} />}
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
                layoutDependency={zoomed}
                direction='left'
                size='small'
                className={classes.sliderButtons}
              >
                <IconSvg src={iconChevronLeft} />
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
                layoutDependency={zoomed}
                direction='right'
                size='small'
                className={classes.sliderButtons}
              >
                <IconSvg src={iconChevronRight} />
              </ScrollerButton>
            </Box>

            <Box
              className={classes.bottomCenter}
              sx={{
                display: 'flex',
                px: theme.page.horizontal,
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
              <ScrollerDots layout='position' layoutDependency={zoomed} />
            </Box>
          </MotionBox>

          <Box
            className={classes.sidebarWrapper}
            sx={[
              {
                boxSizing: 'content-box',
                display: 'grid',
                justifyItems: 'start',
                alignContent: 'center',
                position: 'relative',
                [theme.breakpoints.up('md')]: {
                  width: theme.rv`calc(${[300, 600]} + ${theme.page.horizontal} * 2)`,
                },
              },
              zoomed && {
                [theme.breakpoints.up('md')]: {
                  ml: theme.rv`calc((${[300, 500]} + ${theme.page.horizontal} * 2) * -1)`,
                  left: theme.rv`calc(${[300, 500]} + ${theme.page.horizontal} * 2)`,
                },
              },
            ]}
          >
            <MotionBox
              layout='position'
              layoutDependency={zoomed}
              className={classes.sidebar}
              sx={{
                boxSizing: 'border-box',
                width: '100%',
                py: theme.spacings.lg,
                px: theme.page.horizontal,
                [theme.breakpoints.up('md')]: {
                  pl: theme.spacings.lg,
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
