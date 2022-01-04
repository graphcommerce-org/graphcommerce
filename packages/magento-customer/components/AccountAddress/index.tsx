import { Trans } from '@lingui/macro'
import { Link, Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import PageLink from 'next/link'
import React from 'react'
import AddressMultiLine from '../AddressMultiLine'
import DeleteCustomerAddressForm from '../DeleteCustomerAddressForm'
import UpdateDefaultAddressForm from '../UpdateDefaultAddressForm'
import { AccountAddressFragment } from './AccountAddress.gql'

export type AccountAddressProps = AccountAddressFragment

const useStyles = makeStyles({ name: 'AccountAddress' })((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacings.md,
    paddingBottom: theme.spacings.md,
    ...theme.typography.body2,
  },
  address: {
    '& > span': {
      display: 'block',
    },
  },
  switches: {
    paddingTop: theme.spacings.xxs,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    textAlign: 'right',
  },
}))

export default function AccountAddress(props: AccountAddressProps) {
  const { id } = props
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.address}>
        <AddressMultiLine {...props} />

        <div className={classes.switches}>
          <UpdateDefaultAddressForm {...props} />
        </div>
      </div>
      <div className={classes.actions}>
        <PageLink href={`/account/addresses/edit?addressId=${id}`} passHref>
          <Link color='primary' underline='hover'>
            <Trans>Edit</Trans>
          </Link>
        </PageLink>
        <DeleteCustomerAddressForm addressId={id ?? undefined} />
      </div>
    </div>
  )
}
