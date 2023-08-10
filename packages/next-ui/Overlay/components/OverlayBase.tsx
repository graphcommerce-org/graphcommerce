import { Scroller, useScrollerContext, useScrollTo } from '@graphcommerce/framer-scroller'
import {
  dvh,
  dvw,
  useConstant,
  useElementScroll,
  useIsomorphicLayoutEffect,
} from '@graphcommerce/framer-utils'
import { Box, styled, SxProps, Theme, useTheme, useThemeProps } from '@mui/material'
import {
  m,
  MotionProps,
  motionValue,
  useDomEvent,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import React, { useCallback, useEffect, useRef } from 'react'
import { LayoutProvider } from '../../Layout/components/LayoutProvider'
import { ExtendableComponent, extendableComponent } from '../../Styles'
import { useMatchMedia } from '../../hooks/useMatchMedia'

export type LayoutOverlayVariant = 'left' | 'bottom' | 'right'
export type LayoutOverlaySize = 'floating' | 'minimal' | 'full'
export type LayoutOverlayAlign = 'start' | 'end' | 'center' | 'stretch'

type StyleProps = {
  variantSm: LayoutOverlayVariant
  variantMd: LayoutOverlayVariant
  sizeSm?: LayoutOverlaySize
  sizeMd?: LayoutOverlaySize
  justifySm?: LayoutOverlayAlign
  justifyMd?: LayoutOverlayAlign
  bgColor?: 'paper' | 'default'
}

type OverridableProps = {
  mdSpacingTop?: (theme: Theme) => string
  smSpacingTop?: (theme: Theme) => string
}

export type LayoutOverlayBaseProps = {
  children?: React.ReactNode | (() => React.ReactNode)
  className?: string
  sx?: SxProps<Theme>
  sxBackdrop?: SxProps<Theme>
  active: boolean
  direction?: 1 | -1
  onClosed: () => void
  offsetPageY?: number
  isPresent: boolean
  safeToRemove?: (() => void) | null | undefined
  overlayPaneProps?: MotionProps

  /* For `variantSm='left|right' */
  widthSm?: string | false

  /* For `variantMd='left|right' */
  widthMd?: string | false
} & StyleProps &
  OverridableProps

enum OverlayPosition {
  UNOPENED = -1,
  OPENED = 1,
  CLOSED = 0,
}

const name = 'LayoutOverlayBase' as const
const parts = [
  'scroller',
  'backdrop',
  'overlay',
  'overlayPane',
  'beforeOverlay',
  'background',
] as const
const { withState } = extendableComponent<StyleProps, typeof name, typeof parts>(name, parts)

/** Expose the component to be exendable in your theme.components */
declare module '@mui/material/styles/components' {
  interface Components {
    LayoutOverlayBase?: Pick<ExtendableComponent<OverridableProps & StyleProps>, 'defaultProps'>
  }
}

const MotionDiv = styled(m.div)({})

export function OverlayBase(incomingProps: LayoutOverlayBaseProps) {
  const props = useThemeProps({ name, props: incomingProps })

  const {
    children,
    variantSm,
    variantMd,
    className,
    sizeSm = 'full',
    sizeMd = 'full',
    justifySm = 'stretch',
    justifyMd = 'stretch',
    sx = [],
    sxBackdrop = [],
    active,
    onClosed,
    bgColor = 'paper',
    direction = 1,
    offsetPageY = 0,
    isPresent,
    safeToRemove,
    overlayPaneProps,
    widthMd = 'max(800px, 50vw)',
    widthSm = 'max(300px, 80vw)',
  } = props

  const th = useTheme()
  const mdSpacingTop = (
    props.mdSpacingTop ?? ((theme) => `calc(${theme.appShell.headerHeightMd} * 0.5)`)
  )(th)
  const smSpacingTop = (
    props.smSpacingTop ?? ((theme) => `calc(${theme.appShell.headerHeightSm} * 0.5)`)
  )(th)

  const { scrollerRef, snap, scroll, getScrollSnapPositions, disableSnap } = useScrollerContext()
  const scrollTo = useScrollTo()

  const beforeRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const overlayPaneRef = useRef<HTMLDivElement>(null)

  const position = useMotionValue<OverlayPosition>(OverlayPosition.UNOPENED)
  const overlayPaneScroll = useElementScroll(overlayPaneRef)

  const classes = withState({ variantSm, variantMd, sizeSm, sizeMd, justifySm, justifyMd })

  const match = useMatchMedia()
  const positions = useConstant(() => ({
    open: { x: motionValue(0), y: motionValue(0), visible: motionValue(0) },
    closed: { x: motionValue(0), y: motionValue(0) },
  }))

  const variant = useCallback(
    () => (match.up('md') ? variantMd : variantSm),
    [match, variantMd, variantSm],
  )
  const prevVariant = useRef<LayoutOverlayVariant>()

  const openClosePositions = useCallback((): {
    open: [number, number]
    closed: [number, number]
  } => {
    const { x, y } = getScrollSnapPositions()

    if (variant() === 'left') {
      return { open: [x.length - 2, 0], closed: [x.length - 1, 0] }
    }
    if (variant() === 'right') {
      return { open: [x.length - 1, 0], closed: [0, 0] }
    }
    return { open: [0, y.length - 1], closed: [0, 0] }
  }, [getScrollSnapPositions, variant])

  useIsomorphicLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || !beforeRef.current || !overlayRef.current || !overlayPaneRef.current)
      return () => {}

    const calcPositions = () => {
      const { x, y } = getScrollSnapPositions()

      if (variant() === 'left') {
        positions.closed.x.set(x[x.length - 1])
        positions.open.x.set(x[x.length - 2])
      }
      if (variant() === 'right') {
        positions.open.x.set(x[x.length - 1])
        positions.closed.x.set(0)
      }
      if (variant() === 'bottom') {
        positions.open.y.set(y[y.length - 1])
        positions.closed.y.set(0)
      }
    }

    const forceScrollPosition = () => {
      if (scroll.animating.get()) return
      // Set the initial position of the overlay.
      // Make sure the overlay stays open when the variant changes.
      if (position.get() !== OverlayPosition.OPENED) {
        scroller.scrollLeft = positions.closed.x.get()
        scroller.scrollTop = positions.closed.y.get()
        scroll.x.set(positions.closed.x.get())
        scroll.y.set(positions.closed.y.get())
      } else {
        disableSnap()
        scroller.scrollLeft = scroll.x.getPrevious()
        scroller.scrollTop = scroll.y.getPrevious()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        scrollTo(openClosePositions().open, { stopAnimationOnScroll: false })
      }
    }

    const calcVisible = () => {
      const clampRound = (value: number) => Math.round(Math.max(0, Math.min(1, value)) * 100) / 100

      let vis = 0
      if (variant() === 'left') {
        const closedX = positions.closed.x.get()
        vis = closedX === 0 ? 0 : clampRound((scroll.x.get() - closedX) / -closedX)
      }
      if (variant() === 'right') {
        const openedX = positions.open.x.get()
        vis = openedX === 0 ? 0 : clampRound(scroll.x.get() / openedX)
      }
      if (variant() === 'bottom') {
        const openedY = positions.open.y.get()
        vis = openedY === 0 ? 0 : clampRound(scroll.y.get() / openedY)
      }

      // If we're opening, make sure the visbility doesn't got below the current visibility
      if (position.get() === OverlayPosition.UNOPENED && positions.open.visible.get() >= vis) return

      positions.open.visible.set(vis)
    }

    const handleScroll = () => {
      calcPositions()

      // if (!prevVariant.current) prevVariant.current = variant()
      if (prevVariant.current !== variant()) {
        forceScrollPosition()
        prevVariant.current = variant()
      } else {
        // When we're not switching variants, we update the vibility of the overlay.
        calcVisible()
      }
    }

    const handleResize = () => {
      calcPositions()
      forceScrollPosition()
    }

    handleScroll()

    const cancelX = scroll.x.on('change', handleScroll)
    const cancelY = scroll.y.on('change', handleScroll)

    const ro = new ResizeObserver(handleResize)
    ro.observe(scrollerRef.current)
    ro.observe(beforeRef.current)
    ro.observe(overlayPaneRef.current)
    ro.observe(overlayRef.current)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      ro.disconnect()
      cancelX()
      cancelY()
    }
  }, [
    disableSnap,
    getScrollSnapPositions,
    openClosePositions,
    position,
    positions,
    scroll,
    scrollTo,
    scrollerRef,
    variant,
  ])

  // When the component is mounted, we need to set the initial position of the overlay.
  useIsomorphicLayoutEffect(() => {
    const scroller = scrollerRef.current

    if (!scroller || !isPresent) return

    if (variant() === 'right') document.body.style.overflow = 'hidden'

    if (position.get() !== OverlayPosition.OPENED && !scroll.animating.get()) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      scrollTo(openClosePositions().open, { stopAnimationOnScroll: false }).then(() =>
        position.set(OverlayPosition.OPENED),
      )
    }
  }, [isPresent, openClosePositions, position, scroll.animating, scrollTo, scrollerRef, variant])

  // When the overlay is closed by navigating away, we're closing the overlay.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (isPresent || !scroller) return

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    scrollTo(openClosePositions().closed, { stopAnimationOnScroll: false }).then(() => {
      safeToRemove?.()
      document.body.style.overflow = ''
    })
  }, [isPresent, openClosePositions, position, positions, safeToRemove, scrollTo, scrollerRef])

  // Only go back to a previous page if the overlay isn't closed.
  const closeOverlay = useCallback(() => {
    if (position.get() !== OverlayPosition.OPENED) return
    position.set(OverlayPosition.CLOSED)
    onClosed()
  }, [onClosed, position])

  // Handle escape key
  const windowRef = useRef(typeof window !== 'undefined' ? window : null)
  const handleEscape = (e: KeyboardEvent | Event) => {
    if (active && (e as KeyboardEvent)?.key === 'Escape') closeOverlay()
  }
  useDomEvent(windowRef, 'keyup', handleEscape, { passive: true })

  const dragging = useMotionValue(false)
  const scrollerElementRef = scrollerRef as React.RefObject<HTMLElement>

  const handleDragStart = () => {
    dragging.set(true)
  }
  const handleDragEnd = () => {
    dragging.set(false)
    // When releasing pointer and visibility 0 (overlay is dragged offscreen), close the overlay
    if (positions.open.visible.get() === 0) closeOverlay()
  }

  useDomEvent(scrollerElementRef, 'pointerdown', handleDragStart, { passive: true })
  useDomEvent(scrollerElementRef, 'pointerup', handleDragEnd, { passive: true })
  // We use touchend as well as pointerup, because scrolling (dragging the overlay) on mobile causes pointercancel to fire, preventing pointerup from ever firing
  useDomEvent(scrollerElementRef, 'touchend', handleDragEnd, { passive: true })

  // When the overlay isn't visible anymore, we navigate back.
  useMotionValueEvent(
    positions.open.visible,
    'change',
    (o) => o === 0 && !dragging.get() && closeOverlay(),
  )

  // Measure the offset of the overlay in the scroller.
  const offsetY = useMotionValue(0)
  useEffect(() => {
    if (!overlayRef.current) return () => {}
    const ro = new ResizeObserver(([entry]) => offsetY.set(entry.contentRect.top))
    ro.observe(overlayRef.current)
    return () => ro.disconnect()
  }, [offsetY])

  // Create the exact position for the LayoutProvider which offsets the top of the overlay
  const scrollYOffset = useTransform(overlayPaneScroll.y, (paneY) => paneY + offsetPageY)

  const onClickAway = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const isTarget =
        event.target === beforeRef.current ||
        event.target === overlayPaneRef.current ||
        event.target === scrollerRef.current
      if (isTarget && snap.get()) closeOverlay()
    },
    [closeOverlay, snap, scrollerRef],
  )

  return (
    <>
      <MotionDiv
        inert={active ? undefined : 'true'}
        className={classes.backdrop}
        style={{ opacity: positions.open.visible }}
        sx={[
          {
            zIndex: -1,
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            right: 0,
            bottom: 0,
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            WebkitTapHighlightColor: 'transparent',
            willChange: 'opacity',
          },
          ...(Array.isArray(sxBackdrop) ? sxBackdrop : [sxBackdrop]),
        ]}
      />
      <Scroller
        inert={active ? undefined : 'true'}
        className={`${classes.scroller} ${className ?? ''}`}
        grid={false}
        onClick={onClickAway}
        hideScrollbar
        sx={[
          (theme) => ({
            overscrollBehavior: 'contain',
            display: 'grid',
            '&.canGrab': {
              cursor: 'default',
            },
            '&.mdSnapDirInline': {
              overflow: active ? 'auto' : 'hidden',
            },

            height: dvh(100),

            [theme.breakpoints.down('md')]: {
              '&.variantSmLeft, &.variantSmRight': {
                overscrollBehaviorX: 'none',
              },
              '&.variantSmLeft': {
                gridTemplate: `"overlay beforeOverlay"`,
                borderTopRightRadius: theme.shape.borderRadius * 3,
                borderBottomRightRadius: theme.shape.borderRadius * 3,
              },
              '&.variantSmRight': {
                gridTemplate: `"beforeOverlay overlay"`,
                borderTopLeftRadius: theme.shape.borderRadius * 3,
                borderBottomLeftRadius: theme.shape.borderRadius * 3,
              },
              '&.variantSmBottom': {
                overscrollBehaviorY: 'none',
                gridTemplate: `"beforeOverlay" "overlay"`,
                height: `calc(${dvh(100)} - 1px)`,

                '&::after': {
                  content: `""`,
                  display: 'block',
                  position: 'absolute',
                  width: '100%',
                  height: '1px',
                  top: 'calc(100% - 1px)',
                  left: '0',
                  background: theme.palette.background[bgColor],
                },
              },
            },
            [theme.breakpoints.up('md')]: {
              '&.variantMdLeft': {
                gridTemplate: `"overlay beforeOverlay"`,
                borderTopRightRadius: theme.shape.borderRadius * 4,
                borderBottomRightRadius: theme.shape.borderRadius * 4,
              },
              '&.variantMdRight': {
                gridTemplate: `"beforeOverlay overlay"`,
                borderTopLeftRadius: theme.shape.borderRadius * 4,
                borderBottomLeftRadius: theme.shape.borderRadius * 4,
              },
              '&.variantMdBottom': {
                [theme.breakpoints.up('md')]: {
                  gridTemplate: `"beforeOverlay" "overlay"`,
                  height: dvh(100),
                },
              },
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          className={classes.beforeOverlay}
          ref={beforeRef}
          sx={(theme) => ({
            gridArea: 'beforeOverlay',
            scrollSnapAlign: 'start',
            display: 'grid',
            alignContent: 'end',

            [theme.breakpoints.down('md')]: {
              '&.variantSmLeft, &.variantSmRight': {
                width: dvw(100),
              },
              '&.variantSmBottom': {
                height: dvh(100),
              },
            },
            [theme.breakpoints.up('md')]: {
              '&.variantMdLeft, &.variantMdRight': {
                width: dvw(100),
              },
              '&.variantMdBottom': {
                height: dvh(100),
              },
            },
          })}
        />
        <Box
          className={classes.overlay}
          ref={overlayRef}
          sx={(theme) => ({
            display: 'grid',
            gridArea: 'overlay',
            scrollSnapStop: 'always',
            pointerEvents: 'none',
            '&.variantMdBottom, &.variantMdRight': {
              scrollSnapAlign: 'end',
            },
            '&.variantMdLeft': {
              scrollSnapAlign: 'start',
            },
            [theme.breakpoints.down('md')]: {
              justifyContent: justifySm,
              alignItems: justifySm,
              '&.sizeSmFloating': {
                padding: `${theme.page.vertical} ${theme.page.horizontal}`,
              },
            },
            [theme.breakpoints.up('md')]: {
              justifyContent: justifyMd,
              alignItems: justifyMd,

              '&.variantMdBottom': {
                display: 'grid',
              },
              '&.sizeMdFloating': {
                padding: `${theme.page.vertical} ${theme.page.horizontal}`,
              },
              '&.sizeMdFloating.variantMdBottom': {
                marginTop: `calc(${theme.page.vertical} * -1)`,
              },
            },
          })}
        >
          <MotionDiv
            {...overlayPaneProps}
            className={classes.overlayPane}
            ref={overlayPaneRef}
            sx={(theme) => ({
              pointerEvents: 'auto',

              [theme.breakpoints.down('md')]: {
                minWidth: '80vw',
                overflowY: 'auto',
                '&:not(.sizeSmFull)': {
                  width: 'auto',
                },

                '&.variantSmBottom': {
                  maxHeight: `calc(${dvh(100)} - ${smSpacingTop})`,
                  paddingTop: smSpacingTop,
                  boxSizing: 'border-box',
                  '&.sizeSmFloating': {
                    paddingTop: 0,
                    maxHeight: `calc(${dvh(100)} - (${theme.page.vertical} * 2))`,
                  },
                  '&.sizeSmMinimal': {
                    maxHeight: dvh(100),
                    borderRadius: 0,
                  },
                  '&.sizeSmFull': {
                    height: dvh(100),
                    maxHeight: 'none',
                    borderRadius: 0,
                  },

                  borderTopLeftRadius: `${theme.shape.borderRadius * 3}px`,
                  borderTopRightRadius: `${theme.shape.borderRadius * 3}px`,
                },
                '&.variantSmLeft, &.variantSmRight': {
                  overscrollBehaviorY: 'none',
                  width: widthSm || 'max-content',
                  boxShadow: theme.shadows[24],
                  maxHeight: dvh(100),
                  '&.sizeSmFull': {
                    height: dvh(100),
                  },
                  '&.sizeSmFloating': {
                    maxHeight: `calc(${dvh(100)} - (${theme.page.vertical} * 2))`,
                  },
                },
                '&.sizeSmFloating': {
                  borderRadius: `${theme.shape.borderRadius * 3}px`,
                },
              },
              [theme.breakpoints.up('md')]: {
                minWidth: '1px',
                overflowY: 'auto',
                overflowX: 'hidden',
                overscrollBehavior: 'contain',
                '&.variantMdBottom.sizeMdFloating:not(.justifyMdStretch)': {
                  width: widthMd,
                },

                '&.variantMdBottom': {
                  maxHeight: `calc(${dvh(100)} - ${mdSpacingTop})`,
                  paddingTop: mdSpacingTop,
                  boxSizing: 'border-box',
                  '&.sizeMdFloating': {
                    paddingTop: 0,
                    maxHeight: `calc(${dvh(100)} - (${theme.page.vertical} * 2))`,
                    boxShadow: theme.shadows[24],
                  },
                  '&.sizeMdMinimal': {
                    maxHeight: dvh(100),
                    borderRadius: 0,
                  },
                  '&.sizeMdFull': {
                    height: dvh(100),
                    maxHeight: 'none',
                    borderRadius: 0,
                  },

                  borderTopLeftRadius: `${theme.shape.borderRadius * 4}px`,
                  borderTopRightRadius: `${theme.shape.borderRadius * 4}px`,
                },
                '&.variantMdLeft, &.variantMdRight': {
                  width: widthMd || 'max-content',
                  boxShadow: theme.shadows[24],
                  maxHeight: dvh(100),
                  '&.sizeMdFull': {
                    height: dvh(100),
                  },
                  '&.sizeMdFloating': {
                    maxHeight: `calc(${dvh(100)} - (${theme.page.vertical} * 2))`,
                  },
                },
                '&.sizeMdFloating': {
                  borderRadius: `${theme.shape.borderRadius * 4}px`,
                },
              },
            })}
          >
            <Box
              className={classes.background}
              sx={(theme) => ({
                backgroundColor: theme.palette.background[bgColor],
                paddingBottom: '0.1px',
                [theme.breakpoints.down('md')]: {
                  minHeight: '100%',
                  '&.variantSmBottom': {
                    borderTopLeftRadius: theme.shape.borderRadius * 3,
                    borderTopRightRadius: theme.shape.borderRadius * 3,
                  },
                  '&.sizeSmFull': {
                    minHeight: dvh(100),
                    '&.variantSmBottom': {
                      minHeight: '100%',
                    },
                  },
                },
                [theme.breakpoints.up('md')]: {
                  minHeight: '100%',
                  '&.variantMdBottom': {
                    borderTopLeftRadius: theme.shape.borderRadius * 4,
                    borderTopRightRadius: theme.shape.borderRadius * 4,
                  },
                  '&.sizeMdFull': {
                    minHeight: dvh(100),
                    '&.variantMdBottom': {
                      minHeight: '100%',
                    },
                  },
                },
              })}
            >
              <LayoutProvider scroll={scrollYOffset}>
                {typeof children === 'function' ? active && children() : children}
              </LayoutProvider>
            </Box>
          </MotionDiv>
        </Box>
      </Scroller>
    </>
  )
}
