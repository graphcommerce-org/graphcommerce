import { makeStyles, Theme } from '@material-ui/core'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { iconBox } from '@reachdigital/next-ui/icons'
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
