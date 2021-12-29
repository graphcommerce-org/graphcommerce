import { useGo, usePageContext, useScrollOffset } from '@graphcommerce/framer-next-pages'
import { Scroller, useScrollerContext, useScrollTo } from '@graphcommerce/framer-scroller'
import { useElementScroll, useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { makeStyles, Theme, ClickAwayListener, capitalize, styled } from '@material-ui/core'
import { m, useDomEvent, useMotionValue, usePresence, useTransform } from 'framer-motion'
import React, { useCallback, useEffect, useRef } from 'react'
import LayoutProvider from '../../Layout/components/LayoutProvider'
import { UseStyles } from '../../Styles'
import { classesPicker } from '../../Styles/classesPicker'
import { useOverlayPosition } from '../hooks/useOverlayPosition'

const useStyles = makeStyles(
  (theme: Theme) => ({
    '@global': {
      body: {
        overflow: 'hidden',
      },
    },
    root: {
      display: 'grid',
      cursor: 'default',
      overflow: 'auto',
      height: '100vh',
      '@supports (-webkit-touch-callout: none)': {
        height: '-webkit-fill-available',
      },
    },
    rootVariantSmLeft: {
      [theme.breakpoints.down('sm')]: {
        gridTemplate: `"overlay beforeOverlay"`,
        borderTopRightRadius: theme.shape.borderRadius * 3,
        borderBottomRightRadius: theme.shape.borderRadius * 3,
      },
    },
    rootVariantMdLeft: {
      [theme.breakpoints.up('md')]: {
        gridTemplate: `"overlay beforeOverlay"`,
        borderTopRightRadius: theme.shape.borderRadius * 4,
        borderBottomRightRadius: theme.shape.borderRadius * 4,
      },
    },
    rootVariantSmRight: {
      [theme.breakpoints.down('sm')]: {
        gridTemplate: `"beforeOverlay overlay"`,
        borderTopLeftRadius: theme.shape.borderRadius * 3,
        borderBottomLeftRadius: theme.shape.borderRadius * 3,
      },
    },
    rootVariantMdRight: {
      [theme.breakpoints.up('md')]: {
        gridTemplate: `"beforeOverlay overlay"`,
        borderTopLeftRadius: theme.shape.borderRadius * 4,
        borderBottomLeftRadius: theme.shape.borderRadius * 4,
      },
    },
    rootVariantSmBottom: {
      [theme.breakpoints.down('sm')]: {
        borderTopLeftRadius: theme.shape.borderRadius * 3,
        borderTopRightRadius: theme.shape.borderRadius * 3,
        gridTemplate: `"beforeOverlay" "overlay"`,
        height: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          height: '-webkit-fill-available',
        },
      },
    },
    rootVariantMdBottom: {
      borderTopLeftRadius: theme.shape.borderRadius * 4,
      borderTopRightRadius: theme.shape.borderRadius * 4,
      [theme.breakpoints.up('md')]: {
        gridTemplate: `"beforeOverlay" "overlay"`,
        height: '100vh',
      },
    },

    // Overlay pane styles
    overlayPane: {},

    overlaySizeSmFloating: {
      [theme.breakpoints.down('sm')]: {
        padding: `${theme.page.vertical} ${theme.page.horizontal}`,
      },
    },
    overlaySizeMdFloating: {
      [theme.breakpoints.up('md')]: {
        padding: `${theme.page.vertical} ${theme.page.horizontal}`,
      },
    },
    overlayPaneVariantSmBottom: {
      [theme.breakpoints.down('sm')]: {
        borderTopLeftRadius: theme.shape.borderRadius * 3,
        borderTopRightRadius: theme.shape.borderRadius * 3,
      },
    },
    overlayPaneVariantMdBottom: {
      [theme.breakpoints.up('md')]: {
        borderTopLeftRadius: theme.shape.borderRadius * 3,
        borderTopRightRadius: theme.shape.borderRadius * 3,
      },
    },
    overlayPaneSizeSmFloating: {
      [theme.breakpoints.down('sm')]: {
        borderRadius: theme.shape.borderRadius * 3,
      },
    },
    overlayPaneSizeMdFloating: {
      [theme.breakpoints.up('md')]: {
        borderRadius: theme.shape.borderRadius * 3,
      },
    },
    overlayPaneSmVariantSizeLeftFull: {
      [theme.breakpoints.down('sm')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    overlayPaneMdVariantSizeLeftFull: {
      [theme.breakpoints.up('md')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    overlayPaneSmVariantSizeRightFull: {
      [theme.breakpoints.down('sm')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    overlayPaneMdVariantSizeRightFull: {
      [theme.breakpoints.up('md')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        scrollSnapAlign: 'end',
        '@supports (-webkit-touch-callout: none)': {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    backdrop: {
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
  }),
  { name: 'Overlay' },
)

export type LayoutOverlayVariant = 'left' | 'bottom' | 'right'
export type LayoutOverlaySize = 'floating' | 'full'
export type LayoutOverlayAlign = 'start' | 'end' | 'center' | 'stretch'

type StyleProps = {
  variantSm: LayoutOverlayVariant
  variantMd: LayoutOverlayVariant
  sizeSm?: LayoutOverlaySize
  sizeMd?: LayoutOverlaySize
  justifySm?: LayoutOverlayAlign
  justifyMd?: LayoutOverlayAlign
}

export type LayoutOverlayBaseProps = {
  children?: React.ReactNode
} & StyleProps &
  UseStyles<typeof useStyles>

enum OverlayPosition {
  UNOPENED = -1,
  OPENED = 1,
  CLOSED = 0,
}

export function LayoutOverlayBase(props: LayoutOverlayBaseProps) {
  const {
    children,
    variantSm,
    variantMd,
    classes: _classes,
    sizeSm = 'floating',
    sizeMd = 'floating',
    justifySm = 'start',
    justifyMd = 'start',
  } = props

  const { scrollerRef } = useScrollerContext()
  const positions = useOverlayPosition()
  const scrollTo = useScrollTo()
  const [isPresent, safeToRemove] = usePresence()

  const { closeSteps, active, direction } = usePageContext()
  const close = useGo(closeSteps * -1)

  const position = useMotionValue<OverlayPosition>(OverlayPosition.UNOPENED)

  const classes = useStyles({ classes: _classes, sizeSm, sizeMd, justifySm, justifyMd })
  const className = classesPicker(classes, {
    variantSm,
    variantMd,
    sizeSm,
    sizeMd,
    smVariantSize: `${variantSm}${capitalize(sizeSm)}`,
    mdVariantSize: `${variantMd}${capitalize(sizeMd)}`,
  })

  const overlayRef = useRef<HTMLDivElement>(null)

  const scroll = useElementScroll(scrollerRef)

  useIsomorphicLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || !isPresent) return

    const open = { x: positions.open.x.get(), y: positions.open.y.get() }

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
    if (isPresent) return
    position.set(OverlayPosition.CLOSED)
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
    close()
  }, [close, position])

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
  const offsetPageY = useScrollOffset().y
  const scrollWithoffset = useTransform(
    [scroll.y, positions.open.y, offsetY],
    ([y, openY, offsetYv]: number[]) => Math.max(0, y - openY - offsetYv + offsetPageY),
  )

  const onClickAway = useCallback(
    (event: React.MouseEvent<Document>) => {
      if (event.target === document.body && event.type === 'click') return

      closeOverlay()
    },
    [closeOverlay],
  )

  const Overlay = styled('div')(
    ({ theme }) => ({
      display: 'grid',
      pointerEvents: 'none',
      gridArea: 'overlay',
      scrollSnapAlign: 'start',

      [theme.breakpoints.down('sm')]: {
        justifyContent: justifySm,
        alignItems: justifySm,

        ...(variantSm === 'bottom' && {
          marginTop: `calc(${theme.appShell.headerHeightSm} * 0.5 * -1)`,
          paddingTop: `calc(${theme.appShell.headerHeightSm} * 0.5)`,
        }),
      },
      [theme.breakpoints.up('md')]: {
        justifyContent: justifyMd,
        alignItems: justifyMd,

        ...(variantMd === 'bottom' && {
          marginTop: `calc(${theme.appShell.headerHeightMd} + (${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * 0.5)`,
          paddingTop: `calc(${theme.appShell.headerHeightMd} + (${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5)`,
          display: 'grid',
        }),
      },
    }),
    { name: 'Overlay' },
  )

  const OverlayPane = styled('div')(
    ({ theme }) => ({
      pointerEvents: 'all',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[24],
      // scrollSnapAlign: 'end',

      [theme.breakpoints.down('sm')]: {
        minWidth: '80vw',
        ...(sizeSm === 'full' && {
          paddingBottom: 56,
        }),
      },
      [theme.breakpoints.up('md')]: {
        minWidth: '400px',
      },
    }),
    { name: 'OverlayPane' },
  )

  const isHorizontal = variantSm === 'left' || variantSm === 'right'
  const isVertical = !isHorizontal

  const BeforeOverlay = styled('div')(
    ({ theme }) => ({
      gridArea: 'beforeOverlay',
      scrollSnapAlign: 'start',
      display: 'grid',
      alignContent: 'end',

      [theme.breakpoints.down('sm')]: {
        ...(isHorizontal && { width: '100vw' }),
        ...(isVertical && {
          height: '100vh',
          '@supports (-webkit-touch-callout: none)': {
            height: '-webkit-fill-available',
          },
        }),
      },
      [theme.breakpoints.up('md')]: {
        ...(isHorizontal && { width: '100vw' }),
        ...(isVertical && { height: '100vh' }),
      },
    }),
    { name: 'BeforeOverlay' },
  )

  return (
    <>
      <m.div {...className('backdrop')} style={{ opacity: positions.open.visible }} />
      <Scroller {...className('root')} grid={false} hideScrollbar>
        <BeforeOverlay />
        <Overlay {...className('overlay')} ref={overlayRef}>
          {/* <ClickAwayListener onClickAway={onClickAway}> */}
          <OverlayPane {...className('overlayPane')}>
            <LayoutProvider scroll={scrollWithoffset}>{children}</LayoutProvider>
          </OverlayPane>
          {/* </ClickAwayListener> */}
        </Overlay>
      </Scroller>
    </>
  )
}
