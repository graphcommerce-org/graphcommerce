import { makeStyles, Theme } from '@material-ui/core'
import AccountMenuFragment from '@reachdigital/magento-customer'
import AccountMenuItem from '@reachdigital/magento-customer/AccountMenuItem'
import React from 'react'

export type AccountMenuProps = AccountMenuFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    accountMenuContainer: {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacings.md,
        marginBottom: theme.spacings.md,
      },
      marginTop: theme.spacings.lg,
      marginBottom: theme.spacings.lg,
    },
  }),
  { name: 'AccountMenu' },
)

export default function AccountMenu(props: AccountMenuProps) {
  const { reviews, orders } = props
  const hasReviews = (reviews.page_info.total_pages ?? 0) > 0
  const hasOrders = (orders?.page_info?.total_pages ?? 0) > 0
  const classes = useStyles()

  return (
    <div className={classes.accountMenuContainer}>
      <AccountMenuItem
        url='/account/orders'
        label='Orders'
        startIconSrc='/icons/desktop_account_orders.svg'
      />

      <AccountMenuItem
        url='/account/personal'
        label='Personal information'
        startIconSrc='/icons/desktop_account_info.svg'
      />

      <AccountMenuItem
        url='/account/addresses'
        label='Addresses'
        startIconSrc='/icons/desktop_account_addresses.svg'
      />

      <AccountMenuItem
        url='/account/reviews'
        label='Reviews'
        startIconSrc='/icons/desktop_account_reviews.svg'
      />

      <AccountMenuItem
        url='/account/logout'
        label='Log out'
        startIconSrc='/icons/desktop_account_lock.svg'
      />
    </div>
  )
}
