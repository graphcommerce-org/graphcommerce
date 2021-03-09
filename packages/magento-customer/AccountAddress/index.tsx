import { Checkbox, FormControlLabel, Link, makeStyles, Theme } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import React, { useState } from 'react'
import AddressMultiLine from '../AddressMultiLine'
import { CustomerAddressFragment } from '../CustomerAddress/CustomerAddress.gql'
import { AccountAddressFragment } from './AccountAddress.gql'

export type AccountAddressProps = AccountAddressFragment & CountryRegionsQuery

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacings.md,
      paddingBottom: theme.spacings.md,
    },
    address: {
      '& > span': {
        display: 'block',
      },
    },
    actions: {
      //
    },
  }),
  { name: 'AccountAddress' },
)

export default function AccountAddress(props: AccountAddressProps) {
  const { id, countries, default_shipping, default_billing } = props
  const classes = useStyles()
  const [isDeliveryAddress, setIsDeliveryAddress] = useState<boolean>(!!default_shipping)
  const [isBillingAddress, setIsBillingAddress] = useState<boolean>(!!default_billing)

  return (
    <div className={classes.root}>
      <div className={classes.address}>
        <AddressMultiLine {...(props as CustomerAddressFragment)} countries={countries} />

        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              checked={isDeliveryAddress}
              onChange={() => {}}
              name='isDeliveryAddress'
            />
          }
          label='Delivery address'
        />
        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              checked={isBillingAddress}
              onChange={() => {}}
              name='isBillingAddress'
            />
          }
          label='Billing address'
        />
      </div>
      <div className={classes.actions}>
        <Link href={`/account/address/edit?addressId=${id}`}>Edit</Link>
      </div>
    </div>
  )
}
