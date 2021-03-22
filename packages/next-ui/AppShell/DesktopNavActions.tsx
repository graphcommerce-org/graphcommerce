import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import responsiveVal from '../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    actions: {
      '& > *': {
        pointerEvents: 'all',
      },
      display: 'none',
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: responsiveVal(4, 16),
      },
    },
    spacer: {
      width: 48,
    },
  }),
  { name: 'HeaderActions' },
)

export default function DesktopNavActions(props: { children?: React.ReactNode }) {
  const { children } = props
  const classes = useStyles()
  return (
    <div className={classes.actions}>
      {children}
      <div className={classes.spacer} />
    </div>
  )
}
