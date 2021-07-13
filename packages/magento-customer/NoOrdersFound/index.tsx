import { makeStyles, Theme } from '@material-ui/core'
import { IconHeader, iconBox } from '@reachdigital/next-ui'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    noOrdersContainer: {
      marginTop: theme.spacings.sm,
    },
  }),
  { name: 'AccountLatestOrder' },
)

export default function NoOrdersFound() {
  const classes = useStyles()

  return (
    <div className={classes.noOrdersContainer}>
      <IconHeader src={iconBox} title='No orders found' alt='no order' size='small' />
    </div>
  )
}
