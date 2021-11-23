import { usePageContext } from '@graphcommerce/framer-next-pages'
import { Scroller } from '@graphcommerce/framer-scroller'
import { Box, makeStyles } from '@material-ui/core'
import { useEffect } from 'react'

const useStyles = makeStyles(() => ({
  '@global': {
    'html, body': {
      scrollSnapType: 'y mandatory',
    },
  },
  spacer: {
    scrollSnapAlign: 'start',
    height: '100vh',
  },
  root: {
    scrollSnapAlign: 'start',
    paddingTop: '100px',
    scrollSnapStop: 'always',
  },
  end: {
    height: '1px',
    scrollSnapAlign: 'start',
  },
}))

export default function SheetNew() {
  const classes = useStyles()
  const { active } = usePageContext()

  return (
    <>
      <div className={classes.spacer}></div>
      <div className={classes.root}>
        {active}

        <Box height='4000px' display='block' bgcolor='red'></Box>
      </div>
      <div className={classes.end}></div>
    </>
  )
}
