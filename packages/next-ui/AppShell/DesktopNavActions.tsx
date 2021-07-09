import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import responsiveVal from '../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    actions: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        position: 'fixed',
        top: 12,
        right: theme.page.horizontal,
        zIndex: 8,
        '& > *': {
          pointerEvents: 'all',
        },
        alignItems: 'center',
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: responsiveVal(4, 16),
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
