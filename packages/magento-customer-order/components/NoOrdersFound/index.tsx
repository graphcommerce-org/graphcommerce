import { IconHeader, iconBox } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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
