import { usePageContext } from '@graphcommerce/framer-next-pages'
import {
  Scroller,
  ScrollerProvider,
  useScrollerContext,
  useScrollTo,
} from '@graphcommerce/framer-scroller'
import { AppBar, Title } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import React, { useEffect } from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    '@global': {
      body: {
        overflowY: 'hidden',
        overscrollBehaviorY: 'none',
        backgroundColor: '#efefef',
      },
    },
    root: {
      height: '100vh',
      ['@supports (-webkit-touch-callout: none)']: {
        height: '-webkit-fill-available',
      },

      display: 'grid',
    },
    beforeSheet: {
      pointerEvents: 'none',
      scrollSnapAlign: 'start',
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
      // scrollSnapStop: 'always',
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
      // scrollSnapAlign: 'start',
    },
  }),
  { name: 'Sheet' },
)

function SheetHandler() {
  const { getScrollSnapPositions, getSnapPosition } = useScrollerContext()
  const scrollTo = useScrollTo()

  useEffect(() => {
    const positions = getScrollSnapPositions()
    console.log(positions)
    // scrollTo(getSnapPosition('down'))
  }, [getScrollSnapPositions])

  return null
}

type SheetProps = { children: React.ReactNode }

export default function Sheet(props: SheetProps) {
  const { children } = props
  const classes = useStyles()
  const { active } = usePageContext()

  return (
    <ScrollerProvider scrollSnapAlign='start' scrollSnapType='block proximity'>
      <SheetHandler />
      <Scroller className={classes.root} grid={false}>
        <div className={classes.beforeSheet}></div>
        <div className={classes.sheet}>
          <div className={classes.sheetPane}>{children}</div>
        </div>
        <div className={classes.end} />
      </Scroller>
    </ScrollerProvider>
  )
}
