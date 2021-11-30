import { usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import {
  Scroller,
  ScrollerProvider,
  ScrollSnapType,
  useScrollerContext,
  useScrollTo,
} from '@graphcommerce/framer-scroller'
import {
  useConstant,
  useElementScroll,
  useIsomorphicLayoutEffect,
} from '@graphcommerce/framer-utils'
import { makeStyles, Theme } from '@material-ui/core'
import {
  m,
  motionValue,
  MotionValue,
  useDomEvent,
  useMotionValue,
  usePresence,
  useSpring,
  useTransform,
} from 'framer-motion'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SetOptional } from 'type-fest'
import AppShellProvider from '../AppShell/AppShellProvider/AppShellProvder'
import { classesPicker } from '../Styles/classesPicker'

const useStyles = makeStyles(
  (theme: Theme) => ({
    '@global': {
      body: {
        // overflow: 'hidden',
        // overscrollBehavior: 'none',
      },
    },
    root: {
      display: 'grid',
      cursor: 'default',
      overflow: 'auto',
      height: '100vh',
      ['@supports (-webkit-touch-callout: none)']: {
        height: '-webkit-fill-available',
      },
    },
    rootVariantSmLeft: {
      [theme.breakpoints.down('sm')]: {
        gridTemplate: `
          "sheet beforeSheet"
          "afterSheet afterSheet"
        `,
      },
    },
    rootVariantMdLeft: {
      [theme.breakpoints.up('md')]: {
        gridTemplate: `
          "sheet beforeSheet"
          "afterSheet afterSheet"
        `,
      },
    },
    rootVariantSmRight: {
      [theme.breakpoints.down('sm')]: {
        gridTemplate: `
          "beforeSheet sheet"
          "afterSheet afterSheet"
        `,
      },
    },
    rootVariantMdRight: {
      [theme.breakpoints.up('md')]: {
        gridTemplate: `
          "beforeSheet sheet"
          "afterSheet afterSheet"
        `,
      },
    },
    rootVariantSmBottom: {
      [theme.breakpoints.down('sm')]: {
        gridTemplate: `"beforeSheet" "sheet" "afterSheet"`,
        height: '100vh',
        ['@supports (-webkit-touch-callout: none)']: {
          height: '-webkit-fill-available',
        },
      },
    },
    rootVariantMdBottom: {
      [theme.breakpoints.up('md')]: {
        gridTemplate: `"beforeSheet" "sheet" "afterSheet"`,
        height: '100vh',
      },
    },
    beforeSheet: {
      gridArea: 'beforeSheet',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      display: 'grid',
      alignContent: 'end',
    },
    beforeSheetVariantSmRight: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
      },
    },
    beforeSheetVariantMdRight: {
      [theme.breakpoints.up('md')]: {
        width: '100vw',
      },
    },

    beforeSheetVariantSmLeft: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
      },
    },
    beforeSheetVariantMdLeft: {
      [theme.breakpoints.up('md')]: {
        width: '100vw',
      },
    },

    beforeSheetVariantMdBottom: {
      [theme.breakpoints.up('md')]: {
        height: '100vh',
      },
    },
    beforeSheetVariantSmBottom: {
      [theme.breakpoints.down('sm')]: {
        height: '100vh',
        ['@supports (-webkit-touch-callout: none)']: {
          height: '-webkit-fill-available',
        },
      },
    },
    sheet: {
      pointerEvents: 'none',
      gridArea: 'sheet',
      scrollSnapAlign: 'start',
      width: 'min-content',
      minHeight: '100vh',
      ['@supports (-webkit-touch-callout: none)']: {
        minHeight: '-webkit-fill-available',
      },
    },
    sheetVariantSmBottom: {
      [theme.breakpoints.down('sm')]: {
        marginTop: -100,
        paddingTop: 100,
        scrollSnapStop: 'always',
        display: 'grid',
      },
    },
    sheetVariantMdBottom: {
      [theme.breakpoints.up('md')]: {
        marginTop: -100,
        paddingTop: 100,
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'grid',
      },
    },
    sheetPane: {
      pointerEvents: 'all',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[24],
      minWidth: 'min(800px, 90vw)',
    },
    sheetPaneVariantSmBottom: {
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
        borderRadius: 10,
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      },
    },
    sheetPaneVariantMdBottom: {
      [theme.breakpoints.up('md')]: {
        width: '100vw',
        borderRadius: 10,
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      },
    },
    sheetPaneVariantSmLeft: {
      [theme.breakpoints.down('sm')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        ['@supports (-webkit-touch-callout: none)']: {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    sheetPaneVariantMdLeft: {
      [theme.breakpoints.up('md')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        ['@supports (-webkit-touch-callout: none)']: {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    sheetPaneVariantSmRight: {
      [theme.breakpoints.down('sm')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        ['@supports (-webkit-touch-callout: none)']: {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    sheetPaneVariantMdRight: {
      [theme.breakpoints.up('md')]: {
        paddingBottom: 1,
        minHeight: '100vh',
        ['@supports (-webkit-touch-callout: none)']: {
          minHeight: '-webkit-fill-available',
        },
      },
    },
    afterSheet: {
      gridArea: 'afterSheet',
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
  { name: 'Sheet' },
)

export type SheetVariant = 'left' | 'bottom' | 'right'

type SheetHandlerProps = {
  children?: React.ReactNode
  variantSm: SheetVariant
  variantMd: SheetVariant
}

enum SheetPosition {
  UNOPENED = -1,
  OPENED = 1,
  CLOSED = 0,
}

function useSheetPosition() {
  const { getScrollSnapPositions, scrollerRef } = useScrollerContext()

  const state = useConstant(() => ({
    open: {
      x: motionValue(0),
      y: motionValue(0),
      visible: motionValue(0),
    },
    closed: { x: motionValue(0), y: motionValue(0) },
  }))

  const scroll = useElementScroll(scrollerRef)

  useIsomorphicLayoutEffect(() => {
    if (!scrollerRef.current) return

    const measure = () => {
      const positions = getScrollSnapPositions()
      state.open.x.set(positions.x[1])
      state.closed.x.set(positions.x[0])
      state.open.y.set(positions.y[1])
      state.closed.y.set(positions.y[0])
    }
    const ro = new ResizeObserver(measure)
    measure()

    ro.observe(scrollerRef.current)
    return () => ro.disconnect()
  })

  // sets a float between 0 and 1 for the visibility of the sheet
  useEffect(() => {
    const calc = () => {
      const x = scroll.x.get()
      const y = scroll.y.get()

      const yC = state.closed.y.get()
      const yO = state.open.y.get()
      const visY = yC === yO ? 1 : Math.max(0, Math.min(1, (y - yC) / (yO - yC)))

      const xC = state.closed.x.get()
      const xO = state.open.x.get()
      const visX = xO === xC ? 1 : Math.max(0, Math.min(1, (x - xC) / (xO - xC)))

      state.open.visible.set(visY * visX)
    }

    const cancelY = scroll.y.onChange(calc)
    const cancelX = scroll.x.onChange(calc)
    calc()

    return () => {
      cancelY()
      cancelX()
    }
  }, [state, scroll])

  return state
}

function SheetHandler(props: SheetHandlerProps) {
  const { children, variantSm, variantMd } = props
  const { scrollerRef } = useScrollerContext()
  const positions = useSheetPosition()
  const scrollTo = useScrollTo()
  const [isPresent, safeToRemove] = usePresence()

  const { closeSteps, active, direction } = usePageContext()
  const pageRouter = usePageRouter()

  const position = useMotionValue<SheetPosition>(SheetPosition.UNOPENED)

  const classes = useStyles()
  const className = classesPicker(classes, { variantSm, variantMd })

  const sheetRef = useRef<HTMLDivElement>(null)

  const scroll = useElementScroll(scrollerRef)

  useIsomorphicLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || !isPresent) return

    const open = { x: positions.open.x.get(), y: positions.open.y.get() }

    if (direction === 1) {
      scroller.scrollLeft = positions.closed.x.get()
      scroller.scrollTop = positions.closed.y.get()
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      scrollTo(open).then(() => position.set(SheetPosition.OPENED))
    } else {
      scroller.scrollLeft = open.x
      scroller.scrollTop = open.y
    }
  }, [direction, isPresent, position, positions, scrollTo, scrollerRef])

  // Make sure the sheet stays open when resizing the window.
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

    position.set(SheetPosition.CLOSED)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    scrollTo({
      x: positions.closed.x.get(),
      y: positions.closed.y.get(),
    }).then(() => safeToRemove?.())
  }, [isPresent, position, positions, safeToRemove, scrollTo])

  // Only go back to a previous page if the sheet isn't closed.
  const closeOverlay = useCallback(() => {
    if (position.get() !== SheetPosition.OPENED) return
    position.set(SheetPosition.CLOSED)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    pageRouter.go(closeSteps * -1)
  }, [closeSteps, pageRouter, position])

  // Handle escape key
  const windowRef = useRef(typeof window !== 'undefined' ? window : null)
  const handleEscape = (e: KeyboardEvent | Event) => {
    if (active && (e as KeyboardEvent)?.key === 'Escape') closeOverlay()
  }
  useDomEvent(windowRef, 'keyup', handleEscape, { passive: true })

  // When the sheet isn't visible anymore, we navigate back.
  useEffect(() => positions.open.visible.onChange((o) => o === 0 && closeOverlay()))

  // Measure the offset of the sheet in the scroller.
  const offsetY = useMotionValue(0)
  useEffect(() => {
    if (!sheetRef.current) return () => {}
    const ro = new ResizeObserver(([entry]) => offsetY.set(entry.contentRect.top))
    ro.observe(sheetRef.current)
    return () => ro.disconnect()
  }, [offsetY])

  // Create the exact position for the AppShellProvider which offsets the top of the sheet
  const scrollProvider = useTransform(
    [scroll.y, positions.open.y, offsetY] as MotionValue<number | string>[],
    ([y, openY, offsetYv]: number[]) => Math.max(0, y - openY - offsetYv),
  )

  return (
    <>
      <m.div {...className('backdrop')} style={{ opacity: positions.open.visible }} />
      <Scroller {...className('root')} grid={false} hideScrollbar>
        <div {...className('beforeSheet')} onClick={closeOverlay}></div>
        <div {...className('sheet')} ref={sheetRef}>
          <div {...className('sheetPane')}>
            <AppShellProvider scroll={scrollProvider}>{children}</AppShellProvider>
          </div>
        </div>
        <div {...className('afterSheet')} />
      </Scroller>
    </>
  )
}

export type SheetProps = SetOptional<SheetHandlerProps, 'variantSm' | 'variantMd'>

export function Sheet(props: SheetProps) {
  const { children, variantSm = 'bottom', variantMd = 'right' } = props

  const scrollSnapTypeSm: ScrollSnapType =
    variantSm === 'left' || variantSm === 'right' ? 'both mandatory' : 'block proximity'
  const scrollSnapTypeMd: ScrollSnapType =
    variantMd === 'left' || variantMd === 'right' ? 'both mandatory' : 'block proximity'

  return (
    <ScrollerProvider scrollSnapTypeSm={scrollSnapTypeSm} scrollSnapTypeMd={scrollSnapTypeMd}>
      <SheetHandler variantMd={variantMd} variantSm={variantSm}>
        {children}
      </SheetHandler>
    </ScrollerProvider>
  )
}
