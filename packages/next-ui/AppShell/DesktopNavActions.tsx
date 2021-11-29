import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    actions: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        '& > *': {
          pointerEvents: 'all',
        },
        alignItems: 'center',
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: 6,
      },
    },
  }),
  { name: 'DesktopNavActions' },
)

export default function DesktopNavActions(props: { children?: React.ReactNode }) {
  const { children } = props
  const classes = useStyles()
  return <div className={classes.actions}>{children}</div>
}
