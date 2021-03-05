import { makeStyles, Theme } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { AccountMenuFragment } from '@reachdigital/magento-customer/AccountMenu/AccountMenu.gql'
import AccountMenuItem from '@reachdigital/magento-customer/AccountMenuItem'
import SignOutForm from '@reachdigital/magento-customer/SignOutForm'
import React from 'react'
import addressIcon from './addresses.svg'
import infoIcon from './info.svg'
import lockIcon from './lock.svg'
import ordersIcon from './orders.svg'
import reviewsIcon from './reviews.svg'

export type AccountMenuProps = Partial<AccountMenuFragment> & {
  loading: boolean
}

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
  const { loading } = props
  const classes = useStyles()

  return (
    <div className={classes.accountMenuContainer}>
      <AccountMenuItem href='/account/orders' startIconSrc={ordersIcon}>
        Orders
      </AccountMenuItem>

      <AccountMenuItem href='/account/personal' startIconSrc={infoIcon}>
        Personal information
      </AccountMenuItem>

      <AccountMenuItem href='/account/addresses' startIconSrc={addressIcon}>
        Addresses
      </AccountMenuItem>

      <AccountMenuItem href='/account/reviews' startIconSrc={reviewsIcon}>
        Reviews
      </AccountMenuItem>

      <SignOutForm
        button={({ formState }) => (
          <AccountMenuItem
            startIconSrc={lockIcon}
            loading={formState.isSubmitting}
            type='submit'
            disabled={loading}
          >
            Sign out
          </AccountMenuItem>
        )}
      />
    </div>
  )
}
