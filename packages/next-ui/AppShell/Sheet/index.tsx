import { usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import {
  Scroller,
  ScrollerProvider,
  ScrollSnapType,
  useScrollerContext,
  useScrollTo,
  useWatchItem,
  useWatchItems,
} from '@graphcommerce/framer-scroller'
import { clientSize, useElementScroll } from '@graphcommerce/framer-utils'
import { makeStyles, Theme } from '@material-ui/core'
import { m, MotionValue, useDomEvent, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef } from 'react'
import { SetOptional } from 'type-fest'
import { classesPicker } from '../../Styles/classesPicker'
import AppShellProvider from '../AppShellProvider/AppShellProvder'

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
      gridArea: 'sheet',
      scrollSnapAlign: 'start',
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
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[24],
      width: 'min-content',
      minHeight: '100vh',
      ['@supports (-webkit-touch-callout: none)']: {
        minHeight: '-webkit-fill-available',
      },
      [theme.breakpoints.up('md')]: {
        minWidth: '800px',
      },
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
      [theme.breakpoints.up('md')]: {
        paddingBottom: 1,
      },
    },
    sheetPaneVariantMdLeft: {
      [theme.breakpoints.up('md')]: {
        paddingBottom: 1,
      },
    },
    sheetPaneVariantSmRight: {
      [theme.breakpoints.up('md')]: {
        paddingBottom: 1,
      },
    },
    sheetPaneVariantMdRight: {
      [theme.breakpoints.up('md')]: {
        paddingBottom: 1,
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

function SheetHandler(props: SheetHandlerProps) {
  const { children, variantSm, variantMd } = props
  const { getScrollSnapPositions, scrollerRef } = useScrollerContext()
  const scrollTo = useScrollTo()
  const { closeSteps, active, direction } = usePageContext()
  const pageRouter = usePageRouter()
  const opened = useRef(false)

  const classes = useStyles()
  const className = classesPicker(classes, { variantSm, variantMd })

  const sheetRef = useRef<HTMLDivElement>(null)
  const sheetPaneRef = useRef<HTMLDivElement>(null)

  const sheetVisbility = useMotionValue(0)
  useWatchItems((item) => {
    // Track the visibility of the sheet
    if (item.el === sheetRef.current) {
      sheetVisbility.set(item.visibility.get() > 0.1 ? 1 : 0)
    }
  })

  const startY = useMotionValue(0)
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const positions = getScrollSnapPositions()
    const [, open] = positions.x.map((x, i) => ({ x, y: positions.y[i] }))

    startY.set(open.y)
    if (direction === 1) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      scrollTo(open).then(() => {
        opened.current = true
      })
    } else {
      scroller.scrollLeft = open.x
      scroller.scrollTop = open.y
      opened.current = true
    }
  }, [direction, getScrollSnapPositions, scrollTo, scrollerRef, startY])

  // Open the sheet when loading the page.
  // Make sure the sheet stays open when resizing the window.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!sheetRef.current || !scroller) return () => {}

    const resize = () => {
      const positions = getScrollSnapPositions()
      const [, open] = positions.x.map((x, i) => ({ x, y: positions.y[i] }))

      const visible = sheetVisbility.get() === 1

      startY.set(open.y)
      if (visible && (scroller.scrollLeft !== open.x || scroller.scrollTop !== open.y)) {
        scroller.scrollLeft = open.x
        scroller.scrollTop = open.y
      }
    }

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
    // We're not checking for all deps, because that will cause rerenders.
    // The scroller context shouldn't be changing, but at the moment it is.
  }, [getScrollSnapPositions, scrollerRef, sheetVisbility, startY])

  const isNavigating = useRef(false)
  const closeOverlay = useCallback(() => {
    if (isNavigating.current) return
    isNavigating.current = true
    pageRouter.go(closeSteps * -1)
  }, [closeSteps, pageRouter])

  // Handle escape key
  useDomEvent(
    useRef(typeof window !== 'undefined' ? window : null),
    'keyup',
    (e: KeyboardEvent | Event) => {
      if (active && (e as KeyboardEvent)?.key === 'Escape') closeOverlay()
    },
    { passive: true },
  )

  // Measure the offset of the sheet in the scroller.
  const offsetY = useMotionValue(0)
  useEffect(() => {
    if (!sheetRef.current) return () => {}
    const ro = new ResizeObserver(([entry]) => offsetY.set(entry.contentRect.top))
    ro.observe(sheetRef.current)
    return () => ro.disconnect()
  })

  // Handle closing the sheet when the sheet is closed by the user.
  useEffect(
    () => sheetVisbility.onChange((v) => opened.current && v === 0 && closeOverlay()),
    [closeOverlay, sheetVisbility],
  )

  // Pass the scrollOffset relative to the sheet
  const scrollOffset = useTransform(
    [useElementScroll(scrollerRef).y, startY, offsetY] as MotionValue<number | string>[],
    ([y, startYv, offsetYv]: number[]) => Math.max(0, y - startYv - offsetYv),
  )

  return (
    <>
      <m.div {...className('backdrop')} style={{ opacity: useSpring(sheetVisbility) }} />
      <Scroller {...className('root')} grid={false} hideScrollbar>
        <div {...className('beforeSheet')} onClick={closeOverlay}></div>
        <div {...className('sheet')} ref={sheetRef}>
          <div {...className('sheetPane')} ref={sheetPaneRef}>
            <AppShellProvider scroll={scrollOffset}>{children}</AppShellProvider>
          </div>
        </div>
        <div {...className('afterSheet')} />
      </Scroller>
    </>
  )
}

export type SheetProps = SetOptional<SheetHandlerProps, 'variantSm' | 'variantMd'>

export default function Sheet(props: SheetProps) {
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
