import { makeStyles, Theme } from '@material-ui/core'
import CartFab from '@reachdigital/magento-cart/CartFab'
import CustomerFab from '@reachdigital/magento-customer/AccountFab'
import SearchButton from '@reachdigital/magento-search/SearchButton'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    actions: {
      '& > *': {
        pointerEvents: 'all',
      },
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        marginLeft: `${theme.spacings.sm}`,
        '& > *': {
          marginLeft: responsiveVal(0, 20),
        },
        '& :first-child': {
          marginLeft: 0,
        },
      },
    },
    desktopActions: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  }),
  { name: 'HeaderActions' },
)

export default function HeaderActions() {
  const classes = useStyles()

  return (
    <div className={clsx(classes.actions, classes.desktopActions)}>
      <SearchButton />
      <CustomerFab />
      <CartFab asIcon />
    </div>
  )
}
