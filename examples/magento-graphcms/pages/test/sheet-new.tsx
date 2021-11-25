import { usePageContext } from '@graphcommerce/framer-next-pages'
import {
  Scroller,
  ScrollerProvider,
  useScroller,
  useScrollerContext,
  useScrollTo,
} from '@graphcommerce/framer-scroller'
import { Box, makeStyles, Theme } from '@material-ui/core'
import { useEffect } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    body: {
      overflowY: 'hidden',
      overscrollBehaviorY: 'none',
      backgroundColor: '#efefef',
    },
  },
  spacer: {
    pointerEvents: 'none',
    scrollSnapAlign: 'start',
    height: '100vh',
    ['@supports (-webkit-touch-callout: none)']: {
      height: '-webkit-fill-available',
    },
    display: 'grid',
    alignContent: 'end',
  },
  root: {
    overflowY: 'scroll',
    // scrollSnapType: 'y mandatory',
    height: '100vh',
    ['@supports (-webkit-touch-callout: none)']: {
      height: '-webkit-fill-available',
    },
  },
  content: {
    height: '2000px',
    marginTop: -100,
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
    background: 'white',
    borderRadius: 20,
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
  },
  footer: {
    scrollSnapAlign: 'start',
  },
}))

function SheetHandler() {
  const { getScrollSnapPositions, getSnapPosition } = useScrollerContext()
  const scrollTo = useScrollTo()

  // useEffect(() => {
  //   scrollTo(getSnapPosition('down'))
  // }, [getScrollSnapPositions])

  return null
}

export default function SheetNew() {
  const classes = useStyles()
  const { active } = usePageContext()

  return (
    <ScrollerProvider scrollSnapAlign='start' scrollSnapType='block mandatory'>
      <SheetHandler />
      <Scroller className={classes.root}>
        <div className={classes.spacer}></div>
        <div className={classes.content}></div>
        <div className={classes.footer} />
      </Scroller>
    </ScrollerProvider>
  )
}
