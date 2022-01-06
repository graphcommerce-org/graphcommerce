import React from 'react'
import { makeStyles } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'DesktopNavActions' })((theme) => ({
  actions: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      pointerEvents: 'none !important' as 'none',
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
