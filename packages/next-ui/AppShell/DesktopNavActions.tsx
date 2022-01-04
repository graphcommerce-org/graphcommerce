import { Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import React from 'react'

const useStyles = makeStyles({ name: 'DesktopNavActions' })((theme: Theme) => ({
  actions: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      pointerEvents: 'none !important',
      '& > *': {
        pointerEvents: 'all',
      },
      alignItems: 'center',
      gridAutoFlow: 'column',
      columnGap: 6,
    },
  },
}))

export default function DesktopNavActions(props: { children?: React.ReactNode }) {
  const { children } = props
  const { classes } = useStyles()
  return <div className={classes.actions}>{children}</div>
}
