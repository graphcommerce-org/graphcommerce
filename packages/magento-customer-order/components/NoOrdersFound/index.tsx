import { IconHeader, iconBox } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import React from 'react'

const useStyles = makeStyles({ name: 'AccountLatestOrder' })((theme) => ({
  noOrdersContainer: {
    marginTop: theme.spacings.sm,
  },
}))

export default function NoOrdersFound() {
  const { classes } = useStyles()

  return (
    <div className={classes.noOrdersContainer}>
      <IconHeader src={iconBox} title={t`No orders found`} alt='no order' size='small' />
    </div>
  )
}
