import { usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import {
  Scroller,
  ScrollerProvider,
  ScrollSnapType,
  useScrollerContext,
  useScrollTo,
  useWatchItems,
} from '@graphcommerce/framer-scroller'
import { makeStyles, Theme } from '@material-ui/core'
import { m, useDomEvent, useMotionValue, useSpring } from 'framer-motion'
import React, { useRef } from 'react'
import { SetOptional } from 'type-fest'
import { classesPicker } from '../../Styles/classesPicker'
import AppShellProvider from '../AppShellProvider'

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
      pointerEvents: 'none',
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

type SheetVariant = 'left' | 'bottom' | 'right'

type SheetHandlerProps = {
  children?: React.ReactNode
  variantSm: SheetVariant
  variantMd: SheetVariant
}

function SheetHandler(props: SheetHandlerProps) {
  const { children, variantSm, variantMd } = props
  const { getScrollSnapPositions } = useScrollerContext()

  const classes = useStyles()
  const beforeRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  const className = classesPicker(classes, { variantSm, variantMd })

  const scrollTo = useScrollTo()

  const opened = useRef(false)
  const isNavigating = useRef(false)

  const { closeSteps, active } = usePageContext()
  const pageRouter = usePageRouter()

  const closeOverlay = () => {
    if (isNavigating.current) return
    isNavigating.current = true

    pageRouter.go(closeSteps * -1)
  }

  const openSheet = () => {
    const positions = getScrollSnapPositions()
    const [, open] = positions.x.map((x, i) => ({ x, y: positions.y[i] }))

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    scrollTo(open).then(() => (opened.current = true))
  }

  const sheetVisbility = useMotionValue(0)

  useWatchItems((item) => {
    // Handle closing the sheet when it isn't completely visible anymore.
    if (item.el === beforeRef.current) {
      // The beforeSheet must be at least 50% visible before closing the sheet.
      // if (opened.current && item.visibility.get() === 1) closeOverlay()
      if (!opened.current && item.visibility.get() > 0.99) openSheet()
    }

    if (item.el === sheetRef.current) {
      sheetVisbility.set(item.visibility.get() > 0.1 ? 1 : 0.01)
    }
  })

  // Handle esccape key
  useDomEvent(
    useRef(typeof window !== 'undefined' ? window : null),
    'keyup',
    (e: KeyboardEvent | Event) => {
      if (active && (e as KeyboardEvent)?.key === 'Escape') closeOverlay()
    },
    { passive: true },
  )

  return (
    <>
      <m.div {...className('backdrop')} style={{ opacity: useSpring(sheetVisbility) }} />
      <Scroller {...className('root')} grid={false} hideScrollbar>
        <div {...className('beforeSheet')} ref={beforeRef}></div>
        <div {...className('sheet')} ref={sheetRef}>
          <div {...className('sheetPane')}>{children}</div>
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
    <AppShellProvider>
      <ScrollerProvider scrollSnapTypeSm={scrollSnapTypeSm} scrollSnapTypeMd={scrollSnapTypeMd}>
        <SheetHandler variantMd={variantMd} variantSm={variantSm}>
          {children}
        </SheetHandler>
      </ScrollerProvider>
    </AppShellProvider>
  )
}
