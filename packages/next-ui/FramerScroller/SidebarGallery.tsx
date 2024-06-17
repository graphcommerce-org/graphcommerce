import { usePrevPageRouter } from '@graphcommerce/framer-next-pages/hooks/usePrevPageRouter'
import {
  MotionImageAspect,
  MotionImageAspectProps,
  Scroller,
  ScrollerDots,
  ScrollerButton,
  ScrollerProvider,
  unstable_usePreventScroll as usePreventScroll,
  ScrollerButtonProps,
  ScrollerThumbnails,
} from '@graphcommerce/framer-scroller'
import { dvh } from '@graphcommerce/framer-utils'
import {
  Fab,
  useTheme,
  Box,
  styled,
  SxProps,
  Theme,
  Unstable_TrapFocus as TrapFocus,
} from '@mui/material'
import { m, useDomEvent, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { IconSvg } from '../IconSvg'
import { Row } from '../Row/Row'
import { extendableComponent } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'
import { iconChevronLeft, iconChevronRight, iconFullscreen, iconFullscreenExit } from '../icons'

const MotionBox = styled(m.div)({})

type SidebarGalleryVariant = 'default' | 'oneColumn'

type OwnerState = {
  zoomed: boolean
  disableZoom: boolean
  sticky: boolean
  variantMd: SidebarGalleryVariant
}
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
  disableZoom?: boolean
  disableSticky?: boolean
  variantMd?: SidebarGalleryVariant
} & Pick<ScrollerButtonProps, 'showButtons'>

export function SidebarGallery(props: SidebarGalleryProps) {
  const {
    sidebar,
    images,
    aspectRatio: [width, height] = [1, 1],
    sx,
    routeHash = 'gallery',
    showButtons,
    disableZoom = false,
    disableSticky = false,
    variantMd = 'default',
  } = props

  const router = useRouter()
  const prevRoute = usePrevPageRouter()
  // const classes = useMergedClasses(useStyles({ clientHeight, aspectRatio }).classes, props.classes)

  const route = `#${routeHash}`
  // We're using the URL to manage the state of the gallery.
  const zoomed = router.asPath.endsWith(route)
  usePreventScroll(zoomed)

  // cleanup if someone enters the page with #gallery
  useEffect(() => {
    if (!prevRoute?.pathname && zoomed) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.replace(router.asPath.replace(route, ''))
    }
  }, [prevRoute?.pathname, route, router, zoomed])

  const toggle = () => {
    if (disableZoom) {
      return
    }
    if (!zoomed) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(route, undefined, { shallow: true })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.back()
    }
  }

  const classes = withState({ zoomed, disableZoom, sticky: !disableSticky, variantMd })
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

  const maxHeight = `calc(100vh - ${headerHeight} - ${galleryMargin})`
  const ratio = `calc(${height} / ${width} * 100%)`

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
              gridTemplate: '"left" "right"',
              [theme.breakpoints.up('md')]: {
                '&:not(.variantMdOneColumn)': {
                  gridTemplate: `"left right" / 1fr calc(${responsiveVal(300, 500, undefined, theme.breakpoints.values.lg)} + ${
                    theme.page.horizontal
                  } * 2)`,
                },
              },
              background:
                theme.palette.mode === 'light'
                  ? theme.palette.background.image
                  : theme.palette.background.paper,

              '&:not(.variantMdOneColumn)': {
                paddingRight: `calc((100% - ${theme.breakpoints.values.lg}px) / 2)`,
              },

              '&.zoomed': {
                position: 'relative',
                zIndex: theme.zIndex.modal,
                marginTop: `calc(${theme.appShell.headerHeightSm} * -1)`,
                [theme.breakpoints.up('md')]: {
                  marginTop: `calc(${theme.appShell.headerHeightMd} * -1  - ${theme.spacings.lg})`,
                  gridTemplateColumns: '1fr auto',
                },
                paddingRight: 0,
              },
            },
          ]}
        >
          <TrapFocus open={zoomed}>
            <MotionBox
              layout
              layoutDependency={zoomed}
              className={classes.scrollerContainer}
              sx={[
                {
                  gridArea: 'left',
                  willChange: 'transform',
                  height: 0, // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
                  backgroundColor: theme.palette.background.image,
                  position: 'relative',
                  paddingTop: `min(${ratio}, ${maxHeight})`,
                  [theme.breakpoints.down('md')]: {
                    width: '100%',
                  },
                  [theme.breakpoints.up('md')]: {
                    '&:not(.variantMdOneColumn)': {
                      height: `max(${dvh(90)}, 40vw)`,
                      '&.sticky': {
                        position: 'sticky',
                        top: theme.appShell.headerHeightMd,
                      },
                    },
                  },
                },
                zoomed && {
                  position: 'relative',
                  top: { xs: 0, md: 0 },
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
                    cursor: disableZoom ? 'auto' : 'zoom-in',
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
                {!disableZoom && (
                  <Fab
                    size='small'
                    className={classes.toggleIcon}
                    disabled={!hasImages}
                    onMouseUp={toggle}
                    aria-label='Toggle Fullscreen'
                    sx={{ boxShadow: 6 }}
                  >
                    {!zoomed ? (
                      <IconSvg src={iconFullscreen} />
                    ) : (
                      <IconSvg src={iconFullscreenExit} />
                    )}
                  </Fab>
                )}
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
                  showButtons={showButtons}
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
                  showButtons={showButtons}
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
                {import.meta.graphCommerce.sidebarGallery?.paginationVariant ===
                'THUMBNAILS_BOTTOM' ? (
                  <ScrollerThumbnails images={images} />
                ) : (
                  <ScrollerDots layout />
                )}
              </Box>
            </MotionBox>
          </TrapFocus>
          <Box
            className={classes.sidebarWrapper}
            sx={[
              {
                gridArea: 'right',
                boxSizing: 'content-box',
                display: 'grid',
                justifyItems: 'start',
                alignContent: 'center',
                position: 'relative',
              },
              zoomed && {
                [theme.breakpoints.up('md')]: {
                  marginLeft: `calc((${responsiveVal(300, 500, undefined, theme.breakpoints.values.lg)} + ${
                    theme.page.horizontal
                  } * 2) * -1)`,
                  left: `calc(${responsiveVal(300, 500, undefined, theme.breakpoints.values.lg)} + ${
                    theme.page.horizontal
                  } * 2)`,
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
                '&:not(.variantMdOneColumn)': {
                  padding: `${theme.spacings.lg} ${theme.page.horizontal}`,
                  [theme.breakpoints.up('md')]: {
                    paddingLeft: theme.spacings.lg,
                  },
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
