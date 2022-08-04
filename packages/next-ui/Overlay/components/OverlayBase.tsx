import { Scroller, useScrollerContext, useScrollTo } from '@graphcommerce/framer-scroller'
import {
  clientSizeCssVar,
  useElementScroll,
  useIsomorphicLayoutEffect,
} from '@graphcommerce/framer-utils'
import { Box, styled, SxProps, Theme, useTheme, useThemeProps } from '@mui/material'
import { m, MotionProps, useDomEvent, useMotionValue, useTransform } from 'framer-motion'
import React, { useCallback, useEffect, useRef } from 'react'
import { LayoutProvider } from '../../Layout/components/LayoutProvider'
import { ExtendableComponent, extendableComponent } from '../../Styles'
import { useOverlayPosition } from '../hooks/useOverlayPosition'

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
}

type OverridableProps = {
  mdSpacingTop?: (theme: Theme) => string
  smSpacingTop?: (theme: Theme) => string
}

export type LayoutOverlayBaseProps = {
  children?: React.ReactNode
  className?: string
  sx?: SxProps<Theme>
  sxBackdrop?: SxProps<Theme>
  active: boolean
  direction: 1 | -1
  onClosed: () => void
  offsetPageY: number
  isPresent: boolean
  safeToRemove: (() => void) | null | undefined
  overlayPaneProps?: MotionProps
} & StyleProps &
  OverridableProps

enum OverlayPosition {
  UNOPENED = -1,
  OPENED = 1,
  CLOSED = 0,
}

const name = 'LayoutOverlayBase' as const
const parts = ['scroller', 'backdrop', 'overlay', 'overlayPane', 'beforeOverlay'] as const
const { withState } = extendableComponent<StyleProps, typeof name, typeof parts>(name, parts)

/** Expose the component to be exendable in your theme.components */
declare module '@mui/material/styles/components' {
  interface Components {
    LayoutOverlayBase?: Pick<ExtendableComponent<OverridableProps & StyleProps>, 'defaultProps'>
  }
}

const MotionDiv = styled(m.div)({})

const clearScrollLock = () => {
  document.body.style.overflow = ''
}

