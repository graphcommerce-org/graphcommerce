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
    },
  },
  spacer: {
    pointerEvents: 'none',
    scrollSnapAlign: 'start',
    height: '100vh',
    ['@supports (-webkit-touch-callout: none)']: {
      height: '-webkit-fill-available',
    },
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
    marginTop: -100,
    paddingTop: 100,
    // background: 'hotpink',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
  },
  footer: {
    scrollSnapAlign: 'start',
  },
}))

function SheetHandler() {
  const { getScrollSnapPositions, getSnapPosition } = useScrollerContext()
  const scrollTo = useScrollTo()

  useEffect(() => {
    scrollTo(getSnapPosition('down'))
  }, [getScrollSnapPositions])

  return null
}

export default function SheetNew() {
  const classes = useStyles()
  const { active } = usePageContext()

  return (
    <ScrollerProvider scrollSnapAlign='start' scrollSnapType='block mandatory'>
      <SheetHandler />
      <Scroller className={classes.root}>
        <div className={classes.spacer} />
        <div className={classes.content}>
          <Box height='4000px' display='block' bgcolor='red'></Box>
        </div>
        <div className={classes.footer} />
      </Scroller>
    </ScrollerProvider>
  )
}
