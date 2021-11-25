import { usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import {
  Scroller,
  ScrollerProvider,
  useScrollerContext,
  useScrollTo,
  useWatchItems,
} from '@graphcommerce/framer-scroller'
import { AppBar, AppShellProvider, Title } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import { useDomEvent } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    '@global': {
      body: {
        overflowY: 'hidden',
        overscrollBehaviorY: 'none',
        backgroundColor: '#efefef',
      },
    },
    scroller: {
      height: '100vh',
      ['@supports (-webkit-touch-callout: none)']: {
        height: '-webkit-fill-available',
      },
      display: 'grid',
      cursor: 'default',
    },
    beforeSheet: {
      pointerEvents: 'none',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      height: '100vh',
      ['@supports (-webkit-touch-callout: none)']: {
        height: '-webkit-fill-available',
      },
      display: 'grid',
      alignContent: 'end',
    },
    sheet: {
      marginTop: -100,
      paddingTop: 100,
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      height: '100vh',
      ['@supports (-webkit-touch-callout: none)']: {
        height: '-webkit-fill-available',
      },
      display: 'grid',
    },
    sheetPane: {
      background: 'white',
      borderRadius: 20,
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    },
    end: {
      scrollSnapAlign: 'start',
    },
  }),
  { name: 'Sheet' },
)

function SheetHandler(props: { beforeRef: React.RefObject<HTMLDivElement> }) {
  const { beforeRef } = props
  const { getScrollSnapPositions } = useScrollerContext()

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

  // Handle closing the sheet when it isn't completely visible anymore.
  useWatchItems((item) => {
    if (item.el !== beforeRef.current) return

    // The beforeSheet must be at least 50% visible before closing the sheet.
    if (opened.current && item.visibility.get() > 0.6) closeOverlay()
    if (!opened.current && item.visibility.get() === 1) openSheet()
  })

  const windowRef = useRef(typeof window !== 'undefined' ? window : null)
  function handleEscapeKey(e: KeyboardEvent | Event) {
    if (active) {
      if ((e as KeyboardEvent)?.key === 'Escape') {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        closeOverlay()
      }
    }
  }
  useDomEvent(windowRef, 'keyup', handleEscapeKey, { passive: true })

  return null
}

export type SheetProps = { children?: React.ReactNode }

export default function Sheet(props: SheetProps) {
  const { children } = props
  const classes = useStyles()
  const beforeRef = useRef<HTMLDivElement>(null)

  return (
    <AppShellProvider>
      <ScrollerProvider scrollSnapAlign='start' scrollSnapType='block proximity'>
        <SheetHandler beforeRef={beforeRef} />
        <Scroller className={classes.scroller} grid={false}>
          <div className={classes.beforeSheet} ref={beforeRef}></div>
          <div className={classes.sheet}>
            <div className={classes.sheetPane}>{children}</div>
          </div>
          <div className={classes.end} />
        </Scroller>
      </ScrollerProvider>
    </AppShellProvider>
  )
}