export function OverlayBase(incommingProps: LayoutOverlayBaseProps) {
  const props = useThemeProps({ name, props: incommingProps })

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
    direction,
    offsetPageY,
    isPresent,
    safeToRemove,
    overlayPaneProps,
  } = props

  const th = useTheme()
  const mdSpacingTop = (
    props.mdSpacingTop ?? ((theme) => `calc(${theme.appShell.headerHeightMd} * 0.5)`)
  )(th)
  const smSpacingTop = (
    props.smSpacingTop ?? ((theme) => `calc(${theme.appShell.headerHeightSm} * 0.5)`)
  )(th)

  const { scrollerRef, snap } = useScrollerContext()
  const positions = useOverlayPosition()
  const scrollTo = useScrollTo()
  const beforeRef = useRef<HTMLDivElement>(null)

  const position = useMotionValue<OverlayPosition>(OverlayPosition.UNOPENED)

  const classes = withState({ variantSm, variantMd, sizeSm, sizeMd, justifySm, justifyMd })

  const overlayRef = useRef<HTMLDivElement>(null)

  const scroll = useElementScroll(scrollerRef)

  // When the component is mounted, we need to set the initial position of the overlay.
  useIsomorphicLayoutEffect(() => {
    const scroller = scrollerRef.current

    if (!scroller) return undefined

    if (!isPresent && position.get() === OverlayPosition.UNOPENED) {
      scroller.scrollLeft = positions.closed.x.get()
      scroller.scrollTop = positions.closed.y.get()
    }

    if (!isPresent) return undefined

    const open = { x: positions.open.x.get(), y: positions.open.y.get() }

    document.body.style.overflow = 'hidden'

    if (direction === 1 && position.get() !== OverlayPosition.OPENED) {
      scroller.scrollLeft = positions.closed.x.get()
      scroller.scrollTop = positions.closed.y.get()
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      scrollTo(open).then(() => {
        scroller.scrollLeft = positions.open.x.get()
        scroller.scrollTop = positions.open.y.get()
        position.set(OverlayPosition.OPENED)
      })
    } else {
      scroller.scrollLeft = open.x
      scroller.scrollTop = open.y
    }

    return clearScrollLock
  }, [direction, isPresent, position, positions, scrollTo, scrollerRef])

  // Make sure the overlay stays open when resizing the window.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return () => {}

    const resize = () => {
      if (positions.open.visible.get() !== 1) return

      scroller.scrollLeft = positions.open.x.get()
      scroller.scrollTop = positions.open.y.get()
    }

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
    // We're not checking for all deps, because that will cause rerenders.
    // The scroller context shouldn't be changing, but at the moment it is.
  }, [positions, scrollerRef])

  // When the overlay is closed by navigating away, we're closing the overlay.
  useEffect(() => {
    if (isPresent || position.get() === OverlayPosition.UNOPENED) return
    position.set(OverlayPosition.CLOSED)
    clearScrollLock()

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    scrollTo({
      x: positions.closed.x.get(),
      y: positions.closed.y.get(),
    }).then(() => safeToRemove?.())
  }, [isPresent, position, positions, safeToRemove, scrollTo])

  // Only go back to a previous page if the overlay isn't closed.
  const closeOverlay = useCallback(() => {
    if (position.get() !== OverlayPosition.OPENED) return
    position.set(OverlayPosition.CLOSED)
    clearScrollLock()
    onClosed()
  }, [onClosed, position])

  // Handle escape key
  const windowRef = useRef(typeof window !== 'undefined' ? window : null)
  const handleEscape = (e: KeyboardEvent | Event) => {
    if (active && (e as KeyboardEvent)?.key === 'Escape') closeOverlay()
  }
  useDomEvent(windowRef, 'keyup', handleEscape, { passive: true })

  // When the overlay isn't visible anymore, we navigate back.
  useEffect(() => positions.open.visible.onChange((o) => o === 0 && closeOverlay()))

  // Measure the offset of the overlay in the scroller.
  const offsetY = useMotionValue(0)
  useEffect(() => {
    if (!overlayRef.current) return () => {}
    const ro = new ResizeObserver(([entry]) => offsetY.set(entry.contentRect.top))
    ro.observe(overlayRef.current)
    return () => ro.disconnect()
  }, [offsetY])

  // Create the exact position for the LayoutProvider which offsets the top of the overlay
  const scrollWithoffset = useTransform(
    [scroll.y, positions.open.y, offsetY],
    ([y, openY, offsetYv]: number[]) => Math.max(0, y - openY - offsetYv + offsetPageY),
  )

  const onClickAway = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const isTarget =
        event.target === scrollerRef.current ||
        event.target === beforeRef.current ||
        event.target === overlayRef.current
      if (isTarget && snap.get()) closeOverlay()
    },
    [closeOverlay, scrollerRef, snap],
  )

  return (
    <>
      <MotionDiv
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            WebkitTapHighlightColor: 'transparent',
            willChange: 'opacity',
          },
          ...(Array.isArray(sxBackdrop) ? sxBackdrop : [sxBackdrop]),
        ]}
      />
      <Scroller
        className={`${classes.scroller} ${className ?? ''}`}
        grid={false}
        hideScrollbar
        onClick={onClickAway}
        sx={[
          (theme) => ({
            overscrollBehavior: 'contain',
            display: 'grid',
            '&.canGrab': {
              cursor: 'default',
            },
            '&.mdSnapDirInline': {
              overflow: 'auto',
            },

            height: clientSizeCssVar.y,

            [theme.breakpoints.down('md')]: {
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
                borderTopLeftRadius: theme.shape.borderRadius * 3,
                borderTopRightRadius: theme.shape.borderRadius * 3,
                gridTemplate: `"beforeOverlay" "overlay"`,
                height: clientSizeCssVar.y,
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
                borderTopLeftRadius: theme.shape.borderRadius * 4,
                borderTopRightRadius: theme.shape.borderRadius * 4,
                [theme.breakpoints.up('md')]: {
                  gridTemplate: `"beforeOverlay" "overlay"`,
                  height: clientSizeCssVar.y,
                },
              },
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          onClick={onClickAway}
          className={classes.beforeOverlay}
          ref={beforeRef}
          sx={(theme) => ({
            gridArea: 'beforeOverlay',
            scrollSnapAlign: 'start',
            display: 'grid',
            alignContent: 'end',

            [theme.breakpoints.down('md')]: {
              '&.variantSmLeft, &.variantSmRight': {
                width: '100vw',
              },
              '&.variantSmBottom': {
                height: clientSizeCssVar.y,
              },
            },
            [theme.breakpoints.up('md')]: {
              '&.variantMdLeft, &.variantMdRight': {
                width: '100vw',
              },
              '&.variantMdBottom': {
                height: clientSizeCssVar.y,
              },
            },
          })}
        />
        <Box
          className={classes.overlay}
          ref={overlayRef}
          onClick={onClickAway}
          sx={(theme) => ({
            display: 'grid',
            gridArea: 'overlay',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',

            [theme.breakpoints.down('md')]: {
              justifyContent: justifySm,
              alignItems: justifySm,

              '&.variantSmBottom': {
                marginTop: `calc(${smSpacingTop} * -1)`,
                paddingTop: smSpacingTop,
              },
              '&.sizeSmFloating': {
                padding: `${theme.page.vertical} ${theme.page.horizontal}`,
              },
            },
            [theme.breakpoints.up('md')]: {
              justifyContent: justifyMd,
              alignItems: justifyMd,

              '&.variantMdBottom': {
                paddingTop: mdSpacingTop,
                marginTop: `calc(${mdSpacingTop} * -1)`,
                display: 'grid',
              },
              '&.sizeMdFloating': {
                padding: `${theme.page.vertical} ${theme.page.horizontal}`,
              },
            },
          })}
        >
          <MotionDiv
            {...overlayPaneProps}
            layout
            className={classes.overlayPane}
            sx={(theme) => ({
              pointerEvents: 'all',
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[24],
              scrollSnapAlign: 'end',
              [theme.breakpoints.down('md')]: {
                minWidth: '80vw',
                '&:not(.sizeMdFull)': {
                  width: 'max-content',
                },

                '&.variantSmBottom.sizeSmFull': {
                  minHeight: `calc(${clientSizeCssVar.y} - ${smSpacingTop})`,
                },

                '&.variantSmBottom': {
                  borderTopLeftRadius: `${theme.shape.borderRadius * 3}px`,
                  borderTopRightRadius: `${theme.shape.borderRadius * 3}px`,
                },
                '&.sizeSmFloating': {
                  borderRadius: `${theme.shape.borderRadius * 3}px`,
                },
                '&.variantSmLeft.sizeSmFull': {
                  paddingBottom: '1px',
                  minHeight: clientSizeCssVar.y,
                },
                '&.variantSmRight.sizeSmFull': {
                  paddingBottom: '1px',
                  minHeight: clientSizeCssVar.y,
                  scrollSnapAlign: 'end',
                },
              },
              [theme.breakpoints.up('md')]: {
                '&.sizeMdFull': {
                  minWidth: 'max(600px, 50vw)',
                },
                '&:not(.sizeMdFull)': {
                  width: 'max-content',
                },

                '&.sizeMdFull.variantMdBottom': {
                  minHeight: `calc(${clientSizeCssVar.y} - ${mdSpacingTop})`,
                },
                '&.sizeMdFull.variantMdLeft': {
                  paddingBottom: '1px',
                  minHeight: clientSizeCssVar.y,
                },
                '&.sizeMdFull.variantMdRight': {
                  paddingBottom: '1px',
                  minHeight: clientSizeCssVar.y,
                  scrollSnapAlign: 'end',
                },

                '&.variantMdBottom': {
                  borderTopLeftRadius: `${theme.shape.borderRadius * 4}px`,
                  borderTopRightRadius: `${theme.shape.borderRadius * 4}px`,
                },
                '&.sizeMdFloating': {
                  borderRadius: `${theme.shape.borderRadius * 4}px`,
                },
              },
            })}
          >
            <LayoutProvider scroll={scrollWithoffset}>{children}</LayoutProvider>
          </MotionDiv>
        </Box>
      </Scroller>
    </>
  )
}
