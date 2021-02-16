import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import AccountMenuItem from '../AccountMenuItem'
import { AccountMenuFragment } from './AccountMenu.gql'

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
      {/* {hasReviews && 'has reviews'} */}
      {/* {hasOrders && 'has orders'} */}

      <AccountMenuItem url='/account' label='Orders' startIconSrc='/icon/account-order.svg' />
      <AccountMenuItem
        url='/account'
        label='Personal information'
        startIconSrc='/icon/account-info.svg'
      />
      <AccountMenuItem
        url='/account'
        label='Addresses'
        startIconSrc='/icon/account-addresses.svg'
      />
      <AccountMenuItem url='/account' label='Reviews' startIconSrc='/icon/account-reviews.svg' />
      <AccountMenuItem url='/account' label='Log out' startIconSrc='/icon/account-lock.svg' />
    </div>
  )
}
