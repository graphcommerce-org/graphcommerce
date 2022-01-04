import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
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
  }),
  { name: 'DesktopNavActions' },
)

export default function DesktopNavActions(props: { children?: React.ReactNode }) {
  const { children } = props
  const classes = useStyles()
  return <div className={classes.actions}>{children}</div>
}
