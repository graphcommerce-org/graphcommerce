import { Checkbox, FormControlLabel, Link, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { AccountAddressFragment } from './AccountAddress.gql'

export type AccountAddressProps = AccountAddressFragment

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
  const {
    firstname,
    middlename,
    lastname,
    postcode,
    city,
    country_code,
    street,
    region,
    id,
  } = props
  const classes = useStyles()

  const [isDeliveryAddress, setIsDeliveryAddress] = useState<boolean>(false)
  const [isBillingAddress, setIsBillingAddress] = useState<boolean>(false)

  return (
    <div className={classes.root}>
      <div className={classes.address}>
        {/* <AddressMultiLine /> */}

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
        <Link href={`/account/address/edit?addressId=${id}`}>
          <a>Edit</a>
        </Link>
      </div>
    </div>
  )
}
