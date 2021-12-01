import { usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import { Scroller, useScrollerContext, useScrollTo } from '@graphcommerce/framer-scroller'
import { useElementScroll, useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { makeStyles, Theme } from '@material-ui/core'
import {
  m,
  MotionValue,
  useDomEvent,
  useMotionValue,
  usePresence,
  useTransform,
} from 'framer-motion'
import React, { useCallback, useEffect, useRef } from 'react'
import { UseStyles } from '..'
import AppShellProvider from '../AppShell/AppShellProvider/AppShellProvder'
import { classesPicker } from '../Styles/classesPicker'
import { useOverlayPosition } from './useOverlayPosition'

const useStyles = makeStyles(
  (theme: Theme) => ({
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
        gridTemplate: `
          "overlay beforeOverlay"
          "afterOverlay afterOverlay"
        `,
      },
    },
    rootVariantMdLeft: {
      [theme.breakpoints.up('md')]: {
        gridTemplate: `
          "overlay beforeOverlay"
          "afterOverlay afterOverlay"
        `,
      },
    },
    rootVariantSmRight: {
      [theme.breakpoints.down('sm')]: {
        gridTemplate: `
          "beforeOverlay overlay"
          "afterOverlay afterOverlay"
        `,
      },
    },
    rootVariantMdRight: {
      [theme.breakpoints.up('md')]: {
        gridTemplate: `
          "beforeOverlay overlay"
          "afterOverlay afterOverlay"
        `,
      },
    },
    rootVariantSmBottom: {
      [theme.breakpoints.down('sm')]: {
        gridTemplate: `"beforeOverlay" "overlay" "afterOverlay"`,
        height: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          height: '-webkit-fill-available',
        },
      },
    },
    rootVariantMdBottom: {
      [theme.breakpoints.up('md')]: {
        gridTemplate: `"beforeOverlay" "overlay" "afterOverlay"`,
        height: '100vh',
      },
    },
    beforeOverlay: {
      gridArea: 'beforeOverlay',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      display: 'grid',
      alignContent: 'end',
    },
    beforeOverlayVariantSmRight: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
      },
    },
    beforeOverlayVariantMdRight: {
      [theme.breakpoints.up('md')]: {
        width: '100vw',
      },
    },

    beforeOverlayVariantSmLeft: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
      },
    },
    beforeOverlayVariantMdLeft: {
      [theme.breakpoints.up('md')]: {
        width: '100vw',
      },
    },

    beforeOverlayVariantMdBottom: {
      [theme.breakpoints.up('md')]: {
        height: '100vh',
      },
    },
    beforeOverlayVariantSmBottom: {
      [theme.breakpoints.down('sm')]: {
        height: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          height: '-webkit-fill-available',
        },
      },
    },
    overlay: {
      pointerEvents: 'none',
      gridArea: 'overlay',
      scrollSnapAlign: 'start',
      width: 'min-content',
      minHeight: '100vh',
      '@supports (-webkit-touch-callout: none)': {
        minHeight: '-webkit-fill-available',
      },
    },
    overlayVariantSmBottom: {
      [theme.breakpoints.down('sm')]: {
        marginTop: -100,
        paddingTop: 100,
        scrollSnapStop: 'always',
        display: 'grid',
      },
    },
    overlayVariantMdBottom: {
      [theme.breakpoints.up('md')]: {
        marginTop: -100,
        paddingTop: 100,
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'grid',
      },
    },
    overlayPane: {
      pointerEvents: 'all',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[24],
      minWidth: 'min(800px, 90vw)',
    },
    overlayPaneVariantSmBottom: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
        borderRadius: 10,
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      },
    },
    overlayPaneVariantMdBottom: {
      [theme.breakpoints.up('md')]: {
        width: '100vw',
        borderRadius: 10,
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      },
    },
    overlayPaneVariantSmLeft: {
      [theme.breakpoints.down('sm')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    overlayPaneVariantMdLeft: {
      [theme.breakpoints.up('md')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    overlayPaneVariantSmRight: {
      [theme.breakpoints.down('sm')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    overlayPaneVariantMdRight: {
      [theme.breakpoints.up('md')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    afterOverlay: {
      gridArea: 'afterOverlay',
      scrollSnapAlign: 'start',
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
    },
  }),
  { name: 'Overlay' },
)

export type OverlayVariant = 'left' | 'bottom' | 'right'

export type LayoutOverlayBaseProps = {
  children?: React.ReactNode
  variantSm: OverlayVariant
  variantMd: OverlayVariant
} & UseStyles<typeof useStyles>

export enum OverlayPosition {
  UNOPENED = -1,
  OPENED = 1,
  CLOSED = 0,
}

export function LayoutOverlayBase(props: LayoutOverlayBaseProps) {
  const { children, variantSm, variantMd } = props
  const { scrollerRef } = useScrollerContext()
  const positions = useOverlayPosition()
  const scrollTo = useScrollTo()
  const [isPresent, safeToRemove] = usePresence()

  const { closeSteps, active, direction } = usePageContext()
  const pageRouter = usePageRouter()

  const position = useMotionValue<OverlayPosition>(OverlayPosition.UNOPENED)

  const classes = useStyles(props)
  const className = classesPicker(classes, { variantSm, variantMd })

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
      scrollTo(open).then(() => position.set(OverlayPosition.OPENED))
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    pageRouter.go(closeSteps * -1)
  }, [closeSteps, pageRouter, position])

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

  // Create the exact position for the AppShellProvider which offsets the top of the overlay
  const scrollProvider = useTransform(
    [scroll.y, positions.open.y, offsetY] as MotionValue<number | string>[],
    ([y, openY, offsetYv]: number[]) => Math.max(0, y - openY - offsetYv),
  )

  return (
    <>
      <m.div {...className('backdrop')} style={{ opacity: positions.open.visible }} />
      <Scroller {...className('root')} grid={false} hideScrollbar>
        <div {...className('beforeOverlay')} onClick={closeOverlay} />
        <div {...className('overlay')} ref={overlayRef}>
          <div {...className('overlayPane')}>
            <AppShellProvider scroll={scrollProvider}>{children}</AppShellProvider>
          </div>
        </div>
        <div {...className('afterOverlay')} />
      </Scroller>
    </>
  )
}
