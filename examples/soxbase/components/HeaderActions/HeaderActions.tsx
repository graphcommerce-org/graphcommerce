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
        marginLeft: responsiveVal(8, 16),
      },
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
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
      <CustomerFab
        icon={<img src='/icons/account.svg' alt='account' width={20} height={20} loading='eager' />}
      />
      <CartFab
        asIcon
        icon={
          <img
            src='/icons/shopping_bag.svg'
            alt='shopping bag'
            width={20}
            height={20}
            loading='eager'
          />
        }
      />
    </div>
  )
}
