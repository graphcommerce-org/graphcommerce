import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../Styles'

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

export default function DesktopNavActions(
  props: {
    children?: React.ReactNode
  } & UseStyles<typeof useStyles>,
) {
  const { children } = props
  const classes = useStyles(props)
  return <div className={classes.actions}>{children}</div>
}
